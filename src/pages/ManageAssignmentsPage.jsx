import React, { useState, useMemo } from 'react';
import { lmsService } from '../services/lmsService';
import { Plus, Search, Calendar, Edit, Trash2, ChevronDown } from 'lucide-react';
import { useToast } from '../context/ToastContext';
export const ManageAssignmentsPage = () => {
    const { showToast } = useToast();
    const courses = lmsService.getCourses();
    const [assignments, setAssignments] = useState(() => lmsService.getAssignments());
    // Default to course-3 (Advanced Topics) or first course
    const defaultCourse = courses.find(c => c.title.toLowerCase().includes('advanced')) || courses[0];
    const [selectedCourseId, setSelectedCourseId] = useState(defaultCourse?.id || 'course-3');
    const [search, setSearch] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    // Modal form states
    const [modalCourseId, setModalCourseId] = useState(selectedCourseId);
    const [newTitle, setNewTitle] = useState('');
    const [newDueDate, setNewDueDate] = useState('2026-10-30');
    const [newMaxScore, setNewMaxScore] = useState(100);
    const [newInstructions, setNewInstructions] = useState('');
    const selectedCourse = courses.find(c => c.id === selectedCourseId);
    // Compute assignments count per course
    const courseAssignmentCounts = useMemo(() => {
        const map = {};
        assignments.forEach(a => {
            map[a.courseId] = (map[a.courseId] || 0) + 1;
        });
        return map;
    }, [assignments]);
    // Assignments filtered by selected course and search
    const courseAssignments = useMemo(() => {
        if (selectedCourseId === 'all')
            return assignments;
        return assignments.filter(a => a.courseId === selectedCourseId);
    }, [assignments, selectedCourseId]);
    const filteredAssignments = useMemo(() => {
        return courseAssignments.filter(a => a.title.toLowerCase().includes(search.toLowerCase()) ||
            a.instructions.toLowerCase().includes(search.toLowerCase()));
    }, [courseAssignments, search]);
    const handleOpenAddModal = (courseId) => {
        setModalCourseId(courseId || selectedCourseId);
        setShowAddModal(true);
    };
    const handleCreateAssignment = (e) => {
        e.preventDefault();
        if (!newTitle.trim()) {
            showToast('Please enter an assignment title', 'warning');
            return;
        }
        const targetCourse = courses.find(c => c.id === modalCourseId) || courses[0];
        const created = lmsService.addAssignment({
            courseId: targetCourse.id,
            courseTitle: targetCourse.title,
            title: newTitle.trim(),
            dueDate: newDueDate,
            maxScore: Number(newMaxScore) || 100,
            instructions: newInstructions.trim() || 'Submit complete practical project report in PDF.'
        });
        setAssignments(lmsService.getAssignments());
        setNewTitle('');
        setNewInstructions('');
        setShowAddModal(false);
        showToast(`Assignment "${created.title}" created for ${targetCourse.title}!`, 'success');
    };
    const handleDeleteAssignment = (id, title) => {
        if (confirm(`Delete assignment "${title}"?`)) {
            setAssignments(prev => prev.filter(a => a.id !== id));
            showToast(`Assignment "${title}" deleted`, 'info');
        }
    };
    return (<div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-[28px] font-semibold text-slate-900 tracking-tight">Manage Assignments</h1>
          <p className="text-slate-500 text-sm mt-1 font-normal">
            Categorized by course. Select a course below to review practical briefs, submissions, and student evaluations.
          </p>
        </div>
        <button onClick={() => handleOpenAddModal()} className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center space-x-2 shrink-0 self-start sm:self-auto">
          <Plus size={16}/>
          <span>New Assignment for Course</span>
        </button>
      </div>

      {/* SIMPLE COURSE SELECT DROPDOWN & SEARCH */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 sm:p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3 flex-1">
            <label htmlFor="assignment-course-select" className="text-xs font-semibold uppercase tracking-wider text-slate-500 shrink-0">
              Select Course:
            </label>
            <div className="relative flex-1 max-w-md">
              <select id="assignment-course-select" value={selectedCourseId} onChange={(e) => {
            setSelectedCourseId(e.target.value);
            setSearch('');
        }} className="w-full bg-slate-50 hover:bg-slate-100 text-slate-900 text-xs sm:text-sm font-medium pl-3 pr-9 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 cursor-pointer appearance-none transition-colors">
                <option value="all">All Courses ({assignments.length} Assignments)</option>
                {courses.map(course => {
            const count = courseAssignmentCounts[course.id] || 0;
            return (<option key={course.id} value={course.id}>
                      {course.title}  ({count} {count === 1 ? 'Assignment' : 'Assignments'})
                    </option>);
        })}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
            </div>
          </div>

          {selectedCourse && (<div className="flex items-center space-x-2 shrink-0 text-xs">
              <span className="text-slate-500 font-medium">Active:</span>
              <span className="font-semibold text-slate-800">{selectedCourse.title}</span>
              <span className="font-medium text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200">
                {courseAssignments.length} Assignments
              </span>
            </div>)}
        </div>

        {/* Search Bar */}
        <div className="flex items-center justify-between gap-4 pt-2.5 border-t border-slate-100">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={`Search assignments in ${selectedCourse?.title || 'all courses'}...`} className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-amber-500"/>
          </div>
          <span className="text-xs font-bold text-slate-500">
            {filteredAssignments.length} {filteredAssignments.length === 1 ? 'Assignment' : 'Assignments'} Found
          </span>
        </div>
      </div>

      {/* Assignments List for Selected Course */}
      <div className="space-y-3.5">
        {filteredAssignments.length === 0 ? (<div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center text-slate-400 text-xs">
            No assignments found for this course. Click "+ New Assignment for Course" above to add one.
          </div>) : (filteredAssignments.map(assign => (<div key={assign.id} className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-slate-300 transition-colors">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center space-x-2.5">
                  <span className="text-xs font-semibold uppercase bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md border border-slate-200">
                    Practical Task
                  </span>
                  <span className="text-xs text-slate-500 flex items-center space-x-1 font-medium">
                    <Calendar size={13} className="text-slate-400"/>
                    <span>Due: {assign.dueDate}</span>
                  </span>
                  <span className="text-xs text-slate-700 font-semibold bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                    {assign.maxScore} Pts
                  </span>
                </div>

                <h3 className="font-semibold text-slate-900 text-sm sm:text-base leading-snug">{assign.title}</h3>
                <p className="text-xs text-slate-500 font-normal line-clamp-1">{assign.instructions}</p>
              </div>

              <div className="flex items-center space-x-4 shrink-0 w-full md:w-auto justify-between border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                <div className="text-right">
                  <span className="text-xs font-semibold text-slate-800 block tabular-nums">{assign.totalSubmissions} Submissions</span>
                  <span className="text-xs text-slate-500 font-normal bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md mt-0.5 inline-block">
                    {assign.pendingGrading} Pending Review
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button onClick={() => showToast(`Reviewing submissions for "${assign.title}"`, 'info', 'Grading Portal')} className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-3.5 py-1.5 rounded-lg transition-colors shadow-xs">
                    Grade
                  </button>
                  <button onClick={() => showToast(`Edit assignment "${assign.title}"`, 'info')} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors" title="Edit Assignment">
                    <Edit size={15}/>
                  </button>
                  <button onClick={() => handleDeleteAssignment(assign.id, assign.title)} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors" title="Delete Assignment">
                    <Trash2 size={15}/>
                  </button>
                </div>
              </div>
            </div>)))}
      </div>

      {/* NEW ASSIGNMENT MODAL (Scoped to Course) */}
      {showAddModal && (<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 md:p-7 max-w-md w-full shadow-2xl space-y-4 border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-semibold text-slate-900 text-base">New Assignment</h3>
                <p className="text-[11px] text-slate-400 font-normal">Target practical assignment to a specific course.</p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 font-medium text-sm">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAssignment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Course</label>
                <select value={modalCourseId} onChange={(e) => setModalCourseId(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-hidden">
                  {courses.map(c => (<option key={c.id} value={c.id}>{c.title}</option>))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assignment Title</label>
                <input type="text" required value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="e.g. Influencer Barter Agreement & Outreach" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-amber-500"/>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Due Date</label>
                  <input type="date" value={newDueDate} onChange={(e) => setNewDueDate(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-hidden"/>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Max Score</label>
                  <input type="number" value={newMaxScore} onChange={(e) => setNewMaxScore(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-hidden"/>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Instructions</label>
                <textarea rows={3} value={newInstructions} onChange={(e) => setNewInstructions(e.target.value)} placeholder="Provide assignment brief and submission requirements..." className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-hidden"/>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl shadow-xs transition-colors">
                  Create Assignment
                </button>
              </div>
            </form>
          </div>
        </div>)}
    </div>);
};
export default ManageAssignmentsPage;
