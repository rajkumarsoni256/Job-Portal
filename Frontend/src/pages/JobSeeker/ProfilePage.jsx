import React, { useState } from 'react';
import {
  User,
  MapPin,
  Mail,
  Phone,
  Edit3,
  Plus,
  Trash2,
  Sparkles,
  GraduationCap,
  Briefcase,
  Code2,
  FolderGit2,
  Award,
  FileText,
  Download,
  UploadCloud,
  X,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { SEEKER_PROFILE } from '../../data/seekerData';
import './ProfilePage.css';
import './JobSeekerDashboard.css';

function ProfilePage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Profile State (initialized from SEEKER_PROFILE)
  const [profile, setProfile] = useState({ ...SEEKER_PROFILE });

  // Toast Notification
  const [toastMessage, setToastMessage] = useState('');
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  // Skill Add Input State
  const [newSkillInput, setNewSkillInput] = useState('');

  // Modals Open State
  const [isEditHeaderOpen, setIsEditHeaderOpen] = useState(false);
  const [headerFormData, setHeaderFormData] = useState({
    name: profile.name,
    title: profile.title,
    location: profile.location,
    email: profile.email,
    phone: profile.phone,
    bio: profile.bio,
  });

  // Education Modal
  const [isEduModalOpen, setIsEduModalOpen] = useState(false);
  const [editingEduId, setEditingEduId] = useState(null);
  const [eduForm, setEduForm] = useState({ degree: '', institution: '', duration: '', grade: '' });

  // Experience Modal
  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [editingExpId, setEditingExpId] = useState(null);
  const [expForm, setExpForm] = useState({ role: '', company: '', location: '', duration: '', description: '' });

  // Project Modal
  const [isProjModalOpen, setIsProjModalOpen] = useState(false);
  const [editingProjId, setEditingProjId] = useState(null);
  const [projForm, setProjForm] = useState({ name: '', tech: '', description: '', link: '' });

  // Certification Modal
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [editingCertId, setEditingCertId] = useState(null);
  const [certForm, setCertForm] = useState({ title: '', issuer: '', date: '', credentialId: '' });

  // -------------------------------------------------------------
  // SKILLS HANDLERS (Add / Remove)
  // -------------------------------------------------------------
  const handleAddSkill = () => {
    if (!newSkillInput.trim()) return;
    const skill = newSkillInput.trim();
    if (!profile.skills.includes(skill)) {
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
      showToast(`Skill "${skill}" added to profile!`);
    }
    setNewSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
    showToast(`Skill "${skillToRemove}" removed.`);
  };

  // -------------------------------------------------------------
  // EDIT HEADER & ABOUT
  // -------------------------------------------------------------
  const handleSaveHeader = (e) => {
    e.preventDefault();
    setProfile((prev) => ({
      ...prev,
      name: headerFormData.name,
      title: headerFormData.title,
      location: headerFormData.location,
      email: headerFormData.email,
      phone: headerFormData.phone,
      bio: headerFormData.bio,
    }));
    setIsEditHeaderOpen(false);
    showToast('Profile header and bio updated successfully!');
  };

  // -------------------------------------------------------------
  // EDUCATION HANDLERS
  // -------------------------------------------------------------
  const handleOpenAddEdu = () => {
    setEditingEduId(null);
    setEduForm({ degree: '', institution: '', duration: '', grade: '' });
    setIsEduModalOpen(true);
  };

  const handleOpenEditEdu = (edu) => {
    setEditingEduId(edu.id);
    setEduForm({ degree: edu.degree, institution: edu.institution, duration: edu.duration, grade: edu.grade || '' });
    setIsEduModalOpen(true);
  };

  const handleSaveEdu = (e) => {
    e.preventDefault();
    if (editingEduId) {
      setProfile((prev) => ({
        ...prev,
        education: prev.education.map((item) =>
          item.id === editingEduId ? { ...item, ...eduForm } : item
        ),
      }));
    } else {
      const newEdu = { id: `edu-${Date.now()}`, ...eduForm };
      setProfile((prev) => ({ ...prev, education: [...prev.education, newEdu] }));
    }
    setIsEduModalOpen(false);
    showToast('Education section updated!');
  };

  const handleDeleteEdu = (id) => {
    setProfile((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id),
    }));
    showToast('Education entry deleted.');
  };

  // -------------------------------------------------------------
  // EXPERIENCE HANDLERS
  // -------------------------------------------------------------
  const handleOpenAddExp = () => {
    setEditingExpId(null);
    setExpForm({ role: '', company: '', location: '', duration: '', description: '' });
    setIsExpModalOpen(true);
  };

  const handleOpenEditExp = (exp) => {
    setEditingExpId(exp.id);
    setExpForm({
      role: exp.role,
      company: exp.company,
      location: exp.location || '',
      duration: exp.duration,
      description: exp.description || '',
    });
    setIsExpModalOpen(true);
  };

  const handleSaveExp = (e) => {
    e.preventDefault();
    if (editingExpId) {
      setProfile((prev) => ({
        ...prev,
        experience: prev.experience.map((item) =>
          item.id === editingExpId ? { ...item, ...expForm } : item
        ),
      }));
    } else {
      const newExp = { id: `exp-${Date.now()}`, ...expForm };
      setProfile((prev) => ({ ...prev, experience: [...prev.experience, newExp] }));
    }
    setIsExpModalOpen(false);
    showToast('Experience section updated!');
  };

  const handleDeleteExp = (id) => {
    setProfile((prev) => ({
      ...prev,
      experience: prev.experience.filter((item) => item.id !== id),
    }));
    showToast('Experience entry deleted.');
  };

  // -------------------------------------------------------------
  // PROJECT HANDLERS
  // -------------------------------------------------------------
  const handleOpenAddProj = () => {
    setEditingProjId(null);
    setProjForm({ name: '', tech: '', description: '', link: '' });
    setIsProjModalOpen(true);
  };

  const handleOpenEditProj = (proj) => {
    setEditingProjId(proj.id);
    setProjForm({
      name: proj.name,
      tech: proj.tech,
      description: proj.description,
      link: proj.link || '',
    });
    setIsProjModalOpen(true);
  };

  const handleSaveProj = (e) => {
    e.preventDefault();
    if (editingProjId) {
      setProfile((prev) => ({
        ...prev,
        projects: prev.projects.map((item) =>
          item.id === editingProjId ? { ...item, ...projForm } : item
        ),
      }));
    } else {
      const newProj = { id: `proj-${Date.now()}`, ...projForm };
      setProfile((prev) => ({ ...prev, projects: [...prev.projects, newProj] }));
    }
    setIsProjModalOpen(false);
    showToast('Project section updated!');
  };

  const handleDeleteProj = (id) => {
    setProfile((prev) => ({
      ...prev,
      projects: prev.projects.filter((item) => item.id !== id),
    }));
    showToast('Project entry deleted.');
  };

  // -------------------------------------------------------------
  // CERTIFICATION HANDLERS
  // -------------------------------------------------------------
  const handleOpenAddCert = () => {
    setEditingCertId(null);
    setCertForm({ title: '', issuer: '', date: '', credentialId: '' });
    setIsCertModalOpen(true);
  };

  const handleOpenEditCert = (cert) => {
    setEditingCertId(cert.id);
    setCertForm({
      title: cert.title,
      issuer: cert.issuer,
      date: cert.date,
      credentialId: cert.credentialId || '',
    });
    setIsCertModalOpen(true);
  };

  const handleSaveCert = (e) => {
    e.preventDefault();
    if (editingCertId) {
      setProfile((prev) => ({
        ...prev,
        certifications: prev.certifications.map((item) =>
          item.id === editingCertId ? { ...item, ...certForm } : item
        ),
      }));
    } else {
      const newCert = { id: `cert-${Date.now()}`, ...certForm };
      setProfile((prev) => ({ ...prev, certifications: [...prev.certifications, newCert] }));
    }
    setIsCertModalOpen(false);
    showToast('Certifications section updated!');
  };

  const handleDeleteCert = (id) => {
    setProfile((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((item) => item.id !== id),
    }));
    showToast('Certification entry deleted.');
  };

  // Resume Upload Simulation
  const handleSimulateResumeUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setProfile((prev) => ({
        ...prev,
        resume: {
          fileName: file.name,
          fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          lastUpdated: 'Just now',
        },
      }));
      showToast(`Updated resume: ${file.name}`);
    }
  };

  return (
    <div className="seeker-dashboard-layout">
      {/* Integrated Sidebar */}
      <DashboardSidebar
        role="seeker"
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="seeker-main-wrapper">
        {/* Integrated Header */}
        <DashboardHeader
          title="My Profile"
          userName={profile.name}
          userRole="Job Seeker"
          userInitial={profile.avatarInitial}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
        />

        <main className="profile-page-content">
          {/* Toast Alert */}
          {toastMessage && (
            <div
              style={{
                backgroundColor: '#1e293b',
                color: '#ffffff',
                padding: '0.75rem 1.25rem',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              <span>{toastMessage}</span>
              <button
                type="button"
                onClick={() => setToastMessage('')}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* 1. PROFILE HEADER CARD */}
          <div className="profile-header-card">
            <div className="profile-header-left">
              <div className="profile-avatar-large">
                {profile.avatarInitial}
                <div
                  className="avatar-edit-badge"
                  onClick={() => setIsEditHeaderOpen(true)}
                  title="Change avatar"
                >
                  <Edit3 size={13} />
                </div>
              </div>

              <div className="profile-header-info">
                <h1 className="profile-user-name">{profile.name}</h1>
                <div className="profile-user-title">{profile.title}</div>
                <div className="profile-meta-row">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> {profile.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Mail size={14} /> {profile.email}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Phone size={14} /> {profile.phone}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn-nav btn-primary"
              onClick={() => {
                setHeaderFormData({
                  name: profile.name,
                  title: profile.title,
                  location: profile.location,
                  email: profile.email,
                  phone: profile.phone,
                  bio: profile.bio,
                });
                setIsEditHeaderOpen(true);
              }}
            >
              <Edit3 size={16} style={{ marginRight: 6 }} /> Edit Profile
            </button>
          </div>

          {/* 2. PROFILE COMPLETION & STRENGTH CARD */}
          <div className="profile-strength-card">
            <div className="strength-header-row">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles size={20} color="#60a5fa" />
                  <span style={{ fontSize: '1.1rem', fontWeight: 800 }}>Profile Strength: {profile.profileStrength}</span>
                  <span
                    style={{
                      backgroundColor: 'rgba(34, 197, 94, 0.2)',
                      color: '#4ade80',
                      border: '1px solid rgba(34, 197, 94, 0.3)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.15rem 0.55rem',
                      borderRadius: '9999px',
                    }}
                  >
                    {profile.completionPercentage}% Complete
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: 4 }}>
                  Complete your profile to increase your application visibility to hiring recruiters by 3.5x.
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="completion-progress-track">
              <div
                className="completion-progress-fill"
                style={{ width: `${profile.completionPercentage}%` }}
              />
            </div>

            {/* Suggestions to reach 100% */}
            {profile.suggestions && profile.suggestions.length > 0 && (
              <div className="suggestions-list">
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f8fafc', marginBottom: 2 }}>
                  Suggestions to reach 100% Profile Completion:
                </div>
                {profile.suggestions.map((sug, idx) => (
                  <div key={idx} className="suggestion-item">
                    <ChevronRight size={14} color="#60a5fa" />
                    <span>{sug}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. ABOUT SECTION */}
          <div className="profile-section-card">
            <div className="section-card-header">
              <h2 className="section-card-title">
                <User size={20} color="var(--color-primary)" /> About Me
              </h2>
              <button
                type="button"
                className="icon-btn-ghost"
                onClick={() => setIsEditHeaderOpen(true)}
                title="Edit Bio"
              >
                <Edit3 size={16} />
              </button>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-body)', lineHeight: 1.6 }}>
              {profile.bio || 'No bio added yet. Click edit to introduce yourself to hiring teams!'}
            </p>
          </div>

          {/* 4. SKILLS SECTION */}
          <div className="profile-section-card">
            <div className="section-card-header">
              <h2 className="section-card-title">
                <Code2 size={20} color="var(--color-primary)" /> Technical Skills ({profile.skills.length})
              </h2>
            </div>

            <div className="skill-add-bar">
              <input
                type="text"
                className="form-input"
                style={{ maxWidth: 360 }}
                placeholder="Add a new skill (e.g. AWS, GraphQL, Docker)..."
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
              />
              <button
                type="button"
                className="btn-nav btn-outline"
                onClick={handleAddSkill}
              >
                <Plus size={16} style={{ marginRight: 4 }} /> Add Skill
              </button>
            </div>

            <div className="tags-wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    backgroundColor: 'var(--color-primary-light)',
                    color: 'var(--color-primary)',
                    border: '1px solid var(--color-primary-border)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    padding: '0.3rem 0.75rem',
                    borderRadius: '9999px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  {skill}
                  <button
                    type="button"
                    style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', padding: 0, display: 'flex' }}
                    onClick={() => handleRemoveSkill(skill)}
                    title="Remove skill"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* 5. EXPERIENCE SECTION */}
          <div className="profile-section-card">
            <div className="section-card-header">
              <h2 className="section-card-title">
                <Briefcase size={20} color="var(--color-primary)" /> Work Experience
              </h2>
              <button
                type="button"
                className="btn-nav btn-outline"
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
                onClick={handleOpenAddExp}
              >
                <Plus size={14} style={{ marginRight: 4 }} /> Add Position
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {profile.experience && profile.experience.length > 0 ? (
                profile.experience.map((exp) => (
                  <div key={exp.id} className="profile-item-row">
                    <div>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-heading)' }}>
                        {exp.role}
                      </h3>
                      <div style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                        {exp.company} {exp.location && `• ${exp.location}`}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 2 }}>
                        {exp.duration}
                      </div>
                      {exp.description && (
                        <p style={{ fontSize: '0.825rem', color: 'var(--color-text-body)', marginTop: 6, lineHeight: 1.5 }}>
                          {exp.description}
                        </p>
                      )}
                    </div>

                    <div className="item-action-btns">
                      <button
                        type="button"
                        className="icon-btn-ghost"
                        onClick={() => handleOpenEditExp(exp)}
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        type="button"
                        className="icon-btn-ghost delete"
                        onClick={() => handleDeleteExp(exp.id)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>No work experience added yet.</div>
              )}
            </div>
          </div>

          {/* 6. EDUCATION SECTION */}
          <div className="profile-section-card">
            <div className="section-card-header">
              <h2 className="section-card-title">
                <GraduationCap size={20} color="var(--color-primary)" /> Education
              </h2>
              <button
                type="button"
                className="btn-nav btn-outline"
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
                onClick={handleOpenAddEdu}
              >
                <Plus size={14} style={{ marginRight: 4 }} /> Add Education
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {profile.education && profile.education.length > 0 ? (
                profile.education.map((edu) => (
                  <div key={edu.id} className="profile-item-row">
                    <div>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-heading)' }}>
                        {edu.degree}
                      </h3>
                      <div style={{ fontSize: '0.825rem', color: 'var(--color-text-body)', fontWeight: 500 }}>
                        {edu.institution}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 2 }}>
                        {edu.duration} {edu.grade && `| Grade: ${edu.grade}`}
                      </div>
                    </div>

                    <div className="item-action-btns">
                      <button
                        type="button"
                        className="icon-btn-ghost"
                        onClick={() => handleOpenEditEdu(edu)}
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        type="button"
                        className="icon-btn-ghost delete"
                        onClick={() => handleDeleteEdu(edu.id)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>No education records added.</div>
              )}
            </div>
          </div>

          {/* 7. PROJECTS SECTION */}
          <div className="profile-section-card">
            <div className="section-card-header">
              <h2 className="section-card-title">
                <FolderGit2 size={20} color="var(--color-primary)" /> Key Projects
              </h2>
              <button
                type="button"
                className="btn-nav btn-outline"
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
                onClick={handleOpenAddProj}
              >
                <Plus size={14} style={{ marginRight: 4 }} /> Add Project
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {profile.projects && profile.projects.length > 0 ? (
                profile.projects.map((proj) => (
                  <div key={proj.id} className="profile-item-row">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-heading)' }}>
                          {proj.name}
                        </h3>
                        {proj.link && (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center' }}
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                        Tech Stack: {proj.tech}
                      </div>
                      <p style={{ fontSize: '0.825rem', color: 'var(--color-text-body)', marginTop: 4, lineHeight: 1.5 }}>
                        {proj.description}
                      </p>
                    </div>

                    <div className="item-action-btns">
                      <button
                        type="button"
                        className="icon-btn-ghost"
                        onClick={() => handleOpenEditProj(proj)}
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        type="button"
                        className="icon-btn-ghost delete"
                        onClick={() => handleDeleteProj(proj.id)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>No projects added.</div>
              )}
            </div>
          </div>

          {/* 8. CERTIFICATIONS SECTION */}
          <div className="profile-section-card">
            <div className="section-card-header">
              <h2 className="section-card-title">
                <Award size={20} color="var(--color-primary)" /> Certifications & Achievements
              </h2>
              <button
                type="button"
                className="btn-nav btn-outline"
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
                onClick={handleOpenAddCert}
              >
                <Plus size={14} style={{ marginRight: 4 }} /> Add Certification
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {profile.certifications && profile.certifications.length > 0 ? (
                profile.certifications.map((cert) => (
                  <div key={cert.id} className="profile-item-row">
                    <div>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-heading)' }}>
                        {cert.title}
                      </h3>
                      <div style={{ fontSize: '0.825rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                        {cert.issuer} {cert.date && `• Issued ${cert.date}`}
                      </div>
                      {cert.credentialId && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 2 }}>
                          Credential ID: {cert.credentialId}
                        </div>
                      )}
                    </div>

                    <div className="item-action-btns">
                      <button
                        type="button"
                        className="icon-btn-ghost"
                        onClick={() => handleOpenEditCert(cert)}
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        type="button"
                        className="icon-btn-ghost delete"
                        onClick={() => handleDeleteCert(cert.id)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>No certifications added yet.</div>
              )}
            </div>
          </div>

          {/* 9. ATTACHED RESUME SECTION */}
          <div className="profile-section-card">
            <div className="section-card-header">
              <h2 className="section-card-title">
                <FileText size={20} color="var(--color-primary)" /> Resume Document
              </h2>
            </div>

            <div className="resume-file-card">
              <div className="flex items-center gap-3">
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 8,
                    backgroundColor: 'var(--color-primary)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FileText size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-heading)' }}>
                    {profile.resume.fileName}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    Size: {profile.resume.fileSize} • Last updated {profile.resume.lastUpdated}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="#download"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast(`Downloading ${profile.resume.fileName}...`);
                  }}
                  className="btn-nav btn-outline"
                  style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
                >
                  <Download size={14} style={{ marginRight: 4 }} /> Download
                </a>

                <label className="btn-nav btn-primary" style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem', cursor: 'pointer' }}>
                  <UploadCloud size={14} style={{ marginRight: 4 }} /> Upload New PDF
                  <input
                    type="file"
                    accept=".pdf,.docx"
                    style={{ display: 'none' }}
                    onChange={handleSimulateResumeUpload}
                  />
                </label>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* EDIT HEADER MODAL */}
      {isEditHeaderOpen && (
        <div className="app-modal-overlay" onClick={() => setIsEditHeaderOpen(false)}>
          <div className="app-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="app-modal-header">
              <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, color: 'var(--color-text-heading)' }}>
                Edit Personal Information & Bio
              </h3>
              <button
                type="button"
                className="app-modal-close"
                onClick={() => setIsEditHeaderOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveHeader} className="flex flex-col gap-3">
              <div className="form-group">
                <label className="form-label required">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={headerFormData.name}
                  onChange={(e) => setHeaderFormData({ ...headerFormData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label required">Professional Headline / Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={headerFormData.title}
                  onChange={(e) => setHeaderFormData({ ...headerFormData, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-input"
                    value={headerFormData.location}
                    onChange={(e) => setHeaderFormData({ ...headerFormData, location: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-input"
                    value={headerFormData.phone}
                    onChange={(e) => setHeaderFormData({ ...headerFormData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">About / Bio</label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  value={headerFormData.bio}
                  onChange={(e) => setHeaderFormData({ ...headerFormData, bio: e.target.value })}
                />
              </div>

              <div className="flex items-center justify-end gap-2" style={{ marginTop: '0.5rem' }}>
                <button
                  type="button"
                  className="btn-nav btn-outline"
                  onClick={() => setIsEditHeaderOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-nav btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDUCATION MODAL */}
      {isEduModalOpen && (
        <div className="app-modal-overlay" onClick={() => setIsEduModalOpen(false)}>
          <div className="app-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="app-modal-header">
              <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, color: 'var(--color-text-heading)' }}>
                {editingEduId ? 'Edit Education' : 'Add Education'}
              </h3>
              <button
                type="button"
                className="app-modal-close"
                onClick={() => setIsEduModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEdu} className="flex flex-col gap-3">
              <div className="form-group">
                <label className="form-label required">Degree / Specialization</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. B.Tech in Computer Science"
                  value={eduForm.degree}
                  onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label required">College / University</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. IIT Madras"
                  value={eduForm.institution}
                  onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                  required
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Duration</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="2020 - 2024"
                    value={eduForm.duration}
                    onChange={(e) => setEduForm({ ...eduForm, duration: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Grade / CGPA</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="8.8 CGPA"
                    value={eduForm.grade}
                    onChange={(e) => setEduForm({ ...eduForm, grade: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2" style={{ marginTop: '0.5rem' }}>
                <button
                  type="button"
                  className="btn-nav btn-outline"
                  onClick={() => setIsEduModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-nav btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EXPERIENCE MODAL */}
      {isExpModalOpen && (
        <div className="app-modal-overlay" onClick={() => setIsExpModalOpen(false)}>
          <div className="app-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="app-modal-header">
              <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, color: 'var(--color-text-heading)' }}>
                {editingExpId ? 'Edit Work Experience' : 'Add Work Experience'}
              </h3>
              <button
                type="button"
                className="app-modal-close"
                onClick={() => setIsExpModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveExp} className="flex flex-col gap-3">
              <div className="form-group">
                <label className="form-label required">Job Role Title</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Frontend Developer"
                  value={expForm.role}
                  onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label required">Company Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Infosys Labs"
                  value={expForm.company}
                  onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                  required
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Duration</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Jul 2024 - Present"
                    value={expForm.duration}
                    onChange={(e) => setExpForm({ ...expForm, duration: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Bengaluru, India"
                    value={expForm.location}
                    onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Key Responsibilities / Achievements</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={expForm.description}
                  onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                />
              </div>

              <div className="flex items-center justify-end gap-2" style={{ marginTop: '0.5rem' }}>
                <button
                  type="button"
                  className="btn-nav btn-outline"
                  onClick={() => setIsExpModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-nav btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PROJECT MODAL */}
      {isProjModalOpen && (
        <div className="app-modal-overlay" onClick={() => setIsProjModalOpen(false)}>
          <div className="app-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="app-modal-header">
              <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, color: 'var(--color-text-heading)' }}>
                {editingProjId ? 'Edit Project' : 'Add Project'}
              </h3>
              <button
                type="button"
                className="app-modal-close"
                onClick={() => setIsProjModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProj} className="flex flex-col gap-3">
              <div className="form-group">
                <label className="form-label required">Project Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. JobDekho Portal"
                  value={projForm.name}
                  onChange={(e) => setProjForm({ ...projForm, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label required">Technologies Used</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="React, TypeScript, Node.js"
                  value={projForm.tech}
                  onChange={(e) => setProjForm({ ...projForm, tech: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Project URL / GitHub Link</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="https://github.com/..."
                  value={projForm.link}
                  onChange={(e) => setProjForm({ ...projForm, link: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={projForm.description}
                  onChange={(e) => setProjForm({ ...projForm, description: e.target.value })}
                />
              </div>

              <div className="flex items-center justify-end gap-2" style={{ marginTop: '0.5rem' }}>
                <button
                  type="button"
                  className="btn-nav btn-outline"
                  onClick={() => setIsProjModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-nav btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CERTIFICATION MODAL */}
      {isCertModalOpen && (
        <div className="app-modal-overlay" onClick={() => setIsCertModalOpen(false)}>
          <div className="app-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="app-modal-header">
              <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, color: 'var(--color-text-heading)' }}>
                {editingCertId ? 'Edit Certification' : 'Add Certification'}
              </h3>
              <button
                type="button"
                className="app-modal-close"
                onClick={() => setIsCertModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveCert} className="flex flex-col gap-3">
              <div className="form-group">
                <label className="form-label required">Certification Title</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. AWS Certified Developer"
                  value={certForm.title}
                  onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label required">Issuing Organization</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Amazon Web Services"
                  value={certForm.issuer}
                  onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                  required
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Issue Date</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Mar 2024"
                    value={certForm.date}
                    onChange={(e) => setCertForm({ ...certForm, date: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Credential ID</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="AWS-12345"
                    value={certForm.credentialId}
                    onChange={(e) => setCertForm({ ...certForm, credentialId: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2" style={{ marginTop: '0.5rem' }}>
                <button
                  type="button"
                  className="btn-nav btn-outline"
                  onClick={() => setIsCertModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-nav btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
