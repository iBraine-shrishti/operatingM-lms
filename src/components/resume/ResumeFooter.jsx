import React from "react";
import logoHorizontalImg from "../../assets/logo-horizontal.png";

/**
 * Word-like official document footer for resume sheets
 * Layout:
 * [Student Name • Job Title – Company / Location]  |  [Page X of Y]  |  [Operating Media Logo]
 * Takes minimal document space (Word document footer style)
 */
export const ResumeFooter = ({
  pageNumber = 1,
  totalPages = 1,
  personalInfo = {},
  experience = [],
}) => {
  const name = personalInfo?.fullName || "Operating Media Student";
  const title = personalInfo?.jobTitle || "Professional";

  // Derive current company or location
  const firstExp =
    Array.isArray(experience) && experience.length > 0 ? experience[0] : null;
  const company = firstExp?.company || "";
  const location = personalInfo?.location || firstExp?.location || "Mumbai";

  let companyLoc = "";
  if (company && location) {
    companyLoc = `${company}, ${location}`;
  } else if (company) {
    companyLoc = company;
  } else if (location) {
    companyLoc = location;
  }

  return (
    <footer className="resume-footer mt-auto pt-2.5 pb-1 px-4 sm:px-6 border-t border-slate-200/90 text-slate-500 font-sans flex items-center justify-between text-[10px] w-full print:pt-2 print:pb-0 print:px-6 shrink-0 select-none">
      {/* LEFT: {name} • {title} – {company, location} */}
      <div className="flex items-center gap-1.5 truncate max-w-[58%] text-slate-700">
        <span className="font-bold text-slate-900 truncate shrink-0">
          {name}
        </span>
        <span className="text-slate-400 shrink-0">•</span>
        <span className="truncate shrink-0">{title}</span>
        {companyLoc && (
          <>
            <span className="text-slate-400 shrink-0">–</span>
            <span className="text-slate-500 truncate">{companyLoc}</span>
          </>
        )}
      </div>

      {/* MIDDLE: Page X of Y */}
      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider shrink-0 px-2 text-center">
        Page {pageNumber} of {totalPages}
      </div>

      {/* RIGHT: Operating Media Logo */}
      <div className="flex items-center justify-end shrink-0">
        <img
          src={logoHorizontalImg}
          alt="Operating Media"
          className="h-3.5 sm:h-4 w-auto max-w-[120px] object-contain opacity-85"
        />
      </div>
    </footer>
  );
};

export default ResumeFooter;
