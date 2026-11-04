import React from "react";
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  FolderGit2,
} from "lucide-react";
import { EditableHeading } from "../EditableHeading";
import { ResumeFooter } from "../ResumeFooter";

export const DualArchCreativeTemplate = ({
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
    skillsSummary = [],
    expertiseList = [],
    skills = {},
    projects = [],
    certifications = [],
    sectionHeadings = {},
  } = data;

  // Resolved skills summary with defaults
  const displaySkillsSummary =
    skillsSummary && skillsSummary.length > 0
      ? skillsSummary
      : [
          { name: "Performance Ads", level: 90 },
          { name: "SEO & Growth Strategy", level: 85 },
          { name: "Campaign Analytics & GA4", level: 80 },
          { name: "Conversion Optimization", level: 85 },
        ];

  // Resolved expertise bullets (unlimited, no arbitrary cap)
  const displayExpertise =
    expertiseList && expertiseList.length > 0
      ? expertiseList
      : [
          ...(skills.paidAds || ["Google Ads", "Meta Ads"]),
          ...(skills.seoContent || ["Technical SEO", "Keyword Research"]),
        ];

  const gridColsClass =
    data.expertiseGridCols === 3 ? "grid-cols-3" : "grid-cols-2";

  // SUB-RENDERER: Top Arch (Page 1: Photo, Name, Job Title)
  const renderTopArch = (isContinuation = false) => (
    <div className="w-full flex justify-center pt-0">
      <div
        className="w-[82%] sm:w-[84%] rounded-b-[85px] sm:rounded-b-[105px] pt-7 pb-8 px-4 text-center text-white shadow-xs"
        style={{ backgroundColor: theme.primary }}
      >
        <h1 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white leading-tight">
          {personalInfo.fullName}
        </h1>
        <div className="text-[10px] sm:text-[10.5px] font-extrabold uppercase tracking-[2px] text-white/85 mt-1">
          {personalInfo.jobTitle}
        </div>

        {/* CIRCULAR PROFILE PHOTO */}
        <div className="mt-4 flex justify-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-md bg-slate-100 shrink-0">
            {personalInfo.photo ? (
              <img
                src={personalInfo.photo}
                alt={personalInfo.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center font-black text-2xl text-white"
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
    </div>
  );

  // SUB-RENDERER: Top Arch for Page 2 (Skills Summary inside sleek Arch)
  const renderTopArchPage2 = () => (
    <div className="w-full flex justify-center pt-0">
      <div
        className="w-[82%] sm:w-[84%] rounded-b-[85px] sm:rounded-b-[105px] pt-6 pb-7 px-4 text-center text-white shadow-xs space-y-2.5"
        style={{ backgroundColor: theme.primary }}
      >
        <div className="text-xs font-black uppercase tracking-[2px] text-white">
          SKILLS SUMMARY
        </div>
        <div className="space-y-2 text-left pt-1">
          {displaySkillsSummary.map((item, idx) => (
            <div key={idx} className="space-y-0.5">
              <div className="flex justify-between text-[10px] font-bold text-white/90">
                <span className="truncate">{item.name}</span>
                <span>{item.level}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/25 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full"
                  style={{ width: `${item.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // SUB-RENDERER: Contact Info (inside gray column, right below top arch)
  const renderContactInfo = () => (
    <div className="w-[82%] sm:w-[84%] mx-auto py-4 space-y-2.5 text-slate-800 dark:text-slate-100 text-[11px] font-semibold">
      {personalInfo.phone && (
        <div className="flex items-center gap-3">
          <div
            className="w-6 h-6 rounded flex items-center justify-center text-white shrink-0 shadow-2xs"
            style={{ backgroundColor: theme.primary }}
          >
            <Phone size={11} />
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
            <Mail size={11} />
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
            <Globe size={11} />
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
            <MapPin size={11} />
          </div>
          <span>{personalInfo.location}</span>
        </div>
      )}
    </div>
  );

  // SUB-RENDERER: Bottom Arch (Education & Certifications)
  const renderBottomArchEducation = () => (
    <div className="w-full flex justify-center pb-0">
      <div
        className="w-[82%] sm:w-[84%] rounded-t-[85px] sm:rounded-t-[105px] pt-7 pb-6 px-5 text-white shadow-xs"
        style={{ backgroundColor: theme.primary }}
      >
        <EditableHeading
          value={sectionHeadings.education}
          fallback="EDUCATION"
          onChange={(val) => onUpdateHeading?.("education", val)}
          className="text-xs sm:text-sm font-black uppercase tracking-[2px] text-center text-white mb-3"
          tag="h2"
        />

        <div className="space-y-3 text-center sm:text-left">
          {education && education.length > 0 ? (
            education.map((edu) => (
              <div key={edu.id} className="space-y-0.5">
                <div className="font-extrabold text-white text-[11.5px] leading-tight">
                  {edu.degree}
                </div>
                <div className="text-white/85 text-[10.5px] font-medium">
                  {edu.institution}
                </div>
                <div className="text-white/60 text-[10px]">{edu.year}</div>
              </div>
            ))
          ) : (
            <div className="text-white/70 text-xs">
              Education history prefilled
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // SUB-RENDERER: About Me
  const renderAboutMe = () => {
    if (!summary) return null;
    return (
      <section className="space-y-1.5">
        <EditableHeading
          value={sectionHeadings.summary}
          fallback="ABOUT ME"
          onChange={(val) => onUpdateHeading?.("summary", val)}
          className="text-sm font-black uppercase tracking-[2px]"
          style={{ color: theme.primary }}
          tag="h2"
        />
        <p className="text-[12px] text-slate-700 leading-relaxed text-justify">
          {summary}
        </p>
      </section>
    );
  };

  // SUB-RENDERER: Key Projects & Case Studies (ABOVE WORK EXPERIENCE)
  const renderProjects = () => {
    if (!projects || projects.length === 0) return null;
    return (
      <section className="space-y-2.5 pt-1">
        <div className="flex items-center gap-2">
          <FolderGit2 size={16} style={{ color: theme.primary }} />
          <EditableHeading
            value={sectionHeadings.projects}
            fallback="KEY PROJECTS & CASE STUDIES"
            onChange={(val) => onUpdateHeading?.("projects", val)}
            className="text-sm font-black uppercase tracking-[2px]"
            style={{ color: theme.primary }}
            tag="h2"
          />
        </div>
        <div className="space-y-2.5">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="p-3.5 rounded-xl border space-y-1.5 transition-all"
              style={{
                borderColor: theme.border,
                backgroundColor: theme.lightBg,
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <EditableHeading
                  value={proj.title}
                  fallback="Project Title"
                  onChange={(val) => onUpdateProject?.(proj.id, "title", val)}
                  className="font-bold text-slate-900 text-[12.5px]"
                  tag="span"
                />
                {proj.metricHighlight && (
                  <EditableHeading
                    value={proj.metricHighlight}
                    fallback=""
                    onChange={(val) =>
                      onUpdateProject?.(proj.id, "metricHighlight", val)
                    }
                    className="text-[10px] font-bold px-2 py-0.5 rounded text-white self-start sm:self-auto"
                    style={{ backgroundColor: theme.primary }}
                    tag="span"
                  />
                )}
              </div>
              {proj.clientOrType && (
                <div
                  className="text-[10.5px] font-bold"
                  style={{ color: theme.secondary }}
                >
                  <EditableHeading
                    value={proj.clientOrType}
                    fallback=""
                    onChange={(val) =>
                      onUpdateProject?.(proj.id, "clientOrType", val)
                    }
                    className="inline-block"
                    tag="span"
                  />
                </div>
              )}
              <p className="text-[11.5px] text-slate-700 leading-snug">
                {proj.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  };

  // SUB-RENDERER: Work Experience
  const renderWorkExperience = () => {
    if (!experiences || experiences.length === 0) return null;
    return (
      <section className="space-y-2.5 pt-1">
        <EditableHeading
          value={sectionHeadings.experience}
          fallback="WORK EXPERIENCE"
          onChange={(val) => onUpdateHeading?.("experience", val)}
          className="text-sm font-black uppercase tracking-[2px]"
          style={{ color: theme.primary }}
          tag="h2"
        />

        <div className="space-y-3.5">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="pl-3.5 border-l-2 space-y-1"
              style={{ borderColor: theme.primary }}
            >
              <div className="font-extrabold text-slate-900 text-[12.5px] leading-tight">
                {exp.role}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                {exp.company} • {exp.location} | {exp.startDate} – {exp.endDate}
              </div>
              {exp.bullets && exp.bullets.length > 0 ? (
                <ul className="space-y-1 text-[11px] text-slate-700 pt-0.5">
                  {exp.bullets.map((b, idx) => (
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
    );
  };

  // SUB-RENDERER: Skills Summary (Progress bars)
  const renderSkillsSummary = () => (
    <section className="space-y-2.5 pt-1">
      <EditableHeading
        value={sectionHeadings.skills}
        fallback="SKILLS SUMMARY"
        onChange={(val) => onUpdateHeading?.("skills", val)}
        className="text-sm font-black uppercase tracking-[2px]"
        style={{ color: theme.primary }}
        tag="h2"
      />

      <div className="space-y-2">
        {displaySkillsSummary.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between gap-4">
            <span className="font-bold text-slate-800 text-[11.5px] min-w-[130px] truncate">
              {item.name}
            </span>
            <div className="flex items-center gap-2 flex-1 max-w-[180px]">
              <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: theme.primary,
                    width: `${item.level}%`,
                  }}
                />
              </div>
              <span className="text-[10.5px] font-bold text-slate-600 min-w-[30px] text-right">
                {item.level}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  // SUB-RENDERER: Expertise
  const renderExpertise = () => (
    <section className="space-y-2.5 pt-1">
      <EditableHeading
        value={sectionHeadings.expertise}
        fallback="EXPERTISE"
        onChange={(val) => onUpdateHeading?.("expertise", val)}
        className="text-sm font-black uppercase tracking-[2px]"
        style={{ color: theme.primary }}
        tag="h2"
      />

      {(data.showExpertiseColHeaders ||
        sectionHeadings.expertiseCol1 ||
        sectionHeadings.expertiseCol2) && (
        <div
          className={`grid ${gridColsClass} gap-x-6 pb-1 border-b border-slate-200 text-[10px] font-black uppercase text-slate-500`}
        >
          <EditableHeading
            value={sectionHeadings.expertiseCol1}
            fallback="Core Specialization"
            onChange={(val) => onUpdateHeading?.("expertiseCol1", val)}
            className="block"
            tag="span"
          />
          <EditableHeading
            value={sectionHeadings.expertiseCol2}
            fallback="Tools & Execution"
            onChange={(val) => onUpdateHeading?.("expertiseCol2", val)}
            className="block"
            tag="span"
          />
          {data.expertiseGridCols === 3 && (
            <EditableHeading
              value={sectionHeadings.expertiseCol3}
              fallback="Additional Expertise"
              onChange={(val) => onUpdateHeading?.("expertiseCol3", val)}
              className="block"
              tag="span"
            />
          )}
        </div>
      )}

      <div
        className={`grid ${gridColsClass} gap-x-6 gap-y-1.5 text-[11.5px] text-slate-800`}
      >
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
  );

  return (
    <div className="bg-white text-slate-800 font-sans leading-relaxed text-[12.5px] w-full min-h-[1080px] print:min-h-[296.5mm] h-auto flex flex-col justify-between print:p-0 print:m-0">
      {/* 2-COLUMN LAYOUT */}
      <div className="w-full flex flex-col md:flex-row flex-1">
        {/* LEFT COLUMN: VISIBLE CONTINUOUS GRAY BACKDROP (38%) */}
        <aside className="w-full md:w-[38%] bg-[#cfd4dc] dark:bg-slate-800/90 flex flex-col justify-between shrink-0 print:w-[38%] py-0 relative">
          {/* TOP SECTION: Top Arch + Contact Details (connected naturally) */}
          <div className="flex flex-col">
            {page === 1 ? (
              <>
                {renderTopArch(false)}
                {renderContactInfo()}
              </>
            ) : (
              <div className="p-6">
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-[#003873] border-b pb-2 mb-3">
                  Academic Credentials
                </h3>
              </div>
            )}
          </div>

          {/* BOTTOM SECTION: Bottom Arch (Education) flush to bottom */}
          <div className="mt-auto">
            {page === 1 && totalPages === 1 ? (
              renderBottomArchEducation()
            ) : page === 2 ? (
              renderBottomArchEducation()
            ) : null}
          </div>
        </aside>

        {/* RIGHT COLUMN: MAIN CONTENT (62%) */}
        <div className="w-full md:w-[62%] p-6 sm:p-8 space-y-5 flex-1 bg-white text-slate-800 print:w-[62%]">
          {page === 1 ? (
            <>
              {/* 1. ABOUT ME */}
              {renderAboutMe()}

              {/* 2. WORK EXPERIENCE */}
              {renderWorkExperience()}

              {/* 3. SKILLS & EXPERTISE */}
              {renderSkillsSummary()}
              {renderExpertise()}
            </>
          ) : (
            <>
              <header className="pb-3 border-b mb-4">
                <h2 className="text-xl font-black uppercase text-[#003873]">
                  {personalInfo?.fullName}
                </h2>
                <div className="text-xs font-bold text-slate-600 mt-0.5">
                  {personalInfo?.jobTitle} • Projects & Highlights (Page 2)
                </div>
              </header>

              {/* KEY PROJECTS & CASE STUDIES */}
              {renderProjects()}
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

export default DualArchCreativeTemplate;
