'use client';

import { ChevronDown } from 'lucide-react';

interface HeroProps {
  onLaunchApp: () => void;
}

export default function Hero({ onLaunchApp }: HeroProps) {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-emerald-100 to-transparent opacity-40 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-tr from-blue-100 to-transparent opacity-40 blur-3xl animate-pulse delay-1000" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(circle_at_center,transparent_30%,black_100%)]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200/50 backdrop-blur-sm">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-medium bg-gradient-to-r from-emerald-700 to-emerald-600 bg-clip-text text-transparent">
            AI-Powered Agriculture Fintech
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-6xl md:text-7xl font-bold mb-6 text-slate-900 leading-tight">
          Credit for the <br />
          <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
            Next Billion Farmers.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
          Satellite-based risk assessment using Computer Vision & AI. Instant credit decisions powered by real-time agricultural data.
        </p>

        {/* CTA Button */}
        <button
          onClick={onLaunchApp}
          className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold text-lg hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95"
        >
          Launch Dashboard
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>

        {/* Stats Row */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto text-center">
          <div>
            <p className="text-3xl font-bold text-emerald-600">500K+</p>
            <p className="text-sm text-slate-600 mt-1">Farmers Connected</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-emerald-600">₹50B+</p>
            <p className="text-sm text-slate-600 mt-1">Credit Deployed</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-emerald-600">95%</p>
            <p className="text-sm text-slate-600 mt-1">Accuracy Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
}
