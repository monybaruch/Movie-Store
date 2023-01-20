import React from "react";
import "../componentStyles/Footer.css";
import { FooterLink } from "../componentStyles/FooterStyles";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container col">
        <div className="row">
          <h2>
            Blockbuster: The best place to buy and rental your favorite movies
          </h2>
        </div>
        <div
          className="row"
          style={{
            textAlign: "center",
          }}
        >
          <FooterLink
            href="https://www.facebook.com/BlockbusterCinemas/"
            target="_blank"
            className="col "
          >
            <i className="fab fa-facebook-f">
              <span>Facebook</span>
            </i>
          </FooterLink>
          <FooterLink
            href="https://www.instagram.com/blockbusterbend/"
            target="_blank"
            className="col"
          >
            <i className="fab fa-instagram">
              <span>Instagram</span>
            </i>
          </FooterLink>
          <FooterLink
            href="https://twitter.com/blockbuster"
            target="_blank"
            className="col"
          >
            <i className="fab fa-twitter">
              <span>Twitter</span>
            </i>
          </FooterLink>
          <FooterLink
            href="https://www.youtube.com/user/blockbusterdk/videos"
            target="_blank"
            className="col"
          >
            <i className="fab fa-youtube">
              <span>Youtube</span>
            </i>
          </FooterLink>
        </div>
        <div className="row">
          <p>
            &copy;{new Date().getFullYear()} Created by Mony Baruch | All rights
            reserved | Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
