import React from 'react';
import sucessPopup from '../images/sucesspopup.png'

function InfoTooltip({isOpen, onClose}) {

    return (
        <div className={`popup popup_type_registration ${isOpen && 'popup_is-open'}`}>
            <form className="popup__form" name="registration__form" action="#">
              <button className="popup__close-btn" type="button" onClick={onClose} />
              <img alt="sucessPopup" src={sucessPopup} className="popup__sucess-img"/>
              <p className="popup__header" >Вы успешно зарегистрировались!</p>
            </form>
          </div>
    );
}

export default InfoTooltip;