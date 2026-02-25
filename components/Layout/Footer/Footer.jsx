import React from 'react'
import { FaTiktok } from "react-icons/fa6";
import { FaSnapchatGhost } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

import logo from "../../../assets/images/logo/logo.png"

export default function Footer() {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <a href="/">
          <img src={logo.src} alt="logo" />
        </a>
      </div>
      <div className="container-get-in-touch">
      <h3>Get in Touch</h3>
      <div className="get-in-touch">
      <p>Retrouvez-nous également sur nos réseaux sociaux !</p>
      <div className="social-icons">
          <div className="icon"><a href='https://www.tiktok.com/@naahilys'><FaTiktok/></a></div>
          <div className="icon"><a href='https://www.instagram.com/naahilys'><FaInstagram/></a></div>
          <div className="icon"><a href='https://www.snapchat.com/@naahilys'><FaSnapchatGhost/></a></div>
        </div>
      </div>
        
      </div>
      <div className="condition">
      <h3>Conditions</h3>
        <ul>
          <li><a href='/conditions/mentions-legales'>Mentions légales</a></li>
          <li><a href='/conditions/cgu'>Condition général d’utilisation</a></li>
          <li><a href='/conditions/cgv'>Condition général de vente</a></li>
          <li><a href='/conditions/politique-d-echange-et-de-retour'>politique d'échange et de retour</a></li>
          <li><a href='/conditions/politique-des-cookies'>politique des cookies</a></li>
        </ul>
      </div>
      <div className="info">
        <h3>Informations</h3>
        <ul>
          <li><a>À propos de nous</a></li>
          <li><a>Contact</a></li>
        </ul>
      </div>
    </div>
  )
}
