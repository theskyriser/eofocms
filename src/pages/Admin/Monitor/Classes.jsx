import React, { useState, useEffect } from "react";
import { classGrid } from "../../../data/gridHeaders";
import AddClass from "../../../components/Admin/Monitor/Classes/AddClass";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  deleteClass,
  getClassesBySearch,
} from "../../../redux/actions/classes";
import ExpandClass from "../../../components/Admin/Monitor/Classes/ExpandClass";
import {
  GridComponent,
  ColumnsDirective,
  Selection,
  Sort,
  ContextMenu,
  Edit,
  Inject,
  ColumnDirective,
} from "@syncfusion/ej2-react-grids";
import { getTeachers } from "../../../redux/actions/teachers";
import { getStudents } from "../../../redux/actions/students";
import ClassSearch from "../../../components/Admin/Monitor/Classes/ClassSearch";
import {
  MdOutlineQueue,
  MdOutlineLibraryBooks,
  MdOutlineWebAssetOff,
  MdChromeReaderMode,
  MdDateRange,
} from "react-icons/md";
import AttendanceComp from "../../../components/Admin/Monitor/Classes/Attendance/AttendanceComp";
const ManageClasses = () => {
  const dispatch = useDispatch();
  const [activeAddClass, setActiveAddClass] = useState(false);
  const classes = useSelector((state) => state.classes);
  const [selectedClass, setSelectedClass] = useState("");
  const [currentEdit, setCurrentEdit] = useState(false);
  const [activeExpand, setActiveExpand] = useState(false);
  const currentColor = useSelector((state) => state.appState.currentColor);

  const [openFilter, setOpenFilter] = useState(false);
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const [searchParams, setSearchParams] = useState({
    group: "",
    level: "",
    searchDateStart: "",
    searchDateEnd: "",
    teacher: "",
    coOrdinator: "",
    students: "",
  });
  const [openAttendance, setOpenAttendance] = useState(false);

  const teachers = useSelector((state) => state.teachers);
  let thisTeacher;
  let thisCoor;

  const thisClass = classes.filter(
    (thisClass) => thisClass._id === selectedClass
  )[0];
  if (thisClass) {
    thisTeacher = teachers.filter(
      (teacher) => teacher._id === thisClass.teacher
    )[0];
    thisCoor = teachers.filter(
      (thisCoor) => thisCoor._id === thisClass.coOrdinator
    )[0];
  }

  useEffect(() => {
    dispatch(
      getClassesBySearch(
        `search?searchDateStart=${firstDayOfMonth}&endDateStart=${lastDayOfMonth}`
      )
    );
    dispatch(getStudents());
    dispatch(getTeachers());
  }, [openFilter]);

  const searchPost = () => {
    let url = "search?";

    for (const query in searchParams) {
      if (searchParams[query] !== "") {
        url = url + `${query}=${searchParams[query]}&`;
      }
    }
    dispatch(getClassesBySearch(url));
    //  navigate(`/main/attendance/${url}`)
  };

  const handleRowSelect = (rowData) => {
    if (rowData.data) {
      setSelectedClass(rowData.data._id);
      setCurrentEdit(true);
    }
  };

  const handleRowDeselect = () => {
    setCurrentEdit(false);
    setSelectedClass(undefined);
  };

  const handleEdit = () => {
    if (selectedClass) {
      setCurrentEdit(true);
      setActiveAddClass(true);
    } else {
      alert("Select Class");
    }
  };

  const handleActiveExpand = () => {
    if (selectedClass) {
      setActiveExpand(true);
    } else {
      alert("Select Class");
    }
  };

  const handleOpenAttendance = () => {
    if (selectedClass) {
      setOpenAttendance(true);
    } else {
      alert("Select Class");
    }
  };

  const handleDelete = () => {
    if (selectedClass) {
      dispatch(deleteClass(selectedClass));
    } else {
      alert("Select Class");
    }
  };

  return (
    <div>
      <div className="p-4 md:mt-0 mt-10">
        <div className=" bg-main-bg rounded-lg shadow-lg p-4">
          <div className="mb-5 flex justify-between">
            <h1 className="text-2xl font-extrabold"> Classes </h1>
            <button
              class="py-2 px-4 rounded-md flex justify-between mb-2 hover:shadow-md"
              onClick={() => setOpenFilter(true)}
              style={{ backgroundColor: currentColor, color: "white" }}
            >
              <p className="font-semibold"> Filter </p>
            </button>
          </div>

          <div className="md:grid grid-cols-7 gap-4 flex flex-col">
            <div className="col-span-2  bg-white rounded-lg shadow-lg p-5 flex gap-4">
              <div className=" grid grid-cols-4 gap-4 w-full bg-main-bg rounded-lg shadow-lg p-2">
                <div
                  className="col-span-2 font-semibold text-right"
                  style={{ color: currentColor }}
                >
                  <p> Group name </p>
                  <p> Client </p>
                  <p> Class Level </p>
                  <p> Start Date </p>
                  <p> End Date </p>
                  <p> Teacher </p>
                  <p> Coordinator </p>
                  <p> Hours </p>
                  <p> Classes/Week </p>
                </div>

                <div className="col-span-3 col-start-3 font-small text-left">
                  <p> {thisClass?.group ? thisClass?.group : "No record"} </p>
                  <p> {thisClass?.client ? thisClass?.client : "No record"} </p>
                  <p> {thisClass?.level ? thisClass?.level : "No record"} </p>
                  <p>
                    {" "}
                    {thisClass?.startDate
                      ? thisClass?.startDate.slice(0, 9)
                      : "No record"}{" "}
                  </p>
                  <p>
                    {" "}
                    {thisClass?.endDate
                      ? thisClass?.endDate.slice(0, 9)
                      : "No record"}{" "}
                  </p>
                  <p>
                    {" "}
                    {thisTeacher?.firstName && thisTeacher?.lastName
                      ? thisTeacher?.firstName + " " + thisTeacher?.lastName
                      : "No record"}{" "}
                  </p>
                  <p>
                    {" "}
                    {thisCoor?.firstName && thisCoor?.lastName
                      ? thisCoor?.firstName + " " + thisCoor?.lastName
                      : "No record"}{" "}
                  </p>
                  <p>
                    {" "}
                    {thisClass?.numberOfHours
                      ? thisClass?.numberOfHours
                      : "No record"}{" "}
                  </p>
                  <p>
                    {" "}
                    {thisClass?.numberPerWeek
                      ? thisClass?.numberPerWeek
                      : "No record"}{" "}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-start-3 col-span-5">
              <GridComponent
                selectedRowIndex={0}
                dataSource={classes}
                rowSelected={(rowData) => handleRowSelect(rowData)}
                rowDeselected={() => handleRowDeselect()}
              >
                <ColumnsDirective>
                  {classGrid.map((item, index) => (
                    <ColumnDirective key={index} {...item} />
                  ))}
                </ColumnsDirective>
                <Inject services={[Selection, Edit, Sort, ContextMenu]} />
              </GridComponent>
            </div>
          </div>

          <div className="md:grid grid-cols-4 gap-8 flex flex-col">
            <div className="col-start-1 col-span-1 shadow-lg bg-white mt-5 p-4">
              <h2 className="text-xl font-semibold mb-3"> Options </h2>
              <button
                class="py-2 px-4 rounded-md flex justify-between mb-2 w-full hover:shadow-md"
                onClick={() => setActiveAddClass(true)}
                style={{ backgroundColor: currentColor, color: "white" }}
              >
                <p className="font-semibold"> Add New Class </p>
                <div className="text-2xl mr-2">
                  <MdOutlineQueue />
                </div>
              </button>

              <button
                class="py-2 px-4 rounded-md flex justify-between mb-2 w-full hover:shadow-md"
                onClick={() => handleEdit()}
                style={{ backgroundColor: currentColor, color: "white" }}
              >
                <p className="font-semibold"> Edit Class </p>
                <div className="text-2xl mr-2">
                  <MdOutlineLibraryBooks />
                </div>
              </button>

              <button
                class="py-2 px-4 rounded-md flex justify-between mb-2 w-full hover:shadow-md"
                onClick={() => handleDelete()}
                style={{ backgroundColor: currentColor, color: "white" }}
              >
                <p className="font-semibold"> Delete Class </p>
                <div className="text-2xl mr-2">
                  <MdOutlineWebAssetOff />
                </div>
              </button>
            </div>

            <div className="col-start-2 col-span-1 shadow-lg bg-white mt-5 p-4">
              <h2 className="text-xl font-semibold mb-3"> Class Scheduling </h2>

              <button
                class="py-2 px-4 rounded-md flex justify-between mb-2 w-full hover:shadow-md"
                onClick={() => handleActiveExpand()}
                style={{ backgroundColor: currentColor, color: "white" }}
              >
                <p className="font-semibold"> Class Schedule </p>
                <div className="text-2xl mr-2">
                  <MdChromeReaderMode />
                </div>
              </button>

              <button
                class="py-2 px-4 rounded-md flex justify-between mb-2 w-full hover:shadow-md"
                onClick={() => handleOpenAttendance()}
                style={{ backgroundColor: currentColor, color: "white" }}
              >
                <p className="font-semibold"> Edit Class Attendance </p>
                <div className="text-2xl mr-2">
                  <MdDateRange />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence
        intial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {activeAddClass && (
          <AddClass
            setActiveAddClass={setActiveAddClass}
            activeAddClass={activeAddClass}
            currentEdit={currentEdit}
            selectedClass={selectedClass}
            currentColor={currentColor}
          />
        )}

        {activeExpand && (
          <ExpandClass
            currentColor={currentColor}
            setActiveExpand={setActiveExpand}
            selectedClass={selectedClass}
          />
        )}

        {openFilter && (
          <ClassSearch
            setOpenFilter={setOpenFilter}
            searchPost={searchPost}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        )}

        {openAttendance && (
          <AttendanceComp
            selectedClass={selectedClass}
            setOpenAttendance={setOpenAttendance}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageClasses;
