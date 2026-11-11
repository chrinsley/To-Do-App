export default function AuthPage({ mode }) {
  const isSignup = mode === 'signup'

  return (
    <main className="auth-page">
      <section className="auth-showcase">
        <a className="auth-brand" href="/" aria-label="TaskFlow home">
          <span className="nav-logo">✓</span>
          <span>TaskFlow</span>
        </a>

        <div className="auth-showcase-content">
          <span className="auth-eyebrow">A little more focus, every day</span>
          <h1>Make room for what matters.</h1>
          <p>
            Keep your plans clear, your priorities close, and your progress in
            sight.
          </p>
          <div className="auth-preview" aria-hidden="true">
            <div className="auth-preview-header">
              <span>Today&apos;s focus</span>
              <span className="auth-preview-count">2 of 3</span>
            </div>
            <div className="auth-preview-progress">
              <span />
            </div>
            <div className="auth-preview-task">
              <span className="auth-preview-check">✓</span>
              <span className="auth-preview-done">Plan the week ahead</span>
            </div>
            <div className="auth-preview-task">
              <span className="auth-preview-check">✓</span>
              <span className="auth-preview-done">Reply to project notes</span>
            </div>
            <div className="auth-preview-task">
              <span className="auth-preview-empty" />
              <span>Take a proper lunch break</span>
            </div>
          </div>
        </div>

        <p className="auth-showcase-footer">Small steps add up.</p>
      </section>

      <section className="auth-panel">
        <div className="auth-form-wrap">
          <div className="auth-mobile-brand">
            <span className="nav-logo">✓</span>
            <span>TaskFlow</span>
          </div>
          <span className="auth-eyebrow">{isSignup ? 'Get started' : 'Welcome back'}</span>
          <h2>{isSignup ? 'Create your account' : 'Sign in to TaskFlow'}</h2>
          <p className="auth-description">
            {isSignup
              ? 'Create a space for your next great day.'
              : 'Pick up right where you left off.'}
          </p>

          <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
            {isSignup && (
              <label className="auth-field">
                <span>Full name</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  autoComplete="name"
                  required
                />
              </label>
            )}
            <label className="auth-field">
              <span>Email address</span>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>
            <label className="auth-field">
              <span>Password</span>
              <input
                type="password"
                name="password"
                placeholder={isSignup ? 'At least 8 characters' : 'Enter your password'}
                autoComplete={isSignup ? 'new-password' : 'current-password'}
                minLength={isSignup ? 8 : undefined}
                required
              />
            </label>

            {isSignup ? (
              <label className="auth-terms">
                <input type="checkbox" required />
                <span>
                  I agree to the <a href="#terms">Terms of Service</a> and{' '}
                  <a href="#privacy">Privacy Policy</a>
                </span>
              </label>
            ) : (
              <div className="auth-form-options">
                <label className="auth-remember">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#forgot-password">Forgot password?</a>
              </div>
            )}

            <button type="submit" className="auth-submit">
              {isSignup ? 'Create account' : 'Sign in'}
              <span aria-hidden="true">→</span>
            </button>
          </form>

          <div className="auth-divider"><span>or continue with</span></div>
          <button type="button" className="auth-google">
            <span className="auth-google-mark" aria-hidden="true">G</span>
            Google
          </button>

          <p className="auth-switch">
            {isSignup ? 'Already have an account?' : 'New to TaskFlow?'}{' '}
            <a href={isSignup ? '/login' : '/signup'}>
              {isSignup ? 'Sign in' : 'Create an account'}
            </a>
          </p>
        </div>
        <p className="auth-legal">© 2026 TaskFlow. Your day, your way.</p>
      </section>
    </main>
  )
}
