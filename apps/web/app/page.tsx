'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, RotateCcw, EyeOff, Activity } from 'lucide-react';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring, useVelocity, useAnimationFrame, AnimatePresence, useMotionValue } from 'framer-motion';
import { cn } from '../lib/utils';
import DotGrid from '../components/DotGrid';
import Threads from '../components/Threads';
import { createSupabaseBrowserClient } from '../lib/supabase/browser';

// Removed heavy components like MagneticButton and NeuralFlux to optimize performance
function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <>{children}</>;
}

// ── LIVE TICKER ───────────────────────────────────────────────────────────────
const TICKER = [
  'UPDATE  →  "Logic core synchronized"',
  'UPDATE  →  "Infrastructure layer ready"',
  'UPDATE  →  "Security handshake complete"',
  'INTERNAL  →  [shift handoff — system integrity high]',
  'UPDATE  →  "Operational milestone reached"',
];
function DataTicker() {
  const [idx, setIdx] = useState(0);
  const [cursor, setCursor] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % TICKER.length), 4000);
    const c = setInterval(() => setCursor(v => !v), 530);
    return () => { clearInterval(t); clearInterval(c); };
  }, []);
  return (
    <div className="font-mono text-[11px] tracking-wider text-primary/70 h-5 overflow-hidden transition-all duration-700">
      &gt; {TICKER[idx]}{cursor ? '█' : '\u00A0'}
    </div>
  );
}

// ── SCROLL-REVEAL WORD COMPONENT ──────────────────────────────────────────────

function ScrollRevealText({ text, className }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.2"]
  });

  const words = text.split(' ');

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        return (
          <span key={i} className="inline-block mr-2 overflow-hidden">
            <motion.span
              style={{
                opacity: useTransform(scrollYProgress, [start, end], [0, 1]),
                y: useTransform(scrollYProgress, [start, end], [20, 0])
              }}
              className="inline-block"
            >
              {w}
            </motion.span>
          </span>
        );
      })}
    </div>
  );
}

// ── BLUR-REVEAL TEXT COMPONENT ────────────────────────────────────────────────

function BlurRevealText({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
  const words = text.split(' ');
  return (
    <div className={cn("flex flex-wrap justify-center", className)}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.1,
            ease: [0.2, 0.65, 0.3, 0.9],
          }}
          className="inline-block mr-[0.2em] last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

// MagneticButton was removed for performance optimization (layout thrashing)



const JOURNEY_ITEMS = [
  { num: '01', title: 'Phase 01: Waitlist.', body: 'Secure your place in the early queue. We are hand-selecting our initial cohort based on brief complexity and outcome vision.', tech: 'WAITLIST_ACTIVE' },
  { num: '02', title: 'Phase 02: Global Launch.', body: 'Full system availability. Transparent software commissioning becomes the new global standard for modern engineering teams.', tech: 'UPCOMING_RELEASE' },
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
                  const element = document.getElementById(`journey-step-${i}`);
                  element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
              >
                <div className="flex flex-col">
                  <span className="text-[11px] font-mono tracking-[0.3em] uppercase font-bold text-[#080705]/90">{item.title}</span>
                  <div className="flex gap-4 items-center mt-1">
                    <div className="text-[9px] font-mono opacity-30 uppercase tracking-widest">{item.tech}</div>
                  </div>
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
            id={`journey-step-${i}`}
            onViewportEnter={() => setActiveStep(i)}
            initial={{ opacity: 0.2, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-25%" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="group relative"
          >
            <div className="absolute -inset-16 bg-primary/5 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-[120px] pointer-events-none" />

            <div className="relative bg-white/70 backdrop-blur-md rounded-[2.5rem] p-16 md:p-24 border border-[#080705]/10 hover:border-primary/40 transition-all duration-1000 overflow-hidden shadow-sm hover:shadow-lg">
              <div className="absolute top-10 right-10 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 font-mono text-[10px] text-primary select-none font-bold uppercase tracking-[0.3em]">
                {item.tech}
              </div>
              
              <h3 className="text-5xl md:text-7xl font-light tracking-tighter text-[#080705] mb-8 leading-[1.1] drop-shadow-sm">
                {item.title}
              </h3>
              <p className="text-[#080705]/50 font-light leading-relaxed text-lg md:text-2xl max-w-xl mb-12">
                {item.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}




const LOADING_MESSAGES = [
  "Something special is arriving...",
  "Good things take time.",
  "Greatness in progress...",
  "Almost ready for launch."
];

function Loader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    let current = 0;
    const duration = 8000; // 8 seconds loading time
    const intervalTime = 50;
    const ticks = duration / intervalTime;
    const increment = 100 / ticks;

    const interval = setInterval(() => {
      current += increment;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(onComplete, 600);
      }
      setCount(Math.floor(current));
    }, intervalTime);

    const msgInterval = setInterval(() => {
      setMsgIdx(prev => Math.min(prev + 1, LOADING_MESSAGES.length - 1));
    }, Math.floor(duration / LOADING_MESSAGES.length));

    return () => { clearInterval(interval); clearInterval(msgInterval); };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-[#0A0A0A] flex flex-col justify-between p-8 md:p-12 text-white overflow-hidden"
    >
      {/* Interactive Background */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <DotGrid
          dotSize={5}
          gap={30}
          baseColor="#1A1A1A" 
          activeColor="#9A7B4F"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
          style={{ width: '100%', height: '100vh', position: 'relative' }}
        />
      </div>
      
      <div className="relative z-10 w-full mt-auto flex justify-between items-end pointer-events-none pb-4">
        {/* Bottom Left: Brand & Status */}
        <div className="flex flex-col gap-5 items-start">
          <div className="flex flex-col gap-1">
             <span className="text-[10px] font-mono tracking-[0.5em] text-white font-bold uppercase">QuickSaaS</span>
             <span className="text-[8px] font-mono tracking-[0.3em] text-white/20 uppercase">Core System Protocol v.01</span>
          </div>
          
          <div className="flex flex-col gap-2">
            <motion.p 
              key={msgIdx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[10px] font-mono tracking-[0.4em] text-primary uppercase"
            >
              {LOADING_MESSAGES[msgIdx]}
            </motion.p>
            <div className="w-16 h-px bg-primary/20" />
          </div>
        </div>

        {/* Bottom Right: Progress & Spinner */}
        <div className="flex items-center gap-8">
           <motion.div 
             animate={{ rotate: 360 }} 
             transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
             className="w-10 h-10 rounded-full border-t-2 border-l-2 border-primary"
           />
           <div className="text-6xl md:text-8xl font-black font-mono text-white/95 tracking-tighter tabular-nums">
             {count}%
           </div>
        </div>
      </div>
    </motion.div>
  );
}

function WaitlistSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const supabase = createSupabaseBrowserClient();

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email.');
      return;
    }

    setStatus('loading');
    try {
      const { error } = await supabase
        .from('waitlist_signups')
        .insert([{ email, source: 'landing_page' }]);

      if (error) {
        if (error.code === '23505') {
          setStatus('error');
          setMessage('You are already on the list!');
        } else {
          throw error;
        }
      } else {
        setStatus('success');
        setMessage('You are in! We will be in touch soon.');
        setEmail('');
      }
    } catch (err) {
      console.error('Waitlist error:', err);
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="relative z-30 bg-[#080705] text-[#FAF9F6] py-[25vh] px-6 md:px-20 overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Aesthetic Background Ambient Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-primary/10 blur-[160px] rounded-full opacity-40" />
      </div>

      <div className="relative z-10 max-w-3xl w-full">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-[clamp(40px,6vw,90px)] font-light tracking-tighter leading-[0.9] mb-8">
            Ready for the <span className="text-primary italic font-serif">future?</span>
          </h2>
          <p className="text-[#FAF9F6]/40 text-lg md:text-xl font-light tracking-wide mb-16 max-w-xl mx-auto leading-relaxed">
            Experience the next era of software engineering.<br className="hidden md:block" /> Simple. Fast. Built for you.
          </p>
        </motion.div>
        
        <form onSubmit={handleJoin} className="relative z-20 flex flex-col items-center gap-6 max-w-md mx-auto">
          <div className="w-full relative group">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading' || status === 'success'}
              placeholder="Your email address" 
              className="w-full bg-white/[0.03] border border-white/10 px-8 py-6 text-sm text-center rounded-2xl text-white focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all duration-500 placeholder:text-white/20 disabled:opacity-50 backdrop-blur-sm"
            />
            <div className="absolute inset-0 -z-10 bg-primary/5 rounded-2xl blur-xl group-focus-within:bg-primary/10 transition-all duration-700" />
          </div>
          
          <button 
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="w-full md:w-auto px-12 py-5 bg-primary text-[#080705] text-xs font-bold uppercase tracking-[0.3em] rounded-full transition-all duration-500 hover:bg-white hover:scale-105 active:scale-95 shadow-2xl flex items-center justify-center gap-4 group disabled:opacity-50"
          >
            {status === 'loading' ? 'Sending...' : status === 'success' ? 'Welcome' : 'Join the waitlist'}
            <div className={cn("w-1.5 h-1.5 bg-[#080705] rounded-full", status === 'loading' ? 'animate-spin' : 'group-hover:translate-x-1 transition-transform')} />
          </button>
        </form>

        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={cn(
                "mt-10 text-xs font-mono tracking-widest uppercase",
                status === 'success' ? "text-primary" : "text-red-400"
              )}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}


function WeAreBackBadge() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.2], [-20, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.9, 1]);

  return (
    <motion.div 
      style={{ y, opacity, scale }}
      className="absolute top-10 left-1/2 -translate-x-1/2 z-[60] pointer-events-none flex items-center gap-3 px-5 py-2 rounded-full bg-white/40 border border-primary/20 backdrop-blur-md shadow-[0_0_20px_rgba(154,123,79,0.1)]"
    >
      <div className="relative flex items-center justify-center">
        <div className="absolute w-3 h-3 bg-primary/40 blur-sm rounded-full animate-pulse" />
        <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_5px_rgba(154,123,79,0.5)] z-10" />
      </div>
      <span className="text-[10px] font-mono tracking-[0.6em] font-black text-primary uppercase ml-1">
        System.Online
      </span>
    </motion.div>
  );
}

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // ── Antigravity-Style Cursor Integration ──────────────────────────────────────
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for silky smooth tracking
  const springConfig = { damping: 40, stiffness: 150, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D Tilting Transforms for Text
  const rotateX = useTransform(smoothY, [-600, 600], [12, -12]);
  const rotateY = useTransform(smoothX, [-600, 600], [-12, 12]);

  // Subtle reverse-parallax for the Aurora blobs
  const parallaxBkgX = useTransform(smoothX, [-600, 600], [-40, 40]);
  const parallaxBkgY = useTransform(smoothY, [-600, 600], [-40, 40]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    // Avoids re-renders by updating directly to motion values
    const rect = heroRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    }
  }, [mouseX, mouseY]);

  // ── Scroll Parallax Layers ────────────────────────────────────────────────────
  const parallaxBadge = useTransform(heroProgress, [0, 1], [0, -60]);
  const parallaxLine1 = useTransform(heroProgress, [0, 1], [0, -120]);
  const parallaxLine2 = useTransform(heroProgress, [0, 1], [0, -180]);
  const parallaxSub = useTransform(heroProgress, [0, 1], [0, -240]);
  const parallaxCTA = useTransform(heroProgress, [0, 1], [0, -280]);
  const heroOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 0.6], [1, 0.95]);

  // Removed global mousemove listener for `--proximity-x` to eliminate severe layout thrashing

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <Loader key="loader" onComplete={() => setIsLoading(false)} />
      ) : (
        <motion.div 
          key="main" 
          initial={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }} 
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }} 
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        >
          <main className="relative bg-[#FAF9F6] text-[#080705] font-sans selection:bg-primary/20">

      {/* ════ 1. HERO — Glassy Aurora ═════════════════════════ */}
      <section
        ref={heroRef}
        onPointerMove={handlePointerMove}
        className="relative min-h-screen flex flex-col justify-center px-6 md:px-20 py-20 overflow-hidden"
        style={{ perspective: "1500px" }}
      >
        {/* Top Corners: Partner Logos */}
        <div className="absolute top-10 left-10 right-10 z-50 flex justify-between items-center pointer-events-none px-6">
          <div className="flex flex-col items-start gap-1">
             <span className="text-sm md:text-base font-mono tracking-[0.5em] uppercase font-bold text-green-600/60">gigzs</span>
             <div className="w-10 h-px bg-green-600/20" />
          </div>
          <div className="flex flex-col items-end gap-1 text-right">
             <span className="text-sm md:text-base font-mono tracking-[0.5em] uppercase font-bold text-purple-600/60">godaddy</span>
             <div className="w-10 h-px bg-purple-600/20" />
          </div>
        </div>

        {/* Background Interactive Threads — Cinematic Line Animation */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-60">
          <div className="w-full h-full">
            <Threads
              amplitude={1.2}
              distance={0.3}
              enableMouseInteraction
              color={[0.60, 0.48, 0.31]} // Gold theme
            />
          </div>
        </div>

        {/* Antigravity Tracking Orb */}
        <motion.div
          style={{ x: smoothX, y: smoothY }}
          className="pointer-events-none absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] z-10 -ml-[250px] -mt-[250px] mix-blend-multiply will-change-transform"
        />

        {/* Aurora gradient background & Technical Grid */}
        <div className="absolute inset-0 z-[-10] overflow-hidden">
          <div className="absolute inset-0 bg-[#FAF9F6]" />
          
          {/* Technical Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0807050a_1px,transparent_1px),linear-gradient(to_bottom,#0807050a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

          {/* Animated Warm aurora blobs wrapped in cursor-parallax */}
          <motion.div style={{ x: parallaxBkgX, y: parallaxBkgY }} className="absolute inset-0 will-change-transform opacity-70">
            <motion.div 
              animate={{ x: [0, 80, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }} 
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} 
              className="absolute top-[-25%] left-[-15%] w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,#9A7B4F20,transparent_75%)] blur-[120px]" 
            />
            <motion.div 
              animate={{ x: [0, -80, 0], y: [0, 80, 0], scale: [1, 1.25, 1] }} 
              transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }} 
              className="absolute top-[5%] right-[-20%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,#C2A36D18,transparent_75%)] blur-[100px]" 
            />
            <motion.div 
              animate={{ x: [0, 40, 0], y: [0, 40, 0], scale: [1, 0.9, 1] }} 
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} 
              className="absolute bottom-[0%] left-[25%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,#D6C19F12,transparent_75%)] blur-[80px]" 
            />
          </motion.div>
          {/* Subtle noise texture */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-multiply pointer-events-none" />
        </div>

        {/* Optimized Motion Graphics - removed borderRadius animation which causes severe layout thrashing */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-40 pointer-events-none select-none flex items-center justify-center mix-blend-multiply">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" }}
            className="absolute w-[600px] h-[600px] border border-primary/20 bg-gradient-to-tr from-primary/10 to-transparent blur-xl will-change-transform"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
            className="absolute w-[800px] h-[800px] border border-[#c2a36d]/10 bg-gradient-to-bl from-[#c2a36d]/5 to-transparent blur-2xl will-change-transform"
          />
        </div>

        <motion.div
          className="relative z-20 flex flex-col items-center text-center px-6 max-w-5xl mx-auto transform-gpu"
          style={{
            opacity: heroOpacity,
            scale: heroScale,
            rotateX,   // Antigravity 3D Tilt Integration
            rotateY
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        >
          

          {/* Headline — High Impact Minimalist */}
          <div className="mb-14 opacity-50">
            <DataTicker />
          </div>
          <h1 className="relative z-10 text-[clamp(48px,9vw,120px)] font-black tracking-[-0.05em] leading-[1.0] text-[#080705] mb-8 md:mb-12">
            <div className="overflow-hidden py-1">
              <BlurRevealText text="QuickSaaS" delay={0.2} className="justify-center" />
            </div>
            <div className="overflow-hidden py-1">
              <BlurRevealText text="Coming Soon..." delay={0.8} className="text-primary italic font-serif mt-2 md:mt-4 justify-center text-[clamp(32px,6vw,70px)] tracking-normal" />
            </div>
          </h1>

          {/* Subtitle — Minimalist Diction */}
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }}
            style={{ y: parallaxSub }}
            className="text-[#080705]/60 text-lg md:text-xl max-w-xl mx-auto font-light tracking-wide leading-relaxed mb-16 px-4"
          >
            Building the next generation of software, delivered at the speed of thought.<br /> 
            One brief. Infinite possibilities. Zero management.
          </motion.p>


        </motion.div>


        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-20"
        >
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
          <span className="text-[8px] font-mono tracking-[0.5em] uppercase">Scroll</span>
        </motion.div>

        <WeAreBackBadge />
      </section>




      
      {/* ════ 4. WAITLIST (Replaces CTA & Footer) ═══════════════════════════════════ */}
      
      <JourneySteps />
      <WaitlistSection />

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

  );
}
