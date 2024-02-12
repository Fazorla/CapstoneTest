import React from "react";
import Image from "next/image";
import { Tooltip } from "@nextui-org/react";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <h1 className="text-4xl font-bold text-gray-700 ">Medals</h1>
      </div>
      <div className="mt-10 mb-10 flex flex-row flex-wrap items-center justify-center">
        <div className="flex flex-col items-center justify-center p-5">
        <Tooltip showArrow={true} content="Bronze Berlin Medal">
          <Image src="/bronzeMedal.svg" width={100} height={100} />
        </Tooltip>
        <p className="mt-1">Colchester Bronze</p>
        </div>
        <div className="flex flex-col items-center justify-center p-5">
        <Tooltip showArrow={true} content="Bronze Berlin Medal">
          <Image src="/goldMedal.svg" width={100} height={100} />
        </Tooltip>
        <p className="mt-1">London Gold</p>
        </div>
        <div className="flex flex-col items-center justify-center p-5">
        <Tooltip showArrow={true} content="Bronze Berlin Medal">
          <Image src="/silverMedal.svg" width={100} height={100} />
        </Tooltip>
        <p className="mt-1">Berlin Silver</p>
        </div>
      </div>
      <div>
        <h1 className="text-4xl font-bold text-gray-700 ">Previous Trips</h1>
      </div>
    </div>
  );
};

export default page;
