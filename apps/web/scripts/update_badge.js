const fs = require('fs');
const path = require('path');

const pageFile = path.resolve(__dirname, '../app/page.tsx');
let content = fs.readFileSync(pageFile, 'utf8');

const weAreBackComponent = `
function WeAreBackBadge() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [-20, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);
  const border = useTransform(scrollYProgress, [0, 1], ["rgba(255,255,255,0.05)", "rgba(34,197,94,0.3)"]);

  return (
    <motion.div 
      style={{ y, opacity, scale, borderColor: border }}
      className="fixed bottom-6 left-6 z-50 pointer-events-none flex items-center gap-4 px-6 py-3 rounded-full bg-[#080705]/60 border backdrop-blur-2xl shadow-2xl"
    >
      <div className="relative flex items-center justify-center">
        <div className="absolute w-4 h-4 bg-green-500/30 blur-md rounded-full animate-pulse" />
        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] z-10" />
      </div>
      <span className="text-xs md:text-sm font-sans tracking-[0.4em] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 uppercase">
        We are back
      </span>
    </motion.div>
  );
}

export default function HomePage() {`;

content = content.replace('export default function HomePage() {', weAreBackComponent);

// Remove the old inline one
const oldBadgeTarget = `<div className="fixed bottom-6 left-6 z-50 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#080705] border border-white/10 backdrop-blur-xl shadow-lg opacity-90"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.6)]" />
          <span className="text-xl md:text-2xl font-sans tracking-widest text-white/90 uppercase font-black px-2">
            WE ARE BACK
          </span>
          <span className="text-xl md:text-2xl font-sans tracking-widest text-white/90 uppercase font-black px-2">
          </span>
        </motion.div>
      </div>`;

content = content.replace(oldBadgeTarget, `<WeAreBackBadge />`);

fs.writeFileSync(pageFile, content);
console.log('Successfully updated WeAreBack badge');
