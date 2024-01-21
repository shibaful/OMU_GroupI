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

  useEffect(() => {
    // 現在地を取得する関数
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setPosition([latitude, longitude]);
          },
          (error) => {
            console.error('Error getting location:', error);
            setPosition([35.6895, 139.6917]); // エラー時にデフォルトの位置を設定
          },
          { enableHighAccuracy: true } // 高精度の位置情報を要求
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        setPosition([35.6895, 139.6917]); // サポートされていない場合のデフォルト位置
      }
    };

    getLocation();
  }, []);

  if (!position) {
    return <p>Loading map...</p>; // 位置情報が取得されるまでローディングメッセージを表示
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
