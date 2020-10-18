import {useEffect} from "react";

import Header from "../components/header";
import { ThemeProvider } from "../components/providers";
import "../styles.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <ThemeProvider>
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
