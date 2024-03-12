import React from "react";
import MapComponent from "@/components/MapComponent";

export default function test() {
  return (
    <div>
      <MapComponent
        cityName={"London, UK"}
        placeIds={[
          "ChIJoeMzysEEdkgRF8t3uM9I5gw",
          "ChIJ3TgfM0kDdkgRZ2TV4d1Jv6g",
        ]}
      />
    </div>
  );
}
