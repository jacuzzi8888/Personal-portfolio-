import React from 'react';
import { Project } from '../types';
import EditIcon from './icons/EditIcon';
import TrashIcon from './icons/TrashIcon';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
  onViewCaseStudy: (projectId: number) => void;
  isAdmin: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete, onViewCaseStudy, isAdmin }) => {
  return (
    <div className="bg-[var(--card-bg-color)] rounded-xl overflow-hidden group border border-[var(--border-color)] hover:border-[var(--secondary-accent)]/50 transition-all duration-300 flex flex-col h-full shadow-md hover:shadow-xl hover:-translate-y-1">
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-3 text-[var(--secondary-text)] transition-colors">{project.name}</h3>
        <p className="text-gray-600 mb-4 text-sm flex-grow">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map(tag => (
            <span key={tag} className="bg-[var(--light-accent)]/70 text-[var(--secondary-accent)] text-xs font-semibold px-3 py-1 rounded-full border border-[var(--light-accent)]">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between">
          <button
            onClick={() => onViewCaseStudy(project.id)}
            className="text-sm font-bold text-[var(--primary-accent)] hover:underline"
          >
            View Case Study
          </button>
          {isAdmin && (
            <div className="flex items-center space-x-2">
                <button onClick={() => onEdit(project)} className="text-gray-500 hover:text-[var(--highlight-accent)] transition-colors p-2 rounded-full" aria-label="Edit project">
                    <EditIcon className="w-5 h-5" />
                </button>
                <button onClick={() => onDelete(project)} className="text-gray-500 hover:text-[var(--primary-accent)] transition-colors p-2 rounded-full" aria-label="Delete project">
                    <TrashIcon className="w-5 h-5" />
                </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
