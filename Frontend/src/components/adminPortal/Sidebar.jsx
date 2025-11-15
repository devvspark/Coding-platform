 import React from 'react';
import { NavLink } from 'react-router';
import { Link, useNavigate } from 'react-router';
import { LayoutDashboard, ListTodo, Users, Video } from 'lucide-react';
import { CodeMasterLogo } from "../"

const NavItem = ({ to, icon, label }) => {
  const baseClasses = "flex items-center space-x-3 px-4 py-3 transition-colors duration-200 border-l-4";
  const inactiveClasses =
    "border-transparent text-[#64748B] dark:text-[#94A3B8] hover:bg-[#E2E8F0]/50 dark:hover:bg-[#334155]/50 hover:text-[#0F172A] dark:hover:text-[#F8FAFC]";
  const activeClasses =
    "border-[#3B82F6] bg-[#3B82F6]/10 dark:bg-[#3B82F6]/20 text-[#3B82F6] font-semibold";

  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {icon}
      <span className="flex-1">{label}</span>
    </NavLink>
  );
};

const Sidebar = () => {
  const navItems = [
    { to: "/admin-portal", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { to: "/admin-portal/problems", icon: <ListTodo size={20} />, label: "Problems" },
    { to: "/admin-portal/users", icon: <Users size={20} />, label: "Users" },
    { to: "/admin-portal/video-solutions", icon: <Video size={20} />, label: "Video Solutions" }
  ];

  return (
    <aside className="w-64 bg-[#FFFFFF] dark:bg-[#1E293B] flex-shrink-0 flex flex-col border-r border-[#E2E8F0] dark:border-[#334155]">
      <div className="h-16 flex items-center border-b border-[#E2E8F0] dark:border-[#334155]">
      <Link to="/" >
        <div className="flex items-center space-x-2 px-4">
          <CodeMasterLogo size={7} className="" />
          <span className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">CodeMaster</span>
        </div>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </nav>
      <div className="p-4 border-t border-[#E2E8F0] dark:border-[#334155]">
        <p className="text-xs text-center text-[#64748B] dark:text-[#94A3B8]">© 2024 CodeMaster Admin</p>
      </div>
    </aside>
  );
};

export default Sidebar;
