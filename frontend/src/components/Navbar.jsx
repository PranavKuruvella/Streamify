import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, MenuIcon, ShipWheelIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = ({ onMenuClick }) => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">

          {/* HAMBURGER MENU - ONLY WHEN NOT IN CHAT PAGE */}
          {!isChatPage && (
            <button
              onClick={onMenuClick}
              className="btn btn-ghost btn-circle lg:hidden mr-2"
              aria-label="Open Sidebar"
            >
              <MenuIcon className="h-6 w-6 text-base-content opacity-80" />
            </button>
          )}

          {/* LOGO - ONLY IN THE CHAT PAGE */}
          {/* chat page lo seperate ga malla logo chupinchali as sidebar chat page lo undadhu kabatti */}
          {isChatPage && (
            <div className="pl-1">
              <Link to="/" className="flex items-center gap-2.5">
                <ShipWheelIcon className="md:size-9 size-6 text-primary" />
                <span className="md:text-3xl text-xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                  Streamify
                </span>
              </Link>
            </div>
          )}

          {/* NOTIFICATIONS BUTTON */}
          <div className="flex items-center gap-2 md:gap-4 ml-auto">
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>
          </div>

          <ThemeSelector />

          {/* USER PROFILE */}
          <div className="avatar">
            <div className="w-9 rounded-full">
              <img src={authUser?.profilePic} alt="User Avatar" rel="noreferrer" />
            </div>
          </div>

          {/* Logout button */}
          <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
