import { useState, FormEvent } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Loader2, Plus, Sparkles, FileText, Mic } from 'lucide-react';
import { AI_PROMPTS } from '../../services/mockAI';

interface Draft {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'text' | 'audio';
}

export default function Content() {
  const [prompt, setPrompt] = useState('');
  const [audioEtappe, setAudioEtappe] = useState('');
  const [isLoadingText, setIsLoadingText] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [drafts, setDrafts] = useState<Draft[]>([
    { id: '1', title: 'Ausstellung Havanna', content: 'Die kommende Ausstellung in Havanna vereint...', date: '2026-03-18', type: 'text' }
  ]);

  const handleGenerateText = async (e: FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoadingText) return;

    setIsLoadingText(true);
    try {
      const apiKey = process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        alert("API Key fehlt.");
        return;
      }
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Erstelle einen professionellen Textentwurf für die Webseite oder Social Media basierend auf folgenden Stichpunkten/Beschreibung: ${prompt}. Der Text sollte im Stil von Igor Grgurević (Künstler und Therapeut) verfasst sein.`,
      });
      
      if (response.text) {
        const newDraft: Draft = {
          id: Date.now().toString(),
          title: prompt.slice(0, 30) + '...',
          content: response.text,
          date: new Date().toISOString().split('T')[0],
          type: 'text'
        };
        setDrafts([newDraft, ...drafts]);
        setPrompt('');
      }
    } catch (error) {
      console.error("Error generating content:", error);
      alert("Fehler bei der Textgenerierung.");
    } finally {
      setIsLoadingText(false);
    }
  };

  const handleGenerateAudio = async (e: FormEvent) => {
    e.preventDefault();
    if (!audioEtappe.trim() || isLoadingAudio) return;

    setIsLoadingAudio(true);
    try {
      const apiKey = process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        alert("API Key fehlt.");
        return;
      }
      const ai = new GoogleGenAI({ apiKey });
      const promptText = AI_PROMPTS.audio.replace('{ETAPPE}', audioEtappe);
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: promptText,
      });
      
      if (response.text) {
        const newDraft: Draft = {
          id: Date.now().toString(),
          title: `Audio: ${audioEtappe.slice(0, 30)}...`,
          content: response.text,
          date: new Date().toISOString().split('T')[0],
          type: 'audio'
        };
        setDrafts([newDraft, ...drafts]);
        setAudioEtappe('');
      }
    } catch (error) {
      console.error("Error generating audio script:", error);
      alert("Fehler bei der Audio-Skript Generierung.");
    } finally {
      setIsLoadingAudio(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">Contenttable</h1>
        <p className="text-zinc-600">Zentrale Verwaltung aller Website-Texte, Biografien, Vision-Statements und Audio-Skripte.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Text Generator */}
        <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-zinc-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            KI-Text Generator
          </h2>
          <form onSubmit={handleGenerateText} className="space-y-4">
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-zinc-700 mb-1">
                Stichpunkte oder kurze Beschreibung
              </label>
              <textarea
                id="prompt"
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:ring-zinc-500"
                placeholder="Z.B. Neuer Werkzyklus 'Luminous Sketchbook', Fokus auf Resilienz, Ausstellung im Mai..."
              />
            </div>
            <button
              type="submit"
              disabled={isLoadingText || !prompt.trim()}
              className="inline-flex items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 disabled:opacity-50"
            >
              {isLoadingText ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generiert...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Text generieren
                </>
              )}
            </button>
          </form>
        </div>

        {/* Audio Script Generator */}
        <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-zinc-900 mb-4 flex items-center gap-2">
            <Mic className="w-5 h-5 text-zinc-900" />
            Audio-Skript Generator (NotebookLM)
          </h2>
          <form onSubmit={handleGenerateAudio} className="space-y-4">
            <div>
              <label htmlFor="audioEtappe" className="block text-sm font-medium text-zinc-700 mb-1">
                Biografische Etappe / Thema
              </label>
              <textarea
                id="audioEtappe"
                rows={3}
                value={audioEtappe}
                onChange={(e) => setAudioEtappe(e.target.value)}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:ring-zinc-500"
                placeholder="Z.B. Die Zeit in Damaskus und der Einfluss auf die Farbpalette..."
              />
            </div>
            <button
              type="submit"
              disabled={isLoadingAudio || !audioEtappe.trim()}
              className="inline-flex items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 disabled:opacity-50"
            >
              {isLoadingAudio ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generiert...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Audio-Skript generieren
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-200 bg-zinc-50">
          <h2 className="text-lg font-semibold text-zinc-900">Gespeicherte Entwürfe & Skripte</h2>
        </div>
        <div className="divide-y divide-zinc-200">
          {drafts.map(draft => (
            <div key={draft.id} className="p-6 hover:bg-zinc-50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-zinc-900 flex items-center gap-2">
                  {draft.type === 'audio' ? <Mic className="w-4 h-4 text-zinc-400" /> : <FileText className="w-4 h-4 text-zinc-400" />}
                  {draft.title}
                </h3>
                <span className="text-xs text-zinc-500">{draft.date}</span>
              </div>
              <p className="text-sm text-zinc-600 whitespace-pre-wrap">{draft.content}</p>
            </div>
          ))}
          {drafts.length === 0 && (
            <div className="p-6 text-center text-zinc-500 text-sm">
              Noch keine Entwürfe vorhanden.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
