import React from "react";

function Footer() {
  console.log("Rendering Footer");

  return (
    <div
      className="bg-red-500 h-24 grid place-items-center font-bold"
      style={{ background: "#478CCF" }}
    >
      All rights reserved @PSX.org
    </div>
  );
}

export default Footer;
