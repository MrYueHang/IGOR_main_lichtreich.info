import { useState, FormEvent } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export default function AIAssistant() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hallo Igor. Ich bin MECAN, deine persönliche KI-Assistenz. Ich unterstütze dich bei der ORGA, Social Media Strategien, Ticketbuchungen, Korrespondenz und der Strukturierung deiner Projekte. Wie kann ich dir heute helfen?' }
  ]);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMessage,
        config: {
          systemInstruction: "Du bist MECAN, die persönliche KI-Assistenz für Igor Grgurević. Deine Aufgabe ist es, ihm bei der Organisation (ORGA), Social Media, Ticketbuchungen, Korrespondenz und Projektplanung zu helfen. Du agierst als Schnittstelle zwischen 'Herr Künstler' (kreative Arbeit, reale Tatsachen) und 'Herr Ingenieur' (Struktur, Therapie, Management). Antworte präzise, professionell und unterstützend.",
        }
      });
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.text || 'Entschuldigung, ich konnte keine Antwort generieren.' 
      }]);
    } catch (error) {
      console.error("Error generating content:", error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Entschuldigung, es gab einen Fehler bei der Kommunikation mit der KI.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <h1 className="text-2xl font-bold text-zinc-900 mb-6">MECAN – KI-Assistenz</h1>
      
      <div className="flex-1 bg-white rounded-xl border border-zinc-200 shadow-sm flex flex-col overflow-hidden">
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
          <form onSubmit={handleSend} className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Sprich mit MECAN..."
              disabled={isLoading}
              className="flex-1 rounded-full border-zinc-300 shadow-sm focus:border-zinc-500 focus:ring-zinc-500 sm:text-sm border px-6 py-3 disabled:opacity-50"
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="bg-zinc-900 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-zinc-800 transition-colors disabled:opacity-50"
            >
              <Send className="w-5 h-5 ml-1" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
