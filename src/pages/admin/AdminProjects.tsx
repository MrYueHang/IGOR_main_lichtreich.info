import { useState, useEffect } from 'react';
import { initialProjects, Project } from '../../data/projects';
import { CheckCircle2, Circle, Plus, Trash2 } from 'lucide-react';

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('igor_projects');
    if (saved) {
      setProjects(JSON.parse(saved));
    } else {
      setProjects(initialProjects);
      localStorage.setItem('igor_projects', JSON.stringify(initialProjects));
    }
  }, []);

  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem('igor_projects', JSON.stringify(newProjects));
  };

  const updateStatus = (projectId: string, newStatus: Project['status']) => {
    const updated = projects.map(p => p.id === projectId ? { ...p, status: newStatus } : p);
    saveProjects(updated);
  };

  const toggleChecklistItem = (projectId: string, itemId: string) => {
    const updated = projects.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          checklist: p.checklist.map(item => item.id === itemId ? { ...item, completed: !item.completed } : item)
        };
      }
      return p;
    });
    saveProjects(updated);
  };

  const addChecklistItem = (projectId: string, text: string) => {
    if (!text.trim()) return;
    const updated = projects.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          checklist: [...p.checklist, { id: Date.now().toString(), text, completed: false }]
        };
      }
      return p;
    });
    saveProjects(updated);
  };

  const removeChecklistItem = (projectId: string, itemId: string) => {
    const updated = projects.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          checklist: p.checklist.filter(item => item.id !== itemId)
        };
      }
      return p;
    });
    saveProjects(updated);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">Projekte & Ausstellungen</h1>
          <p className="text-zinc-600">Verwaltung von Ausstellungen, Studio-Standorten und Alumni-Initiativen.</p>
        </div>
        <button className="bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Neues Projekt
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {projects.map(project => (
          <div key={project.id} className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-zinc-200 bg-zinc-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-zinc-900">{project.title}</h2>
                <p className="text-sm text-zinc-500">{project.location} • {project.year}</p>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-zinc-700">Status:</label>
                <select
                  value={project.status}
                  onChange={(e) => updateStatus(project.id, e.target.value as Project['status'])}
                  className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm font-medium focus:border-zinc-500 focus:ring-zinc-500 bg-white"
                >
                  <option value="In Planung">In Planung</option>
                  <option value="Aktiv">Aktiv</option>
                  <option value="Abgeschlossen">Abgeschlossen</option>
                </select>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-sm font-semibold text-zinc-900 mb-4 uppercase tracking-wider">Checkliste & Aufgaben</h3>
              <div className="space-y-3">
                {project.checklist.map(item => (
                  <div key={item.id} className="flex items-center justify-between group">
                    <button 
                      onClick={() => toggleChecklistItem(project.id, item.id)}
                      className="flex items-center gap-3 flex-1 text-left"
                    >
                      {item.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-zinc-300 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${item.completed ? 'text-zinc-400 line-through' : 'text-zinc-700'}`}>
                        {item.text}
                      </span>
                    </button>
                    <button 
                      onClick={() => removeChecklistItem(project.id, item.id)}
                      className="text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-zinc-100">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    const input = e.currentTarget.elements.namedItem('newItem') as HTMLInputElement;
                    addChecklistItem(project.id, input.value);
                    input.value = '';
                  }}
                  className="flex gap-2"
                >
                  <input 
                    type="text" 
                    name="newItem"
                    placeholder="Neue Aufgabe hinzufügen..." 
                    className="flex-1 rounded-md border border-zinc-300 px-3 py-1.5 text-sm focus:border-zinc-500 focus:ring-zinc-500"
                  />
                  <button type="submit" className="bg-zinc-100 text-zinc-700 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-zinc-200">
                    Hinzufügen
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
