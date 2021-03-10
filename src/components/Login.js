import React from 'react';
import Footer from "./Footer"


function Login({ handleLogin }) {
  
    const [data, setData] = React.useState({
      email: '',
      password: '',
    });

    const handleChange = (e) => {
      const {name, value} = e.target;

      setData({
        ...data,
        [name]: value 
      });
    }
    
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!data.email || !data.password) {
        return
      }

      handleLogin(data.email, data.password);
    }
    
  
      return (
          <div className="page">
          <div className="page__content">
          <main className="content">
          <div>
              <form className="login__form" onSubmit={handleSubmit}>
                <p className="login__header">Вход</p>
                <input name="email" className="login__input" placeholder="Email" type="email" value={data.email} onChange={handleChange} required />
                <input name="password" className="login__input" placeholder="Пароль" type="password" value={data.password} onChange={handleChange} required />
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