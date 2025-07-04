import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

function AnimatedText({ text, className }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <span key={i} className="letter inline-block">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
}

function Forlogin() {
  const navigate = useNavigate();
  const mainTextRef = useRef(null);
  const subTextRef = useRef(null);

  useEffect(() => {
    const letters = mainTextRef.current.querySelectorAll(".letter");

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          navigate("/SocialPage/feed", { replace: true });
        }, 1500);
      },
    });

    tl.fromTo(
      letters,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        ease: "power3.out",
        duration: 0.5,
      }
    ).fromTo(
      subTextRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
      "-=0.3"
    );
  }, [navigate]);

  return (
    <div className="wrapper flex flex-col justify-center items-center h-screen bg-black p-6">
      <div
        ref={mainTextRef}
        className="text-3xl font-extrabold text-rose-400 cursor-blink"
      >
        <AnimatedText text="Welcome to EchoChamber!" />
      </div>
      <div
        ref={subTextRef}
        className="text-sm mt-4 text-rose-300"
        style={{ opacity: 0, scale: 0.8 }}
      >
        Where your voice finds its echo.
      </div>
    </div>
  );
}

export default Forlogin;
