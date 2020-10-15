import * as React from "react";
import Link from "next/link";
import ToggleTheme from "./theme-toggle";

const Header = (props) => {
  return (
    <>
      <header>
        <div className="logo">
          <img src="/naveenda-logo.svg" />
        </div>
        <ul className="links">
          <li>
            <Link href="/">Portfolio</Link>
          </li>
          <li>
            <Link href="/photography">Photography</Link>
          </li>
          <li>
            <Link href="/">Drawing</Link>
          </li>
          <li>
            <Link href="https://twitter.com/NaveenDA_">Contact Me</Link>
          </li>
          <li>
            <ToggleTheme />
          </li>
        </ul>
      </header>
    </>
  );
};
export default Header;
