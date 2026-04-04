const fs = require('fs');
const path = require('path');

const pageFile = path.resolve(__dirname, '../app/page.tsx');
const lines = fs.readFileSync(pageFile, 'utf8').split('\n');

// We will build a new array of lines, replacing or skipping as needed
const newLines = [];
let skipMode = false;
let skipUntil = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // 1. Changing the Hero Headline
  if (line.includes('{/* Headline — Premium Antigravity Reveal */}')) {
    skipMode = true;
    skipUntil = '</motion.p>';
    
    // Insert new Hero text
    newLines.push(`          {/* Headline — Premium Antigravity Reveal */}`);
    newLines.push(`          <h1 className="text-[clamp(48px,9vw,120px)] font-light tracking-[-0.07em] leading-[0.85] text-[#080705] mb-10">`);
    newLines.push(`            <div className="overflow-hidden py-2">`);
    newLines.push(`              <BlurRevealText text="QuickSaaS" delay={0.2} className="justify-center font-bold" />`);
    newLines.push(`            </div>`);
    newLines.push(`            <div className="overflow-hidden py-2">`);
    newLines.push(`              <BlurRevealText text="Coming Soon." delay={0.8} className="text-primary italic font-serif mt-2 justify-center" />`);
    newLines.push(`            </div>`);
    newLines.push(`          </h1>`);
    newLines.push(``);
    newLines.push(`          {/* Subtitle — faster parallax */}`);
    newLines.push(`          <motion.p`);
    newLines.push(`            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }}`);
    newLines.push(`            style={{ y: parallaxSub }}`);
    newLines.push(`            className="text-[#080705]/50 text-lg md:text-xl max-w-xl mx-auto font-light tracking-wide leading-relaxed mb-16"`);
    newLines.push(`          >`);
    newLines.push(`            We are engineering the future of digital product commissioning.<br />`);
    newLines.push(`            Fast. Scalable. Invisible.`);
    newLines.push(`          </motion.p>`);
    continue;
  }

  // 2. Erasing the CTAs
  if (line.includes('{/* CTAs */}')) {
    skipMode = true;
    skipUntil = '</motion.div>';
    continue;
  }

  // 3. Erasing the Partners (In Partnership With)
  if (line.includes('{/* Partners Section */}')) {
    skipMode = true;
    skipUntil = '</motion.div>';
    continue;
  }

  // 4. Erasing Protocol section completely
  if (line.includes('{/* ════ 3. PROTOCOL ═══════════════════════════════════════ */}')) {
    skipMode = true;
    skipUntil = '</section>';
    continue;
  }
  
  // 5. Erasing The Concept section (since user says there are still too many details on the landing page)
  if (line.trim() === '{/* ════ 2. THE CONCEPT ═══════════════════════════════════ */}') {
    skipMode = true;
    skipUntil = '</section>';
    continue;
  }

  if (skipMode) {
    if (line.includes(skipUntil)) {
      // Reached the end condition.
      // For `</motion.div>`, there could be multiple, so we check carefully if it matches our end condition exactly.
      // Actually simply looking for `</motion.div>` or `</section>` might wrongly close if there's arbitrary nesting.
      // But looking at our codebase: 
      // After CTAs <motion.div>, ends with `          </motion.div>`
      // Protocol ends with `      </section>`
      // Concept ends with `      </section>`
      if (skipUntil === '</motion.div>' && line.trim() === '</motion.div>') {
          skipMode = false;
      } else if (skipUntil === '</section>' && line.trim() === '</section>') {
          skipMode = false;
      } else if (skipUntil === '</motion.p>' && line.trim() === '</motion.p>') {
          skipMode = false;
      }
    }
    continue;
  }

  // 6. Replacing the "We are back" size
  if (line.includes('We are back') || line.includes('WE ARE BACK')) {
    // Replaced in previous lines
    continue;
  }
  if (line.includes('bg-green-500 animate-pulse') && line.includes('rounded-full')) {
    newLines.push(`          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.6)]" />`);
    newLines.push(`          <span className="text-xl md:text-2xl font-sans tracking-widest text-white/90 uppercase font-black px-2">`);
    newLines.push(`            WE ARE BACK`);
    newLines.push(`          </span>`);
    continue;
  }

  newLines.push(line);
}

fs.writeFileSync(pageFile, newLines.join('\n'));
console.log('Successfully applied all changes.');
