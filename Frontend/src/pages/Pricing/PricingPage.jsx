import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check,
  Zap,
  Star,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Building2,
} from 'lucide-react';
import { Container, SectionHeader, Button, Card, Badge } from '../../components/common';
import './PricingPage.css';

/**
 * Pricing Page Component
 * Module 21 — Recruitment tier packages & pricing for employers
 */
function PricingPage() {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annually'
  const [selectedPlanMsg, setSelectedPlanMsg] = useState('');

  const handlePlanSelect = (planName, targetRoute) => {
    if (targetRoute === '/contact') {
      navigate('/contact');
    } else if (targetRoute === '/register') {
      navigate('/register');
    } else {
      setSelectedPlanMsg(`You selected the ${planName} Plan! Redirecting to Recruiter Dashboard...`);
      setTimeout(() => {
        navigate('/recruiter/dashboard');
      }, 1200);
    }
  };

  const plans = [
    {
      name: 'STARTER',
      tagline: 'Ideal for small businesses & individual recruiters',
      priceMonthly: 'Free',
      priceAnnually: 'Free',
      isPopular: false,
      buttonText: 'Get Started',
      buttonVariant: 'outline',
      targetRoute: '/register',
      features: [
        '1 active job',
        'Basic candidate management',
        'Application tracking',
        'Basic recruiter dashboard',
      ],
    },
    {
      name: 'PROFESSIONAL',
      tagline: 'Best for growing teams & active hiring needs',
      priceMonthly: '₹2,999',
      pricePeriod: '/month',
      priceAnnually: '₹2,499',
      isPopular: true,
      popularBadge: 'Most Popular',
      buttonText: 'Choose Professional',
      buttonVariant: 'primary',
      targetRoute: '/recruiter/dashboard',
      features: [
        '10 active jobs',
        'Advanced candidate search',
        'Resume insights',
        'Candidate matching',
        'Application management',
        'Hiring analytics',
      ],
    },
    {
      name: 'BUSINESS',
      tagline: 'For large enterprises & scaling organizations',
      priceMonthly: '₹7,999',
      pricePeriod: '/month',
      priceAnnually: '₹6,499',
      isPopular: false,
      buttonText: 'Contact Sales',
      buttonVariant: 'outline',
      targetRoute: '/contact',
      features: [
        'Unlimited jobs',
        'Advanced candidate matching',
        'Advanced analytics',
        'Priority support',
        'Company branding',
        'Recruiter team management',
      ],
    },
  ];

  // Plan Comparison Matrix
  const comparisonFeatures = [
    { feature: 'Active Job Listings', starter: '1 Job', pro: '10 Jobs', business: 'Unlimited' },
    { feature: 'Candidate Resume Search', starter: 'Basic', pro: 'Advanced Filter', business: 'Full AI Database' },
    { feature: 'Resume Insights & Parsing', starter: '❌', pro: 'Included', business: 'Advanced AI' },
    { feature: 'Skill & Role Matching', starter: 'Basic', pro: 'Included', business: 'Automated AI Match' },
    { feature: 'Recruitment Analytics', starter: 'Basic', pro: 'Detailed Reports', business: 'Custom Analytics' },
    { feature: 'Team Seats', starter: '1 Recruiter', pro: '3 Recruiters', business: 'Unlimited' },
    { feature: 'Employer Branding', starter: 'Standard', pro: 'Enhanced Logo & Profile', business: 'Custom Branded Hub' },
    { feature: 'Support Level', starter: 'Community', pro: 'Standard Email', business: '24/7 Priority VIP' },
  ];

  return (
    <div className="pricing-page-wrapper">
      {/* HERO SECTION */}
      <section className="pricing-hero-section">
        <Container size="xl">
          <div className="pricing-hero-content text-center">
            <Badge variant="primary" className="pricing-badge">
              <Zap size={14} /> Transparent Recruitment Pricing
            </Badge>

            <h1 className="pricing-hero-title">
              Simple Plans for Every Hiring Need
            </h1>

            <p className="pricing-hero-subtitle">
              Choose the right plan for your recruitment goals.
            </p>

            {selectedPlanMsg && (
              <div className="plan-alert-banner">
                <Sparkles size={18} /> {selectedPlanMsg}
              </div>
            )}

            {/* Billing Toggle (Monthly / Annual Discount) */}
            <div className="billing-toggle-container">
              <button
                type="button"
                className={`billing-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
                onClick={() => setBillingCycle('monthly')}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                className={`billing-btn ${billingCycle === 'annually' ? 'active' : ''}`}
                onClick={() => setBillingCycle('annually')}
              >
                Annual Billing <span className="discount-pill">Save 20%</span>
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* PRICING CARDS SECTION */}
      <section className="pricing-cards-section">
        <Container size="xl">
          <div className="pricing-cards-grid">
            {plans.map((plan, idx) => {
              const displayPrice = billingCycle === 'annually' ? plan.priceAnnually : plan.priceMonthly;

              return (
                <div
                  key={idx}
                  className={`pricing-card-wrapper ${plan.isPopular ? 'popular-wrapper' : ''}`}
                >
                  {plan.isPopular && (
                    <div className="popular-top-badge">
                      <Star size={14} fill="currentColor" /> {plan.popularBadge}
                    </div>
                  )}

                  <Card
                    variant="default"
                    padding="lg"
                    className={`pricing-card ${plan.isPopular ? 'popular-card' : ''}`}
                  >
                    <Card.Header>
                      <div className="plan-header-top">
                        <h3 className="plan-name">{plan.name}</h3>
                        {plan.isPopular && <Badge variant="warning">Recommended</Badge>}
                      </div>
                      <p className="plan-tagline">{plan.tagline}</p>

                      <div className="plan-price-block">
                        <span className="plan-price">{displayPrice}</span>
                        {plan.pricePeriod && (
                          <span className="plan-period">{plan.pricePeriod}</span>
                        )}
                      </div>
                    </Card.Header>

                    <Card.Body>
                      <div className="plan-features-list">
                        <span className="features-header">WHAT'S INCLUDED:</span>
                        <ul>
                          {plan.features.map((feat, fIdx) => (
                            <li key={fIdx}>
                              <Check size={18} className="feat-check-icon" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Card.Body>

                    <Card.Footer>
                      <Button
                        variant={plan.buttonVariant}
                        fullWidth
                        size="lg"
                        onClick={() => handlePlanSelect(plan.name, plan.targetRoute)}
                      >
                        {plan.buttonText}
                      </Button>
                    </Card.Footer>
                  </Card>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* COMPARISON / BENEFITS SECTION */}
      <section className="pricing-comparison-section">
        <Container size="xl">
          <SectionHeader
            title="Compare Plan Features & Capabilities"
            description="Detailed comparison of feature limits across all JobDekho employer packages."
            className="text-center-header"
          />

          <div className="comparison-table-wrapper table-responsive-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th className="feature-col">Feature Comparison</th>
                  <th>Starter (Free)</th>
                  <th className="highlight-col">Professional (₹2,999/mo)</th>
                  <th>Business (₹7,999/mo)</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, idx) => (
                  <tr key={idx}>
                    <td className="feature-name">{row.feature}</td>
                    <td>{row.starter}</td>
                    <td className="highlight-col font-semibold">{row.pro}</td>
                    <td>{row.business}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* WHY CHOOSE JOBDEKHO RECRUITMENT */}
      <section className="pricing-benefits-section">
        <Container size="xl">
          <div className="benefits-trust-grid">
            <div className="trust-card">
              <ShieldCheck size={32} className="trust-icon text-primary" />
              <h4>Zero Hidden Fees</h4>
              <p>Transparent pricing with full access to shortlisted profiles without per-hire commission charges.</p>
            </div>
            <div className="trust-card">
              <Sparkles size={32} className="trust-icon text-warning" />
              <h4>AI Resume Insights</h4>
              <p>Evaluate applicant resumes instantly with smart score breakdown and skill matching.</p>
            </div>
            <div className="trust-card">
              <Building2 size={32} className="trust-icon text-info" />
              <h4>Enterprise Ready</h4>
              <p>Dedicated team workspaces, applicant notes, and multi-recruiter authorization.</p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default PricingPage;
