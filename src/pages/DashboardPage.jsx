import React, { useState, useEffect } from 'react';
import { lmsService } from '../services/lmsService';
import { crmService } from '../services/crmService';
import { useAuth } from '../context/AuthContext';
import { StudentDashboardHub } from '../components/student/StudentDashboardHub';

export const DashboardPage = () => {
  const {
    currentUser,
    updateCurrentUser,
    crmProfile,
    crmAttendance,
    crmBatch,
    crmCertificates,
    assignedCourseIds,
    studentCoursesAccess,
    enrolledCoursesCount,
  } = useAuth();

  const courses = lmsService.getCourses();
  const quizzes = lmsService.getQuizzes();
  const achievements = lmsService.getAchievements().filter(a => a.unlocked);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const studentId =
      crmProfile?.id ||
      currentUser?.admissionId ||
      currentUser?.id ||
      crmService.getSelectedStudentId();

    if (studentId) {
      lmsService
        .fetchStudentBatchAssignments(studentId)
        .then((data) => {
          if (isMounted) {
            setAssignments(Array.isArray(data) ? data : []);
          }
        })
        .catch((err) => {
          console.warn("Could not load student batch assignments:", err);
          if (isMounted) setAssignments([]);
        });
    } else {
      setAssignments([]);
    }

    return () => {
      isMounted = false;
    };
  }, [crmProfile?.id, currentUser?.admissionId, currentUser?.id]);

  return (
    <StudentDashboardHub
      currentUser={currentUser}
      crmProfile={crmProfile}
      crmAttendance={crmAttendance}
      crmBatch={crmBatch}
      crmCertificates={crmCertificates}
      courses={courses}
      quizzes={quizzes}
      assignments={assignments}
      achievements={achievements}
      assignedCourseIds={assignedCourseIds}
      studentCoursesAccess={studentCoursesAccess}
      enrolledCoursesCount={enrolledCoursesCount}
      onUpdateCurrentUser={updateCurrentUser}
    />
  );
};

export default DashboardPage;
