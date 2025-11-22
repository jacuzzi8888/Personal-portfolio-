import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-[var(--secondary-accent)] to-[var(--primary-accent)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 text-white drop-shadow-md">
          Hi, I'm Omotoye Odewole
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-4 max-w-2xl mx-auto drop-shadow-sm">
          A Full-Stack Developer passionate about building modern, responsive, and scalable web applications.
        </p>
         <p className="text-md md:text-lg text-white/90 mb-10 max-w-3xl mx-auto drop-shadow-sm">
          I transform complex problems into elegant digital solutions, focusing on clean code and exceptional user experiences.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#projects" 
            className="w-full sm:w-auto inline-block bg-[var(--highlight-accent)] text-[var(--primary-text)] font-bold py-3 px-8 rounded-lg hover:bg-[var(--secondary-accent)] hover:text-white transition-all transform hover:scale-105 shadow-lg"
          >
            View My Work
          </a>
          <a 
            href="#contact" 
            className="w-full sm:w-auto inline-block bg-transparent text-white font-bold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors border-2 border-white"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;