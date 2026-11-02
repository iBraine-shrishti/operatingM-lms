import React from "react";
import { EditableHeading } from "../EditableHeading";
import { ResumeFooter } from "../ResumeFooter";

export const ClassicATSTemplate = ({
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

  const contactItems = [
    personalInfo.phone,
    personalInfo.email,
    personalInfo.location,
    personalInfo.linkedin,
    personalInfo.portfolio,
  ].filter(Boolean);

  // SECTION: Header
  const renderHeader = (isContinuation = false) => {
    if (isContinuation) {
      return (
        <header
          className="pb-3 border-b-2 mb-4"
          style={{ borderColor: theme.primary }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-slate-700">
            <div>
              <span
                className="text-base font-black uppercase"
                style={{ color: theme.primary }}
              >
                {personalInfo.fullName}
              </span>
              <span className="text-xs font-bold ml-2 text-slate-500">
                • {personalInfo.jobTitle} (Page 2)
              </span>
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              {personalInfo.email}{" "}
              {personalInfo.phone && `• ${personalInfo.phone}`}
            </div>
          </div>
        </header>
      );
    }

    return (
      <header
        className="text-center pb-4 border-b-2"
        style={{ borderColor: theme.primary }}
      >
        <h1
          className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight"
          style={{ color: theme.primary }}
        >
          {personalInfo.fullName}
        </h1>
        <div
          className="text-sm sm:text-base font-bold mt-0.5 tracking-wide"
          style={{ color: theme.secondary }}
        >
          {personalInfo.jobTitle}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[11.5px] text-slate-600 mt-2 font-medium">
          {contactItems.map((item, idx) => (
            <React.Fragment key={idx}>
              <span>{item}</span>
              {idx < contactItems.length - 1 && (
                <span className="text-slate-300">•</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </header>
    );
  };

  // SECTION: Summary
  const renderSummary = () => {
    if (!summary) return null;
    return (
      <section className="mt-4">
        <EditableHeading
          value={sectionHeadings.summary}
          fallback="Professional Summary"
          onChange={(val) => onUpdateHeading?.("summary", val)}
          className="text-[12px] font-black uppercase tracking-wider pb-1 border-b mb-2"
          style={{ color: theme.primary, borderColor: theme.border }}
          tag="h2"
        />
        <p className="text-[12px] text-slate-800 text-justify leading-relaxed">
          {summary}
        </p>
      </section>
    );
  };

  // SECTION: Skills
  const renderSkills = () => (
    <section className="mt-4">
      <EditableHeading
        value={sectionHeadings.skills}
        fallback="Core Competencies & Tools"
        onChange={(val) => onUpdateHeading?.("skills", val)}
        className="text-[12px] font-black uppercase tracking-wider pb-1 border-b mb-2"
        style={{ color: theme.primary, borderColor: theme.border }}
        tag="h2"
      />

      {data.skillsSummaryText && (
        <p className="text-[12px] text-slate-800 leading-relaxed mb-2 pb-1 border-b border-slate-100">
          {data.skillsSummaryText}
        </p>
      )}

      <div className="space-y-1 text-[12px]">
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

  // SECTION: Experience
  const renderExperience = () => {
    if (!experiences || experiences.length === 0) return null;
    return (
      <section className="mt-4">
        <EditableHeading
          value={sectionHeadings.experience}
          fallback="Work Experience"
          onChange={(val) => onUpdateHeading?.("experience", val)}
          className="text-[12px] font-black uppercase tracking-wider pb-1 border-b mb-3"
          style={{ color: theme.primary, borderColor: theme.border }}
          tag="h2"
        />
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between font-bold text-slate-900">
                <span className="text-[13px]">{exp.role}</span>
                <span className="text-[11.5px] font-semibold text-slate-600">
                  {exp.startDate} – {exp.endDate}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-[11.5px]">
                <span className="font-bold" style={{ color: theme.secondary }}>
                  {exp.company}
                </span>
                <span className="text-slate-500 italic">{exp.location}</span>
              </div>
              {exp.bullets && exp.bullets.length > 0 && (
                <ul className="list-disc list-outside pl-4 space-y-1 text-[11.5px] text-slate-700 pt-1">
                  {exp.bullets.map((b, idx) => (
                    <li key={idx} className="leading-snug">
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  // SECTION: Projects
  const renderProjects = () => {
    if (!projects || projects.length === 0) return null;
    return (
      <section className="mt-4">
        <EditableHeading
          value={sectionHeadings.projects}
          fallback="Featured Projects & Case Studies"
          onChange={(val) => onUpdateHeading?.("projects", val)}
          className="text-[12px] font-black uppercase tracking-wider pb-1 border-b mb-2"
          style={{ color: theme.primary, borderColor: theme.border }}
          tag="h2"
        />
        <div className="space-y-2.5">
          {projects.map((proj) => (
            <div key={proj.id} className="text-[11.5px]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between font-bold">
                <span className="text-slate-900">{proj.title}</span>
                {proj.metricHighlight && (
                  <span
                    className="text-[11px] font-bold"
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
    if (!education || education.length === 0) return null;
    return (
      <section className="mt-4">
        <EditableHeading
          value={sectionHeadings.education}
          fallback="Education & Training"
          onChange={(val) => onUpdateHeading?.("education", val)}
          className="text-[12px] font-black uppercase tracking-wider pb-1 border-b mb-2"
          style={{ color: theme.primary, borderColor: theme.border }}
          tag="h2"
        />
        <div className="space-y-2.5 text-[12px]">
          {education.map((edu) => (
            <div key={edu.id} className="space-y-0.5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between font-bold text-slate-900">
                <span>{edu.degree}</span>
                <span className="text-[11px] font-semibold text-slate-600">
                  {edu.year}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-[11px] text-slate-600">
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
                <p className="text-[11px] text-slate-500">{edu.details}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  // SECTION: Certifications & Languages
  const renderCertificationsAndLanguages = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      {certifications && certifications.length > 0 && (
        <section>
          <EditableHeading
            value={sectionHeadings.certifications}
            fallback="Certifications"
            onChange={(val) => onUpdateHeading?.("certifications", val)}
            className="text-[12px] font-black uppercase tracking-wider pb-1 border-b mb-2"
            style={{ color: theme.primary, borderColor: theme.border }}
            tag="h2"
          />
          <ul className="space-y-1 text-[11px] text-slate-700 list-disc list-outside pl-4">
            {certifications.map((c) => (
              <li key={c.id}>
                <strong>{c.name}</strong> – {c.issuer} ({c.year})
              </li>
            ))}
          </ul>
        </section>
      )}

      {languages && languages.length > 0 && (
        <section>
          <EditableHeading
            value={sectionHeadings.languages}
            fallback="Languages"
            onChange={(val) => onUpdateHeading?.("languages", val)}
            className="text-[12px] font-black uppercase tracking-wider pb-1 border-b mb-2"
            style={{ color: theme.primary, borderColor: theme.border }}
            tag="h2"
          />
          <p className="text-[11.5px] text-slate-700">
            {languages.join(" • ")}
          </p>
        </section>
      )}
    </div>
  );

  return (
    <div className="bg-white text-slate-900 font-sans leading-relaxed text-[12.5px] print:text-[11px] w-full min-h-[1050px] print:min-h-0 p-8 sm:p-10 print:p-6 flex flex-col justify-between print:m-0">
      {/* PAGE 1 CONTENT */}
      {page === 1 && (
        <div className="space-y-1">
          {renderHeader(false)}
          {renderSummary()}
          {renderSkills()}
          {renderExperience()}
          {/* If 1-page mode, also render projects, education, certs */}
          {totalPages === 1 && (
            <>
              {renderProjects()}
              {renderEducation()}
              {renderCertificationsAndLanguages()}
            </>
          )}
        </div>
      )}

      {/* PAGE 2 CONTENT (NO HEADER - JUST CONTENT & FOOTER) */}
      {page === 2 && (
        <div className="space-y-1">
          {renderProjects()}
          {renderEducation()}
          {renderCertificationsAndLanguages()}
        </div>
      )}

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
