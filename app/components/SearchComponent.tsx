"use client";
import { Backdrop, Box, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import LocationCityIcon from "@mui/icons-material/LocationCity";
type LocationInfo = {
  country: string;
  id: number;
  lat: number;
  lon: number;
  name: string;
  region: string;
  url: string;
};

export default function SearchComponent({
  isOpen,
  addLocation,
  setAddLocation,
  backdropClickHandler,
}: {
  isOpen: boolean;
  addLocation: { lat: number; lon: number }[];
  setAddLocation: React.Dispatch<
    React.SetStateAction<
      {
        lat: number;
        lon: number;
      }[]
    >
  >;
  backdropClickHandler: () => void;
}) {
  const [query, setQuery] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lan: number; lon: number } | null>(
    null
  );
  const [searchResult, setSearchResult] = useState<LocationInfo[] | null>(null);
  const handleSearch = async () => {
    if (!query) {
      setSearchResult(null);
      return;
    }
    try {
      const locationRes = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=${"f4a8cb380ebe45d1897171518251607"}&q=${query}`
      );
      const locationData = await locationRes.json();
      if (locationData !== 0) {
        console.log(locationData);
        setSearchResult(locationData);
      } else {
        setSearchResult(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const locationClickHandler = ({ lat, lon }: { lat: number; lon: number }) => {
    setAddLocation([{ lat: lat, lon: lon }, ...addLocation]);
    backdropClickHandler();
  };
  useEffect(
    function () {
      handleSearch();
    },
    [query]
  );
  return (
    <Backdrop
      sx={{
        zIndex: "10",
        cursor: "auto",
        background: "white",
      }}
      open={isOpen}
    >
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          paddingTop: { md: "30px", xs: "30px" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Add a new location"
          variant="outlined"
          onChange={(e) => setQuery(e.target.value)}
          sx={{
            border: "none",
            marginTop: { md: "0px", xs: "25px" },
            width: { lg: "40vw", sm: "80vw", xs: "95vw" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#5bc6ff",
              },
              "&:hover fieldset": {
                borderColor: "#5bc6ff",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#5bc6ff",
              },
              height: "55px",
            },
            "& .MuiOutlinedInput-input": {},
          }}
        />
        <Box
          sx={{
            width: { lg: "40vw", sm: "80vw", xs: "95vw" },
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            marginTop: "5px",
            maxHeight: "600px",
            overflow: "auto",

            transition: "height 0.4s ease",
          }}
        >
          {searchResult?.map((data) => (
            <Box
              onClick={() =>
                locationClickHandler({ lat: data.lat, lon: data.lon })
              }
              key={data.id}
              sx={{
                width: "100%",
                border: "1px solid",
                padding: "15px",
                borderRadius: "4px",
                display: "flex",
                alignItems: "flex-start",
                gap: "5px",
                color: "#969696ff",
                cursor: "pointer",
                "&:hover": {
                  background: "#f5f5f5ff",
                },
                transition: "background-color 0.3s ease",
              }}
            >
              <LocationCityIcon
                sx={{
                  color: "#969696ff",
                  fontSize: { sm: "25px", xs: "20px" },
                }}
              />
              <Box sx={{}}>
                <Typography sx={{}}>
                  {" "}
                  {`${data.name},${data.region},${data.country}`},{" "}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Backdrop>
  );
}
