import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import AttendanceCard from "./AttendanceCard";
import AttendanceEdit from "./AttendanceEdit";
import AttendanceSearch from "./AttendanceSearch";
import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AttendanceCards = ({
  byAccount,
  setByAccount,
  openWindow,
  setOpenWindow,
  searchParams,
  setSearchParams,
  searchPost,
  page,
  sessions,
  classes,
  numberOfPages,
}) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState("");

  const currentColor = useSelector((state) => state.appState.currentColor);

  const handleClick = (e, sessionId) => {
    e.preventDefault();
    setCurrentSessionId(sessionId);
    setOpenWindow(true);
  };

  const handleCheckBox = (e) => {
    setByAccount(e.target.checked);
  };

  return (
    <div>
      <div className="md:grid grid-cols-4 p-5 gap-3 flex flex-col">
        {sessions &&
          sessions.map((session) => {
            const singleClass = classes.filter(
              (singleClass) => singleClass._id === session.classRootId
            );
            return (
              <React.Fragment key={session._id}>
                <AttendanceCard
                  key={session._id}
                  singleClass={singleClass[0]}
                  session={session}
                  handleClick={handleClick}
                />
              </React.Fragment>
            );
          })}
      </div>

      <div className="rounded-lg shadow-lg p-4 mt-5 bg-gray-200">
        <Pagination
          count={numberOfPages}
          page={Number(page) || 1}
          variant="outlined"
          renderItem={(item) => (
            <PaginationItem
              {...item}
              component={Link}
              to={`/main/attendance?page=${item.page}`}
            />
          )}
        />
      </div>

      <AnimatePresence
        intial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {openWindow && (
          <AttendanceEdit
            setOpenWindow={setOpenWindow}
            currentSessionId={currentSessionId}
          />
        )}

        {openFilter && (
          <AttendanceSearch
            setOpenFilter={setOpenFilter}
            searchPost={searchPost}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AttendanceCards;
