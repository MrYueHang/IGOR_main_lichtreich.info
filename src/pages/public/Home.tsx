import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Bot } from 'lucide-react';
import { useState, useEffect } from 'react';
import { initialProjects } from '../../data/projects';

// Mock data for initial artworks if none exist in localStorage
const initialArtworks = [
  {
    id: '1',
    title: 'Metamorphose I',
    year: '2023',
    medium: 'Öl auf Leinwand',
    dimensions: '120 x 100 cm',
    status: 'Verfügbar',
    price: '4.500 €',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1000&auto=format&fit=crop',
    location: 'Atelier Berlin'
  },
  {
    id: '2',
    title: 'Struktur & Chaos',
    year: '2024',
    medium: 'Acryl und Strukturpaste',
    dimensions: '150 x 150 cm',
    status: 'Reserviert',
    price: '6.200 €',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000&auto=format&fit=crop',
    location: 'Galerie XYZ'
  },
  {
    id: '3',
    title: 'Blaue Periode - Studie',
    year: '2022',
    medium: 'Aquarell auf Papier',
    dimensions: '50 x 70 cm',
    status: 'Verkauft',
    price: '1.200 €',
    imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c026f43?q=80&w=1000&auto=format&fit=crop',
    location: 'Privatsammlung'
  }
];

export default function Home() {
  const [artworks, setArtworks] = useState(initialArtworks);
  const [projects, setProjects] = useState(initialProjects);
  const [isAiPackaging, setIsAiPackaging] = useState(false);

  useEffect(() => {
    const savedArtworks = localStorage.getItem('igor_artworks');
    if (savedArtworks) {
      setArtworks(JSON.parse(savedArtworks));
    }
    const savedProjects = localStorage.getItem('igor_projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  const handleAiPackaging = () => {
    setIsAiPackaging(true);
    // Simulate AI packaging process
    setTimeout(() => {
      setIsAiPackaging(false);
      alert("MECAN hat die Präsentation basierend auf aktuellen Trends und deinem Portfolio neu arrangiert.");
    }, 2000);
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#f9f8f6]">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col lg:flex-row items-center w-full z-10">
          
          {/* Left Content */}
          <div className="w-full lg:w-1/2 pt-24 pb-12 lg:py-32 pr-0 lg:pr-12">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-black tracking-tighter text-[#1a1a1a] mb-4 uppercase"
            >
              Igor Grgurevic
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-3xl text-[#1a1a1a] font-medium mb-12"
            >
              <span className="handwritten text-4xl mr-2">HerrKünstler</span> – Dimensionen<br/>der Wirklichkeit.
            </motion.h2>

            <motion.ul 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4 text-xl text-zinc-600 handwritten"
            >
              <li>- Bildender Künstler (M.F.A.)</li>
              <li>- Kunsttherapeut & Heiler</li>
              <li>- Kosmopolit</li>
            </motion.ul>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 flex items-center gap-x-6"
            >
              <Link
                to="/vision"
                className="rounded-full bg-[#1a1a1a] px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-zinc-800 transition-all flex items-center gap-2"
              >
                Vision entdecken <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/gallery" className="text-sm font-semibold leading-6 text-[#1a1a1a] hover:underline underline-offset-4">
                Zur Galerie <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </div>

          {/* Right Image with Torn Edge */}
          <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen absolute right-0 bottom-0 lg:top-0">
            {/* Torn Edge SVG overlay */}
            <div className="absolute left-0 top-0 bottom-0 w-12 z-20 hidden lg:block" style={{ transform: 'translateX(-50%)' }}>
               <svg preserveAspectRatio="none" viewBox="0 0 50 100" className="h-full w-full fill-[#f9f8f6]" style={{ filter: 'drop-shadow(5px 0 5px rgba(0,0,0,0.2))' }}>
                  <path d="M50,0 L0,0 Q10,5 5,10 T10,20 T0,30 T15,40 T5,50 T10,60 T0,70 T15,80 T5,90 T10,100 L50,100 Z" />
               </svg>
            </div>
            <div className="absolute top-0 left-0 right-0 h-12 z-20 block lg:hidden" style={{ transform: 'translateY(-50%)' }}>
               <svg preserveAspectRatio="none" viewBox="0 0 100 50" className="w-full h-full fill-[#f9f8f6]" style={{ filter: 'drop-shadow(0 5px 5px rgba(0,0,0,0.2))' }}>
                  <path d="M0,0 L0,50 Q5,40 10,45 T20,40 T30,50 T40,35 T50,45 T60,40 T70,50 T80,35 T90,45 T100,40 L100,0 Z" />
               </svg>
            </div>
            
            <img 
              src="https://picsum.photos/seed/face/1200/1600" 
              alt="Igor Grgurevic Artwork" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* Dynamic Database Images Section */}
      <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto w-full z-10 bg-white rounded-t-3xl shadow-xl mt-[-5vh]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">Aktuelle Arbeiten</h2>
            <p className="text-zinc-600 max-w-2xl">Einblick in das aktuelle Schaffen, direkt aus der Datenbank.</p>
          </div>
          <button 
            onClick={handleAiPackaging}
            disabled={isAiPackaging}
            className="flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-amber-200 transition-colors disabled:opacity-50"
          >
            {isAiPackaging ? (
              <Sparkles className="w-4 h-4 animate-spin" />
            ) : (
              <Bot className="w-4 h-4" />
            )}
            {isAiPackaging ? 'MECAN arrangiert...' : 'KI-Auto Packaging'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.slice(0, 6).map((artwork, index) => (
            <div 
              key={artwork.id} 
              className={`group relative overflow-hidden rounded-xl bg-white shadow-sm border border-zinc-100 transition-all duration-500 ${
                isAiPackaging ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={artwork.imageUrl} 
                  alt={artwork.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-zinc-900 mb-1">{artwork.title}</h3>
                <p className="text-sm text-zinc-500 mb-4">{artwork.year} • {artwork.medium}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium px-2 py-1 bg-zinc-100 text-zinc-600 rounded">
                    {artwork.status}
                  </span>
                  <Link to="/gallery" className="text-zinc-400 hover:text-zinc-900 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto w-full z-10">
        <h2 className="text-3xl font-bold text-zinc-900 mb-12 text-center">Projekte & Ausstellungen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.slice(0, 4).map(project => (
            <div key={project.id} className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-zinc-900">{project.title}</h3>
                <span className="text-sm font-medium text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full">
                  {project.year}
                </span>
              </div>
              <p className="text-zinc-600 mb-6">{project.location}</p>
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${
                  project.status === 'Aktiv' ? 'text-green-600' : 
                  project.status === 'In Planung' ? 'text-amber-600' : 'text-zinc-500'
                }`}>
                  {project.status}
                </span>
                <Link to="/projects" className="text-sm font-medium text-zinc-900 hover:underline flex items-center gap-1">
                  Details <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
