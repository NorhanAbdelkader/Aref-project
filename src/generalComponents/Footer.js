import React from 'react'
import { FaSquareFacebook } from "react-icons/fa6";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaSquareXTwitter } from "react-icons/fa6";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-social">
        <a href="https://facebook.com"><FaSquareFacebook  /></a>
        <a href="https://x.com"> <FaSquareXTwitter /></a>
        <a href="https://instagram.com"><BiLogoInstagramAlt /></a>
      </div>
      <div className="footer-bottom">
        <p>&copy; ٢٠٢٤ عارف. كل الحقوق محفوظة</p>
      </div>
    </footer>
  )
}

export default Footer
