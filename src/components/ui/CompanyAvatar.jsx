const sizeMap = {
  sm: { container: 'w-8 h-8 rounded-lg', text: 'text-xs' },
  md: { container: 'w-10 h-10 rounded-xl', text: 'text-sm' },
  lg: { container: 'w-14 h-14 rounded-2xl', text: 'text-lg' },
};

const colorMap = {
  MS: 'linear-gradient(135deg, #00a1f1, #0078d4)',
  G: 'linear-gradient(135deg, #4285f4, #34a853)',
  Ad: 'linear-gradient(135deg, #ff0000, #cc0000)',
  F: 'linear-gradient(135deg, #2874f0, #1a56c0)',
  Z: 'linear-gradient(135deg, #e23744, #b01c2a)',
  In: 'linear-gradient(135deg, #007cc3, #005a8e)',
  Rz: 'linear-gradient(135deg, #528FF0, #3a6fd8)',
  SF: 'linear-gradient(135deg, #00a1e0, #0070a8)',
};

export function CompanyAvatar({ logo, size = 'md' }) {
  const s = sizeMap[size] || sizeMap.md;
  const gradient = colorMap[logo] || 'linear-gradient(135deg, #374151, #1f2937)';

  return (
    <div
      className={`${s.container} flex items-center justify-center font-bold text-white flex-shrink-0`}
      style={{ background: gradient, boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
    >
      <span className={s.text}>{logo}</span>
    </div>
  );
}

export function RecruiterAvatar({ initials, size = 'md' }) {
  const s = sizeMap[size] || sizeMap.md;
  return (
    <div
      className={`${s.container} flex items-center justify-center font-semibold text-white flex-shrink-0`}
      style={{ background: 'linear-gradient(135deg, #374151, #1f2937)', border: '2px solid rgba(255,255,255,0.08)' }}
    >
      <span className={`${s.text} font-bold`}>{initials}</span>
    </div>
  );
}
