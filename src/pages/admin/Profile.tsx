export default function Profile() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900 mb-6">Profil & Zugangsdaten</h1>
      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 max-w-2xl">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700">Name</label>
            <input type="text" defaultValue="Igor Grgurević" className="mt-1 block w-full rounded-md border-zinc-300 shadow-sm focus:border-zinc-500 focus:ring-zinc-500 sm:text-sm border p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700">Email</label>
            <input type="email" defaultValue="iggorx@yahoo.com" className="mt-1 block w-full rounded-md border-zinc-300 shadow-sm focus:border-zinc-500 focus:ring-zinc-500 sm:text-sm border p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700">Passwort ändern</label>
            <input type="password" placeholder="Neues Passwort" className="mt-1 block w-full rounded-md border-zinc-300 shadow-sm focus:border-zinc-500 focus:ring-zinc-500 sm:text-sm border p-2" />
          </div>
          <button type="button" className="bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-800">
            Speichern
          </button>
        </form>
      </div>
    </div>
  );
}
