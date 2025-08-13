// LineChart.js
"use client";
import React, { useEffect, useState } from "react";
import { Context } from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  TooltipItem,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import muiTheme from "../theme/muiTheme";
import { WeatherHourDataType } from "../type";

import { timeCalculate } from "../functions/getCurrentWeather";

import { ChartOptions } from "chart.js";
// Register components
ChartJS.defaults.font.family = "Roboto";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);
interface dataType {
  labels: string[] | undefined;
  datasets: {
    data: number[] | undefined;
    label: string;
    borderColor: string;
    backgroundColor: string;
    tension: number;
    pointRadius: number;
    pointHoverRadius: number;
    datalabels: {
      display: boolean;
      align: string;
      anchor: string;
      formatter: (value: number, context: Context) => string;
      font: {
        size: number;
        weight: string;
        finally: string;
      };
      color: string;
    };
  }[];
}
const LineChart = ({
  hourlyForecast,
  forecastRange,
}: {
  hourlyForecast: WeatherHourDataType[] | null;
  forecastRange: { start: number; end: number };
}) => {
  const [chartInfo, setChartInfo] = useState<{
    temp: number[] | null;
    rainChances: number[] | null;
    time: string[] | null;
    logo: string[] | null;
  } | null>(null);

  const dataAssign = (property: "temp" | "rainChances" | "time" | "logo") => {
    if (hourlyForecast) {
      if (property == "temp") {
        return hourlyForecast.map((data) => data.temp_c);
      } else if (property == "rainChances") {
        return hourlyForecast.map((data) => data.chance_of_rain);
      } else if (property == "time") {
        return hourlyForecast.map((data) => timeCalculate(data.time_epoch));
      } else if (property == "logo") {
        return hourlyForecast.map((data) => {
          if (data.chance_of_rain <= 25) {
            return data.is_day == 0 ? "🌙" : "☀️";
          } else if (data.chance_of_rain > 25 && data.chance_of_rain <= 50) {
            return data.is_day == 0 ? "☁︎" : "🌤️";
          } else if (data.chance_of_rain > 50 && data.chance_of_rain <= 75) {
            return "☁️";
          } else if (data.chance_of_rain > 75 && data.chance_of_rain <= 100) {
            return "🌧️";
          } else return "❗";
        });
      }
    }
  };

  useEffect(
    function () {
      setChartInfo({
        temp: dataAssign("temp") as number[],
        time: dataAssign("time") as string[],
        logo: dataAssign("logo") as string[],
        rainChances: dataAssign("rainChances") as number[],
      });
    },
    [hourlyForecast]
  );

  const data: dataType = {
    labels: chartInfo?.time?.slice(forecastRange.start, forecastRange.end),
    datasets: [
      {
        data: chartInfo?.temp?.slice(forecastRange.start, forecastRange.end),
        label: "Temperature",
        borderColor: muiTheme.palette.primary.main,
        backgroundColor: muiTheme.palette.primary.main,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        datalabels: {
          display: true,

          align: "top", // Puts label above the point
          anchor: "end", // Anchors label at the top of the point
          formatter: function (value: number, context: Context) {
            const label = chartInfo?.rainChances?.slice(
              forecastRange.start,
              forecastRange.end
            )[context.dataIndex];
            const icons: string[] = chartInfo?.logo?.slice(
              forecastRange.start,
              forecastRange.end
            ) as string[]; // can be dynamically set

            return `${value}°\n${icons[context.dataIndex]}\n${label}%`;
          },
          font: {
            size: 13,
            weight: "bold",
            finally: "Inter",
          },

          color: "#252525",
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },

      tooltip: {
        enabled: false,
      },
      datalabels: {
        display: true,
        color: "#111",
        clip: false,
        textAlign: "center",
        font: {
          size: 12,
          weight: "bold",
        },
      },
    },
    layout: {
      padding: {
        top: 70,
        left: 0,
        right: 0,
      },
    },
    scales: {
      x: {
        ticks: { color: "#888" },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: {
          display: false,
        },
        grid: { display: false },
      },
    },
  };

  return (
    <Line
      data={data as ChartData<"line", number[] | undefined, string>}
      options={options as ChartOptions<"line">}
    />
  );
};

export default LineChart;
