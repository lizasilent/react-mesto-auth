import React from 'react';

function InfoTooltip({isOpen, onClose, message}) {

    return (
        <div className={`popup popup_type_registration ${isOpen && 'popup_is-open'}`}>
            <form className="popup__form" name="registration__form" action="#">
              <button className="popup__close-btn" type="button" onClick={onClose} />
              <img alt="sucessPopup" src={message.iconPath} className="popup__sucess-img"/>
              <p className="popup__header">{message.text}</p>
            </form>
          </div>
    );
}

export default InfoTooltip;