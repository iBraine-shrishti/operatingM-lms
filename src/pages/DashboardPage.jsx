import React from 'react';
import { lmsService } from '../services/lmsService';
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
  const assignments = lmsService.getAssignments();

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
