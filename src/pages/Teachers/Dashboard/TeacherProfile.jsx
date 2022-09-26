import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import profile from "../../../data/profile.svg";
import {
  MdOutlinePersonAddAlt,
  MdInfoOutline,
  MdOutlineModeEdit,
  MdOutlineGrade,
  MdOutlineAssignment,
  MdTextSnippet,
  MdFolder,
  MdAccountCircle,
} from "react-icons/md";
import { getAdmins } from "../../../redux/actions/admins";
import TeacherDetails from "../../../components/Teacher/Dashboard/TeacherDetails";
import { getTeachers } from "../../../redux/actions/teachers";

const TeacherProfile = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const currentColor = useSelector((state) => state.appState.currentColor);
  const teachers = useSelector((state) => state.teachers);
  const thisTeacher = teachers.filter(
    (teacher) => teacher._id === user?.result?._id
  )[0];

  useEffect(() => {
    dispatch(getTeachers());
  }, []);

  return (
    <div className="p-4">
      <div className=" bg-main-bg rounded-lg shadow-lg p-4">
        <div className="flex ">
          <div className="text-center flex flex-col justify-between m-7 ">
            <div className="w-full ">
              {user?.result?.image ? (
                <img
                  src={user?.result?.image}
                  className="rounded-full h-48 w-48 shadow-lg border-4 border-color"
                />
              ) : (
                <img src={profile} />
              )}
            </div>
          </div>

          <div className=" p-10 ml-14">
            <h1 className="text-4xl font-bold"> {thisTeacher?.firstName} </h1>

            <h2 className="mt-6 text-xl"> {thisTeacher?.email} </h2>

            <h2 className="mt-4 text-2xl"> {thisTeacher?.position} </h2>

            <h2 className="mt-4 text-xl"> {thisTeacher?.dob.slice(0, 10)}</h2>
          </div>
        </div>
        <TeacherDetails
          currentColor={currentColor}
          teacherId={user?.result?._id}
        />
      </div>
    </div>
  );
};

export default TeacherProfile;
