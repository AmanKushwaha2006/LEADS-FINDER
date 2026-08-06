import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Globe, TrendingUp, TrendingDown,
  MapPin, Building2, Users, Calendar, Star, ExternalLink,
  Briefcase, MessageSquare, Clock, CheckCircle2,
} from 'lucide-react';
import { companies, recruiters, hiringPosts } from '../data/mockData';
import { CompanyAvatar, RecruiterAvatar } from '../components/ui/CompanyAvatar';
import { Badge, PriorityBadge, StatusBadge } from '../components/ui/Badge';
import { Card, CardHeader } from '../components/ui/Card';

export function CompanyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const company = companies.find(c => c.id === id) || companies[0];
  const companyRecruiters = recruiters.filter(r => r.companyId === company.id);
  const companyPosts = hiringPosts.filter(p => p.companyId === company.id);

  const timeline = [
    { date: 'Jan 2024', event: 'Active campus hiring for 2024 batch', type: 'campus' },
    { date: 'Sep 2023', event: 'Internship drive conducted for 2024 graduation', type: 'intern' },
    { date: 'Jan 2023', event: 'Previous campus hiring — 24 offers made', type: 'campus' },
    { date: 'Jun 2022', event: 'First contact established via LinkedIn', type: 'contact' },
  ];

  return (
    <div>
      {/* Back */}
      <motion.button
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm mb-5 transition-colors"
        style={{ color: '#8b949e' }}
      >
        <ArrowLeft size={15} />
        Back to Companies
      </motion.button>

      {/* Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 mb-4 relative overflow-hidden"
        style={{ background: 'rgba(13,17,23,0.9)', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none" style={{ background: `radial-gradient(circle, #3b82f6, transparent)`, transform: 'translate(30%, -30%)' }} />

        <div className="flex items-start gap-5">
          <CompanyAvatar name={company.name} logo={company.logo} size="lg" />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold text-white">{company.name}</h1>
                  <StatusBadge status={company.hiringStatus} />
                  {company.campusHistory && (
                    <Badge variant="purple" dot>Campus History</Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm" style={{ color: '#8b949e' }}>
                  <span className="flex items-center gap-1.5"><Building2 size={13} />{company.industry}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={13} />{company.location}</span>
                  <span className="flex items-center gap-1.5"><Users size={13} />{company.size.toUpperCase()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  href="#"
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl"
                  style={{ color: '#8b949e', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <Globe size={13} />
                  {company.website}
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  href="#"
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl"
                  style={{ color: '#60a5fa', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)' }}
                >
                  <ExternalLink size={13} />
                  LinkedIn
                </motion.a>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-3 mt-5">
              {[
                { label: 'Open Roles', value: company.openRoles, icon: <Briefcase size={14} />, color: '#3b82f6' },
                { label: 'Growth', value: `${company.growth >= 0 ? '+' : ''}${company.growth}%`, icon: company.growth >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />, color: company.growth >= 0 ? '#10b981' : '#ef4444' },
                { label: 'Recruiters', value: companyRecruiters.length, icon: <Users size={14} />, color: '#8b5cf6' },
                { label: 'Last Active', value: 'Today', icon: <Clock size={14} />, color: '#f59e0b' },
              ].map(s => (
                <div key={s.label} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="flex items-center gap-1.5 mb-1.5" style={{ color: s.color }}>
                    {s.icon}
                    <span className="text-[11px] font-medium" style={{ color: '#8b949e' }}>{s.label}</span>
                  </div>
                  <div className="text-xl font-bold text-white">{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content Grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="col-span-2 space-y-4">
          {/* Jobs */}
          <Card>
            <CardHeader title="Open Positions" subtitle={`${company.openRoles} active roles`} />
            {company.tags.map((role, i) => (
              <div key={role} className="flex items-center justify-between p-3 rounded-xl mb-2 last:mb-0" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(59,130,246,0.1)' }}>
                    <Briefcase size={13} style={{ color: '#3b82f6' }} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{role} Engineer</div>
                    <div className="text-[11px]" style={{ color: '#484f58' }}>Full-time · {company.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="info">{i % 2 === 0 ? 'Campus' : 'Fresher'}</Badge>
                  <button className="text-xs text-blue-400 flex items-center gap-1 hover:underline">
                    View <ExternalLink size={10} />
                  </button>
                </div>
              </div>
            ))}
          </Card>

          {/* Latest Hiring Posts */}
          {companyPosts.length > 0 && (
            <Card>
              <CardHeader title="Hiring Posts" subtitle="LinkedIn & career page posts" />
              {companyPosts.map(post => (
                <div key={post.id} className="p-4 rounded-xl mb-3 last:mb-0" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-semibold text-white">{post.title}</h4>
                    <Badge variant={post.type === 'campus' ? 'info' : 'success'}>{post.type}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-[11px]" style={{ color: '#484f58' }}>
                    <span className="flex items-center gap-1"><Calendar size={10} />{post.postedDate}</span>
                    {post.applicants && <span>{post.applicants.toLocaleString()} applicants</span>}
                  </div>
                  <div className="flex gap-1.5 mt-2">
                    {post.roles.map(r => (
                      <span key={r} className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: 'rgba(255,255,255,0.05)', color: '#8b949e' }}>{r}</span>
                    ))}
                  </div>
                </div>
              ))}
            </Card>
          )}

          {/* Hiring Timeline */}
          <Card>
            <CardHeader title="Campus History" subtitle="Historical hiring activity" />
            <div className="relative">
              <div className="absolute left-[18px] top-0 bottom-0 w-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
              {timeline.map((item, i) => (
                <div key={i} className="relative flex gap-4 pb-5 last:pb-0">
                  <div
                    className="relative z-10 w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: item.type === 'campus' ? 'rgba(59,130,246,0.15)' : item.type === 'intern' ? 'rgba(139,92,246,0.15)' : 'rgba(16,185,129,0.15)' }}
                  >
                    <CheckCircle2 size={14} style={{ color: item.type === 'campus' ? '#3b82f6' : item.type === 'intern' ? '#8b5cf6' : '#10b981' }} />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#484f58' }}>{item.date}</span>
                      <Badge variant={item.type === 'campus' ? 'info' : item.type === 'intern' ? 'purple' : 'success'}>{item.type}</Badge>
                    </div>
                    <p className="text-sm text-white">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Priority & Status */}
          <Card>
            <CardHeader title="Classification" />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: '#8b949e' }}>Priority</span>
                <PriorityBadge priority={company.priority} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: '#8b949e' }}>Status</span>
                <StatusBadge status={company.hiringStatus} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: '#8b949e' }}>Freshers</span>
                <Badge variant={company.hiringFreshers ? 'success' : 'neutral'}>{company.hiringFreshers ? 'Yes' : 'No'}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: '#8b949e' }}>Campus History</span>
                <Badge variant={company.campusHistory ? 'info' : 'neutral'}>{company.campusHistory ? 'Yes' : 'No'}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: '#8b949e' }}>Lead Score</span>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-20 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className="h-full rounded-full" style={{ width: '92%', background: 'linear-gradient(90deg, #3b82f6, #10b981)' }} />
                  </div>
                  <span className="text-xs font-bold" style={{ color: '#10b981' }}>92</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Recruiters */}
          <Card>
            <CardHeader title="Key Recruiters" subtitle={`${companyRecruiters.length} found`} />
            {companyRecruiters.length > 0 ? (
              companyRecruiters.map(r => (
                <div key={r.id} className="flex items-center gap-3 p-2.5 rounded-xl mb-2 last:mb-0 hover:bg-white/[0.02] transition-colors" style={{ border: '1px solid rgba(255,255,255,0.04)' }}>
                  <RecruiterAvatar initials={r.photo} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white truncate">{r.name}</div>
                    <div className="text-[11px] truncate" style={{ color: '#8b949e' }}>{r.designation}</div>
                  </div>
                  <StatusBadge status={r.emailStatus} />
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <Users size={20} className="mx-auto mb-2" style={{ color: '#484f58' }} />
                <p className="text-xs" style={{ color: '#484f58' }}>No recruiters found yet</p>
                <button className="text-xs mt-2" style={{ color: '#3b82f6' }}>Start Discovery →</button>
              </div>
            )}
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader
              title="Notes"
              actions={
                <button className="text-xs" style={{ color: '#3b82f6' }}>Edit</button>
              }
            />
            {company.notes ? (
              <p className="text-sm leading-relaxed" style={{ color: '#8b949e' }}>{company.notes}</p>
            ) : (
              <div className="text-center py-4">
                <MessageSquare size={18} className="mx-auto mb-2" style={{ color: '#484f58' }} />
                <button className="text-xs" style={{ color: '#3b82f6' }}>Add a note →</button>
              </div>
            )}
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader title="Actions" />
            <div className="space-y-2">
              {[
                { label: 'Find More Recruiters', icon: <Users size={13} />, color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
                { label: 'Track on LinkedIn', icon: <ExternalLink size={13} />, color: '#60a5fa', bg: 'rgba(59,130,246,0.08)' },
                { label: 'Set Priority Alert', icon: <Star size={13} />, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
                { label: 'Add to Campaign', icon: <ExternalLink size={13} />, color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
              ].map(a => (
                <motion.button
                  key={a.label}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all"
                  style={{ background: a.bg, border: `1px solid ${a.color}25`, color: a.color }}
                >
                  {a.icon}
                  {a.label}
                </motion.button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
