import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Zap, ChevronDown, Command, X } from 'lucide-react';

const notifications = [
  { id: 1, title: 'Microsoft campus hiring detected', time: '2m ago', type: 'success', read: false },
  { id: 2, title: 'New recruiter found: Priya Sharma', time: '14m ago', type: 'info', read: false },
  { id: 3, title: 'Automation completed: 42 leads', time: '1h ago', type: 'success', read: true },
  { id: 4, title: 'Email verification done: 8 contacts', time: '2h ago', type: 'info', read: true },
];

export function TopBar() {
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header
      className="fixed top-0 right-0 z-40 flex items-center gap-4 px-6 h-[60px]"
      style={{
        left: '228px',
        background: 'rgba(8, 10, 15, 0.85)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        backdropFilter: 'blur(24px)',
      }}
    >
      {/* Search */}
      <div className="flex-1 max-w-lg relative">
        <motion.div
          animate={{ scale: searchFocus ? 1.01 : 1 }}
          transition={{ duration: 0.15 }}
          className="relative"
        >
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: '#484f58' }}
          />
          <input
            type="text"
            placeholder="Search companies, recruiters, jobs..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
            className="w-full pl-9 pr-20 py-2 text-sm rounded-xl outline-none transition-all duration-200"
            style={{
              background: searchFocus ? 'rgba(22,27,39,0.9)' : 'rgba(22,27,39,0.6)',
              border: `1px solid ${searchFocus ? 'rgba(59,130,246,0.4)' : 'rgba(255,255,255,0.06)'}`,
              color: '#f0f6fc',
              boxShadow: searchFocus ? '0 0 0 3px rgba(59,130,246,0.08)' : 'none',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-8 top-1/2 -translate-y-1/2 p-0.5 rounded"
              style={{ color: '#484f58' }}
            >
              <X size={12} />
            </button>
          )}
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium"
            style={{ color: '#484f58', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <Command size={9} />K
          </div>
        </motion.div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* AI Status */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl cursor-pointer"
          style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}
        >
          <div className="relative">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
            <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-50"></div>
          </div>
          <span className="text-xs font-semibold" style={{ color: '#10b981' }}>AI Active</span>
          <Zap size={11} style={{ color: '#10b981' }} />
        </motion.div>

        {/* Notifications */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }}
            className="relative w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-150"
            style={{ 
              background: showNotif ? 'rgba(59,130,246,0.1)' : 'rgba(22,27,39,0.6)',
              border: '1px solid rgba(255,255,255,0.06)'
            }}
          >
            <Bell size={15} style={{ color: showNotif ? '#60a5fa' : '#8b949e' }} />
            {unreadCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center rounded-full text-[9px] font-bold text-white"
                style={{ background: '#3b82f6' }}
              >
                {unreadCount}
              </span>
            )}
          </motion.button>

          <AnimatePresence>
            {showNotif && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-80 rounded-2xl overflow-hidden z-50"
                style={{
                  background: '#0d1117',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
                }}
              >
                <div className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <span className="text-sm font-semibold text-white">Notifications</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa' }}>
                    {unreadCount} new
                  </span>
                </div>
                <div className="divide-y divide-white/[0.04]">
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      className="px-4 py-3 flex gap-3 items-start hover:bg-white/[0.02] transition-colors cursor-pointer"
                    >
                      <div
                        className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                        style={{ background: n.read ? '#21262d' : n.type === 'success' ? '#10b981' : '#3b82f6' }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-white leading-snug">{n.title}</div>
                        <div className="text-[11px] mt-0.5" style={{ color: '#484f58' }}>{n.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 border-t text-center" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <button className="text-xs font-medium" style={{ color: '#3b82f6' }}>View all notifications</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }}
            className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-xl transition-all duration-150"
            style={{ 
              background: showProfile ? 'rgba(59,130,246,0.08)' : 'rgba(22,27,39,0.6)',
              border: '1px solid rgba(255,255,255,0.06)'
            }}
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
            >
              TP
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-white leading-tight">T&P Admin</div>
              <div className="text-[10px] leading-tight" style={{ color: '#484f58' }}>NITK Surathkal</div>
            </div>
            <ChevronDown size={13} style={{ color: '#484f58' }} />
          </motion.button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-56 rounded-2xl overflow-hidden z-50"
                style={{
                  background: '#0d1117',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
                }}
              >
                <div className="px-4 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <div className="text-sm font-semibold text-white">T&P Cell Admin</div>
                  <div className="text-xs mt-0.5" style={{ color: '#484f58' }}>admin@nitk.edu.in</div>
                </div>
                {['Profile Settings', 'API Keys', 'Billing', 'Help & Support'].map(item => (
                  <button key={item} className="w-full text-left px-4 py-2.5 text-sm hover:bg-white/[0.03] transition-colors" style={{ color: '#8b949e' }}>
                    {item}
                  </button>
                ))}
                <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <button className="w-full text-left px-4 py-2.5 text-sm transition-colors" style={{ color: '#ef4444' }}>
                    Sign out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
