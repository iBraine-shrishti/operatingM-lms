import React, { useState } from "react";
import {
  User,
  Briefcase,
  GraduationCap,
  Sparkles,
  FolderGit2,
  Award,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  RotateCcw,
  Languages,
} from "lucide-react";

export const ResumeFormEditor = ({ data, onChange, onReset }) => {
  const [openSection, setOpenSection] = useState("personal");

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  // Helper updates
  const updatePersonalInfo = (field, value) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      },
    });
  };

  const updateSummary = (value) => {
    onChange({
      ...data,
      summary: value,
    });
  };

  // Work Experience Handlers
  const addExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      role: "Digital Marketing Specialist",
      company: "Company Name",
      location: "Mumbai, India",
      startDate: "Jan 2025",
      endDate: "Present",
      current: true,
      bullets: ["Led key digital marketing initiatives and managed ad campaigns."],
    };
    onChange({
      ...data,
      experiences: [newExp, ...data.experiences],
    });
  };

  const updateExperience = (id, field, value) => {
    onChange({
      ...data,
      experiences: data.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const removeExperience = (id) => {
    onChange({
      ...data,
      experiences: data.experiences.filter((exp) => exp.id !== id),
    });
  };

  const addExperienceBullet = (expId) => {
    onChange({
      ...data,
      experiences: data.experiences.map((exp) =>
        exp.id === expId
          ? { ...exp, bullets: [...(exp.bullets || []), "Executed campaign optimizations."] }
          : exp
      ),
    });
  };

  const updateExperienceBullet = (expId, bulletIdx, val) => {
    onChange({
      ...data,
      experiences: data.experiences.map((exp) => {
        if (exp.id !== expId) return exp;
        const newBullets = [...exp.bullets];
        newBullets[bulletIdx] = val;
        return { ...exp, bullets: newBullets };
      }),
    });
  };

  const removeExperienceBullet = (expId, bulletIdx) => {
    onChange({
      ...data,
      experiences: data.experiences.map((exp) => {
        if (exp.id !== expId) return exp;
        const newBullets = exp.bullets.filter((_, idx) => idx !== bulletIdx);
        return { ...exp, bullets: newBullets };
      }),
    });
  };

  // Education Handlers
  const addEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      degree: "Degree / Diploma Name",
      institution: "Institution / University",
      location: "Mumbai, India",
      year: "2024 - 2026",
      score: "Grade A",
      details: "",
    };
    onChange({
      ...data,
      education: [...data.education, newEdu],
    });
  };

  const updateEducation = (id, field, value) => {
    onChange({
      ...data,
      education: data.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const removeEducation = (id) => {
    onChange({
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
    });
  };

  // Skills Handlers
  const addSkill = (category, skill) => {
    if (!skill.trim()) return;
    const catSkills = data.skills[category] || [];
    if (!catSkills.includes(skill.trim())) {
      onChange({
        ...data,
        skills: {
          ...data.skills,
          [category]: [...catSkills, skill.trim()],
        },
      });
    }
  };

  const removeSkill = (category, skillToRemove) => {
    onChange({
      ...data,
      skills: {
        ...data.skills,
        [category]: (data.skills[category] || []).filter((s) => s !== skillToRemove),
      },
    });
  };

  // Projects Handlers
  const addProject = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      title: "Project or Campaign Title",
      clientOrType: "Capstone / Client Project",
      metricHighlight: "250% Growth",
      description: "Implemented targeted advertising and SEO roadmap...",
    };
    onChange({
      ...data,
      projects: [...data.projects, newProj],
    });
  };

  const updateProject = (id, field, value) => {
    onChange({
      ...data,
      projects: data.projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    });
  };

  const removeProject = (id) => {
    onChange({
      ...data,
      projects: data.projects.filter((proj) => proj.id !== id),
    });
  };

  // Certifications Handlers
  const addCert = () => {
    const newCert = {
      id: `cert-${Date.now()}`,
      name: "Certification Name",
      issuer: "Issuing Organization",
      year: "2026",
    };
    onChange({
      ...data,
      certifications: [...data.certifications, newCert],
    });
  };

  const updateCert = (id, field, value) => {
    onChange({
      ...data,
      certifications: data.certifications.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      ),
    });
  };

  const removeCert = (id) => {
    onChange({
      ...data,
      certifications: data.certifications.filter((c) => c.id !== id),
    });
  };

  return (
    <div className="space-y-3 font-sans">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
            Resume Form Editor
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Edit your details below; the active template updates in real-time.
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
          title="Reset to default student details"
        >
          <RotateCcw size={13} />
          <span>Reset</span>
        </button>
      </div>

      {/* 1. PERSONAL INFORMATION */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-[#0b1329] overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => toggleSection("personal")}
          className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-900 dark:text-white text-sm hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <User size={16} className="text-[#003873] dark:text-sky-400" />
            <span>1. Personal & Contact Information</span>
          </div>
          {openSection === "personal" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {openSection === "personal" && (
          <div className="p-4 pt-1 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Full Name</label>
              <input
                type="text"
                value={data.personalInfo.fullName}
                onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden focus:border-[#003873]"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Target Job Title</label>
              <input
                type="text"
                value={data.personalInfo.jobTitle}
                onChange={(e) => updatePersonalInfo("jobTitle", e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden focus:border-[#003873]"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
              <input
                type="email"
                value={data.personalInfo.email}
                onChange={(e) => updatePersonalInfo("email", e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden focus:border-[#003873]"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Phone Number</label>
              <input
                type="text"
                value={data.personalInfo.phone}
                onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden focus:border-[#003873]"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Location / Branch</label>
              <input
                type="text"
                value={data.personalInfo.location}
                onChange={(e) => updatePersonalInfo("location", e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden focus:border-[#003873]"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">LinkedIn Profile</label>
              <input
                type="text"
                value={data.personalInfo.linkedin}
                onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden focus:border-[#003873]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Portfolio / Website</label>
              <input
                type="text"
                value={data.personalInfo.portfolio}
                onChange={(e) => updatePersonalInfo("portfolio", e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden focus:border-[#003873]"
              />
            </div>
          </div>
        )}
      </div>

      {/* 2. EXECUTIVE SUMMARY */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-[#0b1329] overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => toggleSection("summary")}
          className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-900 dark:text-white text-sm hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Sparkles size={16} className="text-[#003873] dark:text-sky-400" />
            <span>2. Executive Summary</span>
          </div>
          {openSection === "summary" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {openSection === "summary" && (
          <div className="p-4 pt-1 border-t border-slate-100 dark:border-slate-800 text-xs">
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
              Professional Pitch (2–4 impactful sentences)
            </label>
            <textarea
              rows={4}
              value={data.summary}
              onChange={(e) => updateSummary(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white leading-relaxed focus:outline-hidden focus:border-[#003873]"
              placeholder="Highlight your digital marketing achievements, ROAS growth, and core expertise..."
            />
          </div>
        )}
      </div>

      {/* 3. WORK EXPERIENCE */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-[#0b1329] overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => toggleSection("experience")}
          className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-900 dark:text-white text-sm hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Briefcase size={16} className="text-[#003873] dark:text-sky-400" />
            <span>3. Work Experience ({data.experiences.length})</span>
          </div>
          {openSection === "experience" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {openSection === "experience" && (
          <div className="p-4 pt-1 border-t border-slate-100 dark:border-slate-800 space-y-4 text-xs">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={addExperience}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#003873] hover:bg-[#002d5c] text-white rounded-lg font-bold text-xs transition-colors cursor-pointer"
              >
                <Plus size={14} />
                <span>Add Position</span>
              </button>
            </div>

            {data.experiences.map((exp, expIdx) => (
              <div
                key={exp.id}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-900/40 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 dark:text-white">
                    #{expIdx + 1} {exp.role || "Role"}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeExperience(exp.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Delete experience"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Job Role</label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => updateExperience(exp.id, "role", e.target.value)}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Duration (e.g. Jan 2025 - Present)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                        placeholder="Start"
                        className="w-1/2 px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                      />
                      <input
                        type="text"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                        placeholder="End"
                        className="w-1/2 px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Location</label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Bullets */}
                <div className="space-y-1.5 pt-2 border-t border-slate-200/80 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700 dark:text-slate-300">Key Contributions & Metrics</label>
                    <button
                      type="button"
                      onClick={() => addExperienceBullet(exp.id)}
                      className="text-[11px] font-bold text-[#003873] dark:text-sky-400 hover:underline flex items-center gap-1"
                    >
                      <Plus size={12} /> Add Point
                    </button>
                  </div>
                  {(exp.bullets || []).map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#003873] dark:bg-sky-400 shrink-0" />
                      <input
                        type="text"
                        value={bullet}
                        onChange={(e) => updateExperienceBullet(exp.id, bIdx, e.target.value)}
                        className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => removeExperienceBullet(exp.id, bIdx)}
                        className="p-1 text-slate-400 hover:text-red-500"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. CORE SKILLS */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-[#0b1329] overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => toggleSection("skills")}
          className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-900 dark:text-white text-sm hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Sparkles size={16} className="text-[#003873] dark:text-sky-400" />
            <span>4. Core Skills & Competencies</span>
          </div>
          {openSection === "skills" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {openSection === "skills" && (
          <div className="p-4 pt-1 border-t border-slate-100 dark:border-slate-800 space-y-4 text-xs">
            {Object.entries({
              paidAds: "Paid Acquisition & Ads",
              seoContent: "SEO & Content Architecture",
              analyticsTools: "Analytics & MarTech Tools",
            }).map(([catKey, catLabel]) => {
              const currentList = data.skills[catKey] || [];
              return (
                <div key={catKey} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-700 dark:text-slate-300">{catLabel}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {currentList.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-md font-medium text-xs"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(catKey, skill)}
                          className="text-slate-400 hover:text-red-500"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder={`Add new ${catLabel.toLowerCase()} skill...`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addSkill(catKey, e.target.value);
                          e.target.value = "";
                        }
                      }}
                      id={`input-${catKey}`}
                      className="flex-1 px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const input = document.getElementById(`input-${catKey}`);
                        if (input && input.value) {
                          addSkill(catKey, input.value);
                          input.value = "";
                        }
                      }}
                      className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg font-bold"
                    >
                      Add
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. EDUCATION */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-[#0b1329] overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => toggleSection("education")}
          className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-900 dark:text-white text-sm hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <GraduationCap size={16} className="text-[#003873] dark:text-sky-400" />
            <span>5. Education ({data.education.length})</span>
          </div>
          {openSection === "education" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {openSection === "education" && (
          <div className="p-4 pt-1 border-t border-slate-100 dark:border-slate-800 space-y-4 text-xs">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={addEducation}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#003873] hover:bg-[#002d5c] text-white rounded-lg font-bold text-xs transition-colors cursor-pointer"
              >
                <Plus size={14} />
                <span>Add Degree</span>
              </button>
            </div>

            {data.education.map((edu, eduIdx) => (
              <div
                key={edu.id}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-900/40 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 dark:text-white">
                    #{eduIdx + 1} {edu.degree}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeEducation(edu.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Delete education"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Degree / Diploma</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Institution</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Year</label>
                    <input
                      type="text"
                      value={edu.year}
                      onChange={(e) => updateEducation(edu.id, "year", e.target.value)}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Score / Distinction</label>
                    <input
                      type="text"
                      value={edu.score}
                      onChange={(e) => updateEducation(edu.id, "score", e.target.value)}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. PROJECTS */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-[#0b1329] overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => toggleSection("projects")}
          className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-900 dark:text-white text-sm hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <FolderGit2 size={16} className="text-[#003873] dark:text-sky-400" />
            <span>6. Projects & Case Studies ({data.projects.length})</span>
          </div>
          {openSection === "projects" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {openSection === "projects" && (
          <div className="p-4 pt-1 border-t border-slate-100 dark:border-slate-800 space-y-4 text-xs">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={addProject}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#003873] hover:bg-[#002d5c] text-white rounded-lg font-bold text-xs transition-colors cursor-pointer"
              >
                <Plus size={14} />
                <span>Add Project</span>
              </button>
            </div>

            {data.projects.map((proj, projIdx) => (
              <div
                key={proj.id}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-900/40 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 dark:text-white">
                    #{projIdx + 1} {proj.title}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeProject(proj.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Delete project"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Project Title</label>
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => updateProject(proj.id, "title", e.target.value)}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Metric Highlight (e.g. 4.8x ROAS)</label>
                    <input
                      type="text"
                      value={proj.metricHighlight}
                      onChange={(e) => updateProject(proj.id, "metricHighlight", e.target.value)}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Client / Context</label>
                    <input
                      type="text"
                      value={proj.clientOrType}
                      onChange={(e) => updateProject(proj.id, "clientOrType", e.target.value)}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Description & Strategy</label>
                    <textarea
                      rows={2}
                      value={proj.description}
                      onChange={(e) => updateProject(proj.id, "description", e.target.value)}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 7. CERTIFICATIONS */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-[#0b1329] overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => toggleSection("certifications")}
          className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-900 dark:text-white text-sm hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Award size={16} className="text-[#003873] dark:text-sky-400" />
            <span>7. Certifications & Badges ({data.certifications.length})</span>
          </div>
          {openSection === "certifications" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {openSection === "certifications" && (
          <div className="p-4 pt-1 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={addCert}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#003873] hover:bg-[#002d5c] text-white rounded-lg font-bold text-xs transition-colors cursor-pointer"
              >
                <Plus size={14} />
                <span>Add Certificate</span>
              </button>
            </div>

            {data.certifications.map((cert) => (
              <div
                key={cert.id}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-900/40 flex items-center gap-3"
              >
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => updateCert(cert.id, "name", e.target.value)}
                    placeholder="Certificate Title"
                    className="sm:col-span-2 px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => updateCert(cert.id, "issuer", e.target.value)}
                    placeholder="Issuer (e.g. Google)"
                    className="px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeCert(cert.id)}
                  className="p-1 text-slate-400 hover:text-red-500"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
