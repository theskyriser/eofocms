import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTeacher } from "../../../redux/actions/teachers";

const TeacherDetails = ({ currentColor, teacherId }) => {
  const teacher = useSelector((state) =>
    teacherId ? state.teachers.find((t) => t._id === teacherId) : null
  );

  const user = JSON.parse(localStorage.getItem("profile"));
  console.log(user);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        resolve(fileReader.result);
      };
      fileReader.readAsDataURL(file);

      fileReader.onerror = () => {
        reject(error);
      };
    });
  };

  const uploadImage = async (file) => {
    const base64image = await convertBase64(file);
    setTeacherData({ ...teacherData, image: base64image });
  };

  const dispatch = useDispatch();
  const [teacherData, setTeacherData] = useState({
    image: "",
    firstName: "",
    lastName: "",
    level: "",
    dob: new Date(),
    phone: "",
    email: "",
    address: "",
    state: "",
    code: "",
    hourlyRate: 0,
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (teacher) {
      setTeacherData(teacher);
    }
  }, [teacher]);

  const handleSubmit = (e) => {
    dispatch(updateTeacher(teacherId, teacherData));
    localStorage.setItem(
      "profile",
      JSON.stringify({ ...user, result: { ...user?.result, ...teacherData } })
    );
  };

  return (
    <div className="shadow-md bg-slate-50 w-2/3 p-5">
      <h2 className="text-2xl"> Account </h2>

      <form autoComplete="off">
        <div className="flex justify-between mt-5 items-center">
          <label htmlFor="firstName"> First Name </label>
          <input
            defaultValue={teacherData.firstName}
            type="text"
            id="firstName"
            onChange={(e) => {
              setTeacherData({ ...teacherData, firstName: e.target.value });
            }}
            className="appearance-none block w-2/3 bg-gray-50 text-gray-700 border border-gray-400 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>

        <div className="flex justify-between mt-5 items-center">
          <label htmlFor="firstName"> Last Name </label>
          <input
            defaultValue={teacherData.lastName}
            type="text"
            id="firstName"
            onChange={(e) => {
              setTeacherData({ ...teacherData, lastName: e.target.value });
            }}
            className="appearance-none block w-2/3 bg-gray-50 text-gray-700 border border-gray-400 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>

        <div className="flex justify-between mt-5 items-center">
          <label htmlFor="firstName"> Email </label>
          <input
            defaultValue={teacherData.email}
            type="text"
            id="firstName"
            onChange={(e) => {
              setTeacherData({ ...teacherData, email: e.target.value });
            }}
            className="appearance-none block w-2/3 bg-gray-50 text-gray-700 border border-gray-400 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>

        <div className="flex justify-between mt-5 items-center">
          <label htmlFor="firstName"> Phone </label>
          <input
            defaultValue={teacherData.phone}
            type="text"
            id="firstName"
            onChange={(e) => {
              setTeacherData({ ...teacherData, phone: e.target.value });
            }}
            className="appearance-none block w-2/3 bg-gray-50 text-gray-700 border border-gray-400 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>

        <div className="flex justify-between mt-5 items-center">
          <label htmlFor="firstName"> Position </label>
          <input
            defaultValue={teacherData.position}
            type="text"
            id="firstName"
            onChange={(e) => {
              setTeacherData({ ...teacherData, position: e.target.value });
            }}
            className="appearance-none block w-2/3 bg-gray-50 text-gray-700 border border-gray-400 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>

        <div className="flex justify-between mt-5 items-center">
          <label htmlFor="firstName"> Address </label>
          <input
            defaultValue={teacherData.address}
            type="text"
            id="firstName"
            onChange={(e) => {
              setTeacherData({ ...teacherData, address: e.target.value });
            }}
            className="appearance-none block w-2/3 bg-gray-50 text-gray-700 border border-gray-400 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>

        <div className="flex justify-between mt-5 items-center">
          <label htmlFor="firstName"> State </label>
          <input
            defaultValue={teacherData.state}
            type="text"
            id="firstName"
            onChange={(e) => {
              setTeacherData({ ...teacherData, state: e.target.value });
            }}
            className="appearance-none block w-2/3 bg-gray-50 text-gray-700 border border-gray-400 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>

        <div className="flex justify-between mt-5 items-center">
          <label htmlFor="firstName"> PostCode </label>
          <input
            defaultValue={teacherData.code}
            type="text"
            id="firstName"
            onChange={(e) => {
              setTeacherData({ ...teacherData, code: e.target.value });
            }}
            className="appearance-none block w-2/3 bg-gray-50 text-gray-700 border border-gray-400 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>

        <div className="flex justify-between mt-5 items-center">
          <label htmlFor="firstName"> Password </label>
          <input
            defaultValue={""}
            type="password"
            id="firstName"
            onChange={(e) => {
              setTeacherData({ ...teacherData, password: e.target.value });
            }}
            className="appearance-none block w-2/3 bg-gray-50 text-gray-700 border border-gray-400 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>

        <div className="flex justify-between mt-5 items-center">
          <label htmlFor="firstName"> Confirm Password </label>
          <input
            defaultValue={""}
            type="password"
            id="firstName"
            onChange={(e) => {
              setTeacherData({
                ...teacherData,
                confirmPassword: e.target.value,
              });
            }}
            className="appearance-none block w-2/3 bg-gray-50 text-gray-700 border border-gray-400 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold my-3">
            {" "}
            Upload New Profile Photo{" "}
          </label>
          <input type="file" onChange={(e) => uploadImage(e.target.files[0])} />
        </div>

        <button
          class="py-2 px-4 mt-5 rounded-md flex justify-between mb-2  hover:shadow-md"
          onClick={(e) => handleSubmit(e)}
          style={{ backgroundColor: currentColor, color: "white" }}
        >
          <p className="font-semibold"> Submit Changes </p>
        </button>
      </form>
    </div>
  );
};

export default TeacherDetails;
