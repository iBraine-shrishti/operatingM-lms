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
  Languages,
} from "lucide-react";
import { EditableHeading } from "../EditableHeading";
import { ResumeFooter } from "../ResumeFooter";

export const ModernExecutiveTemplate = ({
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
    languages = [],
    sectionHeadings = {},
  } = data;

  // SUB-RENDERER: Contact Info Dossier
  const renderContact = () => {
    if (data.hiddenSections?.personal) return null;
    const isOnePage = totalPages === 1;
    return (
      <div
        className={`flex flex-col items-center md:items-start ${
          isOnePage ? "space-y-2 pb-2.5" : "space-y-3 pb-4"
        } border-b`}
        style={{ borderColor: theme.border }}
      >
        {personalInfo.photo ? (
          <div
            className={`${
              isOnePage ? "w-14 h-14" : "w-18 h-18"
            } rounded-2xl overflow-hidden border-2 shadow-xs shrink-0 bg-white`}
            style={{ borderColor: theme.primary }}
          >
            <img
              src={personalInfo.photo}
              alt={personalInfo.fullName}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div
            className={`${
              isOnePage ? "w-12 h-12 text-lg" : "w-16 h-16 text-2xl"
            } rounded-2xl flex items-center justify-center text-white font-black shadow-xs`}
            style={{ backgroundColor: theme.primary }}
          >
            {personalInfo.fullName
              ? personalInfo.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()
              : "OM"}
          </div>
        )}
        <div className="w-full">
          <EditableHeading
            value={sectionHeadings.contact}
            fallback="Contact Details"
            onChange={(val) => onUpdateHeading?.("contact", val)}
            className="text-[10px] font-extrabold uppercase tracking-widest block"
            style={{ color: theme.secondary }}
            tag="span"
          />
          <div
            className={`${
              isOnePage
                ? "space-y-1 mt-1 text-[11px] print:text-[10px]"
                : "space-y-1.5 mt-2 text-[12px]"
            } text-slate-700`}
          >
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail
                  size={12}
                  style={{ color: theme.primary }}
                  className="shrink-0"
                />
                <span className="truncate">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone
                  size={12}
                  style={{ color: theme.primary }}
                  className="shrink-0"
                />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin
                  size={12}
                  style={{ color: theme.primary }}
                  className="shrink-0"
                />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin
                  size={12}
                  style={{ color: theme.primary }}
                  className="shrink-0"
                />
                <span className="truncate">{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.portfolio && (
              <div className="flex items-center gap-2">
                <Globe
                  size={12}
                  style={{ color: theme.primary }}
                  className="shrink-0"
                />
                <span className="truncate">{personalInfo.portfolio}</span>
              </div>
            )}
          </div>
        </div>
      </div>
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
      <div className={isOnePage ? "space-y-2" : "space-y-3"}>
        <div
          className="flex items-center gap-2 pb-1 border-b"
          style={{ borderColor: theme.border }}
        >
          <Layers size={13} style={{ color: theme.secondary }} />
          <EditableHeading
            value={sectionHeadings.skills}
            fallback="Core Competencies"
            onChange={(val) => onUpdateHeading?.("skills", val)}
            className="text-xs font-black uppercase tracking-wider"
            style={{ color: theme.primary }}
            tag="h3"
          />
        </div>

        {Object.entries(skills || {}).map(([catKey, skillList], idx) => {
          if (!skillList || skillList.length === 0) return null;
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

          return (
            <div key={catKey}>
              <EditableHeading
                value={
                  sectionHeadings[headingKey] || sectionHeadings[fallbackKey]
                }
                fallback={defaultLabel}
                onChange={(val) => onUpdateHeading?.(headingKey, val)}
                className="text-[9.5px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5"
                tag="span"
              />
              <div className="flex flex-wrap gap-1">
                {skillList.map((s, sIdx) => (
                  <span
                    key={sIdx}
                    className={`font-semibold rounded-md border ${
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
    );
  };

  // SUB-RENDERER: Education
  const renderEducation = () => {
    if (data.hiddenSections?.education || !education || education.length === 0)
      return null;
    const isOnePage = totalPages === 1;

    return (
      <div className={isOnePage ? "space-y-1.5" : "space-y-3"}>
        <div
          className="flex items-center gap-2 pb-1 border-b"
          style={{ borderColor: theme.border }}
        >
          <GraduationCap size={13} style={{ color: theme.secondary }} />
          <EditableHeading
            value={sectionHeadings.education}
            fallback="Education"
            onChange={(val) => onUpdateHeading?.("education", val)}
            className="text-xs font-black uppercase tracking-wider"
            style={{ color: theme.primary }}
            tag="h3"
          />
        </div>
        <div
          className={`space-y-1.5 ${
            isOnePage ? "text-[11px] print:text-[10px]" : "text-[12px]"
          }`}
        >
          {education.map((edu) => (
            <div key={edu.id} className="space-y-0.5">
              <div className="font-bold text-slate-900 leading-snug">
                {edu.degree}
              </div>
              <div className="text-slate-600 font-medium">
                {edu.institution}
              </div>
              <div className="flex items-center justify-between text-[10.5px] print:text-[9.5px] pt-0.5">
                <span className="text-slate-500">{edu.year}</span>
                {edu.score && (
                  <span
                    className="font-bold"
                    style={{ color: theme.secondary }}
                  >
                    {edu.score}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
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
      <div className={isOnePage ? "space-y-1.5" : "space-y-2.5"}>
        <div
          className="flex items-center gap-2 pb-1 border-b"
          style={{ borderColor: theme.border }}
        >
          <Award size={13} style={{ color: theme.secondary }} />
          <EditableHeading
            value={sectionHeadings.certifications}
            fallback="Credentials & Badges"
            onChange={(val) => onUpdateHeading?.("certifications", val)}
            className="text-xs font-black uppercase tracking-wider"
            style={{ color: theme.primary }}
            tag="h3"
          />
        </div>
        <div
          className={`space-y-1 ${
            isOnePage ? "text-[10.5px] print:text-[9.5px]" : "text-[11.5px]"
          }`}
        >
          {certifications.map((cert) => (
            <div key={cert.id} className="flex items-start gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full mt-1 shrink-0"
                style={{ backgroundColor: theme.accent }}
              />
              <div className="min-w-0">
                <div className="font-bold text-slate-800 leading-tight truncate">
                  {cert.name}
                </div>
                <div className="text-[10px] print:text-[9px] text-slate-500 truncate">
                  {cert.issuer} {cert.year && `• ${cert.year}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // SUB-RENDERER: Languages
  const renderLanguages = () => {
    if (data.hiddenSections?.languages || !languages || languages.length === 0)
      return null;
    const isOnePage = totalPages === 1;

    return (
      <div className={isOnePage ? "space-y-1" : "space-y-1.5"}>
        <div
          className="flex items-center gap-2 pb-1 border-b"
          style={{ borderColor: theme.border }}
        >
          <Languages size={13} style={{ color: theme.secondary }} />
          <EditableHeading
            value={sectionHeadings.languages}
            fallback="Languages"
            onChange={(val) => onUpdateHeading?.("languages", val)}
            className="text-xs font-black uppercase tracking-wider"
            style={{ color: theme.primary }}
            tag="h3"
          />
        </div>
        <div className="flex flex-wrap gap-1 text-[10.5px] print:text-[9.5px] text-slate-700 font-medium pt-0.5">
          {languages.map((lang, idx) => (
            <span
              key={idx}
              className="bg-white/80 px-1.5 py-0.5 rounded border border-slate-200"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>
    );
  };

  // SUB-RENDERER: Right Header
  const renderMainHeader = (isContinuation = false) => {
    if (isContinuation) {
      return (
        <header className="pb-3 border-b" style={{ borderColor: theme.border }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <div>
              <span
                className="text-xl font-extrabold uppercase"
                style={{ color: theme.primary }}
              >
                {personalInfo.fullName}
              </span>
              <span className="text-xs font-bold ml-2 text-slate-500">
                • {personalInfo.jobTitle} (Page 2)
              </span>
            </div>
            <div className="text-[11px] text-slate-500 font-semibold">
              Project Portfolios & Campaign Deliverables
            </div>
          </div>
        </header>
      );
    }

    return (
      <header className="pb-4 border-b" style={{ borderColor: theme.border }}>
        <h1
          className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase"
          style={{ color: theme.primary }}
        >
          {personalInfo.fullName}
        </h1>
        <div
          className="text-base sm:text-lg font-bold tracking-wide mt-1"
          style={{ color: theme.secondary }}
        >
          {personalInfo.jobTitle}
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
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-0.5 rounded-full inline-block"
            style={{ backgroundColor: theme.secondary }}
          />
          <EditableHeading
            value={sectionHeadings.summary}
            fallback="Executive Summary"
            onChange={(val) => onUpdateHeading?.("summary", val)}
            className="text-xs font-black uppercase tracking-wider"
            style={{ color: theme.primary }}
            tag="h2"
          />
        </div>
        <p
          className={`${
            isOnePage
              ? "text-[11.5px] print:text-[10px] leading-snug "
              : "text-[12.5px] leading-relaxed"
          } text-slate-700 text-justify`}
        >
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
      <section className={isOnePage ? "space-y-2.5" : "space-y-4"}>
        <div className="flex items-center gap-2">
          <Briefcase size={14} style={{ color: theme.secondary }} />
          <EditableHeading
            value={sectionHeadings.experience}
            fallback="Professional Experience"
            onChange={(val) => onUpdateHeading?.("experience", val)}
            className="text-xs font-black uppercase tracking-wider"
            style={{ color: theme.primary }}
            tag="h2"
          />
        </div>

        <div className={isOnePage ? "space-y-2.5" : "space-y-4"}>
          {experiences.map((exp) => {
            const bulletsToRender = exp.bullets || [];

            return (
              <div
                key={exp.id}
                className="relative pl-3 border-l-2"
                style={{ borderColor: theme.border }}
              >
                <span
                  className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full border-2 border-white shadow-2xs"
                  style={{ backgroundColor: theme.accent }}
                />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h4
                    className={`font-bold text-slate-900 ${
                      isOnePage ? "text-[12px]" : "text-[13.5px]"
                    }`}
                  >
                    {exp.role}
                  </h4>
                  <span
                    className="text-[10.5px] print:text-[9.5px] font-bold px-2 py-0.5 rounded-md inline-block self-start sm:self-auto"
                    style={{
                      backgroundColor: theme.badgeBg,
                      color: theme.badgeText,
                    }}
                  >
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <div
                  className={`font-semibold text-slate-600 mb-1 ${
                    isOnePage ? "text-[11px] print:text-[10px]" : "text-[12px]"
                  }`}
                >
                  {exp.company} • {exp.location}
                </div>
                {bulletsToRender.length > 0 && (
                  <ul
                    className={`space-y-1 text-slate-700 ${
                      isOnePage
                        ? "text-[11px] print:text-[9.5px] leading-tight"
                        : "text-[12px]"
                    }`}
                  >
                    {bulletsToRender.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-1 shrink-0"
                          style={{ backgroundColor: theme.secondary }}
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
      <section className={isOnePage ? "space-y-2 pt-1" : "space-y-3 pt-2"}>
        <div className="flex items-center gap-2">
          <FolderGit2 size={14} style={{ color: theme.secondary }} />
          <EditableHeading
            value={sectionHeadings.projects}
            fallback="Key Projects & Campaign Case Studies"
            onChange={(val) => onUpdateHeading?.("projects", val)}
            className="text-xs font-black uppercase tracking-wider"
            style={{ color: theme.primary }}
            tag="h2"
          />
        </div>

        <div className={`grid grid-cols-1 ${isOnePage ? "gap-2" : "gap-3"}`}>
          {projects.map((proj) => (
            <div
              key={proj.id}
              className={`rounded-xl border ${
                isOnePage ? "p-2.5 print:p-2 space-y-0.5" : "p-3.5 space-y-1"
              }`}
              style={{
                backgroundColor: theme.lightBg,
                borderColor: theme.border,
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <div
                  className={`font-bold text-slate-900 ${
                    isOnePage ? "text-[11.5px]" : "text-[12.5px]"
                  }`}
                >
                  {proj.title}
                </div>
                {proj.metricHighlight && (
                  <span
                    className="text-[10px] print:text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded self-start sm:self-auto shrink-0"
                    style={{
                      backgroundColor: theme.primary,
                      color: "#ffffff",
                    }}
                  >
                    {proj.metricHighlight}
                  </span>
                )}
              </div>
              <div className="text-[10.5px] print:text-[9.5px] font-semibold text-slate-500">
                {proj.clientOrType}
              </div>
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
          ))}
        </div>
      </section>
    );
  };

  const defaultOrder = [
    "summary",
    "experience",
    "skills",
    "education",
    "projects",
    "certifications",
    "languages",
  ];
  const customOrder =
    data.sectionOrders?.["modern-executive"] || data.sectionOrder;
  const contentOrder =
    Array.isArray(customOrder) && customOrder.length > 0
      ? [
          ...customOrder.filter((id) => defaultOrder.includes(id)),
          ...defaultOrder.filter((id) => !customOrder.includes(id)),
        ]
      : defaultOrder;

  // Relative sequence inside Main column
  const mainSectionIds = ["summary", "experience", "projects"].sort(
    (a, b) => contentOrder.indexOf(a) - contentOrder.indexOf(b)
  );

  // Relative sequence inside Sidebar column
  const sidebarSectionIds = [
    "skills",
    "education",
    "certifications",
    "languages",
  ].sort((a, b) => contentOrder.indexOf(a) - contentOrder.indexOf(b));

  const renderMainSection = (id) => {
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

  const renderSidebarSection = (id) => {
    switch (id) {
      case "skills":
        return renderSkills();
      case "education":
        return renderEducation();
      case "certifications":
        return renderCertifications();
      case "languages":
        return renderLanguages();
      default:
        return null;
    }
  };

  return (
    <div className="bg-white text-slate-800 font-sans leading-relaxed text-[13px] print:text-[11px] w-full min-h-[1050px] h-full print:h-full print:min-h-0 flex flex-col justify-between print:p-0 print:m-0">
      {/* 2-COLUMN BODY */}
      <div className="w-full flex flex-col md:flex-row print:flex-row flex-1 resume-modern-body">
        {/* LEFT SIDEBAR (36%) */}
        <aside
          className={`w-full md:w-[36%] print:w-[36%] print:shrink-0 ${
            totalPages === 1
              ? "p-5 sm:p-6 print:p-3 space-y-3 print:space-y-2"
              : "p-6 sm:p-7 print:p-4 space-y-6 print:space-y-3"
          } border-r print:border-r resume-modern-aside`}
          style={{
            backgroundColor: theme.lightBg,
            borderColor: theme.border,
          }}
        >
          {page === 1 ? (
            <>
              {renderContact()}
              {totalPages === 1
                ? sidebarSectionIds.map((id) => (
                    <React.Fragment key={id}>
                      {renderSidebarSection(id)}
                    </React.Fragment>
                  ))
                : sidebarSectionIds.slice(0, 1).map((id) => (
                    <React.Fragment key={id}>
                      {renderSidebarSection(id)}
                    </React.Fragment>
                  ))}
            </>
          ) : (
            <>
              {sidebarSectionIds.slice(1).map((id) => (
                <React.Fragment key={id}>
                  {renderSidebarSection(id)}
                </React.Fragment>
              ))}
            </>
          )}
        </aside>

        {/* RIGHT MAIN CONTENT (64%) */}
        <div
          className={`w-full md:w-[64%] print:w-[64%] ${
            totalPages === 1
              ? "p-5 sm:p-6 print:p-3.5 space-y-3 print:space-y-2 flex-1"
              : "p-7 sm:p-8 print:p-5 space-y-5 print:space-y-3 flex-1"
          } resume-modern-main`}
        >
          {page === 1 ? (
            <>
              {renderMainHeader(false)}
              {totalPages === 1
                ? mainSectionIds.map((id) => (
                    <React.Fragment key={id}>
                      {renderMainSection(id)}
                    </React.Fragment>
                  ))
                : mainSectionIds.slice(0, 2).map((id) => (
                    <React.Fragment key={id}>
                      {renderMainSection(id)}
                    </React.Fragment>
                  ))}
            </>
          ) : (
            <>
              {mainSectionIds.slice(2).map((id) => (
                <React.Fragment key={id}>
                  {renderMainSection(id)}
                </React.Fragment>
              ))}
            </>
          )}
        </div>
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

export default ModernExecutiveTemplate;
