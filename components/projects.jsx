// Projects — stack map + full-bleed "system module" showcases + agents & tools grid

const projUseState = React.useState;

const ACCENT_VAR = {
  cyan: 'var(--cyan)',
  violet: 'var(--violet)',
  amber: 'var(--amber)',
  green: 'var(--green)'
};

function Projects() {
  return (
    <Section
      id="projects"
      num="02"
      label="SYSTEMS // FEATURED DEPLOYMENTS"
      title="One local-AI stack, built end to end."
      sub="A voice OS, the guardrail engine that polices it, the fuzzer that attacks those guardrails, and the inference engine that fuses policy into the decoder — plus security systems that ship on real edge hardware."
    >
      <StackMap />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 80, marginTop: 88 }}>
        {PROJECTS.map((p, i) => (
          <ProjectModule key={p.id} project={p} index={i} />
        ))}
      </div>
      <SideProjectsGrid />
    </Section>
  );
}

// --- Stack map: the four systems and their real dependencies ---
// Lethe red-teams NeuroSym · NeuroSym guards NORA · Synapse compiles
// NeuroSym policies into the decoder that serves NORA.

const STACK_EDGES = ['red-teams', 'compiles into', 'decodes for'];

const stackMapCss = `
  .stack-map {
    display: grid;
    grid-template-columns: 1fr 64px 1fr 64px 1fr 64px 1fr;
    grid-template-rows: auto auto;
    align-items: stretch;
  }
  .stack-bracket {
    grid-row: 1;
    grid-column: 3 / 8;
    height: 30px;
    margin: 0 10%;
    border-top: 1px solid var(--hairline-strong);
    border-left: 1px solid var(--hairline-strong);
    border-right: 1px solid var(--hairline-strong);
    position: relative;
    margin-bottom: 14px;
  }
  .stack-bracket span {
    position: absolute;
    top: -8px; left: 50%;
    transform: translate(-50%, -50%);
    padding: 0 12px;
    background: var(--bg-0);
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--fg-2);
    white-space: nowrap;
  }
  .stack-node { grid-row: 2; }
  .stack-edge {
    grid-row: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 0 6px;
  }
  .stack-edge .edge-label {
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--fg-2);
    text-align: center;
    line-height: 1.4;
  }
  .stack-edge .edge-line {
    position: relative;
    width: 100%;
    height: 1px;
    background: var(--hairline-strong);
  }
  .stack-edge .edge-line::after {
    content: '';
    position: absolute;
    right: -1px; top: -3px;
    border-left: 6px solid var(--hairline-strong);
    border-top: 3.5px solid transparent;
    border-bottom: 3.5px solid transparent;
  }
  @media (max-width: 820px) {
    .stack-map {
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: none;
      justify-items: center;
    }
    .stack-bracket { display: none; }
    .stack-node, .stack-edge { grid-row: auto; grid-column: 1; width: 100%; max-width: 380px; }
    .stack-edge { padding: 10px 0; flex-direction: row; justify-content: center; gap: 10px; }
    .stack-edge .edge-line { width: 1px; height: 28px; }
    .stack-edge .edge-line::after {
      right: -3px; top: auto; bottom: -1px;
      border-left: 3.5px solid transparent;
      border-right: 3.5px solid transparent;
      border-top: 6px solid var(--hairline-strong);
      border-bottom: none;
    }
  }
`;

