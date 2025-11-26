import React, { useEffect } from 'react';
import { Project, ProjectSection } from '../types';
import { ArrowLeft, CheckCircle2, Sliders, Terminal, LayoutTemplate, Users, Code, Hash } from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

// Helper for simple markdown-like parsing (bolding)
const RichText = ({ text }: { text: string }) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <span className="whitespace-pre-line">
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong>;
        }
        return part;
      })}
    </span>
  );
};

// --- Sub-components moved outside to prevent re-renders ---

const StandardLayout = ({ section }: { section: ProjectSection }) => (
  <div className="glass-neo p-8 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-brand/20 transition-colors">
      <div className="absolute top-0 right-0 w-16 h-16 bg-brand/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
        <Hash size={20} className="text-brand" />
        {section.title}
      </h3>
      <div className="text-base text-zinc-200 leading-8 font-normal">
        <RichText text={section.content} />
      </div>
      {section.items && (
        <div className="mt-6 bg-black/30 p-6 rounded-xl border border-white/5">
          <ul className="grid grid-cols-1 gap-3">
            {section.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-base text-zinc-300 leading-relaxed">
                <CheckCircle2 size={18} className="text-brand shrink-0 mt-1" />
                <span><RichText text={item} /></span>
              </li>
            ))}
          </ul>
        </div>
      )}
  </div>
);

const GridCardsLayout = ({ section }: { section: ProjectSection }) => (
  <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white flex items-center gap-3">
          <Users size={20} className="text-secondary" />
          {section.title}
      </h3>
      <div className="text-base text-zinc-300 mb-6 leading-relaxed">
        <RichText text={section.content} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {section.cards?.map((card, idx) => (
              <div key={idx} className="glass-neo p-6 rounded-xl border border-white/5 hover:border-brand/40 hover:shadow-neon transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center mb-4 border border-brand/20">
                      <span className="font-mono text-brand font-bold">{idx + 1}</span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3">{card.title}</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed"><RichText text={card.content} /></p>
              </div>
          ))}
      </div>
  </div>
);

const SplitLayout = ({ section }: { section: ProjectSection }) => (
  <div className="glass-neo rounded-2xl border border-white/5 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
      <div className="p-8 border-b lg:border-b-0 lg:border-r border-white/5">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <LayoutTemplate size={20} className="text-brand" />
              {section.title}
          </h3>
          <div className="text-base text-zinc-200 leading-8 font-normal">
              <RichText text={section.content} />
          </div>
      </div>
      <div className="bg-black/20 p-8 flex flex-col justify-center relative">
           {/* CSS Pattern instead of external image */}
           <div className="absolute inset-0 opacity-10" 
                style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
           </div>
           {section.items && (
               <div className="relative z-10 space-y-4">
                   <div className="text-xs font-mono text-secondary uppercase tracking-widest mb-2">Key Outcomes</div>
                   {section.items.map((item, i) => (
                       <div key={i} className="flex gap-4 p-4 rounded-lg bg-black/40 border border-brand/10 hover:border-brand/30 transition-colors">
                           <div className="mt-1 w-1.5 h-1.5 rounded-full bg-brand shrink-0"></div>
                           <span className="text-sm text-zinc-300 leading-relaxed"><RichText text={item} /></span>
                       </div>
                   ))}
               </div>
           )}
      </div>
  </div>
);

