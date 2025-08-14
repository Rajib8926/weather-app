"use client";
import { Box, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import NearMeIcon from "@mui/icons-material/NearMe";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { WeatherForecastResponse } from "../type";
import { getWeatherIcons } from "../functions/weatherIcon";
import { FiChevronRight } from "react-icons/fi";
import SearchComponent from "./SearchComponent";
import DeleteLocationVerification from "./DeleteLocationVerification";
import { getWeatherImg } from "../functions/weatherImg";

export default function CurrentWeather({
  currentWeather,
  addedLocatons,
  setAddedLocation,
  deleteLocationHandler,
  setCurrentLocationIndex,
  currentLocationIndex,
  timeAndDate,
  decreaseIndex,
  increaseIndex,
}: {
  currentWeather: WeatherForecastResponse;
  addedLocatons: {
    lat: number;
    lon: number;
  }[];
  setAddedLocation: Dispatch<
    SetStateAction<
      {
        lat: number;
        lon: number;
      }[]
    >
  >;
  deleteLocationHandler: () => void;
  setCurrentLocationIndex: Dispatch<SetStateAction<number>>;
  currentLocationIndex: number;
  timeAndDate:
    | {
        time: string;
        date: string;
      }
    | null
    | undefined;
  decreaseIndex: () => void;
  increaseIndex: () => void;
}) {
  const [isDeleteVerificationOpen, setIsDeleteVerificationOpen] =
    useState<boolean>(false);
  const deleteVerificationHandler = () => {
    setIsDeleteVerificationOpen(!isDeleteVerificationOpen);
  };
  const textColor = "white";
  const [isBackDropOpen, setIsBackDropOpen] = useState(false);
  const backdropClickHandler = () => {
    setIsBackDropOpen(!isBackDropOpen);
  };
  // const [addedLocatons, setAddedLocation] = useState<
  //   { lat: number; lon: number }[]
  // >([
  //   { lat: 27.036007, lon: 88.262672 },
  //   { lat: 19.07609, lon: 72.877426 },
  //   { lat: 28.6448, lon: 77.216721 },
  // ]);
  // const switchLabel = { inputProps: { "aria-label": "Switch demo" } };
  // const [currentWeather, setCurrentWeather] =
  //   useState<WeatherForecastResponse | null>(null);
  // const [timeAndDate, setTimeAndDate] = useState<{
  //   time: string;
  //   date: string;
  // } | null>();
  // const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  // const increaseIndex = () => {
  //   console.log("inClick");

  //   setCurrentLocationIndex(
  //     addedLocatons.length - 1 > currentLocationIndex
  //       ? currentLocationIndex + 1
  //       : 0
  //   );
  // };
  // const decreaseIndex = () => {
  //   setCurrentLocationIndex(
  //     0 === currentLocationIndex
  //       ? addedLocatons.length - 1
  //       : currentLocationIndex - 1
  //   );
  // };
  // const deleteLocationHandler = () => {
  //   setAddedLocation(
  //     addedLocatons.filter((data, index) => index !== currentLocationIndex)
  //   );
  // };

  // useEffect(
  //   function () {
  //     getCurrentWeather(addedLocatons[currentLocationIndex]).then((data) => {
  //       setWeatherReport(data as WeatherForecastResponse);
  //       setCurrentWeather(data as WeatherForecastResponse);
  //       setTimeAndDate({
  //         time: timeCalculate(data?.location.localtime_epoch as number),
  //         date: dateCalculate(data?.location.localtime),
  //       });
  //       console.log(data);
  //       function getNext24HoursForecast(forecastData: WeatherForecastResponse) {
  //         const currentEpoch = forecastData.current.last_updated_epoch;
  //         const currentHour = new Date(currentEpoch * 1000).getHours();

  //         const todayHours = forecastData.forecast.forecastday[0].hour;
  //         const tomorrowHours =
  //           forecastData.forecast.forecastday[1]?.hour || [];

  //         // Merge both day's hourly data
  //         const allHours = [...todayHours, ...tomorrowHours];

  //         // Get the index of the current hour in merged data
  //         const startIndex = allHours.findIndex(
  //           (hour) => hour.time_epoch >= currentEpoch
  //         );

  //         // Get next 24 hours from current time
  //         setHourlyForecast(
  //           allHours.slice(startIndex, startIndex + 24) as WeatherHourDataType[]
  //         );
  //         console.log(allHours.slice(startIndex, startIndex + 24));

  //         return allHours.slice(startIndex, startIndex + 24);
  //       }
  //       getNext24HoursForecast(data as WeatherForecastResponse);
  //     });
  //   },
  //   [currentLocationIndex, addedLocatons]
  // );

  return (
    <>
      {currentWeather && (
        <Box
          sx={{
            color: textColor,
            display: "flex",
            flexDirection: "column",
            justifyContent: { md: "space-between", xs: "start" },
            height: "100vh",
            gap: { md: "0px", xs: "5px" },
            paddingBottom: "7rem",
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  height: "25px",
                  width: "25px",
                  bgcolor: textColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "7px",
                  cursor: "pointer",
                  zIndex: "12",
                }}
              >
                <AddIcon
                  sx={{
                    color: "#67aeff",

                    transform: isBackDropOpen ? "rotate(45deg)" : "",
                    transition: "transform 0.3s ease",
                  }}
                  onClick={backdropClickHandler}
                />
              </Box>
              <SearchComponent
                isOpen={isBackDropOpen}
                addLocation={addedLocatons}
                setAddLocation={setAddedLocation}
                backdropClickHandler={backdropClickHandler}
              />

              <Box sx={{ display: "flex", alignItems: "center" }}>
                {" "}
                <Box
                  onClick={deleteVerificationHandler}
                  sx={{
                    height: "25px",
                    width: "25px",
                    bgcolor: textColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "7px",
                    cursor: "pointer",
                  }}
                >
                  <DeleteForeverIcon
                    sx={{ color: "#67aeff", fontSize: "20px" }}
                  />
                  <DeleteLocationVerification
                    handleClose={deleteVerificationHandler}
                    isOpen={isDeleteVerificationOpen}
                    deleteLocationHandler={deleteLocationHandler}
                  />
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {addedLocatons.map((data, index) => (
                <Box
                  onClick={() => setCurrentLocationIndex(index)}
                  key={index}
                  sx={{
                    background:
                      index === currentLocationIndex ? "white" : "#ffffffa9",
                    height: "8px",
                    width: index === currentLocationIndex ? "25px" : "8px",
                    borderRadius:
                      index === currentLocationIndex ? "5px" : "50%",
                    transition: "width 0.3s ease",
                    cursor: "pointer",
                  }}
                ></Box>
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: { md: "50px", sm: "30px", xs: "20px" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "7px",
                }}
              >
                <NearMeIcon />
                <Typography
                  sx={{
                    color: textColor,
                    fontSize: { lg: "18px", xs: "17px" },
                    fontWeight: "400",
                  }}
                >
                  {currentWeather.location.name},
                  {currentWeather.location.country}
                </Typography>
              </Box>
              <Typography
                sx={{
                  color: textColor,
                  fontSize: { lg: "18px", xs: "17px" },
                  fontWeight: "400",
                }}
              >
                {timeAndDate?.time}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{ color: "#eaf4ff", fontSize: "13px", fontWeight: "400" }}
              >
                {timeAndDate?.date}
              </Typography>
            </Box>
            <Box sx={{ marginTop: "15px" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: { lg: "3rem", md: "2rem", xs: "3rem" },
                }}
              >
                <Box
                  sx={{ transform: "rotate(180deg)" }}
                  onClick={decreaseIndex}
                >
                  <FiChevronRight fontSize={40} style={{ cursor: "pointer" }} />
                </Box>
                <Typography
                  textAlign={"center"}
                  sx={{
                    color: textColor,
                    fontSize: { xl: "90px", lg: "70px", xs: "60px" },
                  }}
                >
                  {Math.round(currentWeather.current.temp_c)}°
                </Typography>
                <Box onClick={increaseIndex}>
                  <FiChevronRight fontSize={40} style={{ cursor: "pointer" }} />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "7px",
                }}
              >
                <Typography
                  sx={{
                    color: textColor,
                    fontSize: { lg: "19px", xs: "17px" },
                    fontWeight: "400",
                  }}
                >
                  {
                    getWeatherIcons(
                      currentWeather?.current.condition.code as number,
                      currentWeather.current.is_day
                    )?.text
                  }
                </Typography>
                {
                  getWeatherIcons(
                    currentWeather?.current.condition.code as number,
                    currentWeather.current.is_day
                  )?.icon
                }
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: { xl: "310px", xs: "250px" },
                height: { xl: "360px", xs: "300px" },
                backgroundImage: `url(${getWeatherImg(
                  currentWeather?.current.condition.code as number,
                  0
                )}.png)`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></Box>
          </Box>
        </Box>
      )}
    </>
  );
}
