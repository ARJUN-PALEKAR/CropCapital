'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Rectangle, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet Icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

function MapFlyTo({ target }: any) {
  const map = useMap();
  useEffect(() => {
    if (target) {
      map.flyTo([target.lat, target.lng], 16, { duration: 2.5 });
    }
  }, [target, map]);
  return null;
}

const getBounds = (lat: number, lng: number) => [
  [lat + 0.003, lng + 0.003],
  [lat - 0.003, lng - 0.003]
];

export default function LeafletMap({ targetLocation }: any) {
  return (
    <MapContainer 
      center={[20.5937, 78.9629]} 
      zoom={5} 
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }} 
      zoomControl={false}
      className="z-0"
    >
      {/* Satellite imagery tile layer */}
      <TileLayer 
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" 
        attribution='&copy; Esri'
      />

      {/* Animation layer for target location */}
      {targetLocation && <MapFlyTo target={targetLocation} />}
      
      {/* Marker and analysis zone */}
      {targetLocation && (
        <>
          {/* Pulsing circle effect around location */}
          <Circle
            center={[targetLocation.lat, targetLocation.lng]}
            radius={400}
            pathOptions={{
              color: '#10b981',
              weight: 2,
              opacity: 0.4,
              fillOpacity: 0.05,
            }}
          />

          {/* Main marker */}
          <Marker 
            position={[targetLocation.lat, targetLocation.lng]}
            icon={L.icon({
              iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
              shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41]
            })}
          />

          {/* Analysis zone rectangle */}
          <Rectangle 
            bounds={getBounds(targetLocation.lat, targetLocation.lng) as any}
            pathOptions={{
              color: '#10b981',
              weight: 2.5,
              opacity: 0.8,
              fillOpacity: 0.08,
              dashArray: '8, 4'
            }}
          />
        </>
      )}
    </MapContainer>
  );
}
