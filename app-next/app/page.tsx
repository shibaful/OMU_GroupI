'use client'
import dynamic from "next/dynamic";
import React, { useState } from "react";
import './pageStyles.css';
import PopupDetail from './popupDetail'
import PopupStopConfirm from './popupStopConfirm'

function MapPage() {
    const Map = React.useMemo(
        () => dynamic(() => import("../components/map"), {
            loading: () => <p>A map is loading</p>,
            ssr: false,
        }),
        []
    );


    const [tracking, setTracking] = useState(false); // 追跡状態の管理

    const handleStartTracking = () => {
        setTracking(true);
        // 追跡開始の処理
    };

    const handleStopTracking = (stopTracking: boolean) => {
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
      // ポップアップを表示
    };
  
    const closePopupStopConfirm = () => {
      setPopupStopConfirmOpen(false);
      // ポップアップを非表示
    };

    return (
        <div className="mapContainer">
            {!tracking ? (
                <button className="mapButton start" onClick={handleStartTracking}>追跡開始</button>
            ) : (
                <button className="mapButton stop" onClick={openPopupStopConfirm}>追跡停止</button>
            )}
            <button className="mapButton info" onClick={openPopupDetail}>古墳推定</button>
            <button className="mapButton mapView">経路表示</button>
            <button className="mapButton link" onClick={openPopupDetail}>古墳一覧</button>
            {isPopupDetailOpen && <PopupDetail onClose={closePopupDetail} />}
            {isPopupStopConfirmOpen && <PopupStopConfirm onClose={handleStopTracking} />}
            <Map />
        </div>
    );
}

export default MapPage;
