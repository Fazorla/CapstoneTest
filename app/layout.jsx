import Navbar from "@/components/Navbar";
import "@/styles/globals.css";

export const metadata = {
  title: "DayOut",
  description: "Simple, fast and fun way to plan your day",
  keywords: "dayout, plan, day, schedule, calendar",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className="antialiased leading-tight">
      <body className="min-h-screen bg-gray-100">
        <main>
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
