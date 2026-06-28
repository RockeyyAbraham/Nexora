import { useState } from 'react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do not add any API calls or navigation logic yet. Just the converted design.
  };

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden min-h-screen relative">
      {/* Background Image Layer */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-black/10 z-10"></div>
        <img
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida/AP1WRLsqbgCS_px2jeV3JZmSNbFLajcsfLV_DNMPwCUkXS-WCtvwtrFm6fLL0C06o2whR-_9vW5hzlOXBRDr07XKsKp_AoNR94Ya5uSM0pwXRjocPxr24xDmfPzkImNmiLx7yxV6LxpEHzZEaCf4lNmIOognb2NxAgb3Pr1hAM-Tg4J8yRCrFDwnbJNiJZSejwHV9qCew5dp2m9nGchv0bwE-cVSub6dDQ_PpFC6iSkKTO4D31sIEFJ5YCrOYUQ"
          alt=""
        />
      </div>

      {/* Main Content Canvas */}
      <main className="relative z-20 min-h-screen flex items-center justify-center p-gutter">
        {/* Registration Card */}
        <div className="glass-card w-full max-w-[480px] rounded-xl p-lg shadow-xl animate-in fade-in zoom-in duration-700">
          {/* Branding Header */}
          <div className="flex flex-col items-center text-center mb-xl">
            <div className="flex items-center gap-sm mb-base">
              <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">DairyDirect</h1>
            </div>
            <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">
              Create your account
            </p>
            <div className="w-12 h-1 bg-primary/20 rounded-full mt-sm"></div>
          </div>

          {/* Registration Form */}
          <form className="space-y-md" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface-variant ml-xs" htmlFor="name">
                Full Name
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                  person
                </span>
                <input
                  className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest/50 border border-outline-variant rounded-lg focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-body-md font-body-md"
                  id="name"
                  placeholder="John Doe"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface-variant ml-xs" htmlFor="email">
                Email Address
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                  mail
                </span>
                <input
                  className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest/50 border border-outline-variant rounded-lg focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-body-md font-body-md"
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Grid for Phone and Address (Desktop only, Stacked Mobile) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              {/* Phone Field */}
              <div className="space-y-xs">
                <label className="font-label-md text-label-md text-on-surface-variant ml-xs" htmlFor="phone">
                  Phone
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                    call
                  </span>
                  <input
                    className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest/50 border border-outline-variant rounded-lg focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-body-md font-body-md"
                    id="phone"
                    placeholder="+1 234..."
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-xs">
                <label className="font-label-md text-label-md text-on-surface-variant ml-xs" htmlFor="password">
                  Password
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                    lock
                  </span>
                  <input
                    className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest/50 border border-outline-variant rounded-lg focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-body-md font-body-md"
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Address Field */}
            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface-variant ml-xs" htmlFor="address">
                Delivery Address
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                  location_on
                </span>
                <input
                  className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest/50 border border-outline-variant rounded-lg focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-body-md font-body-md"
                  id="address"
                  placeholder="123 Farm Lane, Fresh Hills"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            {/* Register Button */}
            <div className="pt-sm">
              <button
                className="w-full py-4 bg-primary text-on-primary font-label-md text-label-md rounded-lg shadow-sm hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-base"
                type="submit"
              >
                Register
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </form>

          {/* Footer Link */}
          <div className="mt-lg text-center">
            <p className="font-body-md text-body-md text-on-surface-variant">
              Already have an account?
              <a className="text-primary font-bold hover:underline ml-xs transition-all" href="#">
                Login
              </a>
            </p>
          </div>

          {/* Trust Badge (Optional Micro-Interaction) */}
          <div className="mt-xl flex items-center justify-center gap-md opacity-60">
            <div className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              <span className="text-[10px] font-label-sm uppercase tracking-tighter">Secure Data</span>
            </div>
            <div className="w-1 h-1 bg-outline-variant rounded-full"></div>
            <div className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px]">eco</span>
              <span className="text-[10px] font-label-sm uppercase tracking-tighter">Eco-Friendly</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
