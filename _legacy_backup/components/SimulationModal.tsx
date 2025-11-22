import React, { useState, useEffect, useCallback } from 'react';
import { Project } from '../types';
import { getAICodeReview } from '../services/geminiService';
import CloseIcon from './icons/CloseIcon';

interface SimulationModalProps {
  project: Project | null;
  onClose: () => void;
}

const TypingEffect: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    if (text) {
      let i = 0;
      const intervalId = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(prev => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(intervalId);
        }
      }, 10);
      return () => clearInterval(intervalId);
    }
  }, [text]);

  return <>{displayedText}</>;
};

const simpleMarkdownToHtml = (markdown: string) => {
  return markdown
    .replace(/### (.*)/g, '<h3 class="text-lg font-bold mt-4 mb-2 text-gray-800">$1</h3>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code class="bg-[var(--light-accent)]/50 text-[var(--secondary-accent)] px-1.5 py-1 rounded text-sm font-mono">$1</code>')
    .replace(/```(\w+)?\s*([\s\S]+?)```/g, (match, lang, code) => {
      const languageClass = lang ? `language-${lang}` : '';
      return `<pre class="bg-gray-800 text-gray-200 rounded-md p-4 my-4 overflow-x-auto"><code class="${languageClass}">${code.trim()}</code></pre>`;
    })
    .replace(/^- (.*)/gm, '<li class="ml-6 list-disc">$1</li>')
    .replace(/(<li>(.|\n)*?<\/li>)/g, '<ul>$1</ul>');
};

const SimulationModal: React.FC<SimulationModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'simulation' | 'review'>('simulation');
  const [review, setReview] = useState<string>('');
  const [isLoadingReview, setIsLoadingReview] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchReview = useCallback(async () => {
    if (!project || !project.codeSnippet) return;
    setIsLoadingReview(true);
    setError('');
    setReview('');
    try {
      const result = await getAICodeReview(project.codeSnippet);
      setReview(result);
    } catch (err) {
      setError('Failed to fetch AI review.');
      console.error(err);
    } finally {
      setIsLoadingReview(false);
    }
  }, [project]);

  useEffect(() => {
    if (project) {
      setActiveTab('simulation');
      setReview('');
      setError('');
      setIsLoadingReview(false);
    }
  }, [project]);
  
  if (!project) return null;

  const handleGetReview = () => {
    setActiveTab('review');
    if (!review && !isLoadingReview) {
      fetchReview();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-[var(--card-bg-color)] rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-gray-300"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex justify-between items-center p-4 border-b border-[var(--border-color)] flex-shrink-0">
          <h2 className="text-xl font-bold text-[var(--secondary-text)]">{project.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black transition-colors">
            <CloseIcon />
          </button>
        </header>
        
        <div className="p-4 border-b border-[var(--border-color)] flex-shrink-0">
            <div className="flex space-x-2">
                <button 
                    onClick={() => setActiveTab('simulation')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'simulation' ? 'bg-[var(--light-accent)] text-[var(--secondary-accent)] border border-[var(--highlight-accent)]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                    Simulation
                </button>
                <button
                    onClick={handleGetReview}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'review' ? 'bg-[var(--light-accent)] text-[var(--secondary-accent)] border border-[var(--highlight-accent)]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                    AI Code Review
                </button>
            </div>
        </div>

        <main className="p-6 overflow-y-auto flex-grow">
          {activeTab === 'simulation' && (
            <div className="bg-gray-800 rounded-md p-4 font-mono text-sm text-green-300 whitespace-pre-wrap">
              {project.simulationOutput ? <TypingEffect text={project.simulationOutput} /> : 'No simulation output available.'}
            </div>
          )}
          {activeTab === 'review' && (
            <div>
              {isLoadingReview && (
                <div className="flex justify-center items-center h-40">
                  <div className="loader-spinner !border-gray-300 !border-t-[var(--secondary-accent)]"></div>
                  <p className="ml-4 text-gray-600">Gemini is analyzing the code...</p>
                </div>
              )}
              {error && <div className="text-red-500">{error}</div>}
              {review && (
                <article 
                  className="prose prose-sm max-w-none text-gray-700 prose-headings:text-gray-900 prose-strong:text-black"
                  dangerouslySetInnerHTML={{ __html: simpleMarkdownToHtml(review) }} 
                />
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SimulationModal;