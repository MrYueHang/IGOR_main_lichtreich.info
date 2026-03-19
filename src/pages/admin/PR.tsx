import { useState, useEffect } from 'react';
import { FileText, Plus, Send, Loader2, Edit3, Check, X } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
}

interface PressRelease {
  id: string;
  title: string;
  content: string;
  date: string;
  status: 'Entwurf' | 'Veröffentlicht';
}

export default function PR() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [pressReleases, setPressReleases] = useState<PressRelease[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [additionalContext, setAdditionalContext] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingRelease, setEditingRelease] = useState<PressRelease | null>(null);

  useEffect(() => {
    const storedProjects = localStorage.getItem('igor_projects');
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    }
    const storedPRs = localStorage.getItem('igor_prs');
    if (storedPRs) {
      setPressReleases(JSON.parse(storedPRs));
    }
  }, []);

  const savePRs = (prs: PressRelease[]) => {
    setPressReleases(prs);
    localStorage.setItem('igor_prs', JSON.stringify(prs));
  };

  const handleGenerate = async () => {
    if (!selectedProject) return;
    
    setIsGenerating(true);
    try {
      const project = projects.find(p => p.id === selectedProject);
      const apiKey = process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;
      
      let generatedText = '';
      
      if (apiKey && apiKey !== 'YOUR_API_KEY') {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `Erstelle einen professionellen Entwurf für eine Pressemitteilung für den Künstler "Herr Künstler" (Igor Grgurev).
        
        Projekt: ${project?.title}
        Beschreibung: ${project?.description}
        Zusätzlicher Kontext: ${additionalContext}
        
        Die Pressemitteilung sollte eine packende Überschrift haben, die wichtigsten W-Fragen beantworten und im ruhigen, klaren Stil des Künstlers verfasst sein.`;
        
        const response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-preview',
          contents: prompt,
        });
        generatedText = response.text || '';
      } else {
        // Mock fallback
        await new Promise(resolve => setTimeout(resolve, 1500));
        generatedText = `PRESSEMITTEILUNG\n\n**Herr Künstler präsentiert: ${project?.title}**\n\nBerlin/Zenica, ${new Date().toLocaleDateString('de-DE')} – Der Künstler Igor Grgurev, bekannt als "Herr Künstler", kündigt sein neuestes Projekt an. \n\n${project?.description}\n\n${additionalContext}\n\nFür weitere Informationen und Presseanfragen kontaktieren Sie bitte...`;
      }

      const newPR: PressRelease = {
        id: Date.now().toString(),
        title: `Entwurf: ${project?.title}`,
        content: generatedText,
        date: new Date().toISOString().split('T')[0],
        status: 'Entwurf'
      };

      savePRs([newPR, ...pressReleases]);
      setSelectedProject('');
      setAdditionalContext('');
    } catch (error) {
      console.error("Error generating PR:", error);
      alert("Fehler bei der Generierung der Pressemitteilung.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveEdit = () => {
    if (!editingRelease) return;
    const updated = pressReleases.map(pr => pr.id === editingRelease.id ? editingRelease : pr);
    savePRs(updated);
    setEditingRelease(null);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">PR & Presse</h1>
        <p className="text-zinc-600">KI-gestützte Generierung von Pressemitteilungen basierend auf Projekten.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Generator Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-zinc-500" />
              Neuer Entwurf (KI)
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Bezugsprojekt wählen</label>
                <select 
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:ring-zinc-500"
                >
                  <option value="">Bitte wählen...</option>
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Zusätzlicher Kontext (optional)</label>
                <textarea 
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  placeholder="Z.B. Fokus auf die Ausstellung in Havanna..."
                  className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:ring-zinc-500 h-24 resize-none"
                />
              </div>

              <button 
                onClick={handleGenerate}
                disabled={!selectedProject || isGenerating}
                className="w-full bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {isGenerating ? 'Generiere...' : 'Entwurf generieren'}
              </button>
            </div>
          </div>
        </div>

        {/* PR List Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col h-[600px]">
            <div className="p-4 border-b border-zinc-200 bg-zinc-50">
              <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-zinc-500" />
                Pressemitteilungen
              </h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {pressReleases.length === 0 ? (
                <div className="text-center text-zinc-500 py-12">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-zinc-300" />
                  <p>Noch keine Pressemitteilungen vorhanden.</p>
                </div>
              ) : (
                pressReleases.map(pr => (
                  <div key={pr.id} className="border border-zinc-200 rounded-lg p-4 hover:border-zinc-300 transition-colors">
                    {editingRelease?.id === pr.id ? (
                      <div className="space-y-4">
                        <input 
                          type="text" 
                          value={editingRelease.title}
                          onChange={(e) => setEditingRelease({...editingRelease, title: e.target.value})}
                          className="w-full font-bold text-lg border-b border-zinc-300 px-2 py-1 focus:outline-none focus:border-zinc-900"
                        />
                        <textarea 
                          value={editingRelease.content}
                          onChange={(e) => setEditingRelease({...editingRelease, content: e.target.value})}
                          className="w-full h-64 p-2 border border-zinc-300 rounded-md text-sm focus:outline-none focus:border-zinc-900 resize-none font-mono"
                        />
                        <div className="flex justify-end gap-2">
                          <button onClick={() => setEditingRelease(null)} className="p-2 text-zinc-500 hover:text-zinc-700 rounded-md hover:bg-zinc-100"><X className="w-4 h-4" /></button>
                          <button onClick={handleSaveEdit} className="p-2 text-green-600 hover:text-green-700 rounded-md hover:bg-green-50"><Check className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold text-zinc-900">{pr.title}</h3>
                            <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1">
                              <span>{pr.date}</span>
                              <span>•</span>
                              <span className={`px-2 py-0.5 rounded-full font-medium ${pr.status === 'Entwurf' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                                {pr.status}
                              </span>
                            </div>
                          </div>
                          <button onClick={() => setEditingRelease(pr)} className="text-zinc-400 hover:text-zinc-900 p-1">
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="mt-4 text-sm text-zinc-700 whitespace-pre-wrap font-serif bg-zinc-50 p-4 rounded-md border border-zinc-100">
                          {pr.content}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
