import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Shield, Lock, Mail, ChevronRight, Terminal, Fingerprint } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('userName', response.data.name);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Check tactical uplink.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#020617] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
      
      <div className="w-full max-w-2xl relative z-10">
        <div className="glass-3d p-20 rounded-[4rem] border-white/20 glow-blue bg-black/80">
          <div className="flex justify-center mb-12">
            <div className="p-8 bg-blue-600 rounded-[2.5rem] glow-blue relative group">
              <div className="absolute inset-0 bg-white/20 rounded-[2.5rem] animate-ping opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Fingerprint className="w-16 h-16 text-white" />
            </div>
          </div>
          
          <h2 className="text-6xl font-black text-white mb-4 text-center uppercase tracking-tighter italic drop-shadow-2xl">Secure Access</h2>
          <p className="text-blue-400 font-black text-center uppercase tracking-[0.4em] mb-16 opacity-80 italic">Authorized Personnel Only</p>
          
          {error && (
            <div className="bg-red-500/10 border-2 border-red-500/30 text-red-500 p-8 rounded-3xl mb-12 font-black uppercase text-sm tracking-widest text-center shadow-lg animate-in fade-in zoom-in">
              <Terminal className="inline mr-3 w-5 h-5" /> {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-6">
              <label className="flex items-center text-[10px] font-black text-white/50 uppercase tracking-[0.5em] ml-6">
                <Mail className="w-4 h-4 mr-3 text-blue-500" /> Identity Intel
              </label>
              <input
                type="email"
                required
                className="w-full bg-white/5 border-2 border-white/10 px-10 py-8 rounded-[2rem] text-white font-black text-2xl focus:border-blue-500 focus:bg-white/10 outline-none transition-all shadow-inner placeholder:text-white/10"
                placeholder="OPERATOR@DOMAIN.COM"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            
            <div className="space-y-6">
              <label className="flex items-center text-[10px] font-black text-white/50 uppercase tracking-[0.5em] ml-6">
                <Lock className="w-4 h-4 mr-3 text-blue-500" /> Access Key
              </label>
              <input
                type="password"
                required
                className="w-full bg-white/5 border-2 border-white/10 px-10 py-8 rounded-[2rem] text-white font-black text-2xl focus:border-blue-500 focus:bg-white/10 outline-none transition-all shadow-inner placeholder:text-white/10"
                placeholder="••••••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-10 rounded-[2.5rem] font-black text-3xl hover:bg-blue-600 hover:text-white transition-all shadow-[0_20px_50px_rgba(0,0,0,0.5)] uppercase tracking-widest flex items-center justify-center group active:scale-95"
            >
              {loading ? 'Authenticating...' : 'Authorize Login'}
              <ChevronRight className="ml-4 w-10 h-10 group-hover:translate-x-3 transition-transform" />
            </button>
          </form>
          
          <p className="text-center text-white/30 mt-16 font-black uppercase tracking-[0.3em] text-xs">
            Unregistered? <Link to="/register" className="text-blue-400 hover:text-white border-b-2 border-blue-500/50 pb-1 transition-colors">Establish Ranks</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
