import React from 'react';


function PopupWithForm({name, title, buttonTitle, children, isOpen, onClose, onSubmit}) {

  
    return (
        <div className={`popup popup_type_${name}  ${isOpen && 'popup_is-open'}`}>
            <form className="popup__form" name={`${name}__form`} action="#" onSubmit={onSubmit}>
              <button className="popup__close-btn" type="button" onClick={onClose} />
              <p className="popup__header">{title}</p>
              {children}
              <button type="submit" className="popup__submit-btn">{buttonTitle}</button>
            </form>
          </div>
    );
}

export default PopupWithForm;