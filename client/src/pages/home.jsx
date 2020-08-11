import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { TweenMax } from "gsap";

export default function Home() {
  const container = useRef();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset < window.innerHeight - window.innerHeight / 2) {
      TweenMax.to(container.current, 1, {
        css: { backgroundColor: "hsl(171, 100%, 41%)" }
      });
    } else {
      TweenMax.to(container.current, 1, {
        css: { backgroundColor: "hsl(204, 86%, 53%)" }
      });
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "hsl(171, 100%, 41%)" }} ref={container}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh"
          }}
        >
          <Link
            to="/vocab"
            className="hvr-float-shadow has-background-warning"
            style={{
              padding: 0,
              width: 300,
              borderRadius: "18px"
            }}
          >
            <h1
              className="title is-4 has-text-black"
              style={{
                marginTop: 50,
                marginBottom: 50,
                color: "white",
                textAlign: "center"
              }}
            >
              Vocab
            </h1>
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh"
          }}
        >
          <Link
            to="/game"
            className="hvr-float-shadow has-background-danger"
            style={{
              padding: 0,
              width: 300,
              borderRadius: "18px"
            }}
          >
            <h1
              className="title is-4"
              style={{
                marginTop: 50,
                marginBottom: 50,
                color: "white",
                textAlign: "center"
              }}
            >
              Game
            </h1>
          </Link>
        </div>
      </div>
    </>
  );
}
