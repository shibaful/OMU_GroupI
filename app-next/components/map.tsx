import { MapContainer, Marker, TileLayer } from "react-leaflet";
import React, { useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// カスタムアイコンの設定
const customIcon = new L.Icon({
  iconUrl: '/marker_red_edg.png',
  iconSize: [30, 36], // アイコンのサイズ
  iconAnchor: [15, 18], // アイコンのアンカーポイント
});

const Map = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [heading, setHeading] = useState(0); // 方向（デグリー）

  useEffect(() => {
    // 現在地を取得する関数
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setPosition([latitude, longitude]);
          },
          (error) => {
            console.error('Error getting location:', error);
          },
          { enableHighAccuracy: true }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    // 方向を取得する関数
    const getHeading = () => {
      if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (event) => {
          if (event.alpha !== null) {
            setHeading(event.alpha);
          }
        });
      }
    };

    getLocation();
    getHeading();
  }, []);

  if (!position) {
    return <p>Loading map...</p>;
  }

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© OpenStreetMap contributors'
      />
      <Marker 
        position={position} 
        icon={customIcon} 
        rotationAngle={heading} // Leaflet 2.0 以降でサポート
        rotationOrigin="center" // マーカーの回転の原点
      />
    </MapContainer>
  );
};

export default Map;
