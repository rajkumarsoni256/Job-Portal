import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Building2,
  MapPin,
  Users,
  ChevronRight,
  Filter,
  X,
} from 'lucide-react';
import { COMPANIES_DATA } from '../../data/companies';
import './CompaniesPage.css';

function CompaniesPage() {
  const navigate = useNavigate();

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');

  // Filter Logic
  const filteredCompanies = useMemo(() => {
    return COMPANIES_DATA.filter((comp) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const nameMatch = comp.name.toLowerCase().includes(q);
        const descMatch = comp.shortDescription.toLowerCase().includes(q);
        const indMatch = comp.industry.toLowerCase().includes(q);
        if (!nameMatch && !descMatch && !indMatch) return false;
      }

      // Industry Filter
      if (selectedIndustry !== 'all' && !comp.industry.includes(selectedIndustry)) {
        return false;
      }

      // Location Filter
      if (selectedLocation !== 'all' && !comp.location.includes(selectedLocation)) {
        return false;
      }

      // Company Size Filter
      if (selectedSize !== 'all' && !comp.size.includes(selectedSize)) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedIndustry, selectedLocation, selectedSize]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedIndustry('all');
    setSelectedLocation('all');
    setSelectedSize('all');
  };

  return (
    <div className="companies-page">
      {/* 1. TOP HEADER BANNER */}
      <section className="companies-header-banner">
        <div className="companies-header-container">
          <h1 className="companies-title">Explore Companies</h1>
          <p className="companies-desc">
            Discover top technology enterprises, global product leaders, and fast-growing startups hiring now.
          </p>

          {/* Search Box */}
          <div className="companies-search-box">
            <div className="companies-search-input-group">
              <Search size={20} color="var(--color-primary)" />
              <input
                type="text"
                placeholder="Search company by name, industry, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN BODY & FILTERS TOOLBAR */}
      <div className="companies-body-container">
        <div className="companies-filters-bar">
          <div className="filter-dropdowns-row">
            <span className="flex items-center gap-1" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-heading)' }}>
              <Filter size={15} /> Filter By:
            </span>

            {/* Industry Filter */}
            <select
              className="company-filter-select"
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
            >
              <option value="all">Industry: All Industries</option>
              <option value="Technology">Technology / Software</option>
              <option value="AI">AI & Cloud Computing</option>
              <option value="E-Commerce">E-Commerce & Retail</option>
              <option value="Fintech">Fintech & Payments</option>
              <option value="IT Services">IT Services & Consulting</option>
              <option value="Consumer Internet">Consumer Internet</option>
            </select>

            {/* Location Filter */}
            <select
              className="company-filter-select"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="all">Location: All Cities</option>
              <option value="Bengaluru">Bengaluru, India</option>
              <option value="Gurugram">Gurugram, India</option>
              <option value="Mumbai">Mumbai, India</option>
              <option value="Mountain View">Mountain View, CA</option>
              <option value="Redmond">Redmond, WA</option>
              <option value="Seattle">Seattle, WA</option>
            </select>

            {/* Company Size Filter */}
            <select
              className="company-filter-select"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="all">Company Size: Any Size</option>
              <option value="500-5,000">500 - 5,000 employees</option>
              <option value="10,000+">10,000+ employees</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Showing <strong>{filteredCompanies.length}</strong> companies
            </span>
            {(selectedIndustry !== 'all' || selectedLocation !== 'all' || selectedSize !== 'all' || searchQuery) && (
              <button
                type="button"
                className="btn-nav btn-outline"
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
                onClick={handleResetFilters}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* 3. COMPANIES CARDS GRID */}
        {filteredCompanies.length > 0 ? (
          <div className="companies-grid">
            {filteredCompanies.map((comp) => (
              <div key={comp.id} className="company-card">
                <div className="flex flex-col gap-3">
                  <div className="company-card-top">
                    <div className="flex items-center gap-3">
                      <div
                        className="company-logo-avatar"
                        style={{ backgroundColor: comp.logoBg }}
                      >
                        {comp.initial}
                      </div>
                      <div>
                        <h2 className="company-name">{comp.name}</h2>
                        <div className="company-industry-tag">{comp.industry}</div>
                      </div>
                    </div>

                    <span className="open-jobs-badge">
                      {comp.openJobsCount} Open Jobs
                    </span>
                  </div>

                  <div className="flex items-center gap-3" style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                    <span className="flex items-center gap-1">
                      <MapPin size={13} /> {comp.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Users size={13} /> {comp.size}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-body)', lineHeight: 1.5 }}>
                    {comp.shortDescription}
                  </p>
                </div>

                <button
                  type="button"
                  className="btn-nav btn-outline full-width"
                  style={{ marginTop: '0.75rem', justifyContent: 'center' }}
                  onClick={() => navigate(`/companies/${comp.id}`)}
                >
                  View Company Profile <ChevronRight size={16} style={{ marginLeft: 4 }} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
            <Building2 size={36} color="var(--color-text-muted)" style={{ margin: '0 auto 0.75rem auto' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-heading)' }}>
              No companies match your filters
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: 4 }}>
              Try loosening your search terms or clearing selected industry and location filters.
            </p>
            <button
              type="button"
              className="btn-nav btn-primary"
              style={{ marginTop: '1rem' }}
              onClick={handleResetFilters}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CompaniesPage;
