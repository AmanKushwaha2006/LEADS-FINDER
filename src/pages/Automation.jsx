import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Pause, Square, RefreshCw, Bot, Cpu, Globe,
  CheckCircle2, Clock, Terminal,
} from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { Badge } from '../components/ui/Badge';
import { Card, CardHeader } from '../components/ui/Card';
import { automationLogs } from '../data/mockData';

const queue = [
  { id: 1, name: 'LinkedIn Campus Hiring Scrape', status: 'running', progress: 72 },
  { id: 2, name: 'Apollo.io Contact Enrichment', status: 'queued', progress: 0 },
  { id: 3, name: 'SignalHire Phone Verification', status: 'queued', progress: 0 },
  { id: 4, name: 'Career Page Monitoring — 15 sites', status: 'queued', progress: 0 },
  { id: 5, name: 'Email Accuracy Validation', status: 'queued', progress: 0 },
];

const completed = [
  { id: 6, name: 'Infosys Instep 2024 Data Collection', time: '9:30 AM', leads: 48 },
  { id: 7, name: 'Google Campus Recruiter Discovery', time: '8:45 AM', leads: 12 },
  { id: 8, name: 'Microsoft HR Contact Verification', time: '8:00 AM', leads: 6 },
];

export function Automation() {
  const [isRunning, setIsRunning] = useState(true);
  const [logs, setLogs] = useState(automationLogs.slice(0, 8));

  useEffect(() => {
    if (!isRunning) return;
    let count = 8;
    const interval = setInterval(() => {
      const next = count < automationLogs.length ? count + 1 : count;
      count = next;
      setLogs(automationLogs.slice(0, next));
    }, 2000);
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div>
      <PageHeader
        title="Automation"
        subtitle="AI-powered data collection and contact discovery engine"
        badge={{ label: isRunning ? 'Running' : 'Paused', color: isRunning ? '#10b981' : '#f59e0b' }}
        actions={
          <div className="flex items-center gap-2">
            {!isRunning ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsRunning(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 4px 12px rgba(16,185,129,0.2)' }}
              >
                <Play size={14} />
                Resume
              </motion.button>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsRunning(false)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold"
                  style={{ color: '#f59e0b', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)' }}
                >
                  <Pause size={14} />
                  Pause
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold"
                  style={{ color: '#ef4444', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)' }}
                >
                  <Square size={14} />
                  Stop
                </motion.button>
              </>
            )}
          </div>
        }
      />

      {/* Status Cards */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: 'Browser Status', value: isRunning ? 'Connected' : 'Standby', icon: <Globe size={16} />, color: isRunning ? '#10b981' : '#f59e0b', status: isRunning ? 'active' : 'idle' },
          { label: 'AI Engine', value: 'GPT-4o Active', icon: <Bot size={16} />, color: '#8b5cf6', status: 'active' },
          { label: 'Current Task', value: 'LinkedIn Scrape', icon: <Cpu size={16} />, color: '#3b82f6', status: 'running' },
          { label: 'Tasks in Queue', value: '4 pending', icon: <Clock size={16} />, color: '#f59e0b', status: 'queued' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="rounded-2xl p-4"
            style={{ background: 'rgba(13,17,23,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${s.color}15`, border: `1px solid ${s.color}25` }}>
                <span style={{ color: s.color }}>{s.icon}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {isRunning && <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: s.color }} />}
                <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: s.color }}>
                  {s.status}
                </span>
              </div>
            </div>
            <div className="text-sm font-bold text-white">{s.value}</div>
            <div className="text-[11px] mt-0.5" style={{ color: '#484f58' }}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Task Queue */}
        <div className="col-span-1">
          <Card>
            <CardHeader title="Task Queue" subtitle={`${queue.length} tasks`} />
            <div className="space-y-2">
              {queue.map((task, i) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="p-3 rounded-xl"
                  style={{
                    background: task.status === 'running' ? 'rgba(59,130,246,0.06)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${task.status === 'running' ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.04)'}`,
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-medium text-white leading-snug flex-1 pr-2">{task.name}</span>
                    <Badge variant={task.status === 'running' ? 'info' : 'neutral'}>{task.status}</Badge>
                  </div>
                  {task.status === 'running' && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px]" style={{ color: '#484f58' }}>Progress</span>
                        <span className="text-[10px] font-mono font-bold" style={{ color: '#3b82f6' }}>{task.progress}%</span>
                      </div>
                      <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' }}
                          initial={{ width: 0 }}
                          animate={{ width: `${task.progress}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              <div className="text-xs font-semibold text-white mb-2">Completed Today</div>
              {completed.map(c => (
                <div key={c.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} style={{ color: '#10b981' }} />
                    <span className="text-xs text-white truncate max-w-[140px]">{c.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold" style={{ color: '#10b981' }}>+{c.leads} leads</div>
                    <div className="text-[10px]" style={{ color: '#484f58' }}>{c.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Live Logs */}
        <div className="col-span-2">
          <Card padding="p-0">
            <div className="px-5 py-4 flex items-center justify-between border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              <div className="flex items-center gap-2">
                <Terminal size={15} style={{ color: '#8b949e' }} />
                <h3 className="text-sm font-semibold text-white">Live Logs</h3>
                {isRunning && (
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-semibold" style={{ color: '#10b981' }}>Streaming</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg" style={{ color: '#8b949e', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <RefreshCw size={11} />
                  Clear
                </button>
              </div>
            </div>

            <div
              className="p-4 font-mono text-xs overflow-y-auto"
              style={{ maxHeight: '420px', background: '#060910' }}
            >
              <AnimatePresence>
                {logs.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex gap-3 mb-2 leading-relaxed"
                  >
                    <span className="flex-shrink-0 font-mono" style={{ color: '#484f58' }}>[{log.time}]</span>
                    <span
                      className="flex-shrink-0 w-14 font-bold uppercase text-[10px]"
                      style={{
                        color: log.type === 'success' ? '#10b981' : log.type === 'warning' ? '#f59e0b' : log.type === 'error' ? '#ef4444' : '#3b82f6',
                      }}
                    >
                      [{log.type}]
                    </span>
                    <span style={{ color: log.type === 'success' ? '#c9d1d9' : log.type === 'warning' ? '#f0c98b' : '#8b949e' }}>
                      {log.message}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isRunning && (
                <div className="flex items-center gap-2 mt-1">
                  <span style={{ color: '#484f58' }}>›</span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-blue-400"
                  >
                    _
                  </motion.span>
                </div>
              )}
            </div>

            <div className="px-5 py-3 flex items-center justify-between border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-xs"><div className="w-2 h-2 rounded-full" style={{ background: '#10b981' }} /><span style={{ color: '#8b949e' }}>Success: {logs.filter(l => l.type === 'success').length}</span></div>
                <div className="flex items-center gap-1.5 text-xs"><div className="w-2 h-2 rounded-full" style={{ background: '#f59e0b' }} /><span style={{ color: '#8b949e' }}>Warnings: {logs.filter(l => l.type === 'warning').length}</span></div>
                <div className="flex items-center gap-1.5 text-xs"><div className="w-2 h-2 rounded-full" style={{ background: '#3b82f6' }} /><span style={{ color: '#8b949e' }}>Info: {logs.filter(l => l.type === 'info').length}</span></div>
              </div>
              <span className="text-xs" style={{ color: '#484f58' }}>{logs.length} entries</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
