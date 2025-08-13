import Image from "next/image";
import styles from "./page.module.css";
import { Box, Button, Typography, ThemeProvider } from "@mui/material";
import LineChart from "./components/TempChart";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import theme from "./theme/muiTheme";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ background: "#62bdff", height: "100vh", display: "flex" }}>
        <Box sx={{ position: "absolute" }}></Box>
        <Box sx={{ height: "100%", flex: "1" }}></Box>
        <Box
          sx={{
            background: "#ffffff88",
            height: "100%",
            width: "75%",
            backdropFilter: "blur(2px)",
            padding: "4rem 5rem",
            borderRadius: "70px 0 0 70px",
          }}
        >
          <Typography
            variant="h1"
            sx={{ fontSize: "25px", fontWeight: "500", color: "#252525" }}
          >
            Well come to Weather Info
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: "18px",
              fontWeight: "400",
              color: "#252525",
              marginTop: "5px",
            }}
          >
            {"Check out today's weather information"}
          </Typography>
          <Box
            sx={{
              width: "100%",
              height: "300px",
              borderRadius: "20px",
              background: "#ffffff80",
              display: "flex",
              justifyContent: "center",
              padding: "10px 50px",
              marginTop: "25px",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Upcoming hours</Typography>
              <Button sx={{ textTransform: "none" }} variant="outlined">
                Next days <ChevronRightIcon />
              </Button>
            </Box>
            <Box sx={{ width: "100%", flex: ".8" }}>
              <LineChart />
            </Box>
          </Box>
          <Box sx={{ width: "100%", marginTop: "20px" }}>
            <Typography>{"More details of today's weather"}</Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
