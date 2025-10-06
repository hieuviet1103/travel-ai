import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'attraction' | 'restaurant' | 'hotel';
}

interface InteractiveMapProps {
  locations: Location[];
  center?: [number, number];
  zoom?: number;
}

export default function InteractiveMap({ 
  locations, 
  center = [48.8566, 2.3522], 
  zoom = 13 
}: InteractiveMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current).setView(center, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    const customIcon = (color: string) => L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });

    locations.forEach((location, index) => {
      const color = location.type === 'attraction' ? '#00A699' : 
                    location.type === 'restaurant' ? '#FF385C' : '#767676';
      
      const marker = L.marker([location.lat, location.lng], { 
        icon: customIcon(color) 
      }).addTo(mapRef.current!);
      
      marker.bindPopup(`<strong>${location.name}</strong><br/>${location.type}`);
    });

    if (locations.length > 0) {
      const bounds = L.latLngBounds(locations.map(loc => [loc.lat, loc.lng]));
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [locations]);

  return (
    <div 
      ref={mapContainerRef} 
      className="w-full h-full rounded-xl shadow-lg"
      data-testid="map-container"
      style={{ minHeight: '400px' }}
    />
  );
}
