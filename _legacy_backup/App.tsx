

import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SettingsModal from './components/SettingsModal';
import ProjectFormModal from './components/ProjectFormModal';
import ConfirmationDialog from './components/ConfirmationDialog';
import AnimatedSection from './components/AnimatedSection';
import CaseStudyPage from './components/CaseStudyPage';
import { Project, GithubRepo } from './types';
import { PROJECTS } from './constants';
import { fetchUserRepos } from './services/githubService';

const formatRepoToProject = (repo: GithubRepo): Project => ({
  id: repo.id,
  name: repo.name,
  description: repo.description || 'No description provided for this project.',
  tags: [repo.language, ...repo.topics].filter(Boolean) as string[],
  githubUrl: repo.html_url,
  liveUrl: repo.homepage || undefined,
  caseStudy: { // Add default placeholder case study data for GitHub imports
    problem: "This project was imported from GitHub. Detailed case study content can be added by editing the project.",
    role: "Developer",
    process: "The process for this project is not yet documented. Please edit the project to add details.",
    outcome: "The outcome for this project is not yet documented. Please edit the project to add details.",
    imageUrl: `https://placehold.co/1200x600/00796B/FFFFFF/png?text=${repo.name}`,
  },
});

type View =
  | { page: 'home' }
  | { page: 'projects' }
  | { page: 'caseStudy'; projectId: number };

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [view, setView] = useState<View>({ page: 'home' });
  const [isAdmin, setIsAdmin] = useState(true); // Always true for testing

  const initializeProjects = useCallback(async () => {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
      return;
    }

    const username = localStorage.getItem('githubUsername');
    const selectedRepoIdsStr = localStorage.getItem('selectedRepoIds');

    if (username && selectedRepoIdsStr) {
      const selectedRepoIds = JSON.parse(selectedRepoIdsStr) as number[];
      if (selectedRepoIds.length > 0) {
        setIsLoading(true);
        setLoadingMessage('Fetching projects from GitHub...');
        try {
          const allRepos = await fetchUserRepos(username);
          const selectedRepos = allRepos.filter(repo => selectedRepoIds.includes(repo.id));
          const githubProjects = selectedRepos.map(formatRepoToProject);
          setProjects(githubProjects);
          localStorage.setItem('projects', JSON.stringify(githubProjects));
        } catch (error) {
          console.error('Failed to load projects from GitHub:', error);
          setProjects(PROJECTS);
          localStorage.setItem('projects', JSON.stringify(PROJECTS));
        } finally {
          setIsLoading(false);
        }
      } else {
        setProjects([]);
        localStorage.setItem('projects', JSON.stringify([]));
      }
    } else {
      setProjects(PROJECTS);
      localStorage.setItem('projects', JSON.stringify(PROJECTS));
    }
  }, []);
  
  useEffect(() => {
    initializeProjects();
  }, [initializeProjects]);

  const handleOpenProjectForm = (project?: Project) => {
    setEditingProject(project || null);
    setIsProjectFormOpen(true);
  };
  
  const handleSaveProject = (savedProject: Omit<Project, 'id'> & { id?: number }) => {
    let updatedProjects;
    if (savedProject.id) { // Editing existing project
      updatedProjects = projects.map(p => p.id === savedProject.id ? { ...p, ...savedProject } : p);
    } else { // Adding new project
      const newProject: Project = {
        ...savedProject,
        id: Date.now(),
        // Ensure caseStudy object is fully formed
        caseStudy: savedProject.caseStudy || {
          problem: "Case study not generated.",
          role: "N/A",
          process: "N/A",
          outcome: "N/A",
          imageUrl: `https://placehold.co/1200x600/EBE2BB/2c3e50/png?text=${savedProject.name}`,
        },
      };
      updatedProjects = [...projects, newProject];
    }
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    setIsProjectFormOpen(false);
    setEditingProject(null);
  };

  const handleDeleteProject = (project: Project) => {
    setDeletingProject(project);
  };
  
  const handleConfirmDelete = () => {
    if (!deletingProject) return;
    const updatedProjects = projects.filter(p => p.id !== deletingProject.id);
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    setDeletingProject(null);
  };

  const handleNavigation = (targetPage: 'home' | 'projects', sectionId?: string) => {
    if (view.page === 'home' && targetPage === 'home' && sectionId) {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        return;
    }
    setView({ page: targetPage });
    if (targetPage === 'home' && sectionId) {
        setTimeout(() => {
            document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
    } else {
        window.scrollTo(0, 0);
    }
  };

  const handleViewCaseStudy = (projectId: number) => {
    setView({ page: 'caseStudy', projectId });
    window.scrollTo(0, 0);
  };

  const handleBackFromCaseStudy = () => {
    setView({ page: 'projects' });
  };
  
  if (view.page === 'caseStudy') {
    const project = projects.find(p => p.id === view.projectId);
    if (!project) {
        // Fallback in case project is not found
        return (
            <div className="bg-[var(--bg-color)] text-[var(--primary-text)] font-sans">
                <Header onNavigate={handleNavigation} />
                <main className='min-h-screen container mx-auto px-4 py-20 text-center'>
                    <h1 className='text-2xl font-bold'>Project not found.</h1>
                    <button onClick={handleBackFromCaseStudy} className='mt-4 text-[var(--primary-accent)] hover:underline'>Return to projects</button>
                </main>
                <Footer />
            </div>
        )
    }
    return (
        <div className="bg-[var(--bg-color)] text-[var(--primary-text)] font-sans">
            <Header onNavigate={handleNavigation} />
            <CaseStudyPage project={project} onBack={handleBackFromCaseStudy} />
            <Footer />
        </div>
    );
  }

  return (
    <div className="bg-[var(--bg-color)] text-[var(--primary-text)] font-sans">
      {isLoading && (
        <div className="loader-overlay" aria-live="polite" role="status">
            <div className="loader-content">
                <div className="loader-spinner"></div>
                <p>{loadingMessage}</p>
            </div>
        </div>
      )}

      <Header onNavigate={handleNavigation} />
      
      {view.page === 'home' && <Hero />}
      
      <main className="relative z-10">
        {view.page === 'home' ? (
          <>
            <AnimatedSection><About /></AnimatedSection>
            <AnimatedSection>
              <Projects 
                projects={projects}
                onOpenSettings={() => setIsSettingsModalOpen(true)}
                onAddProject={() => handleOpenProjectForm()}
                onEditProject={handleOpenProjectForm}
                onDeleteProject={handleDeleteProject}
                onViewCaseStudy={handleViewCaseStudy}
                isAdmin={isAdmin}
              />
            </AnimatedSection>
            <AnimatedSection><Contact /></AnimatedSection>
          </>
        ) : (
           <Projects 
              projects={projects}
              onOpenSettings={() => setIsSettingsModalOpen(true)}
              onAddProject={() => handleOpenProjectForm()}
              onEditProject={handleOpenProjectForm}
              onDeleteProject={handleDeleteProject}
              onViewCaseStudy={handleViewCaseStudy}
              isPage={true}
              isAdmin={isAdmin}
            />
        )}
      </main>
      <Footer />
      
      <SettingsModal 
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        onSave={initializeProjects}
      />
      <ProjectFormModal
        isOpen={isProjectFormOpen}
        onClose={() => setIsProjectFormOpen(false)}
        onSave={handleSaveProject}
        projectToEdit={editingProject}
      />
      <ConfirmationDialog
        isOpen={!!deletingProject}
        onClose={() => setDeletingProject(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Project"
        message={`Are you sure you want to delete "${deletingProject?.name}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default App;