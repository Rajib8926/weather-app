import { ReactNode } from "react";
import { BsCloudSnow, BsFillSunFill } from "react-icons/bs";
import { FaCloudRain, FaMoon } from "react-icons/fa";
import { IoIosRainy, IoIosSnow, IoMdCloudy } from "react-icons/io";
import { IoThunderstormSharp } from "react-icons/io5";
import { LiaCloudMoonRainSolid, LiaCloudSunRainSolid } from "react-icons/lia";

import { MdSnowing } from "react-icons/md";
import { RiMoonCloudyFill, RiSunCloudyFill } from "react-icons/ri";
import { TbAlertSquareRoundedFilled } from "react-icons/tb";
import {
  WiNightAltSnowThunderstorm,
  WiNightAltSnowWind,
  WiNightSnow,
  WiNightSnowThunderstorm,
} from "react-icons/wi";

export type WeatherBreakpointType =
  | { text: "Clear"; icon: ReactNode }
  | { text: "Partly Cloudy"; icon: ReactNode }
  | { text: "Cloudy"; icon: ReactNode }
  | { text: "Mist"; icon: ReactNode }
  | { text: "Light Rain"; icon: ReactNode }
  | { text: "Moderate Rain"; icon: ReactNode }
  | { text: "Heavy Rain"; icon: ReactNode }
  | { text: "Light Snow"; icon: ReactNode }
  | { text: "Heavy Snow"; icon: ReactNode }
  | { text: "Freezing"; icon: ReactNode }
  | { text: "Thunderstorm"; icon: ReactNode }
  | { text: "Snowstorm with Thunder"; icon: ReactNode }
  | { text: "Mixed"; icon: ReactNode }
  | { text: "Unknown"; icon: ReactNode };

const iconStyle = {
  color: "white",
  fontSize: "30px",
};
export function getWeatherIcons(
  code: number,
  isDay: number
): WeatherBreakpointType {
  switch (code) {
    case 1000:
      return {
        text: "Clear",
        icon:
          isDay === 0 ? (
            <FaMoon style={iconStyle} />
          ) : (
            <BsFillSunFill style={iconStyle} />
          ),
      };
    case 1003:
      return {
        text: "Partly Cloudy",
        icon:
          isDay === 0 ? (
            <RiMoonCloudyFill style={iconStyle} />
          ) : (
            <RiSunCloudyFill style={iconStyle} />
          ),
      };
    case 1006:
    case 1009:
    case 1030:
    case 1135:
    case 1147:
    case 1114:
      return { text: "Cloudy", icon: <IoMdCloudy style={iconStyle} /> };

    case 1150:
    case 1153:
    case 1180:
    case 1240:
      return {
        text: "Light Rain",
        icon:
          isDay === 0 ? (
            <LiaCloudMoonRainSolid style={iconStyle} />
          ) : (
            <LiaCloudSunRainSolid style={iconStyle} />
          ),
      };

    case 1183:
    case 1186:
    case 1243:
      return {
        text: "Moderate Rain",
        icon: <FaCloudRain style={iconStyle} />,
      };

    case 1189:
    case 1192:
    case 1195:
    case 1246:
      return {
        text: "Heavy Rain",
        icon: <IoIosRainy style={iconStyle} />,
      };

    case 1066:
    case 1210:
    case 1213:
    case 1255:
    case 1261:
      return {
        text: "Light Snow",
        icon:
          isDay === 0 ? (
            <WiNightAltSnowWind style={iconStyle} />
          ) : (
            <WiNightSnow style={iconStyle} />
          ),
      };

    case 1216:
    case 1219:
    case 1222:
    case 1225:
    case 1258:
      return {
        text: "Heavy Snow",
        icon: <BsCloudSnow style={iconStyle} />,
      };

    case 1168:
    case 1171:
    case 1198:
    case 1201:
      return {
        text: "Freezing",
        icon: <IoIosSnow style={iconStyle} />,
      };

    case 1087:
    case 1273:
    case 1276:
      return {
        text: "Thunderstorm",
        icon: <IoThunderstormSharp style={iconStyle} />,
      };

    case 1279:
    case 1282:
      return {
        text: "Snowstorm with Thunder",
        icon:
          isDay === 0 ? (
            <WiNightAltSnowThunderstorm style={iconStyle} />
          ) : (
            <WiNightSnowThunderstorm style={iconStyle} />
          ),
      };

    case 1063:
    case 1069:
    case 1072:
      return {
        text: "Mixed",
        icon: <MdSnowing style={iconStyle} />,
      };

    default:
      return {
        text: "Unknown",
        icon: <TbAlertSquareRoundedFilled style={iconStyle} />,
      };
  }
}
