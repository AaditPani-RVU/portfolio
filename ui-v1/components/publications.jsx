// Publications — minimal credible

function Publications() {
  return (
    <Section
      id="publications"
      num="05"
      label="PUBLICATIONS // RESEARCH ARTIFACTS"
      title="Peer-reviewed and in-progress work."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {PUBLICATIONS.map((pub, i) => (
          <Reveal key={i} delay={i * 100}>
            <PubRow pub={pub} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function PubRow({ pub }) {
  const isAccepted = pub.status === 'Accepted';
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '120px minmax(0, 1fr) auto',
      gap: 32,
      alignItems: 'start',
      padding: '24px 0',
      borderTop: '1px solid var(--hairline-strong)',
      borderBottom: '1px solid var(--hairline)',
    }}>
      <div>
        <MonoLabel color={isAccepted ? 'var(--cyan)' : 'var(--fg-2)'}>
          {pub.status.toUpperCase()}
        </MonoLabel>
        <div style={{
          marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: 11,
          color: 'var(--fg-2)', letterSpacing: '0.08em'
        }}>{pub.venue}</div>
      </div>
      <div>
        <h4 style={{
          fontFamily: 'var(--font-display)', fontWeight: 500,
          fontSize: 'clamp(20px, 2vw, 26px)',
          letterSpacing: '-0.015em',
          color: 'var(--fg-0)', marginBottom: 10,
          lineHeight: 1.25
        }}>{pub.title}</h4>
        <p style={{
          fontSize: 14, lineHeight: 1.55, color: 'var(--fg-1)',
          textWrap: 'pretty', fontWeight: 300
        }}>{pub.note}</p>
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 11,
        color: 'var(--fg-2)', letterSpacing: '0.16em',
        textAlign: 'right', whiteSpace: 'nowrap',
        paddingTop: 4
      }}>
        {isAccepted ? '↗ READ' : '— DRAFT'}
      </div>
    </div>
  );
}

Object.assign(window, { Publications });
