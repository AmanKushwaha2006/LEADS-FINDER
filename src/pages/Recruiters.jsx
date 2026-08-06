import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Filter, Download, Plus, ExternalLink,
  Mail, Phone, User,
} from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { RecruiterAvatar, CompanyAvatar } from '../components/ui/CompanyAvatar';
import { PriorityBadge, StatusBadge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { recruiters, companies } from '../data/mockData';

export function Recruiters() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = recruiters.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.company.toLowerCase().includes(search.toLowerCase()) ||
    r.designation.toLowerCase().includes(search.toLowerCase())
  );

  const selectedRecruiter = recruiters.find(r => r.id === selected);
  const selectedCompany = companies.find(c => c.id === selectedRecruiter?.companyId);

  return (
    <div>
      <PageHeader
        title="Recruiters"
        subtitle={`${recruiters.length} recruiters discovered · ${recruiters.filter(r => r.emailStatus === 'verified').length} emails verified`}
        actions={
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-xl" style={{ color: '#8b949e', background: 'rgba(22,27,39,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <Download size={14} />
              Export
            </button>
            <button className="flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-xl text-white" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', boxShadow: '0 4px 12px rgba(59,130,246,0.2)' }}>
              <Plus size={14} />
              Add Recruiter
            </button>
          </div>
        }
      />

      {/* Filters */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#484f58' }} />
          <input
            type="text"
            placeholder="Search recruiters..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-dark w-full pl-9 text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          {['All', 'Verified', 'Pending'].map(f => (
            <button key={f} className="text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ background: f === 'All' ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.04)', color: f === 'All' ? '#60a5fa' : '#8b949e', border: `1px solid ${f === 'All' ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.06)'}` }}>
              {f}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-xl ml-auto" style={{ color: '#8b949e', background: 'rgba(22,27,39,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <Filter size={14} />
          Filters
        </button>
      </div>

      <div className="flex gap-4">
        {/* Table */}
        <div className={`flex-1 transition-all ${selected ? 'w-2/3' : 'w-full'}`}>
          <Card padding="p-0">
            <div className="overflow-x-auto">
              <table className="data-table w-full">
                <thead>
                  <tr>
                    <th className="text-left px-5">Recruiter</th>
                    <th className="text-left px-4">Designation</th>
                    <th className="text-left px-4">Company</th>
                    <th className="text-left px-4">Priority</th>
                    <th className="text-left px-4">Email</th>
                    <th className="text-left px-4">Phone</th>
                    <th className="text-left px-4">Last Active</th>
                    <th className="text-left px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((recruiter, i) => {
                    const company = companies.find(c => c.id === recruiter.companyId);
                    return (
                      <motion.tr
                        key={recruiter.id}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`group cursor-pointer ${selected === recruiter.id ? 'bg-blue-500/5' : ''}`}
                        onClick={() => setSelected(selected === recruiter.id ? null : recruiter.id)}
                      >
                        <td className="px-5">
                          <div className="flex items-center gap-3">
                            <RecruiterAvatar initials={recruiter.photo} size="sm" />
                            <div>
                              <div className="text-sm font-semibold text-white">{recruiter.name}</div>
                              <div className="text-[11px] flex items-center gap-1" style={{ color: '#484f58' }}>
                                <ExternalLink size={9} />
                                LinkedIn
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4"><span className="text-xs" style={{ color: '#8b949e' }}>{recruiter.designation}</span></td>
                        <td className="px-4">
                          {company && (
                            <div className="flex items-center gap-2">
                              <CompanyAvatar name={company.name} logo={company.logo} size="sm" />
                              <span className="text-xs font-medium text-white">{company.name}</span>
                            </div>
                          )}
                        </td>
                        <td className="px-4"><PriorityBadge priority={recruiter.priority} /></td>
                        <td className="px-4">
                          <div className="flex items-center gap-1.5">
                            <Mail size={11} style={{ color: recruiter.emailStatus === 'verified' ? '#10b981' : recruiter.emailStatus === 'bounced' ? '#ef4444' : '#f59e0b' }} />
                            <StatusBadge status={recruiter.emailStatus} />
                          </div>
                        </td>
                        <td className="px-4">
                          <div className="flex items-center gap-1.5">
                            <Phone size={11} style={{ color: recruiter.phoneStatus === 'verified' ? '#10b981' : '#f59e0b' }} />
                            <StatusBadge status={recruiter.phoneStatus} />
                          </div>
                        </td>
                        <td className="px-4">
                          <span className="text-xs" style={{ color: '#484f58' }}>{recruiter.lastActive}</span>
                        </td>
                        <td className="px-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                            style={{ color: '#60a5fa', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}
                            onClick={e => { e.stopPropagation(); setSelected(recruiter.id); }}
                          >
                            <User size={10} />
                            Profile
                          </motion.button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 flex items-center justify-between border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              <span className="text-xs" style={{ color: '#484f58' }}>Showing {filtered.length} of {recruiters.length} recruiters</span>
            </div>
          </Card>
        </div>

        {/* Profile Panel */}
        {selected && selectedRecruiter && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="w-72 flex-shrink-0"
          >
            <Card>
              <div className="text-center mb-4">
                <RecruiterAvatar initials={selectedRecruiter.photo} size="lg" />
                <h3 className="text-base font-bold text-white mt-3">{selectedRecruiter.name}</h3>
                <p className="text-xs mt-0.5" style={{ color: '#8b949e' }}>{selectedRecruiter.designation}</p>
                {selectedCompany && (
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <CompanyAvatar name={selectedCompany.name} logo={selectedCompany.logo} size="sm" />
                    <span className="text-xs font-medium" style={{ color: '#8b949e' }}>{selectedCompany.name}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3 border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 text-xs" style={{ color: '#8b949e' }}>
                      <Mail size={12} />
                      Email
                    </div>
                    <StatusBadge status={selectedRecruiter.emailStatus} />
                  </div>
                  <div className="text-xs font-medium text-white truncate">{selectedRecruiter.email}</div>
                </div>

                <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 text-xs" style={{ color: '#8b949e' }}>
                      <Phone size={12} />
                      Phone
                    </div>
                    <StatusBadge status={selectedRecruiter.phoneStatus} />
                  </div>
                  <div className="text-xs font-medium text-white">{selectedRecruiter.phone}</div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: '#8b949e' }}>Priority</span>
                  <PriorityBadge priority={selectedRecruiter.priority} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: '#8b949e' }}>Last Active</span>
                  <span className="text-xs font-medium text-white">{selectedRecruiter.lastActive}</span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <button className="w-full py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
                  Send Email
                </button>
                <button className="w-full py-2.5 rounded-xl text-sm font-semibold" style={{ color: '#60a5fa', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
                  View LinkedIn
                </button>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
