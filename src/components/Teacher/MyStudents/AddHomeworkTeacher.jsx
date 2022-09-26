import React, { useState } from "react";
import { motion } from "framer-motion";
import Backdrop from "../../Backdrop";
import { useDispatch, useSelector } from "react-redux";
import { MdInfoOutline, MdOutlineCancel } from "react-icons/md";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

const AddHomeworkTeacher = ({
  handleSubmit,
  selectedStudent,
  currentEdit,
  currentColor,
  setOpenAddHomework,
}) => {
  const dispatch = useDispatch();

  const thisStudent = useSelector((state) =>
    state.students.filter((student) => student._id === selectedStudent)
  )[0];

  const [homeworkData, setHomeworkData] = useState({
    description: "",
    studentRootId: selectedStudent,
    deadline: "",
  });

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
            <div className="mb-5 flex justify-between items-center">
              <h1 className="text-2xl font-bold">
                {" "}
                {`${currentEdit ? "Edit" : "Add New"}  Homework for ${
                  thisStudent.firstName
                } ${thisStudent.lastName} `}{" "}
              </h1>

              <button
                type="button"
                onClick={() => {
                  setOpenAddHomework((prev) => !prev);
                }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block"
              >
                <MdOutlineCancel />
              </button>
            </div>

            <form onSubmit={(e) => handleSubmit(e, homeworkData)}>
              <div className="w-full">
                <div className=" col-start-3 col-span-1">
                  <label> Deadline </label>
                  <DatePickerComponent
                    id="datepickerStart"
                    placeholder="Enter Date"
                    change={(data) =>
                      setHomeworkData({ ...homeworkData, deadline: data.value })
                    }
                  />
                </div>

                <label htmlFor="excellence"> Homework Description </label>
                <textarea
                  name="excellence"
                  id="excellence"
                  value={homeworkData.description}
                  onChange={(e) =>
                    setHomeworkData({
                      ...homeworkData,
                      description: e.target.value,
                    })
                  }
                  style={{ backgroundColor: currentColor + "40" }}
                  rows="4"
                  class="mt-1 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Add excellence..."
                ></textarea>
              </div>
              <div className="flex flex-row-reverse">
                <button
                  type="sumbit"
                  class="bg-gray-200 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded inline-flex items-center mt-2"
                  style={{ backgroundColor: currentColor }}
                >
                  <span>Submit Homework</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default AddHomeworkTeacher;
