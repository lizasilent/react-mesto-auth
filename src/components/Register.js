import React from 'react';
import InfoTooltip from './InfoTooltip';
import Footer from "./Footer";
import { Link } from 'react-router-dom';


const Register = ({ handleRegister }) => {

    const [data, setData] = React.useState({
      email: '',
      password: '',
    });
    const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);

    const handleChange = (e) => {
      const {name, value} = e.target;

      setData({
        ...data,
        [name]: value 
      });
    }

     
    const handleSubmit = (e) => {
      e.preventDefault();
      const {email, password} = data;
     

      handleRegister(email, password);
        setIsRegisterPopupOpen(true);
      }

      function closeRegisterPopup() {
        setIsRegisterPopupOpen(false);
      }

    return (
        <div className="page">
        <div className="page__content">
        <main className="content">
        <div>
            <form className="login__form" type="submit" onSubmit={handleSubmit}>
              <p className="login__header">Регистрация</p>
              <input name="email" className="login__input" placeholder="Email" type="email" value={data.email} onChange={handleChange} required />
              <input name="password" className="login__input" placeholder="Пароль" type="password" value={data.password} onChange={handleChange} required />
                <span className="popup__error popup__error_is-active" id="image-src-error" />
              <button type="submit" className="login__button">Зарегистрироваться</button>
              <div className="login__sign-in">Уже зарегистрированы? 
              <Link to="/sign-in" className="login__sign-in"> Войти </Link>
      </div>
            </form>
          </div>
          
      </main>
      <Footer />
      <InfoTooltip isOpen={isRegisterPopupOpen} onClose={closeRegisterPopup} />
      </div>
      </div>
      
    )
}

export default Register;