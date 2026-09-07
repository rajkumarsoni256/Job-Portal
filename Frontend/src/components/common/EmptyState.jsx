import React from 'react';
import { FolderOpen } from 'lucide-react';
import './EmptyState.css';

/**
 * Reusable EmptyState Component
 * Displays a clean placeholder for empty lists, search results, or data feeds.
 *
 * Props:
 * - icon: React node (e.g. <Search size={24} />)
 * - title: string
 * - description: string
 * - action: React node (e.g. <Button />)
 */
function EmptyState({
  icon = <FolderOpen size={28} />,
  title = 'No items found',
  description = 'There are no results available matching your search or filters at this time.',
  action = null,
  className = '',
}) {
  return (
    <div className={`empty-state-container ${className}`.trim()}>
      <div className="empty-state-icon-box">
        {icon}
      </div>

      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>

      {action && <div className="empty-state-action">{action}</div>}
    </div>
  );
}

export default EmptyState;
