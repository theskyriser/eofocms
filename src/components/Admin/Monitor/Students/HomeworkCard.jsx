import React from "react";

const HomeworkCard = ({
  dueDate,
  dateSet,
  completed,
  handleSelectHomework,
  index,
  currentIndex,
  currentColor,
  id,
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
        onClick={(e) => handleSelectHomework(id, index, e)}
      >
        <div className="grid grid-cols-2 text-right">
          <div className="col-span-1">
            <h1 className="text-lg font-semibold"> Date Set: </h1>
            <h2 className="text-md font-medium"> Due Date: </h2>
            <h2 className="text-md font-medium"> Completed: </h2>
          </div>

          <div className="col-start-2 text-left ml-2">
            <h1 className="text-lg font-semibold"> {dateSet?.slice(0, 10)} </h1>
            <h2 className="text-md font-medium"> {dueDate?.slice(0, 10)} </h2>
            <h2 className="text-md font-medium"> {completed?.slice(0, 10)} </h2>
          </div>
        </div>
      </button>
    </div>
  );
};

export default HomeworkCard;
