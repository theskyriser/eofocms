import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Backdrop from "../../../Backdrop";
import { useDispatch, useSelector } from "react-redux";
import {
  createHomework,
  deleteHomework,
  getHomeworkByStudent,
  updateHomework,
} from "../../../../redux/actions/homework";
import { MdOutlineCancel } from "react-icons/md";

const ShowLatestHomework = ({
  selectedStudent,
  currentColor,
  setOpenLatestHomework,
}) => {
  const dispatch = useDispatch();
  const thisStudent = useSelector((state) =>
    state.students.filter((student) => student._id === selectedStudent)
  )[0];
  const latestHomework = useSelector((state) => state.homework.latestHomework);

  useEffect(() => {
    dispatch(getHomeworkByStudent(selectedStudent));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createHomework(homeworkData));
    setOpenLatestHomework(false);
  };

  const handleMarkAsComplete = (type) => {
    switch (type) {
      case "COMPLETE":
        dispatch(
          updateHomework(latestHomework._id, {
            ...latestHomework,
            completed: new Date(),
          })
        );
        break;
      case "UNCOMPLETE":
        dispatch(
          updateHomework(latestHomework._id, {
            ...latestHomework,
            completed: "NOT COMPLETE",
          })
        );
        break;
      default:
    }
    setOpenLatestHomework(false);
  };

  const handleDelete = () => {
    dispatch(deleteHomework(latestHomework._id));
    setOpenLatestHomework(false);
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
                {`Homework for ${thisStudent?.firstName} ${thisStudent?.lastName}`}{" "}
              </h1>
              {latestHomework && (
                <div>
                  <h1 className="text-2xl font-bold ml-5">
                    {" "}
                    {latestHomework?.completed === "NOT COMPLETE"
                      ? `Due: ${latestHomework?.deadline?.slice(0, 10)}`
                      : `Completed: ${latestHomework?.completed?.slice(
                          0,
                          10
                        )}`}{" "}
                  </h1>
                </div>
              )}

              <button
                type="button"
                onClick={() => setOpenLatestHomework((prev) => !prev)}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block"
              >
                <MdOutlineCancel />
              </button>
            </div>

            {latestHomework ? (
              <div>
                {latestHomework?.completed !== "NOT COMPLETE" && (
                  <h1 className="text-lg font-semibold text-green-500 mb-4">
                    {" "}
                    Completed{" "}
                  </h1>
                )}

                <div className="flex flex-col mb-5">
                  <h1 className="text-xl font-semibold"> Description </h1>
                  <textarea className="overflow-auto h-40">
                    {latestHomework?.description}
                  </textarea>
                </div>

                <div className="w-full flex justify-between md:flex-row flex-col">
                  {latestHomework?.completed === "NOT COMPLETE" ? (
                    <button
                      type="button"
                      onClick={() => handleMarkAsComplete("COMPLETE")}
                      class="bg-gray-200 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded inline-flex items-center mt-2"
                      style={{ backgroundColor: currentColor }}
                    >
                      <span>Mark as Complete</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleMarkAsComplete("UNCOMPLETE")}
                      class="bg-gray-200 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded inline-flex items-center mt-2"
                      style={{ backgroundColor: currentColor }}
                    >
                      <span>Mark as Uncompleted</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleDelete()}
                    class="bg-gray-200 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded inline-flex items-center mt-2"
                    style={{ backgroundColor: currentColor }}
                  >
                    <span>Delete Current Homework</span>
                  </button>
                </div>
              </div>
            ) : (
              <div> No homeworks on record </div>
            )}
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default ShowLatestHomework;
