import React from 'react';
import './popupStyle.css';
import {sum_dist} from '../components/map';

interface PopupProps {
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
      <h1>総移動距離は約<b>{Math.round(sum_dist*1000)}m</b></h1>
        <h1>あなたが観光した古墳はもしかして…</h1>
        <a href='https://www.sakai-tcb.or.jp/spot/detail/126'><b>仁徳天皇両古墳</b></a>
        <h1>所在地：堺区大仙町</h1>
        <h1>特徴：日本最大級，世界文化遺産</h1>
        <button onClick={onClose}>閉じる</button>
      </div>
    </div>
  );
};

export default Popup;
