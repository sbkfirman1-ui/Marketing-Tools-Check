import React, { useState } from 'react';
import { ShieldAlert, User, Key, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Username dan password wajib diisi.');
      return;
    }

    setLoading(true);

    // Simulate network delay for premium feel
    setTimeout(() => {
      const lowerUsername = username.toLowerCase().trim();
      
      if (lowerUsername === 'admin' && password === 'admin123') {
        onLogin({ username: 'Admin', role: 'admin' });
      } else if (lowerUsername === 'crew' && password === 'crew123') {
        onLogin({ username: 'Crew', role: 'crew' });
      } else {
        setError('Username atau password salah.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md border border-slate-200/60 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6 relative overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-baksed-blue/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-baksed-orange/10 rounded-full blur-3xl -z-10"></div>

        {/* Brand/Logo Header */}
        <div className="text-center space-y-2">
          <img 
            src="Salinan Images/Logo Baksed.png" 
            alt="Logo Bakso Sedjahtera" 
            className="h-32 sm:h-36 w-auto mx-auto mb-2 object-contain drop-shadow-sm animate-bounce-subtle" 
            onError={(e) => {
              e.target.src = 'https://placehold.co/400x400/2f4e6f/ffffff?text=Baksed+Logo';
            }}
          />
          <h2 className="text-xl sm:text-2xl font-black text-baksed-dark tracking-tight uppercase mt-3">
            Bakso Sedjahtera
          </h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
            Audit Marketing Tools
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-600 text-xs p-3 rounded-xl animate-shake">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-baksed-dark uppercase tracking-wider">Username</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-baksed-blue focus:border-baksed-blue outline-none transition-all text-sm text-slate-800 placeholder-slate-400" 
                placeholder="Masukkan username" 
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-baksed-dark uppercase tracking-wider">Password</label>
            <div className="relative">
              <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-baksed-blue focus:border-baksed-blue outline-none transition-all text-sm text-slate-800 placeholder-slate-400" 
                placeholder="Masukkan password" 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-baksed-blue hover:bg-baksed-dark text-white font-bold py-3.5 px-6 rounded-xl shadow-md shadow-slate-900/10 transition-all active:scale-[0.98] text-sm mt-6"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                Masuk Sistem
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
