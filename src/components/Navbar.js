import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { LoginModal } from "./LoginModal";

export function Navbar() {
  const { user, signout } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleSignout = async () => {
    await signout();
    navigate("/");
  };

  const handleSignInClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
  };

  return (
    <>
      <AppBar position="static" className="navbar-appbar">
        <Toolbar>
          <Typography variant="h6" component="div" className="navbar-title">
            <Link to="/" className="navbar-link">
              JobRouting
            </Link>
          </Typography>

          <Box className="navbar-actions">
            <Button color="inherit" component={Link} to="/">
              Jobs
            </Button>

            {user ? (
              <Box className="navbar-user-info">
                <Typography variant="body2" className="navbar-welcome-text">
                  Welcome, {user}!
                </Typography>
                <Button
                  color="inherit"
                  onClick={handleSignout}
                  variant="outlined"
                  size="small"
                >
                  Sign Out
                </Button>
              </Box>
            ) : (
              <Button
                color="inherit"
                onClick={handleSignInClick}
                variant="outlined"
                size="small"
              >
                Sign In
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <LoginModal
        open={showLoginModal}
        onClose={handleCloseLoginModal}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
}
