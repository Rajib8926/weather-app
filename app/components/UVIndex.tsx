import React from "react";
import ProgressBars from "./SplitProgressBars ";
import { Box, Typography } from "@mui/material";

const UVIndex = ({ currentUvIndex = 0 }: { currentUvIndex: number }) => {
  const UvIndex = currentUvIndex;

  const progressData = [
    {
      label: "0-2",
      value: UvIndex >= 2 ? 100 : UvIndex <= 0 ? 0 : 50,
    },
    {
      label: "3-5",
      value:
        UvIndex >= 5 ? 100 : UvIndex <= 2 ? 0 : UvIndex == 3 ? 33.3 : 33.3 * 2,
    },
    {
      label: "6-7",
      value: UvIndex >= 7 ? 100 : UvIndex <= 5 ? 0 : 50,
    },
    {
      label: "8-10",
      value:
        UvIndex >= 10 ? 100 : UvIndex <= 7 ? 0 : UvIndex == 8 ? 33.3 : 33.3 * 2,
    },
    {
      label: "11+",
      value: UvIndex > 11 ? 100 : UvIndex <= 10 ? 0 : 50,
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
      <Typography sx={{ fontSize: "24px" }}>{UvIndex}</Typography>
      <ProgressBars data={progressData} gap={10} />
    </Box>
  );
};

export default UVIndex;
