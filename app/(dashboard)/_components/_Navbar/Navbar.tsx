import React from "react";
import { MobileNavbar } from "./MobileNavbar";
import { NavbarRoutes } from "@/components/NavbarRoutes";

const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex flex-row-reverse items-center bg-white shadow-sm">
      <MobileNavbar />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
