import { Box } from "@mui/material";
import React from "react";
import muiTheme from "../theme/muiTheme";
interface dataType {
  data: { label: string; value: number }[];
  gap: number;
  fontSize?: string;
}

const ProgressBars = ({ data, gap, fontSize = "14px" }: dataType) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: { xl: `${gap}px`, xs: `${gap / 2}px` },
        width: "100%",
      }}
    >
      {data.map((item, index) => (
        <Box sx={{ textAlign: "center", width: "100%" }} key={index}>
          <Box sx={{ fontSize: fontSize, marginBottom: "10px" }}>
            {item.label}
          </Box>
          <Box
            sx={{
              flex: "1",
              height: "10px",
              background: muiTheme.palette.background.paper,
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: `${item.value}%`,
                height: "100%",
                borderRadius: "10px",
                transition: "width 0.3s ease",
                backgroundColor: "primary.main",
              }}
            ></Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ProgressBars;