const TerminalLayout = ({ section }: { section: ProjectSection }) => (
  <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-[#050505] shadow-2xl">
      {/* Terminal Header */}
      <div className="bg-zinc-900/50 px-4 py-3 flex items-center gap-2 border-b border-white/5">
          <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
          </div>
          <div className="ml-4 text-xs font-mono text-zinc-500 flex items-center gap-2">
              <Terminal size={12} />
              <span>root@system:~/analysis</span>
          </div>
      </div>
      
      <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <Code size={20} className="text-brand" />
                  {section.title}
              </h3>
              <div className="text-sm text-zinc-400 leading-7 font-mono">
                  <RichText text={section.content} />
              </div>
          </div>
          <div className="lg:col-span-2">
              <div className="bg-black/50 rounded-lg p-6 border border-brand/10 font-mono text-xs md:text-sm text-zinc-300 overflow-x-auto custom-scrollbar">
<pre className="text-green-400/80">
{section.code || `// No code snippet provided.`}
</pre>
              </div>
          </div>
      </div>
  </div>
);

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-10 duration-500 min-h-screen bg-neo-bg">
      
      {/* Immersive Hero */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-[#02040a]/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-brand/10 mix-blend-multiply z-10" />
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        
        <div className="absolute bottom-0 left-0 w-full z-20 p-6 md:p-12 max-w-7xl mx-auto">
          <button 
            onClick={onBack}
            className="mb-8 flex items-center text-white/70 hover:text-white transition-colors group bg-black/40 backdrop-blur rounded-full px-4 py-2 border border-white/10"
          >
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Return
          </button>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight text-glow leading-tight max-w-4xl">{project.title}</h1>
          <div className="flex flex-wrap gap-3">
            {project.tags.map(tag => (
              <span key={tag} className="px-4 py-1.5 bg-brand/10 backdrop-blur-md text-brand border border-brand/30 rounded-full text-sm font-mono uppercase tracking-wider shadow-neon">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col lg:flex-row gap-12">
        
        {/* Sticky Sidebar (Desktop) */}
        <aside className="hidden lg:block w-64 shrink-0 relative">
            <div className="sticky top-32 space-y-8">
                <div>
                    <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">Table of Contents</h4>
                    <ul className="space-y-3 border-l border-white/10 ml-2">
                        <li>
                            <button onClick={() => scrollToSection('overview')} className="text-sm text-zinc-300 hover:text-brand pl-4 border-l-2 border-transparent hover:border-brand transition-all text-left">Overview</button>
                        </li>
                         <li>
                            <button onClick={() => scrollToSection('role')} className="text-sm text-zinc-300 hover:text-brand pl-4 border-l-2 border-transparent hover:border-brand transition-all text-left">My Role</button>
                        </li>
                        {project.sections?.map((section, idx) => (
                             <li key={idx}>
                                <button onClick={() => scrollToSection(`section-${idx}`)} className="text-sm text-zinc-400 hover:text-brand pl-4 border-l-2 border-transparent hover:border-brand transition-all text-left truncate w-full">
                                    {section.title.split(':')[0]}
                                </button>
                            </li>
                        ))}
                         <li>
                            <button onClick={() => scrollToSection('outcome')} className="text-sm text-zinc-300 hover:text-brand pl-4 border-l-2 border-transparent hover:border-brand transition-all text-left">Outcome</button>
                        </li>
                    </ul>
                </div>
                
                <div>
                     <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">Project Stats</h4>
                     <div className="space-y-4">
                        {project.metrics.map((metric, i) => (
                            <div key={i}>
                                <div className="text-2xl font-bold text-white font-mono">{metric.value}</div>
                                <div className="text-xs text-zinc-500">{metric.label}</div>
                            </div>
                        ))}
                     </div>
                </div>
            </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0 space-y-20">
          
            {/* Overview Section */}
            <section id="overview" className="border-b border-white/5 pb-12">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Terminal size={18} className="text-brand" />
                Project Background
                </h3>
                <div className="text-lg text-zinc-200 leading-relaxed font-normal">
                   <RichText text={project.caseStudy.problem} />
                </div>
            </section>

            {/* Role Section */}
            <section id="role">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                My Role
                </h3>
                <p className="text-xl text-white/90 leading-relaxed font-mono border-l-2 border-secondary/50 pl-6 py-2 bg-secondary/5 rounded-r-lg">
                {project.caseStudy.role}
                </p>
            </section>

            {/* Dynamic Sections */}
            {project.sections?.map((section, idx) => (
                <section key={idx} id={`section-${idx}`}>
                    {section.layout === 'grid-cards' && <GridCardsLayout section={section} />}
                    {section.layout === 'split' && <SplitLayout section={section} />}
                    {section.layout === 'terminal' && <TerminalLayout section={section} />}
                    {(!section.layout || section.layout === 'standard') && <StandardLayout section={section} />}
                </section>
            ))}

            {/* Outcome Section */}
            <section id="outcome" className="glass-neo p-8 rounded-2xl border border-brand/20 shadow-neon bg-gradient-to-br from-black to-brand/5">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Sliders className="text-brand" />
                Summary & Outcome
                </h3>
                <div className="text-lg text-zinc-200 leading-relaxed font-normal">
                   <RichText text={project.caseStudy.solution} />
                </div>
            </section>

        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;