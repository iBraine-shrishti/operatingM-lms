import React, { createContext, useContext, useState, useEffect } from 'react';
import boyAvatar from '../assets/Boy.png';
import girlAvatar from '../assets/Girl.png';

export { boyAvatar, girlAvatar };

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
    id: 'std-1',
    name: 'Aarav Patel',
    email: 'aarav.patel@operatingmedia.com',
    role: 'STUDENT',
    roleLabel: 'STUDENT',
    avatar: boyAvatar,
    designation: 'Digital Marketing & SEO Student',
    enrolledCoursesCount: 4,
    completedCoursesCount: 2,
    overallProgress: 78,
    joinedDate: '2026-01-12'
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
        }
        catch {
            // fallback
        }
        return 'ADMIN';
    });
    const [adminUser, setAdminUser] = useState(ADMIN_USER);
    const [studentUser, setStudentUser] = useState(() => {
        const initial = { ...STUDENT_USER };
        try {
            const params = new URLSearchParams(window.location.search);
            const queryAvatar = params.get('avatar')?.toLowerCase();
            if (queryAvatar === 'girl') {
                initial.avatar = girlAvatar;
                return initial;
            }
            if (queryAvatar === 'boy') {
                initial.avatar = boyAvatar;
                return initial;
            }
            const savedAvatar = localStorage.getItem('om_lms_student_avatar');
            if (savedAvatar) {
                initial.avatar = savedAvatar;
            } else {
                initial.avatar = boyAvatar;
            }
        } catch {
            initial.avatar = boyAvatar;
        }
        return initial;
    });
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, role);
        }
        catch (err) {
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
        setRole('ADMIN');
    };
    const updateCurrentUser = (updates) => {
        if (role === 'ADMIN') {
            setAdminUser((prev) => ({ ...prev, ...updates }));
        }
        else {
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
    return (<AuthContext.Provider value={{
            currentUser,
            role,
            isAdmin: role === 'ADMIN',
            isStudent: role === 'STUDENT',
            switchRole,
            toggleRole,
            login,
            logout,
            updateCurrentUser
        }}>
      {children}
    </AuthContext.Provider>);
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
