import { Box, Typography } from "@mui/material";
import React from "react";
import ProgressBar from "./ProgressBar";

export default function ChancesOfRain({ value }: { value: number }) {
  const breakPoints = [0, 25, 50, 75, 100];
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
      <Typography sx={{ fontSize: "24px" }}>{value}%</Typography>
      <ProgressBar value={value} breakPoints={breakPoints} label="%"/>
    </Box>
  );
}
