import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SharedLayout } from "./components/layout/SharedLayout";

// Student Learning Pages
import { DashboardPage } from "./pages/DashboardPage";
import { CourseDetailPage } from "./pages/CourseDetailPage";
import { EnrolledCoursesPage } from "./pages/EnrolledCoursesPage";
import { LessonPlayerPage } from "./pages/LessonPlayerPage";
import { MyQuizzesPage } from "./pages/MyQuizzesPage";
import { TakeQuizPage } from "./pages/TakeQuizPage";
import { MyAssignmentsPage } from "./pages/MyAssignmentsPage";
import { TakeAssignmentPage } from "./pages/TakeAssignmentPage";
import { AchievementsPage } from "./pages/AchievementsPage";
import { NotesReviewsPage } from "./pages/NotesReviewsPage";
import { ActivityPage } from "./pages/ActivityPage";
import { ProfilePage } from "./pages/ProfilePage";
import { GalleryPage } from "./pages/GalleryPage";
import { SchedulePage } from "./pages/SchedulePage";
import { QuestionDiscussionsPage } from "./pages/QuestionDiscussionsPage";
import { LoginPage } from "./pages/LoginPage.jsx";
import { CertificateVerificationPage } from "./pages/CertificateVerificationPage.jsx";
import { OfficialExamPage } from "./pages/OfficialExamPage.jsx";

import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { ThemeProvider } from "./context/ThemeContext";

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/verify-certificate" element={<CertificateVerificationPage />} />

              {/* Student App Shell Layout */}
              <Route path="/" element={<SharedLayout />}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="courses/:id" element={<CourseDetailPage />} />
                <Route path="enrolled-courses" element={<EnrolledCoursesPage />} />
                <Route path="lesson-player" element={<LessonPlayerPage />} />
                <Route path="my-quizzes" element={<MyQuizzesPage />} />
                <Route path="take-quiz/:id" element={<TakeQuizPage />} />
                <Route path="take-quiz" element={<TakeQuizPage />} />
                <Route path="my-assignments" element={<MyAssignmentsPage />} />
                <Route path="take-assignment/:id" element={<TakeAssignmentPage />} />
                <Route path="take-assignment" element={<TakeAssignmentPage />} />
                <Route path="achievements" element={<AchievementsPage />} />
                <Route path="notes-reviews" element={<NotesReviewsPage />} />
                <Route path="notes" element={<NotesReviewsPage />} />
                <Route path="activity" element={<ActivityPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="forums" element={<QuestionDiscussionsPage />} />
                <Route path="forums/:postId" element={<QuestionDiscussionsPage />} />
                <Route path="question-discussions" element={<QuestionDiscussionsPage />} />
                <Route path="question-discussions/:postId" element={<QuestionDiscussionsPage />} />
                <Route path="schedule" element={<SchedulePage />} />
                <Route path="attendance-fees" element={<Navigate to="/profile?tab=attendance" replace />} />
                <Route path="gallery" element={<GalleryPage />} />
                <Route path="exam" element={<OfficialExamPage />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
