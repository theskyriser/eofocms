import React, { useEffect, useState } from "react";
import {
  MdAttachMoney,
  MdOutlineMoneyOffCsred,
  MdOutlineMonetizationOn,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import FinancialFilter from "../../../components/Admin/Financials/FinancialFilter";

import {
  AccumulationChartComponent,
  Legend,
  Inject,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationDataLabel,
  ColumnSeries,
  Tooltip,
  DataLabel,
  Category,
  AccumulationLegend,
  ChartComponent,
  LineSeries,
  DateTime,
  SeriesCollectionDirective,
  SeriesDirective,
} from "@syncfusion/ej2-react-charts";
import {
  lineCustomSeries,
  areaPrimaryXAxis,
  areaPrimaryYAxis,
} from "../../../data/dummy";
import { getFinancialsByDate } from "../../../redux/actions/financials";

const Center = () => {
  const dispatch = useDispatch();
  const currentColor = useSelector((state) => state.appState.currentColor);
  const [selectedSearch, setSelectedSearch] = useState("MONTH");
  const [openFilter, setOpenFilter] = useState(false);
  const [searchParams, setSearchParams] = useState({
    searchDateStart: "",
    searchDateEnd: "",
  });

  const financialData = useSelector((state) => state.financials.financials);
  console.log(financialData);
  const barChartData = financialData.financialChartData;
  const lineChartData = financialData.profitChartData;
  let barChartCustomSeries;
  if (barChartData) {
    barChartCustomSeries = [
      {
        dataSource: barChartData[0],
        xName: "x",
        yName: "y",
        name: "Incoming",
        type: "Column",
        background: "blue",
      },

      {
        dataSource: barChartData[1],
        xName: "x",
        yName: "y",
        name: "Outgoing",
        type: "Column",
        background: "red",
      },
    ];
  }

  const pieChartData = [
    { x: "Attendance", y: financialData.averageAttendance, text: "Attendance" },
    {
      x: "Not Attending",
      y: 100 - financialData.averageAttendance,
      text: "Not Present",
    },
  ];

  const pieChartPallete = ["#FF5B33", "#FFC133"];

  const barChartPallete = ["#1ED823", "#D8231E"];

  useEffect(() => {
    handleSearch("MONTH");
  }, []);

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
          getFinancialsByDate(
            `search?searchDateStart=${firstDay}&searchDateEnd=${lastDay}&type=TODAY`
          )
        );
        break;
      case "MONTH":
        firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        dispatch(
          getFinancialsByDate(
            `search?searchDateStart=${firstDay}&searchDateEnd=${lastDay}`
          )
        );
        break;
      case "YEAR":
        firstDay = new Date(now.getFullYear(), 0, 1);
        lastDay = new Date(now.getFullYear(), 11, 31);
        dispatch(
          getFinancialsByDate(
            `search?searchDateStart=${firstDay}&searchDateEnd=${lastDay}`
          )
        );
        break;
      case "CUSTOM":
        if (
          searchParams.searchDateStart !== "" &&
          searchParams.searchDateEnd !== ""
        ) {
          dispatch(
            getFinancialsByDate(
              `search?searchDateStart=${firstDay}&searchDateEnd=${lastDay}`
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
            getFinancialsByDate(
              `search?searchDateStart=${firstDay}&searchDateEnd=${lastDay}`
            )
          );
          setOpenFilter(false);
        }
        break;
    }
  };

  return (
    <div className="p-4 md:mt-0 mt-10">
      <div className="bg-main-bg rounded-lg shadow-lg p-4">
        <div className="mb-5 flex justify-between md:flex-row flex-col">
          <h1 className="text-2xl font-bold"> Financial Center </h1>
          <div className="flex">
            <div className="flex gap-5 overflow-auto mt-4 md:p-0 p-2 text-white">
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
          <div className="md:grid grid-cols-2 gap-4 flex flex-col">
            <div className="md:grid grid-cols-3 gap-4 flex flex-col">
              <div className="shadow-lg bg-blue-400 p-8 rounded-sm">
                <div className="flex justify-between">
                  <h2 className="text-4xl font-bold mb-4">
                    {" "}
                    {`$${
                      financialData.incoming ? financialData.incoming : 0
                    }`}{" "}
                  </h2>
                  <div className="text-5xl" style={{ color: "white" }}>
                    <MdOutlineMonetizationOn />
                  </div>
                </div>
                <h3 className="font-semibold text-lg"> Incoming </h3>
              </div>

              <div className="shadow-lg bg-red-400 p-8 rounded-sm">
                <div className="flex justify-between">
                  <h2 className="text-4xl font-bold mb-4">
                    {" "}
                    {`$${
                      financialData.outgoing ? financialData.outgoing : 0
                    }`}{" "}
                  </h2>
                  <div className="text-5xl" style={{ color: "white" }}>
                    <MdOutlineMoneyOffCsred />
                  </div>
                </div>

                <h3 className="font-semibold text-lg"> Expenses </h3>
              </div>

              <div className="shadow-lg bg-green-400 p-8 rounded-sm">
                <div className="flex justify-between">
                  <h2 className="text-4xl font-bold mb-4">
                    {" "}
                    {`$${financialData.profit ? financialData.profit : 0}`}{" "}
                  </h2>
                  <div className="text-5xl" style={{ color: "white" }}>
                    <MdAttachMoney />
                  </div>
                </div>

                <h3 className="font-semibold text-lg"> Projected Profit</h3>
              </div>

              <div className="col-span-3 w=full bg-white shadow-md p-6">
                <h1 className="font-bold"> Incoming Details </h1>

                <div className="ml-5 mt-2">
                  <h2 className="font-semibold"> Session Prices: </h2>
                  <div className="ml-3 mt-2">
                    {Object.keys(financialData).length !== 0 ? (
                      financialData?.sessionPricesPerStudent.map(
                        (item, index) => (
                          <div className="flex justify-between mx-10 my-2">
                            <h3> Price at {item.sessionPrice} per Hour: </h3>
                            <h3>
                              {" "}
                              {`${item.numberOfSessions} sessions`} |{" "}
                              {`${item.numberOfStudents} students`} |{" "}
                              {`$${item.total}`}{" "}
                            </h3>
                          </div>
                        )
                      )
                    ) : (
                      <div> No Record </div>
                    )}
                  </div>
                </div>

                <div className="ml-5 mt-2">
                  <h2 className="font-semibold"> Demographics: </h2>
                  <div className="ml-3 mt-2">
                    <div className="flex justify-between mx-10 my-2">
                      <h3> Total Number of Sessions Completed: </h3>
                      <h3> {financialData.sessionsCompleted} Sessions </h3>
                    </div>

                    <div className="flex justify-between mx-10 my-2">
                      <h3> Average Attendance: </h3>
                      <h3> {financialData.averageAttendance}% </h3>
                    </div>

                    <div className="flex justify-between mx-10 my-2"></div>
                  </div>
                </div>

                <div className="font-semibold">
                  <h1 className="text-lg">
                    {" "}
                    Total Incoming: {financialData.incoming}
                  </h1>
                </div>
              </div>

              <div className="col-span-3 w=full bg-white shadow-md p-6">
                <h1 className="font-bold"> Outgoing Details </h1>

                <div className="ml-5 mt-2">
                  <h2 className="font-semibold"> Teacher Payments: </h2>
                  <div className="ml-3 mt-2">
                    {Object.keys(financialData).length !== 0 ? (
                      financialData?.sessionPaymentsPerTeacher.map(
                        (item, index) => (
                          <div className="flex justify-between mx-10 my-2">
                            <h3>
                              {" "}
                              Hourly Rate at {item.hourlyRate} per Hour:{" "}
                            </h3>
                            <h3>
                              {" "}
                              {`${item.numberOfSessions} sessions`} |{" "}
                              {`$${item.total}`}{" "}
                            </h3>
                          </div>
                        )
                      )
                    ) : (
                      <div> No Record </div>
                    )}
                  </div>
                </div>

                <div className="ml-5 mt-2">
                  <h2 className="font-semibold"> Classes: </h2>
                  <div className="ml-3 mt-2">
                    <div className="flex justify-between mx-10 my-2">
                      <h3> Cancelled Classes: </h3>
                      <h3>
                        {" "}
                        {financialData.cancelledClasses} Sessions | -$
                        {financialData.cancelledClassesTotal}
                      </h3>
                    </div>
                  </div>

                  <h2 className="font-semibold"> Expenses: </h2>
                  <div className="ml-3 mt-2">
                    <div className="flex justify-between mx-10 my-2">
                      <h3> Software Payments: </h3>
                      <h3> 1 Payment | -{financialData.softwarePayments}$ </h3>
                    </div>
                  </div>
                </div>

                <div className="font-semibold">
                  <h1 className="text-lg">
                    {" "}
                    Total Outgoing: {financialData.outgoing}
                  </h1>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="w-full shadow-lg">
                {financialData ? (
                  financialData.chartType === "WEEKS" ? (
                    <div>
                      <ChartComponent
                        palettes={barChartPallete}
                        id="charts"
                        title="Incoming Outgoing for month starting: "
                        primaryXAxis={{ valueType: "Category", title: "Week" }}
                      >
                        <Inject
                          services={[
                            ColumnSeries,
                            Legend,
                            Tooltip,
                            DataLabel,
                            Category,
                          ]}
                        />
                        <SeriesCollectionDirective>
                          {barChartCustomSeries.map((item, index) => (
                            <SeriesDirective key={index} {...item} />
                          ))}
                        </SeriesCollectionDirective>
                      </ChartComponent>
                    </div>
                  ) : financialData.chartType === "MONTH" ? (
                    <div>
                      <ChartComponent
                        id="charts"
                        title="Incoming Outgoing over Months"
                        primaryXAxis={{ valueType: "Category", title: "Month" }}
                      >
                        <Inject
                          services={[
                            ColumnSeries,
                            Legend,
                            Tooltip,
                            DataLabel,
                            Category,
                          ]}
                        />
                        <SeriesCollectionDirective>
                          {barChartCustomSeries.map((item, index) => (
                            <SeriesDirective key={index} {...item} />
                          ))}
                        </SeriesCollectionDirective>
                      </ChartComponent>
                    </div>
                  ) : financialData.chartType === "TODAY" ? (
                    <div>
                      <ChartComponent
                        id="charts"
                        title="Incoming Outgoing for Today"
                        primaryXAxis={{ valueType: "Category", title: "Today" }}
                      >
                        <Inject
                          services={[
                            ColumnSeries,
                            Legend,
                            Tooltip,
                            DataLabel,
                            Category,
                          ]}
                        />
                        <SeriesCollectionDirective>
                          {barChartCustomSeries.map((item, index) => (
                            <SeriesDirective key={index} {...item} />
                          ))}
                        </SeriesCollectionDirective>
                      </ChartComponent>
                    </div>
                  ) : (
                    <div> No data for chart </div>
                  )
                ) : (
                  <div> No DATA </div>
                )}
              </div>

              <div className="w-full bg-slate-300 shadow-lg">
                <AccumulationChartComponent legendSettings={{ visible: true }}>
                  <Inject services={[AccumulationLegend]} />
                  <AccumulationSeriesCollectionDirective>
                    <AccumulationSeriesDirective
                      palettes={pieChartPallete}
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
          <FinancialFilter
            setOpenFilter={setOpenFilter}
            currentColor={currentColor}
            handleSearch={handleSearch}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Center;
