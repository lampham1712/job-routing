import React from "react";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export function Layout() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </>
  );
}
