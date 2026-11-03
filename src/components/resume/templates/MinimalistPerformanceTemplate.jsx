import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  FolderGit2,
  CheckCircle2,
  Target,
} from "lucide-react";
import { EditableHeading } from "../EditableHeading";
import { ResumeFooter } from "../ResumeFooter";

export const MinimalistPerformanceTemplate = ({
  data,
  theme,
  onUpdateHeading,
  page = 1,
  totalPages = 1,
}) => {
  const {
    personalInfo,
    summary,
    experiences = [],
    education = [],
    skills = {},
    projects = [],
    certifications = [],
    sectionHeadings = {},
  } = data;

  // SUB-RENDERER: Header
  const renderHeader = (isContinuation = false) => {
    if (isContinuation) {
      return (
        <header className="pb-4 border-b-2 mb-4 shrink-0" style={{ borderColor: theme.primary }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <span className="text-xl font-black uppercase tracking-tight" style={{ color: theme.primary }}>
                {personalInfo.fullName}
              </span>
              <span className="text-xs font-bold ml-2 text-slate-500">
                • {personalInfo.jobTitle} (Page 2)
              </span>
            </div>
            <div className="text-[11px] text-slate-500 font-semibold">
              Agency Projects, Education & Certifications
            </div>
          </div>
        </header>
      );
    }

    return (
      <header className="pb-5 border-b-2 shrink-0" style={{ borderColor: theme.primary }}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <EditableHeading
              value={sectionHeadings.eyebrow}
              fallback="Professional Portfolio • ATS Verified"
              onChange={(val) => onUpdateHeading?.("eyebrow", val)}
              className="text-[10px] font-extrabold uppercase tracking-[2px] block mb-1"
              style={{ color: theme.secondary }}
              tag="span"
            />
            <h1
              className="text-3xl sm:text-4xl font-black uppercase tracking-tight"
              style={{ color: theme.primary }}
            >
              {personalInfo.fullName}
            </h1>
            <div
              className="text-base sm:text-lg font-bold mt-1"
              style={{ color: theme.secondary }}
            >
              {personalInfo.jobTitle}
            </div>
          </div>

          {/* Quick Metrics Badge (Editable & Removable) */}
          {data.showSpecializationBadge !== false && (sectionHeadings.specializationValue ?? "Digital Acquisition & Growth") !== "" && (
            <div
              className="px-4 py-2 rounded-xl border text-right relative group"
              style={{ backgroundColor: theme.lightBg, borderColor: theme.border }}
            >
              <EditableHeading
                value={sectionHeadings.specializationTitle}
                fallback="Specialization"
                onChange={(val) => onUpdateHeading?.("specializationTitle", val)}
                className="text-[10px] font-bold text-slate-500 uppercase block mb-0.5"
                tag="span"
              />
              <EditableHeading
                value={sectionHeadings.specializationValue}
                fallback="Digital Acquisition & Growth"
                onChange={(val) => onUpdateHeading?.("specializationValue", val)}
                className="text-xs font-black block"
                style={{ color: theme.primary }}
                tag="span"
              />
            </div>
          )}
        </div>

        {/* Contact Info Pills */}
        <div className="flex flex-wrap gap-y-1.5 gap-x-4 pt-3 text-[12px] text-slate-600 font-medium">
          {personalInfo.email && (
            <span className="flex items-center gap-1.5">
              <Mail size={13} style={{ color: theme.primary }} />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1.5">
              <Phone size={13} style={{ color: theme.primary }} />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1.5">
              <MapPin size={13} style={{ color: theme.primary }} />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1.5">
              <Linkedin size={13} style={{ color: theme.primary }} />
              <span className="truncate max-w-[200px]">{personalInfo.linkedin}</span>
            </span>
          )}
          {personalInfo.portfolio && (
            <span className="flex items-center gap-1.5">
              <Globe size={13} style={{ color: theme.primary }} />
              <span className="truncate max-w-[200px]">{personalInfo.portfolio}</span>
            </span>
          )}
        </div>
      </header>
    );
  };

  // SUB-RENDERER: Summary
  const renderSummary = () => {
    if (data.hiddenSections?.summary || !summary || !summary.trim()) return null;
    const isOnePage = totalPages === 1;

    return (
      <section className={isOnePage ? "space-y-1" : "space-y-2"}>
        <div className="flex items-center gap-2 pb-1 border-b" style={{ borderColor: theme.border }}>
          <Target size={14} style={{ color: theme.primary }} />
          <EditableHeading
            value={sectionHeadings.summary}
            fallback="Professional Profile"
            onChange={(val) => onUpdateHeading?.("summary", val)}
            className="text-xs font-black uppercase tracking-wider"
            style={{ color: theme.primary }}
            tag="h2"
          />
        </div>
        <p className={`${isOnePage ? "text-[11.5px] print:text-[10px] leading-snug " : "text-[12.5px] leading-relaxed"} text-slate-700 text-justify`}>
          {summary}
        </p>
      </section>
    );
  };

  // SUB-RENDERER: Work Experience
  const renderExperience = () => {
    if (
      data.hiddenSections?.experience ||
      !experiences ||
      experiences.length === 0
    )
      return null;
    const isOnePage = totalPages === 1;

    return (
      <section className={isOnePage ? "space-y-2" : "space-y-3"}>
        <div className="flex items-center gap-2 pb-1 border-b" style={{ borderColor: theme.border }}>
          <Briefcase size={14} style={{ color: theme.primary }} />
          <EditableHeading
            value={sectionHeadings.experience}
            fallback="Career History"
            onChange={(val) => onUpdateHeading?.("experience", val)}
            className="text-xs font-black uppercase tracking-wider"
            style={{ color: theme.primary }}
            tag="h2"
          />
        </div>

        <div className={isOnePage ? "space-y-2" : "space-y-3"}>
          {experiences.map((exp) => {
            const bulletsToRender = exp.bullets || [];

            return (
              <div
                key={exp.id}
                className={`${isOnePage ? "p-2.5 print:p-2 space-y-1" : "p-3.5 space-y-1.5"} rounded-xl border`}
                style={{ borderColor: theme.border }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5">
                  <h4 className={`font-bold text-slate-900 ${isOnePage ? "text-[12px]" : "text-[13px]"}`}>
                    {exp.role}
                  </h4>
                  <span
                    className="text-[10px] print:text-[9px] font-bold px-2 py-0.5 rounded self-start sm:self-auto"
                    style={{
                      backgroundColor: theme.badgeBg,
                      color: theme.badgeText,
                    }}
                  >
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <div className={`font-bold ${isOnePage ? "text-[10.5px]" : "text-[11.5px]"}`} style={{ color: theme.secondary }}>
                  {exp.company} • <span className="text-slate-500 font-normal">{exp.location}</span>
                </div>
                {bulletsToRender.length > 0 && (
                  <ul className={`space-y-0.5 text-slate-700 ${isOnePage ? "text-[11px] print:text-[9.5px] leading-tight pt-0.5" : "text-[11.5px] pt-1"}`}>
                    {bulletsToRender.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-1 shrink-0"
                          style={{ backgroundColor: theme.primary }}
                        />
                        <span className="leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  // SUB-RENDERER: Projects
  const renderProjects = () => {
    if (data.hiddenSections?.projects || !projects || projects.length === 0)
      return null;
    const isOnePage = totalPages === 1;

    return (
      <section className={isOnePage ? "space-y-2 pt-0.5" : "space-y-3"}>
        <div className="flex items-center gap-2 pb-1 border-b" style={{ borderColor: theme.border }}>
          <FolderGit2 size={14} style={{ color: theme.primary }} />
          <EditableHeading
            value={sectionHeadings.projects}
            fallback="Projects & Case Studies"
            onChange={(val) => onUpdateHeading?.("projects", val)}
            className="text-xs font-black uppercase tracking-wider"
            style={{ color: theme.primary }}
            tag="h2"
          />
        </div>

        <div className={isOnePage ? "space-y-2" : "space-y-3"}>
          {projects.map((proj) => (
            <div
              key={proj.id}
              className={`${isOnePage ? "p-2.5 print:p-2 space-y-0.5" : "p-3.5 space-y-1.5"} rounded-xl border`}
              style={{ backgroundColor: theme.lightBg, borderColor: theme.border }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h4 className={`font-bold text-slate-900 ${isOnePage ? "text-[11.5px]" : "text-[12.5px]"}`}>
                  {proj.title}
                </h4>
                {proj.metricHighlight && (
                  <span
                    className="text-[9.5px] print:text-[8.5px] font-black uppercase px-1.5 py-0.5 rounded self-start sm:self-auto shrink-0"
                    style={{
                      backgroundColor: theme.primary,
                      color: "#ffffff",
                    }}
                  >
                    {proj.metricHighlight}
                  </span>
                )}
              </div>
              <div className="text-[10.5px] font-bold" style={{ color: theme.secondary }}>
                {proj.clientOrType}
              </div>
              <p className={`text-slate-700 leading-snug ${isOnePage ? "text-[11px] print:text-[9.5px] " : "text-[11.5px]"}`}>
                {proj.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  };

  // SUB-RENDERER: Skills
  const renderSkills = () => {
    const hasAnySkills =
      skills &&
      Object.values(skills).some(
        (list) => Array.isArray(list) && list.length > 0
      );
    if (data.hiddenSections?.skills || !hasAnySkills) return null;
    const isOnePage = totalPages === 1;

    return (
      <section className={isOnePage ? "space-y-2" : "space-y-3"}>
        <div className="flex items-center gap-2 pb-1 border-b" style={{ borderColor: theme.border }}>
          <Layers size={14} style={{ color: theme.primary }} />
          <EditableHeading
            value={sectionHeadings.skills}
            fallback="Skills & Tech Stack"
            onChange={(val) => onUpdateHeading?.("skills", val)}
            className="text-xs font-black uppercase tracking-wider"
            style={{ color: theme.primary }}
            tag="h2"
          />
        </div>

        <div className={isOnePage ? "space-y-2" : "space-y-3"}>
          {Object.entries(skills || {}).map(([catKey, skillList], idx) => {
            if (!skillList || skillList.length === 0) return null;
            const headingKey = `skillCat_${catKey}`;
            const fallbackKey = `skillCat${idx + 1}`;
            const defaultLabel =
              catKey === "paidAds"
                ? "Performance Ads & Media"
                : catKey === "seoContent"
                ? "SEO & Content Architecture"
                : catKey === "analyticsTools"
                ? "Analytics & Web MarTech"
                : catKey.charAt(0).toUpperCase() + catKey.slice(1);

            return (
              <div key={catKey}>
                <EditableHeading
                  value={sectionHeadings[headingKey] || sectionHeadings[fallbackKey]}
                  fallback={defaultLabel}
                  onChange={(val) => onUpdateHeading?.(headingKey, val)}
                  className="text-[9.5px] font-black uppercase tracking-wide text-slate-500 block mb-1"
                  tag="span"
                />
                <div className="flex flex-wrap gap-1">
                  {skillList.map((s, sIdx) => (
                    <span
                      key={sIdx}
                      className={`font-semibold rounded-md border ${isOnePage ? "text-[10px] print:text-[9.5px] px-1.5 py-0.5" : "text-[11px] px-2 py-0.5"}`}
                      style={{
                        backgroundColor: theme.badgeBg,
                        color: theme.badgeText,
                        borderColor: theme.border,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  // SUB-RENDERER: Education
  const renderEducation = () => {
    if (data.hiddenSections?.education || !education || education.length === 0)
      return null;
    const isOnePage = totalPages === 1;

    return (
      <section className={isOnePage ? "space-y-1.5" : "space-y-3"}>
        <div className="flex items-center gap-2 pb-1 border-b" style={{ borderColor: theme.border }}>
          <GraduationCap size={14} style={{ color: theme.primary }} />
          <EditableHeading
            value={sectionHeadings.education}
            fallback="Education & Qualifications"
            onChange={(val) => onUpdateHeading?.("education", val)}
            className="text-xs font-black uppercase tracking-wider"
            style={{ color: theme.primary }}
            tag="h2"
          />
        </div>

        <div className={isOnePage ? "space-y-1.5" : "space-y-2"}>
          {education.map((edu) => (
            <div
              key={edu.id}
              className={`${isOnePage ? "p-2 print:p-1.5 space-y-0.5" : "p-3 space-y-1"} rounded-lg border`}
              style={{ borderColor: theme.border }}
            >
              <div className={`font-bold text-slate-900 leading-snug ${isOnePage ? "text-[11px] print:text-[10px]" : "text-[12px]"}`}>
                {edu.degree}
              </div>
              <div className="text-slate-600 font-medium text-[10.5px] print:text-[9.5px]">
                {edu.institution}
              </div>
              <div className="flex items-center justify-between text-[10px] print:text-[9px] pt-0.5">
                <span className="text-slate-500">{edu.year}</span>
                {edu.score && (
                  <span className="font-bold" style={{ color: theme.secondary }}>
                    {edu.score}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  // SUB-RENDERER: Certifications
  const renderCertifications = () => {
    if (
      data.hiddenSections?.certifications ||
      !certifications ||
      certifications.length === 0
    )
      return null;
    const isOnePage = totalPages === 1;

    return (
      <section className={isOnePage ? "space-y-1.5" : "space-y-3"}>
        <div className="flex items-center gap-2 pb-1 border-b" style={{ borderColor: theme.border }}>
          <Award size={14} style={{ color: theme.primary }} />
          <EditableHeading
            value={sectionHeadings.certifications}
            fallback="Certifications & Licenses"
            onChange={(val) => onUpdateHeading?.("certifications", val)}
            className="text-xs font-black uppercase tracking-wider"
            style={{ color: theme.primary }}
            tag="h2"
          />
        </div>

        <div className={isOnePage ? "space-y-1" : "space-y-2"}>
          {certifications.map((cert) => (
            <div key={cert.id} className="flex items-start gap-1.5">
              <CheckCircle2
                size={12}
                className="mt-0.5 shrink-0"
                style={{ color: theme.accent }}
              />
              <div className="min-w-0">
                <div className={`font-bold text-slate-900 leading-tight truncate ${isOnePage ? "text-[10.5px] print:text-[9.5px]" : "text-[12px]"}`}>
                  {cert.name}
                </div>
                <div className="text-[10px] print:text-[9px] text-slate-500 truncate">
                  {cert.issuer} {cert.year && `• ${cert.year}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const hasAnySkills =
    skills &&
    Object.values(skills).some((list) => Array.isArray(list) && list.length > 0);
  const showSkills = hasAnySkills && !data.hiddenSections?.skills;
  const showExp =
    experiences && experiences.length > 0 && !data.hiddenSections?.experience;
  const showProj =
    projects && projects.length > 0 && !data.hiddenSections?.projects;
  const showEdu =
    education && education.length > 0 && !data.hiddenSections?.education;
  const showCert =
    certifications &&
    certifications.length > 0 &&
    !data.hiddenSections?.certifications;

  const defaultOrder = [
    "summary",
    "experience",
    "projects",
    "skills",
    "education",
    "certifications",
  ];
  const customOrder =
    data.sectionOrders?.["minimalist-tech"] || data.sectionOrder;
  const contentOrder =
    Array.isArray(customOrder) && customOrder.length > 0
      ? [
          ...customOrder.filter((id) => defaultOrder.includes(id)),
          ...defaultOrder.filter((id) => !customOrder.includes(id)),
        ]
      : defaultOrder;

  const leftSectionIds = ["experience", "projects"].sort(
    (a, b) => contentOrder.indexOf(a) - contentOrder.indexOf(b)
  );

  const rightSectionIds = ["skills", "education", "certifications"].sort(
    (a, b) => contentOrder.indexOf(a) - contentOrder.indexOf(b)
  );

  const renderLeftSection = (id) => {
    switch (id) {
      case "experience":
        return renderExperience();
      case "projects":
        return renderProjects();
      default:
        return null;
    }
  };

  const renderRightSection = (id) => {
    switch (id) {
      case "skills":
        return renderSkills();
      case "education":
        return renderEducation();
      case "certifications":
        return renderCertifications();
      default:
        return null;
    }
  };

  const showLeftCol = showExp || showProj;
  const showRightCol = showSkills || showEdu || showCert;

  return (
    <div className={`bg-white text-slate-800 font-sans leading-relaxed text-[13px] print:text-[11px] w-full min-h-[1050px] h-full print:h-full print:min-h-0 ${
      totalPages === 1 ? "p-5 sm:p-6 print:p-3.5" : "p-6 sm:p-8 print:p-5"
    } flex flex-col justify-between print:m-0`}>
      <div className={`${totalPages === 1 ? "space-y-3 print:space-y-2" : "space-y-5 print:space-y-3"} flex-1`}>
        {/* HEADER (PAGE 1 ONLY - NO HEADER ON PAGE 2) */}
        {page === 1 && renderHeader(false)}

        {page === 1 ? (
          <>
            {renderSummary()}
            {(() => {
              if (!showLeftCol && !showRightCol) return null;
              if (showLeftCol && !showRightCol) {
                return (
                  <div className="space-y-3">
                    {leftSectionIds.map((id) => (
                      <React.Fragment key={id}>{renderLeftSection(id)}</React.Fragment>
                    ))}
                  </div>
                );
              }
              if (!showLeftCol && showRightCol) {
                return (
                  <div className="space-y-3">
                    {rightSectionIds.map((id) => (
                      <React.Fragment key={id}>{renderRightSection(id)}</React.Fragment>
                    ))}
                  </div>
                );
              }
              return (
                <div className="grid grid-cols-1 md:grid-cols-12 print:grid-cols-12 gap-5 print:gap-3.5 pt-0.5 resume-minimalist-grid">
                  <div className="md:col-span-7 print:col-span-7 space-y-3.5 print:space-y-2 resume-minimalist-col-7">
                    {leftSectionIds.map((id) => (
                      <React.Fragment key={id}>{renderLeftSection(id)}</React.Fragment>
                    ))}
                  </div>
                  <div className="md:col-span-5 print:col-span-5 space-y-3.5 print:space-y-2 resume-minimalist-col-5">
                    {rightSectionIds.map((id) => (
                      <React.Fragment key={id}>{renderRightSection(id)}</React.Fragment>
                    ))}
                  </div>
                </div>
              );
            })()}
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 print:grid-cols-12 gap-5 print:gap-3.5 pt-0.5 resume-minimalist-grid">
            <div className="md:col-span-7 print:col-span-7 space-y-3.5 print:space-y-2 resume-minimalist-col-7">
              {leftSectionIds.map((id) => (
                <React.Fragment key={id}>{renderLeftSection(id)}</React.Fragment>
              ))}
            </div>
            <div className="md:col-span-5 print:col-span-5 space-y-3.5 print:space-y-2 resume-minimalist-col-5">
              {rightSectionIds.map((id) => (
                <React.Fragment key={id}>{renderRightSection(id)}</React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* DOCUMENT FOOTER (WORD-LIKE WITH OM LOGO) */}
      <ResumeFooter
        pageNumber={page}
        totalPages={totalPages}
        personalInfo={personalInfo}
        experience={experiences}
        footerInfo={data.footerInfo}
      />
    </div>
  );
};

export default MinimalistPerformanceTemplate;
