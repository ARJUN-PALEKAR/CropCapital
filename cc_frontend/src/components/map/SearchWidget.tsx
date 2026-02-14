'use client';

import React, { useState } from 'react';
import { Search, Wallet } from 'lucide-react';

interface SearchWidgetProps {
  onSearch: (lat: string, lng: string) => void;
  isLoading: boolean;
  walletAddress: string;          // NEW PROP
  onConnectWallet: () => void;    // NEW PROP
}

export function SearchWidget({ onSearch, isLoading, walletAddress, onConnectWallet }: SearchWidgetProps) {
  const [latitude, setLatitude] = useState('20.593'); 
  const [longitude, setLongitude] = useState('78.962');

  const handleSearch = () => {
    onSearch(latitude, longitude);
  };

  return (
    <div className="w-full bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex flex-col md:flex-row items-center gap-4 mb-4">
        
        {/* Brand */}
        <div className="hidden md:flex items-center gap-2 px-3 border-r border-slate-100">
            <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-amber-500' : 'bg-emerald-500'} animate-pulse`} />
            <span className="text-sm font-bold text-slate-700 tracking-wide uppercase">Mission Control</span>
        </div>

        {/* Inputs */}
        <div className="flex-1 flex gap-2 w-full">
            <div className="flex-1 bg-slate-50 rounded-lg px-3 py-2 border border-slate-200 flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">LAT</span>
                <input 
                    type="number" 
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    className="bg-transparent border-none outline-none text-sm font-mono text-slate-900 w-full"
                    placeholder="20.593"
                />
            </div>
            <div className="flex-1 bg-slate-50 rounded-lg px-3 py-2 border border-slate-200 flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">LNG</span>
                <input 
                    type="number" 
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    className="bg-transparent border-none outline-none text-sm font-mono text-slate-900 w-full"
                    placeholder="78.962"
                />
            </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-2 w-full md:w-auto">
            {/* NEW: CONNECT WALLET BUTTON */}
            <button 
                onClick={onConnectWallet}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-bold text-sm border transition-all ${
                    walletAddress 
                    ? "bg-purple-50 text-purple-700 border-purple-200" 
                    : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                }`}
            >
                <Wallet size={16} />
                {walletAddress ? `${walletAddress.slice(0,6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
            </button>

            <button 
                onClick={handleSearch}
                disabled={isLoading}
                className="flex-1 md:flex-none bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-70"
            >
                {isLoading ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" /> : <Search size={16} />}
                {isLoading ? 'Scanning...' : 'Analyze'}
            </button>
        </div>

    </div>
  );
}