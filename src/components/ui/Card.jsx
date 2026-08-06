import { motion } from 'framer-motion';

export function Card({ children, className = '', hover = false, glass = false, padding = 'p-5', onClick }) {
  const baseStyle = {
    background: glass ? 'rgba(22,27,39,0.5)' : 'rgba(13,17,23,0.8)',
    border: '1px solid rgba(255,255,255,0.06)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
  };

  if (hover || onClick) {
    return (
      <motion.div
        whileHover={{ y: -2, boxShadow: '0 8px 32px rgba(0,0,0,0.25)' }}
        transition={{ duration: 0.15 }}
        onClick={onClick}
        className={`rounded-2xl ${padding} ${onClick ? 'cursor-pointer' : ''} ${className}`}
        style={baseStyle}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`rounded-2xl ${padding} ${className}`} style={baseStyle}>
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, actions }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        {subtitle && <p className="text-xs mt-0.5" style={{ color: '#8b949e' }}>{subtitle}</p>}
      </div>
      {actions && <div>{actions}</div>}
    </div>
  );
}
