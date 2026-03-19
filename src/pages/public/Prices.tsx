import { motion } from 'motion/react';

const pricing = [
  {
    category: 'Hotel Hospital',
    range: 'bis 3.800 €',
    description: 'Auseinandersetzung mit klinischer Sterilität und dem „Drama des Patienten“.',
  },
  {
    category: 'Face to Face',
    range: '3.800 € – 5.900 €',
    description: 'Transkulturelle Fragilität; Untersuchung von Täter-Opfer-Rollen und dem „Chaos des Krieges“.',
  },
  {
    category: 'Blue Book Pictures',
    range: '900 € – 7.500 €',
    description: 'Apokalyptische Sehnsucht; existenzielle Stürme und das „Hole of Fame“.',
  },
  {
    category: 'Mi Havanna',
    range: '900 € – 5.000 €',
    description: 'Kubanische Lichtmetaphysik; Leben am Malecon und die Fenster von Havanna-Vieja.',
  },
  {
    category: 'Unabhängige Studien',
    range: 'ab 900 €',
    description: 'Kleinformatige Metamorphosen und explorative Skizzen des Alltags.',
  },
];

const services = [
  {
    category: 'Kunstheiltherapeutisches Coaching',
    range: 'Tagessatz auf Anfrage',
    description: 'Individuelle Begleitung und therapeutische Intervention durch künstlerische Prozesse.',
  },
  {
    category: 'Auftragsmalerei',
    range: 'Individuell',
    description: 'Maßgeschneiderte Werke nach persönlicher Absprache und Vision.',
  },
  {
    category: 'Projektberatung',
    range: 'Tagessatz auf Anfrage',
    description: 'Strategische Beratung für Kunstprojekte, Ausstellungen und kreative Infrastrukturen.',
  },
  {
    category: 'Live Drawing & Community',
    range: 'Abo / Spende',
    description: 'Interaktive Sessions via Twitch und exklusive Einblicke auf Patreon.',
  },
];

export default function Prices() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto text-center mb-24"
      >
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-[#1a1a1a] mb-8 uppercase font-display">Preise & Services</h1>
        <p className="handwritten text-3xl text-zinc-600">Kuratierte Werkzyklen und individuelle Dienstleistungen.</p>
      </motion.div>

      <div className="mb-24 max-w-5xl mx-auto">
        <h2 className="text-4xl font-black tracking-tighter text-[#1a1a1a] mb-8 uppercase font-display text-center">Werkzyklen <span className="handwritten text-3xl text-zinc-500 lowercase normal-case">(Herr Künstler)</span></h2>
        <div className="polaroid bg-[#f4f4f5] overflow-hidden">
          <table className="min-w-full divide-y divide-zinc-300">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-sm font-bold uppercase tracking-widest text-zinc-500">Serie</th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-bold uppercase tracking-widest text-zinc-500">Zentrale Symbolik</th>
                <th scope="col" className="px-6 py-4 text-right text-sm font-bold uppercase tracking-widest text-zinc-500">Preisspanne</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {pricing.map((item, index) => (
                <motion.tr 
                  key={item.category}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-zinc-100 transition-colors"
                >
                  <td className="whitespace-nowrap px-6 py-6 text-lg font-bold text-[#1a1a1a] font-display uppercase tracking-wide">{item.category}</td>
                  <td className="px-6 py-6 text-base text-zinc-700 leading-relaxed">{item.description}</td>
                  <td className="whitespace-nowrap px-6 py-6 text-right text-xl font-bold text-[#1a1a1a] handwritten">{item.range}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-black tracking-tighter text-[#1a1a1a] mb-8 uppercase font-display text-center">Services & Beratung <span className="handwritten text-3xl text-zinc-500 lowercase normal-case">(Herr Ingenieur)</span></h2>
        <div className="polaroid-alt bg-[#f4f4f5] overflow-hidden">
          <table className="min-w-full divide-y divide-zinc-300">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-sm font-bold uppercase tracking-widest text-zinc-500">Service</th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-bold uppercase tracking-widest text-zinc-500">Beschreibung</th>
                <th scope="col" className="px-6 py-4 text-right text-sm font-bold uppercase tracking-widest text-zinc-500">Konditionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {services.map((item, index) => (
                <motion.tr 
                  key={item.category}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-zinc-100 transition-colors"
                >
                  <td className="whitespace-nowrap px-6 py-6 text-lg font-bold text-[#1a1a1a] font-display uppercase tracking-wide">{item.category}</td>
                  <td className="px-6 py-6 text-base text-zinc-700 leading-relaxed">{item.description}</td>
                  <td className="whitespace-nowrap px-6 py-6 text-right text-xl font-bold text-[#1a1a1a] handwritten">{item.range}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-24 text-center">
        <p className="handwritten text-3xl text-zinc-600 mb-8">Für kuratorische Anfragen, Coaching, Auftragsarbeiten oder Projektberatung:</p>
        <a 
          href="mailto:iggorx@yahoo.com" 
          className="inline-flex items-center justify-center rounded-full bg-[#1a1a1a] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-lg hover:bg-zinc-800 transition-all"
        >
          Kontakt aufnehmen
        </a>
      </div>
    </div>
  );
}
