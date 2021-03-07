import React from 'react';
import Header from "./Header"
import Footer from "./Footer"

function Register() {
    return (
        <div className="page">
        <div className="page__content">
        <Header />
        <main className="content">
        <div>
            <form className="login__form">
              <p className="login__header">Регистрация</p>
              <input className="login__input" placeholder="Email" type="email" required />
              <input className="login__input" placeholder="Пароль" type="password" required />
                <span className="popup__error popup__error_is-active" id="image-src-error" />
              <button type="submit" className="login__button">Зарегистрироваться</button>
              <div className="login__sign-in">Уже зарегистрированы? <a href="#" className="login__sign-in">Войти</a></div>
            </form>
          </div>
      </main>
      <Footer />
      </div>
      </div>
    )
}

export default Register;