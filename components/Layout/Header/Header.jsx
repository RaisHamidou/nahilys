"use client"
import React, { useState, useEffect, useContext } from 'react'
import { FaBarsStaggered } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import Cart from '../Cart/Cart';
import { usePathname, useRouter } from 'next/navigation';
import { MyContext } from '../../../context/ContextProvider';
import logo from "../../../assets/images/logo/logo.png"

export default function Header() {
  const {isCartOpen, setIsCartOpen, } = useContext(MyContext)
const [transformValue, setTransformValue] = useState()
const [isMenuOpen, setIsMenuOpen] = useState(false)

const pathName = usePathname()



const menuIcon = isMenuOpen ? <FaXmark/> : <FaBarsStaggered/>
useEffect(() => {
  if (isCartOpen) {
    setIsMenuOpen(false);
    
  }
}, [isCartOpen]);

useEffect(() => {
  
  const body = document.body
  
  if(isMenuOpen == true){
    body.style.overflow = "hidden"
  }else{
    body.style.overflow = "inherit"
  }

  
}, [isMenuOpen]);

  return (
    <>
<header style={{position:pathName == "/" ?"absolute":"relative"}}>
       <div onClick={()=> setIsMenuOpen(!isMenuOpen)} className={`overlay ${isMenuOpen ? "show-overlay": ""}`}/>
      <div className="menuToggle" onClick={()=>{
        if(isMenuOpen){
          setTransformValue("translateX(-100%)")
          setIsMenuOpen(!isMenuOpen)
        }else {
          setTransformValue("translateX(0%)")
          setIsMenuOpen(!isMenuOpen)
          if(isCartOpen){
            setIsCartOpen(!isCartOpen)
          }
        }
      }}>{menuIcon}</div>
   
    
      <div  className="logo">
      <a href='/'><img src={logo.src} alt="" /></a>
        
      </div>
      <nav className={isMenuOpen ? "menu-open":""}>
      
        <ul className='menu' >
        
        <li><a className={pathName == "/"? "link active":"link"} href='/'>Accueil</a></li>
          <li><a className={pathName == "/collection"? "link active":"link"} href='/collection'>Collection</a></li>
          <li><a className={pathName == "/a-propos"? "link active":"link"} href='/a-propos'>À propos</a></li>
          <li><a className={pathName == "/contact"? "link active":"link"} href='/contact'>Contact</a></li>

          
        </ul>

        <div className="social-icons">
            <ul className='icons'>
              <li>
              <a href="https://www.instagram.com/naahilys">Instagram</a>
              </li>
              <li>
              <a href="https://www.tiktok.com/@naahilys">TikTok</a>
              </li>
              <li>
              <a href="https://www.snapchat.com/@naahilys">Snapchat</a>
              </li>
            </ul>
          </div>
      </nav>
      <Cart/>
    </header>
 
    </>
    
  )
}
