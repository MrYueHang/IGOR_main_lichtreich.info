import { useState, FormEvent } from 'react';
import { Send, Bot, User, Loader2, FolderSync, Briefcase, MessageSquare, FileText, ChevronRight } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { aiTemplates, AITemplate } from '../../data/aiTemplates';

export default function AIAssistant() {
  const [activeTab, setActiveTab] = useState<'chat' | 'consulting' | 'batch' | 'templates'>('chat');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hallo Igor. Ich bin MECAN, deine persönliche KI-Assistenz. Ich unterstütze dich bei der ORGA, Social Media Strategien, Ticketbuchungen, Korrespondenz und der Strukturierung deiner Projekte. Wie kann ich dir heute helfen?' }
  ]);

  const handleSend = async (e?: FormEvent, customPrompt?: string) => {
    if (e) e.preventDefault();
    const messageToSend = customPrompt || input;
    if (!messageToSend.trim() || isLoading) return;

    setMessages(prev => [...prev, { role: 'user', content: messageToSend }]);
    if (!customPrompt) setInput('');
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;
      if (apiKey && apiKey !== 'YOUR_API_KEY') {
        const ai = new GoogleGenAI({ apiKey });
        
        let systemInstruction = "Du bist MECAN, die persönliche KI-Assistenz für Igor Grgurević. Deine Aufgabe ist es, ihm bei der Organisation (ORGA), Social Media, Ticketbuchungen, Korrespondenz und Projektplanung zu helfen. Du agierst als Schnittstelle zwischen 'Herr Künstler' (kreative Arbeit, reale Tatsachen) und 'Herr Ingenieur' (Struktur, Therapie, Management). Antworte präzise, professionell und unterstützend.";
        
        if (activeTab === 'consulting') {
          systemInstruction = "Du agierst als C-Level Consultant für Igor Grgurević. Du hast Zugriff auf den Gesamtkontext aller Projekte, E-Mails, Cloud-Daten und Social-Media-Aktivitäten. Deine Aufgabe ist es, strategische, weitsichtige und analytische Beratung zu liefern. Identifiziere Muster, schlage Prozessoptimierungen vor und hilf bei der Priorisierung von Aufgaben und Checklisten.";
        }

        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: messageToSend,
          config: {
            systemInstruction: systemInstruction,
          }
        });
        
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: response.text || 'Entschuldigung, ich konnte keine Antwort generieren.' 
        }]);
      } else {
        // Mock fallback
        await new Promise(resolve => setTimeout(resolve, 1500));
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: activeTab === 'consulting' 
            ? 'Basierend auf der Analyse des Gesamtkontexts empfehle ich, die Priorität auf das Projekt "Zenica" zu legen und die Social-Media-Kampagne entsprechend anzupassen. Soll ich entsprechende Checklisten generieren?' 
            : 'Verstanden. Ich habe das notiert und werde es bearbeiten.'
        }]);
      }
    } catch (error) {
      console.error("Error generating content:", error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Entschuldigung, es gab einen Fehler bei der Kommunikation mit der KI.' 
      }]);
    } finally {
      setIsLoading(false);
      if (activeTab === 'templates') {
        setActiveTab('chat'); // Switch to chat view to see the result
      }
    }
  };

  const handleTemplateClick = (template: AITemplate) => {
    setInput(template.prompt);
    setActiveTab('chat');
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">MECAN – KI-Assistenz</h1>
          <p className="text-zinc-600">Zentrale KI-Steuerung, C-Level Consulting und Batch-Verarbeitung.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('chat')}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === 'chat' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Standard Assistenz
        </button>
        <button
          onClick={() => setActiveTab('consulting')}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === 'consulting' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          C-Level Consulting
        </button>
        <button
          onClick={() => setActiveTab('batch')}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === 'batch' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50'
          }`}
        >
          <FolderSync className="w-4 h-4" />
          Batch & Ordner Sync
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === 'templates' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50'
          }`}
        >
          <FileText className="w-4 h-4" />
          KI-Vorlagen (Templates)
        </button>
      </div>
      
      <div className="flex-1 bg-white rounded-xl border border-zinc-200 shadow-sm flex flex-col overflow-hidden">
        {activeTab === 'batch' ? (
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center overflow-y-auto">
            <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
              <FolderSync className="w-8 h-8 text-zinc-400" />
            </div>
            <h2 className="text-xl font-bold text-zinc-900 mb-2">Automatischer Ordner-Abruf</h2>
            <p className="text-zinc-600 max-w-md mb-8">
              Verbinden Sie MECAN mit Ihren Data Lakes (Google Drive, Dropbox, AWS S3), um ganze Themenkomplexe und Ordnerstrukturen automatisch abzurufen, zu analysieren und in Aufgaben/Checklisten zu überführen.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl text-left">
              <div className="border border-zinc-200 rounded-lg p-4 hover:border-zinc-300 cursor-pointer transition-colors">
                <h3 className="font-bold text-zinc-900 mb-1">Google Drive: "Projekt Havanna"</h3>
                <p className="text-xs text-zinc-500 mb-3">Zuletzt synchronisiert: Heute, 09:41</p>
                <button className="w-full bg-zinc-100 text-zinc-700 px-3 py-1.5 rounded text-sm font-medium hover:bg-zinc-200">
                  Jetzt synchronisieren & analysieren
                </button>
              </div>
              <div className="border border-zinc-200 rounded-lg p-4 hover:border-zinc-300 cursor-pointer transition-colors">
                <h3 className="font-bold text-zinc-900 mb-1">Dropbox: "Skizzen 2026"</h3>
                <p className="text-xs text-zinc-500 mb-3">Zuletzt synchronisiert: Gestern, 14:20</p>
                <button className="w-full bg-zinc-100 text-zinc-700 px-3 py-1.5 rounded text-sm font-medium hover:bg-zinc-200">
                  Jetzt synchronisieren & analysieren
                </button>
              </div>
            </div>
            
            <button className="mt-8 text-sm font-medium text-blue-600 hover:text-blue-800 underline underline-offset-4">
              Neue Ordner-Verknüpfung einrichten
            </button>
          </div>
        ) : activeTab === 'templates' ? (
          <div className="flex-1 p-6 overflow-y-auto bg-zinc-50">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-bold text-zinc-900 mb-2">MECAN Vorlagen-Bibliothek</h2>
              <p className="text-zinc-600 mb-8">Wählen Sie eine Vorlage aus, um den Prompt in den Chat zu laden. Sie können die Platzhalter (in Klammern) vor dem Absenden anpassen.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aiTemplates.map((template) => (
                  <div 
                    key={template.id} 
                    onClick={() => handleTemplateClick(template)}
                    className="bg-white border border-zinc-200 rounded-xl p-5 hover:border-zinc-400 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold tracking-wider text-zinc-500 uppercase bg-zinc-100 px-2 py-1 rounded">
                        {template.category}
                      </span>
                      <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-600 transition-colors" />
                    </div>
                    <h3 className="font-bold text-zinc-900 mb-2">{template.title}</h3>
                    <p className="text-sm text-zinc-600 line-clamp-2">{template.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className={`p-4 border-b border-zinc-200 ${activeTab === 'consulting' ? 'bg-amber-50' : 'bg-zinc-50'}`}>
              <p className={`text-sm font-medium ${activeTab === 'consulting' ? 'text-amber-800' : 'text-zinc-700'}`}>
                {activeTab === 'consulting' 
                  ? 'C-Level Modus aktiv: MECAN analysiert den Gesamtkontext (E-Mails, Projekte, Finanzen) für strategische Beratung.' 
                  : 'Standard Modus: Direkte Assistenz für tägliche Aufgaben.'}
              </p>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600'
                  }`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user' 
                      ? 'bg-zinc-900 text-white rounded-tr-none' 
                      : 'bg-zinc-100 text-zinc-900 rounded-tl-none'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-zinc-100 text-zinc-900 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-zinc-500" />
                    <span className="text-sm text-zinc-500">MECAN denkt nach...</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-zinc-200 bg-zinc-50">
              <form onSubmit={(e) => handleSend(e)} className="flex gap-4">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={activeTab === 'consulting' ? "Frage nach strategischer Einschätzung..." : "Sprich mit MECAN oder wähle eine Vorlage..."}
                  disabled={isLoading}
                  rows={2}
                  className="flex-1 rounded-2xl border-zinc-300 shadow-sm focus:border-zinc-500 focus:ring-zinc-500 sm:text-sm border px-4 py-3 disabled:opacity-50 resize-none"
                />
                <button 
                  type="submit" 
                  disabled={isLoading || !input.trim()}
                  className="bg-zinc-900 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-zinc-800 transition-colors disabled:opacity-50 self-end mb-1"
                >
                  <Send className="w-5 h-5 ml-1" />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
