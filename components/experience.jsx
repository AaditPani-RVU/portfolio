// Experience — terminal log style timeline

function Experience() {
  return (
    <Section
      id="experience"
      num="04"
      label="LOG // SESSION TRACE"
      title="Where I've shipped, taught myself, and broken things on purpose."
    >
      <div style={{
        border: '1px solid var(--hairline)',
        background: 'oklch(0.13 0.012 250 / 0.7)',
        fontFamily: 'var(--font-mono)'
      }}>
        {/* terminal header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 18px',
          borderBottom: '1px solid var(--hairline)',
          fontSize: 11, letterSpacing: '0.16em',
          color: 'var(--fg-2)', textTransform: 'uppercase'
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)' }}></span>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--amber)' }}></span>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--violet)' }}></span>
          <span style={{ marginLeft: 16 }}>~/aaditpani — log.tail</span>
          <span style={{ marginLeft: 'auto', color: 'var(--green)' }}>● live</span>
        </div>

        {/* entries */}
        <div style={{ padding: '24px 0' }}>
          {EXPERIENCE.map((e, i) => (
            <Reveal key={i} delay={i * 100}>
              <LogEntry entry={e} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

function LogEntry({ entry, index }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '180px 1fr',
      gap: 24,
      padding: '20px 28px',
      borderTop: index > 0 ? '1px dashed var(--hairline)' : 'none'
    }}>
      <div>
        <div style={{
          fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.12em',
          marginBottom: 8
        }}>{entry.when}</div>
        <div style={{
          fontSize: 13, color: 'var(--fg-1)',
          letterSpacing: '0.04em',
          textTransform: 'uppercase'
        }}>{entry.where}</div>
      </div>

      <div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 22, fontWeight: 500,
          color: 'var(--fg-0)', marginBottom: 14,
          letterSpacing: '-0.015em'
        }}>{entry.role}</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {entry.log.map((line, i) => (
            <div key={i} style={{
              display: 'flex', gap: 12,
              fontSize: 14, lineHeight: 1.55,
              color: 'var(--fg-1)',
              fontFamily: 'var(--font-body)'
            }}>
              <span style={{
                color: 'var(--violet)',
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                paddingTop: 2,
                flexShrink: 0
              }}>$</span>
              <span style={{ textWrap: 'pretty' }}>{line}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Experience });
