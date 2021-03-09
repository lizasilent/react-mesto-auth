import React from 'react';
import mainLogo from "../images/mesto_logo.svg"
import { Link } from 'react-router-dom';

function Header() {
return (
    <header className="header">
            <div className="header__logo">
            <img alt='Logo' src={mainLogo}/>
            </div>
            <div>
            <Link to="/sign-in" className="header__login"> Войти </Link>
            </div>

    </header>
)
}

export default Header;