import React from 'react';
import mainLogo from "../images/mesto_logo.svg"
import { Link, useLocation  } from 'react-router-dom';


function Header({loggedIn}) {

    const { pathname } = useLocation();
    const text = `${pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`;
    const linkRoute = `${pathname === '/sign-in' ? '/sign-up' : '/sign-in'}`;

return (
    <header className="header">
            <div className="header__logo">
            <img alt='Logo' src={mainLogo}/>
            </div>
        <div>
        
        {loggedIn ? (
          <>
            <p>email</p>
            <p>залогинен</p>
          </>) : (<Link to={linkRoute} className="header__login">{text}</Link> )
        }
        </div>
    </header>
)

}

export default Header;