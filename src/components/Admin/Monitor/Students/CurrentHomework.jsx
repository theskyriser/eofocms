import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MdInfoOutline, MdOutlineCancel } from "react-icons/md";

const CurrentHomework = ({
  selectedHomework,
  latestHomeworkId,
  currentColor,
  handleComplete,
  handleDelete,
  setSelectedHomework,
}) => {
  const [homework, setHomework] = useState({});
  const homeworks = useSelector((state) => state.homework.homeworks);

  useEffect(() => {
    if (selectedHomework) {
      setHomework(
        homeworks.filter((homework) => homework._id === selectedHomework)[0]
      );
    } else {
      setHomework(
        homeworks.filter((homework) => homework._id === latestHomeworkId)[0]
      );
      setSelectedHomework(latestHomeworkId);
    }
  }, [selectedHomework]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="text-lg font-medium">
        {homework?.completed === "NOT COMPLETE" ? (
          <h1 className="mb-4">
            {" "}
            Due date: {homework?.deadline?.slice(0, 10)}{" "}
          </h1>
        ) : (
          <h1 className="mb-4">
            {" "}
            Completed: {homework?.completed?.slice(0, 10)}{" "}
          </h1>
        )}
      </div>

      <div className="text-lg font-medium">
        <h1 className="mb-4"> Description: {homework?.description}</h1>
      </div>

      <div>
        {homework?.completed === "NOT COMPLETE" ? (
          <button
            className="py-2 px-4 rounded-md flex justify-between hover:shadow-md"
            onClick={() => handleComplete("COMPLETE", homework._id, homework)}
            style={{ backgroundColor: currentColor, color: "white" }}
          >
            <p className="font-semibold"> Mark as Complete </p>
            <div className="text-2xl ml-3">
              <MdInfoOutline />
            </div>
          </button>
        ) : (
          <button
            className="py-2 px-4 rounded-md flex justify-between hover:shadow-md"
            onClick={() => handleComplete("UNCOMPLETE", homework._id, homework)}
            style={{ backgroundColor: currentColor, color: "white" }}
          >
            <p className="font-semibold"> Mark as Incomplete </p>
            <div className="text-2xl ml-3">
              <MdInfoOutline />
            </div>
          </button>
        )}
      </div>

      <div>
        <button
          className="py-2 px-4 rounded-md flex justify-between hover:shadow-md"
          onClick={() => handleDelete(homework._id)}
          style={{ backgroundColor: currentColor, color: "white" }}
        >
          <p className="font-semibold"> Delete Homework </p>
          <div className="text-2xl ml-3">
            <MdInfoOutline />
          </div>
        </button>
      </div>
    </div>
  );
};

export default CurrentHomework;
