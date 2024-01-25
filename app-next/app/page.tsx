'use client'
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import './pageStyles.css';
import { LatLngTuple } from 'leaflet';
import PopupDetail from './popupDetail'
import PopupStopConfirm from './popupStopConfirm'
import internal from "stream";
import * as L from 'leaflet';

let lat = 34.5590202;
let lon = 135.4882025;
let c = 0;
let sum_dist = 0;
let _lat = 0;
let _lon = 0;

function MapPage() {
    const Map = React.useMemo(
        () => dynamic(() => import("../components/map"), {
            loading: () => <p>A map is loading</p>,
            ssr: false,
        }),
        []
    );


    const [tracking, setTracking] = useState(false); // 追跡状態の管理
    const [route, setRoute] = useState<LatLngTuple[]>([]); // 経路の座標

    const handleStartTracking = () => {
        setRoute([]); // 経路データをリセット
        setTracking(true);
        // 追跡開始の処理
    };


    const handleStopTracking = (stopTracking: boolean) => {
        //setTracking(false);
        // 追跡停止の処理
        setRoute([]); // 経路データをリセット
        setTracking(!stopTracking); // stopTrackingがtrueなら追跡停止
        closePopupStopConfirm(); // ポップアップを閉じる
    };


    const [isPopupDetailOpen, setPopupDetailOpen] = useState(false);  // 詳細情報ポップアップ表示の管理

    const openPopupDetail = () => {
        setPopupDetailOpen(true);
        // ポップアップを表示
    };

    const closePopupDetail = () => {
        setPopupDetailOpen(false);
        // ポップアップを非表示
    };

    const [isPopupStopConfirmOpen, setPopupStopConfirmOpen] = useState(false);  // 追跡停止確認ポップアップ表示の管理

    const openPopupStopConfirm = () => {
        setPopupStopConfirmOpen(true);
        setTracking(false); // stopTrackingがtrueなら追跡停止
        closePopupStopConfirm(); // ポップアップを閉じる
        // ポップアップを表示
    };

    const closePopupStopConfirm = () => {
        setPopupStopConfirmOpen(false);
        // ポップアップを非表示
    };

    const [count, setCount] = useState(0)

    const time = () => {
        setCount(prevCount => prevCount + 1)
        _lat = lat
        _lon = lon
        c = c + 1
        if (c < 120) {
            lat = lat - (34.5590202 - 34.56208091000147) / 100
            lon = lon - (135.4882025 - 135.4821360929479) / 100
        } else if (c < 190) {
            lat = lat - (34.5590202 - 34.56851464653817) / 100
            lon = lon - (135.4821360929479 - 135.487518160038) / 100
        } else if (c < 340) {
            lat = lat - (34.56851464653817 - 34.56580309563656) / 100
            lon = lon - (135.487518160038 - 135.4918543741223) / 100
        } else if (c < 420) {
            lat = lat - (34.56580309563656 - 34.5590202) / 100
            lon = lon - (135.4918543741223 - 135.4882025) / 100
        }
        //console.log(sum_dist)
    }

    useEffect(() => {
        const interval = setInterval(time, 1000)
        setRoute(prevRoute => [...prevRoute, [lat, lon]]);
        //console.log(lat,lon)
        //if (!tracking) return;

        //const interval = setInterval(time, 1000)
        // const watchId = navigator.geolocation.watchPosition(
        //     (position) => {
        //         const { latitude, longitude } = position.coords;
        //         setRoute(prevRoute => [...prevRoute, [lat, lon]]);
        //         // Polylineを作成して地図に追加
        //         // const routePolyline = L.polyline(routeCoordinates, { color: 'blue' }).addTo(map);
        //         //setRoute(prevRoute => [...prevRoute, [latitude, longitude]]);
        //     },
        //     (error) => {
        //         console.error(error);
        //     },
        //     { enableHighAccuracy: true }
        // );

        // return () => navigator.geolocation.clearWatch(watchId);
    }, [count]);

    return (
        <div className="mapContainer">
            {!tracking ? (
                <button className="mapButton start" onClick={handleStartTracking}>追跡開始</button>
            ) : (
                <button className="mapButton stop" onClick={openPopupStopConfirm}>追跡停止</button>
            )}
            <button id="mybo" className="mapButton info" onClick={openPopupDetail}>古墳推定</button>
            {isPopupDetailOpen && <PopupDetail onClose={closePopupDetail} />}
            {isPopupStopConfirmOpen && <PopupStopConfirm onClose={handleStopTracking} />}
            <Map route={route} />
        </div>
    );
}

export default MapPage;
