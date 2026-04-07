import { useState } from 'react';
import { Key, HardDrive, Cloud, Lock, Server, FileText, Wallet, CreditCard, X, Settings, MessageCircle, Plus, Database, Share2 } from 'lucide-react';

export default function Workspace() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const renderModalContent = () => {
    switch (activeModal) {
      case 'cloud':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Cloud Speicher & Data Lakes</h3>
            <p className="text-sm text-zinc-600">Verwalten Sie Verknüpfungen für automatischen Abruf und Upload ganzer Ordner und Themen.</p>
            <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-200 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Google Drive (Workspace)</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Verbunden</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Dropbox (Archiv)</span>
                <button className="text-xs bg-zinc-900 text-white px-3 py-1 rounded hover:bg-zinc-800">Verbinden</button>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-zinc-200">
                <span className="font-medium">AWS S3 (Data Lake)</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Verbunden</span>
              </div>
            </div>
            <button className="w-full mt-2 border border-dashed border-zinc-300 text-zinc-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-50 flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> Cloud/Data Lake hinzufügen
            </button>
          </div>
        );
      case 'email':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">E-Mail Accounts</h3>
            <p className="text-sm text-zinc-600">Verwaltung der verknüpften E-Mail-Postfächer für den automatisierten Posteingang.</p>
            <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-200 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">iggorx@yahoo.com</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Aktiv</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">kontakt@herr-kuenstler.de</span>
                <button className="text-xs bg-zinc-900 text-white px-3 py-1 rounded hover:bg-zinc-800">Verbinden</button>
              </div>
            </div>
            <button className="w-full mt-2 border border-dashed border-zinc-300 text-zinc-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-50 flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> E-Mail Account hinzufügen
            </button>
          </div>
        );
      case 'passwords':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Passwort-Tresor</h3>
            <p className="text-sm text-zinc-600">Zugriff auf verschlüsselte Zugangsdaten (Mock-Ansicht).</p>
            <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-200 flex items-center justify-center h-32">
              <div className="text-center">
                <Lock className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
                <p className="text-sm text-zinc-500">Bitte Master-Passwort eingeben, um den Tresor zu entsperren.</p>
                <input type="password" placeholder="Master-Passwort" className="mt-3 px-3 py-1 text-sm border border-zinc-300 rounded" />
              </div>
            </div>
          </div>
        );
      case 'api':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">API Konfiguration</h3>
            <p className="text-sm text-zinc-600">Verwaltung der API-Schlüssel für KI und andere Dienste.</p>
            <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-200 space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">Google Gemini API Key</label>
                <input type="password" value="************************" readOnly className="w-full px-3 py-1 text-sm border border-zinc-300 rounded bg-zinc-100" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">Google Maps Platform Key</label>
                <input type="password" value="************************" readOnly className="w-full px-3 py-1 text-sm border border-zinc-300 rounded bg-zinc-100" />
              </div>
            </div>
            <button className="w-full mt-2 border border-dashed border-zinc-300 text-zinc-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-50 flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> API Key hinzufügen
            </button>
          </div>
        );
      case 'vps':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">VPS-MCP Container</h3>
            <p className="text-sm text-zinc-600">Steuerung der virtuellen Server und Container-Infrastruktur.</p>
            <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-200 space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium block">MECAN Core (Docker)</span>
                  <span className="text-xs text-zinc-500">vps-1.herr-kuenstler.internal</span>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Running</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-zinc-200">
                <div>
                  <span className="font-medium block">Database Node</span>
                  <span className="text-xs text-zinc-500">vps-2.herr-kuenstler.internal</span>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Running</span>
              </div>
            </div>
            <button className="w-full mt-2 border border-dashed border-zinc-300 text-zinc-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-50 flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> Container hinzufügen
            </button>
          </div>
        );
      case 'social':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Social Media APIs</h3>
            <p className="text-sm text-zinc-600">Verknüpfungen zu sozialen Netzwerken für automatisches Posting und Analyse.</p>
            <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-200 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Instagram Graph API</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Verbunden</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Facebook-Meta</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Verbunden</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">YouTube Data API</span>
                <button className="text-xs bg-zinc-900 text-white px-3 py-1 rounded hover:bg-zinc-800">Verbinden</button>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">X (Twitter) API</span>
                <button className="text-xs bg-zinc-900 text-white px-3 py-1 rounded hover:bg-zinc-800">Verbinden</button>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Bluesky (AT Protocol)</span>
                <button className="text-xs bg-zinc-900 text-white px-3 py-1 rounded hover:bg-zinc-800">Verbinden</button>
              </div>
            </div>
            <button className="w-full mt-2 border border-dashed border-zinc-300 text-zinc-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-50 flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> Plattform hinzufügen
            </button>
          </div>
        );
      case 'messenger':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Messenger APIs</h3>
            <p className="text-sm text-zinc-600">Verknüpfungen zu Messengern für direkte Kommunikation und Bot-Integration.</p>
            <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-200 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">WhatsApp Business API</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Verbunden</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Telegram Bot API</span>
                <button className="text-xs bg-zinc-900 text-white px-3 py-1 rounded hover:bg-zinc-800">Verbinden</button>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Viber API</span>
                <button className="text-xs bg-zinc-900 text-white px-3 py-1 rounded hover:bg-zinc-800">Verbinden</button>
              </div>
            </div>
            <button className="w-full mt-2 border border-dashed border-zinc-300 text-zinc-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-50 flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> Messenger hinzufügen
            </button>
          </div>
        );
      case 'finance':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Bank & Wallet Anbindung</h3>
            <p className="text-sm text-zinc-600">Verwaltung der finanziellen Schnittstellen für Einnahmen und Ausgaben.</p>
            <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-200 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-zinc-500" />
                  <div>
                    <span className="font-medium block">Geschäftskonto (N26 / Fidor)</span>
                    <span className="text-xs text-zinc-500">IBAN: DE89 ************ 1234</span>
                  </div>
                </div>
                <button className="text-xs bg-zinc-200 text-zinc-700 px-3 py-1 rounded hover:bg-zinc-300">Trennen</button>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-zinc-200">
                <div className="flex items-center gap-3">
                  <Wallet className="w-5 h-5 text-zinc-500" />
                  <div>
                    <span className="font-medium block">Crypto Wallet (Web3)</span>
                    <span className="text-xs text-zinc-500">0x71C...976F</span>
                  </div>
                </div>
                <button className="text-xs bg-zinc-900 text-white px-3 py-1 rounded hover:bg-zinc-800">Verbinden</button>
              </div>
            </div>
            <button className="w-full mt-2 border border-dashed border-zinc-300 text-zinc-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-50 flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> Konto/Wallet hinzufügen
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">Workingspace & Infrastruktur</h1>
        <p className="text-zinc-600">Zentrale Verwaltung für persönliche Unterlagen, Accounts, APIs und VPS-MCP Container.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Accounts & Cloud */}
        <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-zinc-500" />
              <h2 className="text-lg font-semibold text-zinc-900">Cloud & Data Lakes</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg border border-zinc-100">
              <div className="flex items-center gap-3">
                <HardDrive className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-zinc-900">Cloud Speicher & Data Lakes</p>
                  <p className="text-xs text-zinc-500">Google Drive, Dropbox, AWS S3 (Ordner/Themen Sync)</p>
                </div>
              </div>
              <button onClick={() => setActiveModal('cloud')} className="text-xs font-medium text-zinc-600 hover:text-zinc-900">Verwalten</button>
            </div>
            <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg border border-zinc-100">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-zinc-500" />
                <div>
                  <p className="text-sm font-medium text-zinc-900">E-Mail Accounts</p>
                  <p className="text-xs text-zinc-500">iggorx@yahoo.com & weitere</p>
                </div>
              </div>
              <button onClick={() => setActiveModal('email')} className="text-xs font-medium text-zinc-600 hover:text-zinc-900">Verwalten</button>
            </div>
            <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg border border-zinc-100">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-zinc-500" />
                <div>
                  <p className="text-sm font-medium text-zinc-900">Passwort-Tresor</p>
                  <p className="text-xs text-zinc-500">Verschlüsselte Zugangsdaten</p>
                </div>
              </div>
              <button onClick={() => setActiveModal('passwords')} className="text-xs font-medium text-zinc-600 hover:text-zinc-900">Öffnen</button>
            </div>
          </div>
        </div>

        {/* API & Infrastructure */}
        <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Server className="w-5 h-5 text-zinc-500" />
              <h2 className="text-lg font-semibold text-zinc-900">API & VPS-MCP Container</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg border border-zinc-100">
              <div className="flex items-center gap-3">
                <Key className="w-5 h-5 text-amber-500" />
                <div>
                  <p className="text-sm font-medium text-zinc-900">Google AI API (Freemium)</p>
                  <p className="text-xs text-zinc-500">Verbunden mit MECAN Assistenz</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Aktiv</span>
                <button onClick={() => setActiveModal('api')} className="text-xs font-medium text-zinc-600 hover:text-zinc-900"><Settings className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg border border-zinc-100">
              <div className="flex items-center gap-3">
                <Server className="w-5 h-5 text-zinc-500" />
                <div>
                  <p className="text-sm font-medium text-zinc-900">VPS-MCP Konfiguration</p>
                  <p className="text-xs text-zinc-500">Künstler-Auth & Container-Steuerung</p>
                </div>
              </div>
              <button onClick={() => setActiveModal('vps')} className="text-xs font-medium text-zinc-600 hover:text-zinc-900">Konfigurieren</button>
            </div>
            <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg border border-zinc-100">
              <div className="flex items-center gap-3">
                <Share2 className="w-5 h-5 text-zinc-500" />
                <div>
                  <p className="text-sm font-medium text-zinc-900">Social Media APIs</p>
                  <p className="text-xs text-zinc-500">Instagram, YouTube, X, Bluesky...</p>
                </div>
              </div>
              <button onClick={() => setActiveModal('social')} className="text-xs font-medium text-zinc-600 hover:text-zinc-900">Verwalten</button>
            </div>
            <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg border border-zinc-100">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-zinc-500" />
                <div>
                  <p className="text-sm font-medium text-zinc-900">Messenger APIs</p>
                  <p className="text-xs text-zinc-500">WhatsApp, Telegram, Viber...</p>
                </div>
              </div>
              <button onClick={() => setActiveModal('messenger')} className="text-xs font-medium text-zinc-600 hover:text-zinc-900">Verwalten</button>
            </div>
          </div>
        </div>

        {/* Finance & Wallets */}
        <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden lg:col-span-2">
          <div className="p-6 border-b border-zinc-200 bg-zinc-50 flex items-center gap-3">
            <Wallet className="w-5 h-5 text-zinc-500" />
            <h2 className="text-lg font-semibold text-zinc-900">Finanzen & Wallets</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg border border-zinc-100 max-w-md">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-zinc-500" />
                <div>
                  <p className="text-sm font-medium text-zinc-900">Bank & Wallet Anbindung</p>
                  <p className="text-xs text-zinc-500">Konten, Crypto, Zahlungsabwicklung</p>
                </div>
              </div>
              <button onClick={() => setActiveModal('finance')} className="text-xs font-medium text-zinc-600 hover:text-zinc-900">Verwalten</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-4 border-b border-zinc-200 flex justify-between items-center bg-zinc-50">
              <h2 className="font-bold text-zinc-900">Konfiguration</h2>
              <button onClick={() => setActiveModal(null)} className="text-zinc-500 hover:text-zinc-900">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {renderModalContent()}
            </div>
            <div className="p-4 border-t border-zinc-200 bg-zinc-50 flex justify-end">
              <button onClick={() => setActiveModal(null)} className="px-4 py-2 bg-zinc-900 text-white rounded-md text-sm font-medium hover:bg-zinc-800">
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
