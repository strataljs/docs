interface GlowBackgroundProps {
  className?: string;
  showDotGrid?: boolean;
  glowPosition?: 'center' | 'top' | 'top-right';
  glowColor?: string;
  glowOpacity?: number;
}

export function GlowBackground({
  className = '',
  showDotGrid = true,
  glowPosition = 'center',
  glowColor = 'var(--sl-color-accent)',
  glowOpacity = 0.15,
}: GlowBackgroundProps) {
  const positionMap = {
    center: '50% 50%',
    top: '50% 0%',
    'top-right': '70% 20%',
  };

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse clamp(300px, 50vw, 600px) clamp(200px, 35vw, 400px) at ${positionMap[glowPosition]}, ${glowColor}, transparent)`,
          opacity: glowOpacity,
        }}
      />
      {showDotGrid && <div className="landing-dot-grid absolute inset-0 opacity-[0.03]" />}
    </div>
  );
}
