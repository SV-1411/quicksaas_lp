const fs = require('fs');
const path = require('path');

const pageFile = path.resolve(__dirname, '../app/page.tsx');
let content = fs.readFileSync(pageFile, 'utf8');

// 1. Update LOADING_MESSAGES
const newMessages = `const LOADING_MESSAGES = [
  "Something special is arriving...",
  "Good things take time.",
  "Greatness in progress...",
  "Almost ready for launch."
];`;
content = content.replace(/const LOADING_MESSAGES = \[[\s\S]*?\];/, newMessages);

// 2. Update Loader DotGrid gap to 30
content = content.replace(
  'gap={15}',
  'gap={30}'
);

// 3. Remove "Neural Link Synchronized" Badge
const badgeRegex = /\{(\/\* Badge — slowest parallax layer \*\/|)\s*<motion\.div[\s\S]*?Neural Link Synchronized[\s\S]*?<\/motion\.div>\s*\}/;
content = content.replace(badgeRegex, '');

// 4. Move Particles into background and Simplify Hero
const oldHeroDivStart = `        <motion.div
          className="relative z-20 flex flex-col items-center text-center px-6 max-w-5xl mx-auto transform-gpu"`;

// We will find the entire headline with particles block
const oldHeadlineWithParticles = `          {/* Headline — Premium Antigravity Reveal with Particles */}
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

const newHeadline = `          {/* Headline — High Impact Minimalist */}
          <h1 className="relative z-10 text-[clamp(48px,9vw,120px)] font-light tracking-[-0.07em] leading-[0.85] text-[#080705] mb-12">
            <div className="overflow-hidden py-2">
              <BlurRevealText text="QuickSaaS" delay={0.2} className="justify-center font-bold" />
            </div>
            <div className="overflow-hidden py-2">
              <BlurRevealText text="Coming Soon." delay={0.8} className="text-primary italic font-serif mt-2 justify-center" />
            </div>
          </h1>`;

content = content.replace(oldHeadlineWithParticles, newHeadline);

// Add Particles as a full screen background in Section
const oldParticlesInsert = `        {/* Antigravity Tracking Orb */}`;
const fullPageParticles = `        {/* Background Particles — Covers Entire Section */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Particles
            particleColors={["#9A7B4F", "#C2A36D", "#ffffff"]}
            particleCount={500}
            particleSpread={15}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover
            alphaParticles={false}
            disableRotation={false}
            pixelRatio={1}
            style={{ width: '100%', height: '100%', position: 'absolute' }}
          />
        </div>
\n        {/* Antigravity Tracking Orb */}`;

content = content.replace(oldParticlesInsert, fullPageParticles);

// 5. Simplify Hero Subtitle
const oldSubtitle = `          {/* Subtitle — faster parallax */}
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }}
            style={{ y: parallaxSub }}
            className="text-[#080705]/50 text-lg md:text-xl max-w-xl mx-auto font-light tracking-wide leading-relaxed mb-16"
          >
            We are engineering the future of digital product commissioning.<br />
            Fast. Scalable. Invisible.
          </motion.p>`;

const newSubtitle = `          {/* Subtitle — Minimalist Diction */}
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }}
            style={{ y: parallaxSub }}
            className="text-[#080705]/60 text-lg md:text-xl max-w-xl mx-auto font-light tracking-wide leading-relaxed mb-16 px-4"
          >
            Building the next generation of software, delivered at the speed of thought.<br /> 
            One brief. Infinite possibilities. Zero management.
          </motion.p>`;

content = content.replace(oldSubtitle, newSubtitle);

fs.writeFileSync(pageFile, content);
console.log('Successfully completed first half of refinements');
