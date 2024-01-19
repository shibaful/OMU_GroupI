import React from 'react';
import './popupStyle.css'

interface PopupProps {
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h1>追跡を終了してよろしいですか？</h1>
        <button onClick={onClose}>はい</button>
      </div>
    </div>
  );
};

export default Popup;