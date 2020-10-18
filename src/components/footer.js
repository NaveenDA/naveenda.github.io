import * as React from "react";
import { cdnImage } from "./utils";
import Bounce from "react-reveal/Bounce";
import LightSpeed from "react-reveal/LightSpeed";

const Footer = (props) => {
  return (
    <>
      <Bounce>
        <div className="footer">
          <img src={"/happy.svg"} alt="Happy Face" />
          <h3>Thanks for stick with End !</h3>
          <LightSpeed delay={1000}>
            <p>
              <a href="https://twitter.com/NaveenDA_">
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </a>
              <a href="http://medium.com/@NaveenDA">
                <i className="fa fa-medium" aria-hidden="true"></i>
              </a>
              <a href="https://dribbble.com/naveenda">
                <i className="fa fa-dribbble" aria-hidden="true"></i>
              </a>
            </p>
          </LightSpeed>
          <p>Copyright &#123;Current Year&#125; - NaveenDA</p>
        </div>
        <style jsx>{`
          .footer {
            height: 300px;
            text-align: center;
            background: #363d4d;
            color: #a6a6a6;
            padding-top: 5em;
            position: relative;
          }

          .footer img {
            width: 50px;
            opacity: 0.5;
          }
          .footer a {
            color: #a6a6a6;
            font-size: 30px;
            padding-left: 12px;
          }
        `}</style>
      </Bounce>
    </>
  );
};
export default Footer;
