'use client';

import { MapContainer, TileLayer, Marker, Tooltip, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

// --- Custom Pulse Icon for Cities ---
const createPulseIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div style="position: relative; width: 12px; height: 12px;">
        <div style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background-color: ${color};"></div>
        <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; border-radius: 50%; border: 2px solid ${color}; opacity: 0.5; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
      </div>
    `,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
};

const cities = [
  { name: "New Delhi", lat: 28.6139, lng: 77.2090 },
  { name: "Mumbai", lat: 19.0760, lng: 72.8777 },
  { name: "Bangalore", lat: 12.9716, lng: 77.5946 },
  { name: "Chennai", lat: 13.0827, lng: 80.2707 },
  { name: "Kolkata", lat: 22.5726, lng: 88.3639 },
  { name: "Hyderabad", lat: 17.3850, lng: 78.4867 },
  { name: "Bhopal", lat: 23.2599, lng: 77.4126 },
  { name: "Nagpur", lat: 21.1458, lng: 79.0882 },
];

export default function IndiaMap() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="w-full h-full bg-slate-100 rounded-2xl animate-pulse" />;

  return (
    <MapContainer
      center={[22.5937, 78.9629]}
      zoom={4.5}
      scrollWheelZoom={false}
      dragging={true}
      doubleClickZoom={false}
      zoomControl={false}
      attributionControl={false}
      style={{ height: '100%', width: '100%', background: 'transparent' }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
      />

      {cities.map((city) => (
        <Marker
          key={city.name}
          position={[city.lat, city.lng]}
          icon={createPulseIcon('#059669')}
        >
          <Tooltip 
            direction="top" 
            offset={[0, -10]} 
            opacity={1} 
            permanent
            className="font-bold text-slate-800 text-[10px] uppercase tracking-wider bg-transparent border-0 shadow-none"
          >
            {city.name}
          </Tooltip>
        </Marker>
      ))}

      {/* Decorative Circles */}
      <CircleMarker center={[20.5937, 78.9629]} radius={150} pathOptions={{ color: '#10b981', weight: 1, opacity: 0.1, fillOpacity: 0 }} />
    </MapContainer>
  );
}