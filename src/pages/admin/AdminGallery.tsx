export default function AdminGallery() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900 mb-6">Gallerie-Verwaltung</h1>
      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-zinc-900">Kunstwerke</h2>
          <button className="bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-800">
            Neues Werk hochladen
          </button>
        </div>
        <p className="text-zinc-500">Hier können Bilder für die öffentliche Galerie hochgeladen und organisiert werden.</p>
      </div>
    </div>
  );
}
