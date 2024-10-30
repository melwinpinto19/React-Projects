import React from "react";

function Msg({ color, msg }) {
  return <div className={`text-red-600  mt-1`}>*{msg}</div>;
}

export default Msg;
