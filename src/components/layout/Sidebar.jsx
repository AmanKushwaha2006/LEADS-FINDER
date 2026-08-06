import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  Building2,
  Users,
  Bot,
  CheckSquare,
  BarChart3,
  LineChart,
  Settings,
  Zap,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard', group: 'main' },
  { path: '/discovery', icon: Search, label: 'Lead Discovery', group: 'main' },
  { path: '/companies', icon: Building2, label: 'Companies', group: 'main' },
  { path: '/recruiters', icon: Users, label: 'Recruiters', group: 'main' },
  { path: '/automation', icon: Bot, label: 'Automation', group: 'tools' },
  { path: '/tasks', icon: CheckSquare, label: 'Tasks', group: 'tools' },
  { path: '/reports', icon: BarChart3, label: 'Reports', group: 'tools' },
  { path: '/analytics', icon: LineChart, label: 'Analytics', group: 'tools' },
  { path: '/settings', icon: Settings, label: 'Settings', group: 'system' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed left-0 top-0 h-screen w-[228px] flex flex-col z-50"
      style={{
        background: 'rgba(13, 17, 23, 0.95)',
        borderRight: '1px solid rgba(255,255,255,0.05)',
        backdropFilter: 'blur(24px)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}
        >
          <Zap size={16} className="text-white" strokeWidth={2.5} />
        </div>
        <div>
          <div className="text-sm font-bold text-white tracking-tight leading-none">PlacementScout</div>
          <div className="text-[10px] font-medium mt-0.5" style={{ color: '#484f58', letterSpacing: '0.05em' }}>
            AI PLATFORM
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="mb-1">
          <div className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#484f58' }}>
            Core
          </div>
          {navItems.filter(i => i.group === 'main').map((item) => (
            <NavItem key={item.path} item={item} isActive={location.pathname === item.path} />
          ))}
        </div>

        <div className="mt-5 mb-1">
          <div className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#484f58' }}>
            Tools
          </div>
          {navItems.filter(i => i.group === 'tools').map((item) => (
            <NavItem key={item.path} item={item} isActive={location.pathname === item.path} />
          ))}
        </div>

        <div className="mt-5 mb-1">
          <div className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#484f58' }}>
            System
          </div>
          {navItems.filter(i => i.group === 'system').map((item) => (
            <NavItem key={item.path} item={item} isActive={location.pathname === item.path} />
          ))}
        </div>
      </nav>

      {/* Bottom Status */}
      <div className="px-4 py-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="rounded-xl p-3" style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)' }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="relative flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              <div className="absolute w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-60"></div>
            </div>
            <span className="text-xs font-semibold" style={{ color: '#10b981' }}>AI Engine Active</span>
          </div>
          <div className="text-[11px]" style={{ color: '#8b949e' }}>Scanning 24 sources</div>
          <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' }}
              initial={{ width: '0%' }}
              animate={{ width: '72%' }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px]" style={{ color: '#484f58' }}>Progress</span>
            <span className="text-[10px] font-medium" style={{ color: '#3b82f6' }}>72%</span>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

function NavItem({ item, isActive }) {
  const Icon = item.icon;

  return (
    <NavLink to={item.path}>
      <motion.div
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.98 }}
        className="relative flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 cursor-pointer transition-all duration-150 group"
        style={{
          background: isActive ? 'rgba(59,130,246,0.12)' : 'transparent',
          color: isActive ? '#60a5fa' : '#8b949e',
        }}
      >
        {isActive && (
          <motion.div
            layoutId="activeNav"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full"
            style={{ background: '#3b82f6' }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
          />
        )}
        <Icon size={16} strokeWidth={isActive ? 2 : 1.75} />
        <span className="text-sm font-medium">{item.label}</span>
        {isActive && (
          <ChevronRight size={12} className="ml-auto opacity-60" />
        )}
      </motion.div>
    </NavLink>
  );
}
