import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers } from "../../../../api";
import { getTeachers } from "../../../../redux/actions/teachers";

const GradeCard = ({
  date,
  average,
  percentage,
  id,
  handleSelectGrade,
  index,
  currentIndex,
  currentColor,
}) => {
  return (
    <div className="inline-block p-3 mb-4">
      <button
        className={`text-left ${
          index === currentIndex
            ? "bg-gray-200 shadow-[inset_0_0px_2px_rgba(0,0,0,0.5)]"
            : "bg-gray-200 hover:bg-gray-300 hover:shadow-xl"
        } rounded-lg p-3 `}
        style={{ backgroundColor: currentColor + "40" }}
        onClick={(e) => handleSelectGrade(id, index, e)}
      >
        <div className="grid grid-cols-2 text-right">
          <div className="col-span-1">
            <h1 className="text-lg font-semibold"> Date Submitted: </h1>
            <h2 className="text-md font-medium"> Average: </h2>
            <h2 className="text-md font-medium"> Exam Percentage: </h2>
          </div>

          <div className="col-start-2 text-right">
            <h1 className="text-lg font-semibold"> {date.slice(0, 10)} </h1>
            <h2 className="text-md font-medium"> {average} </h2>
            <h2 className="text-md font-medium"> {percentage + "%"} </h2>
          </div>
        </div>
      </button>
    </div>
  );
};

export default GradeCard;
