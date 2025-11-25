import React, { useState, useEffect } from 'react';
import { ViewState, Language } from './types';
import { PROJECTS, TRANSLATIONS } from './constants';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';
import PhotoGallery from './components/PhotoGallery';
import About from './components/About';
import AIChat from './components/AIChat';
import HeroNeo from './components/HeroBento'; // Imported as HeroNeo for concept
import { Globe, Hexagon } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [lang, setLang] = useState<Language>('en');
  
  // Mouse spotlight effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSelectProject = (id: string) => {
    setSelectedProjectId(id);
    setView(ViewState.PROJECT_DETAIL);
  };

  const handleBackToHome = () => {
    setView(ViewState.HOME);
    setSelectedProjectId(null);
  };

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'zh' : 'en');
  };

  const currentProject = PROJECTS.find(p => p.id === selectedProjectId);

  return (
    <div className="min-h-screen bg-neo-bg text-zinc-300 font-sans selection:bg-brand selection:text-black flex flex-col relative overflow-x-hidden">
      
      {/* Ambient Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand/5 rounded-full blur-[128px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[128px] animate-blob animation-delay-2000"></div>
        <div className="absolute top-[40%] left-[40%] w-[600px] h-[600px] bg-brand/5 rounded-full blur-[150px] animate-blob animation-delay-4000"></div>
      </div>

      {/* Mouse Spotlight (Matrix Green Tint) */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 mix-blend-screen"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34, 197, 94, 0.3), transparent 40%)`
        }}
      />

      {/* Floating Navigation Island */}
      <nav className="fixed top-6 left-0 w-full z-50 flex justify-center px-4">
        <div className="glass-neo rounded-full px-6 py-3 flex items-center gap-8 shadow-neon border border-brand/20">
          <div 
            onClick={handleBackToHome}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <Hexagon className="text-brand fill-brand/10 group-hover:rotate-180 transition-transform duration-500" size={24} />
            <span className="font-bold text-white tracking-tight group-hover:text-glow transition-all font-mono">
              JASON<span className="text-brand">.JUN</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setView(ViewState.HOME)}
              className={`text-sm font-medium transition-all hover:text-brand ${view === ViewState.HOME ? 'text-white text-glow' : 'text-zinc-500'}`}
            >
              {t.nav_work}
            </button>
            <button 
              onClick={() => setView(ViewState.ABOUT)}
              className={`text-sm font-medium transition-all hover:text-brand ${view === ViewState.ABOUT ? 'text-white text-glow' : 'text-zinc-500'}`}
            >
              {t.nav_about}
            </button>
            <button 
              onClick={() => setView(ViewState.GALLERY)}
              className={`text-sm font-medium transition-all hover:text-brand ${view === ViewState.GALLERY ? 'text-white text-glow' : 'text-zinc-500'}`}
            >
               {t.nav_visuals}
            </button>
          </div>

          <button 
              onClick={toggleLang}
              className="flex items-center gap-2 text-xs font-mono text-brand hover:text-white border border-brand/30 rounded-full px-3 py-1 hover:border-brand hover:bg-brand transition-all"
          >
              <Globe size={12} />
              {lang === 'en' ? 'EN' : 'CN'}
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow relative z-10">
        
        {view === ViewState.HOME && (
          <div className="animate-in fade-in duration-1000">
            <HeroNeo lang={lang} />

            <div id="projects" className="relative">
               <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent"></div>
               <ProjectList 
                  onSelectProject={handleSelectProject} 
                  labels={{
                      title: t.section_work_title,
                      subtitle: t.section_work_subtitle,
                      btn: t.btn_projects
                  }}
               />
            </div>
          </div>
        )}

        {view === ViewState.ABOUT && (
          <div className="pt-24">
            <About lang={lang} />
          </div>
        )}

        {view === ViewState.PROJECT_DETAIL && currentProject && (
          <ProjectDetail project={currentProject} onBack={handleBackToHome} />
        )}

        {view === ViewState.GALLERY && (
          <div className="animate-in fade-in duration-500 pt-24">
             <PhotoGallery 
                labels={{
                  title: t.section_visuals_title,
                  subtitle: t.section_visuals_subtitle
                }}
             />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/50 backdrop-blur-md py-12 px-6 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2">
             <span className="font-bold text-white text-lg tracking-widest font-mono group hover:text-brand transition-colors cursor-default">JASON.JUN</span>
             <p className="text-zinc-600 text-sm">{t.footer_tagline}</p>
          </div>
          <div className="flex gap-6 text-zinc-500 font-mono text-xs">
            <a href="#" className="hover:text-secondary transition-colors text-glow-cyan">[TWITTER]</a>
            <a href="#" className="hover:text-brand transition-colors text-glow">[LINKEDIN]</a>
            <a href="#" className="hover:text-white transition-colors">[GITHUB]</a>
          </div>
        </div>
      </footer>

      {/* AI Chat Widget */}
      <AIChat />
    </div>
  );
};

export default App;