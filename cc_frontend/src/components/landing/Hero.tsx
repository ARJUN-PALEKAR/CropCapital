'use client';

import { ChevronRight, Satellite } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import the map to avoid SSR issues with Leaflet
const IndiaMap = dynamic(() => import('@/src/components/landing/IndiaMap'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-100 animate-pulse rounded-2xl" />
});

interface HeroProps {
  onLaunchApp: () => void;
}

export default function Hero({ onLaunchApp }: HeroProps) {
  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden bg-white">
      
      {/* 1. Background: Clean Technical Dot Pattern */}
      <div className="absolute inset-0 z-0 bg-white">
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* 2. Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center py-20">
        
        {/* LEFT COLUMN: Text Content */}
        <div className="text-left space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-emerald-800 tracking-wide uppercase">
              Live Across India
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight">
            Credit for <br />
            <span className="text-emerald-600">India's Farmers.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
            We use satellite imagery and AI to create alternative credit scores for the next billion farmers. Instant loans, zero paperwork.
          </p>

          {/* Stats Grid (Mini)
          <div className="grid grid-cols-3 gap-6 py-4 border-t border-slate-100 max-w-md">
            <div>
              <p className="text-2xl font-bold text-slate-900">28</p>
              <p className="text-xs text-slate-500 font-medium uppercase mt-1">States Covered</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">500k+</p>
              <p className="text-xs text-slate-500 font-medium uppercase mt-1">Farmers</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">₹50Cr</p>
              <p className="text-xs text-slate-500 font-medium uppercase mt-1">Disbursed</p>
            </div>
          </div> */}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={onLaunchApp}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 text-white font-bold text-lg shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Analyze Farm
              <ChevronRight className="w-5 h-5" />
            </button>
            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-slate-700 font-bold text-lg border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all">
              View Demo
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Map */}
        <div className="relative h-[500px] w-full hidden lg:block perspective-1000">
          
          {/* Glass Card Container */}
          <div className="absolute inset-0 bg-white/60 backdrop-blur-md rounded-3xl border border-white/50 shadow-2xl overflow-hidden transform rotate-y-[-5deg] hover:rotate-y-0 transition-transform duration-700 ease-out-back">
            
            {/* Map Header */}
            <div className="absolute top-0 left-0 right-0 z-[400] px-6 py-4 bg-gradient-to-b from-white/90 to-transparent flex justify-between items-start pointer-events-none">
                <div>
                   <h3 className="text-sm font-bold text-slate-900">Live Coverage</h3>
                   <p className="text-xs text-emerald-600 font-medium">Real-time satellite uplink</p>
                </div>
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                </div>
            </div>

            {/* The Map Component */}
            <div className="w-full h-full grayscale-[20%] hover:grayscale-0 transition-all duration-500">
                <IndiaMap />
            </div>

            {/* Floating Info Card Overlay (Decorative) */}
            <div className="absolute bottom-6 right-6 z-[400] bg-white/90 backdrop-blur shadow-lg rounded-xl p-4 border border-slate-100 max-w-[200px] animate-in slide-in-from-bottom-4 fade-in duration-1000 delay-500">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <Satellite size={16} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-900">Processing</p>
                        <p className="text-[10px] text-slate-500">Sentinel-2A Feed</p>
                    </div>
                </div>
                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[70%] animate-pulse"></div>
                </div>
            </div>

          </div>

          {/* Decorative Blob behind map */}
          <div className="absolute -inset-4 bg-emerald-400/20 blur-3xl -z-10 rounded-full"></div>
        </div>

      </div>
    </section>
  );
}