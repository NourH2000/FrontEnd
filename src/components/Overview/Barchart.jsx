import React, { useState } from "react";
import Chart from "react-apexcharts";

const Barchart = () => {
  const [state, setstate] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          "Jan-22",
          "Fev-22",
          "Mar-22",
          "Avr-22",
          "Mai-22",
          "Jui-22",
        ],
      },
      plotOptions: {
        bar: {
          borderRadius: 13,
          columnWidth: "20%",
        },
      },
      title: {
        text: "The rate of fraud detected in the last 6 months ",
        align: "left",
        margin: 20,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: "18px",
          fontWeight: "bold",
          fontFamily: undefined,
          color: "#908f9d",
        },
      },
      dataLabels: {
        enabled: false,
      },

      legend: {
        position: "top",
        onItemClick: {
          toggleDataSeries: true,
        },
        onItemHover: {
          highlightDataSeries: true,
        },
      },
    },

    series: [
      {
        name: "PPA -FRAUD",
        data: [30, 40, 45, 50, 49, 60],
        color: "#1F4690",
      },
      {
        name: "QUANTITY -FRAUDE",
        data: [16, 7, 80, 87, 34, 21],
        color: "#FFA500",
      },
    ],
  });
  return (
    <div>
      <Chart
        options={state.options}
        series={state.series}
        type="bar"
        height={450}
        width="100%"
      />
    </div>
  );
};

export default Barchart;
