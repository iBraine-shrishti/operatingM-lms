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
  Layers,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

export const CreativeMarketerTemplate = ({ data, theme }) => {
  const {
    personalInfo,
    summary,
    experiences = [],
    education = [],
    skills = {},
    projects = [],
    certifications = [],
    languages = [],
  } = data;

  return (
    <div className="bg-white text-slate-800 font-sans leading-relaxed text-[13px] shadow-sm min-h-[1050px] w-full print:shadow-none print:m-0">
      {/* CREATIVE HERO BANNER */}
      <header
        className="p-8 sm:p-10 text-white relative overflow-hidden"
        style={{
          backgroundColor: theme.primary,
        }}
      >
        {/* Subtle decorative background circle */}
        <div
          className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full opacity-20 pointer-events-none"
          style={{ backgroundColor: theme.accent }}
        />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {personalInfo.photo && (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-3 border-white/90 shadow-md bg-white shrink-0">
                <img
                  src={personalInfo.photo}
                  alt={personalInfo.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="space-y-1">
              <span
                className="text-[11px] font-extrabold uppercase tracking-[2.5px] px-2.5 py-1 rounded-md inline-block bg-white/15 backdrop-blur-xs text-white"
              >
                Creative & Growth Strategist
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
                {personalInfo.fullName}
              </h1>
              <p className="text-base sm:text-lg font-medium text-white/90">
                {personalInfo.jobTitle}
              </p>
            </div>
          </div>

          {/* Social & Contact Strip in Hero */}
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

      {/* BODY CONTENT */}
      <div className="p-8 sm:p-10 space-y-7">
        {/* SUMMARY CARD */}
        {summary && (
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
              <Sparkles size={18} />
            </div>
            <div>
              <h2
                className="text-xs font-black uppercase tracking-wider mb-1"
                style={{ color: theme.primary }}
              >
                Executive Vision & Strategic Impact
              </h2>
              <p className="text-[12.5px] text-slate-700 leading-relaxed text-justify">
                {summary}
              </p>
            </div>
          </section>
        )}

        {/* WORK EXPERIENCE */}
        {experiences && experiences.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2" style={{ borderColor: theme.primary }}>
              <div className="flex items-center gap-2">
                <Briefcase size={17} style={{ color: theme.primary }} />
                <h2
                  className="text-sm font-black uppercase tracking-wider"
                  style={{ color: theme.primary }}
                >
                  Experience & Track Record
                </h2>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Performance Chronology
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="p-5 rounded-xl border transition-all space-y-2.5"
                  style={{ borderColor: theme.border }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-sm">{exp.role}</h3>
                      <div className="text-[12px] font-bold" style={{ color: theme.secondary }}>
                        {exp.company} • <span className="text-slate-500 font-normal">{exp.location}</span>
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
                          <ChevronRight size={13} style={{ color: theme.accent }} className="mt-0.5 shrink-0" />
                          <span className="leading-snug">{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FEATURED PROJECTS */}
        {projects && projects.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2" style={{ borderColor: theme.primary }}>
              <div className="flex items-center gap-2">
                <TrendingUp size={17} style={{ color: theme.primary }} />
                <h2
                  className="text-sm font-black uppercase tracking-wider"
                  style={{ color: theme.primary }}
                >
                  Live Agency Case Studies
                </h2>
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
                      <h4 className="font-bold text-slate-900 text-[12.5px]">{proj.title}</h4>
                    </div>
                    <span
                      className="inline-block text-[10px] font-black uppercase px-2 py-0.5 rounded-md mb-2"
                      style={{
                        backgroundColor: theme.primary,
                        color: "#ffffff",
                      }}
                    >
                      {proj.metricHighlight}
                    </span>
                    <p className="text-[11.5px] text-slate-700 leading-snug">
                      {proj.description}
                    </p>
                  </div>
                  <div className="text-[10.5px] font-bold pt-1" style={{ color: theme.secondary }}>
                    {proj.clientOrType}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 2-COL BOTTOM: SKILLS & CREDENTIALS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* SKILLS */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 pb-1.5 border-b" style={{ borderColor: theme.border }}>
              <Layers size={16} style={{ color: theme.primary }} />
              <h2
                className="text-xs font-black uppercase tracking-wider"
                style={{ color: theme.primary }}
              >
                Skills Matrix
              </h2>
            </div>
            <div className="space-y-2.5">
              {skills.paidAds && (
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Paid Ads & Funnels</span>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.paidAds.map((s, idx) => (
                      <span
                        key={idx}
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
              )}
              {skills.seoContent && (
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1">SEO & Tech MarTech</span>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.seoContent.map((s, idx) => (
                      <span
                        key={idx}
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
              )}
            </div>
          </section>

          {/* EDUCATION & CERTIFICATIONS */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 pb-1.5 border-b" style={{ borderColor: theme.border }}>
              <GraduationCap size={16} style={{ color: theme.primary }} />
              <h2
                className="text-xs font-black uppercase tracking-wider"
                style={{ color: theme.primary }}
              >
                Education & Certifications
              </h2>
            </div>
            <div className="space-y-3 text-[12px]">
              {education && education.slice(0, 1).map((edu) => (
                <div key={edu.id} className="space-y-0.5">
                  <div className="font-bold text-slate-900">{edu.degree}</div>
                  <div className="text-slate-600 font-medium text-[11px]">{edu.institution} • {edu.year}</div>
                </div>
              ))}
              {certifications && certifications.slice(0, 3).map((cert) => (
                <div key={cert.id} className="flex items-center gap-2 text-[11.5px]">
                  <Award size={13} style={{ color: theme.accent }} className="shrink-0" />
                  <span className="font-bold text-slate-800">{cert.name}</span>
                  <span className="text-[10px] text-slate-400">({cert.year})</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
