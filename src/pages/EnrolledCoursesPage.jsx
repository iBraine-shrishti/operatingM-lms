import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { lmsService } from "../services/lmsService";
import {
  EnrolledCoursesHeader,
  EnrolledCoursesFilterBar,
  EnrolledCoursesGrid,
} from "../components/course/enrolled";

// Filter Categories matching Browse Courses
const CATEGORIES = [
  { id: "all", label: "All Courses" },
  { id: "social", label: "Social Media" },
  { id: "seo", label: "SEO Mastery" },
  { id: "design", label: "Design & Media" },
  { id: "analytics", label: "Google Analytics" },
  { id: "ads", label: "Google Ads" },
  { id: "wordpress", label: "WordPress Dev" },
  { id: "growth", label: "Growth Marketing" },
];

export const EnrolledCoursesPage = () => {
  const navigate = useNavigate();
  const { currentUser, studentUser, isAdmin, assignedCourseIds } = useAuth();

  const studentId =
    currentUser?.crmAdmissionId || studentUser?.crmAdmissionId || 375;
  const [permittedCourseIds, setPermittedCourseIds] = useState(
    () => assignedCourseIds || [],
  );
  const [, setIsLoadingPerms] = useState(false);

  // Sync real course permissions from CRM API
  useEffect(() => {
    let isMounted = true;
    if (studentId) {
      setIsLoadingPerms(true);
      lmsService
        .fetchStudentCoursePermissions(studentId)
        .then((perms) => {
          if (isMounted) {
            setIsLoadingPerms(false);
            if (Array.isArray(perms)) {
              const granted = perms
                .filter((p) => p.hasAccess)
                .map((p) => p.courseId);
              setPermittedCourseIds(granted);
            }
          }
        })
        .catch(() => {
          if (isMounted) setIsLoadingPerms(false);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [studentId]);

  // All published courses from service
  const allPublishedCourses = useMemo(
    () => lmsService.getCourses().filter((c) => c.status === "published"),
    [],
  );

  // Enrolled courses: Only courses granted to the student in CRM
  const enrolledCourses = useMemo(() => {
    if (isAdmin) return allPublishedCourses;
    if (!permittedCourseIds || permittedCourseIds.length === 0) {
      return [];
    }
    return allPublishedCourses.filter((c) =>
      permittedCourseIds.includes(c.id),
    );
  }, [isAdmin, allPublishedCourses, permittedCourseIds]);

  // Real course metrics computed directly from real video units
  const courseMetricsMap = useMemo(() => {
    const map = {};
    allPublishedCourses.forEach((c) => {
      map[c.id] = lmsService.getRealCourseMetrics(c.id);
    });
    return map;
  }, [allPublishedCourses]);

  const [activeTab, setActiveTab] = useState("all"); // 'all', 'in-progress', 'completed'
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  // Metrics counts based on real video metrics
  const totalCount = enrolledCourses.length;
  const inProgressCount = enrolledCourses.filter((c) => {
    const info = courseMetricsMap[c.id];
    return !info?.isCompleted;
  }).length;
  const completedCount = enrolledCourses.filter((c) => {
    const info = courseMetricsMap[c.id];
    return info?.isCompleted;
  }).length;
  const avgProgress =
    totalCount > 0
      ? Math.round(
          enrolledCourses.reduce(
            (sum, c) => sum + (courseMetricsMap[c.id]?.progress || 0),
            0,
          ) / totalCount,
        )
      : 0;

  // Filtered & Sorted Courses
  const filteredCourses = useMemo(() => {
    return enrolledCourses
      .filter((course) => {
        const metrics = courseMetricsMap[course.id] || {
          progress: 0,
          isCompleted: false,
        };
        const isDone = metrics.isCompleted;

        // Tab Filter
        if (activeTab === "in-progress" && isDone) return false;
        if (activeTab === "completed" && !isDone) return false;

        // Search Filter
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          course.title.toLowerCase().includes(q) ||
          course.category.toLowerCase().includes(q) ||
          course.description.toLowerCase().includes(q);

        // Category Filter
        const matchesCategory =
          selectedCategory === "all" ||
          course.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          course.title.toLowerCase().includes(selectedCategory.toLowerCase());

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        const metricsA = courseMetricsMap[a.id] || { progress: 0 };
        const metricsB = courseMetricsMap[b.id] || { progress: 0 };

        if (sortBy === "progress") {
          return metricsB.progress - metricsA.progress;
        }
        if (sortBy === "popular") {
          return (b.studentsCount || 0) - (a.studentsCount || 0);
        }
        return 0; // Default order
      });
  }, [
    enrolledCourses,
    courseMetricsMap,
    activeTab,
    selectedCategory,
    searchQuery,
    sortBy,
  ]);

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setActiveTab("all");
    setSearchQuery("");
    setSortBy("recent");
  };

  const handleResumeActiveLesson = () => {
    const active = enrolledCourses[0];
    navigate(
      active ? `/lesson-player?courseId=${active.id}` : "/lesson-player",
    );
  };

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* HEADER BANNER - STANDARDIZED WITH REAL CRM ENROLLMENT METRICS */}
      {/* ------------------------------------------------------------- */}
      <EnrolledCoursesHeader
        totalCount={totalCount}
        inProgressCount={inProgressCount}
        completedCount={completedCount}
        avgProgress={avgProgress}
        onResumeActiveLesson={handleResumeActiveLesson}
      />

      {/* ------------------------------------------------------------- */}
      {/* SEARCH & FILTERS BAR                                          */}
      {/* ------------------------------------------------------------- */}
      <EnrolledCoursesFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearSearch={() => setSearchQuery("")}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={CATEGORIES}
        sortBy={sortBy}
        onSortChange={setSortBy}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        totalCount={totalCount}
        inProgressCount={inProgressCount}
        completedCount={completedCount}
        filteredCount={filteredCourses.length}
        onResetFilters={handleResetFilters}
      />

      {/* ------------------------------------------------------------- */}
      {/* COURSE CARDS GRID - 100% REAL VIDEO DATA & CRM ACCESS        */}
      {/* ------------------------------------------------------------- */}
      <EnrolledCoursesGrid
        courses={filteredCourses}
        courseMetricsMap={courseMetricsMap}
        isAdmin={isAdmin}
        hasNoEnrollments={enrolledCourses.length === 0}
        onResetFilters={handleResetFilters}
        onCardClick={(courseId) => navigate(`/courses/${courseId}`)}
        onOutlineClick={(courseId) => navigate(`/courses/${courseId}`)}
        onResumeClick={(courseId) =>
          navigate(`/lesson-player?courseId=${courseId}`)
        }
        onEditClick={(courseId) =>
          navigate(`/create-course?edit=${courseId}`)
        }
      />
    </div>
  );
};

export default EnrolledCoursesPage;
