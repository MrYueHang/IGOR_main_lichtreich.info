import React, { useState } from 'react';
import { Bot, Send, CheckCircle, RefreshCw, ArrowRight } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { AI_PROMPTS } from '../../services/mockAI';

interface AIStrategyPlannerProps {
  type: 'social' | 'project';
  onPushToAction: (strategy: string) => void;
}

export default function AIStrategyPlanner({ type, onPushToAction }: AIStrategyPlannerProps) {
  const [idea, setIdea] = useState('');
  const [strategy, setStrategy] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai', content: string }[]>([]);
  const [refinement, setRefinement] = useState('');

  const handleGenerate = async () => {
    if (!idea.trim()) return;
    setIsGenerating(true);
    
    try {
      const apiKey = process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        // Fallback to mock if no API key
        const { generateMockSocialStrategy, generateMockProjectStrategy } = await import('../../services/mockAI');
        const mockStrategy = type === 'social' ? generateMockSocialStrategy(idea) : generateMockProjectStrategy(idea);
        setTimeout(() => {
          setStrategy(mockStrategy);
          setChatHistory([{ role: 'ai', content: mockStrategy }]);
          setIsGenerating(false);
        }, 1500);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = type === 'social' ? AI_PROMPTS.social : `Du bist Projektmanager für Herr Künstler. Erstelle eine Projektstrategie für: ${idea}\n\nPhasen: Konzeption, Kreation, Dokumentation, Abschluss.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `${prompt}\n\nIdee des Nutzers: ${idea}`,
      });

      const text = response.text || 'Keine Antwort generiert.';
      setStrategy(text);
      setChatHistory([{ role: 'ai', content: text }]);
    } catch (error) {
      console.error('Error generating strategy:', error);
      setStrategy('Fehler bei der Generierung. Bitte API-Key prüfen.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRefine = async () => {
    if (!refinement.trim() || !strategy) return;
    setIsGenerating(true);
    
    const newHistory = [...chatHistory, { role: 'user' as const, content: refinement }];
    setChatHistory(newHistory);
    setRefinement('');

    try {
      const apiKey = process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        setTimeout(() => {
          const refined = strategy + `\n\n[Angepasst nach Feedback: ${newHistory[newHistory.length - 1].content}]`;
          setStrategy(refined);
          setChatHistory([...newHistory, { role: 'ai', content: refined }]);
          setIsGenerating(false);
        }, 1000);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: type === 'social' ? AI_PROMPTS.social : 'Du bist Projektmanager für Herr Künstler.',
        }
      });

      // Replay history
      for (const msg of newHistory) {
        await chat.sendMessage({ message: msg.content });
      }

      const response = await chat.sendMessage({ message: 'Bitte passe die Strategie basierend auf meinem letzten Feedback an und gib die komplette neue Strategie aus.' });
      const text = response.text || 'Keine Antwort generiert.';
      
      setStrategy(text);
      setChatHistory([...newHistory, { role: 'ai', content: text }]);
    } catch (error) {
      console.error('Error refining strategy:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col h-[600px]">
      <div className="p-4 border-b border-zinc-200 bg-zinc-50 flex items-center gap-2">
        <Bot className="w-5 h-5 text-zinc-900" />
        <h2 className="text-lg font-semibold text-zinc-900">
          KI-Strategie Planer ({type === 'social' ? 'Social Media' : 'Projekte'})
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50/50">
        {!strategy ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-400">
              <Bot className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-zinc-900 font-medium">Idee eingeben</h3>
              <p className="text-sm text-zinc-500 max-w-sm mt-1">
                Beschreibe deine Idee kurz. Die KI erstellt einen strukturierten Entwurf, den wir gemeinsam abstimmen.
              </p>
            </div>
            <div className="w-full max-w-md flex gap-2">
              <input
                type="text"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Z.B. Fokus auf die neue Serie 'Hotel Hospital'..."
                className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:ring-zinc-500"
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              />
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !idea.trim()}
                className="bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 disabled:opacity-50 flex items-center gap-2"
              >
                {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-xl p-4 ${msg.role === 'user' ? 'bg-zinc-900 text-white' : 'bg-white border border-zinc-200 shadow-sm text-zinc-800'}`}>
                  <pre className="whitespace-pre-wrap font-sans text-sm">{msg.content}</pre>
                </div>
              </div>
            ))}
            {isGenerating && (
              <div className="flex justify-start">
                <div className="bg-white border border-zinc-200 shadow-sm rounded-xl p-4 flex items-center gap-2 text-zinc-500">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span className="text-sm">KI denkt nach...</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {strategy && (
        <div className="p-4 border-t border-zinc-200 bg-white space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={refinement}
              onChange={(e) => setRefinement(e.target.value)}
              placeholder="Änderungswünsche? (z.B. 'Mach es kürzer', 'Fokus mehr auf Zenica')"
              className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:ring-zinc-500"
              onKeyDown={(e) => e.key === 'Enter' && handleRefine()}
            />
            <button
              onClick={handleRefine}
              disabled={isGenerating || !refinement.trim()}
              className="bg-zinc-100 text-zinc-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-200 disabled:opacity-50 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => onPushToAction(strategy)}
              className="bg-green-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-green-700 flex items-center gap-2 shadow-sm transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              Strategie freigeben & Push to Action
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
