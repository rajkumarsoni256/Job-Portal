import React from 'react';
import './Skeletons.css';

/**
 * Reusable Job Card Skeleton Component
 */
export function JobCardSkeleton() {
  return (
    <div className="job-card-skeleton">
      <div className="flex items-center gap-3">
        <div className="skeleton-base skeleton-avatar" />
        <div className="flex flex-col gap-2" style={{ flex: 1 }}>
          <div className="skeleton-base skeleton-title" />
          <div className="skeleton-base skeleton-sub" />
        </div>
      </div>
      <div className="flex items-center gap-2" style={{ marginTop: 4 }}>
        <div className="skeleton-base skeleton-badge" />
        <div className="skeleton-base skeleton-badge" />
        <div className="skeleton-base skeleton-badge" />
      </div>
      <div className="skeleton-base skeleton-text" style={{ width: '90%', marginTop: 4 }} />
    </div>
  );
}

/**
 * Reusable Dashboard Skeleton Component
 */
export function DashboardSkeleton() {
  return (
    <div>
      <div className="dash-skeleton-grid">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="dash-stat-skeleton">
            <div className="skeleton-base skeleton-avatar" style={{ width: 42, height: 42 }} />
            <div className="flex flex-col gap-2" style={{ flex: 1 }}>
              <div className="skeleton-base" style={{ height: 22, width: '50%' }} />
              <div className="skeleton-base" style={{ height: 12, width: '70%' }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: 14, border: '1px solid #e2e8f0' }}>
        <div className="skeleton-base" style={{ height: 24, width: '30%', marginBottom: 16 }} />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton-base" style={{ height: 36, width: '100%', marginBottom: 8 }} />
        ))}
      </div>
    </div>
  );
}

/**
 * Reusable Resume Analysis Skeleton Component
 */
export function ResumeAnalysisSkeleton() {
  return (
    <div className="resume-analysis-skeleton">
      <div className="skeleton-base skeleton-circle-lg" />
      <div className="skeleton-base skeleton-title" style={{ width: '40%' }} />
      <div className="skeleton-base skeleton-sub" style={{ width: '60%' }} />

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
        <div className="skeleton-base" style={{ height: 14, width: '100%' }} />
        <div className="skeleton-base" style={{ height: 14, width: '100%' }} />
        <div className="skeleton-base" style={{ height: 14, width: '100%' }} />
      </div>
    </div>
  );
}

/**
 * Reusable Company Card Skeleton Component
 */
export function CompanyCardSkeleton() {
  return (
    <div className="company-card-skeleton">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="skeleton-base skeleton-avatar" />
          <div className="flex flex-col gap-2">
            <div className="skeleton-base skeleton-title" style={{ width: 120 }} />
            <div className="skeleton-base skeleton-sub" style={{ width: 80 }} />
          </div>
        </div>
        <div className="skeleton-base skeleton-badge" />
      </div>

      <div className="skeleton-base skeleton-text" style={{ width: '100%', marginTop: 8 }} />
      <div className="skeleton-base skeleton-text" style={{ width: '85%' }} />
      <div className="skeleton-base" style={{ height: 36, width: '100%', borderRadius: 6, marginTop: 8 }} />
    </div>
  );
}
