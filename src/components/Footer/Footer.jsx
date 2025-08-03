import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="h-[15vh] w-full shadow bg-gray-700 py-3 px-5 flex items-center">
     
      <div className="flex items-center space-x-3 text-white">
        <Logo width="45px" />
        <span className="text-sm">&copy; 2025 All rights reserved</span>
      </div>

      <div className="flex-grow" />

      <ul className="flex w-[32%] justify-between text-m text-white">
        <li>
          <Link to="/privacy" className="hover:text-blue-100  duration-200">Privacy</Link>
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
