"use client";

import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";

const Navigation: React.FC = () => {
  const [anchorElProfile, setAnchorElProfile] = useState<null | HTMLElement>(
    null
  );
  const [anchorElRegister, setAnchorElRegister] = useState<null | HTMLElement>(
    null
  );

  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleRegisterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElRegister(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorElProfile(null);
  };

  const handleRegisterClose = () => {
    setAnchorElRegister(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#333" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "#ccc", px: 2 }}
        >
          MyApp
        </Typography>
        <Link href="/" passHref>
          <Button sx={{ color: "#ccc", "&:hover": { color: "#fff" }, px: 2 }}>
            Home
          </Button>
        </Link>
        <Link href="/gallery" passHref>
          <Button sx={{ color: "#ccc", "&:hover": { color: "#fff" }, px: 2 }}>
            Gallery
          </Button>
        </Link>
        <Button
          sx={{ color: "#ccc", "&:hover": { color: "#fff" }, px: 2 }}
          onClick={handleRegisterClick}
        >
          Register
        </Button>
        <Menu
          anchorEl={anchorElRegister}
          open={Boolean(anchorElRegister)}
          onClose={handleRegisterClose}
          MenuListProps={{
            sx: {
              backgroundColor: "#444",
              color: "#ccc",
              px: 2
            },
          }}
        >
          <Link href="/register/register-ipa" passHref>
            <MenuItem
              onClick={handleRegisterClose}
              sx={{
                color: "#ccc",
                "&:hover": { backgroundColor: "#555", color: "#fff" },
              }}
            >
              Register IPA
            </MenuItem>
          </Link>
        </Menu>
        <Button
          sx={{ color: "#ccc", "&:hover": { color: "#fff" }, px: 2 }}
          onClick={handleProfileClick}
        >
          Profile
        </Button>
        <Menu
          anchorEl={anchorElProfile}
          open={Boolean(anchorElProfile)}
          onClose={handleProfileClose}
          MenuListProps={{
            sx: {
              backgroundColor: "#444",
              color: "#ccc",
              px: 2
            },
          }}
        >
          <Link href="/profile/my-ipa" passHref>
            <MenuItem
              onClick={handleProfileClose}
              sx={{
                color: "#ccc",
                "&:hover": { backgroundColor: "#555", color: "#fff" },
              }}
            >
              My IPA
            </MenuItem>
          </Link>
          <Link href="/profile/my-license-tokens" passHref>
            <MenuItem
              onClick={handleProfileClose}
              sx={{
                color: "#ccc",
                "&:hover": { backgroundColor: "#555", color: "#fff" },
              }}
            >
              My License Tokens
            </MenuItem>
          </Link>
        </Menu>
        
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
