// Side rail nav with active section + scroll progress

const navUseState = React.useState;
const navUseEffect = React.useEffect;

function SideNav({ open, onToggle }) {
  const [active, setActive] = navUseState('hero');
  const [progress, setProgress] = navUseState(0);
  const [time, setTime] = navUseState('');

  navUseEffect(() => {
    const sections = NAV.map(n => document.getElementById(n.id)).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { threshold: 0.35, rootMargin: '-20% 0px -45% 0px' });
    sections.forEach(s => io.observe(s));

    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      setProgress(p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);

  navUseEffect(() => {
    const tick = () => {
      const d = new Date();
      const t = d.toLocaleTimeString('en-IN', { hour12: false, timeZone: 'Asia/Kolkata' });
      setTime(`IST ${t}`);
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* TOP BAR — slim, system-status */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 50, height: 44,
        background: 'oklch(0.13 0.012 250 / 0.7)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: '1px solid var(--hairline)',
        display: 'flex', alignItems: 'center',
        padding: '0 24px',
        fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em',
        color: 'var(--fg-2)', textTransform: 'uppercase'
      }}>
        <a href="#hero" style={{
          display: 'flex', alignItems: 'center', gap: 10,
          color: 'var(--fg-0)', textDecoration: 'none', fontWeight: 500
        }}>
          <Logo />
          <span>AADIT.PANI</span>
        </a>

        <span style={{ marginLeft: 22, display: 'flex', alignItems: 'center', gap: 10 }}>
          <StatusDot accent="green" />
          <span>OPERATOR ONLINE</span>
        </span>

        {/* progress bar */}
        <div style={{
          position: 'absolute', bottom: -1, left: 0, right: 0, height: 1,
          background: 'transparent'
        }}>
          <div style={{
            height: '100%',
            width: `${progress * 100}%`,
            background: 'linear-gradient(90deg, var(--cyan), var(--violet))',
            boxShadow: '0 0 8px var(--cyan)',
            transition: 'width 0.1s'
          }}></div>
        </div>

        <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14 }}>
          <span>{time}</span>
          <span style={{ width: 1, height: 14, background: 'var(--hairline-strong)' }}></span>
          <span>{Math.round(progress * 100).toString().padStart(2, '0')}% TRAVERSED</span>
        </span>
      </div>

      {/* SIDE RAIL */}
      <nav style={{
        position: 'fixed',
        top: '50%',
        right: 24,
        transform: 'translateY(-50%)',
        zIndex: 40,
        display: 'flex', flexDirection: 'column', gap: 0,
        background: 'oklch(0.13 0.012 250 / 0.6)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid var(--hairline)',
        padding: 6
      }}>
        {NAV.map(n => {
          const isActive = active === n.id;
          return (
            <a key={n.id} href={`#${n.id}`} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '8px 12px',
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em',
              color: isActive ? 'var(--cyan)' : 'var(--fg-2)',
              textDecoration: 'none',
              textTransform: 'uppercase',
              transition: 'all 0.2s',
              position: 'relative'
            }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'var(--fg-0)'; }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'var(--fg-2)'; }}
            >
              <span style={{
                width: 16, height: 1,
                background: isActive ? 'var(--cyan)' : 'var(--hairline-strong)',
                boxShadow: isActive ? '0 0 6px var(--cyan)' : 'none',
                transition: 'all 0.2s'
              }}></span>
              <span style={{ minWidth: 18, color: isActive ? 'var(--cyan)' : 'var(--fg-3)' }}>{n.n}</span>
              <span>{n.label}</span>
            </a>
          );
        })}
      </nav>
    </>
  );
}

function Logo() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="1.5" y="1.5" width="19" height="19" stroke="var(--cyan)" strokeWidth="1" />
      <circle cx="6" cy="6" r="1.5" fill="var(--cyan)" />
      <circle cx="16" cy="6" r="1.5" fill="var(--cyan)" />
      <circle cx="6" cy="16" r="1.5" fill="var(--cyan)" />
      <circle cx="16" cy="16" r="1.5" fill="var(--violet)" />
      <line x1="6" y1="6" x2="16" y2="16" stroke="var(--cyan)" strokeWidth="0.6" opacity="0.5" />
      <line x1="16" y1="6" x2="6" y2="16" stroke="var(--cyan)" strokeWidth="0.6" opacity="0.5" />
    </svg>
  );
}

Object.assign(window, { SideNav });
