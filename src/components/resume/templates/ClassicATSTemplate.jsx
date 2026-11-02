import React from "react";
import { EditableHeading } from "../EditableHeading";

export const ClassicATSTemplate = ({ data, theme, onUpdateHeading }) => {
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

  return (
    <div className="bg-white text-slate-900 font-sans leading-relaxed text-[12.5px] shadow-sm min-h-[1050px] w-full p-8 sm:p-12 print:shadow-none print:m-0 print:p-8">
      {/* ATS CENTERED HEADER */}
      <header className="text-center pb-4 border-b-2" style={{ borderColor: theme.primary }}>
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
              {idx < contactItems.length - 1 && <span className="text-slate-300">•</span>}
            </React.Fragment>
          ))}
        </div>
      </header>

      {/* SUMMARY */}
      {summary && (
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
      )}

      {/* CORE SKILLS */}
      <section className="mt-4">
        <EditableHeading
          value={sectionHeadings.skills}
          fallback="Core Competencies & Tools"
          onChange={(val) => onUpdateHeading?.("skills", val)}
          className="text-[12px] font-black uppercase tracking-wider pb-1 border-b mb-2"
          style={{ color: theme.primary, borderColor: theme.border }}
          tag="h2"
        />
        <div className="space-y-1 text-[12px]">
          {skills.paidAds && (
            <div>
              <EditableHeading
                value={sectionHeadings.skillCat1}
                fallback="Paid Advertising"
                onChange={(val) => onUpdateHeading?.("skillCat1", val)}
                className="font-bold inline-block mr-1"
                style={{ color: theme.secondary }}
                tag="strong"
              />
              <span className="text-slate-700">: {skills.paidAds.join(", ")}</span>
            </div>
          )}
          {skills.seoContent && (
            <div>
              <EditableHeading
                value={sectionHeadings.skillCat2}
                fallback="SEO & Content"
                onChange={(val) => onUpdateHeading?.("skillCat2", val)}
                className="font-bold inline-block mr-1"
                style={{ color: theme.secondary }}
                tag="strong"
              />
              <span className="text-slate-700">: {skills.seoContent.join(", ")}</span>
            </div>
          )}
          {skills.analyticsTools && (
            <div>
              <EditableHeading
                value={sectionHeadings.skillCat3}
                fallback="Analytics & Platforms"
                onChange={(val) => onUpdateHeading?.("skillCat3", val)}
                className="font-bold inline-block mr-1"
                style={{ color: theme.secondary }}
                tag="strong"
              />
              <span className="text-slate-700">: {skills.analyticsTools.join(", ")}</span>
            </div>
          )}
        </div>
      </section>

      {/* PROFESSIONAL EXPERIENCE */}
      {experiences && experiences.length > 0 && (
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
      )}

      {/* PROJECTS & CASE STUDIES */}
      {projects && projects.length > 0 && (
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
                    <span className="text-[11px] font-bold" style={{ color: theme.accent }}>
                      [{proj.metricHighlight}]
                    </span>
                  )}
                </div>
                <p className="text-slate-700 leading-snug mt-0.5">
                  <span className="font-semibold" style={{ color: theme.secondary }}>
                    {proj.clientOrType}:{" "}
                  </span>
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EDUCATION */}
      {education && education.length > 0 && (
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
                  <span className="text-[11px] font-semibold text-slate-600">{edu.year}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-[11px] text-slate-600">
                  <span>{edu.institution}</span>
                  {edu.score && <span className="font-bold" style={{ color: theme.secondary }}>{edu.score}</span>}
                </div>
                {edu.details && <p className="text-[11px] text-slate-500">{edu.details}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CERTIFICATIONS & LANGUAGES */}
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
    </div>
  );
};
