
import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

export interface Project {
    id: number;
    name: string;
    description: string;
    tags: string[];
    github_url: string;
    live_url?: string;
    case_study?: any;
    created_at?: string;
}

interface ProjectState {
    projects: Project[];
    isLoading: boolean;
    error: string | null;
    fetchProjects: () => Promise<void>;
    addProject: (project: Omit<Project, 'id' | 'created_at'>) => Promise<void>;
    updateProject: (id: number, project: Partial<Project>) => Promise<void>;
    deleteProject: (id: number) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
    projects: [],
    isLoading: false,
    error: null,

    fetchProjects: async () => {
        set({ isLoading: true, error: null });
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            set({ projects: data as Project[] });
        } catch (error: any) {
            set({ error: error.message });
        } finally {
            set({ isLoading: false });
        }
    },

    addProject: async (project) => {
        set({ isLoading: true, error: null });
        try {
            const { data, error } = await supabase
                .from('projects')
                .insert([project])
                .select()
                .single();

            if (error) throw error;
            set((state) => ({ projects: [data as Project, ...state.projects] }));
        } catch (error: any) {
            set({ error: error.message });
        } finally {
            set({ isLoading: false });
        }
    },

    updateProject: async (id, updates) => {
        set({ isLoading: true, error: null });
        try {
            const { error } = await supabase
                .from('projects')
                .update(updates)
                .eq('id', id);

            if (error) throw error;
            set((state) => ({
                projects: state.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
            }));
        } catch (error: any) {
            set({ error: error.message });
        } finally {
            set({ isLoading: false });
        }
    },

    deleteProject: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const { error } = await supabase
                .from('projects')
                .delete()
                .eq('id', id);

            if (error) throw error;
            set((state) => ({
                projects: state.projects.filter((p) => p.id !== id),
            }));
        } catch (error: any) {
            set({ error: error.message });
        } finally {
            set({ isLoading: false });
        }
    },
}));
