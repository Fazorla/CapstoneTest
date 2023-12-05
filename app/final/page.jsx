import React from "react";

function page({ searchParams }) {
  let seasonsList = [];

  Object.values(searchParams).forEach((value) => {
    seasonsList.push(...value.split(","));
  });
  console.log(Object.values(seasonsList));
  return (
    <div>
      <ul>
        {seasonsList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default page;
