import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader } from '../components/ui/Card';
import { hiringTrends, industryData } from '../data/mockData';

const topCompanies = [
  { name: 'Microsoft', leads: 48, color: '#3b82f6' },
  { name: 'Infosys', leads: 42, color: '#8b5cf6' },
  { name: 'Flipkart', leads: 38, color: '#10b981' },
  { name: 'Google', leads: 35, color: '#f59e0b' },
  { name: 'Salesforce', leads: 28, color: '#06b6d4' },
  { name: 'Adobe', leads: 18, color: '#f43f5e' },
];

const recruiterDiscovery = [
  { month: 'Oct', found: 24, verified: 18 },
  { month: 'Nov', found: 38, verified: 29 },
  { month: 'Dec', found: 52, verified: 41 },
  { month: 'Jan', found: 68, verified: 54 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl px-4 py-3" style={{ background: '#161b27', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
        <div className="text-xs font-semibold text-white mb-2">{label}</div>
        {payload.map(p => (
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

export function Analytics() {
  return (
    <div>
      <PageHeader
        title="Analytics"
        subtitle="Data-driven insights into campus hiring activity"
        actions={
          <div className="flex items-center gap-2">
            {['7D', '30D', '90D', 'YTD'].map(p => (
              <button key={p} className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all" style={{ background: p === '30D' ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.04)', color: p === '30D' ? '#60a5fa' : '#8b949e', border: `1px solid ${p === '30D' ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.06)'}` }}>
                {p}
              </button>
            ))}
          </div>
        }
      />

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: 'Total Companies Tracked', value: '248', change: '+18%', color: '#3b82f6' },
          { label: 'Avg. Lead Accuracy', value: '94.2%', change: '+2.1%', color: '#10b981' },
          { label: 'Recruiter Discovery Rate', value: '78%', change: '+5%', color: '#8b5cf6' },
          { label: 'Emails Verified', value: '1,284', change: '+312', color: '#f59e0b' },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="rounded-2xl p-5"
            style={{ background: 'rgba(13,17,23,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="text-2xl font-bold text-white mb-1 font-mono">{kpi.value}</div>
            <div className="text-xs mb-2" style={{ color: '#8b949e' }}>{kpi.label}</div>
            <div className="text-xs font-semibold px-2 py-0.5 rounded-full inline-flex" style={{ background: `${kpi.color}15`, color: kpi.color }}>
              {kpi.change} this month
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Hiring Trends */}
        <div className="col-span-2">
          <Card>
            <CardHeader title="Hiring Trends" subtitle="Daily company and post discovery" />
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={hiringTrends} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="c1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="c2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: '#484f58', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#484f58', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="companies" name="Companies" stroke="#3b82f6" strokeWidth={2} fill="url(#c1)" dot={false} />
                <Area type="monotone" dataKey="posts" name="Hiring Posts" stroke="#10b981" strokeWidth={2} fill="url(#c2)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Industry Distribution */}
        <div>
          <Card>
            <CardHeader title="Industry Breakdown" subtitle="By company count" />
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={industryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                  labelLine={false}
                >
                  {industryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: '#161b27', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px' }}
                  labelStyle={{ color: '#fff' }}
                  itemStyle={{ color: '#8b949e' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {industryData.map(d => (
                <div key={d.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ background: d.color }} />
                    <span className="text-xs" style={{ color: '#8b949e' }}>{d.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-white">{d.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-2 gap-4">
        {/* Most Active Companies */}
        <Card>
          <CardHeader title="Most Active Companies" subtitle="By lead count generated" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={topCompanies} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
              <XAxis type="number" tick={{ fill: '#484f58', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#8b949e', fontSize: 12 }} axisLine={false} tickLine={false} width={75} />
              <Tooltip
                contentStyle={{ background: '#161b27', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px' }}
                labelStyle={{ color: '#fff' }}
                itemStyle={{ color: '#8b949e' }}
              />
              <Bar dataKey="leads" name="Leads" radius={[0, 4, 4, 0]}>
                {topCompanies.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Recruiter Discovery Rate */}
        <Card>
          <CardHeader title="Recruiter Discovery Rate" subtitle="Found vs verified per month" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={recruiterDiscovery} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#484f58', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#484f58', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: '12px' }} formatter={(value) => <span style={{ color: '#8b949e', fontSize: '12px' }}>{value}</span>} />
              <Bar dataKey="found" name="Found" fill="rgba(59,130,246,0.6)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="verified" name="Verified" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
