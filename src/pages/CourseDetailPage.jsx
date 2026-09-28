import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lmsService } from '../services/lmsService';
import { Star, Users, CheckCircle2, Play, Clock, ArrowLeft, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
export const CourseDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAdmin, isStudent, currentUser } = useAuth();
    const { showToast } = useToast();
    const courses = lmsService.getCourses();
    // Default to course-3 (Advanced Topics) if not found or if id is course-3 or course-6
    const course = courses.find(c => c.id === id) ||
        courses.find(c => c.title.toLowerCase().includes('advanced')) ||
        courses[0];
    const [units, setUnits] = useState(() => lmsService.getUnitsByCourse(course.id));
    const students = lmsService.getStudents();
    const reviews = lmsService.getReviews();
    const [activeTab, setActiveTab] = useState('curriculum');
    // Announcements state
    const [announcements, setAnnouncements] = useState([
        {
            id: 'ann-1',
            title: 'Upcoming Live Q&A Session on Affiliate Networks & CPA Models',
            date: 'Yesterday at 4:30 PM',
            author: 'Operating Media Faculty',
            tag: 'Live Masterclass',
            content: 'Join our senior affiliate strategist this Saturday at 11:00 AM IST for a live campaign walkthrough on ShareASale and Amazon Associates API setup. Meeting link has been shared via email.'
        },
        {
            id: 'ann-2',
            title: 'New Case Study Added to Influencer Marketing & Contract Templates',
            date: '3 days ago',
            author: 'Curriculum Team',
            tag: 'Curriculum Update',
            content: 'We have uploaded 3 new barter contract agreements and influencer rate calculation sheets under Influencer Marketing Assignment-2.'
        }
    ]);
    const [newAnnTitle, setNewAnnTitle] = useState('');
    const [newAnnContent, setNewAnnContent] = useState('');
    const [showAnnForm, setShowAnnForm] = useState(false);
    // QnA state
    const [qnaList, setQnaList] = useState([
        {
            id: 'q-1',
            author: 'Aarav Patel',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            date: '2 days ago',
            title: 'How do we track affiliate conversions without server-side cookies?',
            question: 'With third-party cookie restrictions, how can we reliably attribute conversions in our custom Affiliate Marketing bridge pages?',
            upvotes: 6,
            replies: [
                {
                    author: 'Operating Media Faculty',
                    role: 'Instructor',
                    date: '1 day ago',
                    text: 'Great question Aarav! You should use server-to-server (S2S) postback URLs or First-Party Click IDs (like s1/subID parameters) passed directly into your bridge page query strings.'
                }
            ]
        },
        {
            id: 'q-2',
            author: 'Priya Sharma',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
            date: '4 days ago',
            title: 'Content Marketing Assignment-1 Submission format',
            question: 'Should the 90-day pillar content plan be submitted as a Google Sheets link or an exported PDF with calendar views?',
            upvotes: 4,
            replies: [
                {
                    author: 'Admin Team',
                    role: 'Admin',
                    date: '3 days ago',
                    text: 'Both Google Sheets with public view access or an exported PDF are acceptable. Please make sure the pillar topic clusters are clearly color-coded.'
                }
            ]
        }
    ]);
    const [newQTitle, setNewQTitle] = useState('');
    const [newQBody, setNewQBody] = useState('');
    const [showQnaModal, setShowQnaModal] = useState(false);
    const [replyInput, setReplyInput] = useState({});
    // Notes state
    const [notesList, setNotesList] = useState([
        {
            id: 'n-1',
            date: '24 Sep 2026',
            lessonTag: 'Affiliate Marketing',
            text: 'Remember to always check CPA payout tiers and cookies retention window (30 days vs 90 days) before running paid traffic to affiliate bridge funnels.'
        },
        {
            id: 'n-2',
            date: '22 Sep 2026',
            lessonTag: 'Content Marketing',
            text: 'Topic Cluster model: 1 Pillar page (3,000+ words) linking internally to 6-8 cluster sub-articles targeting long-tail queries.'
        }
    ]);
    const [newNoteText, setNewNoteText] = useState('');
    const [newNoteTag, setNewNoteTag] = useState('Affiliate Marketing');
    // Group units by moduleName for the Curriculum tab matching advanded topic deatils.png
    const sections = useMemo(() => {
        const map = new Map();
        units.forEach(u => {
            const list = map.get(u.moduleName) || [];
            list.push(u);
            map.set(u.moduleName, list);
        });
        return Array.from(map.entries()).map(([name, items]) => ({ name, items }));
    }, [units]);
    // Toggle completion of a unit
    const handleToggleCompletion = (unitId, e) => {
        e.stopPropagation();
        setUnits(prev => prev.map(u => {
            if (u.id === unitId) {
                const updated = !u.isCompleted;
                showToast(updated ? `Marked "${u.title}" as completed!` : `Marked "${u.title}" as incomplete`, 'info');
                return { ...u, isCompleted: updated };
            }
            return u;
        }));
    };
    const handlePostAnnouncement = (e) => {
        e.preventDefault();
        if (!newAnnTitle.trim() || !newAnnContent.trim())
            return;
        const newAnn = {
            id: `ann-${Date.now()}`,
            title: newAnnTitle.trim(),
            date: 'Just now',
            author: currentUser.name || 'Operating Media Faculty',
            tag: 'Announcement',
            content: newAnnContent.trim()
        };
        setAnnouncements([newAnn, ...announcements]);
        setNewAnnTitle('');
        setNewAnnContent('');
        setShowAnnForm(false);
        showToast('Announcement posted successfully!', 'success');
    };
    const handleAskQuestion = (e) => {
        e.preventDefault();
        if (!newQTitle.trim() || !newQBody.trim())
            return;
        const newQ = {
            id: `q-${Date.now()}`,
            author: currentUser.name || 'Student',
            avatar: currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            date: 'Just now',
            title: newQTitle.trim(),
            question: newQBody.trim(),
            upvotes: 1,
            replies: []
        };
        setQnaList([newQ, ...qnaList]);
        setNewQTitle('');
        setNewQBody('');
        setShowQnaModal(false);
        showToast('Your question has been posted to the course Q&A board!', 'success');
    };
    const handleAddReply = (qId) => {
        const text = replyInput[qId]?.trim();
        if (!text)
            return;
        setQnaList(prev => prev.map(q => {
            if (q.id === qId) {
                return {
                    ...q,
                    replies: [
                        ...q.replies,
                        {
                            author: currentUser.name || 'Instructor',
                            role: isAdmin ? 'Instructor' : 'Peer',
                            date: 'Just now',
                            text
                        }
                    ]
                };
            }
            return q;
        }));
        setReplyInput(prev => ({ ...prev, [qId]: '' }));
        showToast('Reply submitted!', 'success');
    };
    const handleSaveNote = (e) => {
        e.preventDefault();
        if (!newNoteText.trim())
            return;
        const newNote = {
            id: `n-${Date.now()}`,
            date: 'Today',
            lessonTag: newNoteTag,
            text: newNoteText.trim()
        };
        setNotesList([newNote, ...notesList]);
        setNewNoteText('');
        showToast('Note saved to your course notebook!', 'success');
    };
    return (<div className="space-y-6">
      {/* Back button */}
      <button onClick={() => navigate('/manage-courses')} className="flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">
        <ArrowLeft size={16}/>
        <span>Back to Courses</span>
      </button>

      {/* Hero Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-xs flex flex-col md:flex-row gap-6 items-start">
        <img src={course.thumbnail} alt={course.title} className="w-full md:w-80 h-52 rounded-2xl object-cover shrink-0 shadow-xs"/>

        <div className="flex-1 space-y-3.5">
          <div className="flex items-center space-x-2">
            <span className="bg-slate-100 text-slate-800 border border-slate-200 text-xs font-semibold px-2.5 py-0.5 rounded-md uppercase">
              {course.status}
            </span>
            <span className="text-xs font-semibold text-slate-500">{course.category}</span>
          </div>

          <h1 className="text-2xl md:text-[28px] font-semibold text-slate-900 leading-tight">
            {course.title}
          </h1>

          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
            {course.description}
          </p>

          <div className="flex flex-wrap items-center gap-5 pt-2 border-t border-slate-100 text-xs font-medium text-slate-600">
            <div className="flex items-center space-x-1.5">
              <Users size={16} className="text-slate-400"/>
              <span>{course.studentsCount} Enrolled</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 size={16} className="text-slate-700"/>
              <span>{course.completedCount} Certified</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Star size={16} className="text-amber-500 fill-amber-400"/>
              <span>{course.rating.toFixed(1)} ({course.reviewsCount} Reviews)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Clock size={16} className="text-slate-400"/>
              <span>{course.duration}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button onClick={() => navigate(`/lesson-player?courseId=${course.id}`)} className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-6 py-2.5 rounded-xl shadow-2xs transition-colors flex items-center space-x-2">
              <Play size={15} className="fill-white"/>
              <span>Continue Learning</span>
            </button>
            {isAdmin && (<button onClick={() => navigate(`/create-course?edit=${course.id}`)} className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-medium px-5 py-2.5 rounded-xl transition-colors border border-slate-200">
                Edit Course Settings
              </button>)}
          </div>
        </div>
      </div>

      {/* Tabs Header - EXACTLY matching advanded topic deatils.png:
            Overview | Curriculum | Announcements & News | QnA | Notes */}
      <div className="border-b border-slate-200 flex space-x-6 overflow-x-auto custom-scrollbar">
        {[
            { key: 'overview', label: 'Overview' },
            { key: 'curriculum', label: 'Curriculum' },
            { key: 'announcements', label: 'Announcements & News' },
            { key: 'qna', label: 'QnA' },
            { key: 'notes', label: 'Notes' },
            ...(isAdmin ? [{ key: 'students', label: `Enrolled Students (${students.length})` }] : [])
        ].map(t => (<button key={t.key} onClick={() => setActiveTab(t.key)} className={`pb-3 text-sm font-medium transition-all border-b-2 whitespace-nowrap ${activeTab === t.key
                ? 'border-slate-900 text-slate-900 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
            {t.label}
          </button>))}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TAB 1: CURRICULUM (matches advanded topic deatils.png layout)   */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'curriculum' && (<div className="space-y-6">
          {sections.map(section => (<div key={section.name} className="space-y-2">
              <h3 className="font-semibold text-slate-900 text-sm md:text-base">
                {section.name}
              </h3>

              <div className="bg-white rounded-2xl border border-slate-200/90 divide-y divide-slate-100 shadow-2xs overflow-hidden">
                {section.items.map(item => (<div key={item.id} onClick={() => navigate(`/lesson-player?courseId=${course.id}&unitId=${item.id}`)} className="px-5 py-3.5 flex items-center justify-between hover:bg-slate-50/80 transition-colors cursor-pointer group">
                    <div className="flex items-center space-x-3 truncate">
                      <span className="text-xs md:text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                        {item.title}
                      </span>
                      {item.type === 'assignment' && (<span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md shrink-0">
                          Assignment
                        </span>)}
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      {/* Checkmark or radio circle matching advanded topic deatils.png */}
                      <button type="button" onClick={(e) => handleToggleCompletion(item.id, e)} className="p-1 rounded-full hover:bg-slate-100 transition-colors" title={item.isCompleted ? 'Mark as incomplete' : 'Mark as complete'}>
                        {item.isCompleted ? (<CheckCircle2 size={18} className="text-emerald-500 fill-emerald-50"/>) : (<div className="w-4 h-4 rounded-full border-2 border-slate-300 group-hover:border-slate-400"/>)}
                      </button>
                    </div>
                  </div>))}
              </div>
            </div>))}

          {/* Admin curriculum helper */}
          {isAdmin && (<div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">Instructor Controls</p>
                <p className="text-[11px] text-slate-500">Need to append new lessons or assignments to this curriculum?</p>
              </div>
              <button onClick={() => navigate(`/create-course?edit=${course.id}`)} className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors shadow-2xs">
                + Add / Edit Sections in Builder
              </button>
            </div>)}
        </div>)}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: OVERVIEW                                               */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'overview' && (<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-6">
            <div>
              <h3 className="font-semibold text-slate-900 text-base mb-2">About this Course</h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                {course.description} Designed by seasoned industry practitioners at Operating Media, this specialization delivers complete hands-on proficiency through real brand campaigns, live client scenarios, and rigorous certification prep.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 text-base mb-3">Key Skills & Core Competencies</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5"/>
                  <span>Comprehensive framework design and omnichannel campaign deployment.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5"/>
                  <span>Practical assignments with instructor feedback and portfolio validation.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5"/>
                  <span>Real-time analytics, conversion optimization, and ROI tracking models.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5"/>
                  <span>Freelance proposal kits, client rate cards, and agreement templates.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h3 className="font-semibold text-slate-900 text-base">Course Credentials</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Instructor</span>
                <span className="font-semibold text-slate-900">{course.author}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Duration</span>
                <span className="font-semibold text-slate-900">{course.duration}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Curriculum Units</span>
                <span className="font-semibold text-slate-900">{units.length} Items</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Certificate</span>
                <span className="font-semibold text-emerald-600">Official Operating Media Credential</span>
              </div>
            </div>
          </div>
        </div>)}

      {/* ------------------------------------------------------------- */}
      {/* TAB 3: ANNOUNCEMENTS & NEWS                                   */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'announcements' && (<div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900 text-base">Course Announcements & News</h3>
              <p className="text-xs text-slate-400">Important batch updates, live webinars, and schedule changes.</p>
            </div>
            {isAdmin && (<button onClick={() => setShowAnnForm(prev => !prev)} className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-medium px-4 py-2 rounded-xl transition-colors shadow-2xs">
                {showAnnForm ? 'Cancel' : '+ Post Announcement'}
              </button>)}
          </div>

          {showAnnForm && (<form onSubmit={handlePostAnnouncement} className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-xs font-semibold text-slate-800">New Announcement</h4>
              <input type="text" required value={newAnnTitle} onChange={(e) => setNewAnnTitle(e.target.value)} placeholder="Announcement Title" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-hidden"/>
              <textarea rows={3} required value={newAnnContent} onChange={(e) => setNewAnnContent(e.target.value)} placeholder="Announcement body text..." className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-hidden"/>
              <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-4 py-2 rounded-xl transition-colors">
                Publish Announcement
              </button>
            </form>)}

          <div className="space-y-3">
            {announcements.map(ann => (<div key={ann.id} className="p-5 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-medium bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-md uppercase">
                    {ann.tag}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">{ann.date}</span>
                </div>
                <h4 className="font-semibold text-slate-900 text-sm">{ann.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{ann.content}</p>
                <div className="text-[11px] text-slate-400 font-medium pt-1">
                  Posted by <span className="text-slate-700">{ann.author}</span>
                </div>
              </div>))}
          </div>
        </div>)}

      {/* ------------------------------------------------------------- */}
      {/* TAB 4: QNA                                                    */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'qna' && (<div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-semibold text-slate-900 text-base">Questions & Answers Forum</h3>
              <p className="text-xs text-slate-400">Ask doubts, discuss campaign setups, and learn together.</p>
            </div>
            <button onClick={() => setShowQnaModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-4 py-2 rounded-xl transition-colors shadow-2xs self-start sm:self-auto">
              Ask a Question
            </button>
          </div>

          <div className="space-y-4">
            {qnaList.map(q => (<div key={q.id} className="p-5 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
                <div className="flex items-center space-x-3">
                  <img src={q.avatar} alt={q.author} className="w-8 h-8 rounded-full object-cover shrink-0"/>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-900">{q.author}</h4>
                    <span className="text-[10px] text-slate-400">{q.date}</span>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-slate-900 text-sm mb-1">{q.title}</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">{q.question}</p>
                </div>

                {/* Replies */}
                {q.replies.length > 0 && (<div className="bg-slate-50 rounded-2xl p-4 space-y-2 border border-slate-100">
                    {q.replies.map((r, rIdx) => (<div key={rIdx} className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-semibold text-slate-900">{r.author}</span>
                          <span className="text-[10px] font-medium bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded">
                            {r.role}
                          </span>
                          <span className="text-[10px] text-slate-400">{r.date}</span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed">{r.text}</p>
                      </div>))}
                  </div>)}

                {/* Reply box */}
                <div className="flex items-center space-x-2 pt-2 border-t border-slate-100">
                  <input type="text" value={replyInput[q.id] || ''} onChange={(e) => setReplyInput({ ...replyInput, [q.id]: e.target.value })} placeholder="Write a helpful answer..." className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden" onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddReply(q.id);
                    }
                }}/>
                  <button onClick={() => handleAddReply(q.id)} className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-3 py-1.5 rounded-xl transition-colors">
                    Reply
                  </button>
                </div>
              </div>))}
          </div>

          {/* Ask Question Modal */}
          {showQnaModal && (<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
              <div className="bg-white rounded-3xl p-6 md:p-7 max-w-md w-full shadow-2xl space-y-4 border border-slate-200 animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-semibold text-slate-900 text-base">Ask a Question</h3>
                  <button onClick={() => setShowQnaModal(false)} className="text-slate-400 hover:text-slate-600 font-semibold">✕</button>
                </div>
                <form onSubmit={handleAskQuestion} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Title</label>
                    <input type="text" required value={newQTitle} onChange={(e) => setNewQTitle(e.target.value)} placeholder="e.g. How to set up CPA postback URL?" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-hidden"/>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Details</label>
                    <textarea rows={4} required value={newQBody} onChange={(e) => setNewQBody(e.target.value)} placeholder="Explain your scenario in detail..." className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-hidden"/>
                  </div>
                  <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                    <button type="button" onClick={() => setShowQnaModal(false)} className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 rounded-xl">
                      Cancel
                    </button>
                    <button type="submit" className="px-5 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors">
                      Post Question
                    </button>
                  </div>
                </form>
              </div>
            </div>)}
        </div>)}

      {/* ------------------------------------------------------------- */}
      {/* TAB 5: NOTES                                                  */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'notes' && (<div className="space-y-6">
          <div>
            <h3 className="font-semibold text-slate-900 text-base">My Course Notebook</h3>
            <p className="text-xs text-slate-400">Capture personal notes, timestamps, and strategies while learning.</p>
          </div>

          <form onSubmit={handleSaveNote} className="p-5 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <label className="text-xs font-semibold text-slate-700">Add a Quick Note</label>
              <select value={newNoteTag} onChange={(e) => setNewNoteTag(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1 text-xs font-medium text-slate-700 focus:outline-hidden">
                {sections.map(s => (<option key={s.name} value={s.name}>{s.name}</option>))}
              </select>
            </div>
            <textarea rows={3} required value={newNoteText} onChange={(e) => setNewNoteText(e.target.value)} placeholder="Type your notes here..." className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-amber-500"/>
            <div className="flex justify-end">
              <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-medium px-5 py-2 rounded-xl transition-colors shadow-2xs">
                Save Note
              </button>
            </div>
          </form>

          <div className="space-y-3">
            {notesList.map(note => (<div key={note.id} className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-medium bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md">
                      {note.lessonTag}
                    </span>
                    <span className="text-[10px] text-slate-400">{note.date}</span>
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed font-normal">{note.text}</p>
                </div>
                <button onClick={() => {
                    setNotesList(prev => prev.filter(n => n.id !== note.id));
                    showToast('Note deleted', 'info');
                }} className="p-1 text-slate-300 hover:text-red-500 rounded transition-colors" title="Delete Note">
                  <Trash2 size={14}/>
                </button>
              </div>))}
          </div>
        </div>)}

      {/* ------------------------------------------------------------- */}
      {/* TAB 6 (ADMIN ONLY): ENROLLED STUDENTS                         */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'students' && isAdmin && (<div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h3 className="font-semibold text-slate-900 text-base">Enrolled Learners & Performance</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {students.map(s => (<div key={s.id} className="p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <img src={s.avatar} alt={s.name} className="w-10 h-10 rounded-full object-cover"/>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-900">{s.name}</h4>
                    <p className="text-[10px] text-slate-400">{s.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold tabular-nums text-blue-600 block">{s.overallProgress}%</span>
                  <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {s.status}
                  </span>
                </div>
              </div>))}
          </div>
        </div>)}
    </div>);
};
export default CourseDetailPage;
