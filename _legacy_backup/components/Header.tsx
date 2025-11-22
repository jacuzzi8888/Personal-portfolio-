import React from 'react';

interface HeaderProps {
  onNavigate: (view: 'home' | 'projects', sectionId?: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--card-bg-color)]/80 backdrop-blur-sm border-b border-[var(--border-color)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onNavigate('home'); }} 
              className="text-2xl font-bold text-[var(--primary-accent)] hover:opacity-90 transition-opacity"
            >
              Omotoye Odewole
            </a>
          </div>
          <nav className="hidden md:flex md:space-x-10">
            <a href="#about" onClick={(e) => { e.preventDefault(); onNavigate('home', 'about'); }} className="text-[var(--primary-text)] hover:text-[var(--secondary-accent)] transition-colors text-sm font-medium">About</a>
            <a href="#projects" onClick={(e) => { e.preventDefault(); onNavigate('projects'); }} className="text-[var(--primary-text)] hover:text-[var(--secondary-accent)] transition-colors text-sm font-medium">Projects</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); onNavigate('home', 'contact'); }} className="text-[var(--primary-text)] hover:text-[var(--secondary-accent)] transition-colors text-sm font-medium">Contact</a>
          </nav>
          <div className="flex items-center">
             <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); onNavigate('home', 'contact'); }}
              className="hidden md:inline-block bg-[var(--secondary-accent)] text-white font-semibold py-2 px-5 rounded-lg hover:bg-[var(--primary-accent)] transition-all transform hover:scale-105"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;