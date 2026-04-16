import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, LineChart, Line, AreaChart, Area, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, ReferenceLine, Cell, ComposedChart, ZAxis, PieChart, Pie
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Activity, CloudLightning, Sun, Users, Briefcase, Info, 
  Zap, AlertCircle, BookOpen, Gauge, BrainCircuit, Globe, Building, Target, 
  ChevronRight, ArrowUpRight, ArrowDownRight, Layers, Database, Cpu, Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const [activeView, setActiveView] = useState('macro');

  // Enhanced Data: Added "Distortion" metric
  const weatherTrendData = [
    { month: 'Sep 25', BLS_Official: 76, Weather_Adjusted: 74, Distortion: 2 },
    { month: 'Oct 25', BLS_Official: -140, Weather_Adjusted: -152, Distortion: 12 },
    { month: 'Nov 25', BLS_Official: 41, Weather_Adjusted: 28, Distortion: 13 },
    { month: 'Dec 25', BLS_Official: -17, Weather_Adjusted: -14, Distortion: -3 },
    { month: 'Jan 26', BLS_Official: 126, Weather_Adjusted: 135, Distortion: -9 },
    { month: 'Feb 26', BLS_Official: 104, Weather_Adjusted: 98, Distortion: 6 },
    { month: 'Mar 26', BLS_Official: 185, Weather_Adjusted: 168, Distortion: 17 }
  ];

  const sectorMatrixData = [
    { sector: 'Leisure', growth: 42, wageChange: 5.2, weatherSensitivity: 85, color: '#f43f5e' },
    { sector: 'Construction', growth: 12, wageChange: 4.8, weatherSensitivity: 70, color: '#fbbf24' },
    { sector: 'Healthcare', growth: 78, wageChange: 3.9, weatherSensitivity: 15, color: '#10b981' },
    { sector: 'Tech', growth: -8, wageChange: 6.1, weatherSensitivity: 5, color: '#6366f1' },
    { sector: 'Retail', growth: 5, wageChange: 4.2, weatherSensitivity: 40, color: '#ec4899' },
    { sector: 'Manufacturing', growth: -12, wageChange: 3.5, weatherSensitivity: 25, color: '#64748b' }
  ];

  const qualityMixData = [
    { subject: 'FT Stability', A: 85, B: 92, fullMark: 100 },
    { subject: 'Nominal Growth', A: 75, B: 65, fullMark: 100 },
    { subject: 'Hours Worked', A: 90, B: 82, fullMark: 100 },
    { subject: 'Benefits', A: 60, B: 55, fullMark: 100 },
    { subject: 'Remote Index', A: 45, B: 40, fullMark: 100 }
  ];

  const fedAlphaData = [
    { name: 'Jan', productivity: 2.1, unitLaborCost: 3.2, realWage: 1.1 },
    { name: 'Feb', productivity: 2.4, unitLaborCost: 2.8, realWage: 1.3 },
    { name: 'Mar', productivity: 1.8, unitLaborCost: 3.5, realWage: 0.8 },
    { name: 'Apr', productivity: 2.2, unitLaborCost: 2.9, realWage: 1.4 }
  ];

  const activeTabStyle = "bg-blue-600/20 text-blue-400 border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]";
  const inactiveTabStyle = "text-slate-400 hover:bg-white/5 hover:text-white border border-transparent";

  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans selection:bg-blue-500/30">
      {/* Header Section */}
      <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-white">
              Labor Alpha <span className="text-blue-500">Dashboard</span>
            </h1>
          </div>
          <p className="text-slate-400 text-sm md:text-base flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            V1.4.2 Institutional Feed • Weather-Adjusted Realities • AI-Driven Insights
          </p>
        </div>

        <nav className="flex flex-wrap gap-2 bg-slate-900/50 p-1 rounded-xl border border-white/5 backdrop-blur-md">
          {[
            { id: 'macro', icon: Globe, label: 'Macro Reality' },
            { id: 'sector', icon: Target, label: 'Sector Matrix' },
            { id: 'fed', icon: Building, label: 'Fed Watch' },
            { id: 'guide', icon: BrainCircuit, label: '10x Alpha Guide' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeView === tab.id ? activeTabStyle : inactiveTabStyle
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {activeView === 'macro' && (
              <>
                <div className="lg:col-span-8 glass-card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <CloudLightning className="w-5 h-5 text-amber-400" />
                        The Weather-Adjusted Reality Gap
                      </h3>
                      <p className="text-slate-400 text-sm">Quantifying the distortion between official stats and structural health</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-xs text-slate-300">Weather Adjusted</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-slate-600" />
                        <span className="text-xs text-slate-300">Official BLS</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={weatherTrendData}>
                        <defs>
                          <linearGradient id="colorAdjusted" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                        <XAxis 
                          dataKey="month" 
                          stroke="#64748b" 
                          fontSize={12} 
                          tickLine={false} 
                          axisLine={false}
                        />
                        <YAxis 
                          stroke="#64748b" 
                          fontSize={12} 
                          tickLine={false} 
                          axisLine={false}
                          tickFormatter={(value) => `${value}k`}
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '12px' }}
                          itemStyle={{ color: '#fff' }}
                        />
                        <Legend />
                        <Area type="monotone" dataKey="Weather_Adjusted" stroke="#3b82f6" strokeWidth={3} fill="url(#colorAdjusted)" />
                        <Line type="monotone" dataKey="BLS_Official" stroke="#64748b" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4, fill: '#64748b' }} />
                        <Bar dataKey="Distortion" fill="#fbbf24" radius={[4, 4, 0, 0]} opacity={0.6} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-6">
                  <div className="stat-card">
                    <div className="flex justify-between items-start">
                      <p className="text-slate-400 text-sm font-medium">Monthly Alpha Gap</p>
                      <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                        <Zap className="w-4 h-4" />
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold text-white mt-1">+17.4k</h2>
                    <p className="text-amber-500 text-xs flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      Highest distortion in 4 months
                    </p>
                  </div>

                  <div className="glass-card p-6 flex-1">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-blue-400" />
                      Analysis Summary
                    </h3>
                    <div className="space-y-4">
                      <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                        <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Signal strength</p>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-blue-500 h-full w-[78%]" />
                        </div>
                      </div>
                      <ul className="text-sm text-slate-300 space-y-3">
                        <li className="flex gap-2">
                          <span className="text-blue-500">•</span> 
                          March weather was 2.4°C above mean, inflating construction and leisure by ~15k.
                        </li>
                        <li className="flex gap-2">
                          <span className="text-blue-500">•</span> 
                          Reality-adjusted growth sits at 168k vs initial 185k report.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeView === 'sector' && (
              <div className="lg:col-span-12 glass-card p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-white">Sector Momentum Matrix</h3>
                    <p className="text-slate-400 text-sm">Growth vs Wage Pressure cross-tabulated with sensitivity</p>
                  </div>
                </div>
                
                <div className="h-[500px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis type="number" dataKey="growth" name="Job Growth" unit="k" stroke="#64748b" />
                      <YAxis type="number" dataKey="wageChange" name="Wage Change" unit="%" stroke="#64748b" />
                      <ZAxis type="number" dataKey="weatherSensitivity" range={[100, 1000]} />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Legend />
                      {sectorMatrixData.map((entry, index) => (
                        <Scatter 
                          key={`sector-${index}`} 
                          name={entry.sector} 
                          data={[entry]} 
                          fill={entry.color}
                        />
                      ))}
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeView === 'fed' && (
              <>
                <div className="lg:col-span-8 glass-card p-6">
                  <h3 className="text-lg font-bold text-white mb-6">Productivity vs Unit Labor Costs</h3>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={fedAlphaData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                        <XAxis dataKey="name" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }} />
                        <Legend />
                        <Line type="monotone" dataKey="productivity" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981' }} />
                        <Line type="monotone" dataKey="unitLaborCost" stroke="#f43f5e" strokeWidth={3} dot={{ fill: '#f43f5e' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="lg:col-span-4 glass-card p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Real Wage Compression</h3>
                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-slate-400 text-sm">Real Wage Delta</p>
                        <h4 className="text-2xl font-bold text-white">+0.8%</h4>
                      </div>
                      <div className="text-emerald-500 text-sm font-bold flex items-center mb-1">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        Moderate
                      </div>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[65%]" />
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Fed narrative target is sub-0.5% real wage growth to cool services inflation. March data supports a "Hawkish Hold" scenario.
                    </p>
                  </div>
                </div>
              </>
            )}

            {activeView === 'guide' && (
              <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Methodology Card: NLP */}
                <div className="glass-card overflow-hidden flex flex-col group">
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 border border-purple-500/20">
                      <Cpu className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">Sentiment Quantization</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      Utilizing <strong>FinBERT</strong> and <strong>CentralBankRoBERTa</strong> to distill alpha from FOMC transcripts and S&P 500 earnings calls.
                    </p>
                    <div className="flex items-center justify-between text-xs font-mono py-2 border-t border-white/5">
                      <span className="text-purple-400">Drift Index</span>
                      <span className="text-slate-300">-0.12 SD</span>
                    </div>
                  </div>
                  <div className="mt-auto bg-purple-500/5 p-4 group-hover:bg-purple-500/10 transition-colors">
                    <button className="text-purple-400 text-sm font-medium flex items-center gap-2">
                      View Model Architecture <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Methodology Card: MCP */}
                <div className="glass-card overflow-hidden flex flex-col group">
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 border border-blue-500/20">
                      <Database className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">Autonomous Data Loops</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      Direct architectural integration with <strong>fred-mcp-server</strong> and <strong>bls-mcp</strong> for real-time validation of alternative data signals.
                    </p>
                    <div className="flex items-center justify-between text-xs font-mono py-2 border-t border-white/5">
                      <span className="text-blue-400">Sync Status</span>
                      <span className="text-emerald-500">Live (5ms)</span>
                    </div>
                  </div>
                  <div className="mt-auto bg-blue-500/5 p-4 group-hover:bg-blue-500/10 transition-colors">
                    <button className="text-blue-400 text-sm font-medium flex items-center gap-2">
                      MCP Configuration <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Methodology Card: Now-Casting */}
                <div className="glass-card overflow-hidden flex flex-col group">
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 border border-emerald-500/20">
                      <TrendingUp className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">Foundation Time-Series</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      Deployment of <strong>Chronos-T5</strong> and <strong>TimeGPT</strong> for synthetic job posting forecasting and seasonality isolation.
                    </p>
                    <div className="flex items-center justify-between text-xs font-mono py-2 border-t border-white/5">
                      <span className="text-emerald-400">T+30 Forecast</span>
                      <span className="text-slate-300">+12k (μ)</span>
                    </div>
                  </div>
                  <div className="mt-auto bg-emerald-500/5 p-4 group-hover:bg-emerald-500/10 transition-colors">
                    <button className="text-emerald-400 text-sm font-medium flex items-center gap-2">
                      Accuracy metrics <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Methodology Card: Causal Inference */}
                <div className="glass-card overflow-hidden flex flex-col group">
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4 border border-amber-500/20">
                      <Search className="w-6 h-6 text-amber-400" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">Causal Extraction</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      Leveraging <strong>DoubleML</strong> to quantify the true structural impact of interest rate changes on hiring, isolating exogenous shocks.
                    </p>
                    <div className="flex items-center justify-between text-xs font-mono py-2 border-t border-white/5">
                      <span className="text-amber-400">P-Value</span>
                      <span className="text-slate-300">0.0041</span>
                    </div>
                  </div>
                  <div className="mt-auto bg-amber-500/5 p-4 group-hover:bg-amber-500/10 transition-colors">
                    <button className="text-amber-400 text-sm font-medium flex items-center gap-2">
                      View Causal Graph <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Info */}
      <footer className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs uppercase tracking-widest">
          <p>© 2026 Labor Alpha Systems • Powered by Gemini Advanced Agentic Coding</p>
          <div className="flex gap-6">
            <span className="flex items-center gap-1"><Layers className="w-3 h-3" /> Data: BLS/FRED</span>
            <span className="flex items-center gap-1"><Cpu className="w-3 h-3" /> Model: EconBERTa-Large</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
