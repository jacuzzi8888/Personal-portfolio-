import React, { useState, useEffect } from 'react';
import { GithubRepo } from '../types';
import { fetchUserRepos } from '../services/githubService';
import CloseIcon from './icons/CloseIcon';
import GithubIcon from './icons/GithubIcon';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onSave }) => {
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [selectedRepoIds, setSelectedRepoIds] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const savedUsername = localStorage.getItem('githubUsername') || '';
      const savedRepoIds = JSON.parse(localStorage.getItem('selectedRepoIds') || '[]') as number[];
      setUsername(savedUsername);
      setSelectedRepoIds(new Set(savedRepoIds));
    }
  }, [isOpen]);

  const handleFetchRepos = async () => {
    if (!username) {
      setError('Please enter a GitHub username.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setRepos([]);
    try {
      const userRepos = await fetchUserRepos(username);
      setRepos(userRepos);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleRepo = (repoId: number) => {
    setSelectedRepoIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(repoId)) {
        newSet.delete(repoId);
      } else {
        newSet.add(repoId);
      }
      return newSet;
    });
  };

  const handleSave = () => {
    localStorage.setItem('githubUsername', username);
    localStorage.setItem('selectedRepoIds', JSON.stringify(Array.from(selectedRepoIds)));
    onSave();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-[var(--card-bg-color)] rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-gray-300"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex justify-between items-center p-4 border-b border-[var(--border-color)] flex-shrink-0">
          <h2 className="text-xl font-bold text-[var(--primary-text)]">Project Settings</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black transition-colors">
            <CloseIcon />
          </button>
        </header>

        <main className="p-6 overflow-y-auto flex-grow">
          <div className="mb-6">
            <label htmlFor="github-username" className="block text-sm font-medium text-gray-700 mb-2">
              GitHub Username
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                id="github-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g., octocat"
                className="flex-grow bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-[var(--secondary-accent)] focus:border-[var(--secondary-accent)]"
              />
              <button
                onClick={handleFetchRepos}
                disabled={isLoading}
                className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Fetching...' : 'Fetch Repos'}
              </button>
            </div>
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </div>

          {repos.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Select projects to display:</h3>
              <div className="max-h-64 overflow-y-auto pr-2 -mr-2">
                {repos.map(repo => (
                  <div key={repo.id} className="flex items-center p-3 rounded-md hover:bg-gray-100/50 transition-colors">
                    <input
                      type="checkbox"
                      id={`repo-${repo.id}`}
                      checked={selectedRepoIds.has(repo.id)}
                      onChange={() => handleToggleRepo(repo.id)}
                      className="h-4 w-4 rounded border-gray-400 bg-gray-200 text-[var(--secondary-accent)] focus:ring-[var(--secondary-accent)] cursor-pointer"
                    />
                    <label htmlFor={`repo-${repo.id}`} className="ml-3 text-sm text-gray-700 flex-grow cursor-pointer">
                      {repo.name}
                      <p className="text-xs text-gray-500">{repo.description || 'No description'}</p>
                    </label>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[var(--secondary-accent)] transition-colors">
                      <GithubIcon className="w-5 h-5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        <footer className="p-4 bg-gray-50 border-t border-[var(--border-color)] text-right flex-shrink-0">
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-[var(--secondary-accent)] to-[var(--primary-accent)] text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity"
          >
            Save Changes
          </button>
        </footer>
      </div>
    </div>
  );
};

export default SettingsModal;