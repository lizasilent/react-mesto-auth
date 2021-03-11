import React from 'react';
import Footer from "./Footer"


function Login({ handleLogin }) {
  
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

    handleLogin(email,password);
  }

    
  
      return (
          <div className="page">
          <div className="page__content">
          <main className="content">
          <div>
              <form className="login__form" onSubmit={handleSubmit}>
                <p className="login__header">Вход</p>
                <input name="email" value={valueEmail} className="login__input" placeholder="Email" type="email" onChange={handleChangeEmail} required />
                <input name="password" value={valuePassword} className="login__input" placeholder="Пароль" type="password"  onChange={handleChangePassword} required />
                  <span className="popup__error popup__error_is-active" id="image-src-error" />
                <button type="submit" className="login__button">Войти</button>
              </form>
            </div>
        </main>
        <Footer />
        </div>
        </div>
      )
}

export default Login;