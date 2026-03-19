import { useState } from 'react';
import { Search, Filter, Plus, User, Mail, Phone, Calendar, FileText, ChevronRight, X } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'Aktiv' | 'Interessent' | 'Inaktiv';
  interest: string;
  notes: string;
  history: { date: string; type: string; description: string }[];
  projects: string[];
}

const initialCustomers: Customer[] = [
  {
    id: '1',
    name: 'Anna Schmidt',
    email: 'anna@example.com',
    phone: '+49 123 456789',
    status: 'Aktiv',
    interest: 'Hotel Hospital Serie',
    notes: 'Sehr interessiert an großformatigen Werken. Hat bereits zwei Bilder aus der ersten Serie gekauft.',
    history: [
      { date: '2026-02-15', type: 'Email', description: 'Anfrage zu neuen Werken der Hotel Hospital Serie.' },
      { date: '2026-03-01', type: 'Meeting', description: 'Atelierbesuch in Bad Saarow.' }
    ],
    projects: ['Tage der Münchener Akademie']
  },
  {
    id: '2',
    name: 'Dr. Thomas Weber',
    email: 't.weber@klinik-beispiel.de',
    phone: '+49 987 654321',
    status: 'Interessent',
    interest: 'Kunstheiltherapeutisches Coaching',
    notes: 'Sucht nach Möglichkeiten für Team-Building durch Kunsttherapie.',
    history: [
      { date: '2026-03-10', type: 'Telefonat', description: 'Erstes Beratungsgespräch über Tagessätze.' }
    ],
    projects: []
  }
];

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Alle');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.interest.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Alle' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">Kundenverwaltung</h1>
          <p className="text-zinc-600">Detaillierte Profile, Kontakthistorie und Projektzuweisungen.</p>
        </div>
        <button className="bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Neuer Kunde
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Customer List */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col h-[600px]">
          <div className="p-4 border-b border-zinc-200 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input 
                type="text" 
                placeholder="Suchen..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-md border border-zinc-300 text-sm focus:border-zinc-500 focus:ring-zinc-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-zinc-400" />
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex-1 rounded-md border border-zinc-300 px-3 py-1.5 text-sm focus:border-zinc-500 focus:ring-zinc-500"
              >
                <option value="Alle">Alle Status</option>
                <option value="Aktiv">Aktiv</option>
                <option value="Interessent">Interessent</option>
                <option value="Inaktiv">Inaktiv</option>
              </select>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <ul className="divide-y divide-zinc-100">
              {filteredCustomers.map(customer => (
                <li 
                  key={customer.id}
                  onClick={() => setSelectedCustomer(customer)}
                  className={`p-4 cursor-pointer hover:bg-zinc-50 transition-colors ${selectedCustomer?.id === customer.id ? 'bg-zinc-50 border-l-2 border-zinc-900' : ''}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-zinc-900">{customer.name}</h3>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full 
                      ${customer.status === 'Aktiv' ? 'bg-green-100 text-green-800' : 
                        customer.status === 'Interessent' ? 'bg-blue-100 text-blue-800' : 
                        'bg-zinc-100 text-zinc-800'}`}
                    >
                      {customer.status}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 truncate">{customer.interest}</p>
                </li>
              ))}
              {filteredCustomers.length === 0 && (
                <li className="p-8 text-center text-zinc-500 text-sm">Keine Kunden gefunden.</li>
              )}
            </ul>
          </div>
        </div>

        {/* Customer Details */}
        <div className="lg:col-span-2">
          {selectedCustomer ? (
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden h-[600px] flex flex-col">
              <div className="p-6 border-b border-zinc-200 flex justify-between items-start bg-zinc-50">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-zinc-200 rounded-full flex items-center justify-center text-zinc-500">
                    <User className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900">{selectedCustomer.name}</h2>
                    <div className="flex items-center gap-4 mt-2 text-sm text-zinc-600">
                      <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> {selectedCustomer.email}</span>
                      <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> {selectedCustomer.phone}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelectedCustomer(null)} className="text-zinc-400 hover:text-zinc-600 lg:hidden">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Notes & Interests */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900 mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-zinc-500" /> Notizen
                    </h3>
                    <div className="bg-zinc-50 rounded-lg p-4 text-sm text-zinc-700">
                      {selectedCustomer.notes}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900 mb-3">Interessen & Projekte</h3>
                    <div className="space-y-3">
                      <div className="bg-zinc-50 rounded-lg p-3 text-sm">
                        <span className="text-zinc-500 block text-xs mb-1">Hauptinteresse:</span>
                        <span className="font-medium text-zinc-900">{selectedCustomer.interest}</span>
                      </div>
                      {selectedCustomer.projects.length > 0 && (
                        <div className="bg-zinc-50 rounded-lg p-3 text-sm">
                          <span className="text-zinc-500 block text-xs mb-1">Zugeordnete Projekte:</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {selectedCustomer.projects.map(p => (
                              <span key={p} className="bg-white border border-zinc-200 px-2 py-1 rounded-md text-xs font-medium text-zinc-700">
                                {p}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact History */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-zinc-500" /> Kontakthistorie
                    </h3>
                    <button className="text-xs font-medium text-zinc-600 hover:text-zinc-900">Eintrag hinzufügen</button>
                  </div>
                  <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-200 before:to-transparent">
                    {selectedCustomer.history.map((entry, i) => (
                      <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-zinc-100 text-zinc-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                          {entry.type === 'Email' ? <Mail className="w-4 h-4" /> : 
                           entry.type === 'Telefonat' ? <Phone className="w-4 h-4" /> : 
                           <User className="w-4 h-4" />}
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-zinc-900 text-sm">{entry.type}</span>
                            <span className="text-xs font-medium text-zinc-500">{entry.date}</span>
                          </div>
                          <p className="text-sm text-zinc-600">{entry.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm h-[600px] flex flex-col items-center justify-center text-zinc-500">
              <User className="w-12 h-12 mb-4 text-zinc-300" />
              <p>Wählen Sie einen Kunden aus, um Details zu sehen.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
