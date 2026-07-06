import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import ChecklistDashboard from './components/ChecklistDashboard';

function App() {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('audit_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('audit_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('audit_user');
  };

  return (
    <div className="min-h-screen text-slate-800 antialiased flex flex-col justify-between py-3 px-2 sm:py-6 sm:px-6">
      <main className="flex-1 w-full max-w-4xl mx-auto flex flex-col justify-center">
        {!user ? (
          <Login onLogin={handleLogin} />
        ) : (
          <ChecklistDashboard user={user} onLogout={handleLogout} />
        )}
      </main>

      {/* Premium Footer */}
      <footer className="text-center py-6 border-t border-slate-200/50 mt-10">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          © {new Date().getFullYear()} Bakso Sedjahtera. All Rights Reserved.
        </p>
        <p className="text-[9px] text-slate-350 font-medium mt-1">
          Developed with React & Tailwind CSS for Instant Audit Performance.
        </p>
      </footer>
    </div>
  );
}

export default App;
