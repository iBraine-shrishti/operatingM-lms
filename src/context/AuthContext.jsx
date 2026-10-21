import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import boyAvatar from '../assets/Boy.png';
import girlAvatar from '../assets/Girl.png';
import profilePic from '../assets/profile-pic.png';
import sahilProfilePic from '../assets/sahil-profile.png';
import premPhotoImg from '../assets/Prem_Photo.jpg';
import premPassportPhotoImg from '../assets/Prem_Photo_Passport.png';
import { crmService, DEFAULT_CRM_PROFILE, DEFAULT_CRM_ATTENDANCE, DEFAULT_CRM_BATCH, DEFAULT_CRM_CERTIFICATES } from '../services/crmService';
import { lmsService } from '../services/lmsService';

export { boyAvatar, girlAvatar, profilePic, sahilProfilePic, premPhotoImg, premPassportPhotoImg };

export const ADMIN_USER = {
    id: 'admin-1',
    name: 'Vishal Chaurasiya',
    email: 'vishal.c@operatingmedia.com',
    role: 'ADMIN',
    roleLabel: 'HR_ADMIN',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    designation: 'Head of Operations & Lead Instructor'
};

export const STUDENT_USER = {
    id: 'std-375',
    crmAdmissionId: 375,
    admissionNo: 'OMC-0375',
    name: 'Sahil Hasolkar',
    fullName: 'Sahil Nilesh Hasolkar',
    email: 'hasolkarsahil@gmail.com',
    phone: '919372017331',
    dob: '28 Nov 2006',
    gender: 'Male',
    maritalStatus: 'Single',
    admissionDate: '22 Apr 2026',
    registrationDate: '18 Apr 2026',
    facultyLead: 'Rahul Shende',
    facultyLeadRole: 'Lead Faculty - Borivali Center',
    role: 'STUDENT',
    roleLabel: 'STUDENT',
    avatar: sahilProfilePic, // Sahil Hasolkar verified photo
    designation: 'Masters in Digital Marketing Student',
    course: 'Masters in Digital Marketing',
    center: 'Borivali Center',
    branch: 'Borivali Center',
    batchCode: 'WD-M1',
    batchName: 'WD-M1',
    enrolledCoursesCount: 0,
    completedCoursesCount: 0,
    overallProgress: 0,
    joinedDate: '2026-04-22'
};

const AuthContext = createContext(undefined);
const STORAGE_KEY = 'om_lms_current_role';

export const AuthProvider = ({ children }) => {
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
            const savedAvatar = localStorage.getItem('om_lms_student_avatar');
            if (cachedProfileStr) {
                const cached = JSON.parse(cachedProfileStr);
                if (cached?.photo || cached?.avatar) {
                    initial.avatar = cached.photo || cached.avatar;
                }
                if (cached?.name) initial.name = cached.name;
                if (cached?.fullName) initial.fullName = cached.fullName;
                if (cached?.admissionNo) initial.admissionNo = cached.admissionNo;
                if (cached?.course) initial.course = cached.course;
                if (cached?.branch) initial.branch = cached.branch;
                if (cached?.center) initial.center = cached.center;
                if (cached?.id) initial.crmAdmissionId = cached.id;
            } else if (savedAvatar && savedAvatar !== boyAvatar && savedAvatar !== girlAvatar && savedAvatar !== profilePic && savedAvatar !== premPassportPhotoImg && savedAvatar !== premPhotoImg) {
                initial.avatar = savedAvatar;
            } else {
                initial.avatar = sahilProfilePic;
            }
        } catch {
            initial.avatar = sahilProfilePic;
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
                    return cached;
                }
            }
        } catch {}
        return DEFAULT_CRM_PROFILE;
    });
    const [crmAttendance, setCrmAttendance] = useState(DEFAULT_CRM_ATTENDANCE);
    const [crmBatch, setCrmBatch] = useState(DEFAULT_CRM_BATCH);
    const [crmCertificates, setCrmCertificates] = useState(DEFAULT_CRM_CERTIFICATES);
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
            crmService.setSelectedStudentId(targetId);

            const profile = await crmService.getStudentProfile(targetId);
            const studentName = profile?.name || 'Aditya Jadhav';

            const [attendance, batch, certs, studentsList, permissions, batchAssignments] = await Promise.all([
                crmService.getStudentAttendance(1039), // maps to active attendance cohort
                crmService.getBatchSchedule('Andheri'),
                crmService.getCertificates(studentName),
                crmService.getAvailableStudents(),
                lmsService.fetchStudentCoursePermissions(targetId),
                lmsService.fetchStudentBatchAssignments(targetId)
            ]);

            let activePermittedIds = [];
            if (permissions && Array.isArray(permissions)) {
                activePermittedIds = permissions.filter(p => p.hasAccess).map(p => p.courseId);
                setStudentCoursesAccess(permissions);
                setAssignedCourseIds(activePermittedIds); if (batchAssignments && Array.isArray(batchAssignments)) { setAssignmentsCount(batchAssignments.length); }
            }

            if (profile) {
                setCrmProfile(profile);
                const resolvedAvatar = profile.photo || profile.avatar || sahilProfilePic;
                try {
                    localStorage.setItem('om_lms_crm_cached_profile', JSON.stringify(profile));
                    if (resolvedAvatar && resolvedAvatar !== sahilProfilePic) {
                        localStorage.setItem('om_lms_student_avatar', resolvedAvatar);
                    }
                } catch (e) {}

                setStudentUser((prev) => {
                    const branchBatchStr = `${profile.branch || prev.branch || ''} ${profile.course || prev.course || ''}`.toLowerCase();
                    const isAndheri = branchBatchStr.includes('andheri') || branchBatchStr.includes('ddm-a1');
                    const currentFacultyLead = isAndheri ? 'Nilkamal Mukharjee' : 'Rahul Shende';
                    const currentFacultyRole = isAndheri ? 'Lead Faculty - Andheri Center' : 'Lead Faculty - Borivali Center';

                    return {
                        ...prev,
                        crmAdmissionId: profile.id || prev.crmAdmissionId,
                        admissionNo: profile.admissionNo || prev.admissionNo,
                        name: profile.name || prev.name,
                        fullName: profile.fullName || profile.name || prev.fullName,
                        email: profile.email || prev.email,
                        course: profile.course || prev.course,
                        branch: profile.branch || prev.branch,
                        center: profile.center || profile.branch || prev.center,
                        facultyLead: currentFacultyLead,
                        facultyLeadRole: currentFacultyRole,
                        designation: `${profile.course || 'Digital Marketing'} Student`,
                        avatar: resolvedAvatar,
                        enrolledCoursesCount: activePermittedIds.length
                    };
                });
            } else {
                setStudentUser((prev) => ({
                    ...prev,
                    enrolledCoursesCount: activePermittedIds.length
                }));
            }

            if (attendance) setCrmAttendance(attendance);
            if (batch) setCrmBatch(batch);
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

    const login = (newRole) => {
        setRole(newRole);
    };

    const logout = () => {
        setRole('STUDENT');
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
            crmCertificates,
            availableStudents,
            assignedCourseIds,
            studentCoursesAccess,
            enrolledCoursesCount: assignedCourseIds.length,
            assignmentsCount,
            crmLoading,
            switchCrmStudent,
            refreshCrmData
        }}>
            {children}
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
