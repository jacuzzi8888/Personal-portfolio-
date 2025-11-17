import React from 'react';
import { Project } from '../types';
import ProjectCard from './ProjectCard';

interface ProjectsProps {
  projects: Project[];
  onOpenSettings: () => void;
  onAddProject: () => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (project: Project) => void;
  onViewCaseStudy: (projectId: number) => void;
  isAdmin: boolean;
  isPage?: boolean;
}

const Projects: React.FC<ProjectsProps> = ({ projects, onOpenSettings, onAddProject, onEditProject, onDeleteProject, onViewCaseStudy, isAdmin, isPage = false }) => {
  const noProjectsConfigured = projects.length === 0;

  const sectionClasses = isPage
    ? "min-h-screen pt-32 pb-16 bg-[var(--bg-color)]"
    : "py-20 md:py-32 bg-[var(--bg-color)]";

  return (
    <section id="projects" className={sectionClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-text)] mb-4">
            My Work
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--secondary-accent)] to-[var(--primary-accent)] mx-auto rounded-full"></div>
        </div>

        {isAdmin && (
          <div className="text-center mb-12 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={onAddProject}
              className="bg-gradient-to-r from-[var(--secondary-accent)] to-[var(--primary-accent)] text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity transform hover:scale-105"
            >
              Add New Project
            </button>
            <button onClick={onOpenSettings} className="text-[var(--secondary-accent)] hover:underline font-semibold bg-[var(--card-bg-color)] border border-[var(--border-color)] py-3 px-6 rounded-lg">
              Or Configure From GitHub
            </button>
          </div>
        )}
        
        {noProjectsConfigured ? (
          <div className="text-center bg-[var(--card-bg-color)] border border-[var(--border-color)] p-8 rounded-xl max-w-2xl mx-auto shadow-md">
            <h3 className="text-xl font-bold text-[var(--secondary-text)] mb-3">Your Portfolio Is Empty</h3>
            <p className="text-gray-600">
              {isAdmin ? "Add a new project manually or connect your GitHub account to get started." : "This section is currently empty. Check back later for projects!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onEdit={onEditProject}
                onDelete={onDeleteProject}
                onViewCaseStudy={onViewCaseStudy}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Projects;