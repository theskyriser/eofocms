import React, { useState, useEffect } from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { MdOutlineCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

import { motion } from "framer-motion";
import Backdrop from "../../../Backdrop";

import { createTeacher } from "../../../../redux/actions/teachers";
import { updateTeacher } from "../../../../redux/actions/teachers";

const AddTeacher = ({
  setActiveAddTeacher,
  activeAddTeacher,
  currentColor,
  currentEdit,
  selectedTeacher,
}) => {
  const teacher = useSelector((state) =>
    selectedTeacher
      ? state.teachers.find((t) => t._id === selectedTeacher)
      : null
  );

  const dispatch = useDispatch();
  const [teacherData, setTeacherData] = useState({
    image: "",
    firstName: "",
    lastName: "",
    level: "",
    dob: new Date(),
    position: "",
    phone: "",
    email: "",
    address: "",
    state: "",
    code: "",
    numberOfClasses: 0,
    hourlyRate: 0,
    password: "",
    confirmPassword: "",
  });

  console.log(teacherData);
  useEffect(() => {
    if (teacher) setTeacherData(teacher);
  }, [teacher]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentEdit) {
      console.log(teacherData);
      dispatch(updateTeacher(selectedTeacher, teacherData));
    } else {
      dispatch(createTeacher(teacherData));
    }
  };

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

  const uploadImage = async (file) => {
    const base64image = await convertBase64(file);
    setTeacherData({ ...teacherData, image: base64image });
  };

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
            <div className="mb-5 flex justify-between items-center">
              <h1 className="text-2xl">
                {" "}
                {`${currentEdit ? "Edit" : "Add New"}  Teacher`}{" "}
              </h1>

              <TooltipComponent content="Menu" position="BottomCenter">
                <button
                  type="button"
                  onClick={() => {
                    setActiveAddTeacher((prev) => !prev);
                  }}
                  className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block"
                >
                  <MdOutlineCancel />
                </button>
              </TooltipComponent>
            </div>

            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="md:grid grid-cols-4 gap-3 flex flex-col">
                <div className="col-span-2">
                  <label htmlFor="firstName"> First Name </label>
                  <input
                    style={{ backgroundColor: `${currentColor}25` }}
                    value={teacherData.firstName}
                    type="text"
                    id="firstName"
                    onChange={(e) => {
                      setTeacherData({
                        ...teacherData,
                        firstName: e.target.value,
                      });
                    }}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>

                <div className="col-start-3 col-span-2">
                  <label htmlFor="lastName"> Last Name </label>
                  <input
                    style={{ backgroundColor: `${currentColor}25` }}
                    value={teacherData.lastName}
                    type="text"
                    id="lastName"
                    onChange={(e) => {
                      setTeacherData({
                        ...teacherData,
                        lastName: e.target.value,
                      });
                    }}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>

                <div className="relative col-start-1 col-span-1">
                  <label htmlFor="level"> Level of Qualification</label>
                  <select
                    style={{ backgroundColor: `${currentColor}25` }}
                    value={teacherData.level}
                    id="level"
                    onChange={(e) =>
                      setTeacherData({ ...teacherData, level: e.target.value })
                    }
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option key={"CELTA"} value={"CELTA"}>
                      {" "}
                      CELTA{" "}
                    </option>
                    <option key={"DELTA"} value={"DELTA"}>
                      {" "}
                      DELTA{" "}
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>

                <div className=" col-start-2 col-span-1">
                  <label htmlFor="position"> Position </label>
                  <input
                    style={{ backgroundColor: `${currentColor}25` }}
                    value={teacherData.position}
                    id="position"
                    onChange={(e) => {
                      setTeacherData({
                        ...teacherData,
                        position: e.target.value,
                      });
                    }}
                    type="text"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>

                <div className=" col-start-3 col-span-1">
                  <label htmlFor="phone"> Phone </label>
                  <input
                    style={{ backgroundColor: `${currentColor}25` }}
                    value={teacherData.phone}
                    id="phone"
                    onChange={(e) => {
                      setTeacherData({ ...teacherData, phone: e.target.value });
                    }}
                    type="text"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>

                <div className=" col-start-4 col-span-1">
                  <label htmlFor="email"> Email </label>
                  <input
                    style={{ backgroundColor: `${currentColor}25` }}
                    value={teacherData.email}
                    id="email"
                    onChange={(e) => {
                      setTeacherData({ ...teacherData, email: e.target.value });
                    }}
                    type="text"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>

                <div className=" col-start-1 col-span-2">
                  <label htmlFor="address"> Address </label>
                  <input
                    style={{ backgroundColor: `${currentColor}25` }}
                    value={teacherData.address}
                    id="address"
                    onChange={(e) => {
                      setTeacherData({
                        ...teacherData,
                        address: e.target.value,
                      });
                    }}
                    type="text"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>

                <div className="col-start-3 col-span-1 relative">
                  <label htmlFor="state"> State </label>
                  <select
                    style={{ backgroundColor: `${currentColor}25` }}
                    defaultValue={"default"}
                    id="state"
                    onChange={(e) =>
                      setTeacherData({ ...teacherData, state: e.target.value })
                    }
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option value={"default"} disabled>
                      Choose an option
                    </option>
                    <option value={"CDMX"} key={"CDMX"}>
                      {" "}
                      CDMX{" "}
                    </option>
                    <option value={"Estado de Mexico"} key={"Estado de Mexico"}>
                      {" "}
                      Estado de Mexico{" "}
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>

                <div className=" col-start-4 col-span-1">
                  <label htmlFor="code"> Post Code </label>
                  <input
                    style={{ backgroundColor: `${currentColor}25` }}
                    value={teacherData.code}
                    id="code"
                    onChange={(e) => {
                      setTeacherData({ ...teacherData, code: e.target.value });
                    }}
                    type="text"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>

                <div className="col-start-1 col-span-1">
                  <label> Upload Image </label>
                  <input
                    style={{ backgroundColor: `${currentColor}25` }}
                    type="file"
                    onChange={(e) => uploadImage(e.target.files[0])}
                  />
                </div>

                <div
                  style={{ backgroundColor: `${currentColor}25` }}
                  className="col-start-2 col-span-1 justify-center items-center appearance-none flex w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <label className="mr-5 text-center"> Date of Birth </label>
                  <DatePickerComponent
                    id="datepicker"
                    placeholder="Enter Date"
                    change={(data) =>
                      setTeacherData({ ...teacherData, dob: data.value })
                    }
                  />
                </div>

                <div className=" col-start-3 col-span-1">
                  <label htmlFor="code"> Password </label>
                  <input
                    style={{ backgroundColor: `${currentColor}25` }}
                    id="code"
                    onChange={(e) => {
                      setTeacherData({
                        ...teacherData,
                        password: e.target.value,
                      });
                    }}
                    type="text"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>

                <div className=" col-start-4 col-span-1">
                  <label htmlFor="code"> Confirm Password </label>
                  <input
                    style={{ backgroundColor: `${currentColor}25` }}
                    value={teacherData.confirmPassword}
                    id="code"
                    onChange={(e) =>
                      setTeacherData({
                        ...teacherData,
                        confirmPassword: e.target.value,
                      })
                    }
                    type="text"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>

                <div className=" col-start-1 col-span-1">
                  <label htmlFor="code"> Current hourly Rate </label>
                  <input
                    style={{ backgroundColor: `${currentColor}25` }}
                    value={teacherData.hourlyRate}
                    id="code"
                    onChange={(e) =>
                      setTeacherData({
                        ...teacherData,
                        hourlyRate: e.target.value,
                      })
                    }
                    type="number"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>

                <div className="col-start-1 col-span-1 flex justify-evenly flex-col mt-10">
                  <button
                    type="submit"
                    class="py-2 px-4 rounded-md flex justify-between w-full hover:shadow-md"
                    style={{ backgroundColor: currentColor, color: "white" }}
                  >
                    <p className="font-semibold">
                      {" "}
                      {`${currentEdit ? "EDIT" : "ADD"} TEACHER`}{" "}
                    </p>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default AddTeacher;
