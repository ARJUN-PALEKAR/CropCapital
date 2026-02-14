'use client';

import dynamic from 'next/dynamic';
import { Loader2, Satellite } from 'lucide-react';

const LeafletMap = dynamic(() => import('@/src/components/map/LeafletMap'), { 
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center text-slate-500">
      <div className="mb-3">
        <Satellite className="w-12 h-12 text-slate-400 opacity-50" />
      </div>
      <p className="text-sm font-medium">Initializing Satellite Uplink...</p>
    </div>
  )
});

interface MapSectionProps {
  targetLocation?: { lat: number, lng: number } | null;
  isScanning: boolean;
}

export default function MapSection({ targetLocation, isScanning }: MapSectionProps) {
  return (
    <div className="relative w-full h-full bg-slate-100 overflow-hidden">
      
      {/* MAP LAYER */}
      <div className="absolute inset-0 z-0">
        <LeafletMap targetLocation={targetLocation} />
      </div>

      {/* SCANNING OVERLAY */}
      {isScanning && (
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-br from-emerald-900/5 to-emerald-900/0 backdrop-blur-[1px] flex items-center justify-center">
          {/* Concentric circles animation */}
          <div className="relative w-80 h-80">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-2 border-emerald-400/20 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]" />
            
            {/* Middle ring */}
            <div className="absolute inset-8 rounded-full border-2 border-emerald-500/40" />
            
            {/* Inner ring */}
            <div className="absolute inset-16 rounded-full border-2 border-emerald-600/60" />

            {/* Center card */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl px-8 py-6 shadow-2xl border border-white/40 text-center">
                <div className="relative w-12 h-12 mb-4 mx-auto">
                  <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
                </div>
                <h3 className="text-slate-900 font-bold text-lg mb-1">Processing Imagery</h3>
                <p className="text-sm text-slate-600">Analyzing spectral data...</p>
                <div className="mt-4 flex gap-1 justify-center">
                  <div className="w-1 h-1 rounded-full bg-emerald-600 animate-[bounce_1.5s_infinite]" />
                  <div className="w-1 h-1 rounded-full bg-emerald-600 animate-[bounce_1.5s_infinite] delay-100" />
                  <div className="w-1 h-1 rounded-full bg-emerald-600 animate-[bounce_1.5s_infinite] delay-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STATUS BADGE - Bottom Left */}
      {!isScanning && targetLocation && (
        <div className="absolute bottom-4 left-4 z-30 bg-white/95 backdrop-blur-md border border-white/50 rounded-lg px-4 py-2 shadow-lg animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-xs font-mono text-slate-700">
              <span className="text-slate-500">LAT/LON: </span>
              <span className="font-bold text-slate-900">{targetLocation.lat.toFixed(4)}, {targetLocation.lng.toFixed(4)}</span>
            </p>
            <span className="text-slate-300 text-xs">•</span>
            <p className="text-xs font-mono text-emerald-600 font-bold">SENTINEL-2 LIVE</p>
          </div>
        </div>
      )}

      {/* Satellite icon watermark */}
      <div className="absolute top-4 right-4 z-10 opacity-10 pointer-events-none">
        <Satellite className="w-20 h-20 text-slate-600" />
      </div>
    </div>
  );
}