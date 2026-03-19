import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, MapPin } from 'lucide-react';

interface Artwork {
  id: string;
  title: string;
  year: string;
  series: string;
  description: string;
  imageUrl: string;
  locationName: string;
  locationType: 'Galerie' | 'Netzwerk' | 'Atelier' | 'Fundus' | 'Uni' | 'Event' | 'Kunde';
  coordinates: { lat: number; lng: number };
}

const initialArtworks: Artwork[] = [
  {
    id: '1',
    title: 'Hotel Hospital #1',
    year: '2007',
    series: 'Hotel Hospital',
    description: 'Auseinandersetzung mit klinischer Sterilität.',
    imageUrl: 'https://picsum.photos/seed/hospital/800/600',
    locationName: 'Atelier Bad Saarow',
    locationType: 'Atelier',
    coordinates: { lat: 52.2933, lng: 14.0622 }
  },
  {
    id: '2',
    title: 'Face to Face #3',
    year: '2010',
    series: 'Face to Face',
    description: 'Transkulturelle Fragilität.',
    imageUrl: 'https://picsum.photos/seed/face/800/600',
    locationName: 'Galerie Berlin Mitte',
    locationType: 'Galerie',
    coordinates: { lat: 52.5200, lng: 13.4050 }
  },
  {
    id: '3',
    title: 'Blue Book Pictures #7',
    year: '2015',
    series: 'Blue Book Pictures',
    description: 'Apokalyptische Sehnsucht.',
    imageUrl: 'https://picsum.photos/seed/blue/800/600',
    locationName: 'Fundus Zenica',
    locationType: 'Fundus',
    coordinates: { lat: 44.2017, lng: 17.9040 }
  },
  {
    id: '4',
    title: 'Mi Havanna #1',
    year: '2013',
    series: 'Mi Havanna',
    description: 'Kubanische Lichtmetaphysik.',
    imageUrl: 'https://picsum.photos/seed/havanna/800/600',
    locationName: 'Ausstellung Havanna',
    locationType: 'Event',
    coordinates: { lat: 23.1136, lng: -82.3666 }
  }
];

export default function AdminGallery() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentArtwork, setCurrentArtwork] = useState<Partial<Artwork>>({});

  useEffect(() => {
    const stored = localStorage.getItem('igor_gallery_locations');
    if (stored) {
      setArtworks(JSON.parse(stored));
    } else {
      setArtworks(initialArtworks);
      localStorage.setItem('igor_gallery_locations', JSON.stringify(initialArtworks));
    }
  }, []);

  const saveArtworks = (newArtworks: Artwork[]) => {
    setArtworks(newArtworks);
    localStorage.setItem('igor_gallery_locations', JSON.stringify(newArtworks));
  };

  const handleSave = () => {
    if (!currentArtwork.title || !currentArtwork.imageUrl) return;

    let newArtworks;
    if (currentArtwork.id) {
      newArtworks = artworks.map(a => a.id === currentArtwork.id ? currentArtwork as Artwork : a);
    } else {
      newArtworks = [...artworks, { ...currentArtwork, id: Date.now().toString() } as Artwork];
    }
    
    saveArtworks(newArtworks);
    setIsEditing(false);
    setCurrentArtwork({});
  };

  const handleDelete = (id: string) => {
    if (confirm('Wirklich löschen?')) {
      saveArtworks(artworks.filter(a => a.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-zinc-900">Gallerie-Verwaltung</h1>
        <button 
          onClick={() => {
            setCurrentArtwork({
              locationType: 'Atelier',
              coordinates: { lat: 52.52, lng: 13.40 } // Default Berlin
            });
            setIsEditing(true);
          }}
          className="bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Neues Werk
        </button>
      </div>

      {isEditing ? (
        <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 mb-8">
          <h2 className="text-lg font-bold text-zinc-900 mb-4">
            {currentArtwork.id ? 'Werk bearbeiten' : 'Neues Werk anlegen'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Titel</label>
                <input 
                  type="text" 
                  value={currentArtwork.title || ''} 
                  onChange={e => setCurrentArtwork({...currentArtwork, title: e.target.value})}
                  className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Jahr</label>
                  <input 
                    type="text" 
                    value={currentArtwork.year || ''} 
                    onChange={e => setCurrentArtwork({...currentArtwork, year: e.target.value})}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Serie</label>
                  <input 
                    type="text" 
                    value={currentArtwork.series || ''} 
                    onChange={e => setCurrentArtwork({...currentArtwork, series: e.target.value})}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Bild-URL</label>
                <input 
                  type="text" 
                  value={currentArtwork.imageUrl || ''} 
                  onChange={e => setCurrentArtwork({...currentArtwork, imageUrl: e.target.value})}
                  className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Beschreibung</label>
                <textarea 
                  value={currentArtwork.description || ''} 
                  onChange={e => setCurrentArtwork({...currentArtwork, description: e.target.value})}
                  className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
                  rows={3}
                />
              </div>
            </div>

            <div className="space-y-4 bg-zinc-50 p-4 rounded-lg border border-zinc-200">
              <h3 className="font-semibold text-zinc-900 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Standort-Daten
              </h3>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Standort Name (z.B. Galerie Mitte)</label>
                <input 
                  type="text" 
                  value={currentArtwork.locationName || ''} 
                  onChange={e => setCurrentArtwork({...currentArtwork, locationName: e.target.value})}
                  className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Standort Typ</label>
                <select 
                  value={currentArtwork.locationType || 'Atelier'} 
                  onChange={e => setCurrentArtwork({...currentArtwork, locationType: e.target.value as any})}
                  className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
                >
                  <option value="Galerie">Galerie</option>
                  <option value="Netzwerk">Netzwerk</option>
                  <option value="Atelier">Atelier</option>
                  <option value="Fundus">Fundus</option>
                  <option value="Uni">Uni</option>
                  <option value="Event">Event / Ausstellung</option>
                  <option value="Kunde">Kunde / Privat</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Breitengrad (Lat)</label>
                  <input 
                    type="number" 
                    step="any"
                    value={currentArtwork.coordinates?.lat || ''} 
                    onChange={e => setCurrentArtwork({
                      ...currentArtwork, 
                      coordinates: { ...currentArtwork.coordinates!, lat: parseFloat(e.target.value) }
                    })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Längengrad (Lng)</label>
                  <input 
                    type="number" 
                    step="any"
                    value={currentArtwork.coordinates?.lng || ''} 
                    onChange={e => setCurrentArtwork({
                      ...currentArtwork, 
                      coordinates: { ...currentArtwork.coordinates!, lng: parseFloat(e.target.value) }
                    })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button 
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-zinc-600 hover:bg-zinc-100 rounded-md font-medium transition-colors"
            >
              Abbrechen
            </button>
            <button 
              onClick={handleSave}
              className="px-4 py-2 bg-zinc-900 text-white rounded-md font-medium hover:bg-zinc-800 transition-colors"
            >
              Speichern
            </button>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map(artwork => (
          <div key={artwork.id} className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col">
            <div className="aspect-video bg-zinc-100 relative">
              <img src={artwork.imageUrl} alt={artwork.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute top-2 right-2 flex gap-2">
                <button 
                  onClick={() => { setCurrentArtwork(artwork); setIsEditing(true); }}
                  className="p-1.5 bg-white/90 backdrop-blur-sm text-zinc-700 rounded-md hover:bg-white hover:text-zinc-900 transition-colors shadow-sm"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(artwork.id)}
                  className="p-1.5 bg-white/90 backdrop-blur-sm text-red-600 rounded-md hover:bg-white hover:text-red-700 transition-colors shadow-sm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-bold text-zinc-900 mb-1">{artwork.title}</h3>
              <p className="text-sm text-zinc-500 mb-4">{artwork.year} • {artwork.series}</p>
              
              <div className="mt-auto pt-4 border-t border-zinc-100">
                <div className="flex items-center gap-2 text-sm text-zinc-600">
                  <MapPin className="w-4 h-4 text-zinc-400" />
                  <span className="truncate">{artwork.locationName}</span>
                </div>
                <div className="mt-2 inline-block px-2 py-1 bg-zinc-100 text-zinc-600 text-xs font-medium rounded-md">
                  {artwork.locationType}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
