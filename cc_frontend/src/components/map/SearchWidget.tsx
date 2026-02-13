'use client';

import React, { useState } from 'react';
import { Search, MapPin, Navigation } from 'lucide-react';

interface SearchWidgetProps {
  onSearch: (lat: string, lng: string) => void;
}

export function SearchWidget({ onSearch }: SearchWidgetProps) {
  const [latitude, setLatitude] = useState('20.5937');
  const [longitude, setLongitude] = useState('78.9629');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      onSearch(latitude, longitude);
      setIsSearching(false);
    }, 500);
  };

  return (
    <div className="w-full bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex items-center gap-4 mb-4">
        
        {/* Label / Brand */}
        <div className="hidden md:flex items-center gap-2 px-3 border-r border-slate-100">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-bold text-slate-700 tracking-wide uppercase">Mission Control</span>
        </div>

        {/* Inputs Container */}
        <div className="flex-1 flex gap-4">
            {/* Latitude */}
            <div className="flex-1 bg-slate-50 rounded-lg px-3 py-2 border border-slate-200 flex items-center gap-2 focus-within:ring-2 ring-emerald-500/20 transition-all">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">LAT</span>
                <input 
                    type="number" 
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    className="bg-transparent border-none outline-none text-sm font-mono font-medium text-slate-900 w-full"
                    placeholder="20.5937"
                />
            </div>

            {/* Longitude */}
            <div className="flex-1 bg-slate-50 rounded-lg px-3 py-2 border border-slate-200 flex items-center gap-2 focus-within:ring-2 ring-emerald-500/20 transition-all">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">LNG</span>
                <input 
                    type="number" 
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    className="bg-transparent border-none outline-none text-sm font-mono font-medium text-slate-900 w-full"
                    placeholder="78.9629"
                />
            </div>
        </div>

        {/* Search Button */}
        <button 
            onClick={handleSearch}
            disabled={isSearching}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-emerald-200 flex items-center gap-2 transition-transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
        >
            {isSearching ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" /> : <Search size={16} />}
            {isSearching ? 'Scanning...' : 'Analyze Terrain'}
        </button>

    </div>
  );
}