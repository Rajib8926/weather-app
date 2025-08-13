import React from "react";
import ProgressBars from "./SplitProgressBars ";
import { Box, Typography } from "@mui/material";

const Humidity = ({ currentHumidity = 0 }: { currentHumidity: number }) => {
  const humidity = currentHumidity;

  const progressData = [
    {
      label: "good",
      value: humidity * 3 > 100 ? 100 : humidity * 3 < 0 ? 0 : humidity * 3,
    },
    {
      label: "normal",
      value:
        humidity * 3 - 100 > 100
          ? 100
          : humidity * 3 - 100 < 0
          ? 0
          : humidity * 3 - 100,
    },
    {
      label: "bad",
      value:
        humidity * 3 - 200 > 100
          ? 100
          : humidity * 3 - 200 < 0
          ? 0
          : humidity * 3 - 200,
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
      <Typography sx={{ fontSize: "24px" }}>{humidity}%</Typography>
      <ProgressBars data={progressData} gap={30} />
    </Box>
  );
};

export default Humidity;
