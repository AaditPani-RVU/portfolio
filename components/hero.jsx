// Hero — neural graph canvas + role typing + cursor parallax

const heroUseEffect = React.useEffect;
const heroUseRef = React.useRef;
const heroUseState = React.useState;

// --- Animated background canvas: neural graph ---
function NeuralCanvas({ density = 1, speed = 1, paused = false }) {
  const ref = heroUseRef(null);
  const mouseRef = heroUseRef({ x: 0.5, y: 0.5, active: false });
  const stateRef = heroUseRef({ raf: 0 });

  heroUseEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;
    let nodes = [];
    let edges = [];
    let packets = [];

    function resize() {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function seed() {
      nodes = [];
      const targetCount = Math.round((W * H) / (22000 / density));
      const count = Math.max(28, Math.min(96, targetCount));
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.12 * speed,
          vy: (Math.random() - 0.5) * 0.12 * speed,
          r: 1 + Math.random() * 1.6,
          phase: Math.random() * Math.PI * 2,
          activation: Math.random() * 0.4
        });
      }
      // pre-compute edges by k-nearest
      edges = [];
      const k = 3;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const dists = [];
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          dists.push({ j, d: dx*dx + dy*dy });
        }
        dists.sort((p, q) => p.d - q.d);
        for (let n = 0; n < k && n < dists.length; n++) {
          const j = dists[n].j;
          if (j > i) edges.push({ i, j, life: Math.random() });
        }
      }
      packets = [];
    }

    function spawnPacket() {
      if (edges.length === 0) return;
      const e = edges[Math.floor(Math.random() * edges.length)];
      packets.push({ e, t: 0, speed: 0.005 + Math.random() * 0.01 });
    }

    let lastSpawn = 0;
    let t0 = performance.now();

    function tick() {
      const now = performance.now();
      const dt = Math.min(64, now - t0); t0 = now;
      const tSec = now / 1000;

      ctx.clearRect(0, 0, W, H);

      // mouse parallax offset (subtle)
      const mx = (mouseRef.current.x - 0.5) * 24;
      const my = (mouseRef.current.y - 0.5) * 24;

      // update nodes
      for (const n of nodes) {
        n.x += n.vx * dt * 0.6 * speed;
        n.y += n.vy * dt * 0.6 * speed;
        if (n.x < -10) n.x = W + 10; if (n.x > W + 10) n.x = -10;
        if (n.y < -10) n.y = H + 10; if (n.y > H + 10) n.y = -10;
        n.phase += dt * 0.0015 * speed;
        n.activation = 0.25 + Math.sin(n.phase) * 0.25 + Math.random() * 0.02;
      }

      // mouse influence — boost activation for nearby nodes
      if (mouseRef.current.active) {
        const mxa = mouseRef.current.x * W;
        const mya = mouseRef.current.y * H;
        for (const n of nodes) {
          const dx = n.x - mxa, dy = n.y - mya;
          const d = Math.sqrt(dx*dx + dy*dy);
          if (d < 180) {
            n.activation = Math.min(1, n.activation + (1 - d/180) * 0.5);
          }
        }
      }

      // edges
      ctx.lineWidth = 0.7;
      for (const e of edges) {
        const a = nodes[e.i], b = nodes[e.j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist > 240) continue;
        const intensity = (1 - dist / 240) * 0.5 * (0.5 + (a.activation + b.activation) / 2);
        ctx.strokeStyle = `oklch(0.78 0.14 200 / ${0.10 + intensity * 0.35})`;
        ctx.beginPath();
        ctx.moveTo(a.x + mx * 0.3, a.y + my * 0.3);
        ctx.lineTo(b.x + mx * 0.3, b.y + my * 0.3);
        ctx.stroke();
      }

      // nodes
      for (const n of nodes) {
        const glow = 0.5 + n.activation * 1.5;
        ctx.fillStyle = `oklch(0.86 0.14 200 / ${0.4 + n.activation * 0.6})`;
        ctx.beginPath();
        ctx.arc(n.x + mx * 0.3, n.y + my * 0.3, n.r, 0, Math.PI * 2);
        ctx.fill();

        // halo on highly activated nodes
        if (n.activation > 0.6) {
          const halo = ctx.createRadialGradient(n.x + mx * 0.3, n.y + my * 0.3, 0, n.x + mx * 0.3, n.y + my * 0.3, 18);
          halo.addColorStop(0, `oklch(0.78 0.14 200 / ${(n.activation - 0.6) * 0.6})`);
          halo.addColorStop(1, 'oklch(0.78 0.14 200 / 0)');
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(n.x + mx * 0.3, n.y + my * 0.3, 18, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // packets
      if (now - lastSpawn > 220 / speed) {
        spawnPacket();
        if (Math.random() < 0.5) spawnPacket();
        lastSpawn = now;
      }
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.t += p.speed * dt * speed;
        if (p.t >= 1) { packets.splice(i, 1); continue; }
        const a = nodes[p.e.i], b = nodes[p.e.j];
        const x = a.x + (b.x - a.x) * p.t + mx * 0.3;
        const y = a.y + (b.y - a.y) * p.t + my * 0.3;
        // packet trail
        const trailLen = 0.18;
        const t2 = Math.max(0, p.t - trailLen);
        const x2 = a.x + (b.x - a.x) * t2 + mx * 0.3;
        const y2 = a.y + (b.y - a.y) * t2 + my * 0.3;
        const grad = ctx.createLinearGradient(x2, y2, x, y);
        grad.addColorStop(0, 'oklch(0.95 0.18 290 / 0)');
        grad.addColorStop(1, 'oklch(0.95 0.18 290 / 0.95)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x, y);
        ctx.stroke();

        ctx.fillStyle = 'oklch(0.95 0.18 290 / 1)';
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      stateRef.current.raf = requestAnimationFrame(tick);
    }

    function onMouseMove(e) {
      const r = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - r.left) / r.width;
      mouseRef.current.y = (e.clientY - r.top) / r.height;
      mouseRef.current.active = true;
    }
    function onMouseLeave() { mouseRef.current.active = false; }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    if (!paused) tick();

    return () => {
      cancelAnimationFrame(stateRef.current.raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [density, speed, paused]);

  return (
    <canvas
      ref={ref}
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none'
      }}
    />
  );
}

// --- Role typing cycle ---
function RoleCycle({ roles }) {
  const [idx, setIdx] = heroUseState(0);
  const [text, setText] = heroUseState('');
  const [phase, setPhase] = heroUseState('typing'); // typing | hold | deleting

  heroUseEffect(() => {
    const target = roles[idx];
    let timeout;
    if (phase === 'typing') {
      if (text.length < target.length) {
        timeout = setTimeout(() => setText(target.slice(0, text.length + 1)), 55 + Math.random() * 40);
      } else {
        timeout = setTimeout(() => setPhase('hold'), 1400);
      }
    } else if (phase === 'hold') {
      timeout = setTimeout(() => setPhase('deleting'), 600);
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(target.slice(0, text.length - 1)), 28);
      } else {
        setIdx((idx + 1) % roles.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timeout);
  }, [idx, text, phase, roles]);

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      <span style={{ color: 'var(--cyan)' }}>{text}</span>
      <span style={{
        display: 'inline-block',
        width: 10, height: '1.05em', marginLeft: 6,
        background: 'var(--cyan)',
        animation: 'blink 1s steps(1) infinite',
        verticalAlign: 'middle',
        boxShadow: '0 0 12px var(--cyan)'
      }}></span>
    </span>
  );
}

