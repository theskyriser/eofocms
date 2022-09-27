import React, { useState, useEffect } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-grids";
import { studentGrid } from "../../../../../data/gridHeaders";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { MdOutlineCancel } from "react-icons/md";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { motion } from "framer-motion";
import Backdrop from "../../../../Backdrop";
import { getStudents } from "../../../../../redux/actions/students";

const AddStudents = ({
  setAddStudents,
  handleStudentsSubmit,
  currentColor,
}) => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students);
  const [currentId, setCurrentId] = useState(undefined);

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

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
    if (rowData.data) {
      setCurrentId(rowData.data._id);
    }
  };

  const handleRowDeselect = () => {
    setCurrentId(undefined);
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
              <h1 className="text-2xl"> Add Students</h1>

              <TooltipComponent content="Menu" position="BottomCenter">
                <button
                  type="button"
                  onClick={() => {
                    setAddStudents((prev) => !prev);
                  }}
                  className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block"
                >
                  <MdOutlineCancel />
                </button>
              </TooltipComponent>
            </div>
            <form
              onSubmit={(e) => {
                handleStudentsSubmit(e, currentId);
              }}
            >
              <div className="grid grid-cols-5 gap-2">
                <div className="col-start-1 col-span-5">
                  <GridComponent
                    id="gridcomp"
                    allowPaging
                    allowSorting
                    dataSource={students}
                    rowSelected={(rowData) => handleRowSelect(rowData)}
                    rowDeselected={() => handleRowDeselect()}
                  >
                    <ColumnsDirective>
                      {studentGrid.map((item, index) => (
                        <ColumnDirective key={index} {...item} />
                      ))}
                    </ColumnsDirective>
                  </GridComponent>
                </div>

                <div className="col-start-1 col-span-2 md:col-span-1 mt-2">
                  <button
                    type="submit"
                    class="py-2 px-4 rounded-md flex justify-between w-full hover:shadow-md"
                    style={{ backgroundColor: currentColor, color: "white" }}
                  >
                    <p className="font-semibold">Add Student</p>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default AddStudents;
