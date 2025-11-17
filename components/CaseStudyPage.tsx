import React from 'react';
import { Project } from '../types';
import GithubIcon from './icons/GithubIcon';
import ExternalLinkIcon from './icons/ExternalLinkIcon';
import ArrowLeftIcon from './icons/ArrowLeftIcon';

interface CaseStudyPageProps {
  project: Project;
  onBack: () => void;
}

const CaseStudyPage: React.FC<CaseStudyPageProps> = ({ project, onBack }) => {
  return (
    <div className="bg-[var(--bg-color)] min-h-screen animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[var(--secondary-text)] hover:text-[var(--primary-accent)] font-semibold mb-8 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Projects
        </button>

        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--primary-accent)] mb-4">{project.name}</h1>
          <p className="text-lg text-gray-600 max-w-3xl">{project.description}</p>
          <div className="flex flex-wrap gap-3 mt-6">
            {project.tags.map(tag => (
              <span key={tag} className="bg-[var(--light-accent)]/70 text-[var(--secondary-accent)] text-sm font-semibold px-4 py-2 rounded-full border border-[var(--light-accent)]">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="mb-12">
          <img src={project.caseStudy.imageUrl} alt={`${project.name} hero image`} className="w-full h-auto rounded-lg shadow-xl object-cover border border-[var(--border-color)]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <CaseStudySection title="The Problem" content={project.caseStudy.problem} />
            <CaseStudySection title="My Role" content={project.caseStudy.role} />
            <CaseStudySection title="The Process" content={project.caseStudy.process} />
            <CaseStudySection title="The Outcome" content={project.caseStudy.outcome} />
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-28 bg-[var(--card-bg-color)] p-6 rounded-lg border border-[var(--border-color)] shadow-md">
              <h3 className="text-xl font-bold text-[var(--secondary-text)] mb-6">Project Links</h3>
              <div className="space-y-4">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[var(--primary-text)] hover:text-[var(--primary-accent)] transition-colors font-medium">
                  <GithubIcon className="w-6 h-6" />
                  <span>View on GitHub</span>
                </a>
                {project.liveUrl && project.liveUrl !== '#' && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[var(--primary-text)] hover:text-[var(--primary-accent)] transition-colors font-medium">
                    <ExternalLinkIcon className="w-6 h-6" />
                    <span>View Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>

      </div>
    </div>
  );
};

const CaseStudySection: React.FC<{ title: string; content: string }> = ({ title, content }) => (
  <section>
    <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary-text)] mb-4 border-l-4 border-[var(--primary-accent)] pl-4">{title}</h2>
    <p className="text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-line">{content}</p>
  </section>
);

export default CaseStudyPage;
