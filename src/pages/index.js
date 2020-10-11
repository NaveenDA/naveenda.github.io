import Head from "next/head";

export default function Home() {
  const projects = [
    {
      name: "Optime",
      description: "A CSS framework optimised for better readability 📖.",
      repo: "https://github.com/NaveenDA/optime",
      tags: ["CSS"],
    },
    {
      name: "tablenavigator",
      description: "A jQuery plugin that enables navigate a table via keyboard",
      repo: "",
      tags: ["JavaScript", "jQuery"],
    },
    {
      name: "express-routes-catalogue",
      description: "An express.js Plugin that listout all the registed routes",
      repo: "https://github.com/NaveenDA/express-routes-catalogue",
      tags: ["Typescript"],
    },
    {
      name: "Drafti",
      description:
        "Note-taking application based on Markdown with Offline support.",
      repo: "https://github.com/NaveenDA/drafti",
      tags: ["markdown", "react", "editor", "Typescript"],
    },
    {
      name: "react-rerender-test",
      description:
        "A simple react component help to test the component re-render or not",
      repo: "https://github.com/NaveenDA/react-rerender-test",
      tags: ["Typescript", "react", "testing"],
    },
    {
      name: "nice-pie",
      description: "A awesome pie chart based on the d3",
      repo: "https://github.com/dotcodes/nice-pie",
      tags: ["d3", "typescript", "chart"],
    },
  ];
  return (
    <div className="homepage">
      <Head>
        <title>Naveen DA Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Engagement&family=Nunito Sans&display=swap"
          rel="stylesheet"
        />
      </Head>
      <header>
        <div className="logo">Naveen DA</div>
        <ul className="links">
          <li>
            <a href="/">Portfolio</a>
          </li>
          <li>
            <a href="https://twitter.com/NaveenDA_">Contact Me</a>
          </li>
        </ul>
      </header>

      <main>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="image">
                <img src="/naveen-da-profile.png" />
              </div>
              <h1>Hi,</h1>
              <h1>I'm Naveen DA</h1>
              <p className="info">
                I develop an application with high concern about design and UX,
                sometimes I do an over-engineering process for doing a simple
                job
              </p>
              <p className="icons">
                <a href="https://stackoverflow.com/users/6335029/naveenda">
                  <i className="fa fa-stack-overflow" aria-hidden="true"></i>
                </a>
                <a href="https://github.com/NaveenDA">
                  <i className="fa fa-github" aria-hidden="true"></i>
                </a>
                <a href="https://twitter.com/NaveenDA_">
                  <i className="fa fa-twitter" aria-hidden="true"></i>
                </a>
                <a href="https://dribbble.com/naveenda">
                  <i className="fa fa-dribbble" aria-hidden="true"></i>
                </a>
                <a href="http://medium.com/@NaveenDA">
                  <i className="fa fa-medium" aria-hidden="true"></i>
                </a>
                <a href="https://www.linkedin.com/in/naveenda/">
                  <i className="fa fa-linkedin-square" aria-hidden="true"></i>
                </a>
              </p>
            </div>

            <div className="col">
              <div className="projects">
                {projects.map((item) => (
                  <a href={item.repo} className="card" key={item.name}>
                    <div>
                      <div className="name">{item.name}</div>
                      <div className="info">{item.description}</div>
                      {item.tags.map((tag) => (
                        <div key={tag} className="tag">
                          {tag}
                        </div>
                      ))}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
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
          font-size: 15px;
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
        .container {
          width: 80%;
          margin: 12px auto;
          margin-bottom: 0;
        }
        .row {
          display: flex;
        }
        .col {
          flex: 0 50%;
        }
        .icons {
          margin: 25px auto;
        }
        .icons a {
          color: #333 !important;
          padding-left: 12px;
          font-size: 18px;
        }
        .info {
          padding: 12px 5px;
          color: #2e302f;
          font-weight: 300;
        }
        .image img {
          margin: 0 auto;
          max-height: 350px;
        }
        .image {
          margin-bottom: 20px;
        }
        .projects {
          display: flex;
          flex-flow: wrap;
          overflow-y: auto;
          height: 92vh;
        }
        .card {
          padding: 1em;
          box-sizing: border-box;
          width: 50%;
          display: flex;
          height: 245px;
          text-decoration: none !important;
        }
        .card > div {
          flex: 1 1 auto;
          padding: 1em;
          border: 1px solid transparent;
          background-color: rgba(255, 255, 255, 1);
          border-radius: 16px;
          box-shadow: 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2);
        }
        .card > div:hover {
          background: #ffecd8;
          transition: background-color 100ms linear;
        }
        .card > div:hover .name {
          text-shadow: 0 1px 10px rgba(0, 0, 0, 0.4);
        }
        .card > div:hover .tag {
          background-color: #fa8738;
          color: #fff;
          transition: all 100ms linear;
        }
        .card .name {
          font-size: 18px;
          font-weight: bold;
          color: #000000;
        }
        .card .info {
          color: rgb(46 48 47 / 77%);
        }
        .tag {
          display: inline-block;
          font-size: 12px;
          font-weight: 500;
          line-height: 18px;
          border: 1px solid transparent;
          border-radius: 2em;
          padding: 0 10px;
          line-height: 22px;
          color: #0366d6;
          white-space: nowrap;
          margin: 0 0.125em 0.333em 0;
          background-color: #f1f8ff;
        }

        @media only screen and (max-width: 600px) {
          body {
            overflow-y: auto !important;
          }
          .row {
            flex-wrap: wrap;
          }
          .col {
            flex: 0 100%;
          }
          .projects {
            height: auto !important;
          }
          .card {
            width: 100%;
          }
          header .links {
            flex: 0 calc(100vw - 200px);
          }
          header .links li a {
            font-size: 9px;
          }
          .card > div {
            box-shadow:
          /* The top layer shadow */ 0 1px 1px
                rgba(0, 0, 0, 0.15),
              /* The second layer */ 0 10px 0 -5px #eee,
              /* The second layer shadow */ 0 10px 1px -4px rgba(0, 0, 0, 0.15),
              /* The third layer */ 0 20px 0 -10px #eee,
              /* The third layer shadow */ 0 20px 1px -9px rgba(0, 0, 0, 0.15);
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: "Nunito Sans";
          background: #FAFBFC;
        }
        body {
          overflow-y: hidden;
        }
        @media only screen and (max-width: 600px) {
          body {
            overflow-y: auto !important;
          }
        }
        @keyframes backgroundGradient {
          0% {
            background-position: 50% 0%;
          }
          50% {
            background-position: 50% 100%;
          }
          100% {
            background-position: 50% 0%;
          }
        }
        * {
          box-sizing: border-box;
          padding: 0;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
