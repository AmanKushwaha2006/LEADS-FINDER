import { motion } from 'framer-motion';
import {
  Building2, Users, FileText, Target, Mail,
  CheckSquare, Bot, TrendingUp, ArrowRight,
  ExternalLink, Sparkles, AlertCircle, RefreshCw,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { StatCard } from '../components/ui/StatCard';
import { CompanyAvatar } from '../components/ui/CompanyAvatar';
import { Badge, PriorityBadge, StatusBadge } from '../components/ui/Badge';
import { Card, CardHeader } from '../components/ui/Card';
import { PageHeader } from '../components/ui/PageHeader';
import { companies, hiringTrends, aiSuggestions } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

const stats = [
  { label: 'Companies Found Today', value: 42, change: 18, icon: <Building2 size={18} />, color: '#3b82f6', description: 'vs yesterday' },
  { label: 'Recruiters Discovered', value: 128, change: 24, icon: <Users size={18} />, color: '#8b5cf6', description: 'verified contacts' },
  { label: 'Hiring Posts Tracked', value: 318, change: 31, icon: <FileText size={18} />, color: '#10b981', description: 'across platforms' },
  { label: 'Leads Generated', value: 94, change: 12, icon: <Target size={18} />, color: '#f59e0b', description: 'qualified leads' },
  { label: 'Email Accuracy', value: 97, change: 2, suffix: '%', icon: <Mail size={18} />, color: '#06b6d4', description: 'verified' },
  { label: 'Pending Tasks', value: 7, change: -14, icon: <CheckSquare size={18} />, color: '#f43f5e', description: 'action required' },
  { label: 'Automation Runs', value: 24, change: 8, icon: <Bot size={18} />, color: '#a78bfa', description: 'today' },
  { label: "Today's Progress", value: 78, change: 5, suffix: '%', icon: <TrendingUp size={18} />, color: '#34d399', description: 'daily goal' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl px-4 py-3" style={{ background: '#161b27', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
        <div className="text-xs font-semibold text-white mb-2">{label}</div>
        {payload.map((p) => (
          <div key={p.name} className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span style={{ color: '#8b949e' }}>{p.name}:</span>
            <span className="font-semibold text-white">{p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Monday, January 15, 2024 · 10:43 AM"
        badge={{ label: 'Live', color: '#10b981' }}
        actions={
          <button
            onClick={() => navigate('/discovery')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:shadow-lg"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', boxShadow: '0 4px 12px rgba(59,130,246,0.25)' }}
          >
            <Sparkles size={14} />
            Start AI Discovery
          </button>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <StatCard
            key={stat.label}
            {...stat}
            delay={i * 60}
          />
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Hiring Activity Chart */}
        <div className="col-span-2">
          <Card>
            <CardHeader
              title="Hiring Activity"
              subtitle="Companies & recruiters discovered over time"
              actions={
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors" style={{ color: '#8b949e', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <RefreshCw size={11} />
                    Refresh
                  </button>
                  {['7D', '14D', '30D'].map(d => (
                    <button key={d} className={`text-xs px-2.5 py-1 rounded-lg transition-colors ${d === '7D' ? 'text-blue-400 bg-blue-500/10' : ''}`} style={{ color: d === '7D' ? '#60a5fa' : '#484f58' }}>
                      {d}
                    </button>
                  ))}
                </div>
              }
            />
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={hiringTrends} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCompanies" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorRecruiters" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: '#484f58', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#484f58', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="companies" stroke="#3b82f6" strokeWidth={2} fill="url(#colorCompanies)" name="Companies" dot={false} />
                <Area type="monotone" dataKey="recruiters" stroke="#8b5cf6" strokeWidth={2} fill="url(#colorRecruiters)" name="Recruiters" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-6 mt-3 pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-400" /><span className="text-xs" style={{ color: '#8b949e' }}>Companies Found</span></div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-400" /><span className="text-xs" style={{ color: '#8b949e' }}>Recruiters Found</span></div>
            </div>
          </Card>
        </div>

        {/* AI Suggestions */}
        <div>
          <Card>
            <CardHeader
              title="AI Insights"
              subtitle="Real-time intelligence"
              actions={
                <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: '#10b981' }}>
                  <div className="relative">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-50" />
                  </div>
                  Live
                </div>
              }
            />
            <div className="space-y-3">
              {aiSuggestions.slice(0, 4).map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="p-3 rounded-xl cursor-pointer group transition-all duration-150"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-[11px] font-bold text-white mt-0.5"
                      style={{ background: s.priority === 'high' ? 'rgba(239,68,68,0.15)' : s.priority === 'medium' ? 'rgba(245,158,11,0.15)' : 'rgba(139,148,158,0.1)' }}
                    >
                      {s.company.slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] leading-snug text-white font-medium">{s.message}</div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[10px]" style={{ color: '#484f58' }}>{s.time}</span>
                        <Badge variant={s.priority === 'high' ? 'danger' : s.priority === 'medium' ? 'warning' : 'neutral'}>{s.priority}</Badge>
                      </div>
                    </div>
                    <AlertCircle size={13} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" style={{ color: '#484f58' }} />
                  </div>
                </motion.div>
              ))}
            </div>
            <button className="w-full mt-3 text-xs font-semibold py-2.5 rounded-xl transition-all hover:bg-white/[0.04]" style={{ color: '#3b82f6', border: '1px solid rgba(59,130,246,0.15)' }}>
              View All Insights →
            </button>
          </Card>
        </div>
      </div>

      {/* Latest Hiring Companies Table */}
      <Card padding="p-0">
        <div className="px-5 py-4 flex items-center justify-between border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <div>
            <h3 className="text-sm font-semibold text-white">Latest Hiring Companies</h3>
            <p className="text-xs mt-0.5" style={{ color: '#8b949e' }}>Updated 2 minutes ago · {companies.length} companies tracked</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/companies')}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
              style={{ color: '#60a5fa', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)' }}
            >
              View All <ArrowRight size={11} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table w-full">
            <thead>
              <tr>
                <th className="text-left px-5">Company</th>
                <th className="text-left px-4">Industry</th>
                <th className="text-left px-4">Open Roles</th>
                <th className="text-left px-4">Freshers</th>
                <th className="text-left px-4">Recruiter</th>
                <th className="text-left px-4">Priority</th>
                <th className="text-left px-4">Status</th>
                <th className="text-left px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, i) => (
                <motion.tr
                  key={company.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.05 * i }}
                  className="group"
                >
                  <td className="px-5">
                    <div className="flex items-center gap-3">
                      <CompanyAvatar name={company.name} logo={company.logo} size="sm" />
                      <div>
                        <div className="text-sm font-semibold text-white">{company.name}</div>
                        <div className="text-[11px]" style={{ color: '#484f58' }}>{company.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4">
                    <span className="text-xs" style={{ color: '#8b949e' }}>{company.industry}</span>
                  </td>
                  <td className="px-4">
                    <span className="text-sm font-semibold text-white">{company.openRoles}</span>
                  </td>
                  <td className="px-4">
                    {company.hiringFreshers ? (
                      <Badge variant="success" dot>Yes</Badge>
                    ) : (
                      <Badge variant="neutral" dot>No</Badge>
                    )}
                  </td>
                  <td className="px-4">
                    {company.recruiterFound ? (
                      <Badge variant="info" dot>Found</Badge>
                    ) : (
                      <Badge variant="warning" dot>Pending</Badge>
                    )}
                  </td>
                  <td className="px-4">
                    <PriorityBadge priority={company.priority} />
                  </td>
                  <td className="px-4">
                    <StatusBadge status={company.hiringStatus} />
                  </td>
                  <td className="px-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(`/companies/${company.id}`)}
                      className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                      style={{ color: '#60a5fa', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}
                    >
                      <ExternalLink size={10} />
                      View
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
