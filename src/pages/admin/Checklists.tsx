import { useState, FormEvent } from 'react';
import { Check, Plus, Trash2 } from 'lucide-react';

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export default function Checklists() {
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: '1', text: 'Pressemitteilung Havanna Ausstellung vorbereiten', completed: false },
    { id: '2', text: 'Neue Werke für Blue Book Pictures fotografieren', completed: true },
    { id: '3', text: 'Alumni-Netzwerk Newsletter versenden', completed: false },
  ]);
  const [newItemText, setNewItemText] = useState('');

  const toggleItem = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const addItem = (e: FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    setItems([...items, { id: Date.now().toString(), text: newItemText, completed: false }]);
    setNewItemText('');
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900 mb-6">Checklisten & Übersichten</h1>
      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 max-w-3xl">
        <form onSubmit={addItem} className="flex gap-4 mb-8">
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="Neue Aufgabe hinzufügen..."
            className="flex-1 rounded-md border-zinc-300 shadow-sm focus:border-zinc-500 focus:ring-zinc-500 sm:text-sm border p-2"
          />
          <button type="submit" className="bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Hinzufügen
          </button>
        </form>

        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg border border-zinc-100">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleItem(item.id)}
                  className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                    item.completed ? 'bg-zinc-900 border-zinc-900 text-white' : 'border-zinc-300 bg-white'
                  }`}
                >
                  {item.completed && <Check className="w-3 h-3" />}
                </button>
                <span className={`text-sm ${item.completed ? 'text-zinc-400 line-through' : 'text-zinc-700'}`}>
                  {item.text}
                </span>
              </div>
              <button
                onClick={() => deleteItem(item.id)}
                className="text-zinc-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
