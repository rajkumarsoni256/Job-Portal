import React from 'react';
import { FileText, Cpu } from 'lucide-react';
import { Container, SectionHeader, Card, Input, Button } from '../../components/common';
import ResumeUploader from '../../components/resume/ResumeUploader';

/**
 * ResumeAnalyzerPage Component
 */
function ResumeAnalyzerPage() {
  return (
    <Container size="xl" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-12)' }}>
      <SectionHeader
        title="AI Resume Analyzer"
        description="Scan your resume against target job listings to get instant ATS match scores and optimization tips."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 'var(--space-6)' }}>
        <Card variant="default">
          <Card.Header title="1. Upload Resume" subtitle="Select your latest CV in PDF or DOCX format" />
          <Card.Body>
            <ResumeUploader />
          </Card.Body>
        </Card>

        <Card variant="default">
          <Card.Header title="2. Job Description" subtitle="Paste target job specifications below" />
          <Card.Body>
            <Input
              as="textarea"
              label="Job Description Text"
              placeholder="Paste job responsibilities, skills, and qualifications here..."
              rows={7}
            />
            <Button variant="primary" fullWidth iconLeft={<Cpu size={16} />} style={{ marginTop: 'var(--space-4)' }}>
              Analyze Match Score
            </Button>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default ResumeAnalyzerPage;
