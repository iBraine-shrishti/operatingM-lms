import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { GlobalSearchModal } from '../common/GlobalSearchModal';
import { useAuth } from '../../context/AuthContext';

export const SharedLayout = () => {
    const { isAdmin } = useAuth();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const toggleSidebar = () => {
        if (window.innerWidth < 768) {
            setMobileSidebarOpen(!mobileSidebarOpen);
        }
        else {
            setSidebarCollapsed(!sidebarCollapsed);
        }
    };
    return (<div className={`min-h-screen bg-[#f8fafc] dark:bg-[#0b0f19] font-sans text-slate-900 dark:text-slate-100 overflow-x-hidden transition-colors duration-200 ${isAdmin ? 'role-admin' : 'role-student'}`}>
      {/* Sidebar Desktop */}
      <div className="hidden md:block">
        <Sidebar collapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}/>
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (<div className="fixed inset-0 z-40 md:hidden flex">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" onClick={() => setMobileSidebarOpen(false)}/>
          <div className="relative z-50 w-64 bg-white dark:bg-[#111827] h-full shadow-2xl">
            <Sidebar collapsed={false} onToggleCollapse={() => setMobileSidebarOpen(false)} onCloseMobile={() => setMobileSidebarOpen(false)}/>
          </div>
        </div>)}

      {/* Main Container */}
      <div className={`min-h-screen flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'} overflow-x-hidden`}>
        {/* Topbar */}
        <Topbar onToggleSidebar={toggleSidebar} onOpenSearch={() => setSearchModalOpen(true)}/>

        {/* Page Content View - Pure edge-to-edge fluid responsive workspace */}
        <main className="flex-1 w-full p-3 sm:p-4 lg:p-4 xl:p-4 2xl:px-6 2xl:py-4 flex flex-col animate-in fade-in duration-200">
          <Outlet />
        </main>
      </div>

      {/* Global Command K Search Modal */}
      <GlobalSearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)}/>
    </div>);
};
