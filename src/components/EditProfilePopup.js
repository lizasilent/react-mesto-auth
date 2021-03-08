import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]); 


    const [name, setName] = React.useState(`${currentUser.name}`);
    const [description, setDescription] = React.useState(`${currentUser.about}`);


    function handleChangeName(e) {
        setName(e.target.value);
      }

      function handleChangeDescription(e) {
        setDescription(e.target.value);
      }

      function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
          name,
          about: description,
        });
      } 

      

    return (
        <PopupWithForm onSubmit={handleSubmit} name="edit-profile" title="Редактировать профиль" buttonTitle="Сохранить" isOpen={isOpen} onClose={onClose} >
        <input type="text" value={name} onChange={handleChangeName} id="name" className="popup__input popup__input_invalid popup__text_name" required minLength={2} maxLength={40}/>
        <span className="popup__error popup__error_is-active" id="name-error" />
        <input type="text" value={description} onChange={handleChangeDescription} id="description" className="popup__input popup__input_invalid popup__text_description" required minLength={2} maxLength={200} />
        <span className="popup__error popup__error_is-active" id="description-error"/></PopupWithForm>
    )

}


export default EditProfilePopup;