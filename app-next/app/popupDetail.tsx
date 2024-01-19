import React from 'react';
import './popupStyle.css'

interface PopupProps {
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h1>あなたが観光した古墳は…</h1>
        <a href='https://www.sakai-tcb.or.jp/spot/detail/126'>仁徳天皇両古墳</a>
        <button onClick={onClose}>閉じる</button>
      </div>
    </div>
  );
};

export default Popup;
