const fs = require('fs');
const path = require('path');

const pageFile = path.resolve(__dirname, '../app/page.tsx');
let content = fs.readFileSync(pageFile, 'utf8');

const journeyComponent = \`
const JOURNEY_ITEMS = [
  { num: '01', title: 'Phase 01: Waitlist.', body: 'Secure your place in the early queue. We are hand-selecting our initial cohort based on brief complexity and outcome vision.', tech: 'WAITLIST_ACTIVE' },
  { num: '02', title: 'Phase 02: Early Alpha.', body: 'A selective rollout for our waitlist members to experience the commissioning engine firsthand. Real-time delivery at the scale of thought.', tech: 'ROLLOUT_Q3_2026' },
  { num: '03', title: 'Phase 03: Global Launch.', body: 'Full system availability. Transparent software commissioning becomes the new global standard for modern engineering teams.', tech: 'UPCOMING_RELEASE' },
];

function JourneySteps() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const dialRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div ref={containerRef} className="relative flex flex-col md:flex-row md:items-start gap-20 px-6 md:px-20 py-32 max-w-7xl mx-auto">
      {/* Structural Visual Bridge */}
      <div className="hidden md:block absolute left-[33.333%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-black/5 to-transparent z-0 ml-[-40px]" />

      {/* Sticky Sidebar Area */}
      <div className="md:sticky md:top-24 md:h-[calc(100vh-120px)] md:w-1/3 z-10 flex flex-col justify-between py-10">
        <div className="relative">
          <div className="absolute -inset-10 bg-primary/5 rounded-full blur-3xl opacity-30 pointer-events-none" />
          <h3 className="text-[10px] font-mono font-black tracking-[0.5em] text-primary/50 uppercase mb-12 flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(154,123,79,0.5)]" />
            Project Roadmap
          </h3>

          <div className="relative w-32 h-32 mb-16">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[#080705]/10" />
              <motion.circle
                cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2"
                strokeDasharray="283"
                style={{ strokeDashoffset: useTransform(scrollYProgress, [0, 1], [283, 0]) }}
                className="text-primary"
              />
            </svg>
            <motion.div
              style={{ rotate: dialRotate }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="w-0.5 h-16 bg-gradient-to-t from-primary/60 to-transparent absolute top-0 rounded-full" />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center font-serif italic text-4xl text-primary/20">
               {JOURNEY_ITEMS[activeStep].num}
            </div>
          </div>

          <div className="space-y-6">
            {JOURNEY_ITEMS.map((item, i) => (
              <motion.div
                key={item.num}
                className={cn(
                  "transition-all duration-1000 cursor-pointer group relative py-4 pl-6 border-l",
                  activeStep === i
                    ? "border-primary opacity-100 translate-x-4 bg-primary/[0.03]"
                    : "border-black/5 opacity-20 hover:opacity-40 hover:border-black/10"
                )}
                onClick={() => {
                  const element = document.getElementById(\`journey-step-\${i}\`);
                  element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
              >
                <div className="flex flex-col">
                  <span className="text-[11px] font-mono tracking-[0.3em] uppercase font-bold text-[#080705]/90">{item.title}</span>
                  <div className="text-[9px] font-mono opacity-30 mt-1 uppercase tracking-widest">{item.tech}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative flex-1 space-y-[60vh] pb-[20vh] pt-10">
        {JOURNEY_ITEMS.map((item, i) => (
          <motion.div
            key={item.num}
            id={\`journey-step-\${i}\`}
            onViewportEnter={() => setActiveStep(i)}
            initial={{ opacity: 0.2, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-25%" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="group relative"
          >
            <div className="absolute -inset-16 bg-primary/5 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-[120px] pointer-events-none" />

            <div className="relative bg-white/70 backdrop-blur-md rounded-[2.5rem] p-16 md:p-24 border border-[#080705]/10 hover:border-primary/40 transition-all duration-1000 overflow-hidden shadow-sm hover:shadow-lg">
              <div className="absolute top-10 right-10 font-mono text-[14px] text-primary select-none font-bold uppercase tracking-[0.5em]">
                {item.tech}
              </div>
              
              <h3 className="text-6xl md:text-8xl font-light tracking-tighter text-[#080705] mb-14 leading-[0.8] drop-shadow-sm">
                {item.title}
              </h3>

              <p className="text-[#080705]/50 font-light leading-relaxed text-2xl max-w-xl mb-16">
                {item.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
\`;

// 1. Delete CoreValues and PhaseZeroHero definitions
const coreValuesDef = content.match(/function CoreValues\(\) \{[\s\S]*?<\/section>\s*;\s*\}/);
if (coreValuesDef) content = content.replace(coreValuesDef[0], '');

const phaseZeroDef = content.match(/function PhaseZeroHero\(\) \{[\s\S]*?<\/section>\s*;\s*\}/);
if (phaseZeroDef) content = content.replace(phaseZeroDef[0], '');

// 2. Insert JourneySteps where they were
content = content.replace('// MagneticButton was removed for performance optimization (layout thrashing)', '// MagneticButton removed\n' + journeyComponent);

// 3. Ensure Badge is removed if it missed (check current state)
const badgeBlock = \`          {/* Badge — slowest parallax layer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ y: parallaxBadge }}
            className="flex items-center gap-2 mb-12 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-xl proximity-glow"
          >
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_12px_rgba(154,123,79,0.6)]" />
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-primary/70 uppercase">Neural Link Synchronized</span>
          </motion.div>\`;

if (content.includes(badgeBlock)) {
  content = content.replace(badgeBlock, '');
} else {
  // Try partial match if formatting changed
  content = content.replace(/<motion\.div[\s\S]*?Neural Link Synchronized[\s\S]*?<\/motion\.div>/, '');
}

// 4. Headline Fix (mt-2 to mt-10)
content = content.replace('mt-2 justify-center', 'mt-10 justify-center');
content = content.replace('leading-[0.85]', 'leading-[1.1]');

fs.writeFileSync(pageFile, content);
console.log('Fixed JourneySteps missing error and Hero overlapping font');
