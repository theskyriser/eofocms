import React, { useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-grids";

import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { MdOutlineCancel } from "react-icons/md";
import { motion } from "framer-motion";
import Backdrop from "../../../../Backdrop";
import { useSelector } from "react-redux";

const AttendanceAdd = ({ toggle, grid, type, title, handleFilterSubmit }) => {
  const teachers = useSelector((state) => state.teachers);
  const students = useSelector((state) => state.students);
  const currentColor = useSelector((state) => state.appState.currentColor);
  const [data, setData] = useState({
    currentId: "",
    firstName: "",
    lastName: "",
  });
  const [dataSource, setDataSource] = useState([]);

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

  const handleRowSelect = (rowData) => {
    setData({
      ...data,
      currentId: rowData.data._id,
      firstName: rowData.data.firstName,
      lastName: rowData.data.lastName,
    });
  };

  const handleRowDeselect = () => {
    setData({ currentId: "", firstName: "", lastName: "" });
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
              <h1 className="text-2xl"> {title} </h1>

              <TooltipComponent content="Menu" position="BottomCenter">
                <button
                  type="button"
                  className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block"
                  onClick={() => toggle((prev) => !prev)}
                >
                  <MdOutlineCancel />
                </button>
              </TooltipComponent>
            </div>

            <div className="mt-5">
              <GridComponent
                dataSource={dataSource}
                rowSelected={(rowData) => handleRowSelect(rowData)}
                rowDeselected={() => handleRowDeselect()}
              >
                <ColumnsDirective>
                  {grid.map((item, index) => (
                    <ColumnDirective key={index} {...item} />
                  ))}
                </ColumnsDirective>
              </GridComponent>
            </div>

            <div>
              <button
                type="button"
                className="text-sm p-2 border-color border-1 rounded-md hover:shadow-lg hover:bg-slate-200 w-full"
                onClick={() => handleFilterSubmit(type, data)}
              >
                {" "}
                Apply{" "}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default AttendanceAdd;
