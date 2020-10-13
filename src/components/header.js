import * as React from "react";

const Header = (props) => {
  return (
    <>
      <header>
        <div className="logo">
          <img src="/naveenda-logo.svg" />
        </div>
        <ul className="links">
          <li>
            <a href="/">Portfolio</a>
          </li>
          <li>
            <a href="/">Photography</a>
          </li>
          <li>
            <a href="/">Drawing</a>
          </li>
          <li>
            <a href="https://twitter.com/NaveenDA_">Contact Me</a>
          </li>
          <li>
            <a href="#theme">
              <span className="fa fa-moon-o"></span>
              {/* ) : (
          <span className="fa fa-sun-o"></span>
        )} */}
            </a>
          </li>
        </ul>
      </header>
      <style jsx>
        {`
          header {
            height: 45px;
            line-height: 45px;
            display: flex;
          }
          header .logo {
            flex: 0 200px;
            font-family: "Engagement", cursive;
            padding-left: 45px;
            font-size: 22px;
          }
          header .logo img {
            height: 38px;
            vertical-align: bottom;
          }
          header .links {
            flex: 0 calc(90vw - 200px);
            padding-right: 45px;
            text-align: right;
          }
          header .links ul {
            list-style-type: none;
            background: red;
            display: block;
            height: 45px;
            margin-top: 0;
          }
          header .links li {
            display: inline;
            padding-left: 12px;
          }
          header .links li a {
            font-size:12px;

            color: #333;
            text-decoration: none !important;
            background: linear-gradient(to right, #00d1b1 0%, #278fc6 98%);
            background-size: 0px 2px;
            background-repeat: no-repeat;
            background-position: left 85%;
            text-shadow: 0;
            transition: all 0.3s linear;
            padding-bottom: 5px;
          }

          header .links li a:hover {
            background-size: 100% 2px;
          }
          @media only screen and (max-width: 600px) {
            header .links {
              flex: 0 calc(100vw - 200px);
            }
            header .links li a {
              font-size: 9px;
            }
          }
        `}
      </style>
    </>
  );
};
export default Header;
