import React, { useEffect } from "react";
import {
  MdClass,
  MdOutlinePersonOutline,
  MdAttachMoney,
  MdCancel,
} from "react-icons/md";
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
  ColumnDirective,
} from "@syncfusion/ej2-react-grids";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  AccumulationLegend,
} from "@syncfusion/ej2-react-charts";
import { classGrid, overviewGrid } from "../../../data/gridHeaders";
import { useDispatch, useSelector } from "react-redux";
import { getAdminTodayOverview } from "../../../redux/actions/financials";

const Overview = () => {
  const now = new Date();
  const dispatch = useDispatch();
  let firstDay = new Date(now.setHours(0, 0, 0, 0));
  let lastDay = new Date(now.setHours(23, 59, 59, 999));

  const overviewData = useSelector((state) => state.financials.overview);
  const pieChartData = [
    { x: "Attended", y: overviewData.averageAttendance, text: "Attended" },
    {
      x: "Hasn't Attended",
      y: 100 - overviewData.averageAttendance,
      text: "Hasn't Attended",
    },
  ];
  const pieChartPallete = ["#FF5B33", "#FFC133"];
  useEffect(() => {
    dispatch(
      getAdminTodayOverview(
        `overviewAdmin?searchDateStart=${firstDay}&searchDateEnd=${lastDay}`
      )
    );
  }, []);

  return (
    <div className="p-4 md:mt-0 mt-10">
      <div className=" bg-main-bg rounded-lg shadow-lg p-4">
        <div className="flex flex-col justify-between mb-5">
          <h1 className="text-3xl font-semibold"> Overview - Today </h1>
        </div>

        <div className="md:grid grid-cols-4 gap-10 flex flex-col">
          <div className="shadow-lg bg-blue-400 p-8 rounded-sm">
            <div className="flex justify-between">
              <h2 className="text-4xl font-bold mb-4">
                {" "}
                {overviewData.classesToday ? overviewData.classesToday : 0}{" "}
              </h2>
              <div className="text-5xl" style={{ color: "white" }}>
                <MdClass />
              </div>
            </div>

            <h3 className="font-semibold text-lg"> Classes Today </h3>
          </div>

          <div className="shadow-lg bg-red-400 p-8 rounded-sm">
            <div className="flex justify-between">
              <h2 className="text-4xl font-bold mb-4">
                {" "}
                {overviewData.cancelledClasses
                  ? overviewData.cancelledClasses
                  : 0}{" "}
              </h2>
              <div className="text-5xl" style={{ color: "white" }}>
                <MdCancel />
              </div>
            </div>

            <h3 className="font-semibold text-lg"> Cancelled Classes </h3>
          </div>

          <div className="shadow-lg bg-yellow-400 p-8 rounded-sm">
            <div className="flex justify-between">
              <h2 className="text-4xl font-bold mb-4">
                {" "}
                {overviewData.studentsAttending
                  ? overviewData.studentsAttending
                  : 0}{" "}
              </h2>
              <div className="text-5xl" style={{ color: "white" }}>
                <MdOutlinePersonOutline />
              </div>
            </div>

            <h3 className="font-semibold text-lg"> Students attending </h3>
          </div>

          <div className="shadow-lg bg-green-400 p-8 rounded-sm">
            <div className="flex justify-between">
              <h2 className="text-4xl font-bold mb-4">
                {" "}
                ${overviewData.profit ? overviewData.profit : 0}{" "}
              </h2>
              <div className="text-5xl" style={{ color: "white" }}>
                <MdAttachMoney />
              </div>
            </div>

            <h3 className="font-semibold text-lg"> Expected Income Today </h3>
          </div>
        </div>

        <div className="md:grid flex flex-col grid-cols-10 mt-10 gap-10">
          <div className="col-start-1 col-span-5">
            <h2 className="mb-2 font-medium text-lg"> Today's Classes </h2>
            <GridComponent
              selectedRowIndex={0}
              dataSource={overviewData.overviewGridData}
              rowSelected={(rowData) => handleRowSelect(rowData)}
              rowDeselected={() => handleRowDeselect()}
            >
              <ColumnsDirective>
                {overviewGrid.map((item, index) => (
                  <ColumnDirective key={index} {...item} />
                ))}
              </ColumnsDirective>
              <Inject services={[Selection, Edit, Sort, ContextMenu]} />
            </GridComponent>
          </div>

          <div className="shadow-lg col-start-6 col-span-5 w-full">
            <h2 className="mb-2 font-medium text-lg"> Today's Attendance </h2>
            <AccumulationChartComponent
              legendSettings={{ visible: true }}
              width={"100%"}
            >
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
  );
};

export default Overview;
