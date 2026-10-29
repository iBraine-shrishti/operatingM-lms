import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { mapStudentDataFromCrm } from "../components/profile";
import { lmsService } from "../services/lmsService";
import { crmService } from "../services/crmService";

import {
  EXAM_TRACKS,
  getQuestionsForTrack,
  ExamHeader,
  ExamCourseSelector,
  ExamBriefingView,
  ExamLiveRunner,
  ExamScorecardView,
  ExamExitModal,
  ExamWarningModal,
} from "../components/exam";

/**
 * OfficialExamPage: Complete Google Skills Exam (Skillshop) Assessment Workflow.
 * Stages:
 *  1. "CATALOG"   -> Browse & select specialized course certification track
 *  2. "BRIEFING"  -> Candidate verification passport admit card & honor pledge
 *  3. "LIVE_EXAM" -> Proctored test execution runner with window lockdown
 *  4. "SCORECARD" -> Official credential scorecard & performance transcript
 */
export const OfficialExamPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { currentUser, crmProfile } = useAuth();
  const studentData = mapStudentDataFromCrm(crmProfile, currentUser);

  // Candidate identity details
  const candidateName = studentData?.name || currentUser?.name || "Student";
  const rollNumber =
    studentData?.studentId || currentUser?.admissionNo || "OMC-0375";
  const candidateAvatar = studentData?.avatar || currentUser?.avatar || null;
  const centerNode = `${studentData?.center || "Borivali Center"} • Assessment Node`;
  const sessionHash = "SHA256: 9e887f4c10a30b2e847d91";

  const studentUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("om_lms_student_user") || "{}");
    } catch {
      return {};
    }
  }, []);

  const cachedProfile = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("om_lms_crm_cached_profile") || "{}");
    } catch {
      return {};
    }
  }, []);

  const cleanSid = String(
    crmService.getSelectedStudentId() ||
    crmProfile?.id ||
    currentUser?.crmAdmissionId ||
    currentUser?.id ||
    studentUser.id ||
    studentUser.student_id ||
    cachedProfile.id ||
    cachedProfile.crmAdmissionId ||
    "267"
  ).replace("std-", "");

  const [assignedTracks, setAssignedTracks] = useState([]);
  const [isLoadingTracks, setIsLoadingTracks] = useState(true);

  // Stage state: "CATALOG" | "BRIEFING" | "LIVE_EXAM" | "SCORECARD"
  const [examStage, setExamStage] = useState("CATALOG");
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [questions, setQuestions] = useState([]);

  // Fetch dynamic assigned exams for this student
  useEffect(() => {
    let isMounted = true;
    const loadAssignedExams = async () => {
      try {
        setIsLoadingTracks(true);
        const dynamicExams = await lmsService.fetchStudentExams(cleanSid);
        if (isMounted) {
          setAssignedTracks(dynamicExams || []);
          if (dynamicExams && dynamicExams.length > 0) {
            const trackParam = searchParams.get("track");
            const matched = trackParam ? dynamicExams.find(t => String(t.id) === String(trackParam)) : null;
            setSelectedTrack(matched || dynamicExams[0]);
          }
        }
      } catch (err) {
        console.warn("Could not load assigned exams:", err);
      } finally {
        if (isMounted) setIsLoadingTracks(false);
      }
    };
    loadAssignedExams();
    return () => { isMounted = false; };
  }, [cleanSid, searchParams]);

  // Security lockdown state (3 Warnings Total)
  const MAX_WARNINGS = 3;
  const [fullscreenActive, setFullscreenActive] = useState(false);
  const [pledgeAccepted, setPledgeAccepted] = useState(false);
  const [securityStrikes, setSecurityStrikes] = useState(0);
  const [strikeAlert, setStrikeAlert] = useState(null);
  const [showExitHallModal, setShowExitHallModal] = useState(false);

  // Live Exam Runner state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(3600);

  // Final evaluation result
  const [examResult, setExamResult] = useState(null);

  const containerRef = useRef(null);
  const lastStrikeTimeRef = useRef(0);
  const strikeAlertRef = useRef(null);
  const examStageRef = useRef(examStage);
  const securityStrikesRef = useRef(securityStrikes);

  useEffect(() => {
    examStageRef.current = examStage;
  }, [examStage]);

  useEffect(() => {
    securityStrikesRef.current = securityStrikes;
  }, [securityStrikes]);

  useEffect(() => {
    strikeAlertRef.current = strikeAlert;
  }, [strikeAlert]);

  // Window blur / tab switch detector during LIVE_EXAM
  useEffect(() => {
    if (examStage !== "LIVE_EXAM") return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        triggerSecurityStrike("Tab switch or window minimized detected");
      }
    };

    const handleWindowBlur = () => {
      triggerSecurityStrike("Window unfocused or secondary application active");
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [examStage]);

  const triggerSecurityStrike = (reason) => {
    if (examStageRef.current !== "LIVE_EXAM") return;

    const now = Date.now();
    if (strikeAlertRef.current || now - lastStrikeTimeRef.current < 4000) {
      return;
    }
    lastStrikeTimeRef.current = now;

    const newStrikes = securityStrikesRef.current + 1;
    setSecurityStrikes(newStrikes);
    securityStrikesRef.current = newStrikes;

    const alertData = {
      strikeNumber: newStrikes,
      reason,
      remaining: Math.max(0, MAX_WARNINGS - newStrikes),
    };
    setStrikeAlert(alertData);
    strikeAlertRef.current = alertData;

    if (newStrikes >= MAX_WARNINGS) {
      setTimeout(() => {
        setStrikeAlert(null);
        strikeAlertRef.current = null;
        handleFinalSubmission(true);
      }, 2500);
    }
  };

  // Live Timer countdown
  useEffect(() => {
    if (examStage !== "LIVE_EXAM") return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinalSubmission(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examStage]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // 1. SELECT TRACK FROM CATALOG
  const handleSelectTrack = async (track) => {
    setSelectedTrack(track);
    setSelectedAnswers({});
    setMarkedForReview({});
    setCurrentQuestionIndex(0);
    setSecurityStrikes(0);
    setStrikeAlert(null);
    setExamResult(null);
    setPledgeAccepted(false);

    // Fetch dynamic questions for this exam
    try {
      const detail = await lmsService.fetchExamDetail(track.id || track.numericId);
      if (detail && detail.questions && detail.questions.length > 0) {
        const mappedQuestions = detail.questions.map((q, idx) => ({
          id: q.id || idx + 1,
          text: q.question || q.text || "",
          question: q.question || q.text || "",
          marks: q.marks || 1,
          options: (q.options || []).map((opt) => ({
            id: opt.id || opt.key || "A",
            text: opt.text || opt.label || "",
          })),
          correctAnswer: q.correctAnswer || q.correct_answer || "A",
          explanation: q.explanation || "",
          difficulty: q.difficulty || "Advanced",
        }));
        setQuestions(mappedQuestions);
      } else {
        setQuestions(getQuestionsForTrack(track.id));
      }
    } catch (err) {
      console.warn("Could not fetch exam questions from backend:", err);
      setQuestions(getQuestionsForTrack(track.id));
    }

    setTimeRemaining(track.durationSeconds || (track.durationMinutes ? track.durationMinutes * 60 : 3600));

    try {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } catch {}

    setFullscreenActive(true);
    setExamStage("BRIEFING");
  };

  // 2. START PROCTORED EXAM
  const handleStartExam = () => {
    if (!pledgeAccepted) return;

    try {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } catch {}

    setFullscreenActive(true);
    setExamStage("LIVE_EXAM");
  };

  // 3. SELECT OPTION / NAVIGATION
  const handleSelectOption = (qId, optionId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: optionId,
    }));
  };

  const handleToggleReview = (qId) => {
    setMarkedForReview((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  const handleClearAnswer = (qId) => {
    setSelectedAnswers((prev) => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
  };

  const goToQuestion = (index) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
    }
  };

  // 4. SUBMIT AND EVALUATE PAPER
  const handleFinalSubmission = (isDisqualified = false) => {
    let totalCorrect = 0;
    let totalIncorrect = 0;
    let totalUnattempted = 0;
    const domainScores = {};

    questions.forEach((q) => {
      const secKey = q.sectionId || "general";
      if (!domainScores[secKey]) {
        domainScores[secKey] = {
          name: q.sectionName || selectedTrack.shortTitle,
          correct: 0,
          total: 0,
        };
      }
      domainScores[secKey].total += 1;

      const studentAns = selectedAnswers[q.id];
      if (!studentAns) {
        totalUnattempted += 1;
      } else if (studentAns === q.correctAnswer) {
        totalCorrect += 1;
        domainScores[secKey].correct += 1;
      } else {
        totalIncorrect += 1;
      }
    });

    const marksPositive = totalCorrect * (selectedTrack.marksPerQuestion || 2.0);
    const penaltyDeduction = 0.0; // Strictly zero negative marking
    const finalScore = Number(marksPositive.toFixed(2));
    const maxScore = Number((questions.length * (selectedTrack.marksPerQuestion || 2.0)).toFixed(2));
    const percentage = Number(((finalScore / maxScore) * 100).toFixed(1));
    const passed = !isDisqualified && percentage >= (selectedTrack.passingScorePercent || 85.0);

    const certId = `${selectedTrack.code}-${Math.floor(100000 + Math.random() * 900000)}`;

    setExamResult({
      isDisqualified,
      totalCorrect,
      totalIncorrect,
      totalUnattempted,
      marksPositive,
      penaltyDeduction,
      finalScore,
      maxScore,
      percentage,
      passed,
      domainScores,
      timeSpentSeconds: selectedTrack.durationSeconds - timeRemaining,
      submissionTimestamp: new Date().toLocaleString("en-IN", {
        dateStyle: "full",
        timeStyle: "medium",
      }),
      certificateId: certId,
    });

    if (passed) {
      try {
        const certObj = {
          id: certId,
          certificate_id: certId,
          course: selectedTrack.title,
          category: selectedTrack.badgeText || "Specialist Track",
          date: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          rating: Number((percentage / 10).toFixed(1)),
          grade:
            percentage >= 95
              ? "A+ Distinction"
              : percentage >= 90
              ? "Honors with Distinction"
              : "Certified Specialist",
          badgeType:
            selectedTrack.categoryKey === "seo"
              ? "green"
              : selectedTrack.categoryKey === "wordpress"
              ? "purple"
              : selectedTrack.categoryKey === "google-ads"
              ? "gold"
              : "blue",
          badgeTitle: selectedTrack.shortTitle
            ? `${selectedTrack.shortTitle.toUpperCase()}`
            : "CERTIFIED",
          shortDetail: selectedTrack.description
            ? selectedTrack.description.slice(0, 52) + "..."
            : "Official examination completed",
          unlocked: true,
          percentage,
          examTrackId: selectedTrack.id,
          categoryBadgeColor:
            selectedTrack.categoryKey === "seo"
              ? "border-emerald-200 bg-emerald-50/80 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-700/80"
              : selectedTrack.categoryKey === "wordpress"
              ? "border-purple-200 bg-purple-50/80 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-700/80"
              : "border-blue-200 bg-blue-50/80 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-700/80",
          gradeBadgeColor:
            "border-amber-200 bg-amber-50/80 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700/80",
          glowColor:
            selectedTrack.categoryKey === "seo"
              ? "from-white via-white to-emerald-50/50 dark:from-[#0b1329] dark:to-emerald-950/30"
              : selectedTrack.categoryKey === "wordpress"
              ? "from-white via-white to-purple-50/50 dark:from-[#0b1329] dark:to-purple-950/30"
              : "from-white via-white to-blue-50/50 dark:from-[#0b1329] dark:to-blue-950/30",
        };
        const existingRaw = localStorage.getItem("om_lms_exam_certificates");
        const existing = existingRaw ? JSON.parse(existingRaw) : [];
        const filtered = existing.filter((c) => c.examTrackId !== selectedTrack.id);
        localStorage.setItem(
          "om_lms_exam_certificates",
          JSON.stringify([certObj, ...filtered])
        );
      } catch (err) {
        console.warn("Could not save exam certificate to localStorage:", err);
      }
    }

    // Submit to backend dynamically
    try {
      lmsService.submitStudentExam(
        cleanSid,
        selectedTrack.id || selectedTrack.numericId,
        selectedAnswers,
        (selectedTrack.durationSeconds || 3600) - timeRemaining
      );
    } catch (err) {
      console.warn("Could not submit exam to backend:", err);
    }

    setStrikeAlert(null);
    strikeAlertRef.current = null;
    setExamStage("SCORECARD");

    if (document.fullscreenElement) {
      try {
        document.exitFullscreen().catch(() => {});
      } catch {}
    }
  };

  // 5. RETAKE CURRENT EXAM
  const handleRetakeExam = () => {
    setSelectedAnswers({});
    setMarkedForReview({});
    setCurrentQuestionIndex(0);
    setTimeRemaining(selectedTrack.durationSeconds);
    setSecurityStrikes(0);
    setStrikeAlert(null);
    setExamResult(null);
    setPledgeAccepted(false);
    setExamStage("BRIEFING");
  };

  // 6. BACK TO CATALOG
  const handleBackToCatalog = () => {
    if (examStage === "LIVE_EXAM") {
      setShowExitHallModal(true);
    } else {
      if (document.fullscreenElement) {
        try {
          document.exitFullscreen().catch(() => {});
        } catch {}
      }
      setFullscreenActive(false);
      setExamStage("CATALOG");
    }
  };

  // 7. EXIT HALL
  const handleExitHall = () => {
    if (examStage === "LIVE_EXAM") {
      setShowExitHallModal(true);
    } else {
      if (document.fullscreenElement) {
        try {
          document.exitFullscreen().catch(() => {});
        } catch {}
      }
      setFullscreenActive(false);
      navigate("/dashboard");
    }
  };

  const handleConfirmExit = () => {
    setShowExitHallModal(false);
    if (document.fullscreenElement) {
      try {
        document.exitFullscreen().catch(() => {});
      } catch {}
    }
    setFullscreenActive(false);
    navigate("/dashboard");
  };

  // Stage 1: COURSE / TRACK CATALOG -> Standard layout with regular LMS Sidebar and Topbar (not fullscreen)
  if (examStage === "CATALOG") {
    return (
      <ExamCourseSelector
        tracks={assignedTracks}
        isLoading={isLoadingTracks}
        onSelectTrack={handleSelectTrack}
      />
    );
  }

  // Stages 2, 3, 4: BRIEFING, LIVE_EXAM, SCORECARD -> Dedicated Fullscreen Exam Hall
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] h-screen w-screen max-w-full overflow-hidden bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 flex flex-col font-sans select-none text-base"
    >
      {/* Institutional Top Header (Rendered for BRIEFING and SCORECARD; LIVE_EXAM uses its own unified proctored header) */}
      {examStage !== "LIVE_EXAM" && (
        <ExamHeader
          rollNumber={rollNumber}
          activeTrack={selectedTrack}
          examStage={examStage}
          onExitHall={handleExitHall}
          onBackToCatalog={handleBackToCatalog}
        />
      )}

      {/* Stage 2: COURSE BRIEFING & CANDIDATE ADMIT CARD */}
      {examStage === "BRIEFING" && selectedTrack && (
        <ExamBriefingView
          track={selectedTrack}
          candidateName={candidateName}
          rollNumber={rollNumber}
          candidateAvatar={candidateAvatar}
          centerNode={centerNode}
          sessionHash={sessionHash}
          studentData={studentData}
          pledgeAccepted={pledgeAccepted}
          onPledgeChange={setPledgeAccepted}
          onStartExam={handleStartExam}
          onBackToCatalog={handleBackToCatalog}
        />
      )}

      {/* Stage 3: LIVE PROCTORED EXAM RUNNER */}
      {examStage === "LIVE_EXAM" && selectedTrack && (
        <ExamLiveRunner
          track={selectedTrack}
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          onGoToQuestion={goToQuestion}
          selectedAnswers={selectedAnswers}
          onSelectOption={handleSelectOption}
          markedForReview={markedForReview}
          onToggleReview={handleToggleReview}
          onClearAnswer={handleClearAnswer}
          timeRemaining={timeRemaining}
          formatTime={formatTime}
          securityStrikes={securityStrikes}
          maxWarnings={MAX_WARNINGS}
          candidateName={candidateName}
          rollNumber={rollNumber}
          candidateAvatar={candidateAvatar}
          onExitHall={handleExitHall}
          onSubmitPaper={handleFinalSubmission}
        />
      )}

      {/* Stage 4: OFFICIAL CREDENTIAL SCORECARD */}
      {examStage === "SCORECARD" && selectedTrack && (
        <ExamScorecardView
          track={selectedTrack}
          examResult={examResult}
          candidateName={candidateName}
          rollNumber={rollNumber}
          securityStrikes={securityStrikes}
          maxWarnings={MAX_WARNINGS}
          onRetakeExam={handleRetakeExam}
          onBackToCatalog={handleBackToCatalog}
          onReturnDashboard={() => {
            if (document.fullscreenElement) {
              try {
                document.exitFullscreen().catch(() => {});
              } catch {}
            }
            setFullscreenActive(false);
            navigate("/dashboard");
          }}
        />
      )}

      {/* Reusable Security Warning Dialog (3 Warnings Limit) */}
      <ExamWarningModal
        strikeAlert={strikeAlert}
        maxWarnings={MAX_WARNINGS}
        onAcknowledge={() => {
          setStrikeAlert(null);
          strikeAlertRef.current = null;
        }}
      />

      {/* Reusable Exit Hall Safety Confirmation Modal */}
      <ExamExitModal
        isOpen={showExitHallModal}
        onClose={() => setShowExitHallModal(false)}
        onConfirm={handleConfirmExit}
      />
    </div>
  );
};

export default OfficialExamPage;
