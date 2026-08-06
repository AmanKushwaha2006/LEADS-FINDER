import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Square, BookmarkPlus, Filter, ChevronDown,
  MapPin, Building, Users, Calendar, ExternalLink,
  Sparkles, Loader2,
} from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { CompanyAvatar } from '../components/ui/CompanyAvatar';
import { PriorityBadge, StatusBadge } from '../components/ui/Badge';
import { companies } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

const industries = ['All Industries', 'Technology', 'IT Services', 'Fintech', 'E-Commerce', 'SaaS', 'EdTech', 'HealthTech'];
const companySizes = ['Any Size', 'Startup', 'SME', 'Enterprise', 'MNC'];
const hiringTypes = ['Campus', 'Internship', 'Fresher', 'Remote', 'Hybrid'];

export function LeadDiscovery() {
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [industry, setIndustry] = useState('All Industries');
  const [companySize, setCompanySize] = useState('Any Size');
  const [selectedTypes, setSelectedTypes] = useState(['Campus', 'Fresher']);
  const [showFilters, setShowFilters] = useState(true);
  const [progress, setProgress] = useState(0);

  const toggleType = (t) => {
    setSelectedTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  };

  const handleStart = () => {
    setIsSearching(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 85) { clearInterval(interval); return 85; }
        return p + Math.random() * 12;
      });
    }, 400);
  };

  const handleStop = () => {
    setIsSearching(false);
    setProgress(0);
  };

  return (
    <div>
      <PageHeader
        title="Lead Discovery"
        subtitle="AI-powered company and recruiter discovery engine"
        badge={{ label: 'AI Powered', color: '#8b5cf6' }}
        actions={
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all"
              style={{ color: '#8b949e', background: 'rgba(22,27,39,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={14} />
              Filters
              <ChevronDown size={13} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all" style={{ color: '#8b949e', background: 'rgba(22,27,39,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <BookmarkPlus size={14} />
              Save Search
            </button>
          </div>
        }
      />

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden mb-4"
          >
            <div
              className="rounded-2xl p-5"
              style={{ background: 'rgba(13,17,23,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="grid grid-cols-4 gap-4 mb-4">
                {/* Keyword */}
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: '#484f58' }}>Keywords</label>
                  <div className="relative">
                    <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#484f58' }} />
                    <input
                      type="text"
                      placeholder="e.g. campus hiring SDE"
                      value={keyword}
                      onChange={e => setKeyword(e.target.value)}
                      className="input-dark w-full pl-8 text-sm"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: '#484f58' }}>Location</label>
                  <div className="relative">
                    <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#484f58' }} />
                    <input
                      type="text"
                      placeholder="e.g. Bengaluru, Pan India"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      className="input-dark w-full pl-8 text-sm"
                    />
                  </div>
                </div>

                {/* Industry */}
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: '#484f58' }}>Industry</label>
                  <div className="relative">
                    <Building size={13} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#484f58' }} />
                    <select
                      value={industry}
                      onChange={e => setIndustry(e.target.value)}
                      className="input-dark w-full pl-8 text-sm appearance-none"
                    >
                      {industries.map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                    <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#484f58' }} />
                  </div>
                </div>

                {/* Company Size */}
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: '#484f58' }}>Company Size</label>
                  <div className="relative">
                    <Users size={13} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#484f58' }} />
                    <select
                      value={companySize}
                      onChange={e => setCompanySize(e.target.value)}
                      className="input-dark w-full pl-8 text-sm appearance-none"
                    >
                      {companySizes.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#484f58' }} />
                  </div>
                </div>
              </div>

              {/* Hiring Type Toggles */}
              <div className="flex items-center gap-3 mb-4">
                <label className="text-[11px] font-semibold uppercase tracking-wider flex-shrink-0" style={{ color: '#484f58' }}>Hiring Type:</label>
                <div className="flex items-center gap-2 flex-wrap">
                  {hiringTypes.map(t => (
                    <motion.button
                      key={t}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => toggleType(t)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                      style={{
                        background: selectedTypes.includes(t) ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${selectedTypes.includes(t) ? 'rgba(59,130,246,0.4)' : 'rgba(255,255,255,0.06)'}`,
                        color: selectedTypes.includes(t) ? '#60a5fa' : '#8b949e',
                      }}
                    >
                      {t}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                {!isSearching ? (
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: '0 8px 24px rgba(59,130,246,0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleStart}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', boxShadow: '0 4px 12px rgba(59,130,246,0.2)' }}
                  >
                    <Sparkles size={15} />
                    Start AI Search
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleStop}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold"
                    style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444' }}
                  >
                    <Square size={14} />
                    Stop Search
                  </motion.button>
                )}
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium" style={{ color: '#8b949e', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <BookmarkPlus size={14} />
                  Save Search
                </button>
                {isSearching && (
                  <div className="flex items-center gap-3 ml-2 flex-1">
                    <Loader2 size={14} className="animate-spin" style={{ color: '#3b82f6' }} />
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                    <span className="text-xs font-mono font-semibold" style={{ color: '#3b82f6' }}>{Math.round(progress)}%</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-white">{companies.length} companies found</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>
            Sorted by relevance
          </span>
        </div>
        <div className="flex items-center gap-2">
          {['Grid', 'List'].map(v => (
            <button key={v} className="text-xs px-3 py-1.5 rounded-lg transition-colors" style={{ color: v === 'Grid' ? '#60a5fa' : '#484f58', background: v === 'Grid' ? 'rgba(59,130,246,0.1)' : 'transparent', border: `1px solid ${v === 'Grid' ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.04)'}` }}>
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Company Cards Grid */}
      <div className="grid grid-cols-3 gap-4">
        {companies.map((company, i) => (
          <motion.div
            key={company.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.3 }}
            whileHover={{ y: -3, transition: { duration: 0.15 } }}
            className="rounded-2xl p-5 cursor-pointer group relative overflow-hidden"
            style={{ background: 'rgba(13,17,23,0.8)', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}
            onClick={() => navigate(`/companies/${company.id}`)}
          >
            {/* Hover border highlight */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ border: '1px solid rgba(59,130,246,0.2)' }}
            />

            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <CompanyAvatar name={company.name} logo={company.logo} size="md" />
                <div>
                  <div className="text-sm font-bold text-white">{company.name}</div>
                  <div className="text-[11px] flex items-center gap-1 mt-0.5" style={{ color: '#484f58' }}>
                    <MapPin size={9} />
                    {company.location}
                  </div>
                </div>
              </div>
              <StatusBadge status={company.hiringStatus} />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {company.tags.map(tag => (
                <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', color: '#8b949e', border: '1px solid rgba(255,255,255,0.06)' }}>
                  {tag}
                </span>
              ))}
              {company.hiringFreshers && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>
                  Freshers
                </span>
              )}
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="text-center p-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="text-lg font-bold text-white">{company.openRoles}</div>
                <div className="text-[10px]" style={{ color: '#484f58' }}>Open Roles</div>
              </div>
              <div className="text-center p-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="text-lg font-bold" style={{ color: company.growth >= 0 ? '#10b981' : '#ef4444' }}>
                  {company.growth >= 0 ? '+' : ''}{company.growth}%
                </div>
                <div className="text-[10px]" style={{ color: '#484f58' }}>Growth</div>
              </div>
              <div className="text-center p-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="text-sm font-bold" style={{ color: company.recruiterFound ? '#10b981' : '#f59e0b' }}>
                  {company.recruiterFound ? '✓' : '?'}
                </div>
                <div className="text-[10px]" style={{ color: '#484f58' }}>Recruiter</div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              <div className="flex items-center gap-2">
                <PriorityBadge priority={company.priority} />
                <div className="flex items-center gap-1 text-[11px]" style={{ color: '#484f58' }}>
                  <Calendar size={10} />
                  {company.lastHiringDate}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                style={{ color: '#60a5fa', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}
              >
                <ExternalLink size={10} />
                Open
              </motion.button>
            </div>

            {/* Hiring badge */}
            {company.hiringStatus === 'active' && (
              <div className="absolute top-3 right-3">
                <div className="flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981' }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Hiring
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
