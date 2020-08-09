import React from 'react';
import logo from '../../images/logo.svg';

function Header () {
    return (
        <header>
            <div className="header-inner">
                <div className="logo"><img src={logo} /></div>
                <nav>
                    <ul className="menu menu_type_top">
                        <li><a href="#">Почему мы?</a></li>
                        <li><a href="#">Номера</a></li>
                        <li><a href="#">Отзывы</a></li>
                        <li><a href="#">Как нас найти</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;