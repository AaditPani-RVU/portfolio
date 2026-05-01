// About — concise, system-stat oriented

function About() {
  return (
    <Section
      id="about"
      num="01"
      label="ABOUT // OPERATOR PROFILE"
      title="I build production systems where ML and security meet — not academic demos."
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.9fr)',
        gap: 64,
        alignItems: 'start'
      }}>
        {/* left — narrative */}
        <div>
          {PROFILE.about.map((p, i) => (
            <Reveal key={i} delay={i * 100}>
              <p style={{
                fontSize: 19,
                lineHeight: 1.6,
                color: i === 0 ? 'var(--fg-0)' : 'var(--fg-1)',
                marginBottom: 22,
                textWrap: 'pretty',
                fontWeight: i === 0 ? 400 : 300
              }}>{p}</p>
            </Reveal>
          ))}

          <Reveal delay={400}>
            <div style={{ marginTop: 36, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Tag accent="cyan">Edge AI</Tag>
              <Tag accent="violet">Neuro-Symbolic Safety</Tag>
              <Tag accent="cyan">IDS · GANs · Few-Shot</Tag>
              <Tag accent="violet">Voice OS</Tag>
              <Tag accent="cyan">Healthcare AI</Tag>
            </div>
          </Reveal>
        </div>

        {/* right — system card */}
        <Reveal delay={200}>
          <Panel style={{ padding: 24 }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              borderBottom: '1px solid var(--hairline)', paddingBottom: 14, marginBottom: 18
            }}>
              <MonoLabel>OPERATOR.SYS</MonoLabel>
              <StatusDot accent="green" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', rowGap: 14, columnGap: 18, fontFamily: 'var(--font-mono)', fontSize: 13 }}>
              <span style={{ color: 'var(--fg-2)' }}>handle</span>
              <span style={{ color: 'var(--fg-0)' }}>aadit.pani</span>

              <span style={{ color: 'var(--fg-2)' }}>role</span>
              <span style={{ color: 'var(--fg-0)' }}>AI / Security Engineer</span>

              <span style={{ color: 'var(--fg-2)' }}>status</span>
              <span style={{ color: 'var(--green)' }}>Interning · HYRGPT</span>

              <span style={{ color: 'var(--fg-2)' }}>edu</span>
              <span style={{ color: 'var(--fg-0)' }}>RV University · CS (AI/ML)</span>

              <span style={{ color: 'var(--fg-2)' }}>gpa</span>
              <span style={{ color: 'var(--fg-0)' }}>8.2 / 10</span>

              <span style={{ color: 'var(--fg-2)' }}>node</span>
              <span style={{ color: 'var(--fg-0)' }}>Bengaluru, IN</span>

              <span style={{ color: 'var(--fg-2)' }}>open</span>
              <span style={{ color: 'var(--cyan)' }}>collaborations · research</span>
            </div>

            {/* system pulse mini-chart */}
            <div style={{
              marginTop: 22, paddingTop: 18,
              borderTop: '1px solid var(--hairline)'
            }}>
              <MonoLabel>UPTIME · LAST 30D</MonoLabel>
              <div style={{ display: 'flex', gap: 3, marginTop: 12, alignItems: 'flex-end', height: 32 }}>
                {Array.from({ length: 30 }).map((_, i) => {
                  const h = 30 + Math.sin(i * 0.7) * 30 + Math.random() * 30;
                  return <div key={i} style={{
                    flex: 1,
                    height: `${h}%`,
                    background: i > 22 ? 'var(--cyan)' : 'var(--hairline-strong)',
                    boxShadow: i > 22 ? '0 0 6px var(--cyan)' : 'none',
                    transition: 'height 0.3s'
                  }}></div>;
                })}
              </div>
            </div>
          </Panel>
        </Reveal>
      </div>
    </Section>
  );
}

Object.assign(window, { About });
