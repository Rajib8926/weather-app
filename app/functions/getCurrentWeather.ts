import { WeatherForecastResponse } from "../type";

export async function getCurrentWeather(
  location: { lat: number; lon: number } | null = null
) {
  let currentWeather: WeatherForecastResponse | null = null;
  const apiKey = "f4a8cb380ebe45d1897171518251607";
  if (location) {
    const ref = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location.lat},${location.lon}&days=2&aqi=yes`
    );
    const data = await ref.json();
    currentWeather = data;
    return currentWeather;
  } else {
    let lat = null;
    let lon = null;
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        const ref = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}`
        );
        const data = await ref.json();

        currentWeather = data;
      },
      (err) => {
        console.error("Geolocation error:", err);
      }
    );
    if (lat == null && lon == null) {
      const ref = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${28.6448},${77.216721}&days=2&aqi=yes`
      );
      const data = await ref.json();
      currentWeather = data;
      return currentWeather;
    }
  }
}

export function timeCalculate(localtime_epoch: number): string {
  // Convert to milliseconds (JS uses ms)
  const date = new Date(localtime_epoch * 1000);

  // Get hours and minutes

  const minutes = date.getMinutes().toString().padStart(2, "0");

  const hours12 = date.getHours() % 12 || 12;
  const ampm = date.getHours() >= 12 ? "PM" : "AM";
  const formatted12h: string = `${hours12}:${minutes} ${ampm}`;

  return formatted12h;
}

export function dateCalculate(rawDate = "2025-08-01 15:45") {
  // Create Date object
  const date = new Date(rawDate);

  // Format: "1, November"
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  return formattedDate;
  console.log(formattedDate); // ➤ "1, August"
}
