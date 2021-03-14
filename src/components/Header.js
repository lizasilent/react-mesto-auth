import React from 'react';
import mainLogo from "../images/mesto_logo.svg"
import { Link, useLocation  } from 'react-router-dom';


function Header({loggedIn, email, handleLogout}) {

    const { pathname } = useLocation();
    const text = `${pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`;
    const linkRoute = `${pathname === '/sign-in' ? '/sign-up' : '/sign-in'}`;

return (
    <header className="header">
            <div className="header__logo">
            <img alt='Logo' src={mainLogo}/>
            </div>
        <div className="header__box">
        
        {loggedIn ? (
          <>
            <p className="header__login">{email}</p>
            <p><Link to="" className="header__logout" onClick={handleLogout}>Выйти</Link></p> 
          </>) 
          
          : (<Link to={linkRoute} className="header__login">{text}</Link> )
        }
        </div>
    </header>
)

}

export default Header;