// --- Hero section ---
function Hero({ tweaks }) {
  const tilt = heroUseRef(null);
  heroUseEffect(() => {
    const el = tilt.current;
    if (!el) return;
    function onMove(e) {
      const r = el.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width - 0.5;
      const cy = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `translate3d(${cx * -8}px, ${cy * -6}px, 0)`;
    }
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      id="hero"
      data-screen-label="00 Hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '0 8vw',
        overflow: 'hidden'
      }}
    >
      <NeuralCanvas density={tweaks.graphDensity} speed={tweaks.graphSpeed} paused={!tweaks.graphOn} />

      {/* corner brackets / chrome */}
      <CornerBrackets />

      <div ref={tilt} style={{ position: 'relative', zIndex: 2, maxWidth: 1100, willChange: 'transform' }}>
        {/* top status row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em',
          color: 'var(--fg-2)', textTransform: 'uppercase',
          marginBottom: 32
        }}>
          <StatusDot accent="green" />
          <span>SYS // ONLINE</span>
          <span style={{ width: 24, height: 1, background: 'var(--hairline-strong)' }}></span>
          <span>NODE_ID&nbsp;0xA1</span>
          <span style={{ width: 24, height: 1, background: 'var(--hairline-strong)' }}></span>
          <span>BENGALURU · IN</span>
        </div>

        {/* name */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: 'clamp(56px, 9vw, 132px)',
          letterSpacing: '-0.045em',
          lineHeight: 0.95,
          color: 'var(--fg-0)',
          margin: 0,
          textWrap: 'balance'
        }}>
          Aadit Pani
        </h1>

        {/* tagline */}
        <p style={{
          marginTop: 28,
          fontFamily: 'var(--font-display)',
          fontWeight: 300,
          fontSize: 'clamp(20px, 2.4vw, 32px)',
          letterSpacing: '-0.015em',
          color: 'var(--fg-1)',
          maxWidth: 820,
          lineHeight: 1.25,
          textWrap: 'pretty'
        }}>
          Building <em style={{ fontStyle: 'normal', color: 'var(--fg-0)' }}>secure</em>, <em style={{ fontStyle: 'normal', color: 'var(--fg-0)' }}>intelligent</em> systems at the edge.
        </p>

        {/* role cycle */}
        <div style={{
          marginTop: 44,
          display: 'flex', alignItems: 'center', gap: 14,
          fontFamily: 'var(--font-mono)',
          fontSize: 16,
          color: 'var(--fg-1)'
        }}>
          <span style={{
            fontSize: 11, letterSpacing: '0.18em', color: 'var(--fg-2)',
            textTransform: 'uppercase'
          }}>$ whoami →</span>
          <RoleCycle roles={PROFILE.roles} />
        </div>

        {/* CTAs */}
        <div style={{ marginTop: 56, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="#projects" style={ctaPrimaryStyle}>
            <span>EXPLORE SYSTEMS</span>
            <ArrowDown />
          </a>
          <a href="#contact" style={ctaSecondaryStyle}>
            <span>OPEN SIGNAL</span>
          </a>
        </div>

        {/* live readouts */}
        <div style={{
          marginTop: 80,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 0,
          maxWidth: 720,
          borderTop: '1px solid var(--hairline)',
          borderBottom: '1px solid var(--hairline)'
        }}>
          {[
            { k: '4', v: 'Active systems' },
            { k: 'PyPI', v: 'Open-source release' },
            { k: 'IEEE', v: 'CAI 2026 accepted' },
            { k: '79.8%', v: 'Adversarial block rate' }
          ].map((s, i, arr) => (
            <div key={i} style={{
              padding: '20px 18px',
              borderRight: i < arr.length - 1 ? '1px solid var(--hairline)' : 'none',
              fontFamily: 'var(--font-mono)'
            }}>
              <div style={{ fontSize: 22, color: 'var(--fg-0)', fontWeight: 500 }}>{s.k}</div>
              <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--fg-2)', marginTop: 6 }}>{s.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em',
        color: 'var(--fg-2)', textTransform: 'uppercase',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        zIndex: 2
      }}>
        <span>SCROLL</span>
        <span style={{
          display: 'inline-block', width: 1, height: 36,
          background: 'linear-gradient(180deg, var(--cyan), transparent)',
          animation: 'float-y 2s ease-in-out infinite'
        }}></span>
      </div>
    </section>
  );
}

