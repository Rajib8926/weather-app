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
  isBackDropOpen,
  setIsBackDropOpen,
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
  isBackDropOpen: boolean;
  setIsBackDropOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [isDeleteVerificationOpen, setIsDeleteVerificationOpen] =
    useState<boolean>(false);
  const deleteVerificationHandler = () => {
    setIsDeleteVerificationOpen(!isDeleteVerificationOpen);
  };
  const textColor = "white";

  const backdropClickHandler = () => {
    setIsBackDropOpen(!isBackDropOpen);
  };


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
                      currentWeather.current.condition.code as number,
                      currentWeather.current.is_day
                    )?.text
                  }
                </Typography>
                {
                  getWeatherIcons(
                    currentWeather.current.condition.code as number,
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
                  currentWeather?.current.is_day
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
