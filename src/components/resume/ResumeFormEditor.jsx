import React, { useState, useRef } from "react";
import {
  User,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Award,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  RotateCcw,
  Camera,
  Upload,
  Sliders,
  Type,
  Languages,
  CheckCircle2,
  Layers,
  FileText,
  Filter,
  X,
  Columns,
  PanelBottom,
} from "lucide-react";

const TEMPLATE_SECTIONS_MAP = {
  "dual-arch-creative": [
    { id: "personal", label: "1. Profile Photo & Contact Details", icon: User },
    { id: "summary", label: "2. About Me / Summary", icon: FileText },
    { id: "projects", label: "3. Key Projects & Case Studies", icon: FolderGit2 },
    { id: "experience", label: "4. Work Experience", icon: Briefcase },
    { id: "skillsSummary", label: "5. Skills Summary (Progress Bars)", icon: Sliders },
    { id: "expertise", label: "6. Expertise (2/3-Column Bullet Grid)", icon: CheckCircle2 },
    { id: "education", label: "7. Education (Bottom Arch Capsule)", icon: GraduationCap },
    { id: "footer", label: "8. Document Footer Settings (Word-Style)", icon: PanelBottom },
  ],
  "creative-marketer": [
    { id: "personal", label: "1. Photo, Header Eyebrow & Contact", icon: User },
    { id: "summary", label: "2. Executive Summary Card", icon: FileText },
    { id: "experience", label: "3. Experience & Track Record", icon: Briefcase },
    { id: "projects", label: "4. Featured Case Studies & Projects", icon: FolderGit2 },
    { id: "skills", label: "5. Core Skills (Campaign & SEO Categories)", icon: Layers },
    { id: "education", label: "6. Education & Academic Background", icon: GraduationCap },
    { id: "certifications", label: "7. Certifications & Badges", icon: Award },
    { id: "footer", label: "8. Document Footer Settings (Word-Style)", icon: PanelBottom },
  ],
  "modern-executive": [
    { id: "personal", label: "1. Profile Photo & Contact Dossier", icon: User },
    { id: "summary", label: "2. Executive Summary", icon: FileText },
    { id: "experience", label: "3. Professional Experience", icon: Briefcase },
    { id: "skills", label: "4. Core Competencies & Tools (Categories)", icon: Layers },
    { id: "education", label: "5. Education", icon: GraduationCap },
    { id: "projects", label: "6. Key Projects & Deliverables", icon: FolderGit2 },
    { id: "certifications", label: "7. Certifications & Credentials", icon: Award },
    { id: "languages", label: "8. Languages & Communication", icon: Languages },
    { id: "footer", label: "9. Document Footer Settings (Word-Style)", icon: PanelBottom },
  ],
  "minimalist-tech": [
    { id: "personal", label: "1. Top Tagline Badge & Contact Info", icon: User },
    { id: "summary", label: "2. Professional Summary", icon: FileText },
    { id: "experience", label: "3. Work Experience", icon: Briefcase },
    { id: "projects", label: "4. Key Projects & Deliverables", icon: FolderGit2 },
    { id: "skills", label: "5. Core Skills & Tech Stack (Categories)", icon: Layers },
    { id: "education", label: "6. Education", icon: GraduationCap },
    { id: "certifications", label: "7. Certifications & Badges", icon: Award },
    { id: "footer", label: "8. Document Footer Settings (Word-Style)", icon: PanelBottom },
  ],
  "classic-ats": [
    { id: "personal", label: "1. ATS Header & Contact Details", icon: User },
    { id: "summary", label: "2. Professional Summary", icon: FileText },
    { id: "skills", label: "3. Core Competencies & Tools (Unlimited Categories)", icon: Layers },
    { id: "experience", label: "4. Professional Experience", icon: Briefcase },
    { id: "projects", label: "5. Key Projects & Case Studies", icon: FolderGit2 },
    { id: "education", label: "6. Education & Academic Background", icon: GraduationCap },
    { id: "certifications", label: "7. Certifications & Credentials", icon: Award },
    { id: "languages", label: "8. Languages", icon: Languages },
    { id: "footer", label: "9. Document Footer Settings (Word-Style)", icon: PanelBottom },
  ],
};

const ALL_SECTIONS_FALLBACK = [
  { id: "personal", label: "1. Profile Photo, Contact & Tagline", icon: User },
  { id: "summary", label: "2. Executive Summary / About Me", icon: FileText },
  { id: "experience", label: "3. Work Experience", icon: Briefcase },
  { id: "skillsSummary", label: "4. Skills Summary (Dual-Arch Progress Bars)", icon: Sliders },
  { id: "expertise", label: "5. Expertise (Dual-Arch Bullet Grid)", icon: CheckCircle2 },
  { id: "skills", label: "6. Core Skills & Competency Categories", icon: Layers },
  { id: "education", label: "7. Education", icon: GraduationCap },
  { id: "projects", label: "8. Projects & Case Studies", icon: FolderGit2 },
  { id: "certifications", label: "9. Certifications & Badges", icon: Award },
  { id: "languages", label: "10. Languages & Fluency", icon: Languages },
  { id: "footer", label: "11. Document Footer Settings (Word-Style)", icon: PanelBottom },
];

