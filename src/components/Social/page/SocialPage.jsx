import React from "react";
import SNavBar from "../SNavBar";
import { Outlet } from "react-router-dom";

export default function SocialPage() {
  return (
    <>
      <SNavBar />
      <Outlet />
    </>
  );
}
