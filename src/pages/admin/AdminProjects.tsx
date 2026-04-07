import { useState, useEffect } from 'react';
import { initialProjects, Project } from '../../data/projects';
import { CheckCircle2, Circle, Plus, Trash2, Users, ChevronDown, ChevronRight, FolderTree } from 'lucide-react';
import AIStrategyPlanner from '../../components/admin/AIStrategyPlanner';

// Extend the Project interface locally for the new features
interface ExtendedProject extends Project {
  subProjects?: ExtendedProject[];
  collaborators?: string[];
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<ExtendedProject[]>([]);
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('igor_projects');
    if (saved) {
      setProjects(JSON.parse(saved));
    } else {
      // Add some mock sub-projects and collaborators to the initial data
      const enhancedInitial = initialProjects.map(p => ({
        ...p,
        collaborators: ['Igor G.', 'Gallerist'],
        subProjects: p.title.includes('Zenica') ? [
          {
            id: p.id + '-sub1',
            title: 'Logistik & Transport',
            description: 'Transport der Kunstwerke organisieren',
            year: p.year,
            location: p.location,
            status: 'In Planung',
            checklist: [
              { id: 't1', text: 'Spedition beauftragen', completed: false },
              { id: 't2', text: 'Zolldokumente vorbereiten', completed: false }
            ],
            collaborators: ['Logistik-Team']
          }
        ] : []
      }));
      setProjects(enhancedInitial);
      localStorage.setItem('igor_projects', JSON.stringify(enhancedInitial));
    }
  }, []);

  const saveProjects = (newProjects: ExtendedProject[]) => {
    setProjects(newProjects);
    localStorage.setItem('igor_projects', JSON.stringify(newProjects));
  };

  const toggleExpand = (projectId: string) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedProjects(newExpanded);
  };

  const updateStatus = (projectId: string, newStatus: Project['status']) => {
    const updated = projects.map(p => p.id === projectId ? { ...p, status: newStatus } : p);
    saveProjects(updated);
  };

  const toggleChecklistItem = (projectId: string, itemId: string, isSubProject = false, parentId?: string) => {
    const updated = projects.map(p => {
      if (!isSubProject && p.id === projectId) {
        return {
          ...p,
          checklist: p.checklist.map(item => item.id === itemId ? { ...item, completed: !item.completed } : item)
        };
      } else if (isSubProject && p.id === parentId) {
        return {
          ...p,
          subProjects: p.subProjects?.map(sp => sp.id === projectId ? {
            ...sp,
            checklist: sp.checklist.map(item => item.id === itemId ? { ...item, completed: !item.completed } : item)
          } : sp)
        };
      }
      return p;
    });
    saveProjects(updated);
  };

  const addChecklistItem = (projectId: string, text: string, isSubProject = false, parentId?: string) => {
    if (!text.trim()) return;
    const updated = projects.map(p => {
      if (!isSubProject && p.id === projectId) {
        return {
          ...p,
          checklist: [...p.checklist, { id: Date.now().toString(), text, completed: false }]
        };
      } else if (isSubProject && p.id === parentId) {
        return {
          ...p,
          subProjects: p.subProjects?.map(sp => sp.id === projectId ? {
            ...sp,
            checklist: [...sp.checklist, { id: Date.now().toString(), text, completed: false }]
          } : sp)
        };
      }
      return p;
    });
    saveProjects(updated);
  };

  const removeChecklistItem = (projectId: string, itemId: string, isSubProject = false, parentId?: string) => {
    const updated = projects.map(p => {
      if (!isSubProject && p.id === projectId) {
        return {
          ...p,
          checklist: p.checklist.filter(item => item.id !== itemId)
        };
      } else if (isSubProject && p.id === parentId) {
        return {
          ...p,
          subProjects: p.subProjects?.map(sp => sp.id === projectId ? {
            ...sp,
            checklist: sp.checklist.filter(item => item.id !== itemId)
          } : sp)
        };
      }
      return p;
    });
    saveProjects(updated);
  };

  const handlePushToAction = (strategy: string) => {
    const lines = strategy.split('\n');
    const newItems: { id: string; text: string; completed: boolean }[] = [];
    
    lines.forEach((line, index) => {
      const match = line.match(/^(\s*[-*]|\d+\.)\s+(.+)$/);
      if (match && match[2].trim()) {
        newItems.push({
          id: Date.now().toString() + index,
          text: match[2].trim(),
          completed: false
        });
      }
    });

    if (newItems.length === 0) {
      newItems.push({ id: Date.now().toString() + '1', text: 'Strategie überprüfen', completed: false });
    }

    const targetProjectIndex = projects.findIndex(p => p.title.includes('Zenica'));
    
    if (targetProjectIndex >= 0) {
      const updated = [...projects];
      
      // Create a new sub-project from the strategy
      const newSubProject: ExtendedProject = {
        id: Date.now().toString(),
        title: 'KI-Generierte Teilaufgabe',
        description: 'Automatisch aus Strategie erstellt',
        year: updated[targetProjectIndex].year,
        location: updated[targetProjectIndex].location,
        status: 'In Planung',
        checklist: newItems,
        collaborators: ['MECAN AI']
      };

      updated[targetProjectIndex] = {
        ...updated[targetProjectIndex],
        subProjects: [...(updated[targetProjectIndex].subProjects || []), newSubProject]
      };
      
      saveProjects(updated);
      setExpandedProjects(new Set(expandedProjects).add(updated[targetProjectIndex].id));
      alert(`Strategie erfolgreich als Sub-Projekt zu "${updated[targetProjectIndex].title}" hinzugefügt.`);
    } else {
      const newProject: ExtendedProject = {
        id: Date.now().toString(),
        title: 'Neues KI-Projekt: Die Brücke von Zenica nach Berlin',
        description: 'KI-generierte Strategie',
        year: new Date().getFullYear().toString(),
        location: 'Zenica / Berlin',
        status: 'In Planung',
        checklist: newItems,
        collaborators: ['Igor G.', 'MECAN AI']
      };
      
      const updated = [newProject, ...projects];
      saveProjects(updated);
      alert('Neues Projekt mit KI-Strategie erstellt.');
    }
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const renderChecklist = (project: ExtendedProject, isSubProject = false, parentId?: string) => (
    <div className="mt-4">
      <h4 className="text-xs font-semibold text-zinc-900 mb-3 uppercase tracking-wider">Aufgaben & Checkliste</h4>
      <div className="space-y-2">
        {project.checklist.map(item => (
          <div key={item.id} className="flex items-center justify-between group bg-zinc-50 p-2 rounded-md border border-zinc-100">
            <button 
              onClick={() => toggleChecklistItem(project.id, item.id, isSubProject, parentId)}
              className="flex items-center gap-3 flex-1 text-left"
            >
              {item.completed ? (
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-zinc-300 flex-shrink-0" />
              )}
              <span className={`text-sm ${item.completed ? 'text-zinc-400 line-through' : 'text-zinc-700'}`}>
                {item.text}
              </span>
            </button>
            <button 
              onClick={() => removeChecklistItem(project.id, item.id, isSubProject, parentId)}
              className="text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-3">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.currentTarget.elements.namedItem('newItem') as HTMLInputElement;
            addChecklistItem(project.id, input.value, isSubProject, parentId);
            input.value = '';
          }}
          className="flex gap-2"
        >
          <input 
            type="text" 
            name="newItem"
            placeholder="Neue Aufgabe..." 
            className="flex-1 rounded-md border border-zinc-300 px-3 py-1.5 text-xs focus:border-zinc-500 focus:ring-zinc-500"
          />
          <button type="submit" className="bg-zinc-100 text-zinc-700 px-3 py-1.5 rounded-md text-xs font-medium hover:bg-zinc-200">
            Hinzufügen
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">Projekte & Ausstellungen</h1>
          <p className="text-zinc-600">Verwaltung von Projekten, Sub-Projekten, Aufgaben und Collaboration.</p>
        </div>
        <button className="bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Neues Projekt
        </button>
      </div>

      {/* AI Strategy Planner */}
      <AIStrategyPlanner type="project" onPushToAction={handlePushToAction} />

      <div className="grid grid-cols-1 gap-6">
        {projects.map(project => (
          <div key={project.id} className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-zinc-200 bg-zinc-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <button 
                  onClick={() => toggleExpand(project.id)}
                  className="mt-1 text-zinc-400 hover:text-zinc-900 transition-colors"
                >
                  {expandedProjects.has(project.id) ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </button>
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900">{project.title}</h2>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-sm text-zinc-500">{project.location} • {project.year}</p>
                    {project.collaborators && project.collaborators.length > 0 && (
                      <div className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        <Users className="w-3 h-3" />
                        {project.collaborators.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
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
            
            {expandedProjects.has(project.id) && (
              <div className="p-6">
                {/* Main Project Checklist */}
                {renderChecklist(project)}

                {/* Sub-Projects */}
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                      <FolderTree className="w-4 h-4 text-zinc-500" />
                      Sub-Projekte & Meilensteine
                    </h3>
                    <button className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                      <Plus className="w-3 h-3" /> Sub-Projekt hinzufügen
                    </button>
                  </div>
                  
                  {project.subProjects && project.subProjects.length > 0 ? (
                    <div className="space-y-4 pl-4 border-l-2 border-zinc-100">
                      {project.subProjects.map(sub => (
                        <div key={sub.id} className="bg-white border border-zinc-200 rounded-lg p-4 shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium text-zinc-900">{sub.title}</h4>
                              <p className="text-xs text-zinc-500">{sub.description}</p>
                            </div>
                            {sub.collaborators && (
                              <div className="flex items-center gap-1 text-[10px] text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-full">
                                <Users className="w-3 h-3" />
                                {sub.collaborators.join(', ')}
                              </div>
                            )}
                          </div>
                          {renderChecklist(sub, true, project.id)}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-zinc-500 italic pl-4 border-l-2 border-zinc-100">Keine Sub-Projekte vorhanden.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
