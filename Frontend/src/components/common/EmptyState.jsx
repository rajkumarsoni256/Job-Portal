import React from 'react';
import {
  SearchX,
  Send,
  Bookmark,
  FileText,
  Users,
  FolderOpen,
} from 'lucide-react';
import './EmptyState.css';

/**
 * Reusable EmptyState Component
 * Presets supported: 'no-jobs', 'no-applications', 'no-saved-jobs', 'no-resume', 'no-applicants'
 */
function EmptyState({
  preset = null,
  icon = null,
  title = null,
  description = null,
  action = null,
  className = '',
}) {
  let defaultIcon = <FolderOpen size={28} />;
  let defaultTitle = 'No items found';
  let defaultDesc = 'There are no results available matching your criteria at this time.';

  if (preset === 'no-jobs') {
    defaultIcon = <SearchX size={28} />;
    defaultTitle = 'No Jobs Found';
    defaultDesc = "We couldn't find any job openings matching your search or filters.";
  } else if (preset === 'no-applications') {
    defaultIcon = <Send size={28} />;
    defaultTitle = 'No Job Applications Yet';
    defaultDesc = 'You have not submitted any job applications. Explore active openings and start applying today!';
  } else if (preset === 'no-saved-jobs') {
    defaultIcon = <Bookmark size={28} />;
    defaultTitle = 'No Saved Jobs';
    defaultDesc = 'Bookmark interesting job postings to review, compare, and apply to later.';
  } else if (preset === 'no-resume') {
    defaultIcon = <FileText size={28} />;
    defaultTitle = 'No Resume Uploaded';
    defaultDesc = 'Upload your PDF or DOCX resume to get AI match scores and instant career insights.';
  } else if (preset === 'no-applicants') {
    defaultIcon = <Users size={28} />;
    defaultTitle = 'No Applicants Found';
    defaultDesc = 'No candidate applications match your current filters or selected job posting.';
  }

  const finalIcon = icon || defaultIcon;
  const finalTitle = title || defaultTitle;
  const finalDesc = description || defaultDesc;

  return (
    <div className={`empty-state-container ${className}`.trim()}>
      <div className="empty-state-icon-box">{finalIcon}</div>
      <h3 className="empty-state-title">{finalTitle}</h3>
      <p className="empty-state-description">{finalDesc}</p>
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  );
}

export default EmptyState;
