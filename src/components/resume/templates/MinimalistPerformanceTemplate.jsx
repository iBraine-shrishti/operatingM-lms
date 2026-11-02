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
  Sparkles,
  FolderGit2,
  CheckCircle2,
} from "lucide-react";
import { EditableHeading } from "../EditableHeading";

export const MinimalistPerformanceTemplate = ({ data, theme, onUpdateHeading }) => {
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

  return (
    <div className="bg-white text-slate-800 font-sans leading-relaxed text-[13px] shadow-sm min-h-[1050px] w-full p-8 sm:p-10 print:shadow-none print:m-0 print:p-6">
      {/* TOP HEADER */}
      <header className="pb-6 border-b-2" style={{ borderColor: theme.primary }}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span
              className="text-[10px] font-extrabold uppercase tracking-[2px] block mb-1"
              style={{ color: theme.secondary }}
            >
              Professional Portfolio • ATS Verified
            </span>
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

          {/* Quick Metrics Badge */}
          <div
            className="px-4 py-2.5 rounded-xl border text-right"
            style={{ backgroundColor: theme.lightBg, borderColor: theme.border }}
          >
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Specialization</span>
            <span className="text-xs font-black" style={{ color: theme.primary }}>
              Digital Acquisition & Growth
            </span>
          </div>
        </div>

        {/* Contact Info Pills */}
        <div className="flex flex-wrap gap-y-2 gap-x-4 pt-4 text-[12px] text-slate-600 font-medium">
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
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.portfolio && (
            <span className="flex items-center gap-1.5">
              <Globe size={13} style={{ color: theme.primary }} />
              {personalInfo.portfolio}
            </span>
          )}
        </div>
      </header>

      {/* SUMMARY BAR */}
      {summary && (
        <section className="py-4 border-b text-[12.5px] text-slate-700 text-justify" style={{ borderColor: theme.border }}>
          <div className="flex items-start gap-2">
            <EditableHeading
              value={sectionHeadings.summary}
              fallback="Profile Overview"
              onChange={(val) => onUpdateHeading?.("summary", val)}
              className="font-bold shrink-0"
              style={{ color: theme.primary }}
              tag="span"
            />
            <p className="leading-relaxed">: {summary}</p>
          </div>
        </section>
      )}

      {/* 2-COLUMN MAIN BODY */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-7 pt-5">
        {/* LEFT COLUMN: EXPERIENCE & CASE STUDIES (7 COLS) */}
        <div className="md:col-span-7 space-y-6">
          {/* EXPERIENCE */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-1.5 border-b" style={{ borderColor: theme.border }}>
              <Briefcase size={16} style={{ color: theme.primary }} />
              <EditableHeading
                value={sectionHeadings.experience}
                fallback="Work Experience & Impact"
                onChange={(val) => onUpdateHeading?.("experience", val)}
                className="text-xs font-black uppercase tracking-wider"
                style={{ color: theme.primary }}
                tag="h2"
              />
            </div>

            <div className="space-y-5">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-bold text-slate-900 text-[13px]">{exp.role}</h3>
                    <span
                      className="text-[10.5px] font-extrabold uppercase px-2 py-0.5 rounded self-start sm:self-auto"
                      style={{
                        backgroundColor: theme.badgeBg,
                        color: theme.badgeText,
                      }}
                    >
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>
                  <div className="text-[11.5px] font-bold" style={{ color: theme.secondary }}>
                    {exp.company} • <span className="text-slate-500 font-normal">{exp.location}</span>
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="space-y-1 text-[12px] text-slate-700 pt-1">
                      {exp.bullets.map((b, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 size={12} style={{ color: theme.accent }} className="mt-1 shrink-0" />
                          <span className="leading-snug">{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* PROJECTS & CASE STUDIES */}
          {projects && projects.length > 0 && (
            <section className="space-y-3.5 pt-2">
              <div className="flex items-center gap-2 pb-1.5 border-b" style={{ borderColor: theme.border }}>
                <FolderGit2 size={16} style={{ color: theme.primary }} />
                <EditableHeading
                  value={sectionHeadings.projects}
                  fallback="Featured Campaign Case Studies"
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
          )}
        </div>

        {/* RIGHT COLUMN: SKILLS, EDUCATION, CERTS (5 COLS) */}
        <div className="md:col-span-5 space-y-6">
          {/* SKILLS */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 pb-1.5 border-b" style={{ borderColor: theme.border }}>
              <Sparkles size={16} style={{ color: theme.primary }} />
              <EditableHeading
                value={sectionHeadings.skills}
                fallback="Skills & Tech Stack"
                onChange={(val) => onUpdateHeading?.("skills", val)}
                className="text-xs font-black uppercase tracking-wider"
                style={{ color: theme.primary }}
                tag="h2"
              />
            </div>

            <div className="space-y-3">
              {skills.paidAds && (
                <div>
                  <EditableHeading
                    value={sectionHeadings.skillCat1}
                    fallback="Performance Ads & Media"
                    onChange={(val) => onUpdateHeading?.("skillCat1", val)}
                    className="text-[10px] font-black uppercase tracking-wide text-slate-500 block mb-1.5"
                    tag="span"
                  />
                  <div className="flex flex-wrap gap-1.5">
                    {skills.paidAds.map((s, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-md border"
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
              )}

              {skills.seoContent && (
                <div>
                  <EditableHeading
                    value={sectionHeadings.skillCat2}
                    fallback="SEO & Content Architecture"
                    onChange={(val) => onUpdateHeading?.("skillCat2", val)}
                    className="text-[10px] font-black uppercase tracking-wide text-slate-500 block mb-1.5"
                    tag="span"
                  />
                  <div className="flex flex-wrap gap-1.5">
                    {skills.seoContent.map((s, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-md border"
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
              )}

              {skills.analyticsTools && (
                <div>
                  <EditableHeading
                    value={sectionHeadings.skillCat3}
                    fallback="Analytics & Web MarTech"
                    onChange={(val) => onUpdateHeading?.("skillCat3", val)}
                    className="text-[10px] font-black uppercase tracking-wide text-slate-500 block mb-1.5"
                    tag="span"
                  />
                  <div className="flex flex-wrap gap-1.5">
                    {skills.analyticsTools.map((s, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-md border"
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
              )}
            </div>
          </section>

          {/* EDUCATION */}
          {education && education.length > 0 && (
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

              <div className="space-y-3 text-[12px]">
                {education.map((edu) => (
                  <div key={edu.id} className="p-3 rounded-lg border space-y-1" style={{ borderColor: theme.border }}>
                    <div className="font-bold text-slate-900 leading-snug">{edu.degree}</div>
                    <div className="text-slate-600 font-medium">{edu.institution}</div>
                    <div className="flex items-center justify-between text-[11px] pt-1">
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
          )}

          {/* CERTIFICATIONS */}
          {certifications && certifications.length > 0 && (
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
                    <span
                      className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                      style={{ backgroundColor: theme.accent }}
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
          )}
        </div>
      </div>
    </div>
  );
};
