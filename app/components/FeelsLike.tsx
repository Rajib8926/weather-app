import { Box, Typography } from "@mui/material";
import React from "react";
import ProgressBar from "./ProgressBar";

export default function FeelsLike({ value=0 }: { value: number }) {
  const breakPoints = value <= 0 ? [-25, 0, 25] : [0, 25, 50];
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
      <Typography sx={{ fontSize: "24px" }}>{value}°c</Typography>
      <ProgressBar value={value} breakPoints={breakPoints} label="°c"/>
    </Box>
  );
}
