import React from "react";
import Lenis from "lenis";
import { useEffect } from "react";
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

function App() {
  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", (e) => {
      console.log(e);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  useGSAP(() => {
    document.querySelectorAll(".elem").forEach((elem) => {
      let image = elem.querySelector("img");
      let tl = gsap.timeline();
      let xTransform = gsap.utils.random(-100, 100);

      tl.set(
        image,
        {
          transformOrigin: `${xTransform < 0 ? 0 : "100%"}`,
        },
        "start"
      )
      .to(
        image,
        {
         scale:0,
         ease:"none",
         scrollTrigger:{
          trigger:image,
          start:"top top",
          end:"bottom top",
          scrub:true,
         },
        },
        "start"
      )
      .to(
        elem,
        {
          xPercent: xTransform,
          ease: "none",
          scrollTrigger: {
            trigger: image,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
    });
  });
  return (
    <>
      <div className="w-full h-full bg-zinc-900">
        <div className="grid grid-cols-8 grid-rows-20 gap-4 p-4 overflow-hidden">
          {Array.from({ length: 20 }, (_, rowIndex) => {
            const shuffledColumns = Array.from(
              { length: 8 },
              (_, i) => i + 1
            ).sort(() => Math.random() - 0.5);
            return shuffledColumns.slice(0, 2).map((colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="elem aspect-square"
                style={{
                  gridRow: `${rowIndex + 1}`,
                  gridColumn: `${colIndex}`,
                  "--r": rowIndex + 1,
                  "--c": colIndex,
                }}
              >
                <img
                  src={`https://picsum.photos/200?random=${
                    rowIndex * 8 + colIndex
                  }`}
                  alt="Random"
                  className="w-full h-full object-cover"
                />
              </div>
            ));
          })}
        </div>
      </div>
      <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white">
        <h1 className="text-8xl font-bold mb-4">
          Thomas Vance
          <sup>®</sup>
        </h1>
        <h2 className="text-4xl">トーマス・ヴァンス</h2>
      </div>
      <div className="w-full h-screen mx-auto py-16  text-center text-black relative z-[999] bg-[#D1D1D1] flex items-center justify-center">
        <p className="text-3xl w-3/4 font-regular leading-[2.2rem] text-left">
          Thomas Vance is a cutting-edge clothing brand that seamlessly blends
          contemporary style with timeless elegance. Founded on the principles
          of quality craftsmanship and innovative design, Thomas Vance offers a
          diverse range of apparel for the modern individual who appreciates
          sophistication and comfort. From sleek urban wear to refined formal
          attire, each piece in our collection is meticulously crafted to
          reflect the brand's commitment to excellence and attention to detail.
          Embrace your unique style with Thomas Vance and experience fashion
          that truly speaks to your individuality.®
        </p>
      </div>
    </>
  );
}

export default App;
