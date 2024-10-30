import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import gsap from "gsap";

function Banner({ setBanner, msg, color = "black" }) {
  const refer = useRef();

  useGSAP(() => {
    gsap.from(refer.current, {
      height: 0,
      duration: 0.3,
    });
  });

  return (
    <div
      className={`absolute top-0 grid place-items-center w-full text-white h-10 font-mono z-10 bg-${color}`}
      ref={refer}
    >
      {msg}
      <div className="absolute right-4" onClick={() => setBanner("")}>
        X
      </div>
    </div>
  );
}

export default Banner;
