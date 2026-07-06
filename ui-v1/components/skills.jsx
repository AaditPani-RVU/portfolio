// Skills — interactive category clusters

const skillsUseState = React.useState;

function Skills() {
  const [active, setActive] = skillsUseState(0);

  return (
    <Section
      id="skills"
      num="03"
      label="CAPABILITIES // OPERATING ENVELOPE"
      title="Stack I work in, ordered by how often I reach for it."
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 280px) minmax(0, 1fr)',
        gap: 32,
        alignItems: 'start'
      }}>
        {/* category list */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          border: '1px solid var(--hairline)',
          background: 'oklch(0.16 0.014 250 / 0.5)'
        }}>
          {SKILLS.map((s, i) => {
            const isActive = active === i;
            const color = s.color === 'violet' ? 'var(--violet)' : 'var(--cyan)';
            return (
              <button
                key={s.cat}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '16px 18px',
                  background: isActive ? `linear-gradient(90deg, ${alpha(color, 0.10)}, transparent)` : 'transparent',
                  border: 'none',
                  borderBottom: i < SKILLS.length - 1 ? '1px solid var(--hairline)' : 'none',
                  borderLeft: `2px solid ${isActive ? color : 'transparent'}`,
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: isActive ? 'var(--fg-0)' : 'var(--fg-1)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  transition: 'all 0.2s'
                }}
              >
                <span style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: isActive ? color : 'var(--fg-3)',
                  boxShadow: isActive ? `0 0 6px ${color}` : 'none'
                }}></span>
                <span>{s.cat}</span>
                <span style={{ marginLeft: 'auto', color: 'var(--fg-3)', fontSize: 10 }}>{String(s.items.length).padStart(2, '0')}</span>
              </button>
            );
          })}
        </div>

        {/* skill cloud */}
        <Panel style={{ padding: 28, minHeight: 360 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            paddingBottom: 14, marginBottom: 22,
            borderBottom: '1px solid var(--hairline)'
          }}>
            <MonoLabel>{SKILLS[active].cat} · {SKILLS[active].items.length} CAPABILITIES</MonoLabel>
            <StatusDot accent={SKILLS[active].color === 'violet' ? 'violet' : 'cyan'} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {SKILLS[active].items.map((item, i) => (
              <SkillChip key={item} label={item} accent={SKILLS[active].color} delay={i * 30} />
            ))}
          </div>
        </Panel>
      </div>
    </Section>
  );
}

function SkillChip({ label, accent, delay }) {
  const color = accent === 'violet' ? 'var(--violet)' : 'var(--cyan)';
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = 0;
    el.style.transform = 'translateY(8px)';
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.4s, transform 0.4s';
      el.style.transitionDelay = `${delay}ms`;
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    });
  }, [label, delay]);
  return (
    <span ref={ref} style={{
      fontFamily: 'var(--font-mono)', fontSize: 13,
      padding: '8px 14px',
      border: `1px solid ${alpha(color, 0.3)}`,
      borderRadius: 2,
      color: 'var(--fg-0)',
      background: alpha(color, 0.06),
      cursor: 'default',
      transition: 'all 0.2s'
    }}
    onMouseEnter={e => {
      e.currentTarget.style.background = alpha(color, 0.12);
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = alpha(color, 0.06);
      e.currentTarget.style.transform = 'translateY(0)';
    }}
    >{label}</span>
  );
}

Object.assign(window, { Skills });
