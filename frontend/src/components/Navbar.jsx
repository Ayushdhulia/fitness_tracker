import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Activity, LogOut, User as UserIcon, MessageSquareCode, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('userName');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-[1000] px-6 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="glass-pro px-8 py-4 rounded-2xl flex justify-between items-center border-white/10 shadow-2xl bg-black/40">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-blue-600 p-2.5 rounded-xl group-hover:scale-110 transition-transform shadow-lg shadow-blue-600/30">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white uppercase italic">FITTRACK</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {token ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`flex items-center space-x-2 font-bold text-sm tracking-wider uppercase transition-colors ${isActive('/dashboard') ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <Link 
                  to="/ai-assistant" 
                  className={`flex items-center space-x-2 font-bold text-sm tracking-wider uppercase transition-colors ${isActive('/ai-assistant') ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}`}
                >
                  <MessageSquareCode className="w-4 h-4" />
                  <span>AI Assistant</span>
                </Link>
                
                <div className="flex items-center space-x-6 border-l border-white/10 pl-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-lg flex items-center justify-center font-black text-xs text-white shadow-md">
                      {name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-white font-bold text-sm uppercase tracking-wide">{name}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="text-red-400 hover:text-white hover:bg-red-600/20 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all border border-red-400/20"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-400 hover:text-white font-bold text-sm uppercase tracking-widest transition-colors">Login</Link>
                <Link 
                  to="/register" 
                  className="bg-white text-black px-6 py-2.5 rounded-xl font-black text-sm hover:bg-blue-600 hover:text-white transition-all shadow-lg uppercase tracking-wider active:scale-95"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
