import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import boyAvatar from '../assets/Boy.png';
import girlAvatar from '../assets/Girl.png';
import profilePic from '../assets/profile-pic.png';
import { crmService, DEFAULT_CRM_PROFILE, DEFAULT_CRM_ATTENDANCE, DEFAULT_CRM_BATCH, DEFAULT_CRM_CERTIFICATES } from '../services/crmService';

export { boyAvatar, girlAvatar, profilePic };

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
    id: 'std-265',
    crmAdmissionId: 265,
    admissionNo: 'OMC-0266',
    name: 'Hiteshpuri Goswami',
    email: 'hiteshpuri.g@gmail.com',
    role: 'STUDENT',
    roleLabel: 'STUDENT',
    avatar: profilePic, // Official CRM uploaded student photograph from profile-pic.png
    designation: 'Diploma in Digital Marketing Student',
    course: 'Diploma in Digital Marketing',
    center: 'Borivali Center',
    branch: 'Borivali Center',
    enrolledCoursesCount: 4,
    completedCoursesCount: 2,
    overallProgress: 65,
    joinedDate: '2026-02-10'
};

const AuthContext = createContext(undefined);
const STORAGE_KEY = 'om_lms_current_role';

export const AuthProvider = ({ children }) => {
    const [role, setRole] = useState(() => {
        try {
            const params = new URLSearchParams(window.location.search);
            const queryRole = params.get('role')?.toUpperCase();
            if (queryRole === 'STUDENT' || queryRole === 'ADMIN') {
                return queryRole;
            }
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved === 'STUDENT' || saved === 'ADMIN') {
                return saved;
            }
        } catch {
            // fallback
        }
        return 'STUDENT'; // Default to STUDENT UI so the user immediately sees the student CRM data on load!
    });

    const [adminUser, setAdminUser] = useState(ADMIN_USER);
    const [studentUser, setStudentUser] = useState(() => {
        const initial = { ...STUDENT_USER };
        try {
            const savedAvatar = localStorage.getItem('om_lms_student_avatar');
            if (savedAvatar && savedAvatar !== boyAvatar && savedAvatar !== girlAvatar && savedAvatar !== '/student_photo_265.jpg') {
                initial.avatar = savedAvatar;
            } else {
                initial.avatar = profilePic;
            }
        } catch {
            initial.avatar = profilePic;
        }
        return initial;
    });

    // Live CRM states
    const [crmProfile, setCrmProfile] = useState(DEFAULT_CRM_PROFILE);
    const [crmAttendance, setCrmAttendance] = useState(DEFAULT_CRM_ATTENDANCE);
    const [crmBatch, setCrmBatch] = useState(DEFAULT_CRM_BATCH);
    const [crmCertificates, setCrmCertificates] = useState(DEFAULT_CRM_CERTIFICATES);
    const [availableStudents, setAvailableStudents] = useState([]);
    const [crmLoading, setCrmLoading] = useState(true);

    // Fetch and bind live CRM student data
    const loadCrmDataForStudent = useCallback(async (admissionId) => {
        setCrmLoading(true);
        try {
            const targetId = admissionId || crmService.getSelectedStudentId();
            crmService.setSelectedStudentId(targetId);

            const profile = await crmService.getStudentProfile(targetId);
            const studentName = profile?.name || 'Aditya Jadhav';

            const [attendance, batch, certs, studentsList] = await Promise.all([
                crmService.getStudentAttendance(1039), // maps to active attendance cohort
                crmService.getBatchSchedule('Andheri'),
                crmService.getCertificates(studentName),
                crmService.getAvailableStudents()
            ]);

            if (profile) {
                setCrmProfile(profile);
                // Directly integrate and bind uploaded photograph if available!
                setStudentUser((prev) => {
                    const avatarUrl = (profile.photo && profile.photo !== '/student_photo_265.jpg') ? profile.photo : profilePic;
                    return {
                        ...prev,
                        crmAdmissionId: profile.id,
                        admissionNo: profile.admissionNo,
                        name: profile.name || prev.name,
                        email: profile.email || prev.email,
                        course: profile.course || prev.course,
                        designation: `${profile.course || 'Digital Marketing'} Student`,
                        avatar: avatarUrl
                    };
                });
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
