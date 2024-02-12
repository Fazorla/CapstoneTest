"use client";
import React, { useEffect, useState } from "react";
import Medal from "@/components/Medal";
import { useParams } from "next/navigation";
import { UserMedalsDB } from "app/firebase.js";
import { getDocs, query, where } from "firebase/firestore";

const ProfilePage = () => {
  const params = useParams();
  let userIDForMedals = params.profile;
  const [medals, setMedals] = useState([]);

  useEffect(() => {
    const fetchUserMedals = async () => {
      try {
        // Fetch medals for the specified user ID
        const userMedalsSnapshot = await getDocs(
          query(UserMedalsDB, where("UID", "==", userIDForMedals))
        );

        // Map the medals data
        const userMedals = userMedalsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort medals alphabetically based on the Location property
        const sortedMedals = userMedals.sort((a, b) =>
          a.Location.localeCompare(b.Location)
        );

        setMedals(sortedMedals);
      } catch (error) {
        console.error("Error fetching user medals:", error);
        // Handle the error according to your needs
      }
    };

    fetchUserMedals();
  }, [userIDForMedals]);
  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <h1 className="text-4xl font-bold text-gray-700">Medals</h1>
      </div>
      <div className="flex flex-wrap">
        {medals.map((medal) => (
          <Medal
            key={medal.id}
            img={medal.MedalType}
            caption={medal.Location}
          />
        ))}
      </div>

      <div>
        <h1 className="text-4xl font-bold text-gray-700">Previous Trips</h1>
      </div>
    </div>
  );
};

export default ProfilePage;
