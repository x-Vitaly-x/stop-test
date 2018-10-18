import React from 'react';
import logo from './images/vimcar-logo.svg';

const headerLogo = (props) => {
  return (
    <div className='header-logo'>
      <img src={logo} alt='vimcar'/>
    </div>
  )
}

export default headerLogo;
