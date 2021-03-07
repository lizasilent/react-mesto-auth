import React from 'react';
import sucessPopup from '../images/sucesspopup'

function infoTooltip() {
    return (
        <div className={`popup popup_type_${name}  ${isOpen && 'popup_is-open'}`}>
            <form className="popup__form" name={`${name}__form`} action="#" onSubmit={onSubmit}>
              <button className="popup__close-btn" type="button" onClick={onClose} />
              <img alt="sucessPopup" src={sucessPopup} />
              <p className="popup__header">Вы успешно зарегистрировались!</p>
            </form>
          </div>
    );
}

export default infoTooltip;