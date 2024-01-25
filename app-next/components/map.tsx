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

let lat = 34.5590202;
let lon = 135.4882025;
let c = 0;
export let sum_dist = 0;
let _lat = 0;
let _lon = 0;

const Map: React.FC<MapProps> = ({ route }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [heading, setHeading] = useState(0); // 方向（デグリー）

  // 左下:34.56208091000147, 135.4821360929479
  // 左上：34.56751464653817, 135.486518160038
  // 右上：34.56580309563656, 135.4918543741223

  const R = Math.PI / 180;

function distance(lat1:any, lng1:any, lat2:any, lng2:any) {
  lat1 *= R;
  lng1 *= R;
  lat2 *= R;
  lng2 *= R;
  return 6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2));
}

  const [count, setCount] = useState(0)
    const time = () => {
        setCount(prevCount => prevCount + 1)
        _lat = lat
        _lon = lon
        c = c + 1
        if(c < 120){
          lat = lat - (34.5590202 - 34.56208091000147)/100
          lon = lon - (135.4882025 - 135.4821360929479)/100
        }else if(c < 190){
          lat = lat - (34.5590202 - 34.56851464653817)/100
          lon = lon - (135.4821360929479 - 135.487518160038)/100
        }else if(c < 340){
          lat = lat - (34.56851464653817 - 34.56580309563656)/100
          lon = lon - (135.487518160038 - 135.4918543741223)/100
        }else if(c < 420){
          lat = lat - (34.56580309563656 - 34.5590202)/100
          lon = lon - (135.4918543741223 - 135.4882025)/100
        }
        sum_dist = sum_dist + distance(_lat,_lon,lat,lon)
        console.log(sum_dist)
    }
    

  useEffect(() => {
    // 現在地を取得する関数
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            //setPosition([latitude, longitude]);
            const interval = setInterval(time, 100)
            setPosition([lat,lon]);
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

    // 現在地を取得する関数
    const getLocationLocal = () => {
        const interval = setInterval(time, 1000)
        setPosition([lat,lon]);
    };

    getLocationLocal();

    //getLocation();
    getHeading();
  }, [count]);

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
      {route && <Polyline positions={route} color="blue" />} {/* 経路の表示 */}
    </MapContainer>
  );
};

export default Map;
