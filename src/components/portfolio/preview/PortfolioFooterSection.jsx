import React from "react";
import { CheckCircle2 } from "lucide-react";
import logoHorizontalDarkImg from "../../../assets/logo-horizontal-dark.png";

export const PortfolioFooterSection = ({ theme, student, navItems = [] }) => {
  return (
      <footer className="bg-slate-950 text-white py-12 border-t border-slate-800">
        <div className="w-[min(100%-clamp(1.5rem,4vw,3.5rem),1480px)] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
            {/* Left: Operating Media Logo & Tagline */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <img
                src={logoHorizontalDarkImg}
                alt="Operating Media"
                className="h-10 sm:h-12 w-auto object-contain"
              />
              <div className="sm:border-l sm:border-slate-800 sm:pl-4">
                <span className="font-extrabold text-sm text-white block">
                  Digital Marketing Training & Placement Division
                </span>
                <span className="text-xs text-slate-400 block mt-0.5">
                  Official Masterclass Graduate Certification & Verified Showcase
                </span>
              </div>
            </div>

            {/* Right: Verified Student Credentials Badge */}
            <div className="flex items-center space-x-3 bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-black shrink-0"
                style={{ backgroundColor: theme.primary }}
              >
                {student.name.charAt(0)}
              </div>
              <div className="text-left">
                <div className="font-bold text-xs text-white">{student.name}</div>
                <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 size={11} />
                  <span>Curriculum Verified • Cohort 2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Accreditation Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
            <div>
              <p className="font-medium text-slate-400">
                © {new Date().getFullYear()} Operating Media. All Rights Reserved.
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                ISO 9001:2015 Certified Curriculum • Training Centers: Andheri • Borivali
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 text-[11px] text-slate-400">
              <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800">
                {navItems.length} Practical Modules
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800">
                Live Campaign Data
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800">
                Verified Portfolio
              </span>
            </div>
          </div>
        </div>
      </footer>
  );
};
