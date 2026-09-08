/**
 * Mock Data for JobTrack Platform
 * Realistic job listings, categories, stats, and career tips
 */

import { JOBS_DATA } from './jobs';

export const MOCK_JOBS = JOBS_DATA;

export const POPULAR_CATEGORIES = [
  {
    id: 'software-dev',
    name: 'Software Development',
    count: '3,420+ Jobs',
    icon: 'Code',
  },
  {
    id: 'data-analytics',
    name: 'Data & Analytics',
    count: '1,850+ Jobs',
    icon: 'BarChart3',
  },
  {
    id: 'design',
    name: 'Design',
    count: '950+ Jobs',
    icon: 'Palette',
  },
  {
    id: 'product-mgmt',
    name: 'Product Management',
    count: '1,240+ Jobs',
    icon: 'Compass',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    count: '850+ Jobs',
    icon: 'TrendingUp',
  },
  {
    id: 'hr',
    name: 'Human Resources',
    count: '610+ Jobs',
    icon: 'Users',
  },
];

export const PLATFORM_STATS = [
  {
    id: 'jobs',
    number: '10K+',
    label: 'Jobs Available',
    description: 'Active openings updated daily',
  },
  {
    id: 'companies',
    number: '1K+',
    label: 'Companies',
    description: 'Verified hiring employers',
  },
  {
    id: 'seekers',
    number: '50K+',
    label: 'Job Seekers',
    description: 'Talented professionals',
  },
  {
    id: 'applications',
    number: '1L+',
    label: 'Applications',
    description: 'Successful connections made',
  },
];

export const CAREER_TIPS = [
  {
    id: 'tip-1',
    title: 'How to write an ATS-friendly resume',
    readTime: '5 min read',
    category: 'Resume Writing',
  },
  {
    id: 'tip-2',
    title: 'Top technical skills in demand for 2026',
    readTime: '4 min read',
    category: 'Industry Trends',
  },
  {
    id: 'tip-3',
    title: 'How to prepare for system design & behavioral interviews',
    readTime: '7 min read',
    category: 'Interview Prep',
  },
];
