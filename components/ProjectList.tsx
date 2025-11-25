import React from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight, Layers } from 'lucide-react';

interface ProjectListProps {
  onSelectProject: (id: string) => void;
  labels: { title: string; subtitle: string; btn: string };
}

const ProjectList: React.FC<ProjectListProps> = ({ onSelectProject, labels }) => {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-20">
        <div>
           <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight flex items-center gap-4">
             <Layers className="text-brand" size={32} />
             {labels.title}
           </h2>
           <div className="h-1 w-24 bg-gradient-to-r from-brand to-secondary rounded-full"></div>
        </div>
        <div className="hidden md:block text-right">
           <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">{labels.subtitle}</p>
        </div>
      </div>

      {/* Floating Glass Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project, index) => (
          <div 
            key={project.id}
            onClick={() => onSelectProject(project.id)}
            className="group cursor-pointer relative bg-neo-card backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-brand/50 hover:shadow-neon transition-all duration-500 hover:-translate-y-2"
          >
            {/* Image Section */}
            <div className="h-64 overflow-hidden relative">
              <div className="absolute inset-0 bg-brand/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
              />
              <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                <span className="bg-brand text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg">
                  <ArrowUpRight size={20} />
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 relative">
               {/* Decorative Gradient Line */}
               <div className="absolute top-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand to-secondary group-hover:w-full transition-all duration-700 ease-in-out"></div>

               <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs font-mono text-secondary bg-secondary/10 px-2 py-1 rounded-md uppercase tracking-wide">
                      {tag}
                    </span>
                  ))}
               </div>
               
               <h3 className="text-2xl font-bold text-white mb-3 leading-tight group-hover:text-brand transition-colors">
                 {project.title}
               </h3>
               {/* Updated Contrast and Weight */}
               <p className="text-base text-zinc-300 mb-8 font-normal leading-relaxed">{project.description}</p>
              
               <div className="flex items-center gap-6 pt-6 border-t border-white/5">
                  {project.metrics.slice(0, 2).map((metric, i) => (
                    <div key={i}>
                      {/* Updated Contrast */}
                      <div className="text-xs text-zinc-400 font-mono uppercase mb-1">{metric.label}</div>
                      <div className="text-lg font-bold text-white font-mono">{metric.value}</div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectList;