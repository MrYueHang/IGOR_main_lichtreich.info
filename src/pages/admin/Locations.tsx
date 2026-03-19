import { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { MapPin, Image as ImageIcon } from 'lucide-react';

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

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

// Mock data for artworks with locations
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
    coordinates: { lat: 52.2933, lng: 14.0622 } // Bad Saarow
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
    coordinates: { lat: 52.5200, lng: 13.4050 } // Berlin
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
    coordinates: { lat: 44.2017, lng: 17.9040 } // Zenica
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
    coordinates: { lat: 23.1136, lng: -82.3666 } // Havanna
  },
  {
    id: '5',
    title: 'Tage der Münchener Akademie',
    year: '2025',
    series: 'Projekte',
    description: 'Ausstellungsprojekt.',
    imageUrl: 'https://picsum.photos/seed/munich/800/600',
    locationName: 'Münchener Akademie',
    locationType: 'Uni',
    coordinates: { lat: 48.1508, lng: 11.5802 } // München
  }
];

const getLocationColor = (type: Artwork['locationType']) => {
  switch (type) {
    case 'Galerie': return '#ec4899'; // pink
    case 'Atelier': return '#3b82f6'; // blue
    case 'Fundus': return '#64748b'; // slate
    case 'Uni': return '#eab308'; // yellow
    case 'Event': return '#f97316'; // orange
    case 'Netzwerk': return '#8b5cf6'; // violet
    case 'Kunde': return '#10b981'; // emerald
    default: return '#000000';
  }
};

function MarkerWithInfoWindow({ artwork }: { artwork: Artwork; key?: string | number }) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [open, setOpen] = useState(false);

  return (
    <>
      <AdvancedMarker ref={markerRef} position={artwork.coordinates} onClick={() => setOpen(true)}>
        <Pin background={getLocationColor(artwork.locationType)} glyphColor="#fff" borderColor={getLocationColor(artwork.locationType)} />
      </AdvancedMarker>
      {open && (
        <InfoWindow anchor={marker} onCloseClick={() => setOpen(false)}>
          <div className="max-w-[200px] p-1 font-sans">
            <div className="aspect-video bg-zinc-100 rounded-md overflow-hidden mb-2">
              <img src={artwork.imageUrl} alt={artwork.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <h3 className="font-bold text-sm text-zinc-900 leading-tight mb-1">{artwork.title}</h3>
            <p className="text-xs text-zinc-500 mb-2">{artwork.year} • {artwork.series}</p>
            <div className="flex items-center gap-1 text-xs font-medium text-zinc-700 bg-zinc-100 px-2 py-1 rounded-md">
              <MapPin className="w-3 h-3" />
              {artwork.locationName} ({artwork.locationType})
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

export default function Locations() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('igor_gallery_locations');
    if (stored) {
      setArtworks(JSON.parse(stored));
    } else {
      setArtworks(initialArtworks);
      localStorage.setItem('igor_gallery_locations', JSON.stringify(initialArtworks));
    }
  }, []);

  if (!hasValidKey) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] bg-white rounded-xl border border-zinc-200 shadow-sm p-8 text-center">
        <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
          <MapPin className="w-8 h-8 text-zinc-400" />
        </div>
        <h2 className="text-xl font-bold text-zinc-900 mb-2">Google Maps API Key erforderlich</h2>
        <p className="text-zinc-600 max-w-md mb-6">
          Um die geografische Übersicht der Kunstwerke zu sehen, wird ein Google Maps API Key benötigt.
        </p>
        <div className="text-left bg-zinc-50 p-4 rounded-lg border border-zinc-200 w-full max-w-lg text-sm">
          <p className="font-medium text-zinc-900 mb-2">So fügst du den Key hinzu:</p>
          <ol className="list-decimal list-inside space-y-2 text-zinc-600">
            <li>Öffne die <strong>Settings</strong> (⚙️ Icon oben rechts)</li>
            <li>Wähle <strong>Secrets</strong></li>
            <li>Füge <code>GOOGLE_MAPS_PLATFORM_KEY</code> als Namen hinzu</li>
            <li>Füge deinen API Key als Wert ein und drücke Enter</li>
          </ol>
        </div>
      </div>
    );
  }

  // Group artworks by coordinates to handle overlapping markers
  // In a real app, we'd use MarkerClustering, but for simplicity we'll just render them.
  // The user can click overlapping pins if they zoom in, or we can offset them slightly.

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">Kunst-Standorte</h1>
        <p className="text-zinc-600">Geografische Übersicht aller Werke in Galerien, Ateliers, Fundus und bei Kunden.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden h-[700px]">
          <APIProvider apiKey={API_KEY} version="weekly">
            <Map
              defaultCenter={{ lat: 48.0, lng: 14.0 }} // Center over Europe
              defaultZoom={4}
              mapId="ARTWORK_LOCATIONS_MAP"
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              style={{ width: '100%', height: '100%' }}
            >
              {artworks.map(artwork => (
                <MarkerWithInfoWindow key={artwork.id} artwork={artwork} />
              ))}
            </Map>
          </APIProvider>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-zinc-900 mb-4">Legende</h2>
            <div className="space-y-3">
              {(['Galerie', 'Atelier', 'Fundus', 'Uni', 'Event', 'Netzwerk', 'Kunde'] as const).map(type => (
                <div key={type} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getLocationColor(type) }} />
                    <span className="text-sm font-medium text-zinc-700">{type}</span>
                  </div>
                  <span className="text-xs text-zinc-500 font-mono">
                    {artworks.filter(a => a.locationType === type).length}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col h-[400px]">
            <div className="p-4 border-b border-zinc-200 bg-zinc-50">
              <h2 className="text-sm font-bold text-zinc-900">Aktuelle Standorte</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {artworks.map(artwork => (
                <div key={artwork.id} className="flex gap-3 items-start">
                  <div className="w-12 h-12 bg-zinc-100 rounded-md overflow-hidden shrink-0">
                    <img src={artwork.imageUrl} alt={artwork.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-zinc-900 line-clamp-1">{artwork.title}</h3>
                    <p className="text-[10px] text-zinc-500">{artwork.locationName}</p>
                    <span 
                      className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-bold text-white"
                      style={{ backgroundColor: getLocationColor(artwork.locationType) }}
                    >
                      {artwork.locationType}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
