import { Link, Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function PublicLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans text-[#1a1a1a] selection:bg-[#1a1a1a] selection:text-white flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#f9f8f6]/80 backdrop-blur-md border-b border-zinc-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-black tracking-tighter uppercase font-display">
                Igor Grgurevic
                <span className="block text-xs font-medium text-zinc-500 tracking-widest uppercase mt-0.5">
                  Künstler & Therapeut
                </span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/vision" className="text-sm font-semibold tracking-wide uppercase text-zinc-600 hover:text-[#1a1a1a] transition-colors">Vision</Link>
              <Link to="/gallery" className="text-sm font-semibold tracking-wide uppercase text-zinc-600 hover:text-[#1a1a1a] transition-colors">Galerie</Link>
              <Link to="/projects" className="text-sm font-semibold tracking-wide uppercase text-zinc-600 hover:text-[#1a1a1a] transition-colors">Projekte</Link>
              <Link to="/prices" className="text-sm font-semibold tracking-wide uppercase text-zinc-600 hover:text-[#1a1a1a] transition-colors">Preise</Link>
              <Link to="/admin" className="text-sm font-semibold tracking-wide uppercase text-zinc-600 hover:text-[#1a1a1a] transition-colors">Login</Link>
            </nav>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-zinc-500 hover:text-[#1a1a1a] focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-[#f9f8f6] border-b border-zinc-200">
            <div className="px-4 pt-2 pb-4 space-y-1">
              <Link to="/vision" className="block px-3 py-3 rounded-md text-base font-semibold uppercase tracking-wide text-zinc-700 hover:text-[#1a1a1a] hover:bg-zinc-100">Vision</Link>
              <Link to="/gallery" className="block px-3 py-3 rounded-md text-base font-semibold uppercase tracking-wide text-zinc-700 hover:text-[#1a1a1a] hover:bg-zinc-100">Galerie</Link>
              <Link to="/projects" className="block px-3 py-3 rounded-md text-base font-semibold uppercase tracking-wide text-zinc-700 hover:text-[#1a1a1a] hover:bg-zinc-100">Projekte</Link>
              <Link to="/prices" className="block px-3 py-3 rounded-md text-base font-semibold uppercase tracking-wide text-zinc-700 hover:text-[#1a1a1a] hover:bg-zinc-100">Preise</Link>
              <Link to="/admin" className="block px-3 py-3 rounded-md text-base font-semibold uppercase tracking-wide text-zinc-700 hover:text-[#1a1a1a] hover:bg-zinc-100">Login</Link>
            </div>
          </div>
        )}
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-zinc-200/50 mt-auto">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-zinc-500 font-medium">
            &copy; {new Date().getFullYear()} Igor Grgurevic. Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>
    </div>
  );
}
