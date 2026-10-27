import React, { useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { CertificateViewerModal } from "../components/crm/CertificateViewerModal";
import {
  AchievementsHeader,
  AchievementsFilterBar,
  ExamCertificatesSection,
  MilestoneBadgesSection,
  AchievementsEmptyState,
} from "../components/achievements";
import {
  BASE_MILESTONES,
  loadInitialExamCertificates,
} from "../data/achievementsData";

/**
 * AchievementsPage Component
 * Student certifications, course completion batches, and curriculum milestone badges.
 * Built with a clean component-based architecture.
 */
export const AchievementsPage = () => {
  const { currentUser } = useAuth();
  const [selectedCert, setSelectedCert] = useState(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all"); // 'all', 'exams', 'milestones'
  const [searchQuery, setSearchQuery] = useState("");

  // Live dynamic exam certificates
  const [examCertificates] = useState(loadInitialExamCertificates);
  const milestones = BASE_MILESTONES;

  const handleOpenCertificate = (cert) => {
    setSelectedCert(cert);
    setIsCertModalOpen(true);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setActiveFilter("all");
  };

  // Filtered lists based on search & active tab
  const filteredExams = useMemo(() => {
    if (activeFilter === "milestones") return [];
    return examCertificates.filter(
      (b) =>
        b.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.certificate_id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeFilter, searchQuery, examCertificates]);

  const filteredMilestones = useMemo(() => {
    if (activeFilter === "exams") return [];
    return milestones.filter(
      (a) =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeFilter, searchQuery, milestones]);

  const liveExamCount = examCertificates.length;
  const liveMilestoneCount = milestones.length;

  return (
    <div className="space-y-6">
      {/* 1. Header Hero Banner */}
      <AchievementsHeader
        liveExamCount={liveExamCount}
        liveMilestoneCount={liveMilestoneCount}
      />

      {/* 2. Filter Tabs & Search Bar */}
      <AchievementsFilterBar
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalExams={liveExamCount}
        totalMilestones={liveMilestoneCount}
      />

      {/* 3. Exam Completion Certificates Section */}
      <ExamCertificatesSection
        certificates={filteredExams}
        onOpenCertificate={handleOpenCertificate}
      />

      {/* 4. Curriculum Milestone Badges Section */}
      <MilestoneBadgesSection
        milestones={filteredMilestones}
        onViewAll={() => setActiveFilter("milestones")}
      />

      {/* 5. Empty Search State */}
      {filteredExams.length === 0 && filteredMilestones.length === 0 && (
        <AchievementsEmptyState
          searchQuery={searchQuery}
          onClear={handleClearFilters}
        />
      )}

      {/* 6. Certificate Viewer Modal */}
      <CertificateViewerModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        certificate={selectedCert || examCertificates[0]}
        studentName={currentUser?.name || "Student"}
      />
    </div>
  );
};

export default AchievementsPage;
