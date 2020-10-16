import React, { useEffect, useState } from "react";
import { Head } from "next/head";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import { photos } from "../data/photos";
import "react-lazy-load-image-component/src/effects/blur.css";
import { cdnImage, shuffle } from "../components/utils";
import Image from "../components/image";

const Photography = ({ scrollPosition }) => {
  const [showScroll, setShowScroll] = useState(false);
  const [listOfPhotos, showlistOfPhotos] = useState([]);
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };
  useEffect(() => {
    if (process.browser) {
      window.addEventListener("scroll", checkScrollTop);
    }
    showlistOfPhotos(shuffle(photos));
  }, []);

  return (
    <>
      <title>Naveen DA's Photography</title>
      <div className="photography">
        <div className="row">
          <div className="col">
            <h1>Photography</h1>
            <blockquote>
              <p>An Art that freeze the time forever </p>
            </blockquote>
          </div>
          <div className="col">
            <p className="info">
              Photography is the tool that allows me to view the world with very
              different angle. Before start doing photography I see a things and
              don't care about that beauty, color, shape, etc.
            </p>
            <p className="info">
              I always belive that, a single photo can change entire world from
              nuclear disaster field to garden. I occasionally upload the photo
              on the my{" "}
              <a href="https://www.instagram.com/naveenda_">
                Instagram account.
              </a>{" "}
              I always want to become a street photographer, but I never take a
              good street photo till date.
            </p>
          </div>
        </div>
        <div className="photos">
          {listOfPhotos.map((item) => (
            <Image key={item.url} src={item.url} name={item.name}>
              <LazyLoadImage
                src={cdnImage(item.url)}
                alt={item.name}
                scrollPosition={scrollPosition}
                effect="black-and-white"
                placeholderSrc={cdnImage(item.url, true)}
              />
            </Image>
          ))}
        </div>
        <div
          className="scrollTop"
          onClick={scrollTop}
          style={{ height: 40, display: showScroll ? "flex" : "none" }}
        >
          <i className="fa fa-arrow-up"></i>
        </div>
      </div>
    </>
  );
};
export default trackWindowScroll(Photography);
