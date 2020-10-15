import Header from "../components/header";
import { ThemeProvider } from "../components/providers";
import "../styles.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
