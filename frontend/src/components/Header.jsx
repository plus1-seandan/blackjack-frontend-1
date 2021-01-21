import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <h2><Link to='/'>Home</Link></h2>
        <h2><Link to='/game'>Play</Link></h2>
        <h2><Link to='/profile'>Profile</Link></h2>
      </nav>
    </header>
  )
}

export default Header;