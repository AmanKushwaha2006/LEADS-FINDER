import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, Download, ExternalLink, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/ui/PageHeader';
import { CompanyAvatar } from '../components/ui/CompanyAvatar';
import { Badge, PriorityBadge, StatusBadge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { companies } from '../data/mockData';

export function Companies() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = companies.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.industry.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.hiringStatus === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div>
      <PageHeader
        title="Companies"
        subtitle={`${companies.length} companies tracked · ${companies.filter(c => c.hiringStatus === 'active').length} actively hiring`}
        actions={
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-xl" style={{ color: '#8b949e', background: 'rgba(22,27,39,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <Download size={14} />
              Export
            </button>
            <button className="flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-xl text-white" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', boxShadow: '0 4px 12px rgba(59,130,246,0.2)' }}>
              <Plus size={14} />
              Add Company
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
            placeholder="Search companies..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-dark w-full pl-9 text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          {['all', 'active', 'paused', 'inactive'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all capitalize"
              style={{
                background: statusFilter === s ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.04)',
                color: statusFilter === s ? '#60a5fa' : '#8b949e',
                border: `1px solid ${statusFilter === s ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              {s === 'all' ? 'All Status' : s}
            </button>
          ))}
        </div>
        <div className="relative ml-auto">
          <select
            className="input-dark pr-8 text-sm appearance-none"
          >
            <option>Sort: Priority</option>
            <option>Sort: Name</option>
            <option>Sort: Open Roles</option>
            <option>Sort: Last Active</option>
          </select>
          <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#484f58' }} />
        </div>
        <button className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-xl" style={{ color: '#8b949e', background: 'rgba(22,27,39,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <Filter size={14} />
          Filters
        </button>
      </div>

      {/* Table */}
      <Card padding="p-0">
        <div className="overflow-x-auto">
          <table className="data-table w-full">
            <thead>
              <tr>
                <th className="text-left px-5">Company</th>
                <th className="text-left px-4">Industry</th>
                <th className="text-left px-4">Location</th>
                <th className="text-left px-4">Open Roles</th>
                <th className="text-left px-4">Freshers</th>
                <th className="text-left px-4">Recruiter</th>
                <th className="text-left px-4">Growth</th>
                <th className="text-left px-4">Priority</th>
                <th className="text-left px-4">Status</th>
                <th className="text-left px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((company, i) => (
                <motion.tr
                  key={company.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/companies/${company.id}`)}
                >
                  <td className="px-5">
                    <div className="flex items-center gap-3">
                      <CompanyAvatar name={company.name} logo={company.logo} size="sm" />
                      <div>
                        <div className="text-sm font-semibold text-white">{company.name}</div>
                        <div className="text-[11px]" style={{ color: '#484f58' }}>{company.website}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4"><span className="text-xs" style={{ color: '#8b949e' }}>{company.industry}</span></td>
                  <td className="px-4"><span className="text-xs" style={{ color: '#8b949e' }}>{company.location}</span></td>
                  <td className="px-4"><span className="text-sm font-bold text-white">{company.openRoles}</span></td>
                  <td className="px-4">
                    <Badge variant={company.hiringFreshers ? 'success' : 'neutral'} dot>{company.hiringFreshers ? 'Yes' : 'No'}</Badge>
                  </td>
                  <td className="px-4">
                    <Badge variant={company.recruiterFound ? 'info' : 'warning'} dot>{company.recruiterFound ? 'Found' : 'Searching'}</Badge>
                  </td>
                  <td className="px-4">
                    <span className="text-sm font-bold" style={{ color: company.growth >= 0 ? '#10b981' : '#ef4444' }}>
                      {company.growth >= 0 ? '+' : ''}{company.growth}%
                    </span>
                  </td>
                  <td className="px-4"><PriorityBadge priority={company.priority} /></td>
                  <td className="px-4"><StatusBadge status={company.hiringStatus} /></td>
                  <td className="px-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={e => { e.stopPropagation(); navigate(`/companies/${company.id}`); }}
                      className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                      style={{ color: '#60a5fa', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}
                    >
                      <ExternalLink size={10} />
                      Open
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 flex items-center justify-between border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <span className="text-xs" style={{ color: '#484f58' }}>Showing {filtered.length} of {companies.length} companies</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map(p => (
              <button key={p} className="w-7 h-7 text-xs rounded-lg" style={{ background: p === 1 ? 'rgba(59,130,246,0.15)' : 'transparent', color: p === 1 ? '#60a5fa' : '#484f58' }}>{p}</button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
