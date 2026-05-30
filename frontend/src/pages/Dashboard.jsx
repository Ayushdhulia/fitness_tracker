import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { 
  Activity, Droplets, Target, ChevronRight, Zap, 
  ShieldCheck, TrendingUp, Radio, MessageSquareCode,
  Flame, Utensils, Timer, BrainCircuit
} from 'lucide-react';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [diet, setDiet] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [waterTotal, setWaterTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [profileRes, dietRes, exerciseRes, waterRes] = await Promise.all([
        api.get('/user/profile'),
        api.get('/diets/recommendations'),
        api.get('/exercises/recommendations'),
        api.get('/water/today')
      ]);
      setProfile(profileRes.data);
      setDiet(dietRes.data);
      setExercises(exerciseRes.data);
      setWaterTotal(waterRes.data.total || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddWater = async (amount) => {
    try {
      await api.post('/water/log', { amount });
      setWaterTotal(prev => prev + amount);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#030712] relative">
      <div className="relative">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500 shadow-xl"></div>
        <div className="absolute inset-0 flex items-center justify-center font-black text-blue-500 text-xs">SYNC</div>
      </div>
      <div className="mt-8 text-xl font-black text-white uppercase tracking-[0.4em] animate-pulse">Establishing Tactical Link...</div>
    </div>
  );

  if (!profile?.height) {
    return (
      <div className="max-w-4xl mx-auto pt-48 pb-40 px-6">
        <div className="glass-pro p-16 rounded-3xl text-center border-white/10 relative overflow-hidden bg-black/40">
          <Radio className="w-16 h-16 text-blue-500 mx-auto mb-8 animate-pulse" />
          <h2 className="text-5xl font-black mb-6 uppercase tracking-tight italic text-white">Signal Detected: {profile?.name}</h2>
          <p className="text-xl text-gray-400 mb-12 font-medium uppercase tracking-widest italic opacity-80">Biometric profile incomplete. System calibration required.</p>
          <Link to="/profile-setup" className="btn-pro btn-pro-blue inline-flex px-12 py-5 text-xl group">
            Initialize Setup <ChevronRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    );
  }

  const heightM = profile.height / 100;
  const bmi = (profile.weight / (heightM * heightM)).toFixed(1);
  const baseWater = profile.weight * 35;
  const activityBonus = (profile.activityLevel === 'active' || profile.activityLevel === 'very_active') ? 500 : 0;
  const waterIntake = baseWater + activityBonus;
  const bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + (profile.gender === 'male' ? 5 : -161);
  const activityMultipliers = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9 };
  const maintenanceCalories = (bmr * (activityMultipliers[profile.activityLevel] || 1.2)).toFixed(0);

  return (
    <div className="max-w-7xl mx-auto pt-32 pb-32 px-6 space-y-16 relative">
      <div className="glow-spot top-0 right-0 w-[600px] h-[600px] bg-blue-600/10"></div>

      {/* Modern Header */}
      <header className="glass-pro p-12 rounded-3xl border-white/10 flex flex-col lg:flex-row justify-between items-center gap-10 bg-black/40 relative overflow-hidden">
        <div className="text-center lg:text-left">
          <div className="flex items-center space-x-3 mb-4 justify-center lg:justify-start">
            <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-lg"></span>
            <span className="text-emerald-400 font-black tracking-[0.3em] text-[10px] uppercase">Status: Online</span>
          </div>
          <h1 className="text-6xl font-black text-white tracking-tight leading-none italic mb-4">Hello, {profile.name}</h1>
          <p className="text-blue-400 font-black text-lg uppercase tracking-[0.2em] italic opacity-80">Goal: {profile.goal.replace('_', ' ')} Plan</p>
        </div>
        
        <div className="flex gap-4">
          <Link to="/ai-assistant" className="btn-pro btn-pro-blue px-8 py-3 text-sm">
            <MessageSquareCode className="w-5 h-5 mr-2" /> Ask AI Assistant
          </Link>
          <Link to="/profile-setup" className="btn-pro bg-white/5 border border-white/20 text-white hover:bg-white hover:text-black px-8 py-3 text-sm">
            Edit Profile
          </Link>
        </div>
      </header>

      {/* Stat Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        <StatItem 
          icon={<Activity className="w-10 h-10 text-orange-500" />}
          label="Body Mass Index (BMI)"
          value={bmi}
          unit="kg/m²"
          desc={getBMIDesc(bmi)}
          accent="bg-orange-500"
        />
        <StatItem 
          icon={<Target className="w-10 h-10 text-blue-500" />}
          label="Daily Calorie Goal"
          value={maintenanceCalories}
          unit="kcal"
          desc="Target for today"
          accent="bg-blue-500"
        />
        
        {/* Hydration Card */}
        <div className="glass-pro p-10 rounded-3xl border-white/10 relative overflow-hidden group bg-black/40">
          <div className="relative z-10 space-y-8">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-cyan-500/20 rounded-xl border border-cyan-500/20"><Droplets className="w-8 h-8 text-cyan-400" /></div>
              <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em]">Water Intake</span>
            </div>
            
            <div className="flex items-baseline space-x-2">
              <span className="text-7xl font-black text-white tracking-tighter">{waterTotal}</span>
              <span className="text-cyan-400 font-black text-xl uppercase italic opacity-60">/ {waterIntake} ml</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleAddWater(250)} className="bg-cyan-600 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-cyan-500 transition-all">+ 250ml</button>
              <button onClick={() => handleAddWater(500)} className="bg-cyan-600 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-cyan-500 transition-all">+ 500ml</button>
            </div>
            
            <div className="h-4 bg-black/60 rounded-full overflow-hidden border border-white/5 p-1 shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-cyan-600 to-blue-500 rounded-full transition-all duration-700" 
                style={{ width: `${Math.min((waterTotal / waterIntake) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-2 gap-12">
        {/* Nutrition Block */}
        <section className="glass-pro p-10 rounded-3xl border-white/10 bg-black/40">
          <h3 className="text-4xl font-black mb-10 flex items-center uppercase tracking-tight text-white italic">
            <ShieldCheck className="w-10 h-10 mr-4 text-emerald-500" /> What to Eat Today
          </h3>
          <div className="space-y-4">
             {diet.map((item, idx) => (
               <div key={idx} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all">
                 <div className="flex items-center space-x-6">
                   <div className="w-1.5 h-10 bg-emerald-500 rounded-full shadow-lg"></div>
                   <div>
                     <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">{item.mealType}</span>
                     <p className="font-black text-white text-2xl tracking-tight uppercase italic">{item.foodName}</p>
                   </div>
                 </div>
                 <div className="text-right">
                   <span className="block text-3xl font-black text-white leading-none">{item.calories}</span>
                   <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Kcal</span>
                 </div>
               </div>
             ))}
          </div>
        </section>

        {/* Workout Block */}
        <section className="glass-pro p-10 rounded-3xl border-white/10 bg-black/40">
          <h3 className="text-4xl font-black mb-10 flex items-center uppercase tracking-tight text-white italic">
            <Flame className="w-10 h-10 mr-4 text-orange-500" /> Recommended Exercises
          </h3>
          <div className="grid sm:grid-cols-2 gap-6">
             {exercises.map((ex, idx) => (
               <div key={idx} className="p-8 bg-white/5 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-all">
                 <div className="flex justify-between items-start mb-6">
                    <span className="px-3 py-1 bg-orange-600/20 text-orange-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-orange-500/20">{ex.bodyPart}</span>
                 </div>
                 <p className="font-black text-white text-2xl uppercase tracking-tight italic leading-tight mb-4">{ex.name}</p>
                 <p className="text-sm text-gray-400 font-medium leading-relaxed italic line-clamp-2">"{ex.instructions}"</p>
               </div>
             ))}
          </div>
        </section>
      </div>

      {/* AI Assistant Banner */}
      <section className="glass-pro p-12 rounded-3xl border-white/10 bg-gradient-to-r from-blue-900/10 via-black/40 to-cyan-900/10 flex flex-col md:flex-row items-center justify-between gap-10">
         <div className="text-center md:text-left">
           <h3 className="text-4xl font-black text-white uppercase tracking-tight mb-4 italic flex items-center justify-center md:justify-start">
             <BrainCircuit className="w-10 h-10 mr-4 text-blue-400" /> AI Fitness Expert
           </h3>
           <p className="text-lg text-gray-400 font-medium">Ask our AI for personalized tips on food and workouts.</p>
         </div>
         <Link to="/ai-assistant" className="btn-pro btn-pro-blue px-12 py-4 text-lg">
           Open AI Assistant
         </Link>
      </section>
    </div>
  );
};

const StatItem = ({ icon, label, value, unit, desc, accent }) => (
  <div className="glass-pro p-10 rounded-3xl border-white/10 relative overflow-hidden bg-black/40 group">
    <div className={`absolute top-0 right-0 w-2 h-full ${accent} opacity-50 shadow-xl`}></div>
    <div className="relative z-10 space-y-10">
      <div className="flex items-center justify-between">
        <div className="p-3 bg-white/5 rounded-xl border border-white/10">{icon}</div>
        <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">{label}</span>
      </div>
      <div className="flex items-baseline space-x-2">
        <span className="text-7xl font-black text-white tracking-tighter">{value}</span>
        <span className="text-white font-black text-xl uppercase tracking-tighter opacity-60">{unit}</span>
      </div>
      <div className="inline-block px-5 py-2 bg-white/5 rounded-lg text-[10px] font-black text-white uppercase tracking-widest italic border border-white/5">
        {desc}
      </div>
    </div>
  </div>
);

const getBMIDesc = (bmi) => {
  if (bmi < 18.5) return 'Low Mass';
  if (bmi < 25) return 'Optimal Level';
  if (bmi < 30) return 'Mass Excess';
  return 'System Alert';
};

export default Dashboard;
