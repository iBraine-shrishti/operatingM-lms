import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { StudentPageHeader } from "../components/student/StudentPageHeader";
import { StudentGrievanceForm } from "../components/grievance/StudentGrievanceForm";
import { TrainerFeedbackForm } from "../components/grievance/TrainerFeedbackForm";
import {
  FileText,
  Award,
} from "lucide-react";

export const GrievancePage = ({ initialTab = "grievance" }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromQuery = searchParams.get("tab");
  
  const [activeTab, setActiveTab] = useState(() => {
    if (tabFromQuery === "trainer" || tabFromQuery === "grievance") {
      return tabFromQuery;
    }
    return initialTab === "trainer" ? "trainer" : "grievance";
  });

  useEffect(() => {
    if (tabFromQuery === "trainer" || tabFromQuery === "grievance") {
      setActiveTab(tabFromQuery);
    }
  }, [tabFromQuery]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const tabs = [
    {
      id: "grievance",
      label: "Grievance Form",
      icon: FileText,
      badge: "Official",
    },
    {
      id: "trainer",
      label: "Trainer Feedback",
      icon: Award,
      badge: "Faculty",
    },
  ];

  return (
    <div className="font-jakarta space-y-6">
      {/* 1. HERO HEADER BANNER (Full width) */}
      <StudentPageHeader
        category="Student Quality & Academic Resolution"
        badgeText="Official CRM Integration"
        title="Student Grievance & Feedback Portal"
        description="Submit official student grievances or share direct trainer evaluations with Operating Media academic administration."
        metrics={[
          {
            value: "Live CRM Sync",
            label: "Connected",
            dotColor: "bg-emerald-500",
          },
          {
            value: "2 Forms",
            label: "Available",
            dotColor: "bg-[#003873]",
          },
          {
            value: "Direct Admin SLA",
            label: "Resolution",
            dotColor: "bg-blue-600",
          },
        ]}
      />

      {/* 2. TAB SWITCHER STRIP (Full width) */}
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
                className={`flex items-center justify-between p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#003873] text-white border-[#003873] shadow-sm"
                    : "bg-slate-50/70 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-800 hover:border-[#003873]/40 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    size={18}
                    className={isActive ? "text-white" : "text-[#003873] dark:text-sky-400"}
                  />
                  <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wide truncate">
                    {tab.label}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md ${
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

      {/* 3. ACTIVE FORM CONTAINER - Margined only here after the switch, with half the previous margin */}
      <div className="max-w-6xl mx-auto px-1 sm:px-3">
        {activeTab === "grievance" && <StudentGrievanceForm />}
        {activeTab === "trainer" && <TrainerFeedbackForm />}
        {/* Note: Counsellor / Course feedback form is temporarily hidden as requested */}
      </div>
    </div>
  );
};

export default GrievancePage;
