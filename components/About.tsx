import React from 'react';

const skills = [
  'JavaScript (ES6+)', 'TypeScript', 'React', 'Node.js', 'Python',
  'Express', 'PostgreSQL', 'Docker', 'Tailwind CSS', 'Git & GitHub', 'Next.js', 'GraphQL'
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-[var(--card-bg-color)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--secondary-text)] mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--secondary-accent)] to-[var(--primary-accent)] mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-2">
            <div className="w-64 h-64 lg:w-80 lg:h-80 mx-auto bg-gray-200 rounded-full flex items-center justify-center border-4 border-[var(--highlight-accent)] shadow-lg">
                <span className="text-gray-500">Your Photo Here</span>
            </div>
          </div>
          <div className="md:col-span-3">
            <p className="text-lg text-[var(--primary-text)] mb-6 leading-relaxed">
              Hello! I'm a passionate full-stack developer with a knack for creating efficient, user-friendly, and scalable web applications. With a strong foundation in both front-end and back-end technologies, I enjoy bringing ideas to life, from the database schema all the way to the pixel-perfect UI.
            </p>
            <p className="text-lg text-[var(--primary-text)] leading-relaxed mb-8">
              My goal is to write clean, maintainable, and well-documented code. I'm a lifelong learner, always excited to explore new technologies and improve my skill set to deliver robust and high-quality software solutions.
            </p>
             <h3 className="text-2xl font-bold text-[var(--primary-text)] mb-6">Core Technologies</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map(skill => (
                <span key={skill} className="bg-[var(--light-accent)]/50 border border-[var(--light-accent)] text-[var(--secondary-accent)] text-sm font-medium px-4 py-2 rounded-full shadow-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;