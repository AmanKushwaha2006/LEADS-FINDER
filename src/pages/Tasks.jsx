import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus, CheckCircle2, Circle, Clock,
  AlertCircle, Tag, User, Calendar, MoreHorizontal,
} from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge, PriorityBadge } from '../components/ui/Badge';

const initialTasks = [
  { id: '1', title: "Verify Priya Sharma's contact at Microsoft", priority: 'high', status: 'pending', assignee: 'Admin', dueDate: 'Today', tag: 'Recruiter', done: false },
  { id: '2', title: 'Add Google STEP 2024 to campaign list', priority: 'high', status: 'pending', assignee: 'Admin', dueDate: 'Today', tag: 'Campaign', done: false },
  { id: '3', title: 'Export Infosys recruiter emails to CRM', priority: 'medium', status: 'in-progress', assignee: 'Admin', dueDate: 'Jan 16', tag: 'Export', done: false },
  { id: '4', title: 'Update Flipkart campus history notes', priority: 'medium', status: 'pending', assignee: 'Admin', dueDate: 'Jan 16', tag: 'Notes', done: false },
  { id: '5', title: 'Schedule automation for Salesforce Futureforce', priority: 'low', status: 'pending', assignee: 'Admin', dueDate: 'Jan 17', tag: 'Automation', done: false },
  { id: '6', title: 'Review Adobe recruiter contact change', priority: 'medium', status: 'completed', assignee: 'Admin', dueDate: 'Jan 14', tag: 'Recruiter', done: true },
  { id: '7', title: 'Generate monthly report for December', priority: 'low', status: 'completed', assignee: 'Admin', dueDate: 'Jan 01', tag: 'Report', done: true },
];

const tagColors = {
  Recruiter: '#3b82f6',
  Campaign: '#8b5cf6',
  Export: '#10b981',
  Notes: '#f59e0b',
  Automation: '#06b6d4',
  Report: '#f43f5e',
};

export function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done, status: !t.done ? 'completed' : 'pending' } : t));
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks(prev => [...prev, {
      id: Date.now().toString(),
      title: newTask,
      priority: 'medium',
      status: 'pending',
      assignee: 'Admin',
      dueDate: 'Today',
      tag: 'Notes',
      done: false,
    }]);
    setNewTask('');
  };

  const filtered = tasks.filter(t => {
    if (filter === 'active') return !t.done;
    if (filter === 'completed') return t.done;
    return true;
  });

  const pending = tasks.filter(t => !t.done).length;
  const done = tasks.filter(t => t.done).length;

  return (
    <div>
      <PageHeader
        title="Tasks"
        subtitle={`${pending} pending · ${done} completed`}
        actions={
          <div className="flex items-center gap-2">
            {['all', 'active', 'completed'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg capitalize transition-all"
                style={{
                  background: filter === f ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.04)',
                  color: filter === f ? '#60a5fa' : '#8b949e',
                  border: `1px solid ${filter === f ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.06)'}`,
                }}
              >
                {f}
              </button>
            ))}
          </div>
        }
      />

      {/* Progress */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {[
          { label: 'Pending', count: tasks.filter(t => t.status === 'pending' && !t.done).length, color: '#f59e0b', icon: <Clock size={14} /> },
          { label: 'In Progress', count: tasks.filter(t => t.status === 'in-progress').length, color: '#3b82f6', icon: <AlertCircle size={14} /> },
          { label: 'Completed', count: done, color: '#10b981', icon: <CheckCircle2 size={14} /> },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="rounded-xl p-4 flex items-center gap-3"
            style={{ background: 'rgba(13,17,23,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${s.color}15` }}>
              <span style={{ color: s.color }}>{s.icon}</span>
            </div>
            <div>
              <div className="text-xl font-bold text-white">{s.count}</div>
              <div className="text-xs" style={{ color: '#484f58' }}>{s.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Task List */}
        <div className="col-span-2">
          <Card>
            {/* Add Task */}
            <div className="flex items-center gap-3 mb-5 pb-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              <div className="w-5 h-5 rounded-full border-2 flex-shrink-0" style={{ borderColor: '#21262d' }} />
              <input
                type="text"
                placeholder="Add a new task..."
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addTask()}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-[#484f58] text-white"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addTask}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg"
                style={{ color: '#60a5fa', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}
              >
                <Plus size={12} />
                Add
              </motion.button>
            </div>

            {/* Tasks */}
            <div className="space-y-1">
              {filtered.map((task, i) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-xl group transition-all hover:bg-white/[0.02] cursor-pointer"
                  onClick={() => toggleTask(task.id)}
                >
                  <div className="flex-shrink-0">
                    {task.done ? (
                      <CheckCircle2 size={18} style={{ color: '#10b981' }} />
                    ) : (
                      <Circle size={18} style={{ color: '#484f58' }} className="group-hover:text-blue-400 transition-colors" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium ${task.done ? 'line-through' : 'text-white'}`} style={{ color: task.done ? '#484f58' : undefined }}>
                      {task.title}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1 text-[10px]" style={{ color: '#484f58' }}>
                        <Calendar size={9} />
                        {task.dueDate}
                      </div>
                      <div className="flex items-center gap-1 text-[10px]" style={{ color: '#484f58' }}>
                        <User size={9} />
                        {task.assignee}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background: `${tagColors[task.tag] || '#484f58'}15`,
                        color: tagColors[task.tag] || '#8b949e',
                        border: `1px solid ${tagColors[task.tag] || '#484f58'}25`,
                      }}
                    >
                      <Tag size={8} className="inline mr-1" />
                      {task.tag}
                    </span>
                    <PriorityBadge priority={task.priority} />
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-white/[0.05]" onClick={e => e.stopPropagation()}>
                      <MoreHorizontal size={13} style={{ color: '#484f58' }} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#484f58' }}>By Priority</div>
            {['high', 'medium', 'low'].map(p => {
              const count = tasks.filter(t => t.priority === p && !t.done).length;
              const total = tasks.filter(t => !t.done).length;
              const pct = total > 0 ? (count / total) * 100 : 0;
              const colors = { high: '#ef4444', medium: '#f59e0b', low: '#8b949e' };
              return (
                <div key={p} className="mb-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs capitalize font-medium" style={{ color: '#8b949e' }}>{p}</span>
                    <span className="text-xs font-bold text-white">{count}</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: colors[p] }}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                  </div>
                </div>
              );
            })}
          </Card>

          <Card>
            <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#484f58' }}>By Tag</div>
            {Object.entries(tagColors).map(([tag, color]) => {
              const count = tasks.filter(t => t.tag === tag).length;
              return count > 0 ? (
                <div key={tag} className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                    <span className="text-xs" style={{ color: '#8b949e' }}>{tag}</span>
                  </div>
                  <Badge variant="neutral">{count}</Badge>
                </div>
              ) : null;
            })}
          </Card>
        </div>
      </div>
    </div>
  );
}
