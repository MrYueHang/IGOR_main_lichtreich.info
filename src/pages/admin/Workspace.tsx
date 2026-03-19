import { Key, HardDrive, Cloud, Lock, Server, FileText } from 'lucide-react';

export default function Workspace() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">Workingspace & Infrastruktur</h1>
        <p className="text-zinc-600">Zentrale Verwaltung für persönliche Unterlagen, Accounts, APIs und VPS-MCP Container.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Accounts & Cloud */}
        <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-zinc-200 bg-zinc-50 flex items-center gap-3">
            <Cloud className="w-5 h-5 text-zinc-500" />
            <h2 className="text-lg font-semibold text-zinc-900">Cloud & Accounts</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg border border-zinc-100">
              <div className="flex items-center gap-3">
                <HardDrive className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-zinc-900">Google Drive & Dropbox</p>
                  <p className="text-xs text-zinc-500">Zentrale Dateiablage für Digitalisate</p>
                </div>
              </div>
              <button className="text-xs font-medium text-zinc-600 hover:text-zinc-900">Verwalten</button>
            </div>
            <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg border border-zinc-100">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-zinc-500" />
                <div>
                  <p className="text-sm font-medium text-zinc-900">E-Mail Accounts</p>
                  <p className="text-xs text-zinc-500">iggorx@yahoo.com & weitere</p>
                </div>
              </div>
              <button className="text-xs font-medium text-zinc-600 hover:text-zinc-900">Verwalten</button>
            </div>
            <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg border border-zinc-100">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-zinc-500" />
                <div>
                  <p className="text-sm font-medium text-zinc-900">Passwort-Tresor</p>
                  <p className="text-xs text-zinc-500">Verschlüsselte Zugangsdaten</p>
                </div>
              </div>
              <button className="text-xs font-medium text-zinc-600 hover:text-zinc-900">Öffnen</button>
            </div>
          </div>
        </div>

        {/* API & Infrastructure */}
        <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-zinc-200 bg-zinc-50 flex items-center gap-3">
            <Server className="w-5 h-5 text-zinc-500" />
            <h2 className="text-lg font-semibold text-zinc-900">API & VPS-MCP Container</h2>
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
              <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Aktiv</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg border border-zinc-100">
              <div className="flex items-center gap-3">
                <Server className="w-5 h-5 text-zinc-500" />
                <div>
                  <p className="text-sm font-medium text-zinc-900">VPS-MCP Konfiguration</p>
                  <p className="text-xs text-zinc-500">Künstler-Auth & Container-Steuerung</p>
                </div>
              </div>
              <button className="text-xs font-medium text-zinc-600 hover:text-zinc-900">Konfigurieren</button>
            </div>
            <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg border border-zinc-100">
              <div className="flex items-center gap-3">
                <Cloud className="w-5 h-5 text-zinc-500" />
                <div>
                  <p className="text-sm font-medium text-zinc-900">Social Media APIs</p>
                  <p className="text-xs text-zinc-500">Instagram, Facebook Graph API</p>
                </div>
              </div>
              <button className="text-xs font-medium text-zinc-600 hover:text-zinc-900">Verwalten</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
