import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Shield, Lock, Mail, ChevronRight, UserPlus, Terminal } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Check tactical uplink.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#020617] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
      
      <div className="w-full max-w-2xl relative z-10">
        <div className="glass-3d p-20 rounded-[4rem] border-white/20 glow-emerald bg-black/80">
          <div className="flex justify-center mb-12">
            <div className="p-8 bg-emerald-600 rounded-[2.5rem] glow-emerald relative group">
              <div className="absolute inset-0 bg-white/20 rounded-[2.5rem] animate-ping opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <UserPlus className="w-16 h-16 text-white" />
            </div>
          </div>
          
          <h2 className="text-6xl font-black text-white mb-4 text-center uppercase tracking-tighter italic drop-shadow-2xl">Establish Rank</h2>
          <p className="text-emerald-400 font-black text-center uppercase tracking-[0.4em] mb-16 opacity-80 italic">New Operator Enrollment</p>
          
          {error && (
            <div className="bg-red-500/10 border-2 border-red-500/30 text-red-500 p-8 rounded-3xl mb-12 font-black uppercase text-sm tracking-widest text-center shadow-lg animate-in fade-in zoom-in">
              <Terminal className="inline mr-3 w-5 h-5" /> {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <label className="flex items-center text-[10px] font-black text-white/50 uppercase tracking-[0.5em] ml-6">
                Operator Designation
              </label>
              <input
                type="text"
                required
                className="w-full bg-white/5 border-2 border-white/10 px-10 py-8 rounded-[2rem] text-white font-black text-2xl focus:border-emerald-500 focus:bg-white/10 outline-none transition-all shadow-inner placeholder:text-white/10"
                placeholder="FULL NAME"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-6">
              <label className="flex items-center text-[10px] font-black text-white/50 uppercase tracking-[0.5em] ml-6">
                Identity Intel
              </label>
              <input
                type="email"
                required
                className="w-full bg-white/5 border-2 border-white/10 px-10 py-8 rounded-[2rem] text-white font-black text-2xl focus:border-emerald-500 focus:bg-white/10 outline-none transition-all shadow-inner placeholder:text-white/10"
                placeholder="OPERATOR@DOMAIN.COM"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            
            <div className="space-y-6">
              <label className="flex items-center text-[10px] font-black text-white/50 uppercase tracking-[0.5em] ml-6">
                Access Key
              </label>
              <input
                type="password"
                required
                className="w-full bg-white/5 border-2 border-white/10 px-10 py-8 rounded-[2rem] text-white font-black text-2xl focus:border-emerald-500 focus:bg-white/10 outline-none transition-all shadow-inner placeholder:text-white/10"
                placeholder="••••••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-10 rounded-[2.5rem] font-black text-3xl hover:bg-emerald-600 hover:text-white transition-all shadow-[0_20px_50px_rgba(0,0,0,0.5)] uppercase tracking-widest flex items-center justify-center group active:scale-95"
            >
              {loading ? 'Enrolling...' : 'Establish Profile'}
              <ChevronRight className="ml-4 w-10 h-10 group-hover:translate-x-3 transition-transform" />
            </button>
          </form>
          
          <p className="text-center text-white/30 mt-16 font-black uppercase tracking-[0.3em] text-xs">
            Registered? <Link to="/login" className="text-emerald-400 hover:text-white border-b-2 border-emerald-500/50 pb-1 transition-colors">Authorize Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
