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
    personalInfo,
    summary,
    experiences = [],
    education = [],
    skills = {},
    projects = [],
    certifications = [],
    sectionHeadings = {},
  } = data;

  // SUB-RENDERER: Hero Banner
  const renderHeroBanner = (isContinuation = false) => {
    if (isContinuation) {
      return (
        <header
          className="p-5 sm:p-6 text-white relative overflow-hidden shrink-0"
          style={{ backgroundColor: theme.primary }}
        >
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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

    return (
      <header
        className="p-7 sm:p-9 print:p-5 text-white relative overflow-hidden shrink-0"
        style={{ backgroundColor: theme.primary }}
      >
        <div
          className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full opacity-20 pointer-events-none"
          style={{ backgroundColor: theme.accent }}
        />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4 sm:gap-5">
            {personalInfo.photo && (
              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full overflow-hidden border-3 border-white/90 shadow-md bg-white shrink-0">
                <img
                  src={personalInfo.photo}
                  alt={personalInfo.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="space-y-1">
              <EditableHeading
                value={sectionHeadings.eyebrow}
                fallback="Creative & Growth Strategist"
                onChange={(val) => onUpdateHeading?.("eyebrow", val)}
                className="text-[11px] font-extrabold uppercase tracking-[2.5px] px-2.5 py-1 rounded-md inline-block bg-white/15 backdrop-blur-xs text-white"
                tag="span"
              />
              <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                {personalInfo.fullName}
              </h1>
              <p className="text-base sm:text-lg font-medium text-white/90">
                {personalInfo.jobTitle}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 text-xs text-white/90 self-start sm:self-auto sm:text-right border-l sm:border-l-0 sm:border-r pl-3 sm:pl-0 sm:pr-4 border-white/25">
            {personalInfo.email && (
              <span className="flex items-center sm:justify-end gap-2">
                <Mail size={13} className="text-white/80" />
                {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center sm:justify-end gap-2">
                <Phone size={13} className="text-white/80" />
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center sm:justify-end gap-2">
                <MapPin size={13} className="text-white/80" />
                {personalInfo.location}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center sm:justify-end gap-2">
                <Linkedin size={13} className="text-white/80" />
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
    if (!summary) return null;
    return (
      <section
        className="p-4 sm:p-5 rounded-2xl border flex items-start gap-3.5"
        style={{
          backgroundColor: theme.lightBg,
          borderColor: theme.border,
        }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 shadow-2xs"
          style={{ backgroundColor: theme.secondary }}
        >
          <Target size={18} />
        </div>
        <div>
          <EditableHeading
            value={sectionHeadings.summary}
            fallback="Executive Vision & Strategic Impact"
            onChange={(val) => onUpdateHeading?.("summary", val)}
            className="text-xs font-black uppercase tracking-wider mb-1"
            style={{ color: theme.primary }}
            tag="h2"
          />
          <p className="text-[12.5px] text-slate-700 leading-relaxed text-justify">
            {summary}
          </p>
        </div>
      </section>
    );
  };

  // SUB-RENDERER: Work Experience
  const renderExperience = () => {
    if (!experiences || experiences.length === 0) return null;
    return (
      <section className="space-y-4">
        <div
          className="flex items-center justify-between pb-2 border-b-2"
          style={{ borderColor: theme.primary }}
        >
          <div className="flex items-center gap-2">
            <Briefcase size={17} style={{ color: theme.primary }} />
            <EditableHeading
              value={sectionHeadings.experience}
              fallback="Experience & Track Record"
              onChange={(val) => onUpdateHeading?.("experience", val)}
              className="text-sm font-black uppercase tracking-wider"
              style={{ color: theme.primary }}
              tag="h2"
            />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Performance Chronology
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="p-4 sm:p-5 rounded-xl border transition-all space-y-2"
              style={{ borderColor: theme.border }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">
                    {exp.role}
                  </h3>
                  <div
                    className="text-[12px] font-bold"
                    style={{ color: theme.secondary }}
                  >
                    {exp.company} •{" "}
                    <span className="text-slate-500 font-normal">
                      {exp.location}
                    </span>
                  </div>
                </div>
                <span
                  className="text-[11px] font-bold px-3 py-1 rounded-full self-start sm:self-auto"
                  style={{
                    backgroundColor: theme.badgeBg,
                    color: theme.badgeText,
                  }}
                >
                  {exp.startDate} – {exp.endDate}
                </span>
              </div>

              {exp.bullets && exp.bullets.length > 0 && (
                <ul className="space-y-1.5 text-[12px] text-slate-700 pt-1">
                  {exp.bullets.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ChevronRight
                        size={13}
                        style={{ color: theme.accent }}
                        className="mt-0.5 shrink-0"
                      />
                      <span className="leading-snug">{b}</span>
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
      <section className="space-y-4">
        <div
          className="flex items-center justify-between pb-2 border-b-2"
          style={{ borderColor: theme.primary }}
        >
          <div className="flex items-center gap-2">
            <TrendingUp size={17} style={{ color: theme.primary }} />
            <EditableHeading
              value={sectionHeadings.projects}
              fallback="Live Agency Case Studies"
              onChange={(val) => onUpdateHeading?.("projects", val)}
              className="text-sm font-black uppercase tracking-wider"
              style={{ color: theme.primary }}
              tag="h2"
            />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Verified Outcomes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="p-4 rounded-xl border space-y-2 flex flex-col justify-between"
              style={{
                backgroundColor: theme.lightBg,
                borderColor: theme.border,
              }}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <EditableHeading
                    value={proj.title}
                    fallback="Project Title"
                    onChange={(val) => onUpdateProject?.(proj.id, "title", val)}
                    className="font-bold text-slate-900 text-[12.5px]"
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
                    className="inline-block text-[10px] font-black uppercase px-2 py-0.5 rounded-md mb-2 text-white"
                    style={{ backgroundColor: theme.primary }}
                    tag="span"
                  />
                ) : null}
                <p className="text-[11.5px] text-slate-700 leading-snug">
                  {proj.description}
                </p>
              </div>
              {proj.clientOrType ? (
                <div className="pt-1">
                  <EditableHeading
                    value={proj.clientOrType}
                    fallback=""
                    onChange={(val) =>
                      onUpdateProject?.(proj.id, "clientOrType", val)
                    }
                    className="text-[10.5px] font-bold inline-block cursor-text hover:underline"
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
  const renderSkills = () => (
    <section className="space-y-3">
      <div
        className="flex items-center gap-2 pb-1.5 border-b"
        style={{ borderColor: theme.border }}
      >
        <Layers size={16} style={{ color: theme.primary }} />
        <EditableHeading
          value={sectionHeadings.skills}
          fallback="Skills Matrix"
          onChange={(val) => onUpdateHeading?.("skills", val)}
          className="text-xs font-black uppercase tracking-wider"
          style={{ color: theme.primary }}
          tag="h2"
        />
      </div>
      <div className="space-y-2.5">
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
                className="text-[10px] font-bold uppercase text-slate-500 block mb-1"
                tag="span"
              />
              <div className="flex flex-wrap gap-1.5">
                {skillList.map((s, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-[11px] font-bold px-2 py-0.5 rounded-md border"
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

  // SUB-RENDERER: Education & Certifications
  const renderEducationAndCertifications = () => (
    <section className="space-y-3">
      <div
        className="flex items-center gap-2 pb-1.5 border-b"
        style={{ borderColor: theme.border }}
      >
        <GraduationCap size={16} style={{ color: theme.primary }} />
        <EditableHeading
          value={sectionHeadings.education}
          fallback="Education & Credentials"
          onChange={(val) => onUpdateHeading?.("education", val)}
          className="text-xs font-black uppercase tracking-wider"
          style={{ color: theme.primary }}
          tag="h2"
        />
      </div>
      <div className="space-y-3 text-[12px]">
        {education &&
          education.map((edu) => (
            <div key={edu.id} className="space-y-0.5">
              <div className="font-bold text-slate-900">{edu.degree}</div>
              <div className="text-slate-600 font-medium text-[11px]">
                {edu.institution} • {edu.year}
              </div>
            </div>
          ))}
        {certifications &&
          certifications.map((cert) => (
            <div
              key={cert.id}
              className="flex items-center gap-2 text-[11.5px]"
            >
              <Award
                size={13}
                style={{ color: theme.accent }}
                className="shrink-0"
              />
              <span className="font-bold text-slate-800">{cert.name}</span>
              <span className="text-[10px] text-slate-400">({cert.year})</span>
            </div>
          ))}
      </div>
    </section>
  );

  return (
    <div className="bg-white text-slate-800 font-sans leading-relaxed text-[13px] print:text-[11px] w-full min-h-[1050px] h-full print:h-full print:min-h-0 flex flex-col justify-between print:p-0 print:m-0">
      {/* HEADER BANNER (PAGE 1 ONLY - NO HEADER ON PAGE 2) */}
      {page === 1 && renderHeroBanner(false)}

      {/* BODY CONTENT */}
      <div className="p-6 sm:p-8 print:p-5 space-y-6 print:space-y-3 flex-1">
        {page === 1 ? (
          <>
            {renderSummary()}
            {renderExperience()}
            {totalPages === 1 ? (
              <>
                {renderProjects()}
                <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-6 print:gap-4 pt-2 resume-creative-grid">
                  {renderSkills()}
                  {renderEducationAndCertifications()}
                </div>
              </>
            ) : (
              <div className="pt-2">{renderSkills()}</div>
            )}
          </>
        ) : (
          <>
            {renderProjects()}
            <div className="pt-2">{renderEducationAndCertifications()}</div>
          </>
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
