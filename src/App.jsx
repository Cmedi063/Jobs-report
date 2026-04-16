import React, { useState, useMemo, useEffect } from 'react';
import { 
  BarChart, Bar, LineChart, Line, AreaChart, Area, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, ReferenceLine, Cell, ComposedChart, ZAxis, PieChart, Pie
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Activity, CloudLightning, Sun, Users, Briefcase, Info, 
  Zap, AlertCircle, BookOpen, Gauge, BrainCircuit, Globe, Building, Target, 
  ChevronRight, ArrowUpRight, ArrowDownRight, Layers, Database, Cpu, Search,
  RefreshCw, Clock, Network
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MCP / API Data Orchestration Layer ---
const useLaborData = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(new Date().toLocaleTimeString());

  // In a real implementation, this would connect to an MCP server or API Gateway
  // Example pattern: fetch('/api/mcp/fred/series/PAYEMS')
  const syncData = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSync(new Date().toLocaleTimeString());
    }, 1500);
  };

  useEffect(() => {
    const interval = setInterval(syncData, 60000); // Sync every minute
    return () => clearInterval(interval);
  }, []);

  return { isSyncing, lastSync, syncData };
};

const LaborAlphaDashboard = () => {
  const [activeView, setActiveView] = useState('macro');
  const { isSyncing, lastSync, syncData } = useLaborData();

  // --- Data Definitions (Matched to Screenshots) ---
  
  const macroTrendData = [
    { month: 'Sep 25', Headline: 76, TrueTrend: 74, Distortion: 12 },
    { month: 'Oct 25', Headline: -140, TrueTrend: -152, Distortion: -8 },
    { month: 'Nov 25', Headline: 41, TrueTrend: 28, Distortion: 13 },
    { month: 'Dec 25', Headline: -17, TrueTrend: -14, Distortion: -3 },
    { month: 'Jan 26', Headline: 126, TrueTrend: 135, Distortion: 58 },
    { month: 'Feb 26', Headline: -92, TrueTrend: -104, Distortion: 12 },
    { month: 'Mar 26', Headline: 178, TrueTrend: 152, Distortion: 85 }
  ];

  const sectorMatrixData = [
    { name: 'Healthcare', growth: 76, wage: 4.5, risk: 'Low', color: '#14b8a6' },
    { name: 'Construction', growth: 26, wage: 3.8, risk: 'Med', color: '#f59e0b' },
    { name: 'Financial Activities', growth: -18, wage: 3.1, risk: 'Med', color: '#3b82f6' },
    { name: 'Manufacturing', growth: 15, wage: 3.2, risk: 'Med', color: '#8b5cf6' },
    { name: 'Transport/Logistics', growth: 21, wage: 3.0, risk: 'Low', color: '#06b6d4' },
    { name: 'Federal Govt', growth: -22, wage: 4.2, risk: 'High', color: '#f43f5e' },
    { name: 'Information', growth: -5, wage: 2.8, risk: 'Med', color: '#e11d48' },
    { name: 'Retail Trade', growth: 10, wage: 2.5, risk: 'Low', color: '#9f1239' }
  ];

  const sectorHierarchyData = [...sectorMatrixData]
    .map(d => ({ name: d.name, value: d.growth, color: d.color }))
    .sort((a,b) => b.value - a.value);

  const compositionData = [
    { month: 'Oct 25', fullTime: -120, partTime: 85 },
    { month: 'Nov 25', fullTime: 45, partTime: 65 },
    { month: 'Dec 25', fullTime: 12, partTime: 22 },
    { month: 'Jan 26', fullTime: 35, partTime: 125 },
    { month: 'Feb 26', fullTime: -160, partTime: -85 },
    { month: 'Mar 26', fullTime: 110, partTime: 185 }
  ];

  const tightenssData = [
    { month: 'Oct 25', openings: 8.7, ratio: 1.42 },
    { month: 'Nov 25', openings: 8.52, ratio: 1.30 },
    { month: 'Dec 25', openings: 8.40, ratio: 1.25 },
    { month: 'Jan 26', openings: 8.60, ratio: 1.30 },
    { month: 'Feb 26', openings: 8.28, ratio: 1.18 },
    { month: 'Mar 26', openings: 8.10, ratio: 1.08 }
  ];

  const claimsData = [
    { week: 'Feb W1', initial: 212, continuing: 1880 },
    { week: 'Feb W2', initial: 215, continuing: 1902 },
    { week: 'Feb W3', initial: 209, continuing: 1900 },
    { week: 'Feb W4', initial: 211, continuing: 1912 },
    { week: 'Mar W1', initial: 218, continuing: 1918 },
    { week: 'Mar W2', initial: 214, continuing: 1920 }
  ];

  const indeedIndexData = [
    { week: 'Feb W1', value: 118, oscillator: 1.5 },
    { week: 'Feb W2', value: 116, oscillator: 1.2 },
    { week: 'Feb W3', value: 115, oscillator: 0.8 },
    { week: 'Feb W4', value: 114, oscillator: 0.2 },
    { week: 'Mar W1', value: 115, oscillator: 0.4 },
    { week: 'Mar W2', value: 112, oscillator: -0.5 },
    { week: 'Mar W3', value: 110, oscillator: -1.5 }
  ];

  const fedSoftLandingData = [
    { name: 'Q1 25', productivity: 0.1, ulc: 4.5 },
    { name: 'Q2 25', productivity: 1.2, ulc: 3.2 },
    { name: 'Q3 25', productivity: 4.8, ulc: 0.5 },
    { name: 'Q4 25', productivity: 3.2, ulc: 0.6 },
    { name: 'Q1 26', productivity: 2.8, ulc: 0.8 }
  ];

  const consumerSqueezeData = [
    { name: 'Q1 25', realWage: -0.8, delinquency: 2.1 },
    { name: 'Q2 25', realWage: 0.2, delinquency: 2.4 },
    { name: 'Q3 25', realWage: 0.8, delinquency: 2.8 },
    { name: 'Q4 25', realWage: 1.1, delinquency: 3.2 },
    { name: 'Q1 26', realWage: 0.9, delinquency: 3.5 }
  ];
  const SectorTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-card-premium p-4 border border-white/10 shadow-2xl min-w-[180px]">
          <h4 className="font-bold text-sm mb-2" style={{ color: data.color }}>{data.name}</h4>
          <div className="space-y-1.5">
            <div className="flex justify-between gap-4">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Jobs Added:</span>
              <span className="text-[10px] text-white font-bold">{data.growth}K</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Wage Growth:</span>
              <span className="text-[10px] text-white font-bold">{data.wage}%</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Weather Risk:</span>
              <span className="text-[10px] text-white font-bold">{data.risk}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const StatCard = ({ title, value, subtext, icon: Icon, colorClass }) => (
    <div className="stat-card-v2 group hover:ring-1 hover:ring-white/10 transition-all">
      <div className="flex flex-col gap-1">
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{title}</p>
        <h2 className="text-2xl font-bold text-white font-display">{value}</h2>
        <p className={`text-[10px] font-medium ${colorClass}`}>{subtext}</p>
      </div>
      <div className={`p-2.5 rounded-lg bg-slate-800/50 text-slate-400 group-hover:scale-110 transition-transform`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#040a12] p-4 md:p-6 lg:p-8 font-sans">
      
      {/* --- Dashboard Header --- */}
      <header className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-indigo rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)]">
              <Zap className="w-6 h-6 text-white fill-current" />
            </div>
            <h1 className="text-3xl font-black text-white font-display tracking-tight uppercase italic">
              Labor Alpha
            </h1>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Sun className="w-3.5 h-3.5 text-accent-amber" />
            <p className="text-slate-400 text-xs font-bold tracking-wide uppercase italic">
              Signal Through The Noise: Weather-Adjusted Analytics
            </p>
          </div>
        </div>

        {/* Sync Status / MCP Hook */}
        <div className="flex flex-col items-end gap-2">
          <nav className="bg-[#0d1520]/80 backdrop-blur-md p-1 rounded-xl border border-white/5 flex gap-1">
            {[
              { id: 'macro', label: 'Macro View' },
              { id: 'sector', label: 'Sector Matrix' },
              { id: 'quality', label: 'Job Quality' },
              { id: 'pulse', label: 'Weekly Pulse' },
              { id: 'fed', label: 'Fed Watch' },
              { id: 'guide', label: '10x Alpha Guide' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`nav-btn-v2 ${activeView === tab.id ? 'nav-btn-active-v2' : 'nav-btn-inactive-v2'}`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <div className={`w-1.5 h-1.5 rounded-full bg-emerald-500 ${isSyncing ? 'animate-ping' : ''}`} />
              <span className="text-[10px] font-bold text-emerald-500 uppercase">FRED/BLS MCP Loop Active</span>
            </div>
            <button onClick={syncData} className="text-slate-500 hover:text-white transition-colors">
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* --- Top Stats Row --- */}
      <section className="max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="True Job Growth (Adjusted)" 
          value="+152K" 
          subtext="Official: +178K (Overstated)" 
          icon={Briefcase}
          colorClass="text-accent-teal"
        />
        <StatCard 
          title="Unemployment Rate" 
          value="4.3%" 
          subtext="400K exited labor force" 
          icon={Users}
          colorClass="text-emerald-500"
        />
        <StatCard 
          title="Weather Distortion Vol." 
          value="118K" 
          subtext="Jobs misallocated in 6 mos" 
          icon={CloudLightning}
          colorClass="text-accent-amber"
        />
        <StatCard 
          title="Core Wage Growth" 
          value="3.5%" 
          subtext="Cooling from 3.8% peak" 
          icon={Activity}
          colorClass="text-accent-rose"
        />
      </section>

      {/* --- Main Dashboard Content --- */}
      <main className="max-w-[1600px] mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-12 gap-6"
          >
            {activeView === 'macro' && (
              <>
                <div className="col-span-12 lg:col-span-8 glass-card-premium p-6">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-white font-display">The "Reality Gap"</h3>
                    <span className="px-2 py-0.5 bg-accent-indigo/10 text-accent-indigo text-[10px] font-bold rounded-full uppercase border border-accent-indigo/20">Composed View</span>
                  </div>
                  <p className="text-slate-500 text-xs mb-8 italic">Official BLS vs Weather-Adjusted Baseline (000s)</p>
                  
                  <div className="h-[450px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={macroTrendData}>
                        <defs>
                          <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" stroke="#475569" fontSize={11} axisLine={false} tickLine={false} />
                        <YAxis stroke="#475569" fontSize={11} axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Legend iconType="circle" />
                        <Bar dataKey="Distortion" name="Weather Distortion" fill="#0d9488" opacity={0.6} radius={[4, 4, 0, 0]} />
                        <Area type="monotone" dataKey="TrueTrend" name="True Trend (Adjusted)" stroke="#c084fc" strokeWidth={3} fill="url(#purpleGradient)" />
                        <Line type="monotone" dataKey="Headline" name="Headline (Official)" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4, fill: '#38bdf8' }} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="col-span-12 lg:col-span-4 glass-card-premium p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Zap className="w-5 h-5 text-accent-amber fill-yellow-500/20" />
                    <h3 className="text-xl font-bold text-white font-display">Alpha Synthesis</h3>
                  </div>
                  <div className="space-y-8">
                    <div className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:bg-accent-indigo before:rounded-full">
                      <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest mb-2">The Feb/Mar Whiplash</h4>
                      <p className="text-sm text-slate-400 leading-relaxed font-medium italic">
                        The massive 270K swing between February's loss and March's gain is a statistical mirage. <strong>Weather distortion accounts for 85K of that variance.</strong> The true labor market is stable.
                      </p>
                    </div>
                    <div className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:bg-accent-teal before:rounded-full">
                      <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest mb-2">Fed Rate Probability</h4>
                      <p className="text-sm text-slate-400 leading-relaxed font-medium italic">
                        Because the "Weather Adjusted" number (+152K) shows moderate growth, the Fed has cover to look past the headline "beat". <strong>Rate cuts remain on the table for Summer 2026.</strong>
                      </p>
                    </div>
                    <div className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:bg-accent-rose before:rounded-full">
                      <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest mb-2">Participation Risk</h4>
                      <p className="text-sm text-slate-400 leading-relaxed font-medium italic">
                        The drop to 4.3% unemployment hides a structural weakness: 400K people exiting the labor force. If they return, the rate will snap back up to 4.5%+.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeView === 'sector' && (
              <>
                <div className="col-span-12 lg:col-span-6 glass-card-premium p-6">
                  <h3 className="text-xl font-bold text-white font-display mb-1">Sector Matrix: Jobs vs. Wages</h3>
                  <p className="text-slate-500 text-xs mb-12 italic">Identifying Stagflation vs. True Growth Areas</p>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#1e293b" />
                        <XAxis 
                          type="number" 
                          dataKey="growth" 
                          name="Job Change" 
                          stroke="#475569" 
                          fontSize={11} 
                          axisLine={false} 
                          tickLine={false} 
                          domain={[-30, 90]}
                          ticks={[-30, 0, 30, 60, 90]}
                        />
                        <YAxis 
                          type="number" 
                          dataKey="wage" 
                          name="Wage Pressure" 
                          stroke="#475569" 
                          fontSize={11} 
                          axisLine={false} 
                          tickLine={false} 
                          domain={[-30, 90]} // Keep scale consistent with X if needed, or matched to screenshot
                          ticks={[1.5, 2.4, 3.3, 4.2, 5.0]}
                          domain={[1, 5.5]}
                        />
                        <ZAxis type="number" range={[150, 150]} />
                        <Tooltip content={<SectorTooltip />} cursor={{ strokeDasharray: '3 3', stroke: '#334155' }} />
                        <ReferenceLine x={0} stroke="#475569" strokeWidth={1} strokeDasharray="3 3" />
                        <ReferenceLine y={4.2} stroke="#475569" strokeWidth={1} strokeDasharray="3 3" label={{ position: 'insideBottomLeft', value: 'Avg Wage Growth', fill: '#475569', fontSize: 10, offset: 10 }} />
                        {sectorMatrixData.map((entry, index) => (
                          <Scatter key={index} name={entry.name} data={[entry]} fill={entry.color} />
                        ))}
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="col-span-12 lg:col-span-6 glass-card-premium p-6">
                  <h3 className="text-xl font-bold text-white font-display mb-1">Net Change Hierarchy</h3>
                  <p className="text-slate-500 text-xs mb-8 italic">March 2026 Distribution</p>
                  <div className="h-[430px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sectorHierarchyData} layout="vertical" margin={{ left: 50 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" stroke="#475569" fontSize={11} axisLine={false} tickLine={false} />
                        <YAxis type="category" dataKey="name" stroke="#cbd5e1" fontSize={10} axisLine={false} tickLine={false} width={120} />
                        <Tooltip />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                          {sectorHierarchyData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </>
            )}

            {activeView === 'quality' && (
              <>
                <div className="col-span-12 lg:col-span-6 glass-card-premium p-6">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-white font-display">Employment Composition</h3>
                  </div>
                  <p className="text-slate-500 text-xs mb-12 italic">Full-Time vs. Part-Time Job Creation (000s)</p>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={compositionData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" stroke="#475569" fontSize={11} />
                        <YAxis stroke="#475569" fontSize={11} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="fullTime" name="Full-Time" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="partTime" name="Part-Time" fill="#ec4899" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-8 p-4 bg-accent-rose/5 border border-accent-rose/10 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                       <AlertCircle className="w-4 h-4 text-accent-rose" />
                       <h4 className="text-xs font-bold text-white uppercase tracking-wider">The Part-Time Illusion</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed italic">
                      While the headline jobs number is positive, composition analysis reveals a structural shift. <strong>Full-time jobs have contracted in 4 of the last 6 months.</strong>
                    </p>
                  </div>
                </div>
                <div className="col-span-12 lg:col-span-6 glass-card-premium p-6">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-xl font-bold text-white font-display">Labor Tightness Index</h3>
                    <div className="px-3 py-1 bg-amber-500/10 text-amber-500 text-[9px] font-bold rounded border border-amber-500/20 uppercase">JOLTS Data</div>
                  </div>
                  <p className="text-slate-500 text-xs mb-12 italic">Job Openings (M) vs. Openings per Unemployed Ratio</p>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={tightenssData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                        <XAxis 
                          dataKey="month" 
                          stroke="#475569" 
                          fontSize={10} 
                          axisLine={false} 
                          tickLine={false} 
                          dy={10}
                        />
                        <YAxis 
                          yAxisId="left" 
                          orientation="left" 
                          stroke="#38bdf8" 
                          fontSize={10} 
                          axisLine={false} 
                          tickLine={false} 
                          domain={[8.1, 8.7]}
                          ticks={[8.1, 8.25, 8.4, 8.55, 8.7]}
                        />
                        <YAxis 
                          yAxisId="right" 
                          orientation="right" 
                          stroke="#f59e0b" 
                          fontSize={10} 
                          axisLine={false} 
                          tickLine={false} 
                          domain={[1, 1.5]}
                          ticks={[1, 1.15, 1.3, 1.5]}
                        />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }} />
                        <Legend align="center" verticalAlign="bottom" iconType="circle" wrapperStyle={{ paddingTop: '30px', fontSize: '10px', textTransform: 'none' }} />
                        <Line yAxisId="left" type="monotone" dataKey="openings" name="Job Openings (M)" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4, fill: '#38bdf8' }} />
                        <Line yAxisId="right" type="monotone" dataKey="ratio" name="Ratio (Openings / Unemployed)" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: '#f59e0b' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-8 p-4 bg-accent-indigo/5 border border-accent-indigo/10 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                       <TrendingDown className="w-4 h-4 text-accent-indigo" />
                       <h4 className="text-xs font-bold text-white uppercase tracking-wider">The Cooling Beveridge Curve</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed italic">
                      The ratio of job openings to unemployed persons has steadily fallen from a peak of 2.0 to 1.08. <strong>Wage push inflation is essentially neutralized.</strong>
                    </p>
                  </div>
                </div>
              </>
            )}

            {activeView === 'pulse' && (
              <>
                <div className="col-span-12 lg:col-span-6 glass-card-premium p-6">
                  <h3 className="text-xl font-bold text-white font-display mb-1">Govt Data: Jobless Claims</h3>
                  <p className="text-slate-500 text-xs mb-12 italic">Initial vs Continuing Claims (000s) - Lagging Lead</p>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={claimsData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                        <XAxis 
                          dataKey="week" 
                          stroke="#475569" 
                          fontSize={10} 
                          axisLine={false} 
                          tickLine={false} 
                          dy={10}
                        />
                        <YAxis 
                          yAxisId="left" 
                          stroke="#f43f5e" 
                          fontSize={10} 
                          axisLine={false} 
                          tickLine={false}
                          domain={[207, 219]}
                          ticks={[207, 210, 213, 216, 219]}
                        />
                        <YAxis 
                          yAxisId="right" 
                          orientation="right" 
                          stroke="#fbbf24" 
                          fontSize={10} 
                          axisLine={false} 
                          tickLine={false}
                          domain={[1880, 1920]}
                          ticks={[1880, 1890, 1900, 1910, 1920]}
                        />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }} />
                        <Legend align="center" verticalAlign="bottom" iconType="rect" wrapperStyle={{ paddingTop: '30px', fontSize: '10px', textTransform: 'none' }} />
                        <Bar yAxisId="left" dataKey="initial" name="Initial Claims" fill="#991b1b" radius={[2, 2, 0, 0]} barSize={12} opacity={0.8} />
                        <Line yAxisId="right" type="monotone" dataKey="continuing" name="Continuing Claims" stroke="#fbbf24" strokeWidth={3} dot={{ r: 4, fill: '#fbbf24' }} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="col-span-12 lg:col-span-6 glass-card-premium p-6">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-xl font-bold text-white font-display">Alt Data: Indeed Postings Index</h3>
                    <div className="px-3 py-1 bg-violet-500/10 text-violet-500 text-[9px] font-bold rounded border border-violet-500/20 uppercase italic font-sans tracking-wide">Real-Time Lead</div>
                  </div>
                  <p className="text-slate-500 text-xs mb-12 italic">Index (100 = Pre-Pandemic) vs Hiring Momentum</p>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={indeedIndexData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                        <XAxis 
                          dataKey="week" 
                          stroke="#475569" 
                          fontSize={10} 
                          axisLine={false} 
                          tickLine={false} 
                          dy={10}
                        />
                        <YAxis 
                          yAxisId="left" 
                          stroke="#38bdf8" 
                          fontSize={10} 
                          axisLine={false} 
                          tickLine={false}
                          domain={[100, 125]}
                          ticks={[100, 107, 114, 125]}
                        />
                        <YAxis 
                          yAxisId="right" 
                          orientation="right" 
                          stroke="#0ea5e9" 
                          fontSize={10} 
                          axisLine={false} 
                          tickLine={false}
                          domain={[-2.1, 2.1]}
                          ticks={[-2.1, -1.05, 0, 1.05, 2.1]}
                        />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }} />
                        <Legend align="center" verticalAlign="bottom" iconType="circle" wrapperStyle={{ paddingTop: '30px', fontSize: '10px', textTransform: 'none' }} />
                        <Bar yAxisId="right" dataKey="oscillator" name="Momentum Oscillator" fill="#0369a1" radius={[2, 2, 2, 2]} barSize={45} />
                        <Line yAxisId="left" type="monotone" dataKey="value" name="Indeed Postings Index" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4, fill: '#38bdf8' }} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Bottom Insights Notes */}
                <div className="col-span-12 glass-card-premium p-8 mt-4 relative overflow-hidden">
                  <div className="grid grid-cols-12 gap-8 relative z-10">
                    <div className="col-span-12 lg:col-span-6">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingDown size={16} className="text-rose-500" />
                        <h4 className="text-[11px] font-black text-rose-500 uppercase tracking-widest font-sans">Claims Divergence</h4>
                      </div>
                      <p className="text-slate-400 text-[13px] leading-relaxed font-sans">
                        Continuing claims edging up slightly above 1.9M tells a nuanced story: <span className="text-white font-bold">while people aren't being fired in droves (initial claims remain low), it's taking them longer to find new work</span> once they are let go. Employer hoarding is keeping initial claims suppressed.
                      </p>
                    </div>
                    
                    <div className="col-span-12 lg:col-span-6 border-l border-slate-800/50 pl-0 lg:pl-8">
                      <div className="flex items-center gap-2 mb-3">
                        <Activity size={16} className="text-sky-500" />
                        <h4 className="text-[11px] font-black text-sky-500 uppercase tracking-widest font-sans">The Real-Time Chill</h4>
                      </div>
                      <p className="text-slate-400 text-[13px] leading-relaxed font-sans">
                        While the monthly jobs report prints strong numbers, alternative data from Indeed shows job postings dropping to 110 (just 10% above pre-pandemic levels). <span className="text-white font-bold">The momentum oscillator has turned negative.</span> This predicts weaker official BLS prints in the next 1-2 months.
                      </p>
                    </div>
                  </div>
                  {/* Visual Gradient Footer */}
                  <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-rose-500 via-violet-500 to-sky-500 opacity-80"></div>
                </div>
              </>
            )}

            {activeView === 'fed' && (
              <>
                <div className="col-span-12 lg:col-span-6 glass-card-premium p-6">
                  <h3 className="text-xl font-bold text-white font-display mb-1">The Soft Landing Engine</h3>
                  <p className="text-slate-500 text-xs mb-12 italic">Labor Productivity vs Unit Labor Costs (ULC) %</p>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={fedSoftLandingData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" stroke="#475569" fontSize={11} />
                        <YAxis stroke="#475569" fontSize={11} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="productivity" name="Productivity Growth" fill="#14b8a6" radius={[4, 4, 0, 0]} barSize={30} />
                        <Line type="monotone" dataKey="ulc" name="Unit Labor Costs" stroke="#f43f5e" strokeWidth={3} dot={{ r: 5 }} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="col-span-12 lg:col-span-6 glass-card-premium p-6">
                  <h3 className="text-xl font-bold text-white font-display mb-1">The Consumer Squeeze</h3>
                  <p className="text-slate-500 text-xs mb-12 italic">Real Wage Growth vs Credit Card Delinquencies (%)</p>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={consumerSqueezeData}>
                        <defs>
                          <linearGradient id="roseGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" stroke="#475569" fontSize={11} />
                        <YAxis stroke="#475569" fontSize={11} />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="realWage" name="Real Wage Growth" stroke="#8b5cf6" strokeWidth={3} fill="#8b5cf610" />
                        <Line type="monotone" dataKey="delinquency" name="CC Delinquency Rate" stroke="#f43f5e" strokeWidth={3} strokeDasharray="5 5" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-8 flex justify-end">
                    <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[9px] font-bold rounded border border-emerald-500/20 uppercase">Quarterly Data</div>
                  </div>
                </div>
              </>
            )}

            {activeView === 'guide' && (
              <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "Sentiment Quantization",
                    desc: "Utilizing FinBERT and CentralBankRoBERTa to distill alpha from FOMC transcripts and S&P 500 earnings calls.",
                    statLabel: "Drift Index",
                    statValue: "-0.12 SD",
                    icon: Cpu,
                    color: "purple"
                  },
                  {
                    title: "Autonomous Data Loops",
                    desc: "Direct architectural integration with fred-mcp-server and bls-mcp for real-time validation of high-frequency data.",
                    statLabel: "Sync Status",
                    statValue: "Live (5ms)",
                    icon: Database,
                    color: "blue"
                  },
                  {
                    title: "Foundation Time-Series",
                    desc: "Deployment of Chronos-T5 and TimeGPT for synthetic job posting forecasting and seasonality isolation.",
                    statLabel: "T+30 Forecast",
                    statValue: "+12k (μ)",
                    icon: TrendingUp,
                    color: "emerald"
                  },
                  {
                    title: "Causal Extraction",
                    desc: "Leveraging DoubleML to quantify the structural impact of interest rate cycles on hiring volatility.",
                    statLabel: "P-Value",
                    statValue: "0.0041",
                    icon: Search,
                    color: "amber"
                  }
                ].map((card, i) => (
                  <motion.div 
                    key={i} 
                    className="glass-card-premium overflow-hidden flex flex-col group hover:border-white/20 transition-all duration-500"
                    whileHover={{ y: -5 }}
                  >
                    <div className="p-6">
                      <div className={`w-12 h-12 rounded-xl bg-${card.color}-500/10 flex items-center justify-center mb-4 border border-${card.color}-500/20 group-hover:bg-${card.color}-500/20 group-hover:scale-110 transition-all duration-500`}>
                        <card.icon className={`w-6 h-6 text-${card.color}-400`} />
                      </div>
                      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-white transition-colors capitalize underline decoration-accent-indigo/20 underline-offset-4">{card.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium italic">
                        {card.desc}
                      </p>
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest py-3 border-t border-white/5">
                        <span className={`text-${card.color}-400`}>{card.statLabel}</span>
                        <span className="text-white px-2 py-0.5 rounded bg-white/5">{card.statValue}</span>
                      </div>
                    </div>
                    <div className="mt-auto p-4 bg-white/[0.02] flex items-center justify-between group-hover:bg-white/[0.05] transition-all">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">MCP Architecture Ready</span>
                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* --- Global Footer --- */}
      <footer className="max-w-[1600px] mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em] italic">
        <div className="flex items-center gap-4">
          <p>© 2026 Labor Alpha Systems</p>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
          <p>Powered by Advanced Agentic Research Models</p>
        </div>
        <div className="flex gap-8">
          <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
            <Database className="w-3 h-3" /> Data Source: BLS/FRED/Indeed
          </span>
          <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
            <Network className="w-3 h-3" /> API Layer: mcp-orchestrator-v4
          </span>
          <span className="flex items-center gap-2 text-accent-indigo">
            <Clock className="w-3 h-3" /> Last Handshake: {lastSync}
          </span>
        </div>
      </footer>
    </div>
  );
};

export default LaborAlphaDashboard;
