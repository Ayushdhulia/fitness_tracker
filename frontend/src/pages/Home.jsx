import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Zap, Shield, ArrowRight, Activity, TrendingUp } from 'lucide-react';

const Home = () => {
  return (
    <div className="relative pt-32 pb-32 overflow-hidden min-h-screen flex flex-col items-center">
      {/* Glow Elements */}
      <div className="glow-spot top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20"></div>
      <div className="glow-spot bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/10"></div>

      {/* Hero Section */}
      <section className="container mx-auto px-6 text-center z-10 max-w-5xl">
        <div className="inline-flex items-center space-x-2 bg-blue-600/10 border border-blue-500/20 px-4 py-2 rounded-full mb-10">
          <TrendingUp className="text-blue-400 w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">Advanced Fitness Protocol v4.2</span>
        </div>
        
        <h1 className="heading-pro text-[clamp(4rem,12vw,10rem)] mb-8">
          Build Your <br />
          <span className="text-gradient-blue italic text-white/90">Best Body</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed mb-16 px-4">
          The easy way to track your fitness. Monitor your progress, get meal plans, and reach your goals with our helpful AI assistant.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link 
            to="/register" 
            className="btn-pro btn-pro-blue px-12 py-6 text-xl"
          >
            Start Now <ArrowRight className="ml-3 w-6 h-6" />
          </Link>
          <Link 
            to="/login" 
            className="btn-pro bg-white/5 border-2 border-white/20 text-white hover:bg-white hover:text-black px-12 py-6 text-xl"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Feature Section */}
      <section className="container mx-auto px-6 mt-48 grid md:grid-cols-3 gap-8 z-10">
        <FeatureItem 
          icon={<Target className="w-10 h-10 text-blue-500" />}
          title="Easy Tracking"
          desc="Keep track of your weight, height, and health easily."
        />
        <FeatureItem 
          icon={<Zap className="w-10 h-10 text-yellow-500" />}
          title="Workout Plans"
          desc="Get simple workout routines to get stronger every day."
        />
        <FeatureItem 
          icon={<Shield className="w-10 h-10 text-emerald-500" />}
          title="Healthy Diet"
          desc="See what foods you should eat to stay fit and healthy."
        />
      </section>
      
      {/* Simple Stats */}
      <section className="container mx-auto px-6 mt-48 py-20 border-y border-white/5 flex flex-wrap justify-center gap-20">
        <SimpleStat label="Active Users" value="25K+" />
        <SimpleStat label="Workouts Logged" value="1.2M" />
        <SimpleStat label="Success Rate" value="98%" />
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-6 mt-48 z-10 w-full max-w-4xl">
        <div className="glass-pro p-16 rounded-3xl text-center border-white/10 relative overflow-hidden bg-gradient-to-br from-blue-900/20 to-transparent">
          <h2 className="text-5xl font-black mb-6 italic text-white">No more excuses.</h2>
          <p className="text-xl text-gray-400 mb-10 font-medium">Join the elite ranks and transform your life today.</p>
          <Link to="/register" className="btn-pro btn-pro-primary inline-flex px-12 py-5 text-xl">
            Deploy Now
          </Link>
        </div>
      </section>
    </div>
  );
};

const FeatureItem = ({ icon, title, desc }) => (
  <div className="glass-pro p-10 rounded-3xl border-white/5 hover:border-blue-500/30 transition-all">
    <div className="mb-6 bg-white/5 w-fit p-4 rounded-2xl shadow-inner">{icon}</div>
    <h3 className="text-2xl font-black text-white mb-4 italic">{title}</h3>
    <p className="text-gray-400 font-medium leading-relaxed">{desc}</p>
  </div>
);

const SimpleStat = ({ label, value }) => (
  <div className="text-center">
    <div className="text-5xl font-black text-white mb-2">{value}</div>
    <div className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">{label}</div>
  </div>
);

export default Home;
