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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthProvider";

function Header() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width:900px)");
  const [anchorElNav, setAnchorElNav] = useState(null);

  // Navigation menu items
  const navItems = [
    { label: "About Us", path: "/about-us" },
    { label: "Investigate The Delphi Method", path: "/delphi-method" },
    { label: "Manage Surveys", path: "/manage-survey" },
    { label: "Participating Surveys", path: "/participating-surveys" },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    if (auth.logOut) {
      auth.logOut();
    }
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
            to="/"
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
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
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
                ) : (
                  <>
                    <Button
                      component={Link}
                      to="/login"
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
                    <Button
                      variant="contained"
                      component={Link}
                      to="/sign-up"
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
