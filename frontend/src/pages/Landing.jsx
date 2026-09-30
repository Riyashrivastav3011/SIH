import { Link } from 'react-router-dom'
import { Clock, Brain, MapPinned, Activity, ShieldAlert, BarChart3 } from 'lucide-react'
import Home from './Home';
import Footer from "../components/common/Footer";


export default function Landing(){
  return <div className="bg-white dark:bg-[#081d33]">
    <section className="bg-gradient-to-br from-[#0a2540] to-[#0f62fe] text-white px-6 py-20 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold">AI-Powered Dynamic Train ETA Prediction</h1>
      <p className="mt-4 max-w-2xl mx-auto text-lg opacity-90">Real-time, data-driven arrival predictions for smarter railway operations and better passenger experiences.</p>
      <div className="mt-8 flex justify-center gap-4">
        <Link to="/dashboard" className="bg-white text-[#0a2540] px-6 py-3 rounded-full font-semibold">Track Train</Link>
        <Link to="/dashboard" className="bg-transparent border border-white px-6 py-3 rounded-full font-semibold">Dashboard</Link>
      </div>
    </section>
    <section className="grid md:grid-cols-3 gap-6 p-6 max-w-6xl mx-auto -mt-10">
      {[
        {icon: MapPinned, t:"Real-Time Tracking", d:"Live GPS, station feeds & congestion data."},
        {icon: Brain, t:"AI ETA Prediction", d:"XGBoost, LSTM and GNN ensemble models."},
        {icon: Clock, t:"Delay Forecasting", d:"Predict delays 60-120 mins ahead."},
        {icon: Activity, t:"Network Intelligence", d:"Graph Neural Nets for network-wide impact."},
        {icon: ShieldAlert, t:"Live Alerts", d:"Instant congestion & restriction alerts."},
        {icon: BarChart3, t:"Operational Analytics", d:"Accuracy, MAE, RMSE dashboards."},
      ].map(c=> <div key={c.t} className="bg-white dark:bg-white/5 border rounded-2xl p-6 shadow-sm"><c.icon className="text-[#0f62fe]"/><h3 className="font-semibold mt-2">{c.t}</h3><p className="text-sm opacity-70">{c.d}</p></div>)}
    </section>
   <Home/> 
   <Footer/>
  </div>
}