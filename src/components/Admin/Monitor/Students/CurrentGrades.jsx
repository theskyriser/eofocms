import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const CurrentGrades = ({ selectedGrade, latestGradeId, setSelectedGrade }) => {
  const [grade, setGrade] = useState({});
  const grades = useSelector((state) => state.grades.grades);

  useEffect(() => {
    if (selectedGrade) {
      setGrade(grades.filter((grade) => grade._id === selectedGrade)[0]);
    } else {
      setGrade(grades.filter((grade) => grade._id === latestGradeId)[0]);
      setSelectedGrade(latestGradeId);
    }
  }, [selectedGrade]);

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-1 mb-3">
        <h1 className="text-3xl font-semibold"> Current Grades </h1>
      </div>

      <div className="col-span-1 mb-3 col-start-4">
        <h1 className="text-3xl font-semibold">
          {" "}
          Current Average: {grade?.average}{" "}
        </h1>
      </div>

      <div className="col-span-1 col-start-1">
        <h1 className="text-2xl font-semibold"> Writing: {grade?.writing} </h1>
      </div>

      <div className="col-span-1 col-start-2">
        <h1 className="text-2xl font-semibold"> Reading: {grade?.reading} </h1>
      </div>

      <div className="col-span-1 col-start-3">
        <h1 className="text-2xl font-semibold">
          {" "}
          Listening: {grade?.listening}{" "}
        </h1>
      </div>

      <div className="col-span-1 col-start-4">
        <h1 className="text-2xl font-semibold">
          {" "}
          Speaking: {grade?.speaking}{" "}
        </h1>
      </div>

      <div className="col-span-2 col-start-1">
        <h4 className="mb-1.5 text-xl font-medium">
          {" "}
          Excellence: {grade?.excellence}{" "}
        </h4>
        <p className="text-md"> </p>
      </div>

      <div className="col-span-2 col-start-3">
        <h4 className="mb-1.5 text-xl font-medium">
          {" "}
          Improvements: {grade?.improvements}{" "}
        </h4>
        <p className="text-md"> </p>
      </div>
    </div>
  );
};

export default CurrentGrades;
