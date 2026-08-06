import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Download, FileSpreadsheet, FileText, File,
  Calendar, Building2, Users, CheckCircle2,
  Loader2, ArrowRight,
} from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';

const reportTypes = [
  {
    id: 'excel',
    label: 'Excel Report',
    description: 'Complete dataset with all companies, recruiters, and contacts in XLSX format',
    icon: <FileSpreadsheet size={22} />,
    color: '#10b981',
    format: '.xlsx',
    size: '~2.4 MB',
    features: ['All companies', 'Recruiter contacts', 'Email list', 'Hiring timeline'],
  },
  {
    id: 'csv',
    label: 'CSV Export',
    description: 'Flat file export of all data — compatible with any CRM or tool',
    icon: <File size={22} />,
    color: '#3b82f6',
    format: '.csv',
    size: '~850 KB',
    features: ['Comma separated', 'Universal format', 'CRM ready', 'Mail merge ready'],
  },
  {
    id: 'pdf',
    label: 'PDF Report',
    description: 'Formatted report with charts, company profiles, and recruiter details',
    icon: <FileText size={22} />,
    color: '#f59e0b',
    format: '.pdf',
    size: '~5.1 MB',
    features: ['Charts included', 'Company profiles', 'Branded template', 'Print ready'],
  },
];

const recentReports = [
  { name: 'Campus_Leads_Jan_2024.xlsx', size: '2.4 MB', date: 'Jan 15, 2024', type: 'excel', records: 248 },
  { name: 'Recruiters_Export_Jan14.csv', size: '820 KB', date: 'Jan 14, 2024', type: 'csv', records: 128 },
  { name: 'Monthly_Report_Dec_2023.pdf', size: '5.2 MB', date: 'Dec 31, 2023', type: 'pdf', records: 196 },
  { name: 'Hiring_Leads_Dec_2023.xlsx', size: '1.9 MB', date: 'Dec 28, 2023', type: 'excel', records: 182 },
];

export function Reports() {
  const [generating, setGenerating] = useState(null);
  const [generated, setGenerated] = useState([]);
  const [dateRange, setDateRange] = useState('this-month');

  const handleGenerate = (id) => {
    setGenerating(id);
    setTimeout(() => {
      setGenerating(null);
      setGenerated(prev => [...prev, id]);
    }, 2500);
  };

  return (
    <div>
      <PageHeader
        title="Reports"
        subtitle="Generate and download data exports in multiple formats"
        actions={
          <div className="flex items-center gap-2">
            <select
              value={dateRange}
              onChange={e => setDateRange(e.target.value)}
              className="input-dark text-sm"
            >
              <option value="today">Today</option>
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
              <option value="last-month">Last Month</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
        }
      />

      {/* Report Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {reportTypes.map((report, i) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl p-6 relative overflow-hidden"
            style={{ background: 'rgba(13,17,23,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-5 pointer-events-none" style={{ background: report.color, transform: 'translate(40%, -40%)' }} />

            <div className="flex items-start justify-between mb-5">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: `${report.color}15`, border: `1px solid ${report.color}25` }}
              >
                <span style={{ color: report.color }}>{report.icon}</span>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', color: '#8b949e' }}>
                {report.format}
              </span>
            </div>

            <h3 className="text-base font-bold text-white mb-1.5">{report.label}</h3>
            <p className="text-xs leading-relaxed mb-4" style={{ color: '#8b949e' }}>{report.description}</p>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {report.features.map(f => (
                <span key={f} className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.04)', color: '#8b949e', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <CheckCircle2 size={8} style={{ color: report.color }} />
                  {f}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between mb-4 text-xs" style={{ color: '#484f58' }}>
              <span>Estimated size: <strong className="text-white">{report.size}</strong></span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleGenerate(report.id)}
              disabled={generating === report.id}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all"
              style={{
                background: generated.includes(report.id)
                  ? 'rgba(16,185,129,0.15)'
                  : `${report.color}18`,
                border: `1px solid ${generated.includes(report.id) ? 'rgba(16,185,129,0.3)' : `${report.color}30`}`,
                color: generated.includes(report.id) ? '#10b981' : report.color,
              }}
            >
              {generating === report.id ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Generating...
                </>
              ) : generated.includes(report.id) ? (
                <>
                  <Download size={14} />
                  Download {report.format}
                </>
              ) : (
                <>
                  <ArrowRight size={14} />
                  Generate Report
                </>
              )}
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Companies in Report', value: '248', icon: <Building2 size={15} />, color: '#3b82f6' },
          { label: 'Recruiters Included', value: '128', icon: <Users size={15} />, color: '#8b5cf6' },
          { label: 'Verified Emails', value: '1,284', icon: <CheckCircle2 size={15} />, color: '#10b981' },
          { label: 'Date Range', value: 'Jan 2024', icon: <Calendar size={15} />, color: '#f59e0b' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            className="rounded-xl p-4 flex items-center gap-3"
            style={{ background: 'rgba(13,17,23,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${s.color}15` }}>
              <span style={{ color: s.color }}>{s.icon}</span>
            </div>
            <div>
              <div className="text-base font-bold text-white">{s.value}</div>
              <div className="text-[11px]" style={{ color: '#484f58' }}>{s.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Downloads */}
      <Card padding="p-0">
        <div className="px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <h3 className="text-sm font-semibold text-white">Recent Downloads</h3>
          <p className="text-xs mt-0.5" style={{ color: '#8b949e' }}>Previously generated reports</p>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {recentReports.map((report, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.06 }}
              className="px-5 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: report.type === 'excel' ? 'rgba(16,185,129,0.1)' : report.type === 'csv' ? 'rgba(59,130,246,0.1)' : 'rgba(245,158,11,0.1)',
                  }}
                >
                  {report.type === 'excel' ? <FileSpreadsheet size={15} style={{ color: '#10b981' }} /> : report.type === 'csv' ? <File size={15} style={{ color: '#3b82f6' }} /> : <FileText size={15} style={{ color: '#f59e0b' }} />}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{report.name}</div>
                  <div className="text-xs" style={{ color: '#484f58' }}>{report.records} records · {report.size}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs" style={{ color: '#484f58' }}>{report.date}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg"
                  style={{ color: '#60a5fa', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)' }}
                >
                  <Download size={11} />
                  Download
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}
