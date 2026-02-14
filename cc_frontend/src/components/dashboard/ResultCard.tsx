'use client';

import { Download, CheckCircle, TrendingUp, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ResultCard({ data }: { data: any }) {
  const [isAnimating, setIsAnimating] = useState(false);
   
  // Safe Data Extraction from Python Backend Response
  // Using default values to prevent crashes if backend data is incomplete
  const score_card = data?.score_card || {};
  const metrics = data?.satellite_metrics || {};
  const risk = data?.risk_analysis || {};
  const crop = data?.crop_identification || {};
   
  // Graph Logic - Decodes Base64 image if sent by Python
  let graphSource = data?.graph_image;
  if (graphSource && !graphSource.startsWith('data:')) {
      graphSource = `data:image/png;base64,${graphSource}`;
  }

  // Formatting Logic
  const score = score_card.total_credit_score || 0;
  const tier = score_card.tier_label || 'Calculating...';
  const total_limit = score_card.max_eligible_loan || '₹ 0';
   
  // Calculate visual percentage for eligibility bar
  const eligibility = Math.min(100, Math.round((score / 900) * 100));
   
  // Metrics formatting (Handling potential python floats)
  const ndvi = metrics.ndvi_index ? Math.round(metrics.ndvi_index * 100) : 0;
  const coverage = metrics.vegetation_coverage ? Math.round(metrics.vegetation_coverage) : 0;
  const vigor = metrics.high_vigor_area ? Math.round(metrics.high_vigor_area) : 0;

  useEffect(() => { setIsAnimating(true); }, []);

  return (
    <div className={`h-full w-full flex flex-col gap-4 p-5 bg-white font-sans overflow-y-auto transition-opacity duration-700 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* HEADER */}
        <div className="flex items-center justify-between shrink-0">
            <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Assessment Report</h2>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-500 font-medium">Detected Crop:</span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                        {crop.detected_crop?.toUpperCase() || "UNKNOWN"}
                    </span>
                    <span className="text-[10px] text-slate-400">({crop.confidence}% Conf.)</span>
                </div>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide">Live Data</span>
            </div>
        </div>

        {/* TOP ROW: SCORE & LIMIT */}
        <div className="grid grid-cols-2 gap-4 shrink-0">
            
            {/* 1. Credit Score Card */}
            <div className="bg-slate-900 text-white rounded-xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between h-32">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl"></div>
                <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Credit Score</p>
                    <div className="text-4xl font-light tracking-tight">{score}</div>
                </div>
                <div className="flex justify-between items-end border-t border-white/10 pt-2">
                    <div className="text-xs font-medium text-emerald-400 truncate pr-2">{tier.split(':')[0]}</div>
                    <div className="text-[10px] text-slate-400 whitespace-nowrap">{score > 700 ? "Prime" : "Standard"}</div>
                </div>
            </div>

            {/* 2. Loan Limit Card */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 flex flex-col justify-between h-32">
                 <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Approved Limit</span>
                    <div className="text-xl font-semibold text-slate-900 mt-1">{total_limit}</div>
                 </div>
                 
                 <div className="space-y-1">
                     <div className="flex justify-between text-[10px] text-slate-500">
                        <span className="flex items-center gap-1">Rate <TrendingUp size={10}/></span>
                        <span className="font-bold text-emerald-600">{risk.recommended_interest_rate || "N/A"}</span>
                     </div>
                     <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${eligibility}%` }}></div>
                     </div>
                 </div>
            </div>
        </div>

        {/* METRICS ROW */}
        <div className="shrink-0">
           <p className="text-[10px] font-bold text-slate-800 mb-3 uppercase tracking-wide">Satellite Metrics (Sentinel-2)</p>
           <div className="grid grid-cols-3 gap-3">
              <MetricCircle percent={ndvi} label="NDVI" color="#10b981" />
              <MetricCircle percent={coverage} label="Coverage" color="#3b82f6" />
              <MetricCircle percent={vigor} label="Vigor" color="#f59e0b" />
           </div>
        </div>

        {/* RBI GRAPH or FALLBACK */}
        {graphSource ? (
            <div className="flex-1 min-h-0 border-t border-slate-100 pt-3 flex flex-col">
                <div className="flex justify-between items-center mb-2 shrink-0">
                    <p className="text-[10px] font-bold text-slate-800 uppercase tracking-wide">Yield Forecast</p>
                    <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200">AI Model</span>
                </div>
                <div className="flex-1 border border-slate-100 rounded-xl bg-white shadow-sm flex justify-center items-center overflow-hidden p-2 relative min-h-[120px]">
                    <img 
                        src={graphSource} 
                        alt="Crop Yield Breakdown" 
                        className="absolute inset-0 w-full h-full object-contain p-2" 
                    />
                </div>
            </div>
        ) : (
            <div className="flex-1 border-t border-slate-100 pt-3 flex flex-col justify-center items-center text-slate-400 gap-2">
                <AlertTriangle size={20} className="opacity-50" />
                <p className="text-xs">No visual graph data available</p>
            </div>
        )}

        {/* BUTTON */}
        <button className="w-full shrink-0 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 text-white text-sm font-semibold shadow-lg shadow-emerald-200 hover:bg-emerald-700 active:scale-[0.98] transition-all">
          <Download className="w-4 h-4" /> 
          Download KCC Report
        </button>
    </div>
  );
}

// --- COMPACT METRIC CIRCLE COMPONENT ---
function MetricCircle({ percent, label, color }: any) {
    const radius = 20; 
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    return (
        <div className="flex flex-col items-center bg-slate-50/50 rounded-lg p-2 border border-slate-100">
            <div className="relative w-12 h-12 flex items-center justify-center mb-1">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 50 50">
                    <circle cx="25" cy="25" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="4" />
                    <circle
                        cx="25" cy="25" r={radius} fill="none" stroke={color} strokeWidth="4"
                        strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                    />
                </svg>
                <span className="absolute text-[10px] font-bold text-slate-700">{percent}%</span>
            </div>
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">{label}</span>
        </div>
    );
}