const getTemplateName = (id) => {
  switch (id) {
    case "dual-arch-creative":
      return "Dual-Arch Creative";
    case "creative-marketer":
      return "Creative Marketer";
    case "minimalist-tech":
      return "Minimalist Tech";
    case "classic-ats":
      return "Classic ATS Standard";
    case "modern-executive":
    default:
      return "Modern Executive";
  }
};

export const ResumeFormEditor = ({ data, templateId = "modern-executive", onChange, onReset }) => {
  const [openSection, setOpenSection] = useState("personal");
  const [filterByTemplate, setFilterByTemplate] = useState(true);
  const [newCatName, setNewCatName] = useState("");
  const fileInputRef = useRef(null);

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const activeSections = filterByTemplate
    ? TEMPLATE_SECTIONS_MAP[templateId] || ALL_SECTIONS_FALLBACK
    : ALL_SECTIONS_FALLBACK;

  const isDualArch = templateId === "dual-arch-creative";
  const isCreativeMarketer = templateId === "creative-marketer";
  const isMinimalist = templateId === "minimalist-tech";
  const isClassicATS = templateId === "classic-ats";
  const isExecutive = templateId === "modern-executive";

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

  const updateSectionHeading = (field, value) => {
    onChange({
      ...data,
      sectionHeadings: {
        ...(data.sectionHeadings || {}),
        [field]: value,
      },
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2.5 * 1024 * 1024) {
        alert("Image size exceeds 2.5MB. Please choose a smaller photo.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updatePersonalInfo("photo", event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
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
      startDate: "2025",
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

  // Skills Summary Handlers (for Dual-Arch progress bars)
  const updateSkillLevel = (idx, field, value) => {
    const currentList = [...(data.skillsSummary || [])];
    if (currentList[idx]) {
      currentList[idx] = {
        ...currentList[idx],
        [field]: field === "level" ? Number(value) : value,
      };
      onChange({
        ...data,
        skillsSummary: currentList,
      });
    }
  };

  // Expertise Handlers (for Dual-Arch bullet grid)
  const addExpertiseItem = (item) => {
    if (!item.trim()) return;
    const currentList = data.expertiseList || [];
    if (!currentList.includes(item.trim())) {
      onChange({
        ...data,
        expertiseList: [...currentList, item.trim()],
      });
    }
  };

  const removeExpertiseItem = (itemToRemove) => {
    onChange({
      ...data,
      expertiseList: (data.expertiseList || []).filter((it) => it !== itemToRemove),
    });
  };

  // Dynamic Skill Category Handlers
  const addSkillCategory = (name) => {
    if (!name || !name.trim()) return;
    const cleanName = name.trim();
    const key = cleanName.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (!key) return;

    onChange({
      ...data,
      skills: {
        ...(data.skills || {}),
        [key]: ["Core Competency 1", "Core Competency 2"],
      },
      sectionHeadings: {
        ...(data.sectionHeadings || {}),
        [`skillCat_${key}`]: cleanName,
      },
    });
    setNewCatName("");
  };

  const removeSkillCategory = (catKey) => {
    const updatedSkills = { ...(data.skills || {}) };
    delete updatedSkills[catKey];
    onChange({
      ...data,
      skills: updatedSkills,
    });
  };

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

  // Languages Handlers
  const addLanguage = (lang) => {
    if (!lang.trim()) return;
    const currentLangs = data.languages || [];
    if (!currentLangs.includes(lang.trim())) {
      onChange({
        ...data,
        languages: [...currentLangs, lang.trim()],
      });
    }
  };

  const removeLanguage = (langToRemove) => {
    onChange({
      ...data,
      languages: (data.languages || []).filter((l) => l !== langToRemove),
    });
  };

  // 1. PERSONAL SECTION RENDERER
  const renderPersonalSection = (meta) => (
    <div key="personal" className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-[#0b1329] overflow-hidden shadow-2xs">
      <button
        type="button"
        onClick={() => toggleSection("personal")}
        className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-900 dark:text-white text-sm hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <User size={16} className="text-[#003873] dark:text-sky-400" />
          <span>{meta.label}</span>
        </div>
        {openSection === "personal" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {openSection === "personal" && (
        <div className="p-4 pt-1 border-t border-slate-100 dark:border-slate-800 space-y-4 text-xs">
          {/* SPECIALIZATION BADGE CONTROLS (for Minimalist Tech) */}
          {(isMinimalist || !filterByTemplate) && (
            <div className="p-3.5 rounded-xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/50 space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={data.showSpecializationBadge !== false}
                    onChange={(e) =>
                      onChange({
                        ...data,
                        showSpecializationBadge: e.target.checked,
                      })
                    }
                    className="rounded border-slate-300 text-[#003873] focus:ring-[#003873] cursor-pointer"
                  />
                  <span>Show Specialization Badge (Top Right)</span>
                </label>

                {data.showSpecializationBadge !== false && (
                  <button
                    type="button"
                    onClick={() =>
                      onChange({
                        ...data,
                        showSpecializationBadge: false,
                      })
                    }
                    className="text-[10px] font-bold text-red-500 hover:underline cursor-pointer"
                  >
                    Remove Box
                  </button>
                )}
              </div>

              {data.showSpecializationBadge !== false && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <div>
                    <label className="text-[10.5px] font-bold text-slate-600 dark:text-slate-400 block mb-0.5">
                      Badge Label
                    </label>
                    <input
                      type="text"
                      value={data.sectionHeadings?.specializationTitle || ""}
                      placeholder="Specialization"
                      onChange={(e) => updateSectionHeading("specializationTitle", e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[10.5px] font-bold text-slate-600 dark:text-slate-400 block mb-0.5">
                      Specialization Value
                    </label>
                    <input
                      type="text"
                      value={data.sectionHeadings?.specializationValue || ""}
                      placeholder="Digital Acquisition & Growth"
                      onChange={(e) => updateSectionHeading("specializationValue", e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-semibold"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TOP EYEBROW / TAGLINE (for Creative & Minimalist templates) */}
          {(isCreativeMarketer || isMinimalist || !filterByTemplate) && (
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Topmost Eyebrow / Tagline Badge
              </label>
              <input
                type="text"
                value={data.sectionHeadings?.eyebrow || ""}
                placeholder={isCreativeMarketer ? "Creative & Growth Strategist" : "Professional Portfolio • ATS Verified"}
                onChange={(e) => updateSectionHeading("eyebrow", e.target.value)}
                className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-semibold"
              />
              <span className="text-[10px] text-slate-500 mt-0.5 block">
                Top line displayed above your name in this template
              </span>
            </div>
          )}

          {/* CONTACT SECTION TITLE (for Modern Executive) */}
          {(isExecutive || !filterByTemplate) && (
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Contact Section Heading
              </label>
              <input
                type="text"
                value={data.sectionHeadings?.contact || ""}
                placeholder="Contact Dossier"
                onChange={(e) => updateSectionHeading("contact", e.target.value)}
                className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-semibold"
              />
              <span className="text-[10px] text-slate-500 mt-0.5 block">
                Sidebar contact title above communication channels
              </span>
            </div>
          )}

          {/* PHOTO UPLOAD / CHANGE CARD */}
          {(isDualArch || isCreativeMarketer || isExecutive || !filterByTemplate) && (
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-900/40 flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#003873] dark:border-sky-400 shadow-sm shrink-0 bg-white">
                {data.personalInfo.photo ? (
                  <img
                    src={data.personalInfo.photo}
                    alt="Student Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-slate-400">
                    <Camera size={20} />
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-2 text-center sm:text-left w-full">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#003873] hover:bg-[#002d5c] text-white rounded-lg font-bold text-xs transition-colors cursor-pointer"
                  >
                    <Upload size={13} />
                    <span>Upload New Photo</span>
                  </button>

                  {data.personalInfo.photo && (
                    <button
                      type="button"
                      onClick={() => updatePersonalInfo("photo", "")}
                      className="px-2.5 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg border border-red-200 dark:border-red-900 transition-colors cursor-pointer"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    value={data.personalInfo.photo || ""}
                    onChange={(e) => updatePersonalInfo("photo", e.target.value)}
                    placeholder="Or paste direct image URL (https://...)"
                    className="w-full px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 text-[11px]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ATS FORMAT NOTE */}
          {(isClassicATS || isMinimalist) && filterByTemplate && (
            <div className="p-2.5 rounded-lg bg-sky-50 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/40 text-[11px] text-sky-800 dark:text-sky-300">
              💡 <strong>ATS Standard Tip:</strong> This template is scanner-optimized and uses standard text fields without photos for seamless applicant tracking parsing.
            </div>
          )}

          {/* CONTACT FIELDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
        </div>
      )}
    </div>
  );

  // 2. SUMMARY SECTION
  const renderSummarySection = (meta) => (
    <div key="summary" className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-[#0b1329] overflow-hidden shadow-2xs">
      <button
        type="button"
        onClick={() => toggleSection("summary")}
        className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-900 dark:text-white text-sm hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <FileText size={16} className="text-[#003873] dark:text-sky-400" />
          <span>{meta.label}</span>
        </div>
        {openSection === "summary" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {openSection === "summary" && (
        <div className="p-4 pt-1 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Section Headline
            </label>
            <input
              type="text"
              value={data.sectionHeadings?.summary || ""}
              placeholder="About Me / Executive Summary"
              onChange={(e) => updateSectionHeading("summary", e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-semibold"
            />
          </div>
          <div>
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
        </div>
      )}
    </div>
  );

  // 3. EXPERIENCE SECTION
  const renderExperienceSection = (meta) => (
    <div key="experience" className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-[#0b1329] overflow-hidden shadow-2xs">
      <button
        type="button"
        onClick={() => toggleSection("experience")}
        className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-900 dark:text-white text-sm hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <Briefcase size={16} className="text-[#003873] dark:text-sky-400" />
          <span>{meta.label} ({data.experiences.length})</span>
        </div>
        {openSection === "experience" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {openSection === "experience" && (
        <div className="p-4 pt-1 border-t border-slate-100 dark:border-slate-800 space-y-4 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex-1 max-w-xs">
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Section Headline
              </label>
              <input
                type="text"
                value={data.sectionHeadings?.experience || ""}
                placeholder="Work Experience / Professional History"
                onChange={(e) => updateSectionHeading("experience", e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-semibold"
              />
            </div>
            <button
              type="button"
              onClick={addExperience}
              className="self-end sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#003873] hover:bg-[#002d5c] text-white rounded-lg font-bold text-xs transition-colors cursor-pointer"
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
                  className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
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
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Duration (e.g. 2024 - Present)</label>
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
                    className="text-[11px] font-bold text-[#003873] dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
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
                      className="p-1 text-slate-400 hover:text-red-500 cursor-pointer"
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
  );

  // 4. SKILLS SUMMARY (DUAL-ARCH PROGRESS BARS)
  const renderSkillsSummarySection = (meta) => (
    <div key="skillsSummary" className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-[#0b1329] overflow-hidden shadow-2xs">
      <button
        type="button"
        onClick={() => toggleSection("skillsSummary")}
        className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-900 dark:text-white text-sm hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <Sliders size={16} className="text-[#003873] dark:text-sky-400" />
          <span>{meta.label}</span>
        </div>
        {openSection === "skillsSummary" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {openSection === "skillsSummary" && (
        <div className="p-4 pt-1 border-t border-slate-100 dark:border-slate-800 space-y-3.5 text-xs">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Section Headline
            </label>
            <input
              type="text"
              value={data.sectionHeadings?.skills || ""}
              placeholder="SKILLS SUMMARY"
              onChange={(e) => updateSectionHeading("skills", e.target.value)}
              className="w-full max-w-sm px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-semibold"
            />
          </div>
          <p className="text-[11px] text-slate-500">
            Customize the progress bar labels and percentage levels (Dual-Arch template):
          </p>
          {(data.skillsSummary || []).map((skillItem, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex flex-col sm:flex-row items-center gap-3"
            >
              <input
                type="text"
                value={skillItem.name}
                onChange={(e) => updateSkillLevel(idx, "name", e.target.value)}
                className="w-full sm:w-2/3 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white font-bold"
              />
              <div className="w-full sm:w-1/3 flex items-center gap-2">
                <input
                  type="range"
                  min="40"
                  max="100"
                  value={skillItem.level}
                  onChange={(e) => updateSkillLevel(idx, "level", e.target.value)}
                  className="flex-1 cursor-pointer"
                />
                <span className="font-extrabold text-[#003873] dark:text-sky-400 min-w-[35px] text-right">
                  {skillItem.level}%
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // 5. EXPERTISE (DUAL-ARCH GRID WITH COLUMN HEADINGS & COLUMN CONTROLS)
  const renderExpertiseSection = (meta) => (
    <div key="expertise" className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-[#0b1329] overflow-hidden shadow-2xs">
      <button
        type="button"
        onClick={() => toggleSection("expertise")}
        className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-900 dark:text-white text-sm hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <CheckCircle2 size={16} className="text-[#003873] dark:text-sky-400" />
          <span>{meta.label} ({(data.expertiseList || []).length} Items)</span>
        </div>
        {openSection === "expertise" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {openSection === "expertise" && (
        <div className="p-4 pt-1 border-t border-slate-100 dark:border-slate-800 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Main Section Headline
              </label>
              <input
                type="text"
                value={data.sectionHeadings?.expertise || ""}
                placeholder="EXPERTISE"
                onChange={(e) => updateSectionHeading("expertise", e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-semibold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Grid Width Layout
              </label>
              <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-100 dark:bg-slate-900">
                <button
                  type="button"
                  onClick={() => onChange({ ...data, expertiseGridCols: 2 })}
                  className={`flex-1 py-1.5 font-bold rounded-md transition-all ${
                    (data.expertiseGridCols || 2) === 2
                      ? "bg-white dark:bg-slate-800 text-[#003873] dark:text-sky-400 shadow-xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  2 Columns
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ ...data, expertiseGridCols: 3 })}
                  className={`flex-1 py-1.5 font-bold rounded-md transition-all ${
                    data.expertiseGridCols === 3
                      ? "bg-white dark:bg-slate-800 text-[#003873] dark:text-sky-400 shadow-xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  3 Columns (Wider)
                </button>
              </div>
            </div>
          </div>

          {/* COLUMN SUB-HEADINGS TOGGLE */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <label className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={!!data.showExpertiseColHeaders}
                onChange={(e) => onChange({ ...data, showExpertiseColHeaders: e.target.checked })}
                className="rounded border-slate-300 text-[#003873] focus:ring-[#003873]"
              />
              <span>Enable Column Sub-Headings Above Grid</span>
            </label>

            {data.showExpertiseColHeaders && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
                <div>
                  <label className="text-[10px] text-slate-500 block mb-0.5">Column 1 Header</label>
                  <input
                    type="text"
                    value={data.sectionHeadings?.expertiseCol1 || ""}
                    placeholder="Core Specialization"
                    onChange={(e) => updateSectionHeading("expertiseCol1", e.target.value)}
                    className="w-full px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 block mb-0.5">Column 2 Header</label>
                  <input
                    type="text"
                    value={data.sectionHeadings?.expertiseCol2 || ""}
                    placeholder="Tools & Execution"
                    onChange={(e) => updateSectionHeading("expertiseCol2", e.target.value)}
                    className="w-full px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs font-semibold"
                  />
                </div>
                {data.expertiseGridCols === 3 && (
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5">Column 3 Header</label>
                    <input
                      type="text"
                      value={data.sectionHeadings?.expertiseCol3 || ""}
                      placeholder="Additional Expertise"
                      onChange={(e) => updateSectionHeading("expertiseCol3", e.target.value)}
                      className="w-full px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs font-semibold"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* BULLET ITEMS LIST */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 dark:text-slate-300 block">
              Expertise Items (Unlimited Grid Bullets)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {(data.expertiseList || []).map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-md font-medium text-xs border border-slate-200 dark:border-slate-700 shadow-2xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#003873] dark:bg-sky-400" />
                  {item}
                  <button
                    type="button"
                    onClick={() => removeExpertiseItem(item)}
                    className="text-slate-400 hover:text-red-500 cursor-pointer ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* ADD ITEM INPUT */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add expertise item (e.g. UX Design, Video Editing, Conversion CRO)..."
              id="input-new-expertise"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addExpertiseItem(e.target.value);
                  e.target.value = "";
                }
              }}
              className="flex-1 px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
            <button
              type="button"
              onClick={() => {
                const input = document.getElementById("input-new-expertise");
                if (input && input.value) {
                  addExpertiseItem(input.value);
                  input.value = "";
                }
              }}
              className="px-3.5 py-1.5 bg-[#003873] hover:bg-[#002d5c] text-white rounded-lg font-bold cursor-pointer transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // 6. CORE SKILLS (UNLIMITED DYNAMIC CATEGORIES FOR ATS & ALL TEMPLATES)
  const renderSkillsSection = (meta) => (
    <div key="skills" className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-[#0b1329] overflow-hidden shadow-2xs">
      <button
        type="button"
        onClick={() => toggleSection("skills")}
        className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-900 dark:text-white text-sm hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <Layers size={16} className="text-[#003873] dark:text-sky-400" />
          <span>{meta.label}</span>
        </div>
        {openSection === "skills" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {openSection === "skills" && (
        <div className="p-4 pt-1 border-t border-slate-100 dark:border-slate-800 space-y-4 text-xs">
          {/* SKILLS SECTION HEADLINE */}
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Skills Section Headline
            </label>
            <input
              type="text"
              value={data.sectionHeadings?.skills || ""}
              placeholder="Core Competencies / Skills Matrix"
              onChange={(e) => updateSectionHeading("skills", e.target.value)}
              className="w-full max-w-sm px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-semibold"
            />
          </div>

          {/* OPTIONAL SKILLS SUMMARY PITCH (FOR ATS & SINGLE-COLUMN TEMPLATES) */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                Skills Summary Statement (ATS Competency Highlights)
              </label>
              {data.skillsSummaryText && (
                <button
                  type="button"
                  onClick={() => onChange({ ...data, skillsSummaryText: "" })}
                  className="text-[10px] font-bold text-red-500 hover:underline cursor-pointer"
                >
                  Clear Summary
                </button>
              )}
            </div>
            <textarea
              rows={2}
              value={data.skillsSummaryText || ""}
              placeholder="High-impact technical skills overview paragraph (appears directly under Skills heading in ATS templates)..."
              onChange={(e) => onChange({ ...data, skillsSummaryText: e.target.value })}
              className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200"
            />
          </div>

          {/* DYNAMIC CATEGORY BLOCKS */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <label className="font-extrabold text-slate-800 dark:text-slate-200 text-xs">
                Skill Categories ({Object.keys(data.skills || {}).length})
              </label>
            </div>

            {Object.entries(data.skills || {}).map(([catKey, skillList], idx) => {
              const headingKey = `skillCat_${catKey}`;
              const fallbackKey = `skillCat${idx + 1}`;
              const defaultLabel =
                catKey === "paidAds"
                  ? "Paid Acquisition & Ads"
                  : catKey === "seoContent"
                  ? "SEO & Content Architecture"
                  : catKey === "analyticsTools"
                  ? "Analytics & MarTech Tools"
                  : catKey.charAt(0).toUpperCase() + catKey.slice(1);

              const catLabel =
                data.sectionHeadings?.[headingKey] ||
                data.sectionHeadings?.[fallbackKey] ||
                defaultLabel;

              return (
                <div
                  key={catKey}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-900/40 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1.5 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#003873] dark:bg-sky-400" />
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Category Tag:
                      </label>
                      <input
                        type="text"
                        value={catLabel}
                        placeholder={defaultLabel}
                        onChange={(e) => updateSectionHeading(headingKey, e.target.value)}
                        className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs font-bold w-full sm:w-60"
                      />
                    </div>

                    {Object.keys(data.skills || {}).length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSkillCategory(catKey)}
                        className="text-[11px] font-bold text-red-500 hover:text-red-700 self-end sm:self-auto flex items-center gap-1 cursor-pointer"
                        title="Delete this entire skill category"
                      >
                        <Trash2 size={12} />
                        <span>Delete Category</span>
                      </button>
                    )}
                  </div>

                  {/* SKILL PILLS */}
                  <div className="flex flex-wrap gap-1.5">
                    {(skillList || []).map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-md font-medium text-xs border border-slate-200 dark:border-slate-700"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(catKey, skill)}
                          className="text-slate-400 hover:text-red-500 cursor-pointer ml-0.5"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>

                  {/* ADD SKILL INPUT */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder={`Add skill under ${catLabel}...`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addSkill(catKey, e.target.value);
                          e.target.value = "";
                        }
                      }}
                      id={`input-${catKey}`}
                      className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
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
                      className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg font-bold cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>
              );
            })}

            {/* ADD NEW CATEGORY BUTTON */}
            <div className="p-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 flex flex-col sm:flex-row items-center gap-2">
              <input
                type="text"
                placeholder="New Category Name (e.g. CRM & Automation, Creative Design)..."
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkillCategory(newCatName);
                  }
                }}
                className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
              />
              <button
                type="button"
                onClick={() => addSkillCategory(newCatName)}
                disabled={!newCatName.trim()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-[#003873] hover:bg-[#002d5c] disabled:opacity-50 text-white rounded-lg font-bold text-xs transition-colors cursor-pointer"
              >
                <Plus size={13} />
                <span>Add Skill Category</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // 7. EDUCATION SECTION
  const renderEducationSection = (meta) => (
    <div key="education" className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-[#0b1329] overflow-hidden shadow-2xs">
      <button
        type="button"
        onClick={() => toggleSection("education")}
        className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-900 dark:text-white text-sm hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <GraduationCap size={16} className="text-[#003873] dark:text-sky-400" />
          <span>{meta.label} ({data.education.length})</span>
        </div>
        {openSection === "education" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {openSection === "education" && (
        <div className="p-4 pt-1 border-t border-slate-100 dark:border-slate-800 space-y-4 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex-1 max-w-xs">
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Section Headline
              </label>
              <input
                type="text"
                value={data.sectionHeadings?.education || ""}
                placeholder="Education / Academic Credentials"
                onChange={(e) => updateSectionHeading("education", e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-semibold"
              />
            </div>
            <button
              type="button"
              onClick={addEducation}
              className="self-end sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#003873] hover:bg-[#002d5c] text-white rounded-lg font-bold text-xs transition-colors cursor-pointer"
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
                  className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
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
  );

  // 8. PROJECTS SECTION (WITH LIVE CAPSTONE TAG CLEAR / REMOVE)
  const renderProjectsSection = (meta) => (
    <div key="projects" className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-[#0b1329] overflow-hidden shadow-2xs">
      <button
        type="button"
        onClick={() => toggleSection("projects")}
        className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-900 dark:text-white text-sm hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <FolderGit2 size={16} className="text-[#003873] dark:text-sky-400" />
          <span>{meta.label} ({data.projects.length})</span>
        </div>
        {openSection === "projects" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {openSection === "projects" && (
        <div className="p-4 pt-1 border-t border-slate-100 dark:border-slate-800 space-y-4 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex-1 max-w-xs">
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Section Headline
              </label>
              <input
                type="text"
                value={data.sectionHeadings?.projects || ""}
                placeholder="Key Projects / Live Case Studies"
                onChange={(e) => updateSectionHeading("projects", e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-semibold"
              />
            </div>
            <button
              type="button"
              onClick={addProject}
              className="self-end sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#003873] hover:bg-[#002d5c] text-white rounded-lg font-bold text-xs transition-colors cursor-pointer"
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
                  className="text-red-500 hover:text-red-700 p-1 cursor-pointer flex items-center gap-1 text-[11px] font-bold"
                  title="Delete project"
                >
                  <Trash2 size={13} />
                  <span>Delete Project</span>
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

                {/* CLIENT / CONTEXT TAG (WITH ONE-CLICK REMOVE / CLEAR BUTTON) */}
                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-700 dark:text-slate-300">
                      Client / Context Tag (e.g. "Live Capstone Project")
                    </label>
                    {proj.clientOrType ? (
                      <button
                        type="button"
                        onClick={() => updateProject(proj.id, "clientOrType", "")}
                        className="text-[10px] font-bold text-red-500 hover:underline cursor-pointer flex items-center gap-0.5"
                      >
                        <X size={11} /> Remove Tag
                      </button>
                    ) : (
                      <span className="text-[10px] text-slate-400">Tag is currently hidden</span>
                    )}
                  </div>
                  <input
                    type="text"
                    value={proj.clientOrType || ""}
                    placeholder="Leave empty if you don't want a context tag on this project"
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
  );

  // 9. CERTIFICATIONS SECTION
  const renderCertificationsSection = (meta) => (
    <div key="certifications" className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-[#0b1329] overflow-hidden shadow-2xs">
      <button
        type="button"
        onClick={() => toggleSection("certifications")}
        className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-900 dark:text-white text-sm hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <Award size={16} className="text-[#003873] dark:text-sky-400" />
          <span>{meta.label} ({data.certifications.length})</span>
        </div>
        {openSection === "certifications" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {openSection === "certifications" && (
        <div className="p-4 pt-1 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex-1 max-w-xs">
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Section Headline
              </label>
              <input
                type="text"
                value={data.sectionHeadings?.certifications || ""}
                placeholder="Certifications & Badges"
                onChange={(e) => updateSectionHeading("certifications", e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-semibold"
              />
            </div>
            <button
              type="button"
              onClick={addCert}
              className="self-end sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#003873] hover:bg-[#002d5c] text-white rounded-lg font-bold text-xs transition-colors cursor-pointer"
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
                className="p-1 text-slate-400 hover:text-red-500 cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // 10. LANGUAGES SECTION
  const renderLanguagesSection = (meta) => (
    <div key="languages" className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-[#0b1329] overflow-hidden shadow-2xs">
      <button
        type="button"
        onClick={() => toggleSection("languages")}
        className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-900 dark:text-white text-sm hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <Languages size={16} className="text-[#003873] dark:text-sky-400" />
          <span>{meta.label} ({(data.languages || []).length})</span>
        </div>
        {openSection === "languages" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {openSection === "languages" && (
        <div className="p-4 pt-1 border-t border-slate-100 dark:border-slate-800 space-y-3.5 text-xs">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Section Headline
            </label>
            <input
              type="text"
              value={data.sectionHeadings?.languages || ""}
              placeholder="Languages / Communication"
              onChange={(e) => updateSectionHeading("languages", e.target.value)}
              className="w-full max-w-sm px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-semibold mb-2"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {(data.languages || []).map((lang, lIdx) => (
              <span
                key={lIdx}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-md font-medium text-xs"
              >
                {lang}
                <button
                  type="button"
                  onClick={() => removeLanguage(lang)}
                  className="text-slate-400 hover:text-red-500 cursor-pointer"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add language (e.g. English (Fluent), German)..."
              id="input-new-language"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addLanguage(e.target.value);
                  e.target.value = "";
                }
              }}
              className="flex-1 px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
            <button
              type="button"
              onClick={() => {
                const input = document.getElementById("input-new-language");
                if (input && input.value) {
                  addLanguage(input.value);
                  input.value = "";
                }
              }}
              className="px-3 py-1.5 bg-[#003873] text-white rounded-lg font-bold cursor-pointer"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const updateFooterField = (field, value) => {
    onChange({
      ...data,
      footerInfo: {
        ...(data.footerInfo || {}),
        [field]: value,
      },
    });
  };

  const renderFooterSection = (sec) => {
    const isOpen = openSection === sec.id;
    const footerInfo = data.footerInfo || {};
    const defaultName = data.personalInfo?.fullName || "";
    const defaultTitle = data.personalInfo?.jobTitle || "";
    const firstCompany = data.experiences?.[0]?.company || "";
    const loc = data.personalInfo?.location || "";
    const defaultCompLoc =
      firstCompany && loc
        ? `${firstCompany}, ${loc}`
        : firstCompany || loc || "Mumbai, India";

    const currentName = footerInfo.fullName ?? defaultName;
    const currentTitle = footerInfo.jobTitle ?? defaultTitle;
    const currentCompLoc = footerInfo.companyLocation ?? defaultCompLoc;

    return (
      <div
        key={sec.id}
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-2xs"
      >
        <button
          type="button"
          onClick={() => toggleSection(sec.id)}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-[#003873] dark:text-sky-400 flex items-center justify-center shrink-0">
              <PanelBottom size={16} />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white block">
                {sec.label}
              </span>
              <span className="text-[11px] text-slate-500 line-clamp-1">
                Customize Word-like A4 footer (name, position, location, logo & page count)
              </span>
            </div>
          </div>
          {isOpen ? (
            <ChevronUp size={16} className="text-slate-400" />
          ) : (
            <ChevronDown size={16} className="text-slate-400" />
          )}
        </button>

        {isOpen && (
          <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800/90 space-y-4">
            {/* LIVE PREVIEW BANNER OF THE FOOTER */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Live Document Footer Preview:
              </span>
              <div className="text-[11.5px] text-slate-800 dark:text-slate-200 font-medium flex flex-wrap items-center gap-1.5 pt-0.5">
                <strong className="text-slate-900 dark:text-white">
                  {currentName || "Student Name"}
                </strong>
                <span className="text-slate-400">•</span>
                <span>{currentTitle || "Position"}</span>
                {currentCompLoc && (
                  <>
                    <span className="text-slate-400">–</span>
                    <span className="text-slate-600 dark:text-slate-300">
                      {currentCompLoc}
                    </span>
                  </>
                )}
                {footerInfo.showPageNumber !== false && (
                  <span className="ml-auto text-[10px] font-bold uppercase text-slate-500 bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                    Page 1 of 1
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  Footer Full Name
                </label>
                <input
                  type="text"
                  value={footerInfo.fullName ?? ""}
                  placeholder={defaultName || "Student Name"}
                  onChange={(e) => updateFooterField("fullName", e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:border-[#003873]"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Leave empty to auto-use profile name: {defaultName}
                </span>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  Footer Job Title / Position
                </label>
                <input
                  type="text"
                  value={footerInfo.jobTitle ?? ""}
                  placeholder={defaultTitle || "e.g. Website Developer"}
                  onChange={(e) => updateFooterField("jobTitle", e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:border-[#003873]"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Leave empty to auto-use profile title: {defaultTitle}
                </span>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">
                Company & Location Text
              </label>
              <input
                type="text"
                value={footerInfo.companyLocation ?? ""}
                placeholder={defaultCompLoc || "e.g. iBraine Digital LLP, Mumbai"}
                onChange={(e) =>
                  updateFooterField("companyLocation", e.target.value)
                }
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:border-[#003873]"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Leave empty to auto-use latest agency & city: {defaultCompLoc}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={footerInfo.showLogo !== false}
                  onChange={(e) =>
                    updateFooterField("showLogo", e.target.checked)
                  }
                  className="rounded text-[#003873] focus:ring-0"
                />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Show Operating Media Logo
                </span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={footerInfo.showPageNumber !== false}
                  onChange={(e) =>
                    updateFooterField("showPageNumber", e.target.checked)
                  }
                  className="rounded text-[#003873] focus:ring-0"
                />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Show Page Number (Page X of Y)
                </span>
              </label>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSectionById = (sec) => {
    switch (sec.id) {
      case "personal":
        return renderPersonalSection(sec);
      case "summary":
        return renderSummarySection(sec);
      case "experience":
        return renderExperienceSection(sec);
      case "skillsSummary":
        return renderSkillsSummarySection(sec);
      case "expertise":
        return renderExpertiseSection(sec);
      case "skills":
        return renderSkillsSection(sec);
      case "education":
        return renderEducationSection(sec);
      case "projects":
        return renderProjectsSection(sec);
      case "certifications":
        return renderCertificationsSection(sec);
      case "languages":
        return renderLanguagesSection(sec);
      case "footer":
        return renderFooterSection(sec);
      default:
        return null;
    }
  };

  return (
    <div className="space-y-3 font-sans">
      {/* HEADER & DYNAMIC TEMPLATE BADGE */}
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800 space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Resume Form Editor</span>
              <span className="text-[11px] font-black uppercase px-2 py-0.5 rounded-full bg-[#003873]/10 text-[#003873] dark:bg-sky-950/60 dark:text-sky-300 border border-[#003873]/20 dark:border-sky-800">
                {getTemplateName(templateId)}
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Sections below dynamically match the layout of <strong>{getTemplateName(templateId)}</strong>.
            </p>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer shrink-0"
            title="Reset to default student details"
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>
        </div>

        {/* SECTION FILTER TOGGLE */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Showing <strong>{activeSections.length}</strong> sections for this template</span>
          </div>
          <button
            type="button"
            onClick={() => setFilterByTemplate((prev) => !prev)}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#003873] dark:text-sky-400 hover:underline cursor-pointer"
          >
            <Filter size={11} />
            <span>{filterByTemplate ? "Show all sections" : "Match template only"}</span>
          </button>
        </div>
      </div>

      {/* DYNAMIC SECTIONS LIST */}
      <div className="space-y-3">
        {activeSections.map((sec) => renderSectionById(sec))}
      </div>
    </div>
  );
};
