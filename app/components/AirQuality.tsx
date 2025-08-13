import React from "react";
import ProgressBars from "./SplitProgressBars ";
import { Box, Typography } from "@mui/material";

const AirQuality = ({ airIndex = 0 }: { airIndex: number }) => {
  const progressData = [
    {
      label: "  ",
      value: airIndex >= 1 ? 100 : 0,
    },
    {
      label: "",
      value:
        airIndex >= 2 ? 100 : 0,
    },
    {
      label: "",
      value:
        airIndex >= 3 ? 100 : 0,
    },
    {
      label: "",
      value:
        airIndex >= 4 ? 100 : 0,
    },
    {
      label: "",
      value:
        airIndex >= 5 ? 100 : 0,
    },
    {
      label: "",
      value:
        airIndex >= 6 ? 100 : 0,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
        width: "100%",
      }}
    >
      <Typography sx={{ fontSize: "24px" }}>{airIndex}</Typography>
      <ProgressBars data={progressData} gap={10} fontSize={"9px"}/>
    </Box>
  );
};

export default AirQuality;
