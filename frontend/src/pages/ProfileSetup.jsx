import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Activity, Target, ShieldCheck, ChevronRight, Calculator, UserCircle2 } from 'lucide-react';

const ProfileSetup = () => {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    age: '',
    gender: 'male',
    goal: 'weight_loss',
    activityLevel: 'moderate'
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/user/profile');
        if (res.data.height) {
          setFormData({
            height: res.data.height,
            weight: res.data.weight,
            age: res.data.age,
            gender: res.data.gender || 'male',
            goal: res.data.goal || 'weight_loss',
            activityLevel: res.data.activityLevel || 'moderate'
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put('/user/profile', formData);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pt-48 pb-40 px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] -z-10 animate-pulse-slow"></div>
      
      <div className="glass-3d p-20 rounded-[5rem] border-white/20 glow-blue bg-black/80 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-500"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-10">
          <div className="text-center md:text-left">
            <h2 className="text-7xl font-black text-white uppercase tracking-tighter italic drop-shadow-2xl mb-4">System Calibration</h2>
            <p className="text-blue-400 font-black uppercase tracking-[0.4em] text-xl opacity-80 flex items-center justify-center md:justify-start">
              <Calculator className="w-8 h-8 mr-4" /> Biometric Optimization Protocol
            </p>
          </div>
          <div className="p-8 bg-blue-600/20 border-2 border-blue-500/50 rounded-[2.5rem] shadow-2xl">
            <UserCircle2 className="w-20 h-20 text-blue-400" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-16">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <label className="text-[10px] font-black text-white/50 uppercase tracking-[0.5em] ml-8 block">Height (CM)</label>
              <input
                type="number"
                required
                className="w-full bg-white/5 border-2 border-white/10 px-10 py-8 rounded-[2rem] text-white font-black text-3xl focus:border-blue-500 focus:bg-white/10 outline-none transition-all shadow-inner text-center"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
              />
            </div>
            <div className="space-y-6">
              <label className="text-[10px] font-black text-white/50 uppercase tracking-[0.5em] ml-8 block">Weight (KG)</label>
              <input
                type="number"
                required
                className="w-full bg-white/5 border-2 border-white/10 px-10 py-8 rounded-[2rem] text-white font-black text-3xl focus:border-blue-500 focus:bg-white/10 outline-none transition-all shadow-inner text-center"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              />
            </div>
            <div className="space-y-6">
              <label className="text-[10px] font-black text-white/50 uppercase tracking-[0.5em] ml-8 block">Operator Age</label>
              <input
                type="number"
                required
                className="w-full bg-white/5 border-2 border-white/10 px-10 py-8 rounded-[2rem] text-white font-black text-3xl focus:border-blue-500 focus:bg-white/10 outline-none transition-all shadow-inner text-center"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 border-t border-white/10 pt-16">
            <div className="space-y-6">
              <label className="text-[10px] font-black text-white/50 uppercase tracking-[0.5em] ml-8 block">Biological Sex</label>
              <select
                className="w-full bg-white/5 border-2 border-white/10 px-10 py-8 rounded-[2rem] text-white font-black text-2xl focus:border-blue-500 focus:bg-white/10 outline-none transition-all shadow-inner appearance-none cursor-pointer text-center"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="male" className="bg-[#020617]">MALE</option>
                <option value="female" className="bg-[#020617]">FEMALE</option>
                <option value="other" className="bg-[#020617]">OTHER</option>
              </select>
            </div>
            <div className="space-y-6">
              <label className="text-[10px] font-black text-white/50 uppercase tracking-[0.5em] ml-8 block">Primary Objective</label>
              <select
                className="w-full bg-white/5 border-2 border-white/10 px-10 py-8 rounded-[2rem] text-white font-black text-2xl focus:border-blue-500 focus:bg-white/10 outline-none transition-all shadow-inner appearance-none cursor-pointer text-center text-blue-400"
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
              >
                <option value="weight_loss" className="bg-[#020617]">WEIGHT LOSS</option>
                <option value="muscle_gain" className="bg-[#020617]">MUSCLE GAIN</option>
                <option value="maintenance" className="bg-[#020617]">MAINTENANCE</option>
              </select>
            </div>
            <div className="space-y-6">
              <label className="text-[10px] font-black text-white/50 uppercase tracking-[0.5em] ml-8 block">Activity Multiplier</label>
              <select
                className="w-full bg-white/5 border-2 border-white/10 px-10 py-8 rounded-[2rem] text-white font-black text-2xl focus:border-blue-500 focus:bg-white/10 outline-none transition-all shadow-inner appearance-none cursor-pointer text-center text-emerald-400"
                value={formData.activityLevel}
                onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value })}
              >
                <option value="sedentary" className="bg-[#020617]">SEDENTARY</option>
                <option value="light" className="bg-[#020617]">LIGHT</option>
                <option value="moderate" className="bg-[#020617]">MODERATE</option>
                <option value="active" className="bg-[#020617]">ACTIVE</option>
                <option value="very_active" className="bg-[#020617]">ELITE</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-12 rounded-[3rem] font-black text-4xl hover:bg-blue-600 hover:text-white transition-all shadow-[0_30px_60px_rgba(0,0,0,0.5)] uppercase tracking-widest active:scale-95 group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center">
              {loading ? 'Processing Data...' : 'Authorize Calibration'} 
              <ChevronRight className="ml-5 w-12 h-12 group-hover:translate-x-4 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;
