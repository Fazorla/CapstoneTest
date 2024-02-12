// Medal.jsx

import React from "react";
import Image from "next/image";

const Medal = (props) => {
  return (
    <div className="flex flex-col items-center justify-center p-5 max-w-screen-md mx-auto text-center">
      <Image
        src={`/${props.img}.svg`}
        width={100}
        height={100}
        alt={props.caption}
      />
      <div className="flex flex-col items-center justify-center pt-2 max-w-screen-md mx-auto">
        <p>{props.caption}</p>
      </div>
    </div>
  );
};

export default Medal;
