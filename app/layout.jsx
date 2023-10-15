import "@/styles/globals.css";

export const metadata = {
  title: "DayOut",
  description: "Simple, fast and fun way to plan your day",
  keywords: "dayout, plan, day, schedule, calendar",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <main className="app">{children}</main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
