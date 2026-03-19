import { motion } from 'motion/react';

export default function Vision() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-[#1a1a1a] mb-12 uppercase font-display text-center">
          Vision
        </h1>
        
        <div className="prose prose-lg max-w-none text-[#1a1a1a]">
          <div className="text-center mb-16">
            <p className="handwritten text-3xl md:text-4xl text-zinc-600 leading-relaxed max-w-3xl mx-auto">
              „Mein Schaffen begreife ich als archaische Kontinuität im Antlitz der Spätmoderne – eine Metamorphose des Sakralen im Profanen.“
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div className="polaroid">
              <img 
                src="https://picsum.photos/seed/artstudio/800/1000" 
                alt="Studio" 
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
              <p className="handwritten text-center mt-4 text-xl">Atelier, 2023</p>
            </div>
            <div>
              <p className="mb-6 text-lg leading-relaxed">
                Die Kunst ist für mich kein isoliertes Artefakt, sondern das notwendige soziale Band, das die Fragmente einer zersplitterten Welt zusammenhält. In der Ästhetik des Magischen Realismus untersuche ich die organische Spannung zwischen Evolution und Verfall, Leben und Tod.
              </p>
              <p className="text-lg leading-relaxed">
                Als Brückenbauer zwischen den Welten bewahrt meine Arbeit den Eigensinn der Kritik, während sie gleichzeitig Räume für Heilung und transkulturelle Resonanz öffnet.
              </p>
            </div>
          </div>

          <h2 className="text-4xl font-black tracking-tighter text-center mt-24 mb-16 uppercase font-display">
            Herr Künstler <span className="text-zinc-400 mx-4">☯️</span> Herr Ingenieur
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="polaroid-alt bg-[#f4f4f5]">
              <h3 className="text-2xl font-bold mb-4 font-display uppercase tracking-wide">Die mystifologische Kraft</h3>
              <p className="text-zinc-700 leading-relaxed">Bannung des spätmodernen Chaos. Ein freier Geist, der durch magischen Realismus und universelle Sequenzen die Grenzen der Konzeptkunst überschreitet.</p>
              <div className="mt-6 handwritten text-2xl text-zinc-500">Herr Künstler</div>
            </div>
            <div className="polaroid bg-[#f4f4f5]">
              <h3 className="text-2xl font-bold mb-4 font-display uppercase tracking-wide">Die transformative Ordnung</h3>
              <p className="text-zinc-700 leading-relaxed">Strukturierte, empathische Praxis. Die präzise Anwendung von ganzheitlichen Methoden, um individuelle und gesellschaftliche Heilungsprozesse zu katalysieren.</p>
              <div className="mt-6 handwritten text-2xl text-zinc-500">Herr Ingenieur</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
