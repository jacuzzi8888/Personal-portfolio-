
import React, { useState, useEffect } from 'react';
import { Project, FetchedProjectInfo } from '../types';
import { getProjectInfoFromUrl } from '../services/geminiService';
import CloseIcon from './icons/CloseIcon';

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Omit<Project, 'id'> & { id?: number }) => void;
  projectToEdit?: Project | null;
}

const getInitialProjectState = (): Omit<Project, 'id'> => ({
  name: '',
  description: '',
  tags: [],
  githubUrl: '',
  liveUrl: '',
  caseStudy: {
    problem: '',
    role: '',
    process: '',
    outcome: '',
    imageUrl: '',
  },
});

const ProjectFormModal: React.FC<ProjectFormModalProps> = ({ isOpen, onClose, onSave, projectToEdit }) => {
  const [project, setProject] = useState<Omit<Project, 'id'>>(getInitialProjectState());
  const [tagsInput, setTagsInput] = useState('');
  const [fetchUrl, setFetchUrl] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    if (isOpen) {
        if (projectToEdit) {
            setProject(projectToEdit);
            setTagsInput(projectToEdit.tags.join(', '));
        } else {
            setProject(getInitialProjectState());
            setTagsInput('');
        }
        setFetchUrl('');
        setFetchError('');
        setIsFetching(false);
    }
  }, [isOpen, projectToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProject(prev => ({ ...prev, [name]: value }));
  };

  const handleCaseStudyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProject(prev => ({
      ...prev,
      caseStudy: {
        ...prev.caseStudy,
        [name]: value,
      }
    }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value);
    setProject(prev => ({ ...prev, tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...project, id: projectToEdit?.id });
  };
  
  const handleFetchDetails = async () => {
      if (!fetchUrl) return;
      setIsFetching(true);
      setFetchError('');
      try {
        const details: FetchedProjectInfo = await getProjectInfoFromUrl(fetchUrl);
        setProject(prev => ({
            ...prev,
            name: details.name || prev.name,
            description: details.description || prev.description,
            tags: details.tags || prev.tags,
            caseStudy: details.caseStudy || prev.caseStudy,
            githubUrl: fetchUrl.includes('github.com') ? fetchUrl : prev.githubUrl,
            liveUrl: !fetchUrl.includes('github.com') ? fetchUrl : prev.liveUrl,
        }));
        setTagsInput(details.tags.join(', '));
      } catch (error) {
          setFetchError('Failed to fetch details from URL. Please try again.');
          console.error(error);
      } finally {
          setIsFetching(false);
      }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-[var(--card-bg-color)] rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col border border-gray-300"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex justify-between items-center p-4 border-b border-[var(--border-color)] flex-shrink-0">
          <h2 className="text-xl font-bold text-[var(--primary-text)]">
            {projectToEdit ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black transition-colors">
            <CloseIcon />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto">
          <main className="p-6">
            <div className="p-4 border border-dashed border-gray-300 rounded-lg mb-6 bg-gray-50/50">
                <label className="block text-sm font-medium text-gray-700 mb-2">Generate with AI from URL</label>
                <div className="flex gap-3">
                    <input
                        type="url"
                        value={fetchUrl}
                        onChange={(e) => setFetchUrl(e.target.value)}
                        placeholder="Paste a GitHub repo or live demo link..."
                        className="flex-grow bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-[var(--secondary-accent)] focus:border-[var(--secondary-accent)]"
                    />
                    <button type="button" onClick={handleFetchDetails} disabled={isFetching} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors">
                        {isFetching ? 'Fetching...' : 'Fetch & Generate'}
                    </button>
                </div>
                {fetchError && <p className="text-red-600 text-sm mt-2">{fetchError}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                <input type="text" name="name" id="name" value={project.name} onChange={handleChange} required className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-[var(--secondary-accent)] focus:border-[var(--secondary-accent)]" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" id="description" value={project.description} onChange={handleChange} rows={3} required className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-[var(--secondary-accent)] focus:border-[var(--secondary-accent)]"></textarea>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
                <input type="text" name="tags" id="tags" value={tagsInput} onChange={handleTagsChange} className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-[var(--secondary-accent)] focus:border-[var(--secondary-accent)]" />
              </div>
              <div>
                <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
                <input type="url" name="githubUrl" id="githubUrl" value={project.githubUrl} onChange={handleChange} required className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-[var(--secondary-accent)] focus:border-[var(--secondary-accent)]" />
              </div>
              <div>
                <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-700 mb-1">Live Demo URL (optional)</label>
                <input type="url" name="liveUrl" id="liveUrl" value={project.liveUrl} onChange={handleChange} className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-[var(--secondary-accent)] focus:border-[var(--secondary-accent)]" />
              </div>
              
              <div className="md:col-span-2 mt-4 pt-4 border-t">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Case Study Details</h3>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="problem" className="block text-sm font-medium text-gray-700 mb-1">The Problem</label>
                <textarea name="problem" id="problem" value={project.caseStudy.problem} onChange={handleCaseStudyChange} rows={3} className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-[var(--secondary-accent)] focus:border-[var(--secondary-accent)]"></textarea>
              </div>
               <div className="md:col-span-2">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">My Role</label>
                <textarea name="role" id="role" value={project.caseStudy.role} onChange={handleCaseStudyChange} rows={3} className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-[var(--secondary-accent)] focus:border-[var(--secondary-accent)]"></textarea>
              </div>
               <div className="md:col-span-2">
                <label htmlFor="process" className="block text-sm font-medium text-gray-700 mb-1">The Process</label>
                <textarea name="process" id="process" value={project.caseStudy.process} onChange={handleCaseStudyChange} rows={3} className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-[var(--secondary-accent)] focus:border-[var(--secondary-accent)]"></textarea>
              </div>
               <div className="md:col-span-2">
                <label htmlFor="outcome" className="block text-sm font-medium text-gray-700 mb-1">The Outcome</label>
                <textarea name="outcome" id="outcome" value={project.caseStudy.outcome} onChange={handleCaseStudyChange} rows={3} className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-[var(--secondary-accent)] focus:border-[var(--secondary-accent)]"></textarea>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">Case Study Image URL</label>
                <input type="url" name="imageUrl" id="imageUrl" value={project.caseStudy.imageUrl} onChange={handleCaseStudyChange} className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-[var(--secondary-accent)] focus:border-[var(--secondary-accent)]" />
              </div>
            </div>
          </main>
          <footer className="p-4 bg-gray-50 border-t border-[var(--border-color)] text-right flex-shrink-0 sticky bottom-0">
            <button type="submit" className="bg-gradient-to-r from-[var(--secondary-accent)] to-[var(--primary-accent)] text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity">
              Save Project
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default ProjectFormModal;