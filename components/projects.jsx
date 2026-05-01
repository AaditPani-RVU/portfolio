// Projects — full-bleed "system module" showcases

const projUseState = React.useState;

function Projects() {
  return (
    <Section
      id="projects"
      num="02"
      label="SYSTEMS // FEATURED DEPLOYMENTS"
      title="Four systems I designed, shipped, and stress-tested."
      sub="Each one solves a real problem in AI security, edge compute, or autonomous sensing — built for deployment, not for the demo reel."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
        {PROJECTS.map((p, i) => (
          <ProjectModule key={p.id} project={p} index={i} />
        ))}
      </div>
    </Section>
  );
}

function ProjectModule({ project, index }) {
  const accent = project.accent === 'violet' ? 'var(--violet)' : 'var(--cyan)';
  const accentDim = project.accent === 'violet' ? 'var(--violet-dim)' : 'var(--cyan-dim)';

  return (
    <Reveal>
      <article style={{ position: 'relative' }}>
        {/* index marker */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          marginBottom: 18,
          fontFamily: 'var(--font-mono)', fontSize: 11,
          letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--fg-2)'
        }}>
          <span style={{ color: accent, fontWeight: 500 }}>SYS_{project.index}</span>
          <span style={{ width: 60, height: 1, background: 'var(--hairline-strong)' }}></span>
          <span>{project.year}</span>
          <span style={{ width: 60, height: 1, background: 'var(--hairline-strong)' }}></span>
          <StatusDot accent={project.accent === 'violet' ? 'violet' : 'cyan'} />
          <span style={{ color: accent }}>{project.status}</span>
        </div>

        {/* header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) auto',
          gap: 24,
          alignItems: 'end',
          marginBottom: 28
        }}>
          <div>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontWeight: 500,
              fontSize: 'clamp(40px, 5.6vw, 76px)',
              letterSpacing: '-0.035em', lineHeight: 0.98,
              color: 'var(--fg-0)'
            }}>
              {project.name}
            </h3>
            <p style={{
              marginTop: 12,
              fontFamily: 'var(--font-display)', fontWeight: 300,
              fontSize: 'clamp(18px, 1.6vw, 22px)',
              color: 'var(--fg-1)',
              letterSpacing: '-0.01em'
            }}>{project.subtitle}</p>
          </div>
        </div>

        {/* main grid: problem/solution + diagram */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.05fr)',
          gap: 32,
          marginBottom: 32
        }}>
          {/* left: problem + solution */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <ProblemSolution label="PROBLEM" body={project.problem} accent={accent} />
            <ProblemSolution label="SOLUTION" body={project.solution} accent={accent} bright />
            <div>
              <MonoLabel>STACK</MonoLabel>
              <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {project.stack.map((s, i) => (
                  <span key={i} style={{
                    fontFamily: 'var(--font-mono)', fontSize: 11,
                    color: 'var(--fg-1)',
                    padding: '4px 10px',
                    border: '1px solid var(--hairline)',
                    borderRadius: 999,
                    background: 'oklch(0.20 0.018 250 / 0.4)'
                  }}>{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* right: pipeline diagram */}
          <Panel style={{ padding: '28px 24px' }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: 18
            }}>
              <MonoLabel>SYSTEM ARCHITECTURE</MonoLabel>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em',
                color: 'var(--fg-2)'
              }}>v.{project.index}</span>
            </div>
            <PipelineDiagram nodes={project.pipeline} accent={accent} />
            <div style={{
              marginTop: 22, paddingTop: 18,
              borderTop: '1px solid var(--hairline)',
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12
            }}>
              {project.highlights.map((h, i) => (
                <div key={i}>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(20px, 2.2vw, 26px)',
                    color: accent,
                    fontWeight: 500,
                    letterSpacing: '-0.02em'
                  }}>{h.k}</div>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em',
                    textTransform: 'uppercase', color: 'var(--fg-2)', marginTop: 4,
                    lineHeight: 1.4
                  }}>{h.v}</div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* features row */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 1, background: 'var(--hairline)',
          border: '1px solid var(--hairline)'
        }}>
          {project.features.map((f, i) => (
            <FeatureCell key={i} feature={f} accent={accent} index={i} />
          ))}
        </div>
      </article>
    </Reveal>
  );
}

function ProblemSolution({ label, body, accent, bright = false }) {
  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        marginBottom: 10
      }}>
        <span style={{
          width: 6, height: 6,
          background: bright ? accent : 'var(--fg-3)',
          borderRadius: '50%',
          boxShadow: bright ? `0 0 8px ${accent}` : 'none'
        }}></span>
        <MonoLabel color={bright ? accent : 'var(--fg-2)'}>{label}</MonoLabel>
      </div>
      <p style={{
        fontSize: 17, lineHeight: 1.55,
        color: bright ? 'var(--fg-0)' : 'var(--fg-1)',
        textWrap: 'pretty',
        fontWeight: bright ? 400 : 300
      }}>{body}</p>
    </div>
  );
}

function PipelineDiagram({ nodes, accent }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {nodes.map((n, i) => (
        <React.Fragment key={i}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 14px',
            border: '1px solid var(--hairline)',
            borderRadius: 2,
            background: 'oklch(0.13 0.012 250 / 0.6)',
            fontFamily: 'var(--font-mono)', fontSize: 13,
            color: 'var(--fg-0)',
            position: 'relative'
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-2)',
              letterSpacing: '0.1em', minWidth: 26
            }}>{String(i).padStart(2, '0')}</span>
            <span>{n}</span>
            <span style={{
              marginLeft: 'auto',
              width: 6, height: 6,
              borderRadius: '50%',
              background: accent,
              boxShadow: `0 0 6px ${accent}`,
              animation: `pulse ${2 + i * 0.3}s ease-in-out infinite`
            }}></span>
          </div>
          {i < nodes.length - 1 && (
            <div style={{
              alignSelf: 'center',
              width: 1, height: 14,
              background: `linear-gradient(180deg, ${accent}, transparent)`
            }}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function FeatureCell({ feature, accent, index }) {
  const [hover, setHover] = projUseState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: 22,
        background: hover
          ? `linear-gradient(180deg, ${alpha(accent, 0.05)}, oklch(0.16 0.014 250 / 0.7))`
          : 'oklch(0.16 0.014 250 / 0.5)',
        transition: 'background 0.3s'
      }}
    >
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em',
        color: accent, marginBottom: 10
      }}>
        ◇ {String(index + 1).padStart(2, '0')}
      </div>
      <div style={{
        fontFamily: 'var(--font-display)', fontWeight: 500,
        fontSize: 17, color: 'var(--fg-0)', marginBottom: 8,
        letterSpacing: '-0.01em'
      }}>{feature.title}</div>
      <p style={{
        fontSize: 14, lineHeight: 1.55,
        color: 'var(--fg-1)', textWrap: 'pretty',
        fontWeight: 300
      }}>{feature.body}</p>
    </div>
  );
}

Object.assign(window, { Projects });
