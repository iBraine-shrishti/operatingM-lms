import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { GlobalSearchModal } from '../common/GlobalSearchModal';
export const SharedLayout = () => {
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
    return (<div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      {/* Sidebar Desktop */}
      <div className="hidden md:block">
        <Sidebar collapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}/>
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (<div className="fixed inset-0 z-40 md:hidden flex">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity" onClick={() => setMobileSidebarOpen(false)}/>
          <div className="relative z-50 w-64 bg-white h-full shadow-2xl">
            <Sidebar collapsed={false} onToggleCollapse={() => setMobileSidebarOpen(false)} onCloseMobile={() => setMobileSidebarOpen(false)}/>
          </div>
        </div>)}

      {/* Main Container */}
      <div className={`min-h-screen flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'} overflow-x-hidden`}>
        {/* Topbar */}
        <Topbar onToggleSidebar={toggleSidebar} onOpenSearch={() => setSearchModalOpen(true)}/>

        {/* Page Content View - Pure edge-to-edge fluid responsive workspace */}
        <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200">
          <Outlet />
        </main>
      </div>

      {/* Global Command K Search Modal */}
      <GlobalSearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)}/>
    </div>);
};
