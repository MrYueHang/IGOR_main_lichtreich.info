export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <h3 className="text-sm font-medium text-zinc-500 mb-2">Neue Anfragen</h3>
          <p className="text-3xl font-bold text-zinc-900">12</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <h3 className="text-sm font-medium text-zinc-500 mb-2">Offene Checklisten</h3>
          <p className="text-3xl font-bold text-zinc-900">5</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <h3 className="text-sm font-medium text-zinc-500 mb-2">Nächster Termin</h3>
          <p className="text-lg font-bold text-zinc-900 mt-1">Heute, 14:00 Uhr</p>
          <p className="text-sm text-zinc-500">Atelierbesuch Havanna</p>
        </div>
      </div>
    </div>
  );
}
