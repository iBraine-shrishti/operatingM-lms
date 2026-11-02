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
    if (!summary) return null;
    return (
      <section className="space-y-1.5">
        <EditableHeading
          value={sectionHeadings.summary}
          fallback="Career Summary"
          onChange={(val) => onUpdateHeading?.("summary", val)}
          className="text-xs font-black uppercase tracking-wider"
          style={{ color: theme.primary }}
          tag="h2"
        />
        <p className="text-[12px] text-slate-700 leading-relaxed text-justify">
          {summary}
        </p>
      </section>
    );
  };

  // SUB-RENDERER: Experience
  const renderExperience = () => {
    if (!experiences || experiences.length === 0) return null;
    return (
      <section className="space-y-3">
        <div className="flex items-center gap-2 pb-1.5 border-b" style={{ borderColor: theme.border }}>
          <Briefcase size={16} style={{ color: theme.primary }} />
          <EditableHeading
            value={sectionHeadings.experience}
            fallback="Professional Experience"
            onChange={(val) => onUpdateHeading?.("experience", val)}
            className="text-xs font-black uppercase tracking-wider"
            style={{ color: theme.primary }}
            tag="h2"
          />
        </div>

        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between font-bold">
                <span className="text-slate-900 text-[13px]">{exp.role}</span>
                <span
                  className="text-[10.5px] font-bold px-2 py-0.5 rounded self-start sm:self-auto"
                  style={{
                    backgroundColor: theme.badgeBg,
                    color: theme.badgeText,
                  }}
                >
                  {exp.startDate} – {exp.endDate}
                </span>
              </div>
              <div className="text-[11.5px] font-semibold" style={{ color: theme.secondary }}>
                {exp.company} • <span className="text-slate-500 font-normal">{exp.location}</span>
              </div>
              {exp.bullets && exp.bullets.length > 0 && (
                <ul className="space-y-1 text-[11.5px] text-slate-700 pt-1">
                  {exp.bullets.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 leading-snug">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                        style={{ backgroundColor: theme.primary }}
                      />
                      <span>{b}</span>
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

  // SUB-RENDERER: Projects
  const renderProjects = () => {
    if (!projects || projects.length === 0) return null;
    return (
      <section className="space-y-3">
        <div className="flex items-center gap-2 pb-1.5 border-b" style={{ borderColor: theme.border }}>
          <FolderGit2 size={16} style={{ color: theme.primary }} />
          <EditableHeading
            value={sectionHeadings.projects}
            fallback="Featured Projects & Portfolios"
            onChange={(val) => onUpdateHeading?.("projects", val)}
            className="text-xs font-black uppercase tracking-wider"
            style={{ color: theme.primary }}
            tag="h2"
          />
        </div>

        <div className="space-y-3">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="p-3.5 rounded-xl border space-y-1.5"
              style={{ backgroundColor: theme.lightBg, borderColor: theme.border }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h4 className="font-bold text-slate-900 text-[12.5px]">{proj.title}</h4>
                {proj.metricHighlight && (
                  <span
                    className="text-[10px] font-black uppercase px-2 py-0.5 rounded self-start sm:self-auto"
                    style={{
                      backgroundColor: theme.primary,
                      color: "#ffffff",
                    }}
                  >
                    {proj.metricHighlight}
                  </span>
                )}
              </div>
              <div className="text-[11px] font-bold" style={{ color: theme.secondary }}>
                {proj.clientOrType}
              </div>
              <p className="text-[11.5px] text-slate-700 leading-snug">
                {proj.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  };

  // SUB-RENDERER: Skills
  const renderSkills = () => (
    <section className="space-y-3">
      <div className="flex items-center gap-2 pb-1.5 border-b" style={{ borderColor: theme.border }}>
        <Layers size={16} style={{ color: theme.primary }} />
        <EditableHeading
          value={sectionHeadings.skills}
          fallback="Skills & Tech Stack"
          onChange={(val) => onUpdateHeading?.("skills", val)}
          className="text-xs font-black uppercase tracking-wider"
          style={{ color: theme.primary }}
          tag="h2"
        />
      </div>

      {data.skillsSummaryText && (
        <p className="text-[12px] text-slate-700 leading-relaxed mb-3 pb-2 border-b border-slate-100">
          {data.skillsSummaryText}
        </p>
      )}

      <div className="space-y-3">
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
                className="text-[10px] font-black uppercase tracking-wide text-slate-500 block mb-1.5"
                tag="span"
              />
              <div className="flex flex-wrap gap-1.5">
                {skillList.map((s, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-md border"
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

  // SUB-RENDERER: Education
  const renderEducation = () => {
    if (!education || education.length === 0) return null;
    return (
      <section className="space-y-3">
        <div className="flex items-center gap-2 pb-1.5 border-b" style={{ borderColor: theme.border }}>
          <GraduationCap size={16} style={{ color: theme.primary }} />
          <EditableHeading
            value={sectionHeadings.education}
            fallback="Education & Qualifications"
            onChange={(val) => onUpdateHeading?.("education", val)}
            className="text-xs font-black uppercase tracking-wider"
            style={{ color: theme.primary }}
            tag="h2"
          />
        </div>

        <div className="space-y-2 text-[12px]">
          {education.map((edu) => (
            <div key={edu.id} className="p-3 rounded-lg border space-y-1" style={{ borderColor: theme.border }}>
              <div className="font-bold text-slate-900 leading-snug">{edu.degree}</div>
              <div className="text-slate-600 font-medium">{edu.institution}</div>
              <div className="flex items-center justify-between text-[11px] pt-0.5">
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
    if (!certifications || certifications.length === 0) return null;
    return (
      <section className="space-y-3">
        <div className="flex items-center gap-2 pb-1.5 border-b" style={{ borderColor: theme.border }}>
          <Award size={16} style={{ color: theme.primary }} />
          <EditableHeading
            value={sectionHeadings.certifications}
            fallback="Certifications & Licenses"
            onChange={(val) => onUpdateHeading?.("certifications", val)}
            className="text-xs font-black uppercase tracking-wider"
            style={{ color: theme.primary }}
            tag="h2"
          />
        </div>

        <div className="space-y-2 text-[12px]">
          {certifications.map((cert) => (
            <div key={cert.id} className="flex items-start gap-2">
              <CheckCircle2
                size={14}
                className="mt-0.5 shrink-0"
                style={{ color: theme.accent }}
              />
              <div>
                <div className="font-bold text-slate-900 leading-tight">{cert.name}</div>
                <div className="text-[10.5px] text-slate-500">
                  {cert.issuer} • {cert.year}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="bg-white text-slate-800 font-sans leading-relaxed text-[13px] w-full min-h-[1050px] p-6 sm:p-8 flex flex-col justify-between print:min-h-0 print:p-5 print:m-0">
      <div className="space-y-5 flex-1">
        {renderHeader(page === 2)}

        {page === 1 ? (
          <>
            {renderSummary()}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-1">
              <div className="md:col-span-7 space-y-5">
                {renderExperience()}
                {totalPages === 1 && renderProjects()}
              </div>
              <div className="md:col-span-5 space-y-5">
                {renderSkills()}
                {totalPages === 1 && (
                  <>
                    {renderEducation()}
                    {renderCertifications()}
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-1">
            <div className="md:col-span-7 space-y-5">
              {renderProjects()}
            </div>
            <div className="md:col-span-5 space-y-5">
              {renderEducation()}
              {renderCertifications()}
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
      />
    </div>
  );
};

export default MinimalistPerformanceTemplate;
