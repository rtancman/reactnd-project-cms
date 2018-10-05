import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Footer.css';

const Footer = (props) => {
    return (
      <footer className="nav__footer">
        <div className="nav__footer__content container">
          <p>© 2018 - { (new Date()).getFullYear() } Projct CMS</p>
        </div>
      </footer>
    )
}

export default Footer;