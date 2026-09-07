import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';
import { Container, Card, Input, Button } from '../../components/common';

/**
 * LoginPage Component
 */
function LoginPage() {
  return (
    <Container size="sm" style={{ paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-16)' }}>
      <Card variant="default" padding="lg">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
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
            <LogIn size={24} />
          </div>
          <h2 style={{ fontSize: 'var(--font-xl)', fontWeight: 700 }}>Welcome Back</h2>
          <p style={{ fontSize: 'var(--font-sm)', color: 'var(--color-text-muted)' }}>
            Sign in to manage your applications or candidate postings
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <Input label="Email Address" type="email" placeholder="user@example.com" iconLeft={<Mail size={16} />} required />
          <Input label="Password" type="password" placeholder="••••••••" iconLeft={<Lock size={16} />} required />

          <Button type="submit" variant="primary" fullWidth style={{ marginTop: 'var(--space-2)' }}>
            Sign In
          </Button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 'var(--space-6)', fontSize: 'var(--font-sm)', color: 'var(--color-text-muted)' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Create an account</Link>
        </p>
      </Card>
    </Container>
  );
}

export default LoginPage;
