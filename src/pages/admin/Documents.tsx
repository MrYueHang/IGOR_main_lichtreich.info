import React, { useState, useRef, useEffect } from 'react';
import { Upload, FileText, Send, Loader2, CheckCircle2, FileImage, User, Bot, ArrowRight, X, MessageSquare, Paperclip, Camera, FolderOpen, MapPin, Users } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface Document {
  id: string;
  title: string;
  type: 'Rechnung' | 'Vertrag' | 'Quittung' | 'Brief' | 'Idee' | 'Unbekannt';
  status: 'Neu' | 'In Analyse' | 'Interview' | 'Aktion erforderlich' | 'Erledigt';
  date: string;
  summary: string;
  assignedTo: string;
  actionItem: string;
  imageUrl?: string;
  replyImageUrl?: string;
  extractedData?: {
    contacts: string[];
    projects: string[];
    locations: string[];
  };
  chatHistory: ChatMessage[];
}

export default function Documents() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      title: 'Mietvertrag Atelier Bad Saarow',
      type: 'Vertrag',
      status: 'Erledigt',
      date: '2026-01-15',
      summary: 'Mietvertrag für das Atelier in Bad Saarow. Monatliche Miete: 850€.',
      assignedTo: 'Verwalter',
      actionItem: 'Dauerauftrag eingerichtet.',
      chatHistory: [],
      extractedData: { contacts: ['Vermieter GmbH'], projects: ['Atelier Bad Saarow'], locations: ['Bad Saarow'] }
    },
    {
      id: '2',
      title: 'Einnahme Bildervermietung (Hotel Hospital)',
      type: 'Rechnung',
      status: 'Erledigt',
      date: '2026-03-01',
      summary: 'Rechnung für die Vermietung von 3 Bildern der Serie Hotel Hospital für 6 Monate.',
      assignedTo: 'Gallerist',
      actionItem: 'Zahlungseingang bestätigt.',
      chatHistory: [],
      extractedData: { contacts: ['Hotel Hospital'], projects: ['Serie Hotel Hospital'], locations: ['Berlin'] }
    }
  ]);

  const [activeDocId, setActiveDocId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const activeDoc = documents.find(d => d.id === activeDocId);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeDoc?.chatHistory]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isReplyProof = false) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        
        if (isReplyProof && activeDoc) {
          // Uploading proof of sent letter
          updateDocument(activeDoc.id, { 
            replyImageUrl: base64Image,
            status: 'Erledigt',
            actionItem: 'Antwort verschickt und dokumentiert.',
            chatHistory: [...activeDoc.chatHistory, { id: Date.now().toString(), role: 'assistant', content: 'Hervorragend. Ich habe das Foto als Beleg an diesen Vorgang angehängt und den Status auf "Erledigt" gesetzt. Das Postbuch ist aktualisiert.' }]
          });
        } else {
          // Uploading new document
          const newDoc: Document = {
            id: Date.now().toString(),
            title: 'Neues Dokument',
            type: 'Unbekannt',
            status: 'Neu',
            date: new Date().toISOString().split('T')[0],
            summary: '',
            assignedTo: 'MECAN',
            actionItem: 'Analyse ausstehend',
            imageUrl: base64Image,
            chatHistory: [],
            extractedData: { contacts: [], projects: [], locations: [] }
          };
          setDocuments([newDoc, ...documents]);
          setActiveDocId(newDoc.id);
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateDocument = (id: string, updates: Partial<Document>) => {
    setDocuments(docs => docs.map(d => d.id === id ? { ...d, ...updates } : d));
  };

  const analyzeDocument = async (doc: Document) => {
    if (!doc.imageUrl) return;
    
    updateDocument(doc.id, { status: 'In Analyse' });
    
    try {
      const apiKey = process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;
      
      let analysisResult;
      
      if (apiKey && apiKey !== 'YOUR_API_KEY') {
        const ai = new GoogleGenAI({ apiKey });
        const base64Data = doc.imageUrl.split(',')[1];
        
        const prompt = `Analysiere dieses Dokument für das Back-Office des Künstlers.
        Führe eine OCR-Texterkennung durch und identifiziere alle relevanten Daten, Fakten, Projekte, Kontakte, Orte und Relationen.
        Dekonstruiere die Daten effizient für ein Workflow-Schema.
        
        Antworte im JSON-Format mit folgender Struktur:
        {
          "title": "Kurzer, prägnanter Titel",
          "type": "Rechnung", "Vertrag", "Quittung", "Brief" oder "Idee",
          "summary": "Kurzbericht/Zusammenfassung des Inhalts",
          "assignedTo": "Gallerist", "Verwalter", "Mäzen" oder "Künstler",
          "extractedData": {
            "contacts": ["Kontakt 1"],
            "projects": ["Projekt A"],
            "locations": ["Ort X"]
          },
          "initialMessage": "Eine Begrüßungsnachricht an den User, in der du den Kurzbericht vorstellst, die extrahierten Daten erwähnst und eine Strategieauswahl anbietest (z.B. 'Soll ich einen Antwortentwurf erstellen?' oder 'Soll ich dies dem Projekt X zuordnen?')."
        }`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-preview',
          contents: [
            { text: prompt },
            { inlineData: { data: base64Data, mimeType: 'image/jpeg' } }
          ],
          config: { responseMimeType: 'application/json' }
        });

        analysisResult = JSON.parse(response.text || '{}');
      } else {
        // Mock fallback
        await new Promise(resolve => setTimeout(resolve, 3000));
        analysisResult = {
          title: 'Einladung Ausstellung Paris',
          type: 'Brief',
          summary: 'Einladung zur Teilnahme an einer Gruppenausstellung in der Galerie Lumière in Paris im kommenden Herbst.',
          assignedTo: 'Gallerist',
          extractedData: {
            contacts: ['Galerie Lumière', 'Jean Dupont'],
            projects: ['Herbstausstellung 2026'],
            locations: ['Paris, Frankreich']
          },
          initialMessage: 'Hallo Igor, ich habe den Brief analysiert. Es handelt sich um eine Einladung der Galerie Lumière in Paris für eine Ausstellung im Herbst. Ich habe die Kontakte und den Ort extrahiert. Wie ist unsere Strategie? Soll ich zusagen und einen Antwortbrief entwerfen, oder möchtest du das erst mit dem Galleristen besprechen?'
        };
      }

      updateDocument(doc.id, {
        title: analysisResult.title,
        type: analysisResult.type,
        summary: analysisResult.summary,
        assignedTo: analysisResult.assignedTo,
        extractedData: analysisResult.extractedData,
        status: 'Interview',
        chatHistory: [
          { id: Date.now().toString(), role: 'assistant', content: analysisResult.initialMessage }
        ]
      });

    } catch (error) {
      console.error("Error analyzing document:", error);
      updateDocument(doc.id, { status: 'Neu', actionItem: 'Fehler bei der Analyse.' });
    }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim() || !activeDoc) return;

    const newUserMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: chatInput };
    const updatedHistory = [...activeDoc.chatHistory, newUserMsg];
    
    updateDocument(activeDoc.id, { chatHistory: updatedHistory });
    setChatInput('');
    setIsChatLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;
      
      if (apiKey && apiKey !== 'YOUR_API_KEY') {
        const ai = new GoogleGenAI({ apiKey });
        const chat = ai.chats.create({
          model: 'gemini-3.1-flash-preview',
          config: {
            systemInstruction: `Du bist MECAN, die KI-Assistenz des Künstlers. Du befindest dich in einem Interview-Loop mit dem User über ein spezifisches Dokument (${activeDoc.title}). 
            Dein Ziel ist es, eine Strategie abzustimmen. Wenn der User zustimmt, dass ein Brief beantwortet werden soll, frage ihn, ob er die Antwort verschickt hat und bitte um ein Foto als Beleg.
            Wenn der User sagt, dass die Aktion erledigt ist, weise ihn darauf hin, das Beweisfoto hochzuladen.`
          }
        });

        // Replay history
        for (const msg of updatedHistory.slice(0, -1)) {
          await chat.sendMessage({ message: msg.content });
        }

        const response = await chat.sendMessage({ message: chatInput });
        
        updateDocument(activeDoc.id, {
          chatHistory: [...updatedHistory, { id: Date.now().toString(), role: 'assistant', content: response.text || '' }]
        });
        
        // Simple logic to change status based on keywords
        if (response.text?.toLowerCase().includes('foto') || response.text?.toLowerCase().includes('beleg') || response.text?.toLowerCase().includes('hochladen')) {
           updateDocument(activeDoc.id, { status: 'Aktion erforderlich', actionItem: 'Warte auf Beweisfoto/Antwortschreiben.' });
        }

      } else {
        // Mock chat response
        await new Promise(resolve => setTimeout(resolve, 1500));
        let reply = "Verstanden. Ich habe das im Projektverlauf notiert.";
        let newStatus = activeDoc.status;
        
        if (chatInput.toLowerCase().includes('ja') && chatInput.toLowerCase().includes('antwort')) {
          reply = "Alles klar, ich habe einen Entwurf für die Zusage vorbereitet und an den Galleristen zur Freigabe gesendet. Sobald der Brief verschickt ist, lade bitte ein Foto davon hier hoch, damit ich den Vorgang im Postbuch schließen kann.";
          newStatus = 'Aktion erforderlich';
        }
        
        updateDocument(activeDoc.id, {
          status: newStatus,
          chatHistory: [...updatedHistory, { id: Date.now().toString(), role: 'assistant', content: reply }]
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">Postbuch & Belege (MECAN Workflow)</h1>
        <p className="text-zinc-600">KI-gestützte Erfassung, OCR-Analyse, Strategie-Interview und revisionssichere Dokumentation.</p>
      </div>

      {!activeDocId ? (
        // LIST VIEW
        <div className="flex-1 bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-zinc-200 bg-zinc-50 flex justify-between items-center">
            <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-zinc-500" />
              Aktuelle Vorgänge im Postbuch
            </h2>
            <div className="relative">
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => handleFileUpload(e, false)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <button className="bg-zinc-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Neuer Posteingang
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {documents.map(doc => (
              <div 
                key={doc.id} 
                onClick={() => setActiveDocId(doc.id)}
                className="border border-zinc-200 rounded-lg p-4 hover:border-zinc-400 transition-colors bg-white cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-zinc-900 group-hover:text-blue-600 transition-colors">{doc.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1">
                      <span>{doc.date}</span>
                      <span>•</span>
                      <span className="px-2 py-0.5 bg-zinc-100 rounded font-medium">{doc.type}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    doc.status === 'Erledigt' ? 'bg-green-100 text-green-800' : 
                    doc.status === 'Aktion erforderlich' ? 'bg-amber-100 text-amber-800' : 
                    doc.status === 'Interview' ? 'bg-purple-100 text-purple-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {doc.status}
                  </span>
                </div>
                
                <p className="text-sm text-zinc-600 mb-4 line-clamp-2">{doc.summary || 'Noch keine Zusammenfassung verfügbar.'}</p>
                
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  {doc.extractedData?.projects && doc.extractedData.projects.length > 0 && (
                    <div className="flex items-center gap-1">
                      <FolderOpen className="w-3 h-3" /> {doc.extractedData.projects[0]}
                    </div>
                  )}
                  {doc.extractedData?.contacts && doc.extractedData.contacts.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" /> {doc.extractedData.contacts[0]}
                    </div>
                  )}
                  <div className="flex items-center gap-1 ml-auto">
                    <User className="w-3 h-3" /> {doc.assignedTo}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // DETAIL / INTERVIEW VIEW
        <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
          {/* Left: Document Image & Meta */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4 min-h-0">
            <button 
              onClick={() => setActiveDocId(null)}
              className="text-sm text-zinc-500 hover:text-zinc-900 flex items-center gap-1 w-fit"
            >
              <ArrowRight className="w-4 h-4 rotate-180" /> Zurück zum Postbuch
            </button>
            
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-4 flex-1 flex flex-col min-h-0">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-bold text-zinc-900">{activeDoc.title}</h2>
                  <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1">
                    <span className="px-2 py-0.5 bg-zinc-100 rounded font-medium">{activeDoc.type}</span>
                    <span>{activeDoc.date}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  activeDoc.status === 'Erledigt' ? 'bg-green-100 text-green-800' : 
                  activeDoc.status === 'Aktion erforderlich' ? 'bg-amber-100 text-amber-800' : 
                  'bg-purple-100 text-purple-800'
                }`}>
                  {activeDoc.status}
                </span>
              </div>

              <div className="flex-1 bg-zinc-100 rounded-lg overflow-hidden relative border border-zinc-200 min-h-0 flex items-center justify-center">
                {activeDoc.imageUrl ? (
                  <img src={activeDoc.imageUrl} alt="Document" className="max-w-full max-h-full object-contain" />
                ) : (
                  <FileImage className="w-12 h-12 text-zinc-300" />
                )}
              </div>

              {activeDoc.extractedData && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="bg-zinc-50 p-2 rounded border border-zinc-100">
                    <div className="text-[10px] text-zinc-400 uppercase font-bold mb-1 flex items-center gap-1"><FolderOpen className="w-3 h-3"/> Projekte</div>
                    <div className="text-xs text-zinc-700">{activeDoc.extractedData.projects.join(', ') || '-'}</div>
                  </div>
                  <div className="bg-zinc-50 p-2 rounded border border-zinc-100">
                    <div className="text-[10px] text-zinc-400 uppercase font-bold mb-1 flex items-center gap-1"><Users className="w-3 h-3"/> Kontakte</div>
                    <div className="text-xs text-zinc-700">{activeDoc.extractedData.contacts.join(', ') || '-'}</div>
                  </div>
                  <div className="bg-zinc-50 p-2 rounded border border-zinc-100">
                    <div className="text-[10px] text-zinc-400 uppercase font-bold mb-1 flex items-center gap-1"><MapPin className="w-3 h-3"/> Orte</div>
                    <div className="text-xs text-zinc-700">{activeDoc.extractedData.locations.join(', ') || '-'}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: MECAN Interview Loop */}
          <div className="w-full lg:w-1/2 bg-white rounded-xl border border-zinc-200 shadow-sm flex flex-col min-h-0">
            <div className="p-4 border-b border-zinc-200 bg-zinc-50 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-900 text-sm">MECAN Interview Loop</h3>
                <p className="text-xs text-zinc-500">Strategie & Workflow-Dekonstruktion</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeDoc.status === 'Neu' && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <Bot className="w-12 h-12 text-zinc-300" />
                  <div>
                    <p className="font-medium text-zinc-900">Dokument bereit zur Analyse</p>
                    <p className="text-sm text-zinc-500 max-w-sm mt-1">MECAN wird OCR durchführen, Daten extrahieren und einen Strategie-Vorschlag unterbreiten.</p>
                  </div>
                  <button 
                    onClick={() => analyzeDocument(activeDoc)}
                    className="bg-zinc-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 flex items-center gap-2"
                  >
                    Analyse starten
                  </button>
                </div>
              )}

              {activeDoc.status === 'In Analyse' && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                  <p className="text-sm text-zinc-600">OCR & Daten-Dekonstruktion läuft...</p>
                </div>
              )}

              {(activeDoc.status === 'Interview' || activeDoc.status === 'Aktion erforderlich' || activeDoc.status === 'Erledigt') && (
                <>
                  {activeDoc.chatHistory.map((msg) => (
                    <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        msg.role === 'user' ? 'bg-zinc-200' : 'bg-blue-100'
                      }`}>
                        {msg.role === 'user' ? <User className="w-4 h-4 text-zinc-600" /> : <Bot className="w-4 h-4 text-blue-600" />}
                      </div>
                      <div className={`p-3 rounded-2xl max-w-[80%] text-sm ${
                        msg.role === 'user' 
                          ? 'bg-zinc-900 text-white rounded-tr-none' 
                          : 'bg-zinc-100 text-zinc-800 rounded-tl-none whitespace-pre-wrap'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  
                  {activeDoc.replyImageUrl && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="p-3 rounded-2xl max-w-[80%] bg-zinc-100 text-zinc-800 rounded-tl-none">
                        <p className="text-sm mb-2 font-medium">Hinterlegter Beleg:</p>
                        <img src={activeDoc.replyImageUrl} alt="Reply Proof" className="rounded-lg border border-zinc-200 max-h-48 object-contain bg-white" />
                      </div>
                    </div>
                  )}

                  {isChatLoading && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="p-3 rounded-2xl bg-zinc-100 text-zinc-800 rounded-tl-none flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-zinc-400" />
                        <span className="text-sm text-zinc-500">MECAN tippt...</span>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </>
              )}
            </div>

            {/* Action Area (Chat Input or File Upload) */}
            {(activeDoc.status === 'Interview' || activeDoc.status === 'Aktion erforderlich') && (
              <div className="p-4 border-t border-zinc-200 bg-white">
                {activeDoc.status === 'Aktion erforderlich' ? (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
                    <p className="text-sm font-medium text-amber-800 mb-3">Aktion erforderlich: {activeDoc.actionItem}</p>
                    <div className="relative inline-block">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleFileUpload(e, true)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <button className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors flex items-center gap-2">
                        <Camera className="w-4 h-4" />
                        Beweisfoto / Antwort hochladen
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Antworte MECAN zur Strategie..."
                      className="flex-1 px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                      onClick={handleSendMessage}
                      disabled={!chatInput.trim() || isChatLoading}
                      className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
