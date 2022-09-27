import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Backdrop from "../../../Backdrop";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteHomework,
  getHomeworkByStudent,
  updateHomework,
} from "../../../../redux/actions/homework";
import { MdOutlineCancel } from "react-icons/md";
import HomeworkCard from "./HomeworkCard";
import CurrentHomework from "./CurrentHomework";

const SeeAllHomeworks = ({
  selectedStudent,
  setOpenAllHomework,
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
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(getHomeworkByStudent(selectedStudent));
  }, [latestHomeworkId]);

  const handleSelectHomework = (id, index, e) => {
    e.preventDefault();
    setCurrentIndex(index);
    setSelectedHomework(id);
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
    setOpenAllHomework(false);
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
                  setOpenAllHomework((prev) => !prev);
                }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block"
              >
                <MdOutlineCancel />
              </button>
            </div>
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
                              id={item._id}
                              completed={item.completed}
                              handleSelectHomework={handleSelectHomework}
                              index={index}
                              currentIndex={currentIndex}
                              key={item._id}
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
      </motion.div>
    </Backdrop>
  );
};

export default SeeAllHomeworks;
