
import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { supabase } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://omotoye.dev'

    // Get all blog posts
    const posts = getAllPosts()
    const blogUrls = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    // Get all projects
    const { data: projects } = await supabase
        .from('projects')
        .select('id, created_at')

    const projectUrls = (projects || []).map((project) => ({
        url: `${baseUrl}/projects/${project.id}`,
        lastModified: new Date(project.created_at),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        ...blogUrls,
        ...projectUrls,
    ]
}
