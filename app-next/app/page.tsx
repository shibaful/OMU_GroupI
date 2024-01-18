'use client'
import dynamic from "next/dynamic";
import React from "react";
import './pageStyles.css'; // 既存のスタイルシート

function MapPage() {
    const Map = React.useMemo(
        () => dynamic(() => import("../components/map"), {
            loading: () => <p>A map is loading</p>,
            ssr: false,
        }),
        []
    );

    return (
        <div style={{ position: 'relative' }}>
            <button className="mapButton">マップ1</button> {/* 既存のボタン */}
            <button className="mapButton" style={{ top: '70px' }}>マップ2</button> {/* 新しいボタン */}
            <Map />
        </div>
    );
}

export default MapPage;
