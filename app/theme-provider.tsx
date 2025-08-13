"use client";

import React, { useMemo, useState, ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// You should have a themeCreator function that returns a theme object
import muiTheme from "./theme/muiTheme";

interface ThemeRegistryProps {
  children: ReactNode;
}

export default function ThemeRegistry({ children }: ThemeRegistryProps) {
 

  return <ThemeProvider theme={muiTheme}>{children} </ThemeProvider>;
}
