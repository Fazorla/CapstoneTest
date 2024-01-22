import React from "react";
import Image from "next/image";
import { Tooltip } from "@nextui-org/react";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <h1 className="text-4xl font-bold text-gray-700 ">Medals</h1>
      </div>
      <div className="mt-20">
        <Tooltip showArrow={true} content="Bronze Berlin Medal">
          <Image src="/BerlinBronze.svg" width={100} height={100} />
        </Tooltip>
      </div>
      <div>
        <h1 className="text-4xl font-bold text-gray-700 ">Previous Trips</h1>
      </div>
    </div>
  );
};

export default page;
