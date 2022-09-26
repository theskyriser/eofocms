import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Backdrop from "../../Backdrop";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import {
  createHomework,
  deleteHomework,
  getHomeworkByStudent,
  updateHomework,
} from "../../../redux/actions/homework";
import AddHomework from "../../Admin/Monitor/Students/AddHomework";
import { MdInfoOutline, MdOutlineCancel } from "react-icons/md";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import HomeworkCard from "../../Admin/Monitor/Students/HomeworkCard";
import CurrentHomework from "../../Admin/Monitor/Students/CurrentHomework";
import AddHomeworkTeacher from "./AddHomeworkTeacher";

const TeacherStudentHomework = ({
  selectedStudent,
  setOpenHomework,
  currentColor,
}) => {
  const dispatch = useDispatch();
  const homeworks = useSelector((state) => state.homework.homeworks);
  const latestHomeworkId = useSelector(
    (state) => state.homework.latestHomework?._id
  );

  const thisStudent = useSelector((state) =>
    state.students.filter((student) => student._id === selectedStudent)
  )[0];

  const [searchParams, setSearchParams] = useState({
    searchDateStart: "",
    searchDateEnd: "",
  });

  const [selectedHomework, setSelectedHomework] = useState(latestHomeworkId);
  const [openAddHomework, setOpenAddHomework] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(getHomeworkByStudent(selectedStudent));

    if (selectedHomework === null) {
      setSelectedHomework(latestHomeworkId);
    }
  }, [latestHomeworkId, selectedHomework]);

  const handleSelectHomework = (id, index, e) => {
    e.preventDefault();
    setCurrentIndex(index);
    setSelectedHomework(id);
  };

  const handleSubmit = (e, homeworkData) => {
    e.preventDefault();
    dispatch(createHomework(homeworkData));
    setSelectedHomework(null);
    setOpenAddHomework(false);
  };

  const handleComplete = (type, id, homeworkData) => {
    switch (type) {
      case "COMPLETE":
        dispatch(
          updateHomework(id, { ...homeworkData, completed: new Date() })
        );
        break;
      case "UNCOMPLETE":
        dispatch(
          updateHomework(id, { ...homeworkData, completed: "NOT COMPLETE" })
        );
        break;
      default:
    }
    setOpenHomework(false);
  };

  const handleDelete = () => {
    dispatch(deleteHomework(selectedHomework));
    setSelectedHomework(null);
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

  console.log(latestHomeworkId);

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
                All Homeworks for {thisStudent.firstName} {thisStudent.lastName}{" "}
              </h1>
              <button
                type="button"
                onClick={() => {
                  setOpenHomework((prev) => !prev);
                }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block"
              >
                <MdOutlineCancel />
              </button>
            </div>

            <button
              className="py-2 px-4 mb-5 rounded-md flex justify-between hover:shadow-md"
              onClick={() => setOpenAddHomework(true)}
              style={{ backgroundColor: currentColor, color: "white" }}
            >
              <p className="font-semibold"> Add New Homework </p>
              <div className="text-2xl ml-3">
                <MdInfoOutline />
              </div>
            </button>

            <hr className="border-1 border-color mb-4" />
            <div>
              {homeworks ? (
                homeworks.length !== 0 ? (
                  <CurrentHomework
                    selectedHomework={selectedHomework}
                    setSelectedHomework={setSelectedHomework}
                    latestHomeworkId={latestHomeworkId}
                    currentColor={currentColor}
                    handleComplete={handleComplete}
                    handleDelete={handleDelete}
                  />
                ) : (
                  <div> No homeworks on record </div>
                )
              ) : (
                <div>Loading...</div>
              )}
              <div>
                <hr className="border-1 border-color mb-5 mt-5" />
                <div className="mb-5 flex justify-between items-center">
                  <h1 className="text-3xl font-bold">
                    {" "}
                    Select Previous Homework{" "}
                  </h1>
                </div>

                {homeworks ? (
                  homeworks.length !== 0 ? (
                    <div className="flex relative items-center">
                      <div className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth">
                        {homeworks
                          .slice(0)
                          .reverse()
                          .map((item, index) => (
                            <HomeworkCard
                              currentColor={currentColor}
                              dueDate={item.deadline}
                              dateSet={item.dateSet}
                              completed={item.completed}
                              handleSelectHomework={handleSelectHomework}
                              index={index}
                              currentIndex={currentIndex}
                              id={item._id}
                            />
                          ))}
                      </div>
                    </div>
                  ) : (
                    <div> No student grades </div>
                  )
                ) : (
                  <div> Loading... </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence
          intial={false}
          exitBeforeEnter={true}
          onExitComplete={() => null}
        >
          {openAddHomework && (
            <AddHomeworkTeacher
              handleSubmit={handleSubmit}
              selectedStudent={selectedStudent}
              currentColor={currentColor}
              setOpenAddHomework={setOpenAddHomework}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </Backdrop>
  );
};

export default TeacherStudentHomework;
