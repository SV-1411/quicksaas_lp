const fs = require('fs');
const path = require('path');

const pageFile = path.resolve(__dirname, '../app/page.tsx');
let content = fs.readFileSync(pageFile, 'utf8');

// 1. Add Particles import
if (!content.includes('import Particles')) {
  content = content.replace(
    "import DotGrid from '../components/DotGrid';",
    "import DotGrid from '../components/DotGrid';\nimport Particles from '../components/Particles';"
  );
}

// 2. Remove the "Neural Link Synchronized" Badge
const oldBadge = `          {/* Badge — slowest parallax layer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ y: parallaxBadge }}
            className="flex items-center gap-2 mb-12 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-xl proximity-glow"
          >
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_12px_rgba(154,123,79,0.6)]" />
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-primary/70 uppercase">Neural Link Synchronized</span>
          </motion.div>`;
content = content.replace(oldBadge, '');

// 3. Add Particles animation around the title
// We'll wrap the h1 in the div mentioned by the user, but we'll adapt it to fit the layout.
const oldHeadline = `          {/* Headline — Premium Antigravity Reveal */}
          <h1 className="text-[clamp(48px,9vw,120px)] font-light tracking-[-0.07em] leading-[0.85] text-[#080705] mb-10">
            <div className="overflow-hidden py-2">
              <BlurRevealText text="QuickSaaS" delay={0.2} className="justify-center font-bold" />
            </div>
            <div className="overflow-hidden py-2">
              <BlurRevealText text="Coming Soon." delay={0.8} className="text-primary italic font-serif mt-2 justify-center" />
            </div>
          </h1>`;

const newHeadline = `          {/* Headline — Premium Antigravity Reveal with Particles */}
          <div className="relative w-full max-w-4xl h-[400px] mb-10 flex items-center justify-center">
            <div className="absolute inset-0 z-0 pointer-events-auto">
              <Particles
                particleColors={["#9A7B4F", "#C2A36D", "#ffffff"]}
                particleCount={300}
                particleSpread={12}
                speed={0.15}
                particleBaseSize={80}
                moveParticlesOnHover
                alphaParticles={false}
                disableRotation={false}
                pixelRatio={1}
                style={{ width: '100%', height: '100%', position: 'absolute' }}
              />
            </div>
            <h1 className="relative z-10 text-[clamp(48px,9vw,120px)] font-light tracking-[-0.07em] leading-[0.85] text-[#080705] pointer-events-none">
              <div className="overflow-hidden py-2">
                <BlurRevealText text="QuickSaaS" delay={0.2} className="justify-center font-bold" />
              </div>
              <div className="overflow-hidden py-2">
                <BlurRevealText text="Coming Soon." delay={0.8} className="text-primary italic font-serif mt-2 justify-center" />
              </div>
            </h1>
          </div>`;

content = content.replace(oldHeadline, newHeadline);

fs.writeFileSync(pageFile, content);
console.log('Successfully added Particles and removed Neural Link badge');
