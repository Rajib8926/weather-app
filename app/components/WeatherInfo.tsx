
import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import LineChart from "./TempChart";
import Speedometer from "./Speedomiter";
import Humidity from "./Humidity";
import UVIndex from "./UVIndex";
import FeelsLike from "./FeelsLike";
import AirQuality from "./AirQuality";
import ChancesOfRain from "./ChancesOfRain";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import SunnyIcon from "@mui/icons-material/Sunny";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import MasksIcon from "@mui/icons-material/Masks";
import { WeatherForecastResponse, WeatherHourDataType } from "../type";
export default function WeatherInfo({
  weatherReport,
  hourlyForecast,
}: {
  weatherReport: WeatherForecastResponse | null;
  hourlyForecast: WeatherHourDataType[] | null;
}) {
  const gridItemStyle = {
    background: "white",
    justifyItems: "center",
    borderRadius: { md: "30px", xs: "20px" },
    alignContent: "center",
    padding: "20px 30px",
    // backdropFilter: "blur(15px)",
  };
  const weatherIconConStyle = {
    width: "30px",
    height: "25px",
    backgroundColor: "primary.main",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "5px",
  };
  const [forecastRange, setForecastRange] = useState({ start: 0, end: 8 });

  function forecastRangeHandler(type: "next" | "previous") {
    if (type === "next") {
      if (forecastRange.end < 24) {
        setForecastRange({
          start: forecastRange.start + 8,
          end: forecastRange.end + 8,
        });
      }
    } else if (type === "previous") {
      if (forecastRange.start > 0) {
        setForecastRange({
          start: forecastRange.start - 8,
          end: forecastRange.end - 8,
        });
      }
    }
  }
  return (
    <Box
      sx={{
        background: { md: "#ffffff98", xs: "transparent" },
        height: "100vh",
        width: { xl: "75vw", md: "80vw", xs: "100vw" },
        backdropFilter: "blur(4px)",
        display: "flex",
        flexDirection: "column",
        padding: {
          xl: "4rem 7rem",
          md: "3rem 3rem",
          sm: "0rem 3rem",
          xs: "0rem 1rem 11vh",
        },
        borderRadius: {
          md: "70px 0 0 70px",
          sm: "50px 50px 0 0",
          xs: "30px 30px 0 0",
        },
        overflowY: "auto",
        // position: { md: "static", xs: "absolute" },

        // bottom: "-70vh",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { lg: "25px", xs: "22px" },
          fontWeight: "500",
          paddingLeft: "10px",
        }}
      >
        Well come to Weather Info
      </Typography>

      <Typography
        variant="h2"
        sx={{
          fontSize: { lg: "15px", xs: "14px" },
          paddingLeft: "10px",
          fontWeight: "400",
          marginTop: "5px",
        }}
      >
        {"Check out today's weather information"}
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "300px",
          borderRadius: { md: "30px", xs: "20px" },
          background: "white",
          display: "flex",
          justifyContent: "center",
          padding: { lg: "10px 50px", md: "17px 25px", xs: "18px 18px" },
          marginTop: "25px",
          // margin: "50px auto",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: { md: "space-between", xs: "end" },
          }}
        >
          <Typography sx={{ display: { md: "inline", xs: "none" } }}>
            Upcoming hours
          </Typography>

          <Box>
            <Button
              disabled={forecastRange.start !== 0 ? false : true}
              sx={{
                textTransform: "none",
                borderRadius: "20px",
                paddingRight: "20px",
              }}
              variant="text"
              onClick={() => forecastRangeHandler("previous")}
            >
              <ChevronRightIcon style={{ transform: " rotate(180deg)" }} />
              Previous{" "}
            </Button>
            <Button
              disabled={forecastRange.end !== 24 ? false : true}
              sx={{
                textTransform: "none",
                borderRadius: "20px",
                paddingLeft: "20px",
              }}
              variant="text"
              onClick={() => forecastRangeHandler("next")}
            >
              Next <ChevronRightIcon />
            </Button>
          </Box>
        </Box>
        <Box sx={{ width: "100%", overflow: "auto" }}>
          <Box sx={{ width: { sm: "100%", xs: "550px" }, flex: ".8" }}>
            <LineChart
              hourlyForecast={hourlyForecast}
              forecastRange={forecastRange}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          marginTop: "20px",
        }}
      >
        <Typography sx={{ fontSize: { lg: "17px", xs: "15px" } }}>
         {" More details of today's weather"}
        </Typography>
        <Grid
          container
          spacing={1.5}
          sx={{ width: "100%", marginTop: "15px", minHeight: "400px" }}
        >
          <Grid size={{ lg: 4, sm: 6, xs: 12 }} sx={gridItemStyle}>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Typography fontWeight={"500"} fontSize={"15px"}>
                Wind
              </Typography>
              <Box sx={weatherIconConStyle}>
                <AirIcon sx={{ color: "white", fontSize: "18px" }} />
              </Box>
            </Box>
            <Box
              sx={{
                height: "130px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Speedometer
                windSpeed={weatherReport?.current.wind_kph as number}
              />
            </Box>
          </Grid>
          <Grid size={{ lg: 4, sm: 6, xs: 12 }} sx={gridItemStyle}>
            {" "}
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Typography fontWeight={"500"} fontSize={"15px"}>
                Humidity
              </Typography>
              <Box sx={weatherIconConStyle}>
                <WaterDropIcon sx={{ color: "white", fontSize: "18px" }} />
              </Box>
            </Box>
            <Box
              sx={{
                height: "130px",
                display: "flex",
                width: "100%",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Humidity
                currentHumidity={weatherReport?.current.humidity as number}
              />
            </Box>
          </Grid>
          <Grid size={{ lg: 4, sm: 6, xs: 12 }} sx={gridItemStyle}>
            {" "}
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Typography fontWeight={"500"} fontSize={"15px"}>
                UV Index
              </Typography>
              <Box sx={weatherIconConStyle}>
                <SunnyIcon sx={{ color: "white", fontSize: "18px" }} />
              </Box>
            </Box>
            <Box
              sx={{
                height: "130px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <UVIndex currentUvIndex={weatherReport?.current.uv as number} />
            </Box>
          </Grid>
          <Grid size={{ lg: 4, sm: 6, xs: 12 }} sx={gridItemStyle}>
            {" "}
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Typography fontWeight={"500"} fontSize={"15px"}>
                Feels like
              </Typography>
              <Box sx={weatherIconConStyle}>
                <ThermostatIcon sx={{ color: "white", fontSize: "18px" }} />
              </Box>
            </Box>
            <Box
              sx={{
                height: "130px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <FeelsLike value={weatherReport?.current.feelslike_c as number} />
            </Box>
          </Grid>
          <Grid size={{ lg: 4, sm: 6, xs: 12 }} sx={gridItemStyle}>
            {" "}
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Typography fontWeight={"500"} fontSize={"15px"}>
                Air Quality
              </Typography>

              <Box sx={weatherIconConStyle}>
                <MasksIcon sx={{ color: "white", fontSize: "18px" }} />
              </Box>
            </Box>
            <Box
              sx={{
                height: "130px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <AirQuality
                airIndex={
                  weatherReport?.current.air_quality["us-epa-index"] as number
                }
              />
            </Box>
          </Grid>
          <Grid size={{ lg: 4, sm: 6, xs: 12 }} sx={gridItemStyle}>
            {" "}
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Typography fontWeight={"500"} fontSize={"15px"}>
                Chances of rain
              </Typography>
              <Box sx={weatherIconConStyle}>
                <BeachAccessIcon sx={{ color: "white", fontSize: "18px" }} />
              </Box>
            </Box>
            <Box
              sx={{
                height: "130px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <ChancesOfRain
                value={
                  hourlyForecast && hourlyForecast[0]?.chance_of_rain != null
                    ? hourlyForecast[0].chance_of_rain
                    : 0
                }
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
