import React, { useState, useEffect } from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { MdOutlineCancel } from "react-icons/md";

import { motion } from "framer-motion";
import Backdrop from "../Backdrop";
import { useDispatch, useSelector } from "react-redux";
import { checkPassword, resetPasswordCheck } from "../../redux/actions/auth";

const PasswordCheck = ({ setActivePasswordCheck, setNextComponent }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ password: "" });
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(checkPassword({ ...formData, email: user?.result?.email }));
    setActivePasswordCheck(false);
    setNextComponent(true);
  };

  useEffect(() => {
    dispatch(resetPasswordCheck());
  }, []);

  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duraction: 0.2,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };

  return (
    <Backdrop>
      <motion.div
        animate="visible"
        initial="hidden"
        exit="exit"
        variants={dropIn}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 z-10">
          <div className="w-full bg-white rounded-lg shadow-lg p-4">
            <div className="mb-5 flex justify-between items-center ">
              <h1 className="text-2xl ml-4 font-semibold">
                {" "}
                Please enter Admin Password{" "}
              </h1>
              <TooltipComponent content="Menu" position="BottomCenter">
                <button
                  type="button"
                  onClick={() => {
                    setActivePasswordCheck((prev) => !prev);
                  }}
                  className="text-xl rounded-full p-3 hover:bg-light-gray mt-2 block"
                >
                  <MdOutlineCancel />
                </button>
              </TooltipComponent>
            </div>
            <div className="w-full">
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="flex flex-col justify-center m-5 b p-2 items-center">
                  <div className="mgrid p-1 grid-cols-3 gap-2">
                    <p className="text-xl col-start-1">Password:</p>
                    <input
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      type="text"
                      className="border-1 border-color bg-main-bg text-xl rounded-md col-span-2"
                    ></input>
                    <button
                      type="submit"
                      className="border-2 border-color w-1/2 bg-main-bg text-1xl rounded-md mt-1 col-start-2 col-span-2"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default PasswordCheck;
