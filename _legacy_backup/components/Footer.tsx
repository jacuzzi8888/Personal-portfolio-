import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--primary-text)] border-t border-gray-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Omotoye Odewole. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;