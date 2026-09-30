import React from 'react';
export const CourseSkeletonCard = () => {
    return (<div className="bg-white border border-slate-200 p-4 animate-pulse space-y-4">
      <div className="h-40 bg-slate-200 w-full"/>
      <div className="space-y-2">
        <div className="h-5 bg-slate-200 rounded-sm w-3/4"/>
        <div className="h-4 bg-slate-200 rounded-sm w-1/2"/>
      </div>
      <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
        <div className="h-8 bg-slate-100 rounded-sm"/>
        <div className="h-8 bg-slate-100 rounded-sm"/>
      </div>
    </div>);
};
export const TableSkeleton = () => {
    return (<div className="bg-white border border-slate-200 p-4 animate-pulse space-y-3">
      <div className="h-8 bg-slate-100 w-full"/>
      <div className="h-12 bg-slate-50 w-full"/>
      <div className="h-12 bg-slate-50 w-full"/>
      <div className="h-12 bg-slate-50 w-full"/>
    </div>);
};
