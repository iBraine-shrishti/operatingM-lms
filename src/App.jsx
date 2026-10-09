import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SharedLayout } from "./components/layout/SharedLayout";
// Pages
import { ManageCoursesPage } from "./pages/ManageCoursesPage";
import { DashboardPage } from "./pages/DashboardPage";
import { CreateCoursePage } from "./pages/CreateCoursePage";
import { CreateQuizPage } from "./pages/CreateQuizPage";
import { CreateAssignmentPage } from "./pages/CreateAssignmentPage";
import { CourseDetailPage } from "./pages/CourseDetailPage";
import { ManageUnitsPage } from "./pages/ManageUnitsPage";
import { ManageQuizzesPage } from "./pages/ManageQuizzesPage";
import { ManageAssignmentsPage } from "./pages/ManageAssignmentsPage";
import { ManageStudentsPage } from "./pages/ManageStudentsPage";
import { ManageQuestionsPage } from "./pages/ManageQuestionsPage";
import { QuestionDiscussionsPage } from "./pages/QuestionDiscussionsPage";
import { ManageReportsPage } from "./pages/ManageReportsPage";
import { EnrolledCoursesPage } from "./pages/EnrolledCoursesPage";
import { LessonPlayerPage } from "./pages/LessonPlayerPage";
import { MyQuizzesPage } from "./pages/MyQuizzesPage";
import { MyAssignmentsPage } from "./pages/MyAssignmentsPage";
import { TakeQuizPage } from "./pages/TakeQuizPage";
import { TakeAssignmentPage } from "./pages/TakeAssignmentPage";
import { AchievementsPage } from "./pages/AchievementsPage";
import { NotesReviewsPage } from "./pages/NotesReviewsPage";
import { ActivityPage } from "./pages/ActivityPage";
import { ProfilePage } from "./pages/ProfilePage";
import { GalleryPage } from "./pages/GalleryPage";
import { SchedulePage } from "./pages/SchedulePage";
import { AttendanceFeesPage } from "./pages/AttendanceFeesPage";
import { LoginPage } from "./pages/LoginPage.jsx";
import { CertificateVerificationPage } from "./pages/CertificateVerificationPage.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { ThemeProvider } from "./context/ThemeContext";
function RootRedirect() {
    const { isStudent } = useAuth();
    return <Navigate to={isStudent ? "/dashboard" : "/dashboard"} replace/>;
}
export function App() {
    return (
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/verify-certificate" element={<CertificateVerificationPage />}/>

          {/* Shared App Shell Layout */}
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<RootRedirect />}/>
            <Route path="manage-courses" element={<ManageCoursesPage />}/>
            <Route path="courses" element={<ManageCoursesPage />}/>
            <Route path="courses/:id" element={<CourseDetailPage />}/>
            <Route path="dashboard" element={<DashboardPage />}/>
            <Route path="create-course" element={<CreateCoursePage />}/>
            <Route path="edit-course/:id" element={<CreateCoursePage />}/>
            <Route path="create-quiz" element={<CreateQuizPage />}/>
            <Route path="manage-units" element={<ManageUnitsPage />}/>
            <Route path="manage-quizzes" element={<ManageQuizzesPage />}/>
            <Route path="manage-assignments" element={<ManageAssignmentsPage />}/>
            <Route path="create-assignment" element={<CreateAssignmentPage />}/>
            <Route path="edit-assignment/:id" element={<CreateAssignmentPage />}/>
            <Route path="manage-students" element={<ManageStudentsPage />}/>
            <Route path="manage-questions" element={<ManageQuestionsPage />}/>
            <Route path="question-discussions" element={<QuestionDiscussionsPage />}/>
            <Route path="forums" element={<QuestionDiscussionsPage />}/>
            <Route path="manage-reports" element={<ManageReportsPage />}/>
            <Route path="schedule" element={<SchedulePage />}/>
            <Route path="attendance-fees" element={<Navigate to="/profile?tab=attendance" replace />}/>
            <Route path="enrolled-courses" element={<EnrolledCoursesPage />}/>
            <Route path="lesson-player" element={<LessonPlayerPage />}/>
            <Route path="my-quizzes" element={<MyQuizzesPage />}/>
            <Route path="take-quiz/:id" element={<TakeQuizPage />}/>
            <Route path="take-quiz" element={<TakeQuizPage />}/>
            <Route path="my-assignments" element={<MyAssignmentsPage />}/>
            <Route path="take-assignment/:id" element={<TakeAssignmentPage />}/>
            <Route path="take-assignment" element={<TakeAssignmentPage />}/>
            <Route path="achievements" element={<AchievementsPage />}/>
            <Route path="notes-reviews" element={<NotesReviewsPage />}/>
            <Route path="notes" element={<NotesReviewsPage />}/>
            <Route path="activity" element={<ActivityPage />}/>
            <Route path="profile" element={<ProfilePage />}/>
            <Route path="gallery" element={<GalleryPage />}/>
          </Route>
        </Routes>
        </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
export default App;
