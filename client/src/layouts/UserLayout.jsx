import { Outlet } from "react-router-dom";
import UserHeader from "../components/Header/UserHeader";
import UserFooter from "../components/Footer/UserFooter";

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 bg-white shadow-sm z-50">
        <UserHeader />
      </header>

      <main className="flex-grow bg-blue-50 z-30">
        <Outlet />
      </main>
      <footer className="mt-auto">
        <UserFooter />
      </footer>
    </div>
  );
};

export default UserLayout;
