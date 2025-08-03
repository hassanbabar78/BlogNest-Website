import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="h-[15vh] w-full shadow bg-gray-500 py-3 px-8 flex items-center">
      {/* Left: Logo + Text */}
      <div className="flex items-center space-x-3 text-black">
        <Logo width="45px" />
        <span className="text-sm">&copy; 2025 All rights reserved</span>
      </div>

      {/* Spacer to push links toward center/right */}
      <div className="flex-grow" />

      {/* Right: Footer Links evenly spread */}
      <ul className="flex w-[30%] justify-between text-sm text-black">
        <li>
          <Link to="/privacy" className="hover:text-blue-100 duration-200">Privacy</Link>
        </li>
        <li>
          <Link to="/terms" className="hover:text-blue-100 duration-200">Terms</Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-blue-100 duration-200">About</Link>
        </li>
        <li>
          <Link to="/help" className="hover:text-blue-100 duration-200">Help</Link>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
