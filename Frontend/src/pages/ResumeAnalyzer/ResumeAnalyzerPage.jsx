import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  FileText,
  X,
  Sparkles,
  Award,
  AlertCircle,
  FileCheck2,
  TrendingUp,
  Search,
  CheckCircle2,
} from 'lucide-react';
import './ResumeAnalyzerPage.css';

/**
 * ResumeAnalyzerPage Component
 * AI Resume Analyzer upload page with drag-and-drop, validation, feature breakdown, and analysis simulation
 */
function ResumeAnalyzerPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingStep, setLoadingStep] = useState('Scanning resume structure...');

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit
  const ALLOWED_TYPES = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
  ];
  const ALLOWED_EXTENSIONS = ['.pdf', '.docx', '.doc'];

  const validateAndSetFile = (file) => {
    setError('');

    if (!file) return;

    // Check extension / mime type
    const fileName = file.name.toLowerCase();
    const isExtensionValid = ALLOWED_EXTENSIONS.some((ext) => fileName.endsWith(ext));
    const isMimeValid = ALLOWED_TYPES.includes(file.type);

    if (!isExtensionValid && !isMimeValid) {
      setError('Invalid file format. Please upload a PDF or DOCX file.');
      setSelectedFile(null);
      return;
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setError('File size exceeds the maximum limit of 5MB.');
      setSelectedFile(null);
      return;
    }

    // Format file size
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    setSelectedFile({
      rawFile: file,
      name: file.name,
      size: `${sizeInMB} MB`,
      extension: fileName.endsWith('.pdf') ? 'PDF' : 'DOCX',
    });
  };

  // Drag and Drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Start analysis simulation
  const handleStartAnalysis = () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setLoadingStep('Scanning resume structure & layout...');

    setTimeout(() => {
      setLoadingStep('Extracting technical skills & competencies...');
    }, 600);

    setTimeout(() => {
      setLoadingStep('Calculating ATS compliance score...');
    }, 1200);

    setTimeout(() => {
      setIsAnalyzing(false);
      navigate('/resume-analyzer/result');
    }, 1800);
  };

  return (
    <div className="analyzer-page">
      <div className="analyzer-container">
        {/* TOP SECTION */}
        <header className="analyzer-header">
          <h1 className="analyzer-title">Analyze Your Resume</h1>
          <p className="analyzer-desc">
            Upload your resume and get instant AI insights into your skills, strengths, and areas for improvement.
          </p>
        </header>

        {/* MAIN LAYOUT */}
        <div className="upload-grid-layout">
          {/* LEFT COLUMN: UPLOAD CARD / LOADING CARD */}
          <div className="upload-card-box">
            {isAnalyzing ? (
              /* Simulated Loading Overlay */
              <div className="scanning-overlay-card">
                <div className="scanning-spinner" />
                <div className="flex items-center gap-2">
                  <Sparkles size={20} color="var(--color-primary)" />
                  <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 700, color: 'var(--color-text-heading)' }}>
                    AI Resume Scan in Progress
                  </h3>
                </div>
                <p style={{ fontSize: 'var(--font-sm)', color: 'var(--color-primary)', fontWeight: 600 }}>
                  {loadingStep}
                </p>
                <p style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-muted)' }}>
                  This will take only a moment. Do not close this page.
                </p>
              </div>
            ) : (
              /* Normal Upload Area */
              <>
                <h3
                  style={{
                    fontSize: 'var(--font-lg)',
                    fontWeight: 700,
                    color: 'var(--color-text-heading)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  Upload Resume File
                </h3>

                {/* Error Alert Banner */}
                {error && (
                  <div className="upload-error-alert">
                    <AlertCircle size={18} />
                    <span>{error}</span>
                  </div>
                )}

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.doc"
                  style={{ display: 'none' }}
                  onChange={handleFileInputChange}
                />

                {!selectedFile ? (
                  /* Drag and Drop Zone */
                  <div
                    className={`dropzone-box ${isDragging ? 'dragging' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleBrowseClick}
                  >
                    <div className="dropzone-icon-wrap">
                      <UploadCloud size={32} />
                    </div>

                    <div className="dropzone-title">Drag and drop your resume here</div>

                    <p className="dropzone-subtext">
                      or <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>browse files</span> from your computer
                    </p>

                    <span className="dropzone-specs">Supports PDF, DOCX (Max size: 5MB)</span>
                  </div>
                ) : (
                  /* File Selected Details Card */
                  <div className="flex flex-col gap-4">
                    <div className="file-selected-card">
                      <div className="file-info-left">
                        <div className="file-badge-icon">
                          <FileText size={22} />
                        </div>
                        <div>
                          <div className="file-name-text">{selectedFile.name}</div>
                          <div className="file-meta-text">
                            {selectedFile.extension} Document • {selectedFile.size}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="btn-file-remove"
                        onClick={handleRemoveFile}
                        title="Remove selected file"
                        aria-label="Remove file"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <button
                      type="button"
                      className="btn-nav btn-primary full-width"
                      style={{ height: '48px', fontSize: '1rem', fontWeight: 600 }}
                      onClick={handleStartAnalysis}
                    >
                      <Sparkles size={18} style={{ marginRight: 6 }} />
                      Analyze Resume Now
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* RIGHT COLUMN: "What you'll get" INFORMATIONAL CARD */}
          <div className="features-info-card">
            <h3 className="info-card-title">
              <Sparkles size={20} color="var(--color-primary)" />
              What you'll get
            </h3>

            <div className="benefits-list">
              <div className="benefit-item">
                <div className="benefit-icon-box">
                  <FileCheck2 size={18} />
                </div>
                <div>
                  <h4 className="benefit-title">Resume Score</h4>
                  <p className="benefit-desc">
                    Get an overall 0-100 score measuring ATS readability, formatting, and structural completeness.
                  </p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon-box">
                  <Award size={18} />
                </div>
                <div>
                  <h4 className="benefit-title">Skills Analysis</h4>
                  <p className="benefit-desc">
                    Automatic extraction of hard technical stack skills, frameworks, and soft competencies.
                  </p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon-box">
                  <Search size={18} />
                </div>
                <div>
                  <h4 className="benefit-title">Missing Skills</h4>
                  <p className="benefit-desc">
                    Identify keyword gaps in your resume to match recruiter search filters for top tech roles.
                  </p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon-box">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <h4 className="benefit-title">Job Match</h4>
                  <p className="benefit-desc">
                    Calculate role fit percentages across Software Engineer, Full Stack, and Product positions.
                  </p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon-box">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h4 className="benefit-title">Improvement Suggestions</h4>
                  <p className="benefit-desc">
                    Actionable, step-by-step recommendations to optimize your bullet points and boost callback rates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeAnalyzerPage;
