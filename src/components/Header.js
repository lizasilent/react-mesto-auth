import React from 'react';
import mainLogo from "../images/mesto_logo.svg"

function Header() {
return (
    <header className="header">
            <div className="header__logo">
            <img alt='Logo' src={mainLogo}/>
            </div>
            <div>
              <a className="header__login" href="#">Войти</a>
            </div>

    </header>
)
}

export default Header;