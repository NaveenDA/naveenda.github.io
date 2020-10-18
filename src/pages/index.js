import { projects } from "../data/projects";
import Head from "next/head";
import { cdnImage } from "../components/utils";
import Fade from "react-reveal/Fade";
import Jump from "react-reveal/Jump";
import Bounce from "react-reveal/Bounce";
export default function Home() {
  return (
    <>
      <Head>
        <title>Naveen DA Portfolio </title>
      </Head>
      <div className="homepage">
        <main>
          <div className="container">
            <div className="row">
              <div className="col">
                <Fade left>
                  <div className="profile-image">
                    <img src={cdnImage("naveen-da-profile.png", false, "")} />
                  </div>
                  <h1>Hi,</h1>
                  <h1>I'm Naveen DA</h1>
                  <p className="info">
                    I develop an application with high concern about design and
                    UX, sometimes I do an over-engineering process for doing a
                    simple job
                  </p>
                  <p className="icons">
                    <Bounce delay={1000}>
                      <a href="https://stackoverflow.com/users/6335029/naveenda">
                        <i
                          className="fa fa-stack-overflow"
                          aria-hidden="true"
                        ></i>
                      </a>
                    </Bounce>
                    <Bounce delay={1000}>
                      <a href="https://github.com/NaveenDA">
                        <i className="fa fa-github" aria-hidden="true"></i>
                      </a>
                    </Bounce>
                    <Bounce delay={1000}>
                      <a href="https://twitter.com/NaveenDA_">
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                      </a>
                    </Bounce>
                    <Bounce delay={1000}>
                      <a href="https://dribbble.com/naveenda">
                        <i className="fa fa-dribbble" aria-hidden="true"></i>
                      </a>
                    </Bounce>
                    <Bounce delay={1000}>
                      <a href="http://medium.com/@NaveenDA">
                        <i className="fa fa-medium" aria-hidden="true"></i>
                      </a>
                    </Bounce>
                    <Bounce delay={1000}>
                      <a href="https://www.linkedin.com/in/naveenda/">
                        <i
                          className="fa fa-linkedin-square"
                          aria-hidden="true"
                        ></i>
                      </a>
                    </Bounce>
                  </p>
                </Fade>
              </div>

              <div className="col">
                  <div className="projects">
                    {projects.map((item) => (
                      <Fade bottom key={item.name}>
                        <a href={item.repo} className="card" >
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
                      </Fade>
                    ))}
                  </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
