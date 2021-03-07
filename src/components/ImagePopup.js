import React from 'react';

function ImagePopup({card, onClose}) {
  
return(
    <div className={`popup popup_type_grid-img ${card ? 'popup_is-open' : ''}`}>
            <div className="popup__form">
              <button className="popup__close-btn" type="button" onClick={onClose} />
              <img className="popup__image" src={card.link} alt={card.name} />
              <h2 className="popup__title">{card.name}</h2> 
            </div>
          </div>
)
}

export default ImagePopup;