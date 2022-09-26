import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { activeMenuAction } from "../redux/actions/appState";
import { isClickedAction } from "../redux/actions/appState";
import { setScreenSizeAction } from "../redux/actions/appState";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={customFunc}
      style={{ color }}
      className="relative text-x1 rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const NavBar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeMenu = useSelector((state) => state.appState.activeMenu);
  const isClicked = useSelector((state) => state.appState.isClicked);
  const screenSize = useSelector((state) => state.appState.screenSize);
  const currentColor = useSelector((state) => state.appState.currentColor);

  useEffect(() => {
    const handleResize = () => {
      dispatch(setScreenSizeAction(window.innerWidth));
    };
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      dispatch(activeMenuAction(false));
    } else {
      dispatch(activeMenuAction(true));
    }
  }, [screenSize]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });

    setUser(null);
    window.location.reload(false);
  };

  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      <NavButton
        title="Menu"
        customFunc={() => dispatch(activeMenuAction(!activeMenu))}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />

      <div className="flex">
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer hover:bg-light-gray rounded-lg ml-3"
            onClick={() => dispatch(isClickedAction("profile"))}
          >
            <img src={user?.result?.image} className="rounded-full w-8 h-8" />

            <p>
              <span className="text-gray-400 text-14"> Hi, </span>
              <span className="text-gray-400 text-14 ml-1 font-bold">
                {user?.result?.firstName} {user?.result?.lastName}
              </span>
            </p>

            <MdKeyboardArrowDown className="text-gray-400 text-14" />

            <div>
              <form onSubmit={() => handleLogout()}>
                <button
                  type="submit"
                  class="text-white font-bold py-2 px-4 rounded"
                  style={{ backgroundColor: currentColor }}
                >
                  Logout
                </button>
              </form>
            </div>
          </div>
        </TooltipComponent>

        {isClicked.userProfile && {}}
      </div>
    </div>
  );
};

export default NavBar;
