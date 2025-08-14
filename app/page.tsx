"use client";
import { Box, Button, Grid, Typography } from "@mui/material";
import LineChart from "./components/TempChart";
import Speedometer from "./components/Speedomiter";
import Humidity from "./components/Humidity";
import UVIndex from "./components/UVIndex";
import FeelsLike from "./components/FeelsLike";
import AirQuality from "./components/AirQuality";
import ChancesOfRain from "./components/ChancesOfRain";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import SunnyIcon from "@mui/icons-material/Sunny";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import MasksIcon from "@mui/icons-material/Masks";
import CurrentWeather from "./components/CurrentWeather";
import { useEffect, useState } from "react";
import { WeatherForecastResponse, WeatherHourDataType } from "./type";
import "react-spring-bottom-sheet/dist/style.css";
import WeatherInfoDrawer from "./components/WeatherInfoDrawer";
import {
  dateCalculate,
  getCurrentWeather,
  timeCalculate,
} from "./functions/getCurrentWeather";
export default function Home() {
  const [hourlyForecast, setHourlyForecast] = useState<
    WeatherHourDataType[] | null
  >(null);
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
  const [addedLocatons, setAddedLocation] = useState<
    { lat: number; lon: number }[]
  >([
    { lat: 27.036007, lon: 88.262672 },
    { lat: 19.07609, lon: 72.877426 },
    { lat: 28.6448, lon: 77.216721 },
  ]);
  const switchLabel = { inputProps: { "aria-label": "Switch demo" } };
  const [currentWeather, setCurrentWeather] =
    useState<WeatherForecastResponse | null>(null);
  const [timeAndDate, setTimeAndDate] = useState<{
    time: string;
    date: string;
  } | null>();
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const increaseIndex = () => {
    console.log("inClick");

    setCurrentLocationIndex(
      addedLocatons.length - 1 > currentLocationIndex
        ? currentLocationIndex + 1
        : 0
    );
  };
  const decreaseIndex = () => {
    setCurrentLocationIndex(
      0 === currentLocationIndex
        ? addedLocatons.length - 1
        : currentLocationIndex - 1
    );
  };
  const deleteLocationHandler = () => {
    setAddedLocation(
      addedLocatons.filter((data, index) => index !== currentLocationIndex)
    );
  };

  useEffect(
    function () {
      getCurrentWeather(addedLocatons[currentLocationIndex]).then((data) => {
        setCurrentWeather(data as WeatherForecastResponse);
        setCurrentWeather(data as WeatherForecastResponse);
        setTimeAndDate({
          time: timeCalculate(data?.location.localtime_epoch as number),
          date: dateCalculate(data?.location.localtime),
        });
        console.log(data);
        function getNext24HoursForecast(forecastData: WeatherForecastResponse) {
          const currentEpoch = forecastData.current.last_updated_epoch;
          const currentHour = new Date(currentEpoch * 1000).getHours();

          const todayHours = forecastData.forecast.forecastday[0].hour;
          const tomorrowHours =
            forecastData.forecast.forecastday[1]?.hour || [];

          // Merge both day's hourly data
          const allHours = [...todayHours, ...tomorrowHours];

          // Get the index of the current hour in merged data
          const startIndex = allHours.findIndex(
            (hour) => hour.time_epoch >= currentEpoch
          );

          // Get next 24 hours from current time
          setHourlyForecast(
            allHours.slice(startIndex, startIndex + 24) as WeatherHourDataType[]
          );
          console.log(allHours.slice(startIndex, startIndex + 24));

          return allHours.slice(startIndex, startIndex + 24);
        }
        getNext24HoursForecast(data as WeatherForecastResponse);
      });
    },
    [currentLocationIndex, addedLocatons]
  );

  return (
    <>
      {currentWeather ? (
        <>npm ru
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 1,
              background: "#5bc6ff",
            }}
          >
            {" "}
          </Box>
          <Box
            sx={{
              position: "relative",
              zIndex: 8,
              height: "100%",
              display: "flex",
            }}
          >
            <Box
              sx={{
                height: "100%",
                flex: "1",
                padding: {
                  lg: "20px 40px",
                  md: "20px 30px",
                  sm: "20px 50px",
                  xs: "20px 30px",
                },
                position: { md: "static", xs: "relative" },
              }}
            >
              <CurrentWeather
                addedLocatons={addedLocatons}
                currentLocationIndex={currentLocationIndex}
                currentWeather={currentWeather as WeatherForecastResponse}
                decreaseIndex={decreaseIndex}
                deleteLocationHandler={deleteLocationHandler}
                increaseIndex={increaseIndex}
                setAddedLocation={setAddedLocation}
                setCurrentLocationIndex={setCurrentLocationIndex}
                timeAndDate={timeAndDate}
              />
            </Box>

            <WeatherInfoDrawer
              weatherReport={currentWeather}
              hourlyForecast={hourlyForecast}
            />

            <Box
              sx={{
                background: "#ffffff98",
                height: "100vh",
                width: { xl: "75%", md: "80%", xs: "100vw" },
                backdropFilter: "blur(2px)",
                display: { md: "flex", xs: "none" },
                flexDirection: "column",
                padding: {
                  xl: "4rem 7rem",
                  sm: "3rem 3rem",
                  xs: "3rem 1rem 11vh",
                },
                borderRadius: {
                  md: "70px 0 0 70px",
                  sm: "50px 50px 0 0",
                  xs: "30px 30px 0 0",
                },
                overflowY: "auto",
                position: { md: "static", xs: "absolute" },

                bottom: "-70vh",
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
                {" Check out today's weather information"}
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  height: "300px",
                  borderRadius: { md: "30px", xs: "20px" },
                  background: "white",
                  display: "flex",
                  justifyContent: "center",
                  padding: {
                    lg: "10px 50px",
                    md: "17px 25px",
                    xs: "18px 18px",
                  },
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
                      <ChevronRightIcon
                        style={{ transform: " rotate(180deg)" }}
                      />
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
                  {"More details of today's weather"}
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
                        windSpeed={currentWeather?.current.wind_kph as number}
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
                        <WaterDropIcon
                          sx={{ color: "white", fontSize: "18px" }}
                        />
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
                        currentHumidity={
                          currentWeather?.current.humidity as number
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
                      <UVIndex
                        currentUvIndex={currentWeather?.current.uv as number}
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
                        Feels like
                      </Typography>
                      <Box sx={weatherIconConStyle}>
                        <ThermostatIcon
                          sx={{ color: "white", fontSize: "18px" }}
                        />
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
                      <FeelsLike
                        value={currentWeather?.current.feelslike_c as number}
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
                          currentWeather?.current.air_quality[
                            "us-epa-index"
                          ] as number
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
                        <BeachAccessIcon
                          sx={{ color: "white", fontSize: "18px" }}
                        />
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
                          hourlyForecast &&
                          hourlyForecast[0]?.chance_of_rain != null
                            ? hourlyForecast[0].chance_of_rain
                            : 0
                        }
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}
