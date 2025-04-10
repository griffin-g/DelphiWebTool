import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Typography,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
  Modal,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import SettingsIcon from "@mui/icons-material/Settings";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import LoginComponent from "./LoginComponent";
import SignUpComponent from "./SignUpComponent";

function Header() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width:900px)");
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Navigation menu items
  const navItems = [
    { label: "About Us", path: "/about-us" },
    { label: "Investigate The Delphi Method", path: "/delphi-method" },
    { label: "Manage Surveys", path: "/manage-survey" },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    if (auth.logOut) {
      auth.logOut("/change-password");
    }
  };

  const handleChangePassword = () => {
    navigate();
  };
  const handleNavigation = (path) => {
    navigate(path);
    handleCloseNavMenu();
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "white",
        color: "#333",
        borderBottom: "1px solid #eaeaea",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo/App Name */}
          <Typography
            variant="h5"
            component={Link}
            to="/about-us"
            sx={{
              fontWeight: 700,
              color: "#4A77E5",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              mr: 4,
            }}
          >
            Delphi Web App
          </Typography>

          {/* Mobile menu */}
          {isMobile ? (
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {navItems.map((item) => (
                  <MenuItem
                    key={item.label}
                    onClick={() => handleNavigation(item.path)}
                    selected={isActive(item.path)}
                  >
                    <Typography textAlign="center">{item.label}</Typography>
                  </MenuItem>
                ))}
                <Divider />
                {auth.user ? (
                  <>
                    <MenuItem onClick={handleLogout}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleNavigation("/change-password")}
                    >
                      <SettingsIcon sx={{ mr: 1 }} />
                      <Typography textAlign="center">
                        Change Password
                      </Typography>
                    </MenuItem>
                  </>
                ) : (
                  [
                    <MenuItem
                      key="login"
                      onClick={() => handleNavigation("/login")}
                    >
                      <Typography textAlign="center">Login</Typography>
                    </MenuItem>,
                    <MenuItem
                      key="signup"
                      onClick={() => handleNavigation("/sign-up")}
                    >
                      <Typography textAlign="center">Sign Up</Typography>
                    </MenuItem>,
                  ]
                )}
              </Menu>
            </Box>
          ) : (
            <>
              {/* Desktop Navigation */}
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  gap: 3,
                }}
              >
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      color: isActive(item.path) ? "#4A77E5" : "#555",
                      fontWeight: isActive(item.path) ? 600 : 400,
                      display: "block",
                      textTransform: "none",
                      fontSize: "1rem",
                      borderBottom: isActive(item.path)
                        ? "2px solid #4A77E5"
                        : "none",
                      borderRadius: 0,
                      "&:hover": {
                        backgroundColor: "transparent",
                        color: "#4A77E5",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>

              {/* User Auth */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {auth.user ? (
                  <>
                    <MenuItem onClick={() => handleNavigation("/change-password")}>
                      <SettingsIcon sx={{ mr: 1 }} />
                      <Typography textAlign="center">
                        Change Password
                      </Typography>
                    </MenuItem>

                    <Button
                      variant="outlined"
                      onClick={handleLogout}
                      sx={{
                        borderColor: "#4A77E5",
                        color: "#4A77E5",
                        "&:hover": {
                          backgroundColor: "rgba(74, 119, 229, 0.04)",
                          borderColor: "#4A77E5",
                        },
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      // component={Link}
                      // to="/login"
                      onClick={() => setIsLoginOpen(true)}
                      startIcon={<LoginIcon />}
                      sx={{
                        color: "#555",
                        mr: 2,
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "transparent",
                          color: "#4A77E5",
                        },
                      }}
                    >
                      Login
                    </Button>
                    <Modal
                      open={isLoginOpen}
                      onClose={() => setIsLoginOpen(false)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <LoginComponent open={setIsLoginOpen} />
                    </Modal>
                    <Button
                      variant="contained"
                      // component={Link}
                      // to="/sign-up"
                      onClick={() => setIsSignUpOpen(true)}
                      sx={{
                        backgroundColor: "#4A77E5",
                        textTransform: "none",
                        fontWeight: 500,
                        "&:hover": {
                          backgroundColor: "#3A67D5",
                        },
                      }}
                    >
                      Sign Up
                    </Button>
                    <Modal
                      open={isSignUpOpen}
                      onClose={() => setIsSignUpOpen(false)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <SignUpComponent setOpen={setIsSignUpOpen} />
                    </Modal>
                  </>
                )}
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
