import React from 'react';
import './popupStyle.css'

interface PopupProps {
  onClose: (stopTracking: boolean) => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
  const handleYesClick = () => {
    onClose(true); // 「はい」を選択したときにtrueを渡して追跡停止
  };

  const handleNoClick = () => {
    onClose(false); // 「いいえ」を選択したときにfalseを渡して追跡継続
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h1>追跡を終了してよろしいですか？</h1>
        <button onClick={handleYesClick}>はい</button>
        <button onClick={handleNoClick}>いいえ</button>
      </div>
    </div>
  );
};

export default Popup;