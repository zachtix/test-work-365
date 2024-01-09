import React, { useState, useEffect } from "react";
import axios from "axios";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
import "./scss/style.scss";

const App = () => {
  const [data, setData] = useState([]);
  const [chart, setChart] = useState("line");

  //Data Line Chart
  const [totalTests, setTotalTests] = useState([]);
  const [totalPUI, setTotalPUI] = useState([]);
  const [timeLabels, setTimeLabels] = useState([]);
  const labelsLineChart = [
    "จำนวนการตรวจหาเชื้อ (สะสม)",
    "จำนวนผู้ติดเชื้อ (สะสม)",
  ];

  //Data Pie Chart
  const [dataPie, setDataPie] = useState([
    { value: 0, name: "ผู้ป่วยยืนยัน (สะสม)" },
    { value: 0, name: "จำนวนผู้หายป่วย (สะสม)" },
    { value: 0, name: "จำนวนผู้ป่วยอยู่ระหว่างการรักษา (ปัจจุบัน)" },
    { value: 0, name: "จำนวนผู้เสียชีวิต (สะสม)" },
  ]);
  const labelsPieChart = [
    "ผู้ป่วยยืนยัน (สะสม)",
    "จำนวนผู้หายป่วย (สะสม)",
    "จำนวนผู้ป่วยอยู่ระหว่างการรักษา (ปัจจุบัน)",
    "จำนวนผู้เสียชีวิต (สะสม)",
  ];

  //Data Bar Chart
  const [totalScreening, setTotalScreening] = useState([0, 0, 0, 0, 0]);
  const labelsBarChart = [
    "จำนวนผู้เดินทางคัดกรอง (สะสม)",
    "จำนวนผู้เดินทางคัดกรองสะสมทางเรือ (สะสม)",
    "จำนวนคัดกรองผู้เดินทางผ่านด่านพรมแดนทางบก (สะสม)",
    "จำนวนคัดกรองที่สำนักงานตรวจคนเข้าเมือง (สะสม)",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/covid19"
        );
        setData(response.data.results);
        setTotalTests([]);
        setTotalPUI([]);
        setTimeLabels([]);
        setDataPie([
          { value: 0, name: "ผู้ป่วยยืนยัน (สะสม)" },
          { value: 0, name: "จำนวนผู้หายป่วย (สะสม)" },
          { value: 0, name: "จำนวนผู้ป่วยอยู่ระหว่างการรักษา (ปัจจุบัน)" },
          { value: 0, name: "จำนวนผู้เสียชีวิต (สะสม)" },
        ]);
        setTotalScreening([0, 0, 0, 0, 0]);
        response.data.results.forEach((element) => {
          setTotalTests((prev) => [element.totalTests, ...prev]);
          setTotalPUI((prev) => [element.totalPUI, ...prev]);
          setTimeLabels((prev) => [element.publishdate, ...prev]);
          setDataPie((prevDataPie) => [
            {
              value: prevDataPie[0].value > element.totalCases? prevDataPie[0].value : element.totalCases,
              name: "ผู้ป่วยยืนยัน (สะสม)",
            },
            {
              value: prevDataPie[1].value > element.totalRecovered? prevDataPie[1].value : element.totalRecovered,
              name: "จำนวนผู้หายป่วย (สะสม)",
            },
            {
              value: prevDataPie[2].value > element.currentlyInfectedPatients? prevDataPie[2].value : element.currentlyInfectedPatients,
              name: "จำนวนผู้ป่วยอยู่ระหว่างการรักษา (ปัจจุบัน)",
            },
            {
              value: prevDataPie[3].value > element.totalDeaths? prevDataPie[3].value : element.totalDeaths,
              name: "จำนวนผู้เสียชีวิต (สะสม)",
            },
          ]);
          setTotalScreening((prevTotalScreening) => [
            prevTotalScreening[0] < element.totalScreeningAirlinePassengers ? element.totalScreeningAirlinePassengers:prevTotalScreening[0],
            prevTotalScreening[1] < element.totalScreeningShipPassengers ? element.totalScreeningShipPassengers:prevTotalScreening[1],
            prevTotalScreening[2] < element.totalScreeningBorder ? element.totalScreeningBorder:prevTotalScreening[2],
            prevTotalScreening[3] < element.totalScreeningImmigration ? element.totalScreeningImmigration:prevTotalScreening[3]
          ]);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const showChart = () => {
    if (chart === "line") {
      return (
        <LineChart
          data1={totalTests}
          data2={totalPUI}
          timeLabels={timeLabels}
          labels={labelsLineChart}
        />
      );
    } else if (chart === "pie") {
      return <PieChart data={dataPie} labels={labelsPieChart} />;
    } else if (chart === "bar") {
      return <BarChart data={totalScreening} labels={labelsBarChart} />;
    }
  };

  const handleChangeChart = (e) => {
    setChart(e.target.value);
  };

  return (
    <div className="container">
      <div className="heading">
        <h1>Dashboard Covid-19</h1>
      </div>
      <div className="content">
        <div className="nav">
          <button onClick={handleChangeChart} value="line">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
            >
              <path
                d="M2.3902 2.30377V19.3999C2.3902 21.0693 3.73778 22.4169 5.40717 22.4169H22.5033"
                stroke="#8B8C91"
                stroke-width="1.50848"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.4071 17.3887L10.0231 11.9984C10.7874 11.1134 12.145 11.053 12.9696 11.8877L13.925 12.8431C14.7496 13.6677 16.1073 13.6174 16.8716 12.7325L21.4976 7.33209"
                stroke="#8B8C91"
                stroke-width="1.50848"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Line
          </button>
          <button onClick={handleChangeChart} value="pie">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
            >
              <path
                d="M18.4237 12.8126C21.0384 12.8126 22.1245 11.8069 21.1591 8.5084C20.5054 6.2859 18.5946 4.37515 16.3721 3.72147C13.0736 2.75604 12.0679 3.84215 12.0679 6.45686V9.35315C12.0679 11.8069 13.0736 12.8126 15.0849 12.8126H18.4237Z"
                stroke="#8B8C91"
                stroke-width="1.50848"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.1131 15.5278C19.1778 20.184 14.7127 23.563 9.63416 22.7384C5.82273 22.1249 2.75548 19.0577 2.13197 15.2462C1.31739 10.1878 4.67628 5.72266 9.31235 4.77734"
                stroke="#8B8C91"
                stroke-width="1.50848"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Pie
          </button>
          <button onClick={handleChangeChart} value="bar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
            >
              <path
                d="M9.42979 22.9648H15.4637C20.492 22.9648 22.5033 20.9535 22.5033 15.9252V9.89128C22.5033 4.863 20.492 2.85168 15.4637 2.85168H9.42979C4.40151 2.85168 2.3902 4.863 2.3902 9.89128V15.9252C2.3902 20.9535 4.40151 22.9648 9.42979 22.9648Z"
                stroke="#8B8C91"
                stroke-width="1.50848"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.9665 19.4449C17.0727 19.4449 17.9778 18.5398 17.9778 17.4336V8.38271C17.9778 7.27649 17.0727 6.3714 15.9665 6.3714C14.8603 6.3714 13.9552 7.27649 13.9552 8.38271V17.4336C13.9552 18.5398 14.8502 19.4449 15.9665 19.4449Z"
                stroke="#8B8C91"
                stroke-width="1.50848"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.92696 19.445C10.0332 19.445 10.9383 18.5399 10.9383 17.4337V13.9139C10.9383 12.8077 10.0332 11.9026 8.92696 11.9026C7.82074 11.9026 6.91565 12.8077 6.91565 13.9139V17.4337C6.91565 18.5399 7.81068 19.445 8.92696 19.445Z"
                stroke="#8B8C91"
                stroke-width="1.50848"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Bar
          </button>
        </div>
        <div className="chart">
          <div className="chartBox">{showChart()}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
