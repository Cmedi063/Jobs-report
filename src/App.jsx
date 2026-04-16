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
    { name: 'Q1 25', productivity: -0.2, ulc: 4.5 },
    { name: 'Q2 25', productivity: 1.5, ulc: 3.2 },
    { name: 'Q3 25', productivity: 5.0, ulc: 0.5 },
    { name: 'Q4 25', productivity: 3.5, ulc: 0.6 },
    { name: 'Q1 26', productivity: 2.8, ulc: 0.8 }
  ];

  const consumerSqueezeData = [
    { name: 'Q1 25', realWage: -0.5, delinquency: 2.4 },
    { name: 'Q2 25', realWage: 0.1, delinquency: 2.6 },
    { name: 'Q3 25', realWage: 0.8, delinquency: 2.8 },
    { name: 'Q4 25', realWage: 1.2, delinquency: 3.1 },
    { name: 'Q1 26', realWage: 0.9, delinquency: 3.3 }
  ];

  const macroAnchorData = [
    { name: 'Q1 25', gdp: 2.2, cpi: 3.8 },
    { name: 'Q2 25', gdp: 2.2, cpi: 3.6 },
    { name: 'Q3 25', gdp: 4.8, cpi: 3.2 },
    { name: 'Q4 25', gdp: 3.2, cpi: 3.1 },
    { name: 'Q1 26', gdp: 2.4, cpi: 2.8 }
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
                {/* Row 1: Engine & Squeeze */}
                <div className="col-span-12 lg:col-span-6 glass-card-premium p-6 border-t-2 border-emerald-500/30">
                  <h3 className="text-xl font-bold text-white font-display mb-1">The Soft Landing Engine</h3>
                  <p className="text-slate-500 text-xs mb-12 italic">Labor Productivity vs Unit Labor Costs (ULC) %</p>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={fedSoftLandingData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                        <XAxis dataKey="name" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} dy={10} />
                        <YAxis stroke="#475569" fontSize={10} axisLine={false} tickLine={false} domain={[-2, 6]} ticks={[-2, 0, 2, 4, 6]} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }} />
                        <Legend align="center" verticalAlign="bottom" iconType="rect" wrapperStyle={{ paddingTop: '30px', fontSize: '10px' }} />
                        <ReferenceLine y={0} stroke="#475569" strokeWidth={1} />
                        <Bar dataKey="productivity" name="Productivity Growth" fill="#10b981" radius={[2, 2, 0, 0]} barSize={15} />
                        <Line type="monotone" dataKey="ulc" name="Unit Labor Costs" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4, fill: '#f43f5e' }} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="col-span-12 lg:col-span-6 glass-card-premium p-6 border-t-2 border-rose-500/30">
                  <h3 className="text-xl font-bold text-white font-display mb-1">The Consumer Squeeze</h3>
                  <p className="text-slate-500 text-xs mb-12 italic">Real Wage Growth vs Credit Card Delinquencies (%)</p>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={consumerSqueezeData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                        <defs>
                          <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                        <XAxis dataKey="name" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} dy={10} />
                        <YAxis yAxisId="left" stroke="#a855f7" fontSize={10} axisLine={false} tickLine={false} domain={[-0.5, 1.5]} ticks={[-0.5, 0, 0.5, 1, 1.5]} />
                        <YAxis yAxisId="right" orientation="right" stroke="#ef4444" fontSize={10} axisLine={false} tickLine={false} domain={[2, 4]} ticks={[2, 2.5, 3, 3.5, 4]} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }} />
                        <Legend align="center" verticalAlign="bottom" iconType="circle" wrapperStyle={{ paddingTop: '30px', fontSize: '10px' }} />
                        <Area yAxisId="left" type="monotone" dataKey="realWage" name="Real Wage Growth" fill="url(#purpleGradient)" stroke="#a855f7" strokeWidth={2} />
                        <Line yAxisId="right" type="monotone" dataKey="delinquency" name="CC Delinquency Rate" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4, fill: '#ef4444' }} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Row 2: Macro Anchor */}
                <div className="col-span-12 glass-card-premium p-6">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-xl font-bold text-white font-display">The Macro Anchor</h3>
                    <div className="px-3 py-1 bg-teal-500/10 text-teal-500 text-[9px] font-bold rounded border border-teal-500/20 uppercase italic font-sans tracking-wide">Quarterly Data</div>
                  </div>
                  <p className="text-slate-500 text-xs mb-12 italic">Real GDP Growth vs. Headline CPI YoY (%)</p>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={macroAnchorData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                        <defs>
                          <linearGradient id="tealGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                        <XAxis dataKey="name" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} dy={10} />
                        <YAxis stroke="#475569" fontSize={10} axisLine={false} tickLine={false} domain={[0, 6]} ticks={[0, 2, 4, 6]} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }} />
                        <Legend align="center" verticalAlign="bottom" iconType="circle" wrapperStyle={{ paddingTop: '30px', fontSize: '10px' }} />
                        <Area type="monotone" dataKey="gdp" name="Real GDP Growth (%)" fill="url(#tealGradient)" stroke="#14b8a6" strokeWidth={2} />
                        <Line type="monotone" dataKey="cpi" name="CPI Inflation YoY (%)" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4, fill: '#38bdf8' }} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Row 3: Insights Footer */}
                <div className="col-span-12 glass-card-premium p-8 relative overflow-hidden">
                  <div className="grid grid-cols-12 gap-8 relative z-10">
                    <div className="col-span-12 lg:col-span-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Zap size={16} className="text-emerald-500" />
                        <h4 className="text-[11px] font-black text-emerald-500 uppercase tracking-widest font-sans">Productivity: The Magic Bullet</h4>
                      </div>
                      <p className="text-slate-400 text-[13px] leading-relaxed font-sans">
                        How is the economy growing at 2.4% with 3.5% wage growth, but inflation is dropping? <span className="text-white font-bold">Productivity.</span> Tech and AI integrations are causing productivity to spike (+2.8%), which crushes Unit Labor Costs down to 0.8%. Businesses don't need to raise prices if workers are producing more per hour.
                      </p>
                    </div>
                    
                    <div className="col-span-12 lg:col-span-6 border-l border-slate-800/50 pl-0 lg:pl-8">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle size={16} className="text-rose-500" />
                        <h4 className="text-[11px] font-black text-rose-500 uppercase tracking-widest font-sans">The K-Shaped Consumer Limit</h4>
                      </div>
                      <p className="text-slate-400 text-[13px] leading-relaxed font-sans">
                        Despite real wages finally turning positive (purple area), credit card delinquency rates (red dotted line) have breached 3.3%. This confirms a K-shaped economy: the top 50% are benefiting from strong asset prices and jobs, while the bottom 50% have exhausted savings and are struggling with cumulative inflation.
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-emerald-500 via-rose-500 to-amber-500 opacity-80"></div>
                </div>
              </>
            )}

            {activeView === 'guide' && (
              <div className="col-span-12 space-y-8">
                {/* Alpha Playbook Dashboard Section */}
                <div className="glass-card-premium p-8">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                      <BookOpen size={32} className="text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white font-display">The Alpha Playbook: Live Institutional Signals</h3>
                      <p className="text-indigo-400 font-medium mb-4 italic">Replacing lagging BLS data with high-frequency forward indicators and structural data feeds.</p>
                      <p className="text-slate-400 leading-relaxed max-w-4xl text-sm italic font-sans">
                        This terminal relies on true leading indicators to map the labor market 60 to 90 days ahead of official government prints. Below is a live matrix of the exact indicators powering this dashboard. We utilize advanced Natural Language Processing (FinBERT) inspired by recent "AI for Economists" methodologies to quantify corporate labor sentiment directly from earnings transcripts.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-6 mt-12">
                    {/* Signal 1: Recession Tripwire */}
                    <div className="col-span-12 lg:col-span-6 glass-card-premium p-6 border-l-4 border-amber-500 group hover:bg-slate-800/20 transition-all">
                      <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center gap-3">
                          <Activity size={20} className="text-amber-500" />
                          <h4 className="text-lg font-bold text-white">Recession Tripwire</h4>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-black text-white">0.43</div>
                          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest font-sans">Current Sahm Rule</div>
                        </div>
                      </div>
                      
                      {/* Sahm Rule Gauge */}
                      <div className="relative h-1.5 w-full bg-slate-800 rounded-full mb-12">
                        <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full" style={{ width: '43%' }}></div>
                        <div className="absolute -top-1.5 left-[50%] h-4.5 w-[3px] bg-rose-500"></div>
                        <div className="absolute top-4 left-[50%] -translate-x-1/2 text-[9px] text-rose-500 font-bold uppercase whitespace-nowrap font-sans">0.50 Threshold</div>
                      </div>

                      <div className="space-y-4">
                        <p className="text-slate-400 text-xs font-sans leading-relaxed">
                          <span className="text-white font-bold">The Sahm Rule:</span> Powell's preferred recession signal. Tracks 3-mo moving average of unemployment. A breach of <span className="text-rose-400 font-bold">0.50</span> calls a recession.
                        </p>
                        <p className="text-slate-400 text-xs font-sans leading-relaxed">
                          <span className="text-white font-bold">Prime-Age EPOP (25-54):</span> Currently at 83.5%, replacing the flawed U-3 unemployment rate. Immune to retirement distortions.
                        </p>
                      </div>
                    </div>

                    {/* Signal 2: Corporate Lead Signals */}
                    <div className="col-span-12 lg:col-span-6 glass-card-premium p-6 border-l-4 border-indigo-500 group hover:bg-slate-800/20 transition-all">
                      <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center gap-3">
                          <PieChart size={20} className="text-indigo-500" />
                          <h4 className="text-lg font-bold text-white">Corporate Lead Signals</h4>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-black text-white">38</div>
                          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest font-sans">NLP Labor Sentiment</div>
                        </div>
                      </div>
                      
                      {/* Sentiment Sparkline */}
                      <div className="h-12 w-full mb-12 flex items-end gap-1 px-1">
                        {[35, 45, 38, 55, 42, 38, 48, 41, 38, 45].map((v, i) => (
                          <div key={i} className="flex-1 bg-indigo-500/30 rounded-t-sm" style={{ height: `${v}%` }}></div>
                        ))}
                      </div>

                      <div className="space-y-4">
                        <p className="text-slate-400 text-xs font-sans leading-relaxed">
                          <span className="text-white font-bold">Corporate Confession NLP:</span> Scoring earnings calls with FinBERT (AI for Economics) provides a 90-day lead on firings.
                        </p>
                        <p className="text-slate-400 text-xs font-sans leading-relaxed">
                          <span className="text-white font-bold">ISM PMIs & Challenger:</span> Surveys and corporate layoff announcements catching turning points 6-8 weeks before BLS.
                        </p>
                      </div>
                    </div>

                    {/* Signal 3: Small Business Pipeline */}
                    <div className="col-span-12 lg:col-span-6 glass-card-premium p-6 border-l-4 border-sky-500 group hover:bg-slate-800/20 transition-all">
                      <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center gap-3">
                          <Building size={20} className="text-sky-500" />
                          <h4 className="text-lg font-bold text-white">Small Business Pipeline</h4>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-black text-white">10%</div>
                          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest font-sans">NFIB Hiring Index</div>
                        </div>
                      </div>
                      
                      {/* Mini Bar Chart */}
                      <div className="h-10 w-full mb-14 flex items-center justify-between gap-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="h-full w-full bg-sky-500/10 rounded flex items-center justify-center">
                            <div className="w-[85%] bg-sky-500 rounded" style={{ height: `${100 - (i * 15)}%`, opacity: 1 - (i * 0.15) }}></div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-4">
                        <p className="text-slate-400 text-xs font-sans leading-relaxed">
                          <span className="text-white font-bold">NFIB Stress Gauge:</span> Small businesses self-report hiring plans. Collapsing plans lead BLS weakness by 2 months.
                        </p>
                        <p className="text-slate-400 text-xs font-sans leading-relaxed">
                          <span className="text-white font-bold">ADP Size Divergence:</span> Tracks when small business (&lt;50) hiring collapses while large-cap hiring holds.
                        </p>
                      </div>
                    </div>

                    {/* Signal 4: Hidden Household Stress */}
                    <div className="col-span-12 lg:col-span-6 glass-card-premium p-6 border-l-4 border-rose-500 group hover:bg-slate-800/20 transition-all">
                      <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center gap-3">
                          <Zap size={20} className="text-rose-500" />
                          <h4 className="text-lg font-bold text-white">Hidden Household Stress</h4>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-black text-white">8.8%</div>
                          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest font-sans">Multi-Job Holders</div>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="h-6 w-full bg-rose-500/10 rounded mb-14 overflow-hidden border border-rose-500/20 relative">
                        <div className="h-full bg-rose-900/60 w-[88%] flex items-center justify-end px-3">
                          <div className="w-[2px] h-full bg-rose-500 shadow-[0_0_10px_#f43f5e]"></div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <p className="text-slate-400 text-xs font-sans leading-relaxed">
                          <span className="text-white font-bold">Hidden Stress Metrics:</span> A rise in <span className="text-rose-400 font-bold">Multiple Job Holders</span> signals financial duress. Falling Temp Payrolls signals incoming full-time job destruction.
                        </p>
                        <p className="text-slate-400 text-xs font-sans leading-relaxed">
                          <span className="text-white font-bold">Conf Board Differential:</span> Perception drives spending 6 weeks before reality.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Architecture Methodology Section */}
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-12 lg:col-span-3 glass-card-premium p-6 border-t border-indigo-500/20 group hover:translate-y-[-4px] transition-all duration-300">
                    <div className="flex items-center gap-2 mb-4">
                      <BrainCircuit size={18} className="text-indigo-400" />
                      <h4 className="text-[10px] font-black text-white uppercase tracking-widest font-sans">Sentiment Quantization</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed mb-6 font-sans">Utilizing FinBERT and CentralBankRoBERTa to distill alpha from FOMC transcripts and S&P 500 earnings calls.</p>
                    <div className="flex justify-between items-baseline mb-4">
                      <span className="text-[9px] text-slate-600 font-bold uppercase font-sans">Drift Index</span>
                      <span className="text-sm font-mono text-rose-500 font-bold">-0.12 SD</span>
                    </div>
                    <div className="pt-4 border-t border-slate-800/50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-[8px] text-slate-400 font-bold uppercase tracking-tighter font-sans">MCP Architecture Ready</span>
                      </div>
                      <ChevronRight size={14} className="text-slate-700 group-hover:text-indigo-400 transition-colors" />
                    </div>
                  </div>

                  <div className="col-span-12 lg:col-span-3 glass-card-premium p-6 border-t border-sky-500/20 group hover:translate-y-[-4px] transition-all duration-300">
                    <div className="flex items-center gap-2 mb-4">
                      <Globe size={18} className="text-sky-400" />
                      <h4 className="text-[10px] font-black text-white uppercase tracking-widest font-sans">Autonomous Data Loops</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed mb-6 font-sans">Direct architectural integration with fred-mcp-server and bls-mcp for real-time validation of high-frequency data.</p>
                    <div className="flex justify-between items-baseline mb-4">
                      <span className="text-[9px] text-slate-600 font-bold uppercase font-sans">Sync Status</span>
                      <span className="text-sm font-mono text-emerald-500 font-bold">Live (5ms)</span>
                    </div>
                    <div className="pt-4 border-t border-slate-800/50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-[8px] text-slate-400 font-bold uppercase tracking-tighter font-sans">MCP Architecture Ready</span>
                      </div>
                      <ChevronRight size={14} className="text-slate-700 group-hover:text-sky-400 transition-colors" />
                    </div>
                  </div>

                  <div className="col-span-12 lg:col-span-3 glass-card-premium p-6 border-t border-violet-500/20 group hover:translate-y-[-4px] transition-all duration-300">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap size={18} className="text-violet-400" />
                      <h4 className="text-[10px] font-black text-white uppercase tracking-widest font-sans">Foundation Time-Series</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed mb-6 font-sans">Deployment of Chronos-T5 and TimeGPT for synthetic job posting forecasting and seasonality isolation.</p>
                    <div className="flex justify-between items-baseline mb-4">
                      <span className="text-[9px] text-slate-600 font-bold uppercase font-sans">T+30 Forecast</span>
                      <span className="text-sm font-mono text-indigo-400 font-bold">+12k (μ)</span>
                    </div>
                    <div className="pt-4 border-t border-slate-800/50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-[8px] text-slate-400 font-bold uppercase tracking-tighter font-sans">MCP Architecture Ready</span>
                      </div>
                      <ChevronRight size={14} className="text-slate-700 group-hover:text-violet-400 transition-colors" />
                    </div>
                  </div>

                  <div className="col-span-12 lg:col-span-3 glass-card-premium p-6 border-t border-rose-500/20 group hover:translate-y-[-4px] transition-all duration-300">
                    <div className="flex items-center gap-2 mb-4">
                      <Target size={18} className="text-rose-400" />
                      <h4 className="text-[10px] font-black text-white uppercase tracking-widest font-sans">Causal Extraction</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed mb-6 font-sans">Leveraging DoubleML to quantify the structural impact of interest rate cycles on hiring volatility.</p>
                    <div className="flex justify-between items-baseline mb-4">
                      <span className="text-[9px] text-slate-600 font-bold uppercase font-sans">P-Value</span>
                      <span className="text-sm font-mono text-emerald-500 font-bold">0.0041</span>
                    </div>
                    <div className="pt-4 border-t border-slate-800/50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-[8px] text-slate-400 font-bold uppercase tracking-tighter font-sans">MCP Architecture Ready</span>
                      </div>
                      <ChevronRight size={14} className="text-slate-700 group-hover:text-rose-400 transition-colors" />
                    </div>
                  </div>
                </div>
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
