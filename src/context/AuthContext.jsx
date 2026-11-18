import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { crmService, DEFAULT_CRM_PROFILE, DEFAULT_CRM_ATTENDANCE, DEFAULT_CRM_BATCH, DEFAULT_CRM_CERTIFICATES } from '../services/crmService';
import { lmsService } from '../services/lmsService';
import { checkStudentCourseAccess } from '../components/profile/profileUtils';
import { formatAdmissionNo } from '../utils/admissionUtils';

/**
 * Filter out any mock/placeholder image references from localStorage or cached objects
 */
export const sanitizeMockAvatar = (url) => {
    if (!url || typeof url !== 'string') return null;
    const lower = url.toLowerCase();
    if (
        lower.includes('photo-1472099645785') ||
        lower.includes('photo-1534528741775') ||
        lower.includes('unsplash.com') ||
        lower.includes('boy.png') ||
        lower.includes('girl.png') ||
        lower.includes('prem_photo') ||
        lower.includes('prem_photo_passport') ||
        lower.includes('profile-pic.png') ||
        lower.includes('sahil-clean-avatar') ||
        lower.includes('sahil-profile')
    ) {
        return null;
    }
    return url;
};

// Immediate client cache sanitization on app boot: purge stale mock data
if (typeof window !== 'undefined' && window.localStorage) {
    try {
        const rawAvatar = localStorage.getItem('om_lms_student_avatar');
        if (rawAvatar && !sanitizeMockAvatar(rawAvatar)) {
            localStorage.removeItem('om_lms_student_avatar');
        }

        const cachedProfileStr = localStorage.getItem('om_lms_crm_cached_profile');
        if (cachedProfileStr) {
            const parsed = JSON.parse(cachedProfileStr);
            const lowerName = (parsed.name || '').toLowerCase();
            const lowerEmail = (parsed.email || '').toLowerCase();
            if (
                lowerName.includes('hasolkar') ||
                lowerName.includes('sahil') ||
                lowerName.includes('aditya jadhav') ||
                lowerEmail.includes('hasolkarsahil') ||
                lowerEmail.includes('adityajadhav')
            ) {
                localStorage.removeItem('om_lms_crm_cached_profile');
                localStorage.removeItem('om_lms_selected_crm_student_id');
            } else {
                let modified = false;
                if (parsed.photo && !sanitizeMockAvatar(parsed.photo)) {
                    parsed.photo = null;
                    modified = true;
                }
                if (parsed.avatar && !sanitizeMockAvatar(parsed.avatar)) {
                    parsed.avatar = null;
                    modified = true;
                }
                if (modified) {
                    localStorage.setItem('om_lms_crm_cached_profile', JSON.stringify(parsed));
                }
            }
        }
    } catch (e) {
        console.warn('Cache sanitization error:', e);
    }
}

export const ADMIN_USER = {
    id: 'admin-1',
    name: 'Administrator',
    email: 'admin@operatingmedia.com',
    role: 'ADMIN',
    roleLabel: 'HR_ADMIN',
    avatar: null,
    designation: 'Head of Operations'
};

export const STUDENT_USER = {
    id: null,
    crmAdmissionId: null,
    admissionNo: '',
    name: '',
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    maritalStatus: '',
    admissionDate: '',
    registrationDate: '',
    facultyLead: '',
    facultyLeadRole: '',
    role: 'STUDENT',
    roleLabel: 'STUDENT',
    avatar: null,
    designation: 'Student',
    course: '',
    center: '',
    branch: '',
    batchCode: '',
    batchName: '',
    enrolledCoursesCount: 0,
    completedCoursesCount: 0,
    overallProgress: 0,
    joinedDate: ''
};

