// Tweaks panel — exposes design knobs

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "graphOn": true,
  "graphDensity": 1.0,
  "graphSpeed": 1.0,
  "accentScheme": "cyan-violet",
  "fontDisplay": "Geist",
  "tagline": "Building Secure, Intelligent Systems at the Edge"
}/*EDITMODE-END*/;

function PortfolioTweaks({ tweaks, setTweak }) {
  return (
    <TweaksPanel title="PORTFOLIO TWEAKS">
      <TweakSection title="Hero Background">
        <TweakToggle
          label="Neural graph"
          value={tweaks.graphOn}
          onChange={v => setTweak('graphOn', v)}
        />
        <TweakSlider
          label="Density"
          value={tweaks.graphDensity}
          min={0.4} max={2.0} step={0.1}
          onChange={v => setTweak('graphDensity', v)}
        />
        <TweakSlider
          label="Speed"
          value={tweaks.graphSpeed}
          min={0.2} max={2.5} step={0.1}
          onChange={v => setTweak('graphSpeed', v)}
        />
      </TweakSection>

      <TweakSection title="Accent Scheme">
        <TweakRadio
          value={tweaks.accentScheme}
          onChange={v => setTweak('accentScheme', v)}
          options={[
            { value: 'cyan-violet', label: 'Cyan / Violet' },
            { value: 'cyan-amber',  label: 'Cyan / Amber' },
            { value: 'green-violet', label: 'Green / Violet' },
            { value: 'mono',         label: 'Mono' }
          ]}
        />
      </TweakSection>

      <TweakSection title="Display Font">
        <TweakSelect
          value={tweaks.fontDisplay}
          onChange={v => setTweak('fontDisplay', v)}
          options={[
            { value: 'Geist', label: 'Geist (default)' },
            { value: 'Space Grotesk', label: 'Space Grotesk' },
            { value: 'JetBrains Mono', label: 'JetBrains Mono (all-mono)' },
            { value: 'IBM Plex Sans', label: 'IBM Plex Sans' }
          ]}
        />
      </TweakSection>

      <TweakSection title="Tagline">
        <TweakText
          value={tweaks.tagline}
          onChange={v => setTweak('tagline', v)}
          multiline
        />
      </TweakSection>
    </TweaksPanel>
  );
}

// Apply scheme to CSS vars
function applyAccentScheme(scheme) {
  const root = document.documentElement;
  const map = {
    'cyan-violet': { c: 'oklch(0.82 0.14 200)', v: 'oklch(0.68 0.18 290)' },
    'cyan-amber':  { c: 'oklch(0.82 0.14 200)', v: 'oklch(0.82 0.14 75)' },
    'green-violet':{ c: 'oklch(0.80 0.18 145)', v: 'oklch(0.68 0.18 290)' },
    'mono':        { c: 'oklch(0.92 0.005 250)', v: 'oklch(0.65 0.012 250)' },
  };
  const m = map[scheme] || map['cyan-violet'];
  root.style.setProperty('--cyan', m.c);
  root.style.setProperty('--violet', m.v);
}

function applyFontDisplay(font) {
  document.documentElement.style.setProperty('--font-display', `'${font}', system-ui, sans-serif`);
  // ensure imported
  const id = `gf-${font.replace(/\s+/g,'-')}`;
  if (!document.getElementById(id)) {
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/\s+/g,'+')}:wght@300;400;500;600;700&display=swap`;
    document.head.appendChild(link);
  }
}

Object.assign(window, { PortfolioTweaks, TWEAK_DEFAULTS, applyAccentScheme, applyFontDisplay });
