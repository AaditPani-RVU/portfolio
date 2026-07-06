// Contact — strong CTA, signal terminal style

const contactUseState = React.useState;
const contactUseEffect = React.useEffect;

function Contact() {
  const [pinging, setPinging] = contactUseState(true);
  const [tick, setTick] = contactUseState(0);
  contactUseEffect(() => {
    const t = setInterval(() => setTick(x => x + 1), 1500);
    return () => clearInterval(t);
  }, []);

  return (
    <Section
      id="contact"
      num="06"
      label="SIGNAL // OPEN CHANNEL"
      title="If you're building something at the seam of AI, security, or systems — I want to hear from you."
      sub="Open to research collaborations, internships in AI security or edge ML, and well-scoped freelance work on guardrails, IDS, and voice systems."
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
        gap: 32
      }}>
        {/* signal terminal */}
        <Panel style={{ padding: 32, position: 'relative', overflow: 'hidden' }}>
          {/* radar sweep bg */}
          <div style={{
            position: 'absolute', inset: -40,
            background: `conic-gradient(from ${tick * 60}deg, transparent 0deg, oklch(0.82 0.14 200 / 0.08) 30deg, transparent 60deg)`,
            pointerEvents: 'none',
            transition: 'all 1.5s linear'
          }}></div>
          {/* concentric rings */}
          <svg style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '120%', height: '120%',
            opacity: 0.15, pointerEvents: 'none'
          }} viewBox="-200 -200 400 400">
            {[60, 100, 140, 180].map(r => (
              <circle key={r} cx="0" cy="0" r={r}
                fill="none" stroke="var(--cyan)" strokeWidth="0.5" />
            ))}
            <line x1="-200" y1="0" x2="200" y2="0" stroke="var(--cyan)" strokeWidth="0.5" />
            <line x1="0" y1="-200" x2="0" y2="200" stroke="var(--cyan)" strokeWidth="0.5" />
          </svg>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: 28
            }}>
              <MonoLabel color="var(--cyan)">// TRANSMISSION READY</MonoLabel>
              <StatusDot accent="green" />
            </div>

            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 3.4vw, 44px)',
              fontWeight: 500, letterSpacing: '-0.025em',
              color: 'var(--fg-0)', marginBottom: 14, lineHeight: 1.1
            }}>
              Send a packet.
            </div>
            <p style={{
              fontSize: 16, color: 'var(--fg-1)', lineHeight: 1.55,
              maxWidth: 460, marginBottom: 28, fontWeight: 300, textWrap: 'pretty'
            }}>
              Best for direct mail. I read every message. Expect a reply within 48 hours.
            </p>

            <a href={`mailto:${PROFILE.email}`} style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              padding: '16px 24px',
              fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--bg-0)',
              background: 'var(--cyan)',
              border: '1px solid var(--cyan)',
              borderRadius: 2,
              textDecoration: 'none',
              boxShadow: '0 0 40px oklch(0.82 0.14 200 / 0.4)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 60px oklch(0.82 0.14 200 / 0.6)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 40px oklch(0.82 0.14 200 / 0.4)'; }}
            >
              <span>{PROFILE.email}</span>
              <span style={{ fontSize: 16 }}>→</span>
            </a>

            <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <ChannelRow label="GITHUB"   value={PROFILE.github}   href={`https://${PROFILE.github}`} />
              <ChannelRow label="LINKEDIN" value={PROFILE.linkedin} href={`https://${PROFILE.linkedin}`} />
              <ChannelRow label="PHONE"    value={PROFILE.phone}    href={`tel:${PROFILE.phone.replace(/\s+/g,'')}`} />
            </div>
          </div>
        </Panel>

        {/* availability + footer card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Panel style={{ padding: 24 }}>
            <MonoLabel>AVAILABILITY · 2026</MonoLabel>
            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { l: 'Research collabs (AI security, edge ML)', s: 'open' },
                { l: 'Summer / fall internships', s: 'open' },
                { l: 'Freelance — guardrails, IDS, voice', s: 'limited' },
                { l: 'Speaking & writing', s: 'open' }
              ].map((r, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  fontSize: 14, color: 'var(--fg-1)',
                  paddingBottom: 8,
                  borderBottom: i < 3 ? '1px dashed var(--hairline)' : 'none'
                }}>
                  <span>{r.l}</span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em',
                    color: r.s === 'open' ? 'var(--green)' : 'var(--amber)',
                    textTransform: 'uppercase'
                  }}>● {r.s}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel style={{ padding: 24 }}>
            <MonoLabel>RESPONSE.LATENCY</MonoLabel>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 36, fontWeight: 500, letterSpacing: '-0.025em',
              color: 'var(--cyan)', marginTop: 10, marginBottom: 6
            }}>{'<'} 48h</div>
            <p style={{ fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.5 }}>
              Average reply window for cold outreach. Faster on weekends.
            </p>
          </Panel>

          <Panel style={{ padding: 24 }}>
            <MonoLabel>CURRENT.ROUTING</MonoLabel>
            <div style={{
              marginTop: 12, fontFamily: 'var(--font-mono)', fontSize: 13,
              color: 'var(--fg-1)', lineHeight: 1.7
            }}>
              <div>┌── HYRGPT (intern, healthcare AI)</div>
              <div>├── RV University (B.Tech CS · AI/ML)</div>
              <div>├── NORA, NeuroSym, EdgeGenSec, GeoFence</div>
              <div>└── IEEE CAI 2026 prep</div>
            </div>
          </Panel>
        </div>
      </div>

      {/* footer */}
      <div style={{
        marginTop: 80,
        paddingTop: 28,
        borderTop: '1px solid var(--hairline)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 16,
        fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em',
        color: 'var(--fg-2)', textTransform: 'uppercase'
      }}>
        <span>© 2026 AADIT PANI · NODE_0xA1</span>
        <span style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <span>BUILT IN HTML · NO TRACKERS</span>
          <StatusDot accent="green" />
          <span>SYS NOMINAL</span>
        </span>
      </div>
    </Section>
  );
}

function ChannelRow({ label, value, href }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" style={{
      display: 'grid', gridTemplateColumns: '90px 1fr auto',
      gap: 14, alignItems: 'center',
      padding: '10px 0',
      borderBottom: '1px dashed var(--hairline)',
      fontFamily: 'var(--font-mono)', fontSize: 13,
      color: 'var(--fg-1)', textDecoration: 'none',
      transition: 'color 0.2s'
    }}
    onMouseEnter={e => e.currentTarget.style.color = 'var(--cyan)'}
    onMouseLeave={e => e.currentTarget.style.color = 'var(--fg-1)'}
    >
      <span style={{ color: 'var(--fg-2)', fontSize: 11, letterSpacing: '0.14em' }}>{label}</span>
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</span>
      <span style={{ color: 'var(--fg-2)' }}>↗</span>
    </a>
  );
}

Object.assign(window, { Contact });
