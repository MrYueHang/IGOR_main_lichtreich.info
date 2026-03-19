import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-[#f9f8f6]">
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
  );
}
