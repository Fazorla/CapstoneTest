// import { useEffect, useState } from "react";
// import { auth } from "./firebase";
// import { onAuthStateChanged } from "firebase/auth";

// function AuthDetails() {
//   const [authUser, setAuthUser] = useState(null);

//   useEffect(() => {
//     const listen = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setAuthUser(user);
//       } else {
//         setAuthUser(null);
//       }
//     });
//   }, []);
// }

// export const authUserState = authUser;
// export default AuthDetails;
