// Main app

const { useState, useEffect } = React;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // apply scheme + font reactively
  useEffect(() => { applyAccentScheme(tweaks.accentScheme); }, [tweaks.accentScheme]);
  useEffect(() => { applyFontDisplay(tweaks.fontDisplay); }, [tweaks.fontDisplay]);

  // smooth scroll
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = ''; };
  }, []);

  // postMessage slide index for speaker-notes parity (not used here, but harmless)
  return (
    <>
      <SideNav />
      <main>
        <Hero tweaks={tweaks} />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Publications />
        <Contact />
      </main>
      <PortfolioTweaks tweaks={tweaks} setTweak={setTweak} />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
