import { Typography } from "@mui/material";
import React from "react";

export const Quoteholder = ({ message }: { message: string }) => {
  return (
    <Typography color={"#FFFFF0"} sx={{ fontSize: "8vw" }}>
      {message}
    </Typography>
  );
};
