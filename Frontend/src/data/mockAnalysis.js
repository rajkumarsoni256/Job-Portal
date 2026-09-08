/**
 * Mock Data Structure for Resume Analysis Results Page
 * Designed so that a real API response can seamlessly replace this mock data.
 */

export const MOCK_RESUME_ANALYSIS = {
  fileName: 'Raj_Kumar_Software_Engineer_Resume.pdf',
  uploadedAt: 'Sep 9, 2026',
  overallScore: 82,
  maxScore: 100,
  scoreLabel: 'Good ATS Compatibility',

  categoryScores: [
    { name: 'Content', score: 85, color: '#2563eb' },
    { name: 'Skills', score: 90, color: '#16a34a' },
    { name: 'Formatting', score: 78, color: '#ea580c' },
    { name: 'Experience', score: 75, color: '#0284c7' },
  ],

  detectedSkills: [
    'Python',
    'Java',
    'C++',
    'SQL',
    'React',
    'Machine Learning',
    'Git',
  ],

  skillGaps: [
    { skill: 'AWS', priority: 'High', priorityVariant: 'danger' },
    { skill: 'Docker', priority: 'High', priorityVariant: 'danger' },
    { skill: 'Spring Boot', priority: 'Medium', priorityVariant: 'warning' },
  ],

  sectionChecklist: {
    detected: [
      'Contact Information',
      'Education',
      'Skills',
      'Projects',
      'Experience',
    ],
    missing: [
      'Certifications',
      'Professional Summary',
    ],
  },

  suggestions: [
    {
      id: 1,
      title: '1. Improve Professional Summary',
      description:
        'Add a concise 2-3 sentence summary at the top of your resume highlighting your domain expertise, core stack, and target career goals.',
    },
    {
      id: 2,
      title: '2. Add measurable project achievements',
      description:
        'Quantify your impact in experience bullet points (e.g., "Reduced database query latency by 35% across 2M+ daily requests").',
    },
    {
      id: 3,
      title: '3. Add missing technical skills',
      description:
        'Incorporate high-priority keywords like AWS, Docker, and Spring Boot to match enterprise ATS search algorithms.',
    },
    {
      id: 4,
      title: '4. Improve formatting consistency',
      description:
        'Standardize date formats (e.g., MMM YYYY), bullet point styling, and font hierarchy throughout your experience section.',
    },
  ],

  jobMatches: [
    {
      id: '4',
      title: 'Java Backend Developer',
      company: 'Zomato',
      matchPercentage: 91,
      matchingSkills: ['Java', 'SQL', 'Git'],
      missingSkills: ['Spring Boot', 'AWS'],
    },
    {
      id: '3',
      title: 'ML Engineer',
      company: 'Amazon',
      matchPercentage: 87,
      matchingSkills: ['Python', 'Machine Learning', 'Git'],
      missingSkills: ['Docker', 'AWS'],
    },
    {
      id: '1',
      title: 'Software Engineer',
      company: 'Google',
      matchPercentage: 82,
      matchingSkills: ['React', 'SQL', 'C++'],
      missingSkills: ['System Design', 'AWS'],
    },
  ],
};
