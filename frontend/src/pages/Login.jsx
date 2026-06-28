import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do not add any API calls or navigation logic yet. Just the converted design.
  };

  return (
    <div
      className="bg-surface-container flex min-h-screen w-full items-center justify-center p-4"
      style={{
        backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCMFN5-8EpUp4jqLAjVpJzkltu5_KvAI2um6gig6t7mz3SkZkd-FjZJxjlL7LNbvk_FqCF-Rov7OxTblzTWMKWaf9_1iPdx34ZC1uBLRZCUP67IxU9LXsBj4GClVJEmB8VRgLuW_UguqCVVwBb0X5DFJdC0arfcpGiAQfyueFcJPkhcb2fsMWhWP2xhFj-mtGntPIcAQKPu5O4lZfhJdmFciG5cqZRmZyhie2WypWw3a-IuWJEx7Rxi7oHfwG1OludzmrE8LhuzXJQ6")',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Login Card Container */}
      <main className="w-full max-w-[440px] animate-in fade-in zoom-in duration-500">
        <div
          className="brand-shadow rounded-2xl p-md md:p-lg border overflow-hidden relative"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          {/* Branding Section */}
          <header className="text-center mb-xl">
            <div className="flex justify-center mb-sm">
              <div className="w-12 h-12 bg-primary-container/10 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-[32px]">local_shipping</span>
              </div>
            </div>
            <h1 className="font-headline-md text-headline-md text-primary mb-xs">DairyDirect</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Sign in to your account</p>
          </header>

          {/* Login Form */}
          <form className="space-y-md" id="loginForm" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface ml-1" htmlFor="email">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-[20px] group-focus-within:text-primary transition-colors">
                    mail
                  </span>
                </div>
                <input
                  className="block w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline/60 input-focus-glow transition-all"
                  id="email"
                  name="email"
                  placeholder="name@company.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface ml-1" htmlFor="password">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-[20px] group-focus-within:text-primary transition-colors">
                    lock
                  </span>
                </div>
                <input
                  className="block w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline/60 input-focus-glow transition-all"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Login Button */}
            <div className="pt-2">
              <button
                className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md py-3.5 px-6 rounded-lg shadow-sm hover:shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                id="loginBtn"
                type="submit"
              >
                <span>Login</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          </form>

          {/* Footer Link */}
          <footer className="mt-xl pt-md border-t border-outline-variant/30 text-center">
            <p className="font-label-md text-label-md text-on-surface-variant">
              Don't have an account?{' '}
              <a className="text-primary font-bold hover:underline transition-all decoration-2 underline-offset-4" href="#">
                Register
              </a>
            </p>
          </footer>

          {/* Subtle background branding element */}
          <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        {/* System Status Footer (Minimalist) */}
        <div
          className="mt-md flex justify-center items-center gap-md rounded-full px-4 py-2 mx-auto w-fit"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          <div className="flex items-center gap-xs">
            <div className="w-1.5 h-1.5 bg-tertiary rounded-full animate-pulse"></div>
            <span className="font-label-sm text-label-sm text-outline">System Online</span>
          </div>
          <div className="w-1 h-1 bg-outline-variant rounded-full"></div>
          <span className="font-label-sm text-label-sm text-outline">v2.4.0-stable</span>
        </div>
      </main>
    </div>
  );
}
