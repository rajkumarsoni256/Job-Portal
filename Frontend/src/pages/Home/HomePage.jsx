import React from 'react';
import { Link } from 'react-router-dom';
import { Search, FileCheck, Building, ArrowRight } from 'lucide-react';
import { Container, Button, Card, Badge, SectionHeader } from '../../components/common';

/**
 * HomePage Component
 * Clean, professional landing page using JobTrack Design System
 */
function HomePage() {
  return (
    <Container size="xl" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-12)' }}>
      {/* Hero Banner Card */}
      <Card
        variant="default"
        padding="lg"
        style={{
          textAlign: 'center',
          marginBottom: 'var(--space-10)',
          backgroundColor: 'var(--color-bg-surface)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '780px', margin: '0 auto', padding: 'var(--space-6) 0' }}>
          <Badge variant="primary" size="md" style={{ marginBottom: 'var(--space-4)' }}>
            Welcome to JobTrack
          </Badge>
          
          <h1 style={{ fontSize: 'var(--font-3xl)', fontWeight: 800, marginBottom: 'var(--space-4)', lineHeight: 1.2 }}>
            Find Your Next Dream Job & Optimize Your Resume
          </h1>

          <p style={{ fontSize: 'var(--font-md)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-8)', lineHeight: 1.6 }}>
            JobTrack bridges job seekers and recruiters with AI-powered resume analysis, instant job matching, and seamless application tracking.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <Link to="/jobs">
              <Button variant="primary" size="lg" iconLeft={<Search size={18} />}>
                Browse Jobs
              </Button>
            </Link>
            <Link to="/resume-analyzer">
              <Button variant="outline" size="lg" iconLeft={<FileCheck size={18} />}>
                Analyze Resume
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* Feature Highlights Section */}
      <SectionHeader
        title="Why Choose JobTrack"
        description="Built for modern candidates and recruitment teams seeking clarity and speed."
        level={2}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--space-6)',
        }}
      >
        <Card interactive variant="default">
          <Card.Body>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-4)',
              }}
            >
              <Search size={22} />
            </div>
            <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
              Smart Job Search
            </h3>
            <p style={{ fontSize: 'var(--font-sm)', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Explore thousands of curated software engineering, design, and product management opportunities daily.
            </p>
          </Card.Body>
          <Card.Footer>
            <Link to="/jobs" style={{ fontSize: 'var(--font-sm)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
              Explore listings <ArrowRight size={14} />
            </Link>
          </Card.Footer>
        </Card>

        <Card interactive variant="default">
          <Card.Body>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-4)',
              }}
            >
              <FileCheck size={22} />
            </div>
            <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
              Resume AI Matcher
            </h3>
            <p style={{ fontSize: 'var(--font-sm)', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Scan your resume against job descriptions to obtain instant ATS compliance scores and formatting feedback.
            </p>
          </Card.Body>
          <Card.Footer>
            <Link to="/resume-analyzer" style={{ fontSize: 'var(--font-sm)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
              Analyze now <ArrowRight size={14} />
            </Link>
          </Card.Footer>
        </Card>

        <Card interactive variant="default">
          <Card.Body>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-4)',
              }}
            >
              <Building size={22} />
            </div>
            <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
              Recruiter Portal
            </h3>
            <p style={{ fontSize: 'var(--font-sm)', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Post openings, evaluate qualified applicants, shortlist top talent, and communicate seamlessly.
            </p>
          </Card.Body>
          <Card.Footer>
            <Link to="/recruiter/dashboard" style={{ fontSize: 'var(--font-sm)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
              Recruiter suite <ArrowRight size={14} />
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </Container>
  );
}

export default HomePage;
