"use client";
import React from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import muiTheme from "../theme/muiTheme";
function Speedometer({ windSpeed=0 }: { windSpeed: number }) {
  return (
    <Gauge
      width={200}
      height={110}
      cornerRadius={5}
      startAngle={-110}
      endAngle={110}
      value={windSpeed}
      valueMin={0}
      valueMax={100}
      sx={{
        "& .MuiGauge-valueText": {
          fontSize: 15,
          transform: "translate(0px, 0px)",
        },

        [`& .${gaugeClasses.referenceArc}`]: {
          fill: muiTheme.palette.background.paper,
        },
      }}
      text={({ value }) => `${value}Km/Hr`}
    />
  );
}

export default Speedometer;
