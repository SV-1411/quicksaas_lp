const fs = require('fs');
const path = require('path');

const pageFile = path.resolve(__dirname, '../app/page.tsx');
let content = fs.readFileSync(pageFile, 'utf8');

const loaderAndWaitlist = `
function Loader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 5) + 1;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(onComplete, 600);
      }
      setCount(current);
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-black flex flex-col justify-end p-8 md:p-12 text-white"
    >
      <div className="w-full flex justify-between items-end">
        <div></div>
        <div className="flex items-center gap-4">
           <motion.div 
             animate={{ rotate: 360 }} 
             transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
             className="w-8 h-8 rounded-full border-t-2 border-l-2 border-white/80"
           />
           <div className="text-4xl md:text-6xl font-light font-mono">
             {count}%
           </div>
        </div>
      </div>
    </motion.div>
  );
}

function WaitlistSection() {
  return (
    <section className="relative z-30 bg-[#080705] text-[#FAF9F6] py-[20vh] px-6 md:px-20 border-t border-[#080705]/8 overflow-hidden flex flex-col items-center justify-center text-center">
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/20 blur-[120px] rounded-full mix-blend-screen" />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-screen" />
      </div>
      <div className="relative z-10 max-w-4xl">
        <h2 className="text-[clamp(36px,5.5vw,80px)] font-light tracking-tighter leading-[0.9] mb-10">
          The vector is <span className="text-primary italic font-serif">initializing.</span>
        </h2>
        <p className="text-[#FAF9F6]/50 text-lg md:text-xl font-light tracking-wide mb-16 max-w-2xl mx-auto">
          Join the exclusive waitlist to secure early access. System deployment in progress.
        </p>
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 max-w-xl mx-auto">
          <input 
            type="email" 
            placeholder="ENTER PROTOCOL ID (EMAIL)" 
            className="flex-1 bg-white/5 border border-white/10 px-8 py-5 text-[10px] uppercase tracking-[0.2em] rounded-none text-white focus:outline-none focus:border-primary/50 transition-colors placeholder:text-white/20"
          />
          <button className="px-10 py-5 bg-primary text-[#080705] text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:bg-white shadow-xl flex items-center justify-center gap-4 group">
            Priority Access
            <div className="w-1.5 h-1.5 bg-[#080705] rounded-full animate-ping" />
          </button>
        </div>
      </div>
    </section>
  );
}
`;

content = content.replace('export default function HomePage() {', loaderAndWaitlist + '\nexport default function HomePage() {\n  const [isLoading, setIsLoading] = useState(true);\n');

content = content.replace(
  '<main className="relative bg-[#FAF9F6] text-[#080705] font-sans selection:bg-primary/20">',
  '<AnimatePresence mode="wait">\n      {isLoading ? (\n        <Loader key="loader" onComplete={() => setIsLoading(false)} />\n      ) : (\n        <motion.div key="main" initial={{ y: "-100vh" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}>\n          <main className="relative bg-[#FAF9F6] text-[#080705] font-sans selection:bg-primary/20">'
);

// We want to replace from {/* ════ 4. CTA ═══════════════════════════════════════ */} onwards
const ctaIndex = content.indexOf('{/* ════ 4. CTA ═══════════════════════════════════════ */}');
const closeMainIndex = content.lastIndexOf('</main>');

if (ctaIndex !== -1 && closeMainIndex !== -1) {
  const replacementTail = `
      {/* ════ 4. WAITLIST (Replaces CTA & Footer) ═══════════════════════════════════ */}
      <WaitlistSection />

      {/* We are back fixed text (bottom left) */}
      <div className="fixed bottom-6 left-6 z-50 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#080705] border border-white/10 backdrop-blur-xl shadow-lg opacity-90"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
          <span className="text-[10px] font-mono tracking-[0.3em] text-white/80 uppercase font-bold">
            We are back
          </span>
        </motion.div>
      </div>

      {/* Powered by Airo Builder Fixed Badge */}
      <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/60 border border-[#080705]/10 backdrop-blur-xl shadow-lg pointer-events-auto hover:bg-white/80 hover:border-primary/20 transition-all cursor-default group">
          <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.4)]" />
          <span className="text-[10px] font-mono tracking-[0.2em] text-[#080705]/50 uppercase group-hover:text-[#080705]/80 transition-colors">
            Powered by <span className="text-violet-600 font-bold tracking-widest">Airo Builder</span>
          </span>
        </div>
      </div>
    </main>
        </motion.div>
      )}
    </AnimatePresence>
`;

  content = content.substring(0, ctaIndex) + replacementTail + content.substring(closeMainIndex + 7);
}

fs.writeFileSync(pageFile, content);
console.log('Successfully updated page.tsx with protocol and concept intact.');
