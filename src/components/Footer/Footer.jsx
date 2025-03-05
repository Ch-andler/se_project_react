import "./Footer.css";
import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">Developed by Chandler Pedini</p>
      <p className="footer__text">{new Date().getFullYear()}</p>
    </footer>
  );
}
export default Footer;
