import { Database, Server, Code, Table, Layers } from 'lucide-react';

export default function AdminDatabases() {
  const schemas = [
    {
      name: 'Projects (Projekte & Ausstellungen)',
      table: 'projects',
      fields: [
        { name: 'id', type: 'UUID', desc: 'Primary Key' },
        { name: 'title', type: 'VARCHAR(255)', desc: 'Projektname' },
        { name: 'description', type: 'TEXT', desc: 'Beschreibung / Strategie' },
        { name: 'year', type: 'VARCHAR(4)', desc: 'Jahr der Umsetzung' },
        { name: 'location', type: 'VARCHAR(100)', desc: 'Ort (z.B. Havanna, Zenica)' },
        { name: 'status', type: 'ENUM', desc: 'In Planung, Aktiv, Abgeschlossen' },
        { name: 'created_at', type: 'TIMESTAMP', desc: 'Erstellungsdatum' }
      ]
    },
    {
      name: 'Checklists (Aufgaben)',
      table: 'project_checklists',
      fields: [
        { name: 'id', type: 'UUID', desc: 'Primary Key' },
        { name: 'project_id', type: 'UUID', desc: 'Foreign Key -> projects.id' },
        { name: 'text', type: 'TEXT', desc: 'Aufgabenbeschreibung' },
        { name: 'completed', type: 'BOOLEAN', desc: 'Erledigt-Status' }
      ]
    },
    {
      name: 'Social Media Posts',
      table: 'social_posts',
      fields: [
        { name: 'id', type: 'UUID', desc: 'Primary Key' },
        { name: 'platform', type: 'ENUM', desc: 'instagram, facebook, linkedin' },
        { name: 'content', type: 'TEXT', desc: 'Post-Text inkl. KI-Strategie' },
        { name: 'scheduled_date', type: 'DATE', desc: 'Geplantes Datum' },
        { name: 'scheduled_time', type: 'TIME', desc: 'Geplante Uhrzeit' },
        { name: 'status', type: 'ENUM', desc: 'draft, scheduled, published' }
      ]
    },
    {
      name: 'Content Drafts (Texte & Audio)',
      table: 'content_drafts',
      fields: [
        { name: 'id', type: 'UUID', desc: 'Primary Key' },
        { name: 'type', type: 'ENUM', desc: 'text, audio' },
        { name: 'title', type: 'VARCHAR(255)', desc: 'Titel oder Etappe' },
        { name: 'content', type: 'TEXT', desc: 'Generierter Inhalt' },
        { name: 'created_at', type: 'TIMESTAMP', desc: 'Erstellungsdatum' }
      ]
    }
  ];

  const apiEndpoints = [
    { method: 'GET', path: '/api/projects', desc: 'Alle Projekte abrufen' },
    { method: 'POST', path: '/api/projects', desc: 'Neues Projekt anlegen (Push to Action)' },
    { method: 'PUT', path: '/api/projects/:id/status', desc: 'Projektstatus aktualisieren' },
    { method: 'POST', path: '/api/social/schedule', desc: 'Social Media Post terminieren' },
    { method: 'POST', path: '/api/ai/generate', desc: 'KI-Content generieren (Text/Audio/Strategie)' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 mb-2 flex items-center gap-2">
          <Database className="w-6 h-6" />
          Muster-Ingenieur: Database & Backends
        </h1>
        <p className="text-zinc-600">
          Blaupausen und Architekturentwürfe für die Datenbanken und Backend-APIs. 
          Diese Struktur dient als Grundlage für die zukünftige Skalierung (z.B. mit Supabase, Firebase oder eigenem Node.js Backend).
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Database Schemas */}
        <div className="xl:col-span-2 space-y-6">
          <h2 className="text-lg font-semibold text-zinc-900 flex items-center gap-2">
            <Table className="w-5 h-5 text-zinc-500" />
            Datenbank-Schemata (Relational)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schemas.map((schema, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
                  <h3 className="font-semibold text-zinc-900">{schema.name}</h3>
                  <span className="text-xs font-mono text-zinc-500 bg-zinc-200/50 px-2 py-1 rounded">{schema.table}</span>
                </div>
                <div className="p-0">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-zinc-50/50 text-zinc-500 text-xs uppercase">
                      <tr>
                        <th className="px-4 py-2 font-medium">Feld</th>
                        <th className="px-4 py-2 font-medium">Typ</th>
                        <th className="px-4 py-2 font-medium">Beschreibung</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {schema.fields.map((field, fIdx) => (
                        <tr key={fIdx} className="hover:bg-zinc-50/50">
                          <td className="px-4 py-2 font-mono text-zinc-900">{field.name}</td>
                          <td className="px-4 py-2 font-mono text-xs text-indigo-600">{field.type}</td>
                          <td className="px-4 py-2 text-zinc-500">{field.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Backend Architecture & API */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-zinc-900 flex items-center gap-2">
            <Server className="w-5 h-5 text-zinc-500" />
            Backend API Entwurf
          </h2>

          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-zinc-200 bg-zinc-50">
              <h3 className="font-semibold text-zinc-900">RESTful Endpoints</h3>
            </div>
            <div className="divide-y divide-zinc-100">
              {apiEndpoints.map((ep, idx) => (
                <div key={idx} className="p-4 hover:bg-zinc-50">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                      ep.method === 'GET' ? 'bg-blue-100 text-blue-700' :
                      ep.method === 'POST' ? 'bg-green-100 text-green-700' :
                      ep.method === 'PUT' ? 'bg-amber-100 text-amber-700' :
                      'bg-zinc-100 text-zinc-700'
                    }`}>
                      {ep.method}
                    </span>
                    <span className="font-mono text-sm text-zinc-900">{ep.path}</span>
                  </div>
                  <p className="text-sm text-zinc-500">{ep.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-sm p-6 text-zinc-300">
            <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
              <Layers className="w-5 h-5 text-zinc-400" />
              Architektur-Notizen
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <span className="text-indigo-400">•</span>
                <span><strong>Frontend:</strong> React (Vite), TailwindCSS, Framer Motion.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-400">•</span>
                <span><strong>Backend (Ziel):</strong> Node.js / Express oder Serverless Functions (Vercel/Cloudflare).</span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-400">•</span>
                <span><strong>Datenbank (Ziel):</strong> PostgreSQL (Supabase) für relationale Daten, Redis für Caching.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-400">•</span>
                <span><strong>KI-Integration:</strong> Google Gemini API via Backend-Proxy zur Absicherung des API-Keys.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
