import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter } from 'lucide-react';

const artworks = [
  {
    title: 'Hotel Hospital',
    year: '2007–2013',
    series: 'Hotel Hospital',
    description: 'Auseinandersetzung mit klinischer Sterilität und dem Drama des Patienten.',
    image: 'https://picsum.photos/seed/hospital/800/600',
  },
  {
    title: 'Face to Face',
    year: '2007–2013',
    series: 'Face to Face',
    description: 'Transkulturelle Fragilität; Untersuchung von Täter-Opfer-Rollen.',
    image: 'https://picsum.photos/seed/face/800/600',
  },
  {
    title: 'Blue Book Pictures',
    year: '2013–2017',
    series: 'Blue Book Pictures',
    description: 'Apokalyptische Sehnsucht; existenzielle Stürme.',
    image: 'https://picsum.photos/seed/blue/800/600',
  },
  {
    title: 'Mi Havanna',
    year: '2013',
    series: 'Mi Havanna',
    description: 'Kubanische Lichtmetaphysik; Leben am Malecon.',
    image: 'https://picsum.photos/seed/havanna/800/600',
  },
];

export default function Gallery() {
  const [selectedSeries, setSelectedSeries] = useState<string>('Alle');
  const [selectedYear, setSelectedYear] = useState<string>('Alle');

  const seriesOptions = useMemo(() => ['Alle', ...Array.from(new Set(artworks.map(a => a.series)))], []);
  const yearOptions = useMemo(() => ['Alle', ...Array.from(new Set(artworks.map(a => a.year)))], []);

  const filteredArtworks = useMemo(() => {
    return artworks.filter(art => {
      const matchSeries = selectedSeries === 'Alle' || art.series === selectedSeries;
      const matchYear = selectedYear === 'Alle' || art.year === selectedYear;
      return matchSeries && matchYear;
    });
  }, [selectedSeries, selectedYear]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto text-center mb-20"
      >
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-[#1a1a1a] mb-8 uppercase font-display">Galerie</h1>
        <p className="handwritten text-3xl text-zinc-600">Dimensionen der Realität. Eine Brücke von dystopischer Sterilität bis hin zu transkultureller Vitalität.</p>
      </motion.div>

      {/* Filters */}
      <div className="mb-16 flex flex-col sm:flex-row items-center justify-center gap-6">
        <div className="flex items-center gap-2 text-zinc-500 font-medium text-sm mr-4 uppercase tracking-widest">
          <Filter className="w-4 h-4" />
          Filter
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="series-filter" className="text-sm font-medium text-zinc-700 sr-only">Serie</label>
          <select 
            id="series-filter"
            value={selectedSeries}
            onChange={(e) => setSelectedSeries(e.target.value)}
            className="bg-transparent border-b-2 border-zinc-300 px-2 py-1 text-sm font-semibold uppercase tracking-wide text-[#1a1a1a] focus:border-[#1a1a1a] focus:ring-0 outline-none transition-colors cursor-pointer"
          >
            <option value="Alle">Alle Serien</option>
            {seriesOptions.filter(s => s !== 'Alle').map(series => (
              <option key={series} value={series}>{series}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="year-filter" className="text-sm font-medium text-zinc-700 sr-only">Jahr</label>
          <select 
            id="year-filter"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-transparent border-b-2 border-zinc-300 px-2 py-1 text-sm font-semibold uppercase tracking-wide text-[#1a1a1a] focus:border-[#1a1a1a] focus:ring-0 outline-none transition-colors cursor-pointer"
          >
            <option value="Alle">Alle Jahre</option>
            {yearOptions.filter(y => y !== 'Alle').map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-16">
        <AnimatePresence mode="popLayout">
          {filteredArtworks.map((art, index) => (
            <motion.div 
              layout
              key={art.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="group"
            >
              <div className={index % 2 === 0 ? 'polaroid' : 'polaroid-alt'}>
                <div className="aspect-[4/3] overflow-hidden bg-zinc-100 mb-6">
                  <img 
                    src={art.image} 
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="px-2">
                  <h3 className="text-3xl font-black text-[#1a1a1a] mb-2 font-display uppercase tracking-tight">{art.title}</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="handwritten text-xl text-zinc-500">{art.year}</span>
                    <span className="inline-flex items-center border border-zinc-300 px-2 py-0.5 text-xs font-bold uppercase tracking-widest text-zinc-600">
                      {art.series}
                    </span>
                  </div>
                  <p className="text-zinc-700 leading-relaxed">{art.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {filteredArtworks.length === 0 && (
        <div className="text-center py-24 text-zinc-500 handwritten text-2xl">
          Keine Kunstwerke gefunden, die den ausgewählten Filtern entsprechen.
        </div>
      )}
    </div>
  );
}
