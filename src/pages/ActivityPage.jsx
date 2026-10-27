import React, { useState, useMemo, useEffect } from "react";
import { lmsService } from "../services/lmsService";
import { crmService } from "../services/crmService";
import { useAuth } from "../context/AuthContext";
import {
  ActivityHeader,
  ActivityFilterBar,
  ActivityTimelineFeed,
  ActivityAdminFeed,
  ActivityEmptyState,
} from "../components/activity";

/**
 * ActivityPage Component
 * Student activity milestone timeline & Administrator audit trail.
 * Decomposed into modular components for filtering, timeline feed, and metric headers.
 */
export const ActivityPage = () => {
  const { isAdmin, currentUser, crmProfile, crmAttendance, crmBatch } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest"); // "newest" | "oldest"

  // Student Profile bindings
  const currentStudentName = currentUser?.name || crmProfile?.name || "Student";
  const currentStudentAvatar =
    currentUser?.avatar && !currentUser?.avatar?.includes("avatar-card")
      ? currentUser.avatar
      : crmProfile?.photo || null;

  const studentId =
    crmProfile?.id ||
    currentUser?.admissionId ||
    currentUser?.id ||
    crmService.getSelectedStudentId();

  // Load fresh student quizzes and batch assignments
  const loadFreshData = async () => {
    if (!studentId) return;
    try {
      const [qRes, aRes] = await Promise.allSettled([
        lmsService.fetchStudentQuizzes(studentId),
        lmsService.fetchStudentBatchAssignments(studentId),
      ]);
      if (qRes.status === "fulfilled" && Array.isArray(qRes.value) && qRes.value.length > 0) {
        setQuizzes(qRes.value);
      }
      if (aRes.status === "fulfilled" && Array.isArray(aRes.value) && aRes.value.length > 0) {
        setAssignments(aRes.value);
      }
    } catch (err) {
      console.warn("Could not fetch fresh student activity data:", err);
    }
  };

  useEffect(() => {
    loadFreshData();
  }, [studentId]);

  const handleRefresh = async () => {
    setIsLoading(true);
    await loadFreshData();
    setRefreshKey((k) => k + 1);
    setIsLoading(false);
  };

  // Filter activities: dynamically synthesized from student milestones
  const scopedActivities = useMemo(() => {
    if (isAdmin) {
      return lmsService.getActivities();
    }

    return lmsService.getStudentActivities({
      studentId,
      currentUser,
      crmProfile,
      crmAttendance,
      crmBatch,
      quizzes,
      assignments,
    });
  }, [isAdmin, studentId, currentUser, crmProfile, crmAttendance, crmBatch, quizzes, assignments, refreshKey]);

  // Counts for filter pills
  const counts = useMemo(() => {
    return {
      all: scopedActivities.length,
      quiz: scopedActivities.filter((a) => a.type === "quiz").length,
      assignment: scopedActivities.filter((a) => a.type === "assignment" || a.type === "grading").length,
      completion: scopedActivities.filter((a) => a.type === "completion" || a.type === "certificate").length,
      lecture: scopedActivities.filter((a) => a.type === "lecture").length,
      enrollment: scopedActivities.filter((a) => a.type === "enrollment").length,
      discussion: scopedActivities.filter((a) => a.type === "discussion").length,
    };
  }, [scopedActivities]);

  // Filter and search logic
  const filteredActivities = useMemo(() => {
    let list = scopedActivities.filter((act) => {
      // Type filter
      if (selectedFilter !== "all") {
        if (selectedFilter === "completion") {
          if (act.type !== "completion" && act.type !== "certificate") return false;
        } else if (selectedFilter === "assignment") {
          if (act.type !== "assignment" && act.type !== "grading") return false;
        } else if (act.type !== selectedFilter) {
          return false;
        }
      }
      // Search filter
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const userName = act.user?.name?.toLowerCase() || "";
        const action = act.action?.toLowerCase() || "";
        const target = act.target?.toLowerCase() || "";
        const type = act.type?.toLowerCase() || "";
        return (
          userName.includes(q) ||
          action.includes(q) ||
          target.includes(q) ||
          type.includes(q)
        );
      }
      return true;
    });

    if (sortBy === "oldest") {
      return [...list].sort((a, b) => new Date(a.timestamp || 0) - new Date(b.timestamp || 0));
    }
    return [...list].sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0));
  }, [scopedActivities, selectedFilter, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedFilter("all");
  };

  return (
    <div className="space-y-4 sm:space-y-5 2xl:space-y-6">
      {/* 1. Header Banner */}
      <ActivityHeader
        isAdmin={isAdmin}
        totalEvents={scopedActivities.length}
        counts={counts}
        isLoading={isLoading}
        onRefresh={handleRefresh}
      />

      {/* 2. Search & Category Filters Bar */}
      <ActivityFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        counts={counts}
        filteredCount={filteredActivities.length}
        totalCount={scopedActivities.length}
      />

      {/* 3. Activity Feed / Empty State */}
      {filteredActivities.length === 0 ? (
        <ActivityEmptyState onReset={handleResetFilters} />
      ) : !isAdmin ? (
        <ActivityTimelineFeed
          activities={filteredActivities}
          currentStudentName={currentStudentName}
          currentStudentAvatar={currentStudentAvatar}
        />
      ) : (
        <ActivityAdminFeed
          activities={filteredActivities}
          currentStudentName={currentStudentName}
          currentStudentAvatar={currentStudentAvatar}
        />
      )}
    </div>
  );
};
