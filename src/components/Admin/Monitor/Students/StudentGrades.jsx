import React, { useState, useEffect } from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

import AddNewGrades from "./AddNewGrades";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import { MdInfoOutline } from "react-icons/md";
import { AnimatePresence } from "framer-motion";
import { MdOutlineCancel } from "react-icons/md";
import { motion } from "framer-motion";
import Backdrop from "../../../Backdrop";
import { useDispatch, useSelector } from "react-redux";
import GradeCard from "./GradeCard";
import {
  createGrades,
  getGradesByStudent,
  deleteGrades,
} from "../../../../redux/actions/grades";
import CurrentGrades from "./CurrentGrades";

const StudentGrades = ({
  selectedStudent,
  openGrades,
  setOpenGrades,
  currentColor,
}) => {
  const dispatch = useDispatch();
  const grades = useSelector((state) => state.grades.grades);

  const latestGradeId = useSelector((state) => state.grades.latestGrades?._id);
  const student = useSelector(
    (state) =>
      state.students.filter((student) => student._id === selectedStudent)[0]
  );

  const [addNew, setAddNew] = useState(false);
  const [addNewData, setAddNewData] = useState({
    writing: 0,
    reading: 0,
    speaking: 0,
    listening: 0,
    examPer: 0,
    average: 0,
    excellence: "",
    improvements: "",
    studentRootId: selectedStudent,
  });
  const [searchParams, setSearchParams] = useState({
    searchDateStart: "",
    searchDateEnd: "",
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  const [selectedGrade, setSelectedGrade] = useState(latestGradeId);
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(getGradesByStudent(selectedStudent));
  }, [addNew, latestGradeId]);

  const handleChange = (e) => {
    setAddNewData({ ...addNewData, [e.target.name]: e.target.value });
  };

  const handleAverage = () => {
    const average =
      (Number(addNewData.writing) +
        Number(addNewData.reading) +
        Number(addNewData.listening) +
        Number(addNewData.speaking) +
        Number(addNewData.examPer)) /
      5;
    setAddNewData({ ...addNewData, average });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createGrades(addNewData));
    setAddNew(false);
  };

  const handleSelectGrade = (id, index, e) => {
    e.preventDefault();
    setCurrentIndex(index);
    setSelectedGrade(id);
  };

  const handleDelete = () => {
    if (user?.result?.accountType !== "ADMIN") {
      alert("Please contact your administrator to cancel this class");
    } else {
      dispatch(deleteGrades(selectedGrade));
      setSelectedGrade(null);
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

  return (
    <Backdrop>
      <motion.div
        animate="visible"
        initial="hidden"
        exit="exit"
        variants={dropIn}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen px-5 z-10">
          <div className="w-full bg-white rounded-lg shadow-lg p-4">
            <div className="mb-5 flex justify-between items-center flex-col md:flex-row">
              <div className="flex flex-row">
                <h1 className="text-4xl font-bold">
                  {" "}
                  {`${student.firstName} ${student.lastName}'s Grades`}{" "}
                </h1>

                <TooltipComponent content="Menu" position="BottomCenter">
                  <button
                    type="button"
                    className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block"
                    onClick={() => setOpenGrades((prev) => !prev)}
                  >
                    <MdOutlineCancel />
                  </button>
                </TooltipComponent>
              </div>

              <button
                className="py-2 px-4 rounded-md flex justify-between hover:shadow-md my-3"
                onClick={() => setAddNew(true)}
                style={{ backgroundColor: currentColor, color: "white" }}
              >
                <p className="font-semibold"> Input New Grades </p>
                <div className="text-2xl ml-3">
                  <MdInfoOutline />
                </div>
              </button>

              <button
                className="py-2 px-4 rounded-md flex justify-between hover:shadow-md"
                onClick={() => handleDelete()}
                style={{ backgroundColor: currentColor, color: "white" }}
              >
                <p className="font-semibold"> Delete Selected Grades </p>
                <div className="text-2xl ml-3">
                  <MdInfoOutline />
                </div>
              </button>
            </div>

            <hr className="border-1 border-color mb-4" />

            <div>
              {grades ? (
                grades.length !== 0 ? (
                  <CurrentGrades
                    selectedGrade={selectedGrade}
                    latestGradeId={latestGradeId}
                    setSelectedGrade={setSelectedGrade}
                  />
                ) : (
                  <div> No student grades </div>
                )
              ) : (
                <div>Loading...</div>
              )}

              <div>
                <hr className="border-1 border-color mb-5 mt-5" />
                <div className="mb-5 flex justify-between">
                  <h1 className="text-3xl font-bold">
                    {" "}
                    Select Previous Grades{" "}
                  </h1>

                  <div className="flex items-center bg-main-bg shadow-sm p-2 rounded-md w-full md:flex-row flex-col">
                    <h2 className="mr-5"> Search by Date: </h2>

                    <div className="mr-5 mt-1">
                      <DatePickerComponent
                        id="datepickerEnd"
                        placeholder="Enter Final Date"
                        value={searchParams.endDate}
                        change={(data) =>
                          setSearchParams({
                            ...searchParams,
                            searchDateStart: new Date(data.value),
                          })
                        }
                      />
                    </div>

                    <div className="mr-5 mt-1">
                      <DatePickerComponent
                        id="datepickerEnd"
                        placeholder="Enter Final Date"
                        value={searchParams.endDate}
                        change={(data) =>
                          setSearchParams({
                            ...searchParams,
                            searchDateEnd: new Date(data.value),
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                {grades ? (
                  grades.length !== 0 ? (
                    <div className="flex relative items-center">
                      <div className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth">
                        {grades
                          .slice(0)
                          .reverse()
                          .map((item, index) => (
                            <GradeCard
                              currentColor={currentColor}
                              date={item.dateAdded}
                              average={item.average}
                              percentage={item.examPer}
                              handleSelectGrade={handleSelectGrade}
                              id={item._id}
                              index={index}
                              currentIndex={currentIndex}
                              setCurrentIndex={setCurrentIndex}
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
          {addNew && (
            <AddNewGrades
              name={student.firstName + " " + student.lastName}
              currentColor={currentColor}
              handleAverage={handleAverage}
              addNew={addNew}
              setAddNew={setAddNew}
              addNewData={addNewData}
              setAddNewData={setAddNewData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </Backdrop>
  );
};

export default StudentGrades;
