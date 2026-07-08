// K-Aqua × Coday — Light Enterprise page shell + tweaks wiring.
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "teal",
  "heroGrid": true,
  "glow": 60
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  return (
    <div className="kl-page" data-accent={t.accent}>
      <Nav />
      <Hero showDots={t.heroGrid} />
      <StatsBand glow={t.glow} />
      <ProductSection />
      <ComplianceAndRange />
      <CtaBand glow={t.glow} />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Akzent" />
        <TweakRadio label="Farbakzent" value={t.accent}
          options={[{ value: 'teal', label: 'Teal' }, { value: 'teal-amber', label: 'Teal + Amber' }]}
          onChange={(v) => setTweak('accent', v)} />
        <TweakSection label="Effekte" />
        <TweakToggle label="Hero-Rasterpunkte" value={t.heroGrid} onChange={(v) => setTweak('heroGrid', v)} />
        <TweakSlider label="Glow-Intensität (dunkle Bänder)" value={t.glow} min={0} max={100} step={5} unit="%" onChange={(v) => setTweak('glow', v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
