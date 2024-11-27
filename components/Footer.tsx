"use client";

import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <AppBar
      position="static"
      sx={{
        top: "auto",
        bottom: 0,
        backgroundColor: "#333",
        color: "#ccc"
      }}
    >
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography variant="body2" sx={{ color: "#ccc" }}>
          Created by Story Protocol © {new Date().getFullYear()}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
