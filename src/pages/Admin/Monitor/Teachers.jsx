import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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

import { teacherGrid } from "../../../data/gridHeaders";
import { getTeachers, deleteTeacher } from "../../../redux/actions/teachers";
import { motion, AnimatePresence } from "framer-motion";
import AddTeacher from "../../../components/Admin/Monitor/Teachers/AddTeacher";
import ExpandTeacher from "../../../components/Admin/Monitor/Teachers/ExpandTeacher";
import profile from "../../../data/profile.svg";
import {
  MdPersonOutline,
  MdInfoOutline,
  MdOutlineGrade,
  MdPersonAddAlt,
  MdPersonRemoveAlt1,
  MdOutlineSchedule,
  MdAttachMoney,
  MdMoney,
  MdOutlineQueue,
} from "react-icons/md";
import { GrSchedules } from "react-icons/gr";
import PayrollComp from "../../../components/Admin/Monitor/Teachers/PayrollComp";

import ChangeCredentials from "../../../components/Auth/ChangeCredentials";
import { resetPasswordCheck } from "../../../redux/actions/auth";
const ManageTeachers = () => {
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.teachers);
  const currentColor = useSelector((state) => state.appState.currentColor);
  const [activeAddTeacher, setActiveAddTeacher] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [currentEdit, setCurrentEdit] = useState(false);
  const [activeSchedule, setActiveSchedule] = useState(false);
  const [activePayroll, setActivePayroll] = useState(false);

  const [activeCredentials, setActiveCredentials] = useState(false);

  const data = [
    { month: "Mar", sales: 34 },
    { month: "Apr", sales: 32 },
    { month: "May", sales: 40 },
    { month: "Jun", sales: 32 },
  ];

  const thisTeacher = teachers.filter(
    (teacher) => teacher._id === selectedTeacher
  )[0];

  useEffect(() => {
    dispatch(getTeachers());
  }, [dispatch]);

  const handleRowSelect = (rowData) => {
    if (rowData.data) {
      setSelectedTeacher(rowData.data._id);
      setCurrentEdit(true);
    }
  };

  const handleRowDeselect = () => {
    setCurrentEdit(false);
    setSelectedTeacher("");
  };

  const handleAdd = () => {
    setCurrentEdit(false);
    setActiveAddTeacher(true);
  };

  const handleOpenSchedule = () => {
    if (selectedTeacher) {
      setActiveSchedule(true);
    } else {
      alert("Select Teacher");
    }
  };

  const handleEdit = () => {
    if (selectedTeacher) {
      setCurrentEdit(true);
      setActiveAddTeacher(true);
    } else {
      alert("Select Teacher");
    }
  };

  const handleCredentials = () => {
    if (selectedTeacher) {
      dispatch(resetPasswordCheck());
      setActiveCredentials(true);
    } else {
      alert("Select Teacher");
    }
  };

  const handleDelete = () => {
    if (selectedTeacher) {
      dispatch(deleteTeacher(selectedTeacher));
    } else {
      alert("Select Teacher");
    }
  };

  return (
    <div>
      <div className="p-4 md:mt-0 mt-10">
        <div className=" bg-main-bg rounded-lg shadow-lg p-4">
          <div className="mb-5">
            <h1 className="text-2xl font-extrabold"> Teachers </h1>
          </div>

          <div className="md:grid grid-cols-7 gap-4 flex flex-col">
            <div className="col-span-3 bg-white rounded-lg shadow-lg p-5 flex gap-4 md:flex-row flex-col">
              <div className="items-center md:items-left flex flex-col justify-between">
                <div className="flex-col flex items-center">
                  <img src={profile} width={200} />

                  <h2 className="mt-1 font-semibold text-lg">
                    {" "}
                    {thisTeacher?.position
                      ? thisTeacher?.position
                      : "No record"}{" "}
                  </h2>

                  <button
                    className="py-2 px-4 rounded-md flex justify-center w-full hover:shadow-md mt-3"
                    onClick={() => handleCredentials()}
                    style={{ backgroundColor: currentColor, color: "white" }}
                  >
                    <p className="font-semibold"> Credentials </p>
                  </button>
                </div>
              </div>

              <div className="text-md overflow-auto grid grid-cols-4 gap-4 w-full bg-main-bg rounded-lg shadow-lg p-5">
                <div
                  className="col-span-2 font-semibold text-right"
                  style={{ color: currentColor }}
                >
                  <p> First name </p>
                  <p> Last name </p>
                  <p> Email </p>
                  <p> Phone </p>
                  <p> Address </p>
                  <p> State </p>
                  <p> Post Code </p>
                  <p> Number Of Classes </p>
                </div>

                <div className="col-span-3 col-start-3 font-small text-left">
                  <p>
                    {" "}
                    {thisTeacher?.firstName
                      ? thisTeacher?.firstName
                      : "No record"}
                  </p>
                  <p>
                    {" "}
                    {thisTeacher?.lastName
                      ? thisTeacher?.lastName
                      : "No record"}
                  </p>
                  <p>
                    {" "}
                    {thisTeacher?.email ? thisTeacher?.email : "No record"}{" "}
                  </p>
                  <p>
                    {" "}
                    {thisTeacher?.phone ? thisTeacher?.phone : "No record"}{" "}
                  </p>
                  <p>
                    {" "}
                    {thisTeacher?.address
                      ? thisTeacher?.address
                      : "No record"}{" "}
                  </p>
                  <p>
                    {" "}
                    {thisTeacher?.state ? thisTeacher?.state : "No record"}{" "}
                  </p>
                  <p> {thisTeacher?.code ? thisTeacher?.code : "No record"} </p>
                  <p>
                    {" "}
                    {thisTeacher?.numberOfClasses
                      ? thisTeacher?.numberOfClasses
                      : "No record"}{" "}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-start-4 col-span-5">
              <GridComponent
                selectedRowIndex={0}
                dataSource={teachers}
                rowSelected={(rowData) => handleRowSelect(rowData)}
                rowDeselected={() => handleRowDeselect()}
              >
                <ColumnsDirective>
                  {teacherGrid.map((item, index) => (
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
                onClick={() => handleAdd()}
                style={{ backgroundColor: currentColor, color: "white" }}
              >
                <p className="font-semibold"> Add New Teacher </p>
                <div className="text-2xl mr-2">
                  <MdPersonAddAlt />
                </div>
              </button>

              <button
                class="py-2 px-4 rounded-md flex justify-between mb-2 w-full hover:shadow-md"
                onClick={() => handleEdit()}
                style={{ backgroundColor: currentColor, color: "white" }}
              >
                <p className="font-semibold"> Edit Teacher Information </p>
                <div className="text-2xl mr-2">
                  <MdPersonOutline />
                </div>
              </button>

              <button
                class="py-2 px-4 rounded-md flex justify-between mb-2 w-full hover:shadow-md"
                onClick={() => handleDelete()}
                style={{ backgroundColor: currentColor, color: "white" }}
              >
                <p className="font-semibold"> Delete Teacher </p>
                <div className="text-2xl mr-2">
                  <MdPersonRemoveAlt1 />
                </div>
              </button>
            </div>

            <div className="col-start-2 col-span-1 shadow-lg bg-white mt-5 p-4">
              <h2 className="text-xl font-semibold mb-3">
                {" "}
                Teacher's Classes{" "}
              </h2>

              <button
                class="py-2 px-4 rounded-md flex justify-between mb-2 w-full hover:shadow-md"
                onClick={() => handleOpenSchedule()}
                style={{ backgroundColor: currentColor, color: "white" }}
              >
                <p className="font-semibold"> See Teacher's Schedule </p>
                <div className="text-2xl mr-2">
                  <MdOutlineSchedule />
                </div>
              </button>
            </div>

            <div className="col-start-3 col-span-1 shadow-lg bg-white mt-5 p-4">
              <h2 className="text-xl font-semibold mb-3"> Payroll </h2>

              <button
                class="py-2 px-4 rounded-md flex justify-between mb-2 w-full hover:shadow-md"
                onClick={() => setActivePayroll(true)}
                style={{ backgroundColor: currentColor, color: "white" }}
              >
                <p className="font-semibold"> See Payroll Information </p>
                <div className="text-2xl mr-2">
                  <MdAttachMoney />
                </div>
              </button>

              <button
                class="py-2 px-4 rounded-md flex justify-between mb-2 w-full hover:shadow-md"
                onClick={() => {}}
                style={{ backgroundColor: currentColor, color: "white" }}
              >
                <p className="font-semibold"> Edit Teacher's Financials </p>
                <div className="text-2xl mr-2">
                  <MdMoney />
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
        {activeAddTeacher && (
          <AddTeacher
            setActiveAddTeacher={setActiveAddTeacher}
            activeAddTeacher={activeAddTeacher}
            currentEdit={currentEdit}
            selectedTeacher={selectedTeacher}
            currentColor={currentColor}
          />
        )}

        {activeSchedule && (
          <ExpandTeacher
            selectedTeacher={selectedTeacher}
            setActiveSchedule={setActiveSchedule}
            currentColor={currentColor}
          />
        )}

        {activePayroll && (
          <PayrollComp
            selectedTeacher={selectedTeacher}
            setActivePayroll={setActivePayroll}
          />
        )}

        {activeCredentials && (
          <ChangeCredentials
            id={selectedTeacher}
            type={"TEACHER"}
            setActiveCredentials={setActiveCredentials}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageTeachers;
