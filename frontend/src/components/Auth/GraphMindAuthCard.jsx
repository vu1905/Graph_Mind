import React, { useState } from 'react';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import { GraphMindLogo } from '../../assets/logo/GraphMindLogo.jsx';

/**
 * GraphMind Registration / Login Card
 * Clean modern card layout tailored specifically for Graph_Mind
 * Branding: Teal #0A6E78, Cyan #7ECAC6, Dark Slate #0D1F2D
 */
export default function GraphMindAuthCard({ initialMode = 'register', onSuccess, onModeChange }) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [step, setStep] = useState(1); // 1=email, 2=password
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  React.useEffect(() => {
    setMode(initialMode);
    setStep(1);
    setIsSuccess(false);
    setEmail('');
    setPassword('');
    setAgreed(false);
  }, [initialMode]);

  const toggleMode = (newMode) => {
    setMode(newMode);
    setStep(1);
    setEmail('');
    setPassword('');
    if (onModeChange) onModeChange(newMode);
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (!email) return;

    // Register step 1: just email → advance to password step
    if (mode === 'register' && step === 1) {
      setStep(2);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        if (onSuccess) onSuccess({ email, name: email.split('@')[0] });
      }, 900);
    }, 800);
  };

  const handleSocialAuth = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        if (onSuccess) onSuccess({ email: `user@${provider.toLowerCase()}.com`, name: `${provider} User` });
      }, 800);
    }, 700);
  };

  /* ─── SUCCESS STATE ──────────────────────────────────────────── */
  if (isSuccess) {
    return (
      <div className="gm-auth-card">
        <div className="gm-success-box">
          <div className="gm-success-icon-ring">
            <CheckCircle2 size={40} color="#0A6E78" strokeWidth={2} />
          </div>
          <h3 className="gm-success-title">
            {mode === 'register' ? 'Tạo tài khoản thành công!' : 'Đăng nhập thành công!'}
          </h3>
          <p className="gm-success-sub">
            Chào mừng bạn đến với <strong>Graph_Mind</strong>. Đang kết nối không gian tri thức...
          </p>
          <div className="auth-spinner gm-spinner" />
        </div>
      </div>
    );
  }

  /* ─── MAIN CARD ──────────────────────────────────────────────── */
  return (
    <div className="gm-auth-card">
      {/* ── Logo Graph_Mind ── */}
      <div className="gm-auth-logo">
        <GraphMindLogo variant="horizontal" size={38} />
      </div>

      {/* ── Heading ── */}
      <h1 className="gm-auth-heading">
        {mode === 'register' ? 'Tạo tài khoản Graph_Mind' : 'Đăng nhập vào Graph_Mind'}
      </h1>
      <p className="gm-auth-subtext">
        {mode === 'register'
          ? 'Bắt đầu miễn phí, khai phóng đồ thị tri thức và dữ liệu doanh nghiệp'
          : 'Truy cập nền tảng quản trị tri thức và phân tích đồ thị doanh nghiệp'}
      </p>

      {/* ── Form ── */}
      <form onSubmit={handleContinue} className="gm-auth-form">

        {/* Email */}
        <input
          type="email"
          placeholder="Email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
          className="gm-auth-input"
        />

        {/* Password (step 2 or login) */}
        {(step === 2 || mode === 'login') && (
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
            className="gm-auth-input"
            style={{ marginTop: '12px' }}
          />
        )}

        {/* Checkbox (register only) */}
        {mode === 'register' && (
          <label className="gm-auth-checkbox-label">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              required
              className="gm-auth-checkbox"
            />
            <span className="gm-auth-checkbox-text">
              Tôi đồng ý với{' '}
              <a href="#terms" onClick={(e) => e.preventDefault()}>Điều khoản sử dụng</a>
              {' '}&amp;{' '}
              <a href="#privacy" onClick={(e) => e.preventDefault()}>Chính sách bảo mật</a>
              {' '}của Graph_Mind
            </span>
          </label>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading || (mode === 'register' && !agreed)}
          className="gm-auth-submit"
        >
          {isLoading
            ? 'Đang xử lý...'
            : step === 1 && mode === 'register'
              ? 'Tiếp tục'
              : mode === 'register'
                ? 'Hoàn tất đăng ký'
                : 'Đăng nhập'}
        </button>
      </form>

      {/* ── Divider ── */}
      <div className="gm-auth-divider">
        <span className="gm-auth-divider-line" />
        <span className="gm-auth-divider-text">hoặc</span>
        <span className="gm-auth-divider-line" />
      </div>

      {/* ── Social Buttons ── */}
      <div className="gm-auth-social">
        {/* Google */}
        <button type="button" className="gm-social-btn" onClick={() => handleSocialAuth('Google')}>
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>{mode === 'register' ? 'Đăng ký với Google' : 'Đăng nhập với Google'}</span>
        </button>

        {/* Apple */}
        <button type="button" className="gm-social-btn" onClick={() => handleSocialAuth('Apple')}>
          <svg width="18" height="18" viewBox="0 0 170 170" fill="#1A1A1A">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.83-7.96-12.43-14.77-6.08-8.99-10.87-19.19-14.38-30.59-3.52-11.39-5.28-22.18-5.28-32.37 0-15.66 4.14-28.77 12.43-39.34 8.28-10.57 18.59-15.97 30.9-16.2 4.35 0 9.53 1.15 15.54 3.44 6.01 2.29 9.87 3.48 11.57 3.56 1.34 0 5.37-1.32 12.09-3.96 6.72-2.64 12.35-3.79 16.89-3.44 12.51.95 22.84 5.75 30.98 14.42-10.99 6.64-16.37 15.69-16.14 27.15.24 10.02 4.14 18.25 11.71 24.69 7.57 6.44 16.59 10.08 27.05 10.92-2.34 7.27-5.06 14.77-8.15 22.48zM119.22 33.09c0-7.39 2.65-14.36 7.95-20.91 5.3-6.55 11.83-10.74 19.58-12.58.55 2.11.83 4.16.83 6.16 0 7.42-2.83 14.54-8.49 21.36-5.66 6.82-12.36 10.98-20.1 12.48-.38-2.14-.57-4.14-.57-6.51z"/>
          </svg>
          <span>{mode === 'register' ? 'Đăng ký với Apple' : 'Đăng nhập với Apple'}</span>
        </button>
      </div>

      {/* ── Switch mode ── */}
      <div className="gm-auth-switch">
        {mode === 'register' ? (
          <span>
            Đã có tài khoản Graph_Mind?{' '}
            <button type="button" onClick={() => toggleMode('login')} className="gm-auth-link-btn">
              Đăng nhập ngay
            </button>
          </span>
        ) : (
          <span>
            Chưa có tài khoản Graph_Mind?{' '}
            <button type="button" onClick={() => toggleMode('register')} className="gm-auth-link-btn">
              Đăng ký miễn phí
            </button>
          </span>
        )}
      </div>

      {/* ── Footer Bar ── */}
      <div className="gm-auth-footer">
        <div className="gm-auth-footer-legal">
          <a href="#privacy" onClick={(e) => e.preventDefault()}>Bảo mật</a>
          <a href="#terms" onClick={(e) => e.preventDefault()}>Điều khoản</a>
        </div>
        <div className="gm-auth-footer-lang">
          {/* Vietnam flag */}
          <svg width="18" height="18" viewBox="0 0 36 36" style={{ borderRadius: '50%', flexShrink: 0 }}>
            <circle fill="#DA251D" cx="18" cy="18" r="18"/>
            <polygon fill="#FFFF00" points="18,7.5 21.2,14.1 28.5,15.1 23.2,20.2 24.5,27.4 18,24 11.5,27.4 12.8,20.2 7.5,15.1 14.8,14.1"/>
          </svg>
          <span>Tiếng Việt</span>
          <ChevronDown size={14} color="#6B7280" />
        </div>
      </div>
    </div>
  );
}
