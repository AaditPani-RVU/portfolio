// Reusable primitives

const { useEffect, useRef, useState, useMemo } = React;

// alpha helper — works with CSS vars (var(--cyan)) and literal oklch / hex
function alpha(c, a) {
  return `color-mix(in oklch, ${c} ${Math.round(a * 100)}%, transparent)`;
}
window.alpha = alpha;

// IntersectionObserver-driven reveal
function Reveal({ children, delay = 0, as: Tag = 'div', className = '', style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          el.style.animationDelay = `${delay}ms`;
          el.classList.add('in');
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <Tag ref={ref} className={`reveal ${className}`} style={style}>{children}</Tag>;
}

// Section wrapper with anchor + label header
function Section({ id, num, label, title, sub, children, style = {} }) {
  return (
    <section
      id={id}
      data-screen-label={`${num} ${label}`}
      style={{
        position: 'relative',
        padding: '120px 8vw 140px',
        maxWidth: 1440,
        margin: '0 auto',
        ...style
      }}
    >
      <Reveal>
        <div style={{
          display: 'flex', alignItems: 'baseline', gap: 18,
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em',
          color: 'var(--fg-2)', textTransform: 'uppercase',
          marginBottom: 20
        }}>
          <span style={{ color: 'var(--cyan)' }}>{num}</span>
          <span style={{
            display: 'inline-block', width: 36, height: 1,
            background: 'var(--hairline-strong)'
          }}></span>
          <span>{label}</span>
        </div>
      </Reveal>
      <Reveal delay={80}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: 'clamp(36px, 5.2vw, 68px)',
          letterSpacing: '-0.025em',
          lineHeight: 1.02,
          color: 'var(--fg-0)',
          maxWidth: 960,
          textWrap: 'pretty'
        }}>{title}</h2>
      </Reveal>
      {sub && (
        <Reveal delay={160}>
          <p style={{
            marginTop: 22,
            fontSize: 17, lineHeight: 1.55, color: 'var(--fg-1)',
            maxWidth: 720, textWrap: 'pretty'
          }}>{sub}</p>
        </Reveal>
      )}
      <div style={{ marginTop: 64 }}>{children}</div>
    </section>
  );
}

// Glassy panel
function Panel({ children, style = {}, hoverGlow = false, accent = 'cyan', onClick }) {
  const [hover, setHover] = useState(false);
  const accentColor = accent === 'violet' ? 'var(--violet)' : 'var(--cyan)';
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, oklch(0.20 0.018 250 / 0.55) 0%, oklch(0.16 0.014 250 / 0.65) 100%)',
        border: `1px solid ${hover && hoverGlow ? alpha(accentColor, 0.4) : 'var(--hairline)'}`,
        borderRadius: 4,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
        boxShadow: hover && hoverGlow ? `0 0 0 1px ${alpha(accentColor, 0.15)}, 0 24px 60px -30px ${alpha(accentColor, 0.4)}` : '0 1px 0 oklch(1 0 0 / 0.03) inset',
        cursor: onClick ? 'pointer' : 'default',
        ...style
      }}
    >
      {children}
    </div>
  );
}

// Tag / chip
function Tag({ children, accent = 'cyan', size = 'sm' }) {
  const color = accent === 'violet' ? 'var(--violet)' : accent === 'amber' ? 'var(--amber)' : 'var(--cyan)';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontFamily: 'var(--font-mono)',
      fontSize: size === 'sm' ? 11 : 12,
      letterSpacing: '0.06em',
      padding: size === 'sm' ? '5px 10px' : '7px 12px',
      borderRadius: 999,
      border: `1px solid ${alpha(color, 0.25)}`,
      color: color,
      background: alpha(color, 0.06),
      whiteSpace: 'nowrap'
    }}>{children}</span>
  );
}

// Status dot
function StatusDot({ accent = 'green' }) {
  const color = accent === 'green' ? 'var(--green)' : accent === 'amber' ? 'var(--amber)' : accent === 'violet' ? 'var(--violet)' : 'var(--cyan)';
  return (
    <span style={{ position: 'relative', display: 'inline-block', width: 8, height: 8 }}>
      <span style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: color,
        boxShadow: `0 0 8px ${color}`
      }}></span>
      <span style={{
        position: 'absolute', inset: -4, borderRadius: '50%',
        border: `1px solid ${alpha(color, 0.4)}`,
        animation: 'pulse 2s ease-in-out infinite'
      }}></span>
    </span>
  );
}

// Mono label
function MonoLabel({ children, color = 'var(--fg-2)', style = {} }) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color,
      ...style
    }}>{children}</span>
  );
}

Object.assign(window, { Reveal, Section, Panel, Tag, StatusDot, MonoLabel });
