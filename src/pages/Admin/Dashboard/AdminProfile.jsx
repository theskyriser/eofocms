import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import profile from "../../../data/profile.svg";
import { getAdmins } from "../../../redux/actions/admins";
import AdminDetails from "../../../components/Admin/Dashboard/AdminProfile/AdminDetails";

const AdminProfile = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const currentColor = useSelector((state) => state.appState.currentColor);
  const admins = useSelector((state) => state.admins);
  const thisAdmin = admins.filter(
    (admin) => admin._id === user?.result?._id
  )[0];

  useEffect(() => {
    dispatch(getAdmins());
  }, []);

  return (
    <div className="p-4">
      <div className=" bg-main-bg rounded-lg shadow-lg p-4 flex flex-col items-center md:items-left">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="text-center flex flex-col justify-between m-7 ">
            <div className="w-full">
              {user?.result?.image ? (
                <img
                  src={user?.result?.image}
                  className="rounded-full h-48 w-48"
                />
              ) : (
                <img src={profile} width={200} />
              )}
            </div>
          </div>

          <div className=" p-10 md:ml-14">
            <h1 className="text-4xl font-bold"> {thisAdmin?.firstName} </h1>

            <h2 className="mt-6 text-xl"> {thisAdmin?.email} </h2>

            <h2 className="mt-4 text-2xl"> {thisAdmin?.position} </h2>

            <h2 className="mt-4 text-xl"> {thisAdmin?.dob.slice(0, 10)}</h2>
          </div>
        </div>
        <AdminDetails currentColor={currentColor} adminId={user?.result?._id} />
      </div>
    </div>
  );
};

export default AdminProfile;
