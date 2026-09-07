import React from 'react';
import { UploadCloud, FileText } from 'lucide-react';
import { Button } from '../common';

/**
 * ResumeUploader Component
 */
function ResumeUploader() {
  return (
    <div
      style={{
        border: '2px dashed var(--color-border-strong)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-8) var(--space-4)',
        textAlign: 'center',
        backgroundColor: 'var(--color-bg-app)',
        transition: 'border-color var(--transition-fast)',
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-primary-light)',
          color: 'var(--color-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto var(--space-3) auto',
        }}
      >
        <UploadCloud size={24} />
      </div>
      <h4 style={{ fontSize: 'var(--font-base)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
        Upload your resume
      </h4>
      <p style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>
        Supports PDF, DOCX (Max size: 5MB)
      </p>
      <Button variant="outline" size="sm" iconLeft={<FileText size={14} />}>
        Browse File
      </Button>
    </div>
  );
}

export default ResumeUploader;
