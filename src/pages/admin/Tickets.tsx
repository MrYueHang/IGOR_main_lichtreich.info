import { useState } from 'react';
import { CheckSquare, Clock, AlertCircle, Plus, MoreVertical, Search, Filter } from 'lucide-react';

export default function Tickets() {
  const [tickets] = useState([
    {
      id: 'TICKET-001',
      title: 'Datenbank-Infrastruktur aufsetzen',
      description: 'localStorage durch eine echte Datenbank (Supabase PostgreSQL oder Firebase Firestore) ersetzen. src/services/db.ts anpassen.',
      status: 'todo',
      priority: 'high',
      category: 'Backend',
      assignee: 'Nächste Instanz'
    },
    {
      id: 'TICKET-002',
      title: 'Authentifizierung & Rollen (RBAC)',
      description: 'Login-System implementieren. Rollen definieren: Artist (Igor), Gallerist, Admin (Eltern/Verwalter).',
      status: 'todo',
      priority: 'high',
      category: 'Security',
      assignee: 'Nächste Instanz'
    },
    {
      id: 'TICKET-003',
      title: 'Social Media OAuth2',
      description: 'Echte OAuth-Flows für Instagram Graph API, Facebook, X und YouTube einbauen, um das automatische Posting via MECAN zu aktivieren.',
      status: 'in-progress',
      priority: 'medium',
      category: 'API',
      assignee: 'Nächste Instanz'
    },
    {
      id: 'TICKET-004',
      title: 'Dynamisches KI-Packaging auf Landingpage',
      description: 'Die Funktion "KI-Auto Packaging" auf der Startseite so erweitern, dass sie echte Nutzerdaten (Analytics) nutzt.',
      status: 'todo',
      priority: 'low',
      category: 'Frontend',
      assignee: 'Nächste Instanz'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'done': return <CheckSquare className="w-5 h-5 text-green-500" />;
      case 'in-progress': return <Clock className="w-5 h-5 text-amber-500" />;
      default: return <AlertCircle className="w-5 h-5 text-zinc-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-amber-100 text-amber-700';
      case 'low': return 'bg-blue-100 text-blue-700';
      default: return 'bg-zinc-100 text-zinc-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">Ticket-System & Backlog</h1>
          <p className="text-zinc-600">Übergabepunkt und Aufgabenverwaltung für die "Nächste Instanz" (Entwickler/Admins).</p>
        </div>
        <button className="bg-zinc-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Neues Ticket
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm flex gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Tickets durchsuchen..." 
            className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
          />
        </div>
        <button className="px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-100 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-600">
              <tr>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Ticket</th>
                <th className="px-6 py-4 font-medium">Kategorie</th>
                <th className="px-6 py-4 font-medium">Priorität</th>
                <th className="px-6 py-4 font-medium">Zugewiesen an</th>
                <th className="px-6 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4">
                    {getStatusIcon(ticket.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-zinc-900 mb-1">{ticket.title}</div>
                    <div className="text-zinc-500 text-xs line-clamp-1">{ticket.description}</div>
                    <div className="text-zinc-400 text-xs mt-1">{ticket.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800">
                      {ticket.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-600">
                    {ticket.assignee}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-zinc-400 hover:text-zinc-900">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
