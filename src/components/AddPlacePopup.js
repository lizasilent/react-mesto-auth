import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

    const cardNameRef = React.useRef();
    const cardLinkRef = React.useRef();


   function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
        name: cardNameRef.current.value,
        link: cardLinkRef.current.value
    });
   }
    

    return (
        <PopupWithForm onSubmit={handleSubmit} name="add-cards" title="Новое место" buttonTitle="Создать" isOpen={isOpen} onClose={onClose}>
                  <input ref={cardNameRef} type="text" name="image-title" id="image-title" className="popup__input popup__input_invalid popup__text_place" placeholder="Название" required minLength={2} maxLength={30} />
                  <span className="popup__error popup__error_is-active" id="image-title-error" />
                  <input ref={cardLinkRef} type="url" name="image-src" id="image-src" className="popup__input popup__source" placeholder="Ссылка на картинку" required />
                  <span className="popup__error popup__error_is-active" id="image-src-error" /></PopupWithForm>
    )

}

export default AddPlacePopup;