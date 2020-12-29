import React from 'react';

import './styles.css';

import Chib from '../../assets/kobayashi-chibi.jpg';

function Footer() {
  return (
      <footer>
          <span>
            <p>Autor: Romulo Vieira</p>
            <p>Contato: romulo.freire02@gmail.com</p>
          </span>
          <img src={Chib} alt='chib-kobayashi' />
      </footer>
  );
}

export default Footer;