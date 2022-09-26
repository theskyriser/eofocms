import React, { useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  Selection,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
  ColumnDirective,
} from "@syncfusion/ej2-react-grids";
import { AnimatePresence } from "framer-motion";

import { studentGrid } from "../../../data/gridHeaders";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import ChangeCredentials from "../../../components/Auth/ChangeCredentials";
import {
  getStudentsByTeacher,
  getStudents,
  deleteStudent,
} from "../../../redux/actions/students";
import StudentGrades from "../../../components/Admin/Monitor/Students/StudentGrades";

import {
  MdGrade,
  MdInfoOutline,
  MdOutlineModeEdit,
  MdOutlineGrade,
  MdOutlineSchedule,
  MdOutlineAssignment,
  MdTextSnippet,
  MdFolder,
  MdAccountCircle,
  MdOutlineMonetizationOn,
} from "react-icons/md";
import { resetPasswordCheck } from "../../../redux/actions/auth";
import {
  SparklineComponent,
  SparklineTooltip,
} from "@syncfusion/ej2-react-charts";
import profile from "../../../data/profile.svg";
import StudentScheduleTeacher from "../../../components/Teacher/MyStudents/StudentScheduleTeacher";
import TeacherStudentHomework from "../../../components/Teacher/MyStudents/TeacherStudentHomework";

const MyStudents = () => {
  const dispatch = useDispatch();
  const currentColor = useSelector((state) => state.appState.currentColor);
  const students = useSelector((state) => state.students);
  const [activeAddStudent, setActiveAddStudent] = useState(false);
  const [activeExpand, setActiveExpand] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [openInfo, setOpenInfo] = useState(false);
  const [openGrades, setOpenGrades] = useState(false);
  const [activeCredentials, setActiveCredentials] = useState(false);
  const thisStudent = students.filter(
    (student) => student._id === selectedStudent
  )[0];
  const [openHomework, setOpenHomework] = useState(false);

  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(getStudents());
    dispatch(getStudentsByTeacher(user?.result?._id));
  }, []);

  const handleRowSelect = (rowData) => {
    setSelectedStudent(rowData.data._id);
  };

  const handleRowDeselect = (e) => {
    setSelectedStudent("");
  };

  const handleOpenGrades = () => {
    if (selectedStudent !== "") {
      setOpenGrades(true);
    } else {
      alert("Please select student");
    }
  };

  const handleActiveExpand = () => {
    if (selectedStudent) {
      setActiveExpand(true);
    } else {
      alert("Select Student");
    }
  };

  const handleOpenHomework = () => {
    if (selectedStudent) {
      setOpenHomework(true);
    } else {
      alert("Select Student");
    }
  };

  return (
    <div>
      <div className="p-4">
        <div className=" bg-main-bg rounded-lg shadow-lg p-4">
          <div className="mb-5">
            <h1 className="text-2xl font-extrabold"> Students </h1>

            <h2> Set grades, View Info, Set Homework?</h2>
          </div>

          <div className="grid grid-cols-7 gap-4">
            <div className="col-span-3 bg-white rounded-lg shadow-lg p-5 flex gap-4">
              <div className="text-center flex flex-col justify-between">
                <div>
                  <img src={profile} width={200} />
                </div>
              </div>

              <div className="text-lg grid grid-cols-4 gap-4 w-full bg-main-bg rounded-lg shadow-lg p-2">
                <div
                  className="col-span-2 font-semibold text-right"
                  style={{ color: currentColor }}
                >
                  <p> Full name </p>
                  <p> Level </p>
                  <p> Email </p>
                  <p> Phone </p>
                  <p> Native Language </p>
                  <p> Address </p>
                  <p> State </p>
                  <p> Post Code </p>
                </div>

                <div className="col-span-3 col-start-3 font-small text-left">
                  <p>
                    {" "}
                    {thisStudent?.firstName && thisStudent?.lastName
                      ? thisStudent?.firstName + " " + thisStudent?.lastName
                      : "No record"}{" "}
                  </p>
                  <p>
                    {" "}
                    {thisStudent?.level ? thisStudent?.level : "No record"}{" "}
                  </p>
                  <p>
                    {" "}
                    {thisStudent?.grade ? thisStudent?.grade : "No record"}{" "}
                  </p>
                  <p>
                    {" "}
                    {thisStudent?.phone ? thisStudent?.phone : "No record"}{" "}
                  </p>
                  <p>
                    {" "}
                    {thisStudent?.nativeLanguage
                      ? thisStudent?.nativeLanguage
                      : "No record"}{" "}
                  </p>
                  <p>
                    {" "}
                    {thisStudent?.address
                      ? thisStudent?.address
                      : "No record"}{" "}
                  </p>
                  <p>
                    {" "}
                    {thisStudent?.state ? thisStudent?.state : "No record"}{" "}
                  </p>
                  <p> {thisStudent?.code ? thisStudent?.code : "No record"} </p>
                </div>
              </div>
            </div>

            <div className="col-start-4 col-span-5">
              <GridComponent
                selectedRowIndex={0}
                dataSource={students}
                rowSelected={(rowData) => handleRowSelect(rowData)}
                rowDeselected={() => handleRowDeselect()}
              >
                <ColumnsDirective>
                  {studentGrid.map((item, index) => (
                    <ColumnDirective key={index} {...item} />
                  ))}
                </ColumnsDirective>
                <Inject services={[Selection, Edit, Sort, ContextMenu]} />
              </GridComponent>
            </div>
          </div>

          <div className="grid grid-cols-11 gap-8 mt-5">
            <div
              className="shadow-sm bg-blue-400 p-8 rounded-sm col-start-2 col-span-3 hover:shadow-lg hover:bg-blue-400 cursor-pointer"
              onClick={() => handleActiveExpand()}
            >
              <div className="flex justify-between" style={{ color: "white" }}>
                <h1 className="font-semibold text-2xl"> Student Schedule </h1>
                <div className="text-3xl">
                  <MdOutlineSchedule />
                </div>
              </div>
            </div>

            <div
              onClick={() => handleOpenHomework()}
              className="shadow-sm bg-red-400 p-8 rounded-sm col-start-5 col-span-3 hover:shadow-lg hover:bg-red-400 cursor-pointer"
            >
              <div className="flex justify-between" style={{ color: "white" }}>
                <h1 className="font-semibold text-2xl"> Student Homework </h1>
                <div className="text-3xl">
                  <MdOutlineAssignment />
                </div>
              </div>
            </div>

            <div
              className="shadow-sm bg-yellow-400 p-8 rounded-sm col-start-8 col-span-3 hover:shadow-lg hover:bg-yellow-400 cursor-pointer"
              onClick={() => handleOpenGrades()}
            >
              <div className="flex justify-between" style={{ color: "white" }}>
                <h1 className="font-semibold text-2xl"> Student Grades </h1>
                <div className="text-3xl">
                  <MdGrade />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence
        intial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {activeExpand && (
          <StudentScheduleTeacher
            selectedStudent={selectedStudent}
            currentColor={currentColor}
            setActiveExpand={setActiveExpand}
          />
        )}

        {openGrades && (
          <StudentGrades
            selectedStudent={selectedStudent}
            setOpenGrades={setOpenGrades}
            currentColor={currentColor}
          />
        )}

        {openHomework && (
          <TeacherStudentHomework
            selectedStudent={selectedStudent}
            setOpenHomework={setOpenHomework}
            currentColor={currentColor}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyStudents;
