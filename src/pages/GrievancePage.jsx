import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { StudentPageHeader } from "../components/student/StudentPageHeader";
import { CourseFeedbackForm } from "../components/grievance/CourseFeedbackForm";
import { TrainerFeedbackForm } from "../components/grievance/TrainerFeedbackForm";
import {
  Sparkles,
  Award,
} from "lucide-react";

export const GrievancePage = ({ initialTab = "trainer" }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromQuery = searchParams.get("tab");
  
  const [activeTab, setActiveTab] = useState(() => {
    if (tabFromQuery === "course" || tabFromQuery === "trainer") {
      return tabFromQuery;
    }
    return initialTab === "course" ? "course" : "trainer";
  });

  useEffect(() => {
    if (tabFromQuery === "course" || tabFromQuery === "trainer") {
      setActiveTab(tabFromQuery);
    }
  }, [tabFromQuery]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const tabs = [
    {
      id: "trainer",
      label: "Trainer Feedback",
      icon: Award,
      badge: "Faculty",
      color: "text-amber-600 dark:text-amber-400",
    },
    {
      id: "course",
      label: "Course Feedback",
      icon: Sparkles,
      badge: "Curriculum",
      color: "text-blue-600 dark:text-blue-400",
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. HERO HEADER BANNER */}
      <StudentPageHeader
        category="Student Quality & Academic Resolution"
        badgeText="Official CRM Integration"
        title="Student Grievance & Feedback Portal"
        description="Share official course evaluations and trainer performance reviews directly with Operating Media administration."
        metrics={[
          {
            value: "Live CRM Sync",
            label: "Connected",
            dotColor: "bg-emerald-500",
          },
          {
            value: "2 Forms",
            label: "Available",
            dotColor: "bg-blue-600",
          },
          {
            value: "24-48 Hrs",
            label: "Resolution SLA",
            dotColor: "bg-amber-500",
          },
        ]}
      />

      {/* 2. TAB SWITCHER STRIP */}
      <div className="bg-white dark:bg-[#0b1329] p-2 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center justify-between p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isActive
                    ? "bg-slate-900 text-white dark:bg-blue-600 border-transparent shadow-xs"
                    : "bg-slate-50/60 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200/60 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon
                    size={17}
                    className={isActive ? "text-white" : tab.color}
                  />
                  <span className="text-xs sm:text-sm font-bold truncate">
                    {tab.label}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. ACTIVE FORM CONTAINER */}
      <div>
        {activeTab === "trainer" && <TrainerFeedbackForm />}
        {activeTab === "course" && <CourseFeedbackForm />}
      </div>
    </div>
  );
};

export default GrievancePage;
