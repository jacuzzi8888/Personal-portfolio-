import React from 'react';
import GithubIcon from './icons/GithubIcon';
import LinkedinIcon from './icons/LinkedinIcon';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 md:py-32 bg-[var(--card-bg-color)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--secondary-text)] mb-4">
          Get In Touch
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[var(--secondary-accent)] to-[var(--primary-accent)] mx-auto rounded-full mb-8"></div>
        <p className="text-lg text-[var(--primary-text)] max-w-2xl mx-auto mb-8">
          I'm currently open to new opportunities and collaborations. Whether you have a question or just want to say hi, my inbox is always open. Let's build something great together!
        </p>
        <a 
          href="mailto:omotoyeodewole@gmail.com"
          className="inline-block bg-gradient-to-r from-[var(--secondary-accent)] to-[var(--primary-accent)] text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity transform hover:scale-105 mb-12 shadow-lg"
        >
          Say Hello
        </a>
        <div className="flex justify-center space-x-8">
          <a href="https://github.com/omotoye-odewole" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[var(--primary-accent)] transition-colors">
            <GithubIcon className="w-8 h-8" />
          </a>
          <a href="https://linkedin.com/in/omotoye-odewole" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[var(--primary-accent)] transition-colors">
            <LinkedinIcon className="w-8 h-8" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;