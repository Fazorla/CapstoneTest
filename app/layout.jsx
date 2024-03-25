import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import React from "react";
import { AuthContextProvider } from "./Context/AuthContext";

export const metadata = {
  title: "DayOut",
  description: "Simple, fast and fun way to plan your day",
  keywords: "dayout, plan, day, schedule, calendar",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="overflow-x-hidden">
        <main>
          <AuthContextProvider>
            <Navbar />
            {children}
          </AuthContextProvider>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
