const fs = require('fs');
const path = require('path');

const pageFile = path.resolve(__dirname, '../app/page.tsx');
let content = fs.readFileSync(pageFile, 'utf8');

// 1. Remove the badge
const badgeBlock = `          {/* Badge — slowest parallax layer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ y: parallaxBadge }}
            className="flex items-center gap-2 mb-12 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-xl proximity-glow"
          >
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_12px_rgba(154,123,79,0.6)]" />
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-primary/70 uppercase">Neural Link Synchronized</span>
          </motion.div>
`;

content = content.replace(badgeBlock, '');

// 2. Define New Sections
const coreValues = `
function CoreValues() {
  const values = [
    { title: "Pure Speed", desc: "From idea to deployment in days, not months." },
    { title: "Zero Noise", desc: "No jargon. No meetings. Just progress you can see." },
    { title: "Premium Design", desc: "Aesthetics that command attention and trust." }
  ];

  return (
    <section className="py-32 px-6 md:px-20 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {values.map((v, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="p-10 rounded-[2.5rem] bg-white border border-[#080705]/5 hover:border-primary/20 transition-all duration-700 shadow-sm hover:shadow-xl group"
          >
            <div className="w-12 h-12 mb-8 rounded-2xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            </div>
            <h3 className="text-3xl font-light mb-4">{v.title}</h3>
            <p className="text-[#080705]/50 leading-relaxed font-light">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function PhaseZeroHero() {
  const steps = [
    { label: "Phase 01", title: "Waitlist", status: "Current" },
    { label: "Phase 02", title: "Early Access", status: "Q3 2026" },
    { label: "Phase 03", title: "Public Launch", status: "Coming Soon" }
  ];

  return (
    <section className="py-40 px-6 md:px-20 bg-[#080705] text-[#FAF9F6] overflow-hidden relative rounded-t-[3rem] -mt-10">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,var(--primary),transparent)]" />
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-5xl md:text-8xl font-light mb-24 tracking-tighter">The Journey.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((s, i) => (
            <div key={i} className="relative pt-12 border-t border-white/10">
               <span className="font-mono text-[10px] tracking-[0.4em] text-primary uppercase mb-6 block font-bold">{s.label}</span>
               <h4 className="text-4xl font-light mb-4">{s.title}</h4>
               <span className="text-white/20 text-sm font-mono tracking-widest">{s.status}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`;

// Replace Protocol component logic with new ones
// Finding the block from STICKY_ITEMS to ClientOnlyHex end
const protocolRegex = /\/\/ ── PROTOCOL STEPS ──[\s\S]*?return <>\s*\{hex\}\s*<\/>;\s*\}/;
content = content.replace(protocolRegex, coreValues);

// Replace ProtocolSteps usage with CoreValues/PhaseZero in main
content = content.replace('<ProtocolSteps />', ''); // ProtocolSteps was removed manually in my conceptual thought but might still be there if refine1 failed at usage.
// I'll search for WaitlistSection and insert before it
content = content.replace('<WaitlistSection />', '<CoreValues />\n      <PhaseZeroHero />\n      <WaitlistSection />');

fs.writeFileSync(pageFile, content);
console.log('Successfully applied all landing page changes');