function StackMap() {
  const nodes = STACK_MAP.nodes;
  return (
    <Reveal>
      <style>{stackMapCss}</style>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22,
        fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em',
        textTransform: 'uppercase', color: 'var(--fg-2)'
      }}>
        <span style={{ color: 'var(--cyan)' }}>◈</span>
        <span>THE STACK — FOUR SYSTEMS, ONE LOOP</span>
        <span style={{ flex: 1, height: 1, background: 'var(--hairline)' }}></span>
      </div>
      <div className="stack-map">
        <div className="stack-bracket"><span>guards every action of</span></div>
        {nodes.map((n, i) => (
          <React.Fragment key={n.id}>
            <StackNode node={n} />
            {i < nodes.length - 1 && (
              <div className="stack-edge">
                <span className="edge-label">{STACK_EDGES[i]}</span>
                <span className="edge-line"></span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <p style={{
        marginTop: 20,
        fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1.6,
        color: 'var(--fg-2)', letterSpacing: '0.04em', maxWidth: 720
      }}>
        These aren't four repos that happen to share an author — NORA imports neurosym-ai,
        Synapse compiles NeuroSym policies into its decoder, and Lethe ships a NeuroSym
        adapter to attack it. Select a node to inspect the system.
      </p>
    </Reveal>
  );
}

function StackNode({ node }) {
  const [hover, setHover] = projUseState(false);
  const accent = ACCENT_VAR[node.accent] || 'var(--cyan)';
  return (
    <a
      className="stack-node"
      href={`#sys-${node.id}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'block',
        textDecoration: 'none',
        padding: '16px 16px 14px',
        border: `1px solid ${hover ? alpha(accent, 0.5) : 'var(--hairline)'}`,
        borderRadius: 3,
        background: hover
          ? `linear-gradient(180deg, ${alpha(accent, 0.07)}, oklch(0.16 0.014 250 / 0.7))`
          : 'oklch(0.16 0.014 250 / 0.55)',
        boxShadow: hover ? `0 12px 40px -20px ${alpha(accent, 0.5)}` : 'none',
        transition: 'border-color 0.25s, background 0.25s, box-shadow 0.25s'
      }}
    >
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.22em',
        color: accent, marginBottom: 8
      }}>{node.role}</div>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 17, fontWeight: 500,
        letterSpacing: '0.02em', color: 'var(--fg-0)', marginBottom: 6,
        display: 'flex', alignItems: 'center', gap: 8
      }}>
        {node.name}
        <span style={{
          width: 5, height: 5, borderRadius: '50%',
          background: accent, boxShadow: `0 0 6px ${accent}`
        }}></span>
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.03em',
        color: 'var(--fg-2)', lineHeight: 1.5
      }}>{node.desc}</div>
    </a>
  );
}

// --- Featured system module ---

function ProjectModule({ project, index }) {
  const accent = project.accent === 'violet' ? 'var(--violet)' : 'var(--cyan)';

  return (
    <Reveal>
      <article id={`sys-${project.id}`} style={{ position: 'relative', scrollMarginTop: 90 }}>
        {/* index marker */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap',
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
          <ProjectLinks project={project} accent={accent} />
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
            {project.install && (
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                alignSelf: 'flex-start',
                padding: '10px 16px',
                border: `1px solid ${alpha(accent, 0.3)}`,
                borderRadius: 3,
                background: 'oklch(0.13 0.012 250 / 0.7)',
                fontFamily: 'var(--font-mono)', fontSize: 13,
                color: 'var(--fg-0)'
              }}>
                <span style={{ color: accent }}>$</span>
                <span>{project.install}</span>
              </div>
            )}
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

function ProjectLinks({ project, accent }) {
  if (!project.repo && !project.pypi) return null;
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
      {project.repo && <LinkButton href={project.repo} label="GITHUB" accent={accent} />}
      {project.pypi && <LinkButton href={project.pypi} label="PYPI" accent={accent} />}
    </div>
  );
}

function LinkButton({ href, label, accent }) {
  const [hover, setHover] = projUseState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '9px 14px',
        fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: hover ? accent : 'var(--fg-1)',
        border: `1px solid ${hover ? alpha(accent, 0.5) : 'var(--hairline-strong)'}`,
        borderRadius: 2,
        textDecoration: 'none',
        background: hover ? alpha(accent, 0.06) : 'transparent',
        transition: 'color 0.2s, border-color 0.2s, background 0.2s',
        whiteSpace: 'nowrap'
      }}
    >
      <span>{label}</span>
      <ArrowUpRight />
    </a>
  );
}

function ArrowUpRight() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
      <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
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

// --- Compact tier: agents & tools ---

function SideProjectsGrid() {
  return (
    <div style={{ marginTop: 110 }}>
      <Reveal>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28,
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: 'var(--fg-2)'
        }}>
          <span style={{ color: 'var(--violet)' }}>◈</span>
          <span>MORE BUILDS // AGENTS &amp; TOOLS</span>
          <span style={{ flex: 1, height: 1, background: 'var(--hairline)' }}></span>
        </div>
      </Reveal>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 20
      }}>
        {SIDE_PROJECTS.map((p, i) => (
          <Reveal key={p.name} delay={i * 90}>
            <SideProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function SideProjectCard({ project }) {
  const accent = ACCENT_VAR[project.accent] || 'var(--cyan)';
  return (
    <Panel hoverGlow accent={project.accent === 'violet' ? 'violet' : 'cyan'} style={{
      padding: '24px 22px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 500,
          letterSpacing: '0.02em', color: 'var(--fg-0)'
        }}>{project.name}</span>
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} on GitHub`}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em',
            color: accent, textDecoration: 'none'
          }}
        >
          <span>REPO</span>
          <ArrowUpRight />
        </a>
      </div>
      <p style={{
        fontSize: 13.5, lineHeight: 1.6, color: 'var(--fg-1)',
        fontWeight: 300, textWrap: 'pretty', flex: 1
      }}>{project.desc}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {project.tags.map((t, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-mono)', fontSize: 10,
            color: 'var(--fg-2)', letterSpacing: '0.06em',
            padding: '3px 9px',
            border: '1px solid var(--hairline)',
            borderRadius: 999
          }}>{t}</span>
        ))}
      </div>
    </Panel>
  );
}

Object.assign(window, { Projects });
