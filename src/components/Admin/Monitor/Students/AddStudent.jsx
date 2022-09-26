import React, { useState, useEffect } from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { MdOutlineCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { languageLevels } from "../../../../data/gridHeaders";

import { motion } from "framer-motion";
import Backdrop from "../../../Backdrop";

import {
  createStudent,
  updateStudent,
} from "../../../../redux/actions/students";
import { MdOutlinePersonAddAlt } from "react-icons/md";

const AddStudent = ({
  setActiveAddStudent,
  activeAddStudent,
  currentEdit,
  selectedStudent,
  currentColor,
}) => {
  const student = useSelector((state) =>
    selectedStudent
      ? state.students.find((a) => a._id === selectedStudent)
      : null
  );
  const dispatch = useDispatch();
  const [studentData, setStudentData] = useState({
    image: "",
    firstName: "",
    lastName: "",
    nativeLanguage: "",
    level: "",
    phone: "",
    email: "",
    address: "",
    state: "",
    code: "",
  });

  useEffect(() => {
    if (student && currentEdit) {
      setStudentData(student);
    }
  }, [student]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentEdit) {
      dispatch(updateStudent(currentId, adminData));
    } else {
      dispatch(createStudent(studentData));
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
    setStudentData({ ...studentData, image: base64image });
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

  console.log(currentColor);

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
              <h1 className="text-2xl font-bold">
                {" "}
                {`${currentEdit ? "Edit" : "Add New"}  Student `}{" "}
              </h1>

              <TooltipComponent content="Menu" position="BottomCenter">
                <button
                  type="button"
                  onClick={() => {
                    setActiveAddStudent((prev) => !prev);
                  }}
                  className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block"
                >
                  <MdOutlineCancel />
                </button>
              </TooltipComponent>
            </div>

            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="grid grid-cols-4 gap-3 font-semibold">
                <div className="col-span-2">
                  <label htmlFor="firstName"> First Name </label>
                  <input
                    value={studentData.firstName}
                    type="text"
                    id="firstName"
                    onChange={(e) => {
                      setStudentData({
                        ...studentData,
                        firstName: e.target.value,
                      });
                    }}
                    style={{ backgroundColor: `${currentColor}25` }}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>

                <div className="col-start-3 col-span-2">
                  <label htmlFor="lastName"> Last Name </label>
                  <input
                    value={studentData.lastName}
                    type="text"
                    id="lastName"
                    onChange={(e) => {
                      setStudentData({
                        ...studentData,
                        lastName: e.target.value,
                      });
                    }}
                    style={{ backgroundColor: `${currentColor}25` }}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>

                <div className="col-start-1 col-span-1 relative">
                  <label htmlFor="level"> Level </label>
                  <select
                    value={studentData.level}
                    id="level"
                    onChange={(e) =>
                      setStudentData({ ...studentData, state: e.target.value })
                    }
                    style={{ backgroundColor: `${currentColor}25` }}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    {languageLevels.map((item) => (
                      <option value={item} key={item}>
                        {" "}
                        {item}{" "}
                      </option>
                    ))}
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
                  <label htmlFor="nationality"> Native Language </label>
                  <input
                    value={studentData.nativeLanguage}
                    id="nationality"
                    onChange={(e) => {
                      setStudentData({
                        ...studentData,
                        nativeLanguage: e.target.value,
                      });
                    }}
                    type="text"
                    style={{ backgroundColor: `${currentColor}25` }}
                    className={`appearance-none block w-full text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  />
                </div>

                <div className=" col-start-3 col-span-1">
                  <label htmlFor="phone"> Phone </label>
                  <input
                    value={studentData.phone}
                    id="phone"
                    onChange={(e) => {
                      setStudentData({ ...studentData, phone: e.target.value });
                    }}
                    type="text"
                    style={{ backgroundColor: `${currentColor}25` }}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>

                <div className=" col-start-4 col-span-1">
                  <label htmlFor="email"> Email </label>
                  <input
                    value={studentData.email}
                    id="email"
                    onChange={(e) => {
                      setStudentData({ ...studentData, email: e.target.value });
                    }}
                    type="text"
                    style={{ backgroundColor: `${currentColor}25` }}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>

                <div className=" col-start-1 col-span-2">
                  <label htmlFor="address"> Address </label>
                  <input
                    value={studentData.address}
                    id="address"
                    onChange={(e) => {
                      setStudentData({
                        ...studentData,
                        address: e.target.value,
                      });
                    }}
                    type="text"
                    style={{ backgroundColor: `${currentColor}25` }}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>

                <div className="col-start-3 col-span-1 relative">
                  <label htmlFor="state"> State </label>
                  <select
                    defaultValue={"default"}
                    id="state"
                    onChange={(e) =>
                      setStudentData({ ...studentData, state: e.target.value })
                    }
                    style={{ backgroundColor: `${currentColor}25` }}
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
                    value={studentData.code}
                    id="code"
                    onChange={(e) => {
                      setStudentData({ ...studentData, code: e.target.value });
                    }}
                    style={{ backgroundColor: `${currentColor}25` }}
                    type="text"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>

                <div className=" col-start-1 col-span-1">
                  <label> UPLOAD IMAGE SOMEHOW FUCK </label>
                  <input
                    type="file"
                    onChange={(e) => uploadImage(e.target.files[0])}
                  />
                </div>

                <div className="col-start-1 col-span-1 flex justify-evenly flex-col mt-10">
                  <button
                    class="py-2 px-4 rounded-md flex justify-between w-full hover:shadow-md"
                    onClick={() => {}}
                    style={{ backgroundColor: currentColor, color: "white" }}
                  >
                    <p className="font-semibold"> Add New Student </p>
                    <div className="text-2xl mr-2">
                      <MdOutlinePersonAddAlt />
                    </div>
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

export default AddStudent;
