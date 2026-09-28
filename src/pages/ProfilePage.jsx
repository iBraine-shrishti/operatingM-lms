import React, { useState, useEffect } from 'react';
import { Save, Award, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
export const ProfilePage = () => {
    const { currentUser, isAdmin, isStudent, updateCurrentUser } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [savedSuccess, setSavedSuccess] = useState(false);
    useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [currentUser]);
    const handleSave = (e) => {
        e.preventDefault();
        updateCurrentUser({ name, email });
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
    };
    return (<div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-[28px] font-semibold text-slate-900 tracking-tight">
          {isAdmin ? 'Admin Profile Settings' : 'Student Profile & Learning Record'}
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          {isAdmin
            ? 'Manage your administrator details and platform access credentials.'
            : 'Review your enrolled student profile and learning credentials.'}
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-6">
        {/* Profile Card Header */}
        <div className="flex items-center space-x-4 pb-6 border-b border-slate-100">
          <img src={currentUser.avatar} alt={currentUser.name} className={`w-20 h-20 rounded-2xl object-cover ring-4 ${isAdmin ? 'ring-amber-100' : 'ring-blue-100'}`}/>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{currentUser.name}</h3>
            <p className={`text-xs font-medium px-2.5 py-0.5 rounded-full inline-block mt-1 ${isAdmin ? 'text-amber-700 bg-amber-50' : 'text-blue-700 bg-blue-50'}`}>
              {currentUser.roleLabel}
            </p>
            {currentUser.designation && (<p className="text-xs text-slate-400 mt-1">{currentUser.designation}</p>)}
          </div>
        </div>

        {/* Student Specific Badges & Stats */}
        {isStudent && (<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="text-center p-2">
              <span className="text-[10px] font-medium text-slate-400 uppercase block">Enrolled</span>
              <span className="text-lg font-semibold tabular-nums text-slate-900">4 Courses</span>
            </div>
            <div className="text-center p-2">
              <span className="text-[10px] font-medium text-slate-400 uppercase block">Completed</span>
              <span className="text-lg font-semibold tabular-nums text-emerald-600">2 Courses</span>
            </div>
            <div className="text-center p-2">
              <span className="text-[10px] font-medium text-slate-400 uppercase block">Progress</span>
              <span className="text-lg font-semibold tabular-nums text-blue-600">78%</span>
            </div>
            <div className="text-center p-2">
              <span className="text-[10px] font-medium text-slate-400 uppercase block">Badges</span>
              <span className="text-lg font-semibold tabular-nums text-amber-500">4 Unlocked</span>
            </div>
          </div>)}

        {/* Edit Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-900 focus:outline-hidden focus:border-blue-500"/>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-900 focus:outline-hidden focus:border-blue-500"/>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Assigned Role</label>
            <input type="text" readOnly value={currentUser.roleLabel} className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-500 cursor-not-allowed"/>
          </div>

          {savedSuccess && (<div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-medium flex items-center space-x-2">
              <CheckCircle2 size={16}/>
              <span>Profile information updated successfully!</span>
            </div>)}

          <div className="pt-4 flex justify-between items-center">
            {isStudent && (<button type="button" onClick={() => navigate('/achievements')} className="text-xs font-medium text-blue-600 hover:underline flex items-center space-x-1">
                <Award size={14}/>
                <span>View My Achievements</span>
              </button>)}

            <div className="ml-auto">
              <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white font-medium text-xs px-5 py-2.5 rounded-xl transition-colors flex items-center space-x-1.5 shadow-xs">
                <Save size={16}/>
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>);
};
export default ProfilePage;
