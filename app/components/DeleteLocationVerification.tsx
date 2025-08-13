import { Backdrop, Box, Button, Typography } from "@mui/material";
import React from "react";

export default function DeleteLocationVerification({
  isOpen,
  handleClose,
  deleteLocationHandler,
}: {
  isOpen: boolean;
  handleClose: () => void;
  deleteLocationHandler: () => void;
}) {
  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={isOpen}
      onClick={handleClose}
    >
      <Box
        sx={{
          background: "white",
          height: "210px",
          width: { sm: "370px",xs:"95vw" },
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "50px",
          cursor: "auto",
        }}
      >
        <Typography fontSize={17} fontWeight={500}>
          Do you want ot delete the location?
        </Typography>
        <Box sx={{ display: "flex", gap: "15px" }}>
          <Button
            onClick={handleClose}
            sx={{
              background: "#62abffff",
              color: "#ffffff",
              width: "120px",
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              deleteLocationHandler();
              handleClose();
            }}
            sx={{
              background: "#ff5c56ff",
              color: "#ffffff",
              width: "120px",
              textTransform: "none",
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Backdrop>
  );
}
