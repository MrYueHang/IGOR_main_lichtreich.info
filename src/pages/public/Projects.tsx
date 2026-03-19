import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { initialProjects, Project } from '../../data/projects';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('igor_projects');
    if (saved) {
      setProjects(JSON.parse(saved));
    } else {
      setProjects(initialProjects);
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto text-center mb-24"
      >
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-[#1a1a1a] mb-8 uppercase font-display">Projekte & Standorte</h1>
        <p className="handwritten text-3xl text-zinc-600">Globale Präsenz & Räume der Kraft. Von Berlin über Bad Saarow und Zenica bis nach Havanna.</p>
      </motion.div>

      <div className="space-y-16 max-w-4xl mx-auto">
        {projects.map((project, index) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={index % 2 === 0 ? 'polaroid bg-[#f4f4f5]' : 'polaroid-alt bg-[#f4f4f5]'}
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 px-4 pt-4">
              <div>
                <h3 className="text-3xl font-black text-[#1a1a1a] font-display uppercase tracking-tight mb-2">{project.title}</h3>
                <p className="handwritten text-2xl text-zinc-500">{project.location}</p>
              </div>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <span className="text-sm font-bold tracking-widest uppercase text-zinc-500">{project.year}</span>
                <span className={`inline-flex items-center border px-3 py-1 text-xs font-bold uppercase tracking-widest
                  ${project.status === 'Aktiv' ? 'border-green-600 text-green-700 bg-green-50' : 
                    project.status === 'Abgeschlossen' ? 'border-zinc-400 text-zinc-600 bg-zinc-50' : 
                    'border-blue-600 text-blue-700 bg-blue-50'}`}
                >
                  {project.status}
                </span>
              </div>
            </div>
            <div className="px-4 pb-4">
              <p className="text-zinc-700 leading-relaxed text-lg">{project.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
