const fs = require('fs');
const path = require('path');

const pageFile = path.resolve(__dirname, '../app/page.tsx');
let content = fs.readFileSync(pageFile, 'utf8');

// 1. Add the DotGrid import at the top
if (!content.includes('import DotGrid')) {
  // Find the place after other imports
  content = content.replace(
    "import { cn } from '../lib/utils';",
    "import { cn } from '../lib/utils';\nimport DotGrid from '../components/DotGrid';"
  );
}

// 2. Replace the Loader component
const oldLoader = `function Loader({ onComplete }: { onComplete: () => void }) {
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
}`;

const newLoader = `const LOADING_MESSAGES = [
  "Initializing system...",
  "Waking up the server...",
  "Establishing secure connection...",
  "Synchronizing vectors...",
  "We are almost there..."
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
          gap={15}
          baseColor="#1A1A1A" 
          activeColor="#22C55E"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
          style={{ width: '100%', height: '100vh', position: 'relative' }}
        />
      </div>
      
      {/* Top Text Messages */}
      <div className="relative z-10 w-full flex justify-end pointer-events-none">
        <motion.p 
          key={msgIdx}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs md:text-sm font-mono tracking-widest text-white/50 uppercase"
        >
          {LOADING_MESSAGES[msgIdx]}
        </motion.p>
      </div>

      {/* Bottom Counter */}
      <div className="relative z-10 w-full flex justify-between items-end pointer-events-none">
        <div></div>
        <div className="flex items-center gap-4">
           <motion.div 
             animate={{ rotate: 360 }} 
             transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
             className="w-8 h-8 rounded-full border-t-2 border-l-2 border-white/80"
           />
           <div className="text-4xl md:text-6xl font-black font-mono text-white/90">
             {count}%
           </div>
        </div>
      </div>
    </motion.div>
  );
}`;

content = content.replace(oldLoader, newLoader);

fs.writeFileSync(pageFile, content);
console.log('Successfully updated Loader component with DotGrid and extended duration');
