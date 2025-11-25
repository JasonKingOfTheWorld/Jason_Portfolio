import React, { useState, useEffect } from 'react';
import { ABOUT_CONTENT, EXPERIENCE, SKILLS } from '../constants';
import { Language } from '../types';
import { BrainCircuit, Layers, Code2, Cpu, Terminal, ShieldCheck, History } from 'lucide-react';

interface AboutProps {
  lang: Language;
}

const TypingText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 15); // Speed of typing
    return () => clearInterval(interval);
  }, [text, started]);

  return <span className="font-mono text-brand/90">{displayedText}</span>;
};

const About: React.FC<AboutProps> = ({ lang }) => {
  const content = ABOUT_CONTENT[lang];

  return (
    <section className="min-h-screen pt-24 pb-24 px-6 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700">
      
      {/* Identity Header */}
      <div className="flex items-center gap-4 mb-16 border-b border-brand/20 pb-6">
        <div className="w-16 h-16 rounded-full bg-brand/10 border border-brand/50 flex items-center justify-center">
            <ShieldCheck size={32} className="text-brand animate-pulse" />
        </div>
        <div>
            <div className="text-xs font-mono text-zinc-500 tracking-[0.2em] mb-1">IDENTITY_VERIFIED</div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                JASON JUN <span className="text-brand text-base font-mono bg-brand/10 px-2 py-0.5 rounded animate-pulse">ONLINE</span>
            </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left: Bio Data Stream (7 cols) */}
        <div className="lg:col-span-7 space-y-12">
           
           {/* Bio Text */}
           <div className="space-y-6">
             <div className="flex items-center gap-2 text-brand text-xs font-mono uppercase mb-2">
                <Terminal size={14} />
                <span>Decrypting_Bio_Data...</span>
             </div>
             
             <div className="p-6 rounded-lg bg-black/40 border border-brand/20 shadow-neon relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand to-transparent opacity-50"></div>
                <h2 className="text-2xl font-bold text-white mb-6 leading-tight">
                    <TypingText text={content.intro} />
                </h2>
                <div className="space-y-6 text-zinc-400 font-light leading-loose font-mono text-base">
                    <p><TypingText text={content.p1} delay={1000} /></p>
                    <p><TypingText text={content.p2} delay={2500} /></p>
                    <p><TypingText text={content.p3} delay={4500} /></p>
                </div>
             </div>
           </div>

           {/* Career Trace */}
           <div>
              <div className="flex items-center gap-2 text-brand text-xs font-mono uppercase mb-6">
                <History size={14} />
                <span>Career_Trace_Log</span>
             </div>
             <div className="space-y-0 relative border-l border-brand/20 ml-3">
                {EXPERIENCE.map((job, i) => (
                    <div key={i} className="pl-8 pb-10 relative group">
                        <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 bg-black border border-brand rounded-full group-hover:bg-brand transition-colors"></div>
                        <div className="text-sm font-mono text-secondary mb-1">{job.period}</div>
                        <h3 className="text-xl font-bold text-white group-hover:text-brand transition-colors mb-1">{job.role}</h3>
                        <div className="text-base text-zinc-500 mb-2">{job.company}</div>
                        <p className="text-base text-zinc-400 font-light leading-relaxed">{job.desc}</p>
                    </div>
                ))}
             </div>
           </div>

        </div>

        {/* Right: Specs & Skills (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
           
           {/* Capability Modules */}
           <div>
             <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4 border-b border-brand/10 pb-2">
               Core_Modules
             </div>
             <div className="grid gap-4">
                {content.modules.map((mod, i) => (
                    <div key={i} className="group p-5 rounded bg-white/5 border border-white/5 hover:border-brand/40 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-2">
                             {i === 0 && <Layers size={18} className="text-secondary" />}
                             {i === 1 && <BrainCircuit size={18} className="text-secondary" />}
                             {i === 2 && <Code2 size={18} className="text-secondary" />}
                            <h4 className="font-bold text-white text-base group-hover:text-brand transition-colors">{mod.title}</h4>
                        </div>
                        <p className="text-sm text-zinc-400 font-mono">{mod.content}</p>
                    </div>
                ))}
             </div>
           </div>

           {/* Neural Network / Skills */}
           <div className="bg-black/40 border border-brand/10 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                  <Cpu size={18} className="text-brand" />
                  <span className="text-xs font-mono text-white uppercase tracking-wider">Skill_Heuristic</span>
              </div>
              <div className="space-y-5">
                  {SKILLS.map((skill, i) => (
                      <div key={i}>
                          <div className="flex justify-between text-sm font-mono text-zinc-400 mb-1.5">
                              <span>{skill.name}</span>
                              <span className="text-brand">{skill.level}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-secondary to-brand" 
                                style={{ width: `${skill.level}%`, transitionDelay: `${i * 100}ms` }}
                              ></div>
                          </div>
                      </div>
                  ))}
              </div>
           </div>

           {/* Contact Terminal */}
           <div className="mt-8 p-6 rounded-xl border border-dashed border-brand/30 text-center bg-brand/5">
              <div className="text-zinc-500 text-[10px] font-mono mb-2 animate-pulse">ENCRYPTED CONNECTION ESTABLISHED</div>
              <a href="mailto:hello@jason.neo" className="text-xl font-bold text-white hover:text-brand transition-colors text-glow block">
                hello@jason.jun
              </a>
           </div>
        </div>

      </div>
    </section>
  );
};

export default About;