'use client';

import { Download, CheckCircle, TrendingUp, AlertTriangle, ExternalLink, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ResultCard({ data }: { data: any }) {
  const [isAnimating, setIsAnimating] = useState(false);
   
  const score_card = data?.score_card || {};
  const metrics = data?.satellite_metrics || {};
  const risk = data?.risk_analysis || {};
  const crop = data?.crop_identification || {};
  const web3 = data?.web3_data || null; // NEW: Grab Web3 Data

  let graphSource = data?.graph_image;
  if (graphSource && !graphSource.startsWith('data:')) {
      graphSource = `data:image/png;base64,${graphSource}`;
  }

  const score = score_card.total_credit_score || 0;
  const ndvi = metrics.ndvi_index ? Math.round(metrics.ndvi_index * 100) : 0;
  
  useEffect(() => { setIsAnimating(true); }, []);

  return (
    <div className={`h-full w-full flex flex-col gap-4 p-5 bg-white font-sans overflow-y-auto transition-opacity duration-700 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* HEADER */}
        <div className="flex items-center justify-between shrink-0">
            <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Assessment Report</h2>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-500 font-medium">Detected:</span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                        {crop.detected_crop?.toUpperCase() || "UNKNOWN"}
                    </span>
                </div>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[10px] font-bold text-emerald-700 uppercase">Live</span>
            </div>
        </div>

        {/* WEB3 TRUST BADGE (NEW SECTION) */}
        {web3 && web3.tx_hash && (
            <div className="shrink-0 bg-slate-900 rounded-lg p-3 flex items-center justify-between border-l-4 border-purple-500 shadow-md">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-full">
                        <ShieldCheck className="text-purple-400 w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-purple-300 uppercase tracking-wider">Blockchain Verified</p>
                        <p className="text-xs text-white font-medium">{web3.status}</p>
                    </div>
                </div>
                <a 
                    href={web3.explorer_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[10px] font-bold text-slate-900 bg-white px-3 py-1.5 rounded hover:bg-slate-200 transition-colors"
                >
                    View Proof <ExternalLink size={10} />
                </a>
            </div>
        )}

        {/* SCORES ROW */}
        <div className="grid grid-cols-2 gap-4 shrink-0">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Credit Score</p>
                <div className="text-4xl font-light tracking-tight text-slate-900">{score}</div>
                <div className="text-[10px] text-emerald-600 font-bold mt-1">{score > 700 ? "Prime Tier" : "Standard Tier"}</div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Approved Limit</p>
                 <div className="text-xl font-semibold text-slate-900 mt-1">{score_card.max_eligible_loan}</div>
                 <div className="text-[10px] text-slate-500 mt-2 flex items-center gap-1">
                    <TrendingUp size={10}/> Rate: <span className="font-bold text-slate-900">{risk.recommended_interest_rate}</span>
                 </div>
            </div>
        </div>

        {/* SATELLITE METRICS */}
        <div className="shrink-0">
           <p className="text-[10px] font-bold text-slate-800 mb-2 uppercase">Satellite Data (Sentinel-2)</p>
           <div className="flex gap-2">
               <div className="flex-1 bg-green-50 p-2 rounded border border-green-100 text-center">
                   <div className="text-lg font-bold text-green-700">{ndvi}%</div>
                   <div className="text-[9px] text-green-600 uppercase">NDVI</div>
               </div>
               <div className="flex-1 bg-blue-50 p-2 rounded border border-blue-100 text-center">
                   <div className="text-lg font-bold text-blue-700">{data?.crop_identification?.confidence}%</div>
                   <div className="text-[9px] text-blue-600 uppercase">Confidence</div>
               </div>
           </div>
        </div>

        {/* GRAPH */}
        {graphSource && (
            <div className="flex-1 min-h-0 border-t border-slate-100 pt-3 flex flex-col items-center justify-center">
                <img src={graphSource} alt="Graph" className="max-h-32 object-contain" />
            </div>
        )}
    </div>
  );
}