import * as React from "react";
import Link from "next/link";
import ToggleTheme from "./theme-toggle";
import { useRouter } from "next/router";


const Header = (props) => {
  const router = useRouter();


  return (
    <>
      <header>
        <div className="logo">
        <Link href="/"><img src="/naveenda-logo.svg" /></Link>
        </div>
        <ul className="links">
          <li className={router.pathname == "/" ? "active" : ""}>
            <Link href="/">Portfolio</Link>
          </li>
          <li className={router.pathname == "/photography" ? "active" : ""}>
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
