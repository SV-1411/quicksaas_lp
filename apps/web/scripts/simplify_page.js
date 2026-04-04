const fs = require('fs');
const path = require('path');

const pageFile = path.resolve(__dirname, '../app/page.tsx');
let content = fs.readFileSync(pageFile, 'utf8');

// 1. Simplify Hero Text & Title
content = content.replace(
`          {/* Headline — Premium Antigravity Reveal */}
          <h1 className="text-[clamp(48px,9vw,120px)] font-light tracking-[-0.07em] leading-[0.85] text-[#080705] mb-10">
            <div className="overflow-hidden py-2">
              <BlurRevealText 
                text="Order your software." 
                delay={0.2}
                className="justify-center" 
              />
            </div>
            <div className="overflow-hidden py-2">
              <BlurRevealText 
                text="We'll handle the rest." 
                delay={0.8}
                className="text-primary italic font-serif mt-2 justify-center" 
              />
            </div>
          </h1>

          {/* Subtitle — faster parallax */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{ y: parallaxSub }}
            className="text-[#080705]/50 text-lg md:text-xl max-w-xl font-light tracking-wide leading-relaxed mb-16"
          >
            Managed specialists. Continuous execution. Transparent outcomes.<br />
            Your digital factory, operating silently in the background.
          </motion.p>`,
`          {/* Headline — Premium Antigravity Reveal */}
          <h1 className="text-[clamp(48px,9vw,120px)] font-light tracking-[-0.07em] leading-[0.85] text-[#080705] mb-10">
            <div className="overflow-hidden py-2">
              <BlurRevealText 
                text="QuickSaaS" 
                delay={0.2}
                className="justify-center font-bold" 
              />
            </div>
            <div className="overflow-hidden py-2">
              <BlurRevealText 
                text="Coming Soon." 
                delay={0.8}
                className="text-primary italic font-serif mt-2 justify-center" 
              />
            </div>
          </h1>

          {/* Subtitle — faster parallax */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{ y: parallaxSub }}
            className="text-[#080705]/50 text-lg md:text-xl max-w-xl font-light tracking-wide leading-relaxed mb-16"
          >
            We are engineering the future of digital product commissioning.<br />
            Fast. Scalable. Invisible.
          </motion.p>`
);

// 2. Remove the CTAs
content = content.replace(
`          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            style={{ y: parallaxCTA }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <Link href="/signup">
              <button className="px-12 py-5 bg-[#080705] text-white text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-300 hover:bg-primary hover:-translate-y-1 hover:shadow-xl shadow-lg rounded-none">
                Initiate Vector
              </button>
            </Link>
            <Link href="/login">
              <button className="px-12 py-5 bg-transparent border border-[#080705]/20 text-[#080705] text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-300 hover:bg-[#080705]/5 hover:-translate-y-1 hover:shadow-lg backdrop-blur-xl rounded-none">
                Launch Brief
              </button>
            </Link>
          </motion.div>`,
`          {/* CTAs Removed */}`
);

// 3. Remove PROTOCOL
content = content.replace(
`      {/* ════ 3. PROTOCOL ═══════════════════════════════════════ */}
      <section className="bg-[#FAF9F6] border-t border-[#080705]/8">
        <div className="px-6 md:px-20 pt-24">
          <h2 className="text-[clamp(32px,5vw,72px)] font-light tracking-tight text-[#080705] border-b border-[#080705]/8 pb-10">
            The Gigzs Protocol.
          </h2>
        </div>
        <ProtocolSteps />
      </section>`,
``
);

// 4. Update "We are back" text
content = content.replace(
`          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
          <span className="text-[10px] font-mono tracking-[0.3em] text-white/80 uppercase font-bold">
            We are back
          </span>`,
`          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.6)]" />
          <span className="text-xl md:text-2xl font-sans tracking-widest text-white/90 uppercase font-black px-2">
            WE ARE BACK
          </span>`
);

fs.writeFileSync(pageFile, content);
console.log('Successfully simplified page.tsx');
