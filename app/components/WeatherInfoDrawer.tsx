import React from "react";
import { Sheet } from "react-modal-sheet";
import { useState, useEffect } from "react";
import WeatherInfo from "./WeatherInfo";
import { WeatherForecastResponse, WeatherHourDataType } from "../type";

export default function WeatherInfoDrawer({
  hourlyForecast,
  weatherReport,
}: {
  weatherReport: WeatherForecastResponse | null;
  hourlyForecast: WeatherHourDataType[] | null;
}) {
  const [isOpen, setOpen] = useState(true);
  const [isDrawerEnabled, setDrawerEnabled] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setDrawerEnabled(window.innerWidth < 900);
    };

    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isDrawerEnabled) {
    // Don't show the drawer at all on large screens
    return null;
  }
  return (
    <Sheet
      isOpen={isOpen}
      onClose={() => setOpen(true)} // Prevent closing
      snapPoints={[0.9, 0.2]}
      initialSnap={1}
      style={{zIndex:"5"}}
      
    >
      <Sheet.Container
        style={{
          background: "#ffffff98",
          borderRadius: "30px 30px 0 0",
          boxShadow: "none",
        }}
      >
        <Sheet.Header  />
        <Sheet.Content>
          <WeatherInfo
            hourlyForecast={hourlyForecast}
            weatherReport={weatherReport}
          />
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop style={{ backgroundColor: "transparent" }} />
    </Sheet>
  );
}
