import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assests/logo.png';
import { LayoutDashboard, BookOpen, Activity, User, GraduationCap, Award, CheckSquare, FileText, BookCheck, Layers, ClipboardList, FolderCheck, Users, HelpCircle, MessageCircle, BarChart3, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
export const Sidebar = ({ collapsed, onToggleCollapse, onCloseMobile }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isStudent, logout } = useAuth();
    const sections = isStudent
        ? [
            {
                title: 'Main',
                items: [
                    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
                    { name: 'Browse Courses', path: '/courses', icon: BookOpen },
                    { name: 'Activity', path: '/activity', icon: Activity },
                    { name: 'Profile', path: '/profile', icon: User }
                ]
            },
            {
                title: 'LEARNING',
                items: [
                    {
                        name: 'Enrolled Courses',
                        path: '/enrolled-courses',
                        icon: GraduationCap,
                        badge: '4'
                    },
                    {
                        name: 'Achievements',
                        path: '/achievements',
                        icon: Award,
                        badge: '4'
                    },
                    { name: 'My Quizzes', path: '/my-quizzes', icon: CheckSquare },
                    { name: 'Notes & Reviews', path: '/notes-reviews', icon: FileText },
                    {
                        name: 'My Assignments',
                        path: '/my-assignments',
                        icon: BookCheck
                    }
                ]
            }
        ]
        : [
            {
                title: 'Main',
                items: [
                    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
                    { name: 'Courses', path: '/courses', icon: BookOpen },
                    { name: 'Activity', path: '/activity', icon: Activity },
                    { name: 'Profile', path: '/profile', icon: User }
                ]
            },
            {
                title: 'INSTRUCTOR CONTROLS',
                items: [
                    { name: 'Manage Courses', path: '/manage-courses', icon: Layers },
                    {
                        name: 'Manage Units',
                        path: '/manage-units',
                        icon: ClipboardList
                    },
                    {
                        name: 'Manage Quizzes',
                        path: '/manage-quizzes',
                        icon: CheckSquare
                    },
                    {
                        name: 'Manage Assignments',
                        path: '/manage-assignments',
                        icon: FolderCheck
                    },
                    { name: 'Manage Students', path: '/manage-students', icon: Users },
                    {
                        name: 'Manage Questions',
                        path: '/manage-questions',
                        icon: HelpCircle
                    },
                    {
                        name: 'Question & Discussions',
                        path: '/question-discussions',
                        icon: MessageCircle
                    },
                    {
                        name: 'Manage Reports',
                        path: '/manage-reports',
                        icon: BarChart3,
                        badge: 'Beta'
                    }
                ]
            }
        ];
    return (<aside className={`fixed top-0 left-0 z-30 h-screen bg-white border-r border-slate-200 transition-all duration-300 flex flex-col ${collapsed ? 'w-20' : 'w-64'}`}>
      {/* Sidebar Header / Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 shrink-0">
        {!collapsed ? (<div className="flex items-center overflow-hidden py-1">
            <img src={logo} alt="Operating Media" className="h-10 w-auto max-w-[185px] object-contain"/>
          </div>) : (<div className="w-12 h-10 mx-auto flex items-center justify-center overflow-hidden">
            <img src={logo} alt="Operating Media" className="h-7 w-auto max-w-[48px] object-contain"/>
          </div>)}

        <button onClick={onToggleCollapse} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors hidden md:block" title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
          {collapsed ? <ChevronRight size={18}/> : <ChevronLeft size={18}/>}
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 custom-scrollbar">
        {sections.map((section, sIdx) => (<div key={sIdx} className="space-y-1">
            {!collapsed && (<h3 className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                {section.title}
              </h3>)}
            {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path ||
                    (item.path === '/manage-courses' && location.pathname === '/');
                return (<NavLink key={item.path} to={item.path} onClick={onCloseMobile} className={({ isActive: isLinkActive }) => {
                        const active = isLinkActive ||
                            (item.path === '/manage-courses' &&
                                location.pathname === '/');
                        return `group relative flex items-center px-3 py-2 rounded-xl font-medium text-sm transition-all duration-150 ${active
                            ? 'bg-slate-900 text-white shadow-xs'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'} ${collapsed ? 'justify-center' : 'justify-between'}`;
                    }} title={collapsed ? item.name : undefined}>
                  <div className={`flex items-center space-x-3 ${collapsed ? 'justify-center' : ''}`}>
                    <Icon size={18} className={`shrink-0 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-800'}`}/>
                    {!collapsed && (<span className="truncate">{item.name}</span>)}
                  </div>

                  {!collapsed && item.badge && (<span className="ml-auto bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium px-2 py-0.5 rounded-md">
                      {item.badge}
                    </span>)}

                  {/* Tooltip for collapsed mode */}
                  {collapsed && (<div className="absolute left-full ml-3 px-2.5 py-1 bg-slate-900 text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-md">
                      {item.name}
                    </div>)}
                </NavLink>);
            })}
          </div>))}
      </div>

      {/* Footer / Logout */}
      <div className="p-3 border-t border-slate-100 shrink-0">
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut size={18} className="text-slate-400 group-hover:text-slate-600 shrink-0"/>
          {!collapsed && (<span className="text-sm font-medium">Sign Out</span>)}
        </button>
      </div>
    </aside>);
};
export default Sidebar;
