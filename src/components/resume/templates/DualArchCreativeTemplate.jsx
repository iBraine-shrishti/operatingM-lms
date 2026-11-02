import React from "react";
import {
  Phone,
  Mail,
  Globe,
  MapPin,
} from "lucide-react";

export const DualArchCreativeTemplate = ({ data, theme }) => {
  const {
    personalInfo,
    summary,
    experiences = [],
    education = [],
    skillsSummary = [],
    expertiseList = [],
    skills = {},
  } = data;

  // Resolved skills summary with defaults if not present
  const displaySkillsSummary =
    skillsSummary && skillsSummary.length > 0
      ? skillsSummary
      : [
          { name: "Performance Ads", level: 90 },
          { name: "SEO & Growth Strategy", level: 85 },
          { name: "Campaign Analytics & GA4", level: 80 },
          { name: "Conversion Optimization", level: 85 },
        ];

  // Resolved expertise bullets
  const displayExpertise =
    expertiseList && expertiseList.length > 0
      ? expertiseList
      : [
          ...(skills.paidAds || ["Google Ads", "Meta Ads"]),
          ...(skills.seoContent || ["Technical SEO", "Keyword Research"]),
        ].slice(0, 8);

  return (
    <div className="bg-white text-slate-800 font-sans leading-relaxed text-[12.5px] shadow-sm min-h-[1050px] w-full flex flex-col md:flex-row print:shadow-none print:m-0">
      {/* LEFT COLUMN: DUAL-ARCH CAPSULE SIDEBAR (38%) */}
      <aside className="w-full md:w-[38%] bg-slate-200/80 dark:bg-slate-800/80 flex flex-col justify-between shrink-0 print:w-[38%]">
        {/* TOP ARCH CAPSULE */}
        <div
          className="rounded-b-[70px] sm:rounded-b-[90px] pt-8 pb-10 px-5 text-center text-white shadow-xs"
          style={{ backgroundColor: theme.primary }}
        >
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white leading-tight">
            {personalInfo.fullName}
          </h1>
          <div className="text-[10.5px] sm:text-[11px] font-extrabold uppercase tracking-[2px] text-white/85 mt-1">
            {personalInfo.jobTitle}
          </div>

          {/* CIRCULAR PROFILE PHOTO */}
          <div className="mt-6 flex justify-center">
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white shadow-md bg-slate-100 shrink-0">
              {personalInfo.photo ? (
                <img
                  src={personalInfo.photo}
                  alt={personalInfo.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center font-black text-3xl text-white"
                  style={{ backgroundColor: theme.secondary }}
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
            </div>
          </div>
        </div>

        {/* MIDDLE: CONTACT DETAILS WITH DARK SQUARE ICONS */}
        <div className="px-6 sm:px-7 py-6 space-y-3.5 text-slate-800 dark:text-slate-200 text-[11.5px] font-semibold">
          {personalInfo.phone && (
            <div className="flex items-center gap-3">
              <div
                className="w-6 h-6 rounded flex items-center justify-center text-white shrink-0 shadow-2xs"
                style={{ backgroundColor: theme.primary }}
              >
                <Phone size={12} />
              </div>
              <span>{personalInfo.phone}</span>
            </div>
          )}

          {personalInfo.email && (
            <div className="flex items-center gap-3">
              <div
                className="w-6 h-6 rounded flex items-center justify-center text-white shrink-0 shadow-2xs"
                style={{ backgroundColor: theme.primary }}
              >
                <Mail size={12} />
              </div>
              <span className="truncate">{personalInfo.email}</span>
            </div>
          )}

          {personalInfo.portfolio && (
            <div className="flex items-center gap-3">
              <div
                className="w-6 h-6 rounded flex items-center justify-center text-white shrink-0 shadow-2xs"
                style={{ backgroundColor: theme.primary }}
              >
                <Globe size={12} />
              </div>
              <span className="truncate">{personalInfo.portfolio}</span>
            </div>
          )}

          {personalInfo.location && (
            <div className="flex items-center gap-3">
              <div
                className="w-6 h-6 rounded flex items-center justify-center text-white shrink-0 shadow-2xs"
                style={{ backgroundColor: theme.primary }}
              >
                <MapPin size={12} />
              </div>
              <span>{personalInfo.location}</span>
            </div>
          )}
        </div>

        {/* BOTTOM ARCH CAPSULE: EDUCATION */}
        <div
          className="rounded-t-[70px] sm:rounded-t-[90px] pt-9 pb-8 px-6 sm:px-7 text-white shadow-xs"
          style={{ backgroundColor: theme.primary }}
        >
          <h2 className="text-sm sm:text-base font-black uppercase tracking-[2px] text-center text-white mb-5">
            EDUCATION
          </h2>

          <div className="space-y-4 text-center sm:text-left">
            {education && education.length > 0 ? (
              education.map((edu) => (
                <div key={edu.id} className="space-y-0.5">
                  <div className="font-extrabold text-white text-[12.5px] leading-tight">
                    {edu.degree}
                  </div>
                  <div className="text-white/85 text-[11.5px] font-medium">
                    {edu.institution}
                  </div>
                  <div className="text-white/60 text-[11px]">
                    {edu.year}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-white/70 text-xs">Education history prefilled</div>
            )}
          </div>
        </div>
      </aside>

      {/* RIGHT COLUMN: MAIN CONTENT (62%) */}
      <main className="w-full md:w-[62%] p-8 sm:p-10 space-y-6 flex-1 bg-white text-slate-800 print:w-[62%]">
        {/* 1. ABOUT ME */}
        {summary && (
          <section className="space-y-2">
            <h2
              className="text-sm sm:text-base font-black uppercase tracking-[2px]"
              style={{ color: theme.primary }}
            >
              ABOUT ME
            </h2>
            <p className="text-[12px] text-slate-700 leading-relaxed text-justify">
              {summary}
            </p>
          </section>
        )}

        {/* 2. WORK EXPERIENCE */}
        {experiences && experiences.length > 0 && (
          <section className="space-y-3 pt-1">
            <h2
              className="text-sm sm:text-base font-black uppercase tracking-[2px]"
              style={{ color: theme.primary }}
            >
              WORK EXPERIENCE
            </h2>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="pl-4 border-l-2 space-y-1"
                  style={{ borderColor: theme.primary }}
                >
                  <div className="font-extrabold text-slate-900 text-[13px] leading-tight">
                    {exp.role}
                  </div>
                  <div className="text-[11.5px] text-slate-500 font-medium">
                    {exp.company} • {exp.location} | {exp.startDate} – {exp.endDate}
                  </div>
                  {exp.bullets && exp.bullets.length > 0 ? (
                    <ul className="space-y-1 text-[11.5px] text-slate-700 pt-1">
                      {exp.bullets.slice(0, 2).map((b, idx) => (
                        <li key={idx} className="leading-snug">
                          {b}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3. SKILLS SUMMARY (WITH HORIZONTAL PROGRESS BARS) */}
        <section className="space-y-3 pt-1">
          <h2
            className="text-sm sm:text-base font-black uppercase tracking-[2px]"
            style={{ color: theme.primary }}
          >
            SKILLS SUMMARY
          </h2>

          <div className="space-y-2.5">
            {displaySkillsSummary.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between gap-4">
                <span className="font-bold text-slate-800 text-[12px] min-w-[140px] truncate">
                  {item.name}
                </span>
                <div className="flex items-center gap-2.5 flex-1 max-w-[200px]">
                  <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: theme.primary,
                        width: `${item.level}%`,
                      }}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 min-w-[32px] text-right">
                    {item.level}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. EXPERTISE (2-COLUMN BULLETED GRID) */}
        <section className="space-y-3 pt-1">
          <h2
            className="text-sm sm:text-base font-black uppercase tracking-[2px]"
            style={{ color: theme.primary }}
          >
            EXPERTISE
          </h2>

          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[12px] text-slate-800">
            {displayExpertise.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: theme.primary }}
                />
                <span className="font-semibold truncate">{item}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
