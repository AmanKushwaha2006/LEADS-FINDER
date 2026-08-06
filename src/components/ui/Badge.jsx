const variants = {
  success: { bg: 'rgba(16,185,129,0.1)', color: '#10b981', border: 'rgba(16,185,129,0.25)' },
  warning: { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: 'rgba(245,158,11,0.25)' },
  danger: { bg: 'rgba(239,68,68,0.1)', color: '#ef4444', border: 'rgba(239,68,68,0.25)' },
  info: { bg: 'rgba(59,130,246,0.1)', color: '#3b82f6', border: 'rgba(59,130,246,0.25)' },
  neutral: { bg: 'rgba(139,148,158,0.1)', color: '#8b949e', border: 'rgba(139,148,158,0.2)' },
  purple: { bg: 'rgba(139,92,246,0.1)', color: '#8b5cf6', border: 'rgba(139,92,246,0.25)' },
};

export function Badge({ children, variant = 'neutral', dot = false, className = '' }) {
  const v = variants[variant] || variants.neutral;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${className}`}
      style={{ background: v.bg, color: v.color, border: `1px solid ${v.border}` }}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: v.color }} />
      )}
      {children}
    </span>
  );
}

export function PriorityBadge({ priority }) {
  const map = {
    high: 'danger',
    medium: 'warning',
    low: 'neutral',
  };
  return <Badge variant={map[priority]} dot>{priority.charAt(0).toUpperCase() + priority.slice(1)}</Badge>;
}

export function StatusBadge({ status }) {
  const map = {
    active: 'success',
    inactive: 'neutral',
    paused: 'warning',
    running: 'info',
    queued: 'neutral',
    completed: 'success',
    failed: 'danger',
    verified: 'success',
    unverified: 'warning',
    bounced: 'danger',
  };
  return (
    <Badge variant={map[status] || 'neutral'} dot>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}
