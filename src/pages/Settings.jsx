import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Key, Bell, Palette, Shield, ChevronRight,
  Eye, EyeOff, Check, Zap,
  AlertCircle, CheckCircle2,
} from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const apiKeys = [
  {
    id: 'apollo',
    label: 'Apollo.io',
    description: 'Contact enrichment and email discovery',
    icon: '🔍',
    color: '#3b82f6',
    placeholder: 'ap-key-xxxxxxxxxxxxxxxx',
    status: 'connected',
    plan: 'Pro',
  },
  {
    id: 'signalhire',
    label: 'SignalHire',
    description: 'Phone number verification and contact lookup',
    icon: '📞',
    color: '#10b981',
    placeholder: 'sh-xxxxxxxxxxxxxxxxxxxx',
    status: 'connected',
    plan: 'Business',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn API',
    description: 'LinkedIn data access and profile scraping',
    icon: '💼',
    color: '#0077b5',
    placeholder: 'linkedin-api-key-xxxxxxxx',
    status: 'disconnected',
    plan: 'Enterprise',
  },
  {
    id: 'openai',
    label: 'OpenAI',
    description: 'GPT-4o for intent classification and summaries',
    icon: '🤖',
    color: '#10b981',
    placeholder: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    status: 'connected',
    plan: 'GPT-4o',
  },
  {
    id: 'claude',
    label: 'Anthropic Claude',
    description: 'Claude 3.5 Sonnet for research and analysis',
    icon: '✨',
    color: '#8b5cf6',
    placeholder: 'sk-ant-xxxxxxxxxxxxxxxxxxxxxxxx',
    status: 'connected',
    plan: 'Claude 3.5',
  },
];

const notificationSettings = [
  { id: 'new_company', label: 'New company detected', description: 'Alert when AI finds a new hiring company', enabled: true },
  { id: 'recruiter_found', label: 'Recruiter contact discovered', description: 'Alert when a verified recruiter is found', enabled: true },
  { id: 'automation_done', label: 'Automation completed', description: 'Notify when an automation task finishes', enabled: true },
  { id: 'email_verified', label: 'Email verification', description: 'Alert when email accuracy drops below 90%', enabled: false },
  { id: 'weekly_report', label: 'Weekly summary report', description: 'Receive weekly digest every Monday', enabled: true },
  { id: 'quota_alert', label: 'API quota warning', description: 'Alert when API usage hits 80%', enabled: false },
];

