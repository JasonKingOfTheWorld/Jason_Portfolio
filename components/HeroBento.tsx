import React, { useState, useEffect, useRef } from 'react';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';
import { ArrowRight, Zap, MousePointer2, Grid } from 'lucide-react';

interface HeroNeoProps {
  lang: Language;
}

// --- Matrix Rain Component ---
const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const fontSize = 16;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = Array(columns).fill(1);
    
    // Matrix characters (Katakana + Latin + nums)
    const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const draw = () => {
      // Trail effect: draw a semi-transparent black rectangle over the canvas
      // This makes previous frames fade out slowly
      ctx.fillStyle = 'rgba(1, 3, 1, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#22c55e'; // Brand green
      ctx.font = `${fontSize}px "JetBrains Mono"`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Randomly make some characters brighter/white for the "glint" effect
        if (Math.random() > 0.98) {
             ctx.fillStyle = '#fff'; 
        } else {
             ctx.fillStyle = '#22c55e';
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Send drop back to top randomly after it has crossed the screen
        // Adding randomness to the reset to scatter the rain
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33); // ~30FPS

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full opacity-80" />;
};

// --- Decrypt Text Component ---
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&[]{}<>";
const DecryptText = ({ text, className = "" }: { text: string, className?: string }) => {
  const [display, setDisplay] = useState(text);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Initial reveal
    scramble();
  }, [text]);

  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(prev => 
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2; 
    }, 30);
  };

  return (
    <span 
      className={`inline-block cursor-default ${className}`}
      onMouseEnter={() => { setIsHovering(true); scramble(); }}
      onMouseLeave={() => setIsHovering(false)}
    >
      {display}
    </span>
  );
};

// --- Main Component ---
const HeroNeo: React.FC<HeroNeoProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Track mouse solely for the "Scanner" light effect (no parallax movement of content)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      className="relative w-full h-screen overflow-hidden perspective-container bg-[#010301] flex items-center justify-center"
    >
      
      {/* 1. Base Layer: Static 3D Grid Plane (Depth) */}
      <div 
        className="absolute inset-[-50%] w-[200%] h-[200%] cyber-grid opacity-30 pointer-events-none"
        style={{
          transform: `rotateX(60deg) translateZ(-100px)`,
        }}
      ></div>

      {/* 2. Active Layer: Matrix Rain Reveal */}
      {/* This layer is full width/height but masked by the mouse position */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          maskImage: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent 100%)`,
        }}
      >
        <MatrixRain />
      </div>

      {/* CRT Overlay */}
      <div className="absolute inset-0 z-20 crt-overlay pointer-events-none"></div>
      <div className="scanline-bar z-20"></div>

      {/* HUD: Corners */}
      <div className="absolute top-8 left-8 z-30 hidden md:block">
        <div className="flex flex-col text-[10px] font-mono text-brand/60 gap-1">
           <div className="border-l-2 border-brand pl-2">SYS.VER.4.2.0</div>
           <div className="border-l-2 border-transparent pl-2">STATUS: STABLE</div>
        </div>
      </div>
      
      <div className="absolute top-8 right-8 z-30 hidden md:block text-right">
         <div className="flex items-center gap-2 text-brand/80 text-xs font-mono">
            <span className="animate-pulse">●</span> LIVE_FEED
         </div>
      </div>

      <div className="absolute bottom-8 left-8 z-30 hidden md:block">
         <Grid className="text-brand/20 w-12 h-12" />
      </div>

      {/* HUD: Vertical Hex Stream */}
      <div className="absolute top-0 right-24 h-full w-px bg-brand/10 hidden lg:block overflow-hidden">
         <div className="animate-scanline text-[10px] font-mono text-brand/30 whitespace-pre opacity-50 leading-tight">
            {Array(50).fill(0).map((_, i) => (
               <div key={i}>{Math.random().toString(16).substr(2, 8).toUpperCase()}</div>
            ))}
         </div>
      </div>

      {/* Main Content Layer */}
      <div 
        className="relative z-30 max-w-7xl mx-auto px-6 w-full flex flex-col items-start md:items-center justify-center md:text-center"
      >
        
        {/* Decorative Line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent mb-12 opacity-50"></div>

        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white leading-[0.9] mb-8 select-none">
          <div className="flex flex-col md:items-center gap-2">
            {/* Line 1: Outline */}
            <span className="text-outline hover:text-brand transition-colors duration-300">
                <DecryptText text={t.hero_title_1} />
            </span>
            
            {/* Line 2: Emphasis + Connector */}
            <div className="flex items-baseline justify-center gap-4 flex-wrap">
               <span className="text-white text-glow">
                  <DecryptText text={t.hero_title_clarity} />
               </span>
               <span className="text-2xl md:text-5xl text-zinc-500 font-mono font-normal tracking-tight">
                  {t.hero_title_2}
               </span>
            </div>
            
            {/* Line 3: Solid Readable Text */}
            <span className="text-4xl md:text-8xl text-zinc-300 hover:text-brand hover:text-glow transition-all duration-300 cursor-help mt-2">
                <DecryptText text={t.hero_title_3} />
            </span>
          </div>
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-zinc-400 font-light leading-relaxed font-mono mt-4 mb-12 backdrop-blur-sm p-4 border-l-2 border-brand/50 bg-black/20">
           {t.hero_desc}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-6">
            <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-8 py-4 bg-brand text-black font-bold font-mono uppercase tracking-widest overflow-hidden hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] transition-shadow duration-300 clip-path-slant"
                style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
            >
                <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></div>
                <span className="relative z-10 flex items-center gap-3 group-hover:text-black transition-colors">
                   {t.btn_projects} <ArrowRight size={18} />
                </span>
            </button>

            <button className="px-8 py-4 text-brand border border-brand/30 font-mono text-sm hover:bg-brand/10 transition-all uppercase tracking-widest flex items-center gap-2 hover:text-glow">
                <MousePointer2 size={16} /> {t.btn_contact}
            </button>
        </div>

      </div>

    </section>
  );
};

export default HeroNeo;