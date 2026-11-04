import React from "react";
import { ExternalLink } from "lucide-react";
import { EditableHeading } from "../EditableHeading";
import { ResumeFooter } from "../ResumeFooter";
import { formatUrl } from "../resumeData";

export const ClassicATSTemplate = ({
  data,
  theme,
  onUpdateHeading,
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
    languages = [],
    sectionHeadings = {},
  } = data || {};

  // SECTION: Header
  const renderHeader = () => {
    if (data.hiddenSections?.personal) return null;

    const contactItems = [];
    if (personalInfo.phone) {
      contactItems.push(
        <a
          key="phone"
          href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`}
          className="hover:underline hover:text-slate-900 transition-colors"
        >
          {personalInfo.phone}
        </a>
      );
    }
    if (personalInfo.email) {
      contactItems.push(
        <a
          key="email"
          href={`mailto:${personalInfo.email}`}
          className="hover:underline hover:text-slate-900 transition-colors"
        >
          {personalInfo.email}
        </a>
      );
    }
    if (personalInfo.location) {
      contactItems.push(<span key="loc">{personalInfo.location}</span>);
    }
    if (personalInfo.linkedin) {
      contactItems.push(
        <a
          key="linkedin"
          href={formatUrl(personalInfo.linkedin)}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline font-semibold hover:text-blue-700 transition-colors inline-flex items-center gap-0.5"
          style={{ color: theme.primary }}
        >
          <span>{personalInfo.linkedin}</span>
          <ExternalLink size={9} className="opacity-60 inline shrink-0" />
        </a>
      );
    }
    if (personalInfo.github) {
      contactItems.push(
        <a
          key="github"
          href={formatUrl(personalInfo.github)}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline font-semibold hover:text-blue-700 transition-colors inline-flex items-center gap-0.5"
          style={{ color: theme.primary }}
        >
          <span>{personalInfo.github}</span>
          <ExternalLink size={9} className="opacity-60 inline shrink-0" />
        </a>
      );
    }
    if (personalInfo.portfolio) {
      contactItems.push(
        <a
          key="portfolio"
          href={formatUrl(personalInfo.portfolio)}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline font-semibold hover:text-blue-700 transition-colors inline-flex items-center gap-0.5"
          style={{ color: theme.secondary || theme.primary }}
        >
          <span>{personalInfo.portfolio}</span>
          <ExternalLink size={9} className="opacity-60 inline shrink-0" />
        </a>
      );
    }

    return (
      <header
        className="text-center pb-3.5 border-b-2 resume-section break-inside-avoid print:break-inside-avoid"
        style={{ borderColor: theme.primary }}
      >
        <h1
          className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight"
          style={{ color: theme.primary }}
        >
          {personalInfo.fullName}
        </h1>
        {personalInfo.jobTitle && (
          <div
            className="text-sm sm:text-base font-bold mt-0.5 tracking-wide"
            style={{ color: theme.secondary }}
          >
            {personalInfo.jobTitle}
          </div>
        )}
        {contactItems.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[11.5px] text-slate-600 mt-2 font-medium">
            {contactItems.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-slate-300">•</span>}
                {item}
              </React.Fragment>
            ))}
          </div>
        )}
      </header>
    );
  };

  // SECTION: Page 2 Header (Slim sleek accent strip, no bulky repeated text, brings content upward)
  const renderPage2Header = () => {
    return (
      <div
        className="w-full h-1 shrink-0 bg-slate-900 mb-2.5 print:mb-2"
        style={{ backgroundColor: theme.primary }}
      />
    );
  };

  // SECTION: Summary
  const renderSummary = () => {
    if (data.hiddenSections?.summary || !summary || !summary.trim()) return null;
    return (
      <section className="mt-2.5 print:mt-2 resume-section break-inside-avoid print:break-inside-avoid">
        <EditableHeading
          value={sectionHeadings.summary}
          fallback="Professional Summary"
          onChange={(val) => onUpdateHeading?.("summary", val)}
          className="text-[12px] font-black uppercase tracking-wider pb-1 border-b mb-1.5"
          style={{ color: theme.primary, borderColor: theme.border }}
          tag="h2"
        />
        <p className="text-[11.5px] print:text-[10px] leading-snug text-slate-800 text-justify">
          {summary}
        </p>
      </section>
    );
  };

  // SECTION: Skills
  const renderSkills = () => {
    const hasAnySkills =
      skills &&
      Object.values(skills).some(
        (list) => Array.isArray(list) && list.length > 0
      );
    if (data.hiddenSections?.skills || !hasAnySkills) return null;

    return (
      <section className="mt-2.5 print:mt-2 resume-section break-inside-avoid print:break-inside-avoid">
        <EditableHeading
          value={sectionHeadings.skills}
          fallback="Core Competencies & Tools"
          onChange={(val) => onUpdateHeading?.("skills", val)}
          className="text-[12px] font-black uppercase tracking-wider pb-1 border-b mb-1.5"
          style={{ color: theme.primary, borderColor: theme.border }}
          tag="h2"
        />

        <div className="space-y-1 text-[11px] print:text-[10px]">
          {Object.entries(skills || {}).map(([catKey, skillList], idx) => {
            if (!skillList || skillList.length === 0) return null;
            const headingKey = `skillCat_${catKey}`;
            const fallbackKey = `skillCat${idx + 1}`;
            const defaultLabel =
              catKey === "paidAds"
                ? "Paid Advertising"
                : catKey === "seoContent"
                  ? "SEO & Content Architecture"
                  : catKey === "analyticsTools"
                    ? "Analytics & Platforms"
                    : catKey.charAt(0).toUpperCase() + catKey.slice(1);

            return (
              <div key={catKey}>
                <EditableHeading
                  value={
                    sectionHeadings[headingKey] || sectionHeadings[fallbackKey]
                  }
                  fallback={defaultLabel}
                  onChange={(val) => onUpdateHeading?.(headingKey, val)}
                  className="font-bold inline-block mr-1"
                  style={{ color: theme.secondary }}
                  tag="strong"
                />
                <span className="text-slate-700">: {skillList.join(", ")}</span>
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  // SECTION: Experience
  const renderExperience = () => {
    const list =
      totalPages === 2
        ? page === 1
          ? experiences.slice(0, 2)
          : experiences.slice(2)
        : experiences;

    if (
      data.hiddenSections?.experience ||
      !list ||
      list.length === 0
    )
      return null;

    return (
      <section className="mt-2.5 print:mt-2 resume-section break-inside-avoid print:break-inside-avoid">
        <EditableHeading
          value={sectionHeadings.experience}
          fallback={page === 2 && experiences.length > 2 ? "Work Experience (Continued)" : "Work Experience"}
          onChange={(val) => onUpdateHeading?.("experience", val)}
          className="text-[12px] font-black uppercase tracking-wider pb-1 border-b mb-2"
          style={{ color: theme.primary, borderColor: theme.border }}
          tag="h2"
        />
        <div className="space-y-2.5">
          {list.map((exp) => {
            const bulletsToRender = exp.bullets || [];

            return (
              <div key={exp.id} className="space-y-0.5 resume-section-item break-inside-avoid print:break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between font-bold text-slate-900">
                  <span className="text-[12px]">
                    {exp.role}
                  </span>
                  <span className="text-[11px] print:text-[10px] font-semibold text-slate-600">
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-[11px] print:text-[10px]">
                  <span className="font-bold" style={{ color: theme.secondary }}>
                    {exp.company}
                  </span>
                  <span className="text-slate-500 italic">{exp.location}</span>
                </div>
                {bulletsToRender.length > 0 && (
                  <ul className="list-disc list-outside pl-4 space-y-0.5 text-[11px] print:text-[9.5px] text-slate-700 pt-0.5">
                    {bulletsToRender.map((b, idx) => (
                      <li key={idx} className="leading-snug">
                        {b}
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

  // SECTION: Projects
  const renderProjects = () => {
    if (data.hiddenSections?.projects || !projects || projects.length === 0)
      return null;

    return (
      <section className="mt-2.5 print:mt-2 resume-section break-inside-avoid print:break-inside-avoid">
        <EditableHeading
          value={sectionHeadings.projects}
          fallback="Featured Projects & Case Studies"
          onChange={(val) => onUpdateHeading?.("projects", val)}
          className="text-[12px] font-black uppercase tracking-wider pb-1 border-b mb-1.5"
          style={{ color: theme.primary, borderColor: theme.border }}
          tag="h2"
        />
        <div className="space-y-1.5">
          {projects.map((proj) => (
            <div key={proj.id} className="text-[11px] print:text-[10px] resume-section-item break-inside-avoid print:break-inside-avoid">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between font-bold">
                <span className="text-slate-900">{proj.title}</span>
                {proj.metricHighlight && (
                  <span
                    className="text-[10.5px] print:text-[9.5px] font-bold"
                    style={{ color: theme.accent }}
                  >
                    [{proj.metricHighlight}]
                  </span>
                )}
              </div>
              <p className="text-slate-700 leading-snug mt-0.5">
                <span
                  className="font-semibold"
                  style={{ color: theme.secondary }}
                >
                  {proj.clientOrType}:{" "}
                </span>
                {proj.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  };

  // SECTION: Education
  const renderEducation = () => {
    if (data.hiddenSections?.education || !education || education.length === 0)
      return null;

    return (
      <section className="mt-2.5 print:mt-2 resume-section break-inside-avoid print:break-inside-avoid">
        <EditableHeading
          value={sectionHeadings.education}
          fallback="Education & Training"
          onChange={(val) => onUpdateHeading?.("education", val)}
          className="text-[12px] font-black uppercase tracking-wider pb-1 border-b mb-1.5"
          style={{ color: theme.primary, borderColor: theme.border }}
          tag="h2"
        />
        <div className="space-y-1.5 text-[11px] print:text-[10px]">
          {education.map((edu) => (
            <div key={edu.id} className="space-y-0.5 resume-section-item break-inside-avoid print:break-inside-avoid">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between font-bold text-slate-900">
                <span>{edu.degree}</span>
                <span className="text-[10.5px] print:text-[9.5px] font-semibold text-slate-600">
                  {edu.year}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-[10.5px] print:text-[9.5px] text-slate-600">
                <span>{edu.institution}</span>
                {edu.score && (
                  <span
                    className="font-bold"
                    style={{ color: theme.secondary }}
                  >
                    {edu.score}
                  </span>
                )}
              </div>
              {edu.details && (
                <p className="text-[10.5px] text-slate-500">{edu.details}</p>
              )}
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

    return (
      <section className="mt-2 print:mt-1.5 resume-section break-inside-avoid print:break-inside-avoid">
        <EditableHeading
          value={sectionHeadings.certifications}
          fallback="Certifications"
          onChange={(val) => onUpdateHeading?.("certifications", val)}
          className="text-[12px] font-black uppercase tracking-wider pb-1 border-b mb-1.5"
          style={{ color: theme.primary, borderColor: theme.border }}
          tag="h2"
        />
        <ul className="space-y-0.5 text-[10.5px] print:text-[9.5px] text-slate-700 list-disc list-outside pl-4">
          {certifications.map((c) => {
            const certUrl = c.url || c.link || c.credentialUrl;
            return (
              <li key={c.id}>
                {certUrl ? (
                  <a
                    href={formatUrl(certUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold hover:underline hover:text-blue-700 transition-colors inline-flex items-center gap-1"
                    style={{ color: theme.primary }}
                  >
                    <span>{c.name}</span>
                    <ExternalLink size={9} className="inline opacity-70 shrink-0" />
                  </a>
                ) : (
                  <strong>{c.name}</strong>
                )}
                {" "}– {c.issuer} {c.year && `(${c.year})`}
              </li>
            );
          })}
        </ul>
      </section>
    );
  };

  // SUB-RENDERER: Languages
  const renderLanguages = () => {
    if (data.hiddenSections?.languages || !languages || languages.length === 0)
      return null;

    return (
      <section className="mt-2 print:mt-1.5 resume-section break-inside-avoid print:break-inside-avoid">
        <EditableHeading
          value={sectionHeadings.languages}
          fallback="Languages"
          onChange={(val) => onUpdateHeading?.("languages", val)}
          className="text-[12px] font-black uppercase tracking-wider pb-1 border-b mb-1.5"
          style={{ color: theme.primary, borderColor: theme.border }}
          tag="h2"
        />
        <p className="text-[11px] print:text-[10px] text-slate-700 pt-0.5">
          {languages.join(" • ")}
        </p>
      </section>
    );
  };

  const renderSectionById = (secId) => {
    switch (secId) {
      case "summary":
        return renderSummary();
      case "skills":
        return renderSkills();
      case "experience":
        return renderExperience();
      case "projects":
        return renderProjects();
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

  const defaultOrder = [
    "summary",
    "skills",
    "experience",
    "projects",
    "education",
    "certifications",
    "languages",
  ];
  const customOrder = data.sectionOrders?.["classic-ats"] || data.sectionOrder;
  const contentOrder =
    Array.isArray(customOrder) && customOrder.length > 0
      ? [
          ...customOrder.filter((id) => defaultOrder.includes(id)),
          ...defaultOrder.filter((id) => !customOrder.includes(id)),
        ]
      : defaultOrder;

  const page1DefaultSections = ["summary", "skills", "experience"];
  const page1Sections = contentOrder.filter((id) => page1DefaultSections.includes(id));
  const page2Sections = [
    ...(experiences.length > 2 ? ["experience"] : []),
    ...contentOrder.filter((id) => !page1DefaultSections.includes(id)),
  ];

  const sectionsToRender =
    totalPages === 1
      ? contentOrder
      : page === 1
      ? page1Sections
      : page2Sections;

  return (
    <div
      className="bg-white text-slate-900 font-sans leading-relaxed text-[12.5px] print:text-[11px] w-full min-h-[1080px] print:min-h-[296.8mm] h-full p-6 sm:p-7 print:p-5 flex flex-col justify-between print:m-0"
    >
      <div className="space-y-2 flex-1">
        {page === 1 ? renderHeader() : renderPage2Header()}
        {sectionsToRender.map((secId) => (
          <React.Fragment key={secId}>
            {renderSectionById(secId)}
          </React.Fragment>
        ))}
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

export default ClassicATSTemplate;
