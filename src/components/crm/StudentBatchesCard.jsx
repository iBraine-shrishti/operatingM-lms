import React from 'react';
import { Calendar, Clock, MapPin, Video, BookOpen, User, Sparkles, ChevronRight, Layers } from 'lucide-react';

export const StudentBatchesCard = ({ batch }) => {
  if (!batch) return null;

  const {
    batchName = 'Masters in Digital Marketing - Weekday Morning',
    batchCode = 'WD-M1',
    timing = '10:00 AM - 12:00 PM',
    frequency = 'Monday to Friday',
    branch = 'Andheri Center',
    classroom = 'Room 302 & Zoom Live Link',
    faculty = 'Harsh Pareek (Director & Lead Faculty)',
    currentTopic = 'Google Ads (PPC) Strategy & Campaign Architecture',
    currentDateRange = '25 Mar 2026 - 12 Apr 2026',
    upcomingSchedule = []
  } = batch;

  return (
    <div className="bg-white border border-slate-200/90 shadow-2xs p-5 sm:p-6 transition-all flex flex-col justify-between">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              Enrolled Batch & Schedule
            </span>
          </div>
          <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
            {batchCode}
          </span>
        </div>

        {/* Batch Overview Banner */}
        <div className="mt-3.5 space-y-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
            {batchName}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
            <div className="flex items-center space-x-2 text-slate-600">
              <Clock size={14} className="text-blue-600 shrink-0" />
              <span>Timing: <strong className="text-slate-900 font-semibold">{timing}</strong></span>
            </div>
            <div className="flex items-center space-x-2 text-slate-600">
              <Calendar size={14} className="text-blue-600 shrink-0" />
              <span>Days: <strong className="text-slate-900 font-semibold">{frequency}</strong></span>
            </div>
            <div className="flex items-center space-x-2 text-slate-600">
              <MapPin size={14} className="text-rose-500 shrink-0" />
              <span className="truncate">Branch: <strong className="text-slate-900 font-semibold">{branch}</strong></span>
            </div>
            <div className="flex items-center space-x-2 text-slate-600">
              <User size={14} className="text-purple-600 shrink-0" />
              <span className="truncate">Faculty: <strong className="text-slate-900 font-semibold">{faculty}</strong></span>
            </div>
          </div>
        </div>

        {/* Current Active Topic Callout */}
        <div className="mt-4 p-3.5 bg-blue-50/60 border border-blue-200/80 rounded-2xl">
          <div className="flex items-center justify-between text-[10.5px] font-extrabold uppercase tracking-wider text-blue-800">
            <span className="flex items-center gap-1.5">
              <Sparkles size={12} className="text-blue-600" />
              Current Topic in Session
            </span>
            <span className="bg-white text-blue-700 px-2 py-0.5 rounded-full border border-blue-200 text-[10px] font-bold">
              {currentDateRange}
            </span>
          </div>
          <p className="font-bold text-slate-900 text-sm mt-1 leading-snug">
            {currentTopic}
          </p>
        </div>
      </div>

      {/* Upcoming Schedule Mini-Roadmap */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
          Upcoming Curriculum Sessions
        </span>
        <div className="space-y-2">
          {upcomingSchedule.slice(0, 3).map((item, idx) => (
            <div
              key={item.id || idx}
              className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                <span className="font-semibold text-slate-800 truncate">{item.topic}</span>
              </div>
              <span className="text-[10.5px] font-bold text-slate-500 shrink-0 whitespace-nowrap">
                {item.date_range}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