const AuthContext = createContext(undefined);
const STORAGE_KEY = 'om_lms_current_role';
const AUTH_KEY = 'om_lms_is_authenticated';

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        try {
            return localStorage.getItem(AUTH_KEY) === 'true';
        } catch {
            return false;
        }
    });

    const [role, setRole] = useState('STUDENT');
    if (typeof document !== 'undefined') {
        document.documentElement.classList.add('role-student');
        document.documentElement.classList.remove('role-admin');
        document.documentElement.setAttribute('data-role', 'student');
    }

    const [adminUser, setAdminUser] = useState(ADMIN_USER);
    const [studentUser, setStudentUser] = useState(() => {
        const initial = { ...STUDENT_USER };
        try {
            const cachedProfileStr = localStorage.getItem('om_lms_crm_cached_profile');
            const savedAvatar = sanitizeMockAvatar(localStorage.getItem('om_lms_student_avatar'));
            if (cachedProfileStr) {
                const cached = JSON.parse(cachedProfileStr);
                const validPhoto = sanitizeMockAvatar(cached?.photo || cached?.avatar);
                if (validPhoto) {
                    initial.avatar = validPhoto;
                } else {
                    initial.avatar = null;
                }
                if (cached?.name) initial.name = cached.name;
                if (cached?.fullName) initial.fullName = cached.fullName;
                if (cached?.admissionNo) initial.admissionNo = formatAdmissionNo(cached.admissionNo);
                if (cached?.course) initial.course = cached.course;
                if (cached?.branch) initial.branch = cached.branch;
                if (cached?.center) initial.center = cached.center;
                if (cached?.id) {
                    initial.crmAdmissionId = cached.id;
                    initial.id = `std-${cached.id}`;
                }
            } else if (savedAvatar) {
                initial.avatar = savedAvatar;
            } else {
                initial.avatar = null;
            }
        } catch {
            initial.avatar = null;
        }
        return initial;
    });

    // Live CRM states
    const [crmProfile, setCrmProfile] = useState(() => {
        try {
            const cachedProfileStr = localStorage.getItem('om_lms_crm_cached_profile');
            if (cachedProfileStr) {
                const cached = JSON.parse(cachedProfileStr);
                if (cached && (cached.id || cached.admissionNo || cached.name)) {
                    if (cached.admissionNo) cached.admissionNo = formatAdmissionNo(cached.admissionNo);
                    return cached;
                }
            }
        } catch {}
        return null;
    });
    const [crmAttendance, setCrmAttendance] = useState(null);
    const [crmBatch, setCrmBatch] = useState(null);
    const [crmCertificates, setCrmCertificates] = useState([]);
    const [availableStudents, setAvailableStudents] = useState([]);
    const [assignedCourseIds, setAssignedCourseIds] = useState([]);
    const [studentCoursesAccess, setStudentCoursesAccess] = useState([]);
    const [assignmentsCount, setAssignmentsCount] = useState(0);
    const [crmLoading, setCrmLoading] = useState(true);

    // Fetch and bind live CRM student data
    const loadCrmDataForStudent = useCallback(async (admissionId) => {
        setCrmLoading(true);
        try {
            const targetId = admissionId || crmService.getSelectedStudentId();
            if (!targetId) {
                setCrmLoading(false);
                return;
            }
            crmService.setSelectedStudentId(targetId);

            const profile = await crmService.getStudentProfile(targetId);
            const studentName = profile?.name || studentUser?.name || '';

            const [attendance, batch, certs, studentsList, permissions, batchAssignments] = await Promise.all([
                crmService.getStudentAttendance(targetId),
                crmService.getBatchSchedule('Andheri'),
                crmService.getCertificates(studentName),
                crmService.getAvailableStudents(),
                lmsService.fetchStudentCoursePermissions(targetId),
                lmsService.fetchStudentBatchAssignments(targetId)
            ]);

            const profileRawDays =
                profile?.daysLeft !== undefined && profile?.daysLeft !== null
                    ? profile.daysLeft
                    : profile?.days_left;
            let profileParsedDays = null;
            if (profileRawDays !== undefined && profileRawDays !== null) {
                const p = parseInt(profileRawDays, 10);
                if (!isNaN(p)) profileParsedDays = p;
            }
            const access = checkStudentCourseAccess(profile, studentUser);
            const isProfileExpired = Boolean(
                (profileParsedDays !== null && profileParsedDays <= 0) ||
                access.isExpired
            );

            let activePermittedIds = [];
            if (permissions && Array.isArray(permissions)) {
                activePermittedIds = isProfileExpired
                    ? []
                    : permissions.filter(p => p.hasAccess).map(p => p.courseId);
                setStudentCoursesAccess(
                    isProfileExpired
                        ? permissions.map(p => ({ ...p, hasAccess: false }))
                        : permissions
                );
                setAssignedCourseIds(activePermittedIds);
                if (batchAssignments && Array.isArray(batchAssignments)) {
                    setAssignmentsCount(batchAssignments.length);
                }
            }

            if (profile) {
                setCrmProfile(profile);
                const resolvedAvatar = sanitizeMockAvatar(profile.photo || profile.avatar);
                try {
                    localStorage.setItem('om_lms_crm_cached_profile', JSON.stringify(profile));
                    if (resolvedAvatar) {
                        localStorage.setItem('om_lms_student_avatar', resolvedAvatar);
                    } else {
                        localStorage.removeItem('om_lms_student_avatar');
                    }
                } catch (e) {}

                setStudentUser((prev) => {
                    const branchBatchStr = `${profile.branch || prev.branch || ''} ${profile.course || prev.course || ''}`.toLowerCase();
                    const isAndheri = branchBatchStr.includes('andheri') || branchBatchStr.includes('ddm-a1');
                    const currentFacultyLead = isAndheri ? 'Nilkamal Mukharjee' : 'Rahul Shende';
                    const currentFacultyRole = isAndheri ? 'Lead Faculty - Andheri Center' : 'Lead Faculty - Borivali Center';

                    const profileRawDays =
                        profile?.daysLeft !== undefined && profile?.daysLeft !== null
                            ? profile.daysLeft
                            : profile?.days_left;
                    let profileParsedDays = null;
                    if (profileRawDays !== undefined && profileRawDays !== null) {
                        const p = parseInt(profileRawDays, 10);
                        if (!isNaN(p)) profileParsedDays = p;
                    }
                    const isProfileExpired = Boolean(
                        (profileParsedDays !== null && profileParsedDays <= 0) ||
                        checkStudentCourseAccess(profile, prev).isExpired
                    );
                    const safeCount = isProfileExpired ? 0 : activePermittedIds.length;

                    return {
                        ...prev,
                        id: profile.id ? `std-${profile.id}` : prev.id,
                        crmAdmissionId: profile.id || prev.crmAdmissionId,
                        admissionNo: formatAdmissionNo(profile.admissionNo || prev.admissionNo),
                        name: profile.name || prev.name,
                        fullName: profile.fullName || profile.name || prev.fullName,
                        email: profile.email || prev.email,
                        course: profile.course || prev.course,
                        branch: profile.branch || prev.branch,
                        center: profile.center || profile.branch || prev.center,
                        facultyLead: currentFacultyLead,
                        facultyLeadRole: currentFacultyRole,
                        designation: `${profile.course || 'Digital Marketing'} Student`,
                        avatar: resolvedAvatar || null,
                        enrolledCoursesCount: safeCount
                    };
                });
            } else {
                setStudentUser((prev) => {
                    const access = checkStudentCourseAccess(crmProfile, prev);
                    return {
                        ...prev,
                        enrolledCoursesCount: access.isExpired ? 0 : activePermittedIds.length
                    };
                });
            }

            const hasEnrolled = Boolean(
                attendance?.hasEnrolledBatch ||
                (attendance?.enrolledBatches && attendance.enrolledBatches.length > 0) ||
                profile?.batchName
            );

            if (attendance) setCrmAttendance(attendance);
            if (batch) {
                setCrmBatch({
                    ...batch,
                    isEnrolled: hasEnrolled,
                    batchName: hasEnrolled
                        ? (attendance?.primaryBatchName || profile?.batchName || batch.batchName)
                        : null,
                });
            }
            if (certs) setCrmCertificates(certs);
            if (studentsList) setAvailableStudents(studentsList);
        } catch (err) {
            console.error('Failed to load CRM data in AuthContext', err);
        } finally {
            setCrmLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCrmDataForStudent();
    }, [loadCrmDataForStudent]);

    // Live heartbeat: keeps student logged-in session active in CRM only when actively authenticated
    const [revocationNotice, setRevocationNotice] = useState(null);

    useEffect(() => {
        if (!isAuthenticated || role !== 'STUDENT') {
            return;
        }
        const studentId = crmProfile?.id || crmService.getSelectedStudentId();
        if (!studentId) {
            return;
        }

        // Send immediate heartbeat on login / mount
        lmsService.pingStudentActivity(studentId);

        // Ping every 5 seconds for near-instant (Netflix-grade) concurrent session revocation
        const interval = setInterval(() => {
            lmsService.pingStudentActivity(studentId);
        }, 5000);

        // Immediate ping whenever student switches tabs or focuses the window
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                lmsService.pingStudentActivity(studentId);
            }
        };
        const handleFocus = () => {
            lmsService.pingStudentActivity(studentId);
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('focus', handleFocus);

        return () => {
            clearInterval(interval);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('focus', handleFocus);
        };
    }, [isAuthenticated, role, crmProfile?.id]);

    // Listen for session revocation (if account is logged in on another device of the same slot)
    useEffect(() => {
        const handleSessionRevoked = (e) => {
            const msg = e.detail?.message || "Your session was terminated because your account was logged into on another device.";
            setRevocationNotice(msg);
            setIsAuthenticated(false);
            try {
                localStorage.removeItem(AUTH_KEY);
                localStorage.removeItem('om_lms_crm_cached_profile');
                localStorage.removeItem('om_lms_student_avatar');
                localStorage.removeItem('crm_selected_student_id');
                localStorage.removeItem('om_lms_session_token');
            } catch (err) {
                console.error("Storage clear error on revocation:", err);
            }
        };

        window.addEventListener("om_lms_session_revoked", handleSessionRevoked);
        return () => window.removeEventListener("om_lms_session_revoked", handleSessionRevoked);
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, role);
        } catch (err) {
            console.error('Failed to save role to localStorage', err);
        }
        if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('role-admin', role === 'ADMIN');
            document.documentElement.classList.toggle('role-student', role !== 'ADMIN');
            document.documentElement.setAttribute('data-role', role.toLowerCase());
        }
    }, [role]);

    const currentUser = role === 'ADMIN' ? adminUser : studentUser;

    const switchRole = (newRole) => {
        setRole(newRole);
    };

    const toggleRole = () => {
        setRole((prev) => (prev === 'ADMIN' ? 'STUDENT' : 'ADMIN'));
    };

    const login = (newRole = 'STUDENT') => {
        setRole(newRole);
        setIsAuthenticated(true);
        try {
            localStorage.setItem(AUTH_KEY, 'true');
        } catch (e) {
            console.error('Failed to save auth state to localStorage', e);
        }
    };

    const logout = () => {
        const studentId = crmProfile?.id || (role === 'STUDENT' ? crmService.getSelectedStudentId() : null);
        if (studentId) {
            lmsService.logoutStudentActivity(studentId).catch(() => {});
        }

        setIsAuthenticated(false);
        setCrmProfile(null);
        setCrmAttendance(null);
        setCrmBatch(null);
        setCrmCertificates([]);
        setStudentCoursesAccess([]);
        setAssignedCourseIds([]);
        setStudentUser(STUDENT_USER);

        try {
            localStorage.removeItem(AUTH_KEY);
            localStorage.removeItem('om_lms_crm_cached_profile');
            localStorage.removeItem('om_lms_student_avatar');
            localStorage.removeItem('crm_selected_student_id');
            localStorage.removeItem('om_lms_session_token');
        } catch (e) {
            console.error('Failed to clear auth state from localStorage', e);
        }
    };

    const switchCrmStudent = async (studentId) => {
        crmService.setSelectedStudentId(studentId);
        await loadCrmDataForStudent(studentId);
    };

    const refreshCrmData = async () => {
        await loadCrmDataForStudent();
    };

    const updateCurrentUser = (updates) => {
        if (role === 'ADMIN') {
            setAdminUser((prev) => ({ ...prev, ...updates }));
        } else {
            setStudentUser((prev) => {
                const next = { ...prev, ...updates };
                if (updates.avatar) {
                    try {
                        localStorage.setItem('om_lms_student_avatar', updates.avatar);
                    } catch (e) {
                        console.error('Failed to store avatar in localStorage', e);
                    }
                }
                return next;
            });
        }
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            currentUser,
            role,
            isAdmin: role === 'ADMIN',
            isStudent: role === 'STUDENT',
            switchRole,
            toggleRole,
            login,
            logout,
            updateCurrentUser,
            // Live CRM integrations
            crmProfile,
            crmAttendance,
            crmBatch,
            hasEnrolledBatch: Boolean(
                crmAttendance?.hasEnrolledBatch ||
                (crmAttendance?.enrolledBatches && crmAttendance.enrolledBatches.length > 0) ||
                crmProfile?.batchName ||
                crmBatch?.isEnrolled
            ),
            crmCertificates,
            availableStudents,
            assignedCourseIds,
            studentCoursesAccess,
            enrolledCoursesCount: Boolean(
                (crmProfile?.daysLeft !== undefined && crmProfile?.daysLeft !== null && parseInt(crmProfile.daysLeft, 10) <= 0) ||
                (crmProfile?.days_left !== undefined && crmProfile?.days_left !== null && parseInt(crmProfile.days_left, 10) <= 0) ||
                (currentUser?.daysLeft !== undefined && currentUser?.daysLeft !== null && parseInt(currentUser.daysLeft, 10) <= 0) ||
                checkStudentCourseAccess(crmProfile, currentUser).isExpired
            )
                ? 0
                : assignedCourseIds.length,
            assignmentsCount,
            crmLoading,
            switchCrmStudent,
            refreshCrmData
        }}>
            {children}
            {revocationNotice && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 999999,
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                    <div style={{
                        maxWidth: '440px',
                        width: '100%',
                        backgroundColor: '#ffffff',
                        borderRadius: '24px',
                        padding: '28px',
                        textAlign: 'center',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                        border: '2px solid rgba(239, 68, 68, 0.4)'
                    }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '20px',
                            backgroundColor: '#fee2e2',
                            color: '#dc2626',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 16px'
                        }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                        </div>
                        <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                            Session Terminated
                        </h3>
                        <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6', margin: '0 0 20px' }}>
                            {revocationNotice}
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                setRevocationNotice(null);
                                window.location.href = "/login";
                            }}
                            style={{
                                width: '100%',
                                backgroundColor: '#2563eb',
                                color: '#ffffff',
                                fontWeight: 700,
                                fontSize: '14px',
                                padding: '12px 20px',
                                borderRadius: '12px',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
                            }}
                        >
                            Log In on this Device
                        </button>
                    </div>
                </div>
            )}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};