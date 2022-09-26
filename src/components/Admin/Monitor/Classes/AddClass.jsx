import React, { useState, useEffect } from "react";
import {
  GridComponent,
  ColumnsDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
  ColumnDirective,
  fltrPrevent,
  dataReady,
  rowDataBound,
  rowDeselected,
} from "@syncfusion/ej2-react-grids";
import {
  languageLevels,
  scheduleGrid,
  studentGrid,
} from "../../../../data/gridHeaders";

import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { AnimatePresence } from "framer-motion";
import { dayToInt, getHoursBetweenDates } from "../../../../functions";
import { getDay } from "date-fns";

import AddSession from "./ClassData/AddSession";

import { motion } from "framer-motion";
import Backdrop from "../../../Backdrop";
import AddStudents from "./ClassData/AddStudents";
import { useDispatch, useSelector } from "react-redux";
import AddTeachers from "./ClassData/AddTeachers";
import AddCo from "./ClassData/AddCo";
import {
  createClass,
  getClasses,
  updateClass,
} from "../../../../redux/actions/classes";

const AddClass = ({
  setActiveAddClass,
  activeAddClass,
  currentEdit,
  selectedClass,
}) => {
  const dispatch = useDispatch();
  const [classData, setClassData] = useState({
    client: "",
    group: "",
    level: "",
    startDate: "",
    endDate: "",
    sessions: [],
    teacher: "",
    coOrdinator: "",
    students: [],
    numberOfHours: 0,
    costPerSession: 0,
  });
  const [currentStudentRow, setCurrentStudentRow] = useState("");
  const [currentSessionRow, setCurrentSessionRow] = useState("");
  const [daysUsed, setDaysUsed] = useState([]);

  const [addSession, setAddSession] = useState(false);
  const [addStudents, setAddStudents] = useState(false);
  const [addTeacher, setAddTeacher] = useState(false);
  const [addCo, setAddCo] = useState(false);

  const students = useSelector((state) => state.students);
  const teachers = useSelector((state) => state.teachers);
  const classes = useSelector((state) => state.classes);

  const filteredStudents = students.filter(
    (student) => classData.students.indexOf(student._id) !== -1
  );
  const filteredTeacher = teachers.filter(
    (teacher) => teacher._id === classData.teacher
  );
  const filteredCo = teachers.filter(
    (teacher) => teacher._id === classData.coOrdinator
  );
  const thisClass = classes.filter(
    (thisClass) => thisClass._id === selectedClass
  )[0];

  let grid;

  console.log(thisClass?.sessionsGrid);

  useEffect(() => {
    if (thisClass)
      setClassData({ ...thisClass, sessions: thisClass.sessionsGrid });
  }, [thisClass]);

  const handleSessionSubmit = (e, sessionData) => {
    e.preventDefault();
    const hours = getHoursBetweenDates(
      sessionData.currentStartTime,
      sessionData.currentEndTime
    );
    let session = classData.sessions;
    let tempHours = classData.numberOfHours;

    tempHours += hours;

    const toPush = `${sessionData.currentStartTime
      .toTimeString()
      .slice(0, 5)} - ${sessionData.currentEndTime.toTimeString().slice(0, 5)}`;

    if (session.length !== 0) {
      for (let i = 0; i < session.length; i++) {
        if (!session[i].hasOwnProperty(sessionData.currentDay)) {
          session[i] = { ...session[i], [sessionData.currentDay]: toPush };

          break;
        }

        if (
          session[session.length - 1].hasOwnProperty(sessionData.currentDay)
        ) {
          session.push({ [sessionData.currentDay]: toPush });

          break;
        }
      }
    } else {
      session.push({ [sessionData.currentDay]: toPush });
    }

    setClassData({ ...classData, sessions: session, numberOfHours: tempHours });

    grid.refresh();
    setDaysUsed((prev) => [...prev, dayToInt(sessionData.currentDay)]);
    setAddSession(false);
  };

  const handleStudentsSubmit = (e, currentId) => {
    e.preventDefault();
    let temp = classData.students;
    if (!temp.includes(currentId)) {
      temp.push(currentId);
      setClassData({ ...classData, students: temp });
      setAddStudents(false);
      grid.refresh();
    } else {
      alert("Student already added");
    }
  };

  const handleTeacherSubmit = (e, currentId) => {
    e.preventDefault();
    setClassData({ ...classData, teacher: currentId });
    setAddTeacher(false);
    grid.refresh();
  };

  const handleCoSubmit = (e, currentId) => {
    e.preventDefault();
    setClassData({ ...classData, coOrdinator: currentId });
    setAddCo(false);
    grid.refresh();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentEdit) {
      dispatch(updateClass(currentId, classData));
    } else {
      if (daysUsed.length === 0) {
        alert("Please select sessions");
      } else if (
        !daysUsed.includes(getDay(classData.endDate)) ||
        !daysUsed.includes(getDay(classData.endDate))
      ) {
        alert("Start and End dates must fall on class days");
      } else {
        dispatch(createClass(classData));
      }
    }
  };

  const handleRowUpdate = (rowData) => {
    if (rowData.requestType === "save") {
      const index = rowData.rowIndex;
      const newData = rowData.data;
      for (const day in newData) {
        if (newData[day] === "") {
          newData[day] = undefined;
        }
      }
      const isEmpty = Object.values(newData).every((x) => x === undefined);
      let temp = classData.sessions;
      temp[index] = newData;
      const newArr = temp.filter((value) => value !== newData);
      setClassData({ ...classData, sessions: newArr });
    }
  };

  const handleStudentRowSelect = (rowData) => {
    if (rowData) {
      {
        setCurrentStudentRow(rowData.data._id);
      }
    }
  };

  const handleStudentRowDeselect = () => {
    setCurrentStudentRow("");
  };

  const handleSessionRowSelect = (rowData) => {
    if (rowData) {
      console.log(currentSessionRow);
      setCurrentSessionRow(rowData.data);
    }
  };

  const handleSessionRowDeselect = () => {
    setCurrentSessionRow("");
  };

  const handleStudentDeletion = () => {
    if (currentStudentRow) {
      let temp = classData.students.filter(
        (item) => item !== currentStudentRow
      );
      setClassData({ ...classData, students: temp });
    }
  };

  const handleWeekDeletion = () => {
    console.log(currentSessionRow);
    if (currentSessionRow) {
      console.log(currentSessionRow);
      let temp = classData.sessions.filter(
        (item) => item !== currentSessionRow
      );
      setClassData({ ...classData, sessions: temp });
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
                    setActiveAddClass((prev) => !prev);
                  }}
                  className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block"
                >
                  <MdOutlineCancel />
                </button>
              </TooltipComponent>
            </div>

            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-2">
                  <label> Client </label>
                  <input
                    value={classData.client}
                    onChange={(e) => {
                      setClassData({ ...classData, client: e.target.value });
                    }}
                    type="text"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>

                <div className="col-start-3 col-span-2">
                  <label> Group </label>
                  <input
                    value={classData.group}
                    onChange={(e) => {
                      setClassData({ ...classData, group: e.target.value });
                    }}
                    type="text"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>

                <div className="relative col-start-1 col-span-1">
                  <label> Level </label>
                  <select
                    defaultValue={currentEdit ? classData.value : "default"}
                    onChange={(e) => {
                      setClassData({ ...classData, level: e.target.value });
                    }}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option value={"default"} disabled>
                      Choose an option
                    </option>
                    {languageLevels.map((item) => (
                      <option key={item} value={item}>
                        {" "}
                        {item}{" "}
                      </option>
                    ))}
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>

                <div className="col-start-2 col-span-1">
                  <label> Cost Per Session </label>
                  <input
                    value={classData.costPerSession}
                    onChange={(e) => {
                      setClassData({
                        ...classData,
                        costPerSession: e.target.value,
                      });
                    }}
                    type="text"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>

                <div className=" col-start-3 col-span-1">
                  <label> Start Date </label>
                  <DatePickerComponent
                    id="datepickerStart"
                    placeholder="Enter Date"
                    change={(data) =>
                      setClassData({ ...classData, startDate: data.value })
                    }
                  />
                </div>

                <div className=" col-start-4 col-span-1">
                  <label> End Date </label>
                  <DatePickerComponent
                    id="datepickerEnd"
                    placeholder="Enter Date"
                    change={(data) =>
                      setClassData({ ...classData, endDate: data.value })
                    }
                  />
                </div>

                <div className="col-start-1 col-span-1 flex justify-evenly flex-col">
                  <button
                    type="button"
                    onClick={() => setAddSession((prev) => !prev)}
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                  >
                    <svg
                      class="fill-current w-4 h-4 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                    </svg>
                    <span>Add Sessions</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAddStudents((prev) => !prev)}
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mt-10"
                  >
                    <svg
                      class="fill-current w-4 h-4 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                    </svg>
                    <span>Add Students</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAddTeacher((prev) => !prev);
                    }}
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mt-10"
                  >
                    <svg
                      class="fill-current w-4 h-4 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                    </svg>
                    <span>Add Teacher</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAddCo((prev) => !prev);
                    }}
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mt-10"
                  >
                    <svg
                      class="fill-current w-4 h-4 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                    </svg>
                    <span>Add Co-Ordinator</span>
                  </button>

                  <button
                    type="submit"
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mt-10"
                  >
                    <svg
                      class="fill-current w-4 h-4 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                    </svg>
                    <span>CREATE CLASS</span>
                  </button>
                </div>

                <div className="col-start-2 col-span-3 bg-gray-300 rounded-lg shadow-lg p-4">
                  <div className="flex justify-between">
                    <div>
                      <h1 className="font-semibold"> CLASS SCHEDULE </h1>
                    </div>

                    <div>
                      <h1 className="font-semibold">
                        {" "}
                        CLASS TEACHER:{" "}
                        {filteredTeacher.length
                          ? `${filteredTeacher[0].firstName} ${filteredTeacher[0].lastName}`
                          : `Not Selected`}{" "}
                      </h1>
                    </div>

                    <div>
                      <h1 className="font-semibold">
                        {" "}
                        CLASS CO-OR:{" "}
                        {filteredCo.length
                          ? `${filteredCo[0].firstName} ${filteredCo[0].lastName}`
                          : `Not Selected`}{" "}
                      </h1>
                    </div>
                  </div>

                  <div className="mt-2">
                    <GridComponent
                      allowPaging
                      allowSorting
                      dataSource={classData.sessions}
                      ref={(g) => (grid = g)}
                      rowSelected={(rowData) => handleSessionRowSelect(rowData)}
                      rowDeselected={() => handleSessionRowDeselect()}
                    >
                      <ColumnsDirective>
                        {scheduleGrid.map((item, index) => (
                          <ColumnDirective key={index} {...item} />
                        ))}
                      </ColumnsDirective>
                      <Inject services={[Edit]} />
                    </GridComponent>
                  </div>
                  <div className="flex flex-row-reverse">
                    <button
                      type="button"
                      class="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mt-2"
                      onClick={() => handleWeekDeletion()}
                    >
                      <svg
                        class="fill-current w-4 h-4 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                      </svg>
                      <span>Remove Selected Week</span>
                    </button>
                  </div>

                  <div className="mt-2">
                    <GridComponent
                      id="gridcomp"
                      allowPaging
                      allowSorting
                      dataSource={filteredStudents}
                      rowSelected={(rowData) => handleStudentRowSelect(rowData)}
                      rowDeselected={() => handleStudentRowDeselect()}
                    >
                      <ColumnsDirective>
                        {studentGrid.map((item, index) => (
                          <ColumnDirective key={index} {...item} />
                        ))}
                      </ColumnsDirective>
                    </GridComponent>
                  </div>

                  <div className="flex flex-row-reverse">
                    <button
                      type="button"
                      class="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mt-2"
                      onClick={() => handleStudentDeletion()}
                    >
                      <svg
                        class="fill-current w-4 h-4 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                      </svg>
                      <span>Remove Selected Students</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </motion.div>

      <AnimatePresence
        intial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {addSession && (
          <AddSession
            handleSessionSubmit={handleSessionSubmit}
            setAddSession={setAddSession}
          />
        )}

        {addStudents && (
          <AddStudents
            setAddStudents={setAddStudents}
            handleStudentsSubmit={handleStudentsSubmit}
          />
        )}

        {addTeacher && (
          <AddTeachers
            setAddTeacher={setAddTeacher}
            handleTeacherSubmit={handleTeacherSubmit}
          />
        )}

        {addCo && <AddCo setAddCo={setAddCo} handleCoSubmit={handleCoSubmit} />}
      </AnimatePresence>
    </Backdrop>
  );
};

export default AddClass;
