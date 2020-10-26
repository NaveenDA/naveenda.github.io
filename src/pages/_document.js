import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href={"/favicon-light.png"} type="image/png" />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Engagement&family=Nunito Sans&display=swap"
            rel="stylesheet"
          />
          <meta
            name="google-site-verification"
            content="8CYV4Oyz865mIuy-fi8ERPZBOxhznQKaKWCn9CDcgPE"
          />
        </Head>
        <body>
          <script src="noflash.js" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
