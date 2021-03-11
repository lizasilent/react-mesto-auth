import React from 'react';
import Footer from "./Footer";
import { Link } from 'react-router-dom';


const Register = ({ handleRegister }) => {

  const [valueEmail, setValueEmail] = React.useState('');
  const [valuePassword, setValuePassword] = React.useState('');

  function handleChangeEmail(e) {
    setValueEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setValuePassword(e.target.value);
  }

  function handleSubmit(e){
    e.preventDefault()
    const email = valueEmail;
    const password = valuePassword;
    handleRegister(email, password)
  } 


    return (
        <div className="page">
        <div className="page__content">
        <main className="content">
        <div>
            <form className="login__form" type="submit" onSubmit={handleSubmit}>
              <p className="login__header">Регистрация</p>
              <input name="email" className="login__input" placeholder="Email" type="email" onChange={handleChangeEmail} required />
              <input name="password" className="login__input" placeholder="Пароль" type="password"  onChange={handleChangePassword} required />
                <span className="popup__error popup__error_is-active" id="image-src-error" />
              <button type="submit" className="login__button">Зарегистрироваться</button>
              <div className="login__sign-in">Уже зарегистрированы? 
              <Link to="/sign-in" className="login__sign-in"> Войти </Link>
      </div>
            </form>
          </div>
          
      </main>
      <Footer />
      </div>
      </div>
      
    )
}

export default Register;