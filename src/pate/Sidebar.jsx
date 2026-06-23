import React, { useState } from 'react';
import {
  LayoutGrid,
  Calendar,
  Users,
  PieChart,
  Library,
  Bookmark,
  MessageSquare,
  CircleDollarSign,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  function loginOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    window.location.reload();
  }

  const [button, setbutton] = useState('inline')
  let ui;
  if (button === 'none') {
    ui = <div className=" pl-4 pt-7"> 
      <button onClick={()=>{
        setbutton('inline')
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list-sort-descending-icon lucide-list-sort-descending"><path d="M15 12H3" /><path d="M3 5h18" /><path d="M9 19H3" /></svg>

      </button>
    </div>
  }

  return (

    <>
      {ui}
      <div style={{ display: button }} className="w-64 h-screen  sticky top-0 bg-[#121212] text-[#E0E0E0] font-sf-pro relative py-8 flex flex-col border-r border-[#2A2A2A]">

        {/* Sidebar Collapse/Expand Button */}
        <button onClick={() => {
          setbutton('none')
          console.log('ieownd')
        }} className="absolute right-0 top-10 translate-x-1/2 bg-[#D2A5B5] hover:bg-[#c293a3] transition-colors rounded-full p-1 text-black shadow-lg shadow-black/20 z-10">
          <ChevronRight size={16} />
        </button>

        {/* Logo */}
        <div className="mb-10 px-8">
          <h1 className="text-3xl font-semibold tracking-wide text-white">intelly</h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto custom-scrollbar">
          {/* FIX 3: Yahan se be-matlab ka 'sticky' class hata diya */}
          <div className="mb-8">
            <p className="px-8 text-[#757575] text-xs font-semibold tracking-wider uppercase mb-3">General</p>
            <ul className="flex flex-col">
              {/* FIX 4: Active hone ki condition theek ki. Ab agar path mein Dashboard hai toh ye highlight hoga */}
              <NavItem
                to="/Dashboard/Clinicalhistory"
                icon={<LayoutGrid size={20} />}
                text="Dashboard"
                active={location.pathname.includes('/Dashboard')}
              />
              <NavItem to="/schedule" icon={<Calendar size={20} />} text="Schedule" active={location.pathname === '/schedule'} />
              <NavItem to="/patient" icon={<Users size={20} />} text="Patients" active={location.pathname === '/patient'} />{/* 
              <NavItem to="/statistics" icon={<PieChart size={20} />} text="Statistics & reports" active={location.pathname === '/statistics'} /> */}
              <NavItem to="/book" icon={<Library size={20} />} text="Education" active={location.pathname === '/book'} />
             {/*  <NavItem to="/articles" icon={<Bookmark size={20} />} text="My articles" active={location.pathname === '/articles'} /> */}
            </ul>
          </div>

          <div>
            <p className="px-8 text-[#757575] text-xs font-semibold tracking-wider uppercase mb-3">Tools</p>
            <ul className="flex flex-col">
              <NavItem to="/Chatbut" icon={<MessageSquare size={20} />} text="Chats & calls" active={location.pathname === '/Chatbut'} />
              <NavItem to="/billing" icon={<CircleDollarSign size={20} />} text="Billing" active={location.pathname === '/billing'} />
              {/* <NavItem to="/documents" icon={<FileText size={20} />} text="Documents base" active={location.pathname === '/documents'} /> */}
              <NavItem to="/settings" icon={<Settings size={20} />} text="Settings" active={location.pathname === '/settings'} />
            </ul>
          </div>
        </nav>

        {/* Logout Section */}
        <div className="mt-auto px-4 pt-6 border-t border-[#2A2A2A]">
          <button
            onClick={loginOut}
            className="flex items-center gap-4 text-[#A0A0A0] hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 w-full p-3 rounded-xl"
          >
            <LogOut size={20} />
            <span className="font-medium text-[15px]">Log out</span>
          </button>
        </div>

      </div >
    </>
  );
};

const NavItem = ({ icon, text, active, to }) => {
  return (
    <li>
      <Link
        to={to}
        className={`flex items-center gap-4 py-3 px-8 transition-all duration-300 cursor-pointer border-l-2 ${active
          ? "text-[#D2A5B5] border-[#D2A5B5] bg-gradient-to-r from-[#D2A5B5]/10 to-transparent"
          : "text-[#A0A0A0] hover:text-white border-transparent hover:bg-white/5"
          }`}
      >
        <span className={`${active ? "text-[#D2A5B5]" : "text-[#A0A0A0] transition-colors"}`}>
          {icon}
        </span>
        <span className={`font-medium text-[15px] ${active ? "font-semibold" : ""}`}>
          {text}
        </span>
      </Link>
    </li>
  );
};

export default Sidebar;