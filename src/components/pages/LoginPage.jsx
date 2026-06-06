import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import '../auth/Auth.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: true,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/');
  };

  const handleRecoveryPassword = () => {
    navigate('/login?recovery=1');
  };

  const handleSocialLogin = (provider) => {
    sessionStorage.setItem('glassdashAuthProvider', provider);
    navigate('/');
  };

  return (
    <div className="login-page">
      <div className="login-shell">
        <section className="login-card glass-card">
          <div className="login-copy">
            <h2 className="login-kicker">GlassDash Admin</h2>
            <h1 className="login-title">Hello Again!</h1>
            <h3 className="login-subtitle">Let's understand your business better!</h3>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label className="login-field">
              <span className="login-label">Email</span>
              <input
                className="login-input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                required
              />
            </label>

            <label className="login-field">
              <span className="login-label">Password</span>
              <div className="login-password-wrap">
                <input
                  className="login-input login-password-input"
                  type={isPasswordVisible ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="login-visibility-btn"
                  onClick={() => setIsPasswordVisible((current) => !current)}
                  aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                >
                  {isPasswordVisible ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.76 10.76 0 0 1 12 20C7 20 2.73 16.11 1 12c.69-1.63 1.78-3.16 3.17-4.43" />
                      <path d="M1 1l22 22" />
                      <path d="M9.9 4.24A9.14 9.14 0 0 1 12 4c5 0 9.27 3.89 11 8-1.01 2.39-2.68 4.58-4.88 6.18" />
                      <path d="M14.12 14.12A3 3 0 0 1 9.88 9.88" />
                      <path d="M9.5 9.5 4.5 4.5" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </label>

            <div className="login-row">
              <label className="login-remember">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                />
                <span className="login-checkmark" />
                <span>Remember me</span>
              </label>

              <button type="button" className="login-link-btn">
                Forget Password
              </button>
            </div>

            <button type="submit" className="login-btn">
              Sign In
            </button>

            <div className="login-divider">Or continue with</div>


            <div className="login-social">
              <button
                type="button"
                className="login-social-btn"
                aria-label="Continue with Google"
                onClick={() => handleSocialLogin('google')}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M21.35 11.1H12v2.95h5.35c-.24 1.43-1.53 4.19-5.35 4.19-3.22 0-5.85-2.67-5.85-5.96S8.78 6.32 12 6.32c1.84 0 3.08.78 3.79 1.45l2.58-2.48C16.79 4.05 14.62 3 12 3 6.48 3 2 7.48 2 13s4.48 10 10 10c5.72 0 9.49-4.02 9.49-9.69 0-.65-.07-1.13-.14-1.62Z" />
                  <path fill="#EA4335" d="M3.19 7.98 6.2 10.2C7.02 8.12 8.98 6.32 12 6.32c1.84 0 3.08.78 3.79 1.45l2.58-2.48C16.79 4.05 14.62 3 12 3 8.16 3 4.82 5.17 3.19 7.98Z" />
                  <path fill="#FBBC05" d="M12 23c2.57 0 4.68-.85 6.25-2.3l-2.89-2.27c-.83.58-1.95 1.04-3.36 1.04-3.15 0-5.84-2.13-6.79-5.03l-3.07 2.36C4.3 20.73 7.8 23 12 23Z" />
                  <path fill="#34A853" d="M21.35 11.1H12v2.95h5.35c-.34 1.99-1.49 3.54-3 4.38l2.89 2.27C19.99 18.95 21.5 16 21.5 13c0-.65-.07-1.13-.15-1.9Z" />
                </svg>
              </button>
              <button
                type="button"
                className="login-social-btn"
                aria-label="Continue with GitHub"
                onClick={() => handleSocialLogin('github')}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.48 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.38-3.37-1.38-.45-1.18-1.1-1.49-1.1-1.49-.9-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05A9.23 9.23 0 0 1 12 7.18c.85 0 1.72.12 2.52.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.71 1.03 1.62 1.03 2.74 0 3.95-2.34 4.82-4.57 5.07.36.32.68.95.68 1.92 0 1.38-.01 2.49-.01 2.83 0 .27.18.59.69.48A10.3 10.3 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
                </svg>
              </button>
              <button
                type="button"
                className="login-social-btn login-social-btn-primary"
                aria-label="Continue with Microsoft"
                onClick={() => handleSocialLogin('microsoft')}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#F25022" d="M2 2h9v9H2z" />
                  <path fill="#7FBA00" d="M13 2h9v9h-9z" />
                  <path fill="#00A4EF" d="M2 13h9v9H2z" />
                  <path fill="#FFB900" d="M13 13h9v9h-9z" />
                </svg>
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
