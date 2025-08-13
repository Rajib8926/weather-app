import { Box, Typography } from "@mui/material";
import React from "react";
import muiTheme from "../theme/muiTheme";

export default function ProgressBar({
  value,
  breakPoints,
  label,
}: {
  value: number;
  breakPoints: number[];
  label: string;
}) {
  const maxValue = breakPoints[breakPoints.length - 1];

  return (
    <Box
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "" }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        {breakPoints.map((breakPoint) => (
          <Typography key={breakPoint} sx={{ fontSize: "14px" }}>
            {breakPoint}
            {label}
          </Typography>
        ))}
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "10px",
          background: muiTheme.palette.background.paper,
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: `${
              value * (100 / maxValue) < 0
                ? Math.abs(value * (100 / maxValue))
                : value * (100 / maxValue)
            }%`,
            height: "100%",
            borderRadius: "10px",
            transition: "width 0.3s ease",
            backgroundColor: "primary.main",
          }}
        ></Box>
      </Box>
    </Box>
  );
}
