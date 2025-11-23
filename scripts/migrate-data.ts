
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const PROJECTS = [
    {
        name: 'QuantumLeap Dashboard',
        description: 'A responsive and feature-rich dashboard built with React and TypeScript for visualizing complex data sets. Uses Recharts for dynamic graph rendering.',
        tags: ['React', 'TypeScript', 'TailwindCSS', 'Recharts'],
        github_url: 'https://github.com/your-username/quantum-dashboard',
        live_url: '#',
        case_study: {
            problem: "The primary challenge was to create a highly performant dashboard capable of rendering thousands of data points in real-time without sacrificing user experience. The existing solution was slow and not intuitive.",
            role: "Lead Frontend Developer. I was responsible for the entire frontend architecture, component design, state management strategy, and data visualization implementation.",
            process: "We started with user research and wireframing in Figma. I chose React with TypeScript for type safety and scalability. For state, I implemented Zustand for its simplicity and performance. Data visualizations were built using Recharts, which required custom components to meet our specific design requirements. The project was managed using an Agile methodology with weekly sprints.",
            outcome: "The new dashboard improved data loading times by 80% and increased user engagement by 45%. The component-based architecture has made it significantly easier to add new features and maintain the codebase.",
            imageUrl: 'https://placehold.co/1200x600/7BA071/FFFFFF/png?text=QuantumLeap+Dashboard',
        },
    },
    {
        name: 'NexusAPI',
        description: 'A robust RESTful API built with Node.js, Express, and TypeScript. It provides endpoints for user authentication and data management, connected to a PostgreSQL database.',
        tags: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL'],
        github_url: 'https://github.com/your-username/nexus-api',
        case_study: {
            problem: "Our application required a secure, scalable, and reliable backend to manage user data, authentication, and complex business logic. The goal was to build a RESTful API that could serve multiple frontend clients seamlessly.",
            role: "Backend Developer. I designed the database schema, developed all API endpoints, implemented JWT-based authentication, and wrote integration tests to ensure API reliability.",
            process: "The API was built with Node.js and Express for their performance and extensive middleware ecosystem. I used TypeScript to enforce strict typing and reduce runtime errors. PostgreSQL was chosen for its robustness and ACID compliance. I followed a test-driven development (TDD) approach, using Jest and Supertest for testing each endpoint.",
            outcome: "The resulting API successfully serves our web and mobile clients with an average response time under 50ms. API uptime has been maintained at 99.9%, and the clear documentation has allowed other developers to integrate with it efficiently.",
            imageUrl: 'https://placehold.co/1200x600/00796B/FFFFFF/png?text=NexusAPI',
        },
    },
    {
        name: 'ChronoScript',
        description: 'A Python script for automating file backups. It intelligently scans directories for changes and archives them with timestamps, optimizing storage space.',
        tags: ['Python', 'Automation', 'Scripting'],
        github_url: 'https://github.com/your-username/chrono-script',
        case_study: {
            problem: "Manual file backups were time-consuming, prone to human error, and resulted in redundant copies of large files, wasting significant storage space. An automated and intelligent solution was needed.",
            role: "Sole Developer. I was responsible for scripting the entire solution, from file system monitoring to archiving logic and logging.",
            process: "I developed the script in Python, leveraging the built-in `os` and `shutil` libraries for file system operations. I implemented a hashing mechanism to detect file changes efficiently, ensuring that only modified files were backed up. The script was scheduled to run as a nightly cron job.",
            outcome: "ChronoScript reduced weekly time spent on manual backups from 2 hours to zero. It also saved over 50% of backup storage space by avoiding duplicate file archives. The script has been running reliably for over a year with no critical failures.",
            imageUrl: 'https://placehold.co/1200x600/C9AF8B/2c3e50/png?text=ChronoScript',
        }
    }
];

async function migrate() {
    console.log('Starting migration...');

    for (const project of PROJECTS) {
        const { data, error } = await supabase
            .from('projects')
            .insert([project])
            .select();

        if (error) {
            console.error(`Error inserting ${project.name}:`, error);
        } else {
            console.log(`Successfully inserted ${project.name}`);
        }
    }

    console.log('Migration complete.');
}

migrate();