const ctaPrimaryStyle = {
  display: 'inline-flex', alignItems: 'center', gap: 10,
  padding: '14px 22px',
  fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'var(--bg-0)',
  background: 'var(--cyan)',
  border: '1px solid var(--cyan)',
  borderRadius: 2,
  textDecoration: 'none',
  boxShadow: '0 0 32px oklch(0.82 0.14 200 / 0.3)',
  transition: 'transform 0.2s, box-shadow 0.2s'
};
const ctaSecondaryStyle = {
  display: 'inline-flex', alignItems: 'center', gap: 10,
  padding: '14px 22px',
  fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'var(--fg-0)',
  background: 'transparent',
  border: '1px solid var(--hairline-strong)',
  borderRadius: 2,
  textDecoration: 'none',
  transition: 'border-color 0.2s, color 0.2s'
};

function ArrowDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 1V11M6 11L1 6M6 11L11 6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CornerBrackets() {
  const armLen = 28;
  const inset = 24;
  const color = 'var(--hairline-strong)';
  const corner = (pos) => ({
    position: 'absolute',
    width: armLen, height: armLen,
    pointerEvents: 'none',
    ...pos
  });
  return (
    <>
      <div style={corner({ top: inset, left: inset, borderTop: `1px solid ${color}`, borderLeft: `1px solid ${color}` })}></div>
      <div style={corner({ top: inset, right: inset, borderTop: `1px solid ${color}`, borderRight: `1px solid ${color}` })}></div>
      <div style={corner({ bottom: inset, left: inset, borderBottom: `1px solid ${color}`, borderLeft: `1px solid ${color}` })}></div>
      <div style={corner({ bottom: inset, right: inset, borderBottom: `1px solid ${color}`, borderRight: `1px solid ${color}` })}></div>
    </>
  );
}

Object.assign(window, { Hero, NeuralCanvas, RoleCycle });
