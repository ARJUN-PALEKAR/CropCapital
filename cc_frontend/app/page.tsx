'use client';

import { useState } from 'react';
import Hero from '@/src/components/landing/Hero';
import MapSection from '@/src/components/map/MapSection';
import ResultCard from '@/src/components/dashboard/ResultCard';
import { SearchWidget } from '@/src/components/map/SearchWidget';
import { LayoutDashboard } from 'lucide-react';

export default function Page() {
  const [showApp, setShowApp] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [targetLocation, setTargetLocation] = useState<{lat: number, lng: number} | null>(null);
  const [assessmentData, setAssessmentData] = useState<any>(null);

  const handleLaunchApp = () => {
    setShowApp(true);
  };

  const handleSearch = async (lat: string, lng: string) => {
    // 1. Start Loading & Set Map Location
    setIsScanning(true);
    setAssessmentData(null); 
    
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);
    
    setTargetLocation({ lat: latNum, lng: lngNum });

    try {
      console.log(`🛰️ Contacting CropCapital Backend for ${lat}, ${lng}...`);
      
      // 2. Call the Real Python Backend
      // Ensure your Flask/FastAPI server is running on port 5000
      const res = await fetch("http://127.0.0.1:5000/analyze-farm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            lat: latNum, 
            lon: lngNum, // Backend expects 'lon', not 'lng'
            acres: 5.0   // Default value
        }),
      });

      if (!res.ok) throw new Error("Backend connection failed");
      
      const data = await res.json();
      console.log("✅ Data Received:", data);

      // 3. Update UI with Real Data
      setAssessmentData(data);

    } catch (error) {
      console.error(error);
      // Fallback/Demo Data if backend is offline, so you can still show the UI
      alert("Backend unreachable. Ensure Python server is running on Port 5000.");
    } finally {
      // 4. Stop Loading (Always runs)
      setIsScanning(false);
    }
  };

  return (
    <main className="w-full font-sans text-slate-900 bg-slate-50 min-h-screen">
      
      {!showApp ? (
        <Hero onLaunchApp={handleLaunchApp} /> 
      ) : (
        // APP LAYOUT
        <div className="h-screen flex flex-col p-4 md:p-6 overflow-hidden animate-in fade-in duration-700">
            
            {/* Top Bar (Search) */}
            <div className="mb-4 shrink-0">
              <SearchWidget onSearch={handleSearch} isLoading={isScanning} />
            </div>

            {/* Split Screen Layout */}
            <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
              
              {/* 1. MAP SECTION (Left - 40%) */}
              <div className="hidden md:flex md:w-[40%] flex-col rounded-2xl overflow-hidden border border-slate-200 shadow-xl relative bg-slate-200">
                 <MapSection targetLocation={targetLocation} isScanning={isScanning} />
              </div>

              {/* 2. DASHBOARD SECTION (Right - 60%) */}
              <div className="flex-1 flex flex-col rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white relative min-w-0">
                 {assessmentData ? (
                    <ResultCard data={assessmentData} />
                 ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center text-slate-400 p-8 text-center bg-slate-50/50">
                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                            <LayoutDashboard size={24} />
                        </div>
                        <h3 className="text-slate-900 font-bold mb-2">Ready to Analyze</h3>
                        <p className="text-sm">Enter coordinates above to begin satellite sweep.</p>
                    </div>
                 )}
              </div>

            </div>
        </div>
      )}
    </main>
  );
}