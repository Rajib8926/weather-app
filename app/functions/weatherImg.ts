export function getWeatherImg(code: number, isDay: number): string {
  const mapping: Record<number, string> = {
    // Cloudy
    1003: isDay === 0 ? "moonClaude" : "sunClaude",
    1006: "cloudy",
    1009: "cloudy",
    1030:"cloudy",
    // Clear/Sunny
    1000: isDay === 0 ? "moon" : "sunny",

    // Rain
    1063: "rain",
    1150: "rain",
    1153: "rain",
    1180: "rain",
    1183: "rain",
    1186: "rain",
    1189: "rain",
    1192: "rain",
    1195: "rain",
    1240: "rain",
    1243: "rain",
    1246: "rain",
    1249: "rain",
    1252: "rain",

    // Snow
    1066: "snow",
    1114: "snow",
    1117: "snow",
    1210: "snow",
    1213: "snow",
    1216: "snow",
    1219: "snow",
    1222: "snow",
    1225: "snow",
    1255: "snow",
    1258: "snow",
    1279: "snow",
    1282: "snow",
  };

  console.log(mapping[code] || isDay === 0 ? "moon" : "sunny");

  return mapping[code] || (isDay === 0 ? "moon" : "sunny");
}

// Example usage:
