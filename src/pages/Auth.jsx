import React, { useState } from "react";
import { ReactComponent as EELogo } from "../images/eelogosvg.svg";
import { useDispatch } from "react-redux";
import { signIn } from "../redux/actions/auth";

import { useNavigate } from "react-router-dom";

const Auth = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn(formData, navigate));
  };

  return (
    <div className="grid place-items-center h-screen bg-white">
      <div className="border-2 border-color flex bg-main-bg justify-center p-5 drop-shadow-lg">
        <div className="border-1 border-color flex rounded-xl">
          <div className="flex text-center items-center">
            <EELogo />
            <div>
              <h1 className="text-2xl m-5">English From England</h1>
              <h2 className="text-1xl">Course Managment System</h2>
            </div>
          </div>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col justify-center m-5 b p-2 items-center">
            <div className="grid p-1 grid-cols-3 gap-2">
              <p className="text-xl col-start-1">Email:</p>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                type="text"
                className="border-1 border-color bg-main-bg text-xl rounded-md col-span-2"
              ></input>
              <p className="text-xl col-start-1">Password:</p>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                type="password"
                className="border-1 border-color bg-main-bg text-xl rounded-md col-span-2"
              ></input>
              <button
                type="submit"
                className="border-2 border-color w-1/2 bg-main-bg text-1xl rounded-md mt-1 col-start-2 col-span-2"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
