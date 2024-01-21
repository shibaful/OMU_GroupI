'use client'
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import './pageStyles.css';
import { LatLngTuple } from 'leaflet';

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
        setTracking(true);
        // 追跡開始の処理
    };

    const handleStopTracking = () => {
        setTracking(false);
        // 追跡停止の処理
        setRoute([]); // 経路データをリセット
    };

    useEffect(() => {
        if (!tracking) return;

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setRoute(prevRoute => [...prevRoute, [latitude, longitude]]);
            },
            (error) => {
                console.error(error);
            },
            { enableHighAccuracy: true }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, [tracking]);

    return (
        <div className="mapContainer">
            {!tracking ? (
                <button className="mapButton start" onClick={handleStartTracking}>追跡開始</button>
            ) : (
                <button className="mapButton stop" onClick={handleStopTracking}>追跡停止</button>
            )}
            <button className="mapButton info">古墳推定</button>
            <button className="mapButton mapView">経路表示</button>
            <button className="mapButton link">詳細情報</button>
            <Map route={route} />
        </div>
    );
}

export default MapPage;
