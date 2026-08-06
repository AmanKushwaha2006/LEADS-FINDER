import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

function useCountUp(end, duration = 1800, delay = 0) {
  const [count, setCount] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let startTime = null;
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * end));
        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        }
      };
      frameRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [end, duration, delay]);

  return count;
}

export function StatCard({ label, value, change, suffix = '', prefix = '', icon, color, delay = 0, description }) {
  const count = useCountUp(value, 1600, delay);
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay / 1000 }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      className="relative rounded-2xl p-5 cursor-default overflow-hidden"
      style={{
        background: 'rgba(13,17,23,0.8)',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
      }}
    >
      {/* Subtle glow background */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-10 pointer-events-none"
        style={{ background: color, transform: 'translate(30%, -30%)' }}
      />

      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}18`, border: `1px solid ${color}30` }}
        >
          <span style={{ color }}>{icon}</span>
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg`}
          style={{
            background: isPositive ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
            color: isPositive ? '#10b981' : '#ef4444',
          }}
        >
          {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {isPositive ? '+' : ''}{change}%
        </div>
      </div>

      <div className="text-2xl font-bold text-white mb-1 font-mono tracking-tight">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-xs font-medium" style={{ color: '#8b949e' }}>{label}</div>
      {description && (
        <div className="text-[11px] mt-1" style={{ color: '#484f58' }}>{description}</div>
      )}
    </motion.div>
  );
}
