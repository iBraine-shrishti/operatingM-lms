import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Briefcase,
  GraduationCap,
  Award,
  Target,
  Layers,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { EditableHeading } from "../EditableHeading";
import { ResumeFooter } from "../ResumeFooter";

export const CreativeMarketerTemplate = ({
  data,
  theme,
  onUpdateHeading,
  onUpdateProject,
  page = 1,
  totalPages = 1,
}) => {
  const {
    personalInfo = {},
    summary = "",
    experiences = [],
    education = [],
    skills = {},
    projects = [],
    certifications = [],
    sectionHeadings = {},
  } = data || {};

  // SUB-RENDERER: Hero Banner
  const renderHeroBanner = (isContinuation = false) => {
    if (isContinuation) {
      return (
        <header
          className="p-4 sm:p-5 text-white relative overflow-hidden shrink-0"
          style={{ backgroundColor: theme.primary }}
        >
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="space-y-0.5">
              <span className="text-[10px] font-extrabold uppercase tracking-[2px] px-2 py-0.5 rounded bg-white/15 text-white inline-block mb-1">
                Portfolio & Deliverables • Page 2
              </span>
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                {personalInfo.fullName}
              </h1>
              <p className="text-xs sm:text-sm font-medium text-white/90">
                {personalInfo.jobTitle}
              </p>
            </div>
            <div className="text-xs text-white/80 font-medium">
              {personalInfo.email}{" "}
              {personalInfo.phone && `• ${personalInfo.phone}`}
            </div>
          </div>
        </header>
      );
    }

    const isOnePage = totalPages === 1;

    return (
      <header
        className={`${
          isOnePage
            ? "p-4 sm:p-5 print:p-3.5"
            : "p-7 sm:p-9 print:p-5"
        } text-white relative overflow-hidden shrink-0`}
        style={{ backgroundColor: theme.primary }}
      >
        <div
          className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full opacity-20 pointer-events-none"
          style={{ backgroundColor: theme.accent }}
        />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3.5 sm:gap-4">
            {personalInfo.photo && (
              <div
                className={`${
                  isOnePage
                    ? "w-14 h-14 sm:w-16 sm:h-16"
                    : "w-20 h-20 sm:w-22 sm:h-22"
                } rounded-full overflow-hidden border-2 border-white/90 shadow-md bg-white shrink-0`}
              >
                <img
                  src={personalInfo.photo}
                  alt={personalInfo.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="space-y-0.5">
              <EditableHeading
                value={sectionHeadings.eyebrow}
                fallback="Creative & Growth Strategist"
                onChange={(val) => onUpdateHeading?.("eyebrow", val)}
                className="text-[10px] font-extrabold uppercase tracking-[2px] px-2 py-0.5 rounded inline-block bg-white/15 backdrop-blur-xs text-white"
                tag="span"
              />
              <h1
                className={`${
                  isOnePage
                    ? "text-2xl sm:text-3xl leading-tight"
                    : "text-3xl sm:text-4xl leading-tight"
                } font-black uppercase tracking-tight text-white`}
              >
                {personalInfo.fullName}
              </h1>
              <p
                className={`${
                  isOnePage ? "text-xs sm:text-sm" : "text-base sm:text-lg"
                } font-medium text-white/90`}
              >
                {personalInfo.jobTitle}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1 text-[11px] print:text-[10px] text-white/90 self-start sm:self-auto sm:text-right border-l sm:border-l-0 sm:border-r pl-2.5 sm:pl-0 sm:pr-3 border-white/25">
            {personalInfo.email && (
              <span className="flex items-center sm:justify-end gap-1.5">
                <Mail size={12} className="text-white/80" />
                {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center sm:justify-end gap-1.5">
                <Phone size={12} className="text-white/80" />
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center sm:justify-end gap-1.5">
                <MapPin size={12} className="text-white/80" />
                {personalInfo.location}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center sm:justify-end gap-1.5">
                <Linkedin size={12} className="text-white/80" />
                {personalInfo.linkedin}
              </span>
            )}
          </div>
        </div>
      </header>
    );
  };

  // SUB-RENDERER: Summary
  const renderSummary = () => {
    if (data.hiddenSections?.summary || !summary || !summary.trim()) return null;
    const isOnePage = totalPages === 1;

    return (
      <section
        className={`${
          isOnePage ? "p-3 sm:p-3.5 rounded-xl gap-2.5" : "p-4 sm:p-5 rounded-2xl gap-3.5"
        } border flex items-start`}
        style={{
          backgroundColor: theme.lightBg,
          borderColor: theme.border,
        }}
      >
        <div
          className={`${
            isOnePage ? "w-7 h-7 rounded-lg" : "w-9 h-9 rounded-xl"
          } flex items-center justify-center text-white shrink-0 shadow-2xs`}
          style={{ backgroundColor: theme.secondary }}
        >
          <Target size={isOnePage ? 14 : 18} />
        </div>
        <div>
          <EditableHeading
            value={sectionHeadings.summary}
            fallback="Executive Vision & Strategic Impact"
            onChange={(val) => onUpdateHeading?.("summary", val)}
            className="text-xs font-black uppercase tracking-wider mb-0.5"
            style={{ color: theme.primary }}
            tag="h2"
          />
          <p
            className={`${
              isOnePage
                ? "text-[11.5px] print:text-[10px] leading-snug "
                : "text-[12.5px] leading-relaxed"
            } text-slate-700 text-justify`}
          >
            {summary}
          </p>
        </div>
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
      <section className={isOnePage ? "space-y-2.5" : "space-y-4"}>
        <div
          className="flex items-center justify-between pb-1.5 border-b-2"
          style={{ borderColor: theme.primary }}
        >
          <div className="flex items-center gap-2">
            <Briefcase size={15} style={{ color: theme.primary }} />
            <EditableHeading
              value={sectionHeadings.experience}
              fallback="Experience & Track Record"
              onChange={(val) => onUpdateHeading?.("experience", val)}
              className="text-xs font-black uppercase tracking-wider"
              style={{ color: theme.primary }}
              tag="h2"
            />
          </div>
          <span className="text-[9.5px] font-bold uppercase tracking-wider text-slate-400">
            Performance Chronology
          </span>
        </div>

        <div className={`grid grid-cols-1 ${isOnePage ? "gap-2" : "gap-4"}`}>
          {experiences.map((exp) => {
            const bulletsToRender = exp.bullets || [];

            return (
              <div
                key={exp.id}
                className={`${
                  isOnePage
                    ? "p-2.5 sm:p-3 print:p-2 space-y-1"
                    : "p-4 sm:p-5 space-y-2"
                } rounded-xl border transition-all`}
                style={{ borderColor: theme.border }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5">
                  <div>
                    <h3
                      className={`font-extrabold text-slate-900 ${
                        isOnePage ? "text-[12.5px]" : "text-sm"
                      }`}
                    >
                      {exp.role}
                    </h3>
                    <div
                      className={`font-bold ${
                        isOnePage ? "text-[11px]" : "text-[12px]"
                      }`}
                      style={{ color: theme.secondary }}
                    >
                      {exp.company} •{" "}
                      <span className="text-slate-500 font-normal">
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`font-bold px-2 py-0.5 rounded-full self-start sm:self-auto ${
                      isOnePage
                        ? "text-[10px] print:text-[9px]"
                        : "text-[11px]"
                    }`}
                    style={{
                      backgroundColor: theme.badgeBg,
                      color: theme.badgeText,
                    }}
                  >
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>

                {bulletsToRender.length > 0 && (
                  <ul
                    className={`text-slate-700 ${
                      isOnePage
                        ? "space-y-0.5 text-[11px] print:text-[9.5px] pt-0.5"
                        : "space-y-1.5 text-[12px] pt-1"
                    }`}
                  >
                    {bulletsToRender.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <ChevronRight
                          size={12}
                          style={{ color: theme.accent }}
                          className="mt-0.5 shrink-0"
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
      <section className={isOnePage ? "space-y-2.5" : "space-y-4"}>
        <div
          className="flex items-center justify-between pb-1.5 border-b-2"
          style={{ borderColor: theme.primary }}
        >
          <div className="flex items-center gap-2">
            <TrendingUp size={15} style={{ color: theme.primary }} />
            <EditableHeading
              value={sectionHeadings.projects}
              fallback="Live Agency Case Studies"
              onChange={(val) => onUpdateHeading?.("projects", val)}
              className="text-xs font-black uppercase tracking-wider"
              style={{ color: theme.primary }}
              tag="h2"
            />
          </div>
          <span className="text-[9.5px] font-bold uppercase tracking-wider text-slate-400">
            Verified Outcomes
          </span>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 ${
            isOnePage ? "gap-2.5 print:gap-2" : "gap-4"
          }`}
        >
          {projects.map((proj) => (
            <div
              key={proj.id}
              className={`${
                isOnePage
                  ? "p-2.5 sm:p-3 print:p-2 space-y-1"
                  : "p-4 space-y-2"
              } rounded-xl border flex flex-col justify-between`}
              style={{
                backgroundColor: theme.lightBg,
                borderColor: theme.border,
              }}
            >
              <div>
                <div className="flex items-start justify-between gap-1 mb-0.5">
                  <EditableHeading
                    value={proj.title}
                    fallback="Project Title"
                    onChange={(val) => onUpdateProject?.(proj.id, "title", val)}
                    className={`font-bold text-slate-900 ${
                      isOnePage ? "text-[11.5px]" : "text-[12.5px]"
                    }`}
                    tag="h4"
                  />
                </div>
                {proj.metricHighlight ? (
                  <EditableHeading
                    value={proj.metricHighlight}
                    fallback=""
                    onChange={(val) =>
                      onUpdateProject?.(proj.id, "metricHighlight", val)
                    }
                    className="inline-block text-[9.5px] print:text-[8.5px] font-black uppercase px-1.5 py-0.5 rounded mb-1 text-white"
                    style={{ backgroundColor: theme.primary }}
                    tag="span"
                  />
                ) : null}
                <p
                  className={`text-slate-700 leading-snug ${
                    isOnePage
                      ? "text-[11px] print:text-[9.5px] "
                      : "text-[11.5px]"
                  }`}
                >
                  {proj.description}
                </p>
              </div>
              {proj.clientOrType ? (
                <div className="pt-0.5">
                  <EditableHeading
                    value={proj.clientOrType}
                    fallback=""
                    onChange={(val) =>
                      onUpdateProject?.(proj.id, "clientOrType", val)
                    }
                    className="text-[10px] font-bold inline-block cursor-text hover:underline"
                    style={{ color: theme.secondary }}
                    tag="span"
                  />
                </div>
              ) : null}
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
        <div
          className="flex items-center gap-2 pb-1 border-b"
          style={{ borderColor: theme.border }}
        >
          <Layers size={14} style={{ color: theme.primary }} />
          <EditableHeading
            value={sectionHeadings.skills}
            fallback="Skills Matrix"
            onChange={(val) => onUpdateHeading?.("skills", val)}
            className="text-xs font-black uppercase tracking-wider"
            style={{ color: theme.primary }}
            tag="h2"
          />
        </div>
        <div className={isOnePage ? "space-y-1.5" : "space-y-2.5"}>
          {Object.entries(skills || {}).map(([catKey, skillList], idx) => {
            if (!skillList || skillList.length === 0) return null;
            const headingKey = `skillCat_${catKey}`;
            const fallbackKey = `skillCat${idx + 1}`;
            const defaultLabel =
              catKey === "paidAds"
                ? "Paid Ads & Acquisition"
                : catKey === "seoContent"
                  ? "SEO & Content Architecture"
                  : catKey === "analyticsTools"
                    ? "Analytics & MarTech Tools"
                    : catKey.charAt(0).toUpperCase() + catKey.slice(1);

            return (
              <div key={catKey}>
                <EditableHeading
                  value={
                    sectionHeadings[headingKey] || sectionHeadings[fallbackKey]
                  }
                  fallback={defaultLabel}
                  onChange={(val) => onUpdateHeading?.(headingKey, val)}
                  className="text-[9.5px] font-bold uppercase text-slate-500 block mb-0.5"
                  tag="span"
                />
                <div className="flex flex-wrap gap-1">
                  {skillList.map((s, sIdx) => (
                    <span
                      key={sIdx}
                      className={`font-bold rounded-md border ${
                        isOnePage
                          ? "text-[10px] print:text-[9.5px] px-1.5 py-0.5"
                          : "text-[11px] px-2 py-0.5"
                      }`}
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

  // SUB-RENDERER: Education & Certifications
  const renderEducationAndCertifications = () => {
    const hasEdu =
      education && education.length > 0 && !data.hiddenSections?.education;
    const hasCert =
      certifications &&
      certifications.length > 0 &&
      !data.hiddenSections?.certifications;
    if (!hasEdu && !hasCert) return null;
    const isOnePage = totalPages === 1;

    return (
      <section className={isOnePage ? "space-y-2" : "space-y-3"}>
        <div
          className="flex items-center gap-2 pb-1 border-b"
          style={{ borderColor: theme.border }}
        >
          <GraduationCap size={14} style={{ color: theme.primary }} />
          <EditableHeading
            value={sectionHeadings.education}
            fallback="Education & Credentials"
            onChange={(val) => onUpdateHeading?.("education", val)}
            className="text-xs font-black uppercase tracking-wider"
            style={{ color: theme.primary }}
            tag="h2"
          />
        </div>
        <div
          className={`space-y-1.5 ${
            isOnePage ? "text-[11px] print:text-[10px]" : "text-[12px]"
          }`}
        >
          {hasEdu &&
            education.map((edu) => (
              <div key={edu.id} className="space-y-0.5">
                <div className="font-bold text-slate-900 leading-snug">
                  {edu.degree}
                </div>
                <div className="text-slate-600 font-medium text-[10.5px] print:text-[9.5px]">
                  {edu.institution} {edu.year && `• ${edu.year}`} {edu.score && `• ${edu.score}`}
                </div>
              </div>
            ))}
          {hasCert &&
            certifications.map((cert) => (
              <div
                key={cert.id}
                className="flex items-center gap-1.5 text-[10.5px] print:text-[9.5px]"
              >
                <Award
                  size={12}
                  style={{ color: theme.accent }}
                  className="shrink-0"
                />
                <span className="font-bold text-slate-800 truncate">{cert.name}</span>
                <span className="text-[9.5px] text-slate-400 shrink-0">
                  {cert.year && `(${cert.year})`}
                </span>
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
  const hasEdu =
    education && education.length > 0 && !data.hiddenSections?.education;
  const hasCert =
    certifications &&
    certifications.length > 0 &&
    !data.hiddenSections?.certifications;
  const showEduCert = hasEdu || hasCert;

  const defaultOrder = [
    "summary",
    "experience",
    "projects",
    "skills",
    "education",
    "certifications",
  ];
  const customOrder =
    data.sectionOrders?.["creative-marketer"] || data.sectionOrder;
  const contentOrder =
    Array.isArray(customOrder) && customOrder.length > 0
      ? [
          ...customOrder.filter((id) => defaultOrder.includes(id)),
          ...defaultOrder.filter((id) => !customOrder.includes(id)),
        ]
      : defaultOrder;

  // Upper stream sections (e.g., summary, experience, projects) sorted by user sequence
  const topSections = ["summary", "experience", "projects"].sort(
    (a, b) => contentOrder.indexOf(a) - contentOrder.indexOf(b)
  );

  const renderTopSection = (id) => {
    switch (id) {
      case "summary":
        return renderSummary();
      case "experience":
        return renderExperience();
      case "projects":
        return renderProjects();
      default:
        return null;
    }
  };

  const renderSectionById = (id) => {
    switch (id) {
      case "summary":
        return renderSummary();
      case "experience":
        return renderExperience();
      case "projects":
        return renderProjects();
      case "skills":
        return renderSkills();
      case "education":
      case "certifications":
        return renderEducationAndCertifications();
      default:
        return null;
    }
  };

  const page1TopSections = ["summary", "experience"].filter((id) =>
    topSections.includes(id)
  );
  const page2TopSections = ["projects"].filter((id) =>
    topSections.includes(id)
  );

  const curTopSections =
    totalPages === 1
      ? topSections
      : page === 1
      ? page1TopSections
      : page2TopSections;

  return (
    <div className="bg-white text-slate-800 font-sans leading-relaxed text-[13px] print:text-[11px] w-full min-h-[1080px] print:min-h-[296.8mm] h-full flex flex-col justify-between print:p-0 print:m-0">
      {/* HEADER BANNER */}
      {page === 1 ? (
        renderHeroBanner(false)
      ) : (
        <header className="px-5 pt-4 pb-2.5 border-b resume-section flex items-center justify-between" style={{ borderColor: theme.border }}>
          <div>
            <h2 className="text-base sm:text-lg font-black uppercase tracking-tight" style={{ color: theme.primary }}>
              {personalInfo.fullName}
            </h2>
            <div className="text-xs font-bold text-slate-600 mt-0.5">
              {personalInfo.jobTitle} • Portfolio & Credentials (Page 2)
            </div>
          </div>
          <div className="text-[11px] text-slate-500 font-medium text-right">
            {[personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean).join(" • ")}
          </div>
        </header>
      )}

      {/* BODY CONTENT */}
      <div className="p-4.5 sm:p-5 print:p-3.5 space-y-2.5 print:space-y-2 flex-1">
        {/* Render top sections according to sequence */}
        {curTopSections.map((id) => (
          <React.Fragment key={id}>{renderTopSection(id)}</React.Fragment>
        ))}

        {totalPages === 1 ? (
          (() => {
            if (!showSkills && !showEduCert) return null;
            if (showSkills && !showEduCert)
              return <div className="pt-1">{renderSkills()}</div>;
            if (!showSkills && showEduCert)
              return (
                <div className="pt-1">
                  {renderEducationAndCertifications()}
                </div>
              );
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-4 print:gap-3 pt-1 resume-creative-grid">
                {renderSkills()}
                {renderEducationAndCertifications()}
              </div>
            );
          })()
        ) : page === 1 ? (
          showSkills && <div className="pt-1">{renderSkills()}</div>
        ) : (
          showEduCert && (
            <div className="pt-1">{renderEducationAndCertifications()}</div>
          )
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

export default CreativeMarketerTemplate;
