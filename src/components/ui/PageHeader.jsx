import { motion } from 'framer-motion';

export function PageHeader({ title, subtitle, actions, badge }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-start justify-between mb-6"
    >
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-white tracking-tight">{title}</h1>
          {badge && (
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
              style={{ background: `${badge.color}18`, color: badge.color, border: `1px solid ${badge.color}30` }}
            >
              {badge.label}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-sm mt-1" style={{ color: '#8b949e' }}>{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </motion.div>
  );
}
