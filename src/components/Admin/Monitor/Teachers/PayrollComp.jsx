import React, { useEffect, useState } from "react";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  AccumulationDataLabel,
  AccumulationLegend,
} from "@syncfusion/ej2-react-charts";
import {
  GridComponent,
  ColumnsDirective,
  Selection,
  Sort,
  ContextMenu,
  Edit,
  ColumnDirective,
  Page,
} from "@syncfusion/ej2-react-grids";
import { useDispatch, useSelector } from "react-redux";
import { getPayrollBySearch } from "../../../../redux/actions/payroll";
import { classPayrollGrid } from "../../../../data/gridHeaders";
import { AnimatePresence } from "framer-motion";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { MdOutlineCancel } from "react-icons/md";
import { motion } from "framer-motion";
import Backdrop from "../../../Backdrop";

import {
  MdTimer,
  MdAttachMoney,
  MdOutlinePeopleAlt,
  MdOutlineMenuBook,
  MdOutlineCancelPresentation,
  MdOutlineDoneOutline,
  MdGridView,
  MdLeaderboard,
} from "react-icons/md";
import PayRollFilter from "../../../../components/Payroll/PayRollFilter";

const PayrollComp = ({ selectedTeacher, setActivePayroll }) => {
  const dispatch = useDispatch();
  const thisTeacher = useSelector(
    (state) =>
      state.teachers.filter((teacher) => teacher._id === selectedTeacher)[0]
  );
  console.log(thisTeacher);
  const payRollData = useSelector((state) => state.payroll);
  const pieChartData = [
    {
      x: "Completed Classes",
      y:
        (payRollData.numberOfCompleteSessions / payRollData.numberOfSessions) *
        100,
      text: `Completed Classes: ${payRollData.numberOfCompleteSessions}`,
    },
    {
      x: "No attendance",
      y:
        (payRollData.sessionsWithNoAttendance / payRollData.numberOfSessions) *
        100,
      text: `No attendance: ${payRollData.sessionsWithNoAttendance}`,
    },
    {
      x: "Partial Attendance",
      y:
        (payRollData.sessionsWithPartialAttendance /
          payRollData.numberOfSessions) *
        100,
      text: `Partial Attendance: ${payRollData.sessionsWithPartialAttendance}`,
    },
    {
      x: "Cancelled by Client",
      y:
        (payRollData.numberOfSessionsCancelledByClient /
          payRollData.numberOfSessions) *
        100,
      text: `Cancelled by Client: ${payRollData.numberOfSessionsCancelledByClient}`,
    },
    {
      x: "Cancelled by Teacher",
      y:
        (payRollData.numberOfSessionsCancelledByTeacher /
          payRollData.numberOfSessions) *
        100,
      text: `Cancelled by Teacher: ${payRollData.numberOfSessionsCancelledByTeacher}`,
    },
  ];
  const payRollGridData = useSelector((state) => state.payroll.payRollGridData);

  //Default, get by month
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const currentColor = useSelector((state) => state.appState.currentColor);
  const teacher = JSON.parse(localStorage.getItem("profile"));

  const [selectedSearch, setSelectedSearch] = useState("MONTH");
  const [openFilter, setOpenFilter] = useState(false);
  const [searchParams, setSearchParams] = useState({
    searchDateStart: "",
    searchDateEnd: "",
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

  useEffect(() => {
    handleSearch("MONTH");
  }, [dispatch]);

  const handleRowSelect = (rowData) => {};

  const handleRowDeselect = () => {};

  const handleSearch = (type, e) => {
    if (e) {
      e.preventDefault();
    }
    setSelectedSearch(type);
    const now = new Date();
    let firstDay;
    let lastDay;
    switch (type) {
      case "TODAY":
        firstDay = new Date(now.setHours(0, 0, 0, 0));
        lastDay = new Date(now.setHours(23, 59, 59, 999));
        dispatch(
          getPayrollBySearch(
            `search?teacherId=${selectedTeacher}&searchDateStart=${firstDay}&searchDateEnd=${lastDay}`
          )
        );
        break;
      case "MONTH":
        firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        dispatch(
          getPayrollBySearch(
            `search?teacherId=${selectedTeacher}&searchDateStart=${firstDay}&searchDateEnd=${lastDay}`
          )
        );
        break;
      case "YEAR":
        firstDay = new Date(now.getFullYear(), 0, 1);
        lastDay = new Date(now.getFullYear(), 11, 31);
        dispatch(
          getPayrollBySearch(
            `search?teacherId=${selectedTeacher}&searchDateStart=${firstDay}&searchDateEnd=${lastDay}`
          )
        );
        break;
      case "CUSTOM":
        if (
          searchParams.searchDateStart !== "" &&
          searchParams.searchDateEnd !== ""
        ) {
          dispatch(
            getPayrollBySearch(
              `search?teacherId=${selectedTeacher}&searchDateStart=${searchParams.searchDateStart}&searchDateEnd=${searchParams.searchDateEnd}`
            )
          );
          setOpenFilter(false);
        }
        break;
      default:
        if (
          searchParams.searchDateStart !== "" &&
          searchParams.searchDateEnd !== ""
        ) {
          dispatch(
            getPayrollBySearch(
              `search?teacherId=${selectedTeacher}&searchDateStart=${searchParams.searchDateStart}&searchDateEnd=${searchParams.searchDateEnd}`
            )
          );
          setOpenFilter(false);
        }
        break;
    }
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
        <div className="p-4 w-screen md:0 mt-48">
          <div className=" bg-main-bg rounded-lg shadow-lg p-4 mt-10">
            <div className="mb-5 flex justify-between md:flex-row flex-col overflow-auto md:p-0 p-2">
              <div className="flex mb-2">
                <h1 className="text-2xl font-extrabold">
                  {" "}
                  Payroll for {thisTeacher.firstName} {thisTeacher.lastName}{" "}
                </h1>
                <TooltipComponent content="Menu" position="BottomCenter">
                  <button
                    type="button"
                    onClick={() => {
                      setActivePayroll((prev) => !prev);
                    }}
                    className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block"
                  >
                    <MdOutlineCancel />
                  </button>
                </TooltipComponent>
              </div>

              <div className="flex md:flex-row flex-col overflow-auto md:p-0">
                <div className="flex gap-5 text-white">
                  <button
                    style={{
                      backgroundColor:
                        selectedSearch == "TODAY"
                          ? currentColor
                          : `${currentColor}7A`,
                    }}
                    class={`font-bold py-2 px-4 rounded inline-flex items-center`}
                    onClick={() => handleSearch("TODAY")}
                  >
                    Today
                  </button>

                  <button
                    style={{
                      backgroundColor:
                        selectedSearch == "MONTH"
                          ? currentColor
                          : `${currentColor}7A`,
                    }}
                    class=" bg-gray-300 hover:bg-gray-400 font-bold py-2 px-4 rounded inline-flex items-center"
                    onClick={() => handleSearch("MONTH")}
                  >
                    This Month
                  </button>

                  <button
                    style={{
                      backgroundColor:
                        selectedSearch == "YEAR"
                          ? currentColor
                          : `${currentColor}7A`,
                    }}
                    class=" bg-gray-300 hover:bg-gray-400  font-bold py-2 px-4 rounded inline-flex items-center"
                    onClick={() => handleSearch("YEAR")}
                  >
                    This Year
                  </button>

                  <button
                    style={{
                      backgroundColor:
                        selectedSearch == "CUSTOM"
                          ? currentColor
                          : `${currentColor}7A`,
                    }}
                    class=" bg-gray-300 hover:bg-gray-400 font-bold py-2 px-4 rounded inline-flex items-center"
                    onClick={() => setOpenFilter(true)}
                  >
                    Custom
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div className="md:grid grid-cols-7 gap-5 flex flex-col">
                <div className="shadow-lg col-span-3">
                  <AccumulationChartComponent
                    legendSettings={{ visible: true }}
                  >
                    <Inject services={[AccumulationLegend]} />
                    <AccumulationSeriesCollectionDirective>
                      <AccumulationSeriesDirective
                        dataSource={pieChartData}
                        xName="x"
                        yName="y"
                        innerRadius="40%"
                        dataLabel={{
                          visible: true,
                          name: "text",
                          position: "Outside",
                        }}
                      ></AccumulationSeriesDirective>
                    </AccumulationSeriesCollectionDirective>
                  </AccumulationChartComponent>
                </div>

                <div className="col-span-4 col-start-4">
                  <GridComponent
                    dataSource={payRollGridData}
                    allowPaging
                    allowSorting
                    rowSelected={(rowData) => handleRowSelect(rowData)}
                    rowDeselected={() => handleRowDeselect()}
                  >
                    <ColumnsDirective>
                      {classPayrollGrid.map((item, index) => (
                        <ColumnDirective key={index} {...item} />
                      ))}
                    </ColumnsDirective>
                    <Inject
                      services={[
                        Selection,
                        Edit,
                        Sort,
                        ContextMenu,
                        Page,
                        Sort,
                      ]}
                    />
                  </GridComponent>
                </div>
              </div>

              <div className="md:grid grid-cols-4 gap-8 flex flex-col">
                <div className="col-start-1 col-span-1 shadow-lg bg-white mt-5 p-4">
                  <div>
                    <div className="mb-3 text-xl font-semibold">
                      <h2> Earnings </h2>
                    </div>
                    <div className="mb-3 flex justify-between text-xl">
                      <div style={{ color: "red" }}>
                        <MdAttachMoney />
                      </div>
                      <div className="text-lg">
                        {payRollData.income
                          ? `$${payRollData?.income}`
                          : "No Records"}
                      </div>
                    </div>

                    <div className="mb-3 flex justify-between text-xl">
                      <div style={{ color: "red" }}>
                        <MdTimer />
                      </div>
                      <div className="text-lg">
                        {payRollData.numberOfHours
                          ? `${payRollData.numberOfHours} hours`
                          : "No Records"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-start-2 col-span-1 shadow-lg bg-white mt-5 p-4">
                  <div>
                    <div className="mb-3 text-xl font-semibold">
                      <h2> Classes </h2>
                    </div>
                    <div className="mb-3 flex justify-between text-xl">
                      <div style={{ color: "red" }}>
                        <MdOutlineMenuBook />
                      </div>
                      <div className="text-lg">
                        {payRollData.numberOfClasses
                          ? `${payRollData?.numberOfClasses} Groups`
                          : "No Records"}
                      </div>
                    </div>

                    <div className="mb-3 flex justify-between text-xl">
                      <div style={{ color: "red" }}>
                        <MdOutlineCancelPresentation />
                      </div>
                      <div className="text-lg">
                        {payRollData.numberOfSessionsCancelledByClient ||
                        payRollData.numberOfSessionsCancelledByTeacher
                          ? `${
                              payRollData?.numberOfSessionsCancelledByClient +
                              payRollData?.numberOfSessionsCancelledByTeacher
                            } Cancelled`
                          : "No records"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-start-3 col-span-1 shadow-lg bg-white mt-5 p-4">
                  <div>
                    <div className="mb-3 text-xl font-semibold">
                      <h2> Students </h2>
                    </div>
                    <div className="mb-3 flex justify-between text-xl">
                      <div style={{ color: "red" }}>
                        <MdOutlinePeopleAlt />
                      </div>
                      <div className="text-lg">
                        {payRollData.numberOfStudents
                          ? `${payRollData?.numberOfStudents} Students`
                          : "No Records"}
                      </div>
                    </div>

                    <div className="mb-3 flex justify-between text-xl ">
                      <div style={{ color: "red" }}>
                        <MdLeaderboard />
                      </div>
                      <div className="text-lg">
                        {payRollData.levelsTaught
                          ? payRollData?.levelsTaught
                          : "No Records"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-start-4 col-span-1 shadow-lg bg-white mt-5 p-4">
                  <div>
                    <div className="mb-3 text-xl font-semibold">
                      <h2> Attendance </h2>
                    </div>
                    <div className="mb-3 flex justify-between text-xl">
                      <div style={{ color: "red" }}>
                        <MdGridView />
                      </div>
                      <div className="text-lg">
                        {payRollData?.averageAttendance
                          ? `${payRollData?.averageAttendance}% Attendance`
                          : "No Records"}
                      </div>
                    </div>

                    <div className="mb-3 flex justify-between text-xl">
                      <div style={{ color: "red" }}>
                        <MdOutlineDoneOutline />
                      </div>
                      <div className="text-lg">
                        {payRollData?.numberOfFullAttendance
                          ? `${payRollData?.numberOfFullAttendance} Full Classes`
                          : "No Records"}
                      </div>
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
            {openFilter && (
              <PayRollFilter
                setOpenFilter={setOpenFilter}
                currentColor={currentColor}
                handleSearch={handleSearch}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default PayrollComp;