export function Settings() {
  const [activeTab, setActiveTab] = useState('API Keys');
  const [showKeys, setShowKeys] = useState({});
  const [notifications, setNotifications] = useState(notificationSettings);
  const [saved, setSaved] = useState(false);

  const toggleKey = (id) => setShowKeys(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleNotif = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, enabled: !n.enabled } : n));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Manage your account, integrations, and preferences"
        actions={
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white"
            style={{ background: saved ? '#10b981' : 'linear-gradient(135deg, #3b82f6, #8b5cf6)', transition: 'background 0.3s' }}
          >
            {saved ? <Check size={14} /> : <Zap size={14} />}
            {saved ? 'Saved!' : 'Save Changes'}
          </motion.button>
        }
      />

      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <div className="w-52 flex-shrink-0">
          <Card>
            <nav className="space-y-1">
              {[
                { tab: 'API Keys', icon: <Key size={15} /> },
                { tab: 'Notifications', icon: <Bell size={15} /> },
                { tab: 'Appearance', icon: <Palette size={15} /> },
                { tab: 'Security', icon: <Shield size={15} /> },
              ].map(({ tab, icon }) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                  style={{
                    background: activeTab === tab ? 'rgba(59,130,246,0.1)' : 'transparent',
                    color: activeTab === tab ? '#60a5fa' : '#8b949e',
                  }}
                >
                  <span className="flex items-center gap-2.5">
                    <span style={{ color: activeTab === tab ? '#60a5fa' : '#484f58' }}>{icon}</span>
                    {tab}
                  </span>
                  {activeTab === tab && <ChevronRight size={13} />}
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'API Keys' && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
              <div className="mb-4 p-4 rounded-xl flex items-start gap-3" style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)' }}>
                <AlertCircle size={15} className="mt-0.5 flex-shrink-0" style={{ color: '#3b82f6' }} />
                <div>
                  <div className="text-sm font-semibold text-white">API Keys are encrypted</div>
                  <div className="text-xs mt-0.5" style={{ color: '#8b949e' }}>All keys are stored with AES-256 encryption. Only you can view or modify them.</div>
                </div>
              </div>

              <div className="space-y-3">
                {apiKeys.map((api, i) => (
                  <motion.div
                    key={api.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="rounded-2xl p-5"
                    style={{ background: 'rgba(13,17,23,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{api.icon}</div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">{api.label}</span>
                            <Badge variant={api.status === 'connected' ? 'success' : 'neutral'} dot>{api.status}</Badge>
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.06)', color: '#8b949e' }}>{api.plan}</span>
                          </div>
                          <p className="text-xs mt-0.5" style={{ color: '#8b949e' }}>{api.description}</p>
                        </div>
                      </div>
                      {api.status === 'connected' && (
                        <CheckCircle2 size={16} style={{ color: '#10b981' }} />
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type={showKeys[api.id] ? 'text' : 'password'}
                        defaultValue={api.placeholder}
                        placeholder={api.placeholder}
                        className="input-dark w-full pr-10 font-mono text-xs"
                      />
                      <button
                        onClick={() => toggleKey(api.id)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                        style={{ color: '#484f58' }}
                      >
                        {showKeys[api.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <button className="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors" style={{ color: '#60a5fa', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
                        Test Connection
                      </button>
                      <button className="text-xs font-medium px-3 py-1.5 rounded-lg" style={{ color: '#8b949e', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        Regenerate
                      </button>
                      {api.status === 'disconnected' && (
                        <button className="text-xs font-medium px-3 py-1.5 rounded-lg ml-auto" style={{ color: '#10b981', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
                          Connect
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'Notifications' && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
              <Card>
                <CardHeader title="Notification Preferences" subtitle="Choose what alerts you receive" />
                <div className="space-y-1">
                  {notifications.map((n, i) => (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center justify-between p-4 rounded-xl hover:bg-white/[0.02] transition-colors"
                      style={{ border: '1px solid transparent' }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center mt-0.5" style={{ background: 'rgba(255,255,255,0.04)' }}>
                          <Bell size={13} style={{ color: n.enabled ? '#3b82f6' : '#484f58' }} />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{n.label}</div>
                          <div className="text-xs mt-0.5" style={{ color: '#8b949e' }}>{n.description}</div>
                        </div>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleNotif(n.id)}
                        className="relative w-11 h-6 rounded-full transition-all flex-shrink-0"
                        style={{ background: n.enabled ? '#3b82f6' : 'rgba(255,255,255,0.08)' }}
                      >
                        <motion.div
                          animate={{ x: n.enabled ? 20 : 2 }}
                          transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                          className="absolute top-1 w-4 h-4 rounded-full bg-white"
                        />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'Appearance' && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
              <Card>
                <CardHeader title="Theme" subtitle="Choose your preferred visual style" />
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {['Dark', 'Darker', 'OLED'].map(theme => (
                    <button
                      key={theme}
                      className="p-4 rounded-xl text-center text-sm font-semibold transition-all"
                      style={{
                        background: theme === 'Dark' ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${theme === 'Dark' ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.06)'}`,
                        color: theme === 'Dark' ? '#60a5fa' : '#8b949e',
                      }}
                    >
                      {theme}
                      {theme === 'Dark' && <div className="text-[10px] font-normal mt-1" style={{ color: '#3b82f6' }}>Active</div>}
                    </button>
                  ))}
                </div>

                <CardHeader title="Accent Color" />
                <div className="flex gap-3">
                  {['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#f43f5e', '#06b6d4'].map(color => (
                    <button
                      key={color}
                      className="w-8 h-8 rounded-xl transition-all"
                      style={{
                        background: color,
                        boxShadow: color === '#3b82f6' ? `0 0 12px ${color}60` : 'none',
                        outline: color === '#3b82f6' ? `2px solid ${color}` : 'none',
                        outlineOffset: '3px',
                      }}
                    />
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'Security' && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
              <Card>
                <CardHeader title="Security Settings" subtitle="Manage authentication and access" />
                <div className="space-y-4">
                  {[
                    { label: 'Two-Factor Authentication', desc: 'Protect your account with 2FA', enabled: true },
                    { label: 'Session Management', desc: 'View and revoke active sessions', enabled: false },
                    { label: 'IP Whitelist', desc: 'Restrict access to specific IP addresses', enabled: false },
                  ].map(s => (
                    <div key={s.label} className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                      <div>
                        <div className="text-sm font-semibold text-white">{s.label}</div>
                        <div className="text-xs mt-0.5" style={{ color: '#8b949e' }}>{s.desc}</div>
                      </div>
                      <Badge variant={s.enabled ? 'success' : 'neutral'} dot>{s.enabled ? 'Enabled' : 'Disabled'}</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
