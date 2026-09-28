import React, { createContext, useContext, useState, useEffect } from 'react';
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
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
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
    const [studentUser, setStudentUser] = useState(STUDENT_USER);
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
            setStudentUser((prev) => ({ ...prev, ...updates }));
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
