import { MapContainer, Marker, TileLayer, Polyline } from "react-leaflet";
import React, { useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { LatLngTuple } from 'leaflet';

// Leafletアイコンの設定
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

type MapProps = {
  route?: LatLngTuple[];
};

const Map: React.FC<MapProps> = ({ route }) => {
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
      <Marker position={position} />
      {route && <Polyline positions={route} color="red" />} {/* 経路の表示 */}
    </MapContainer>
  );
};

export default Map;
