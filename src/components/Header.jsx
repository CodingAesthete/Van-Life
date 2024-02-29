import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import avatarImg from "../assets/images/avatar-icon.png";

export default function Header() {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616"
  };

  function fakeLogOut() {
    localStorage.removeItem("loggedin");
    setIsLoggedIn(false); // Update state to reflect logout
  }

  // State to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status when component mounts
    const loggedIn = localStorage.getItem("loggedin");
    setIsLoggedIn(!!loggedIn); // Convert to boolean
  }, []); // Run only on mount

  return (
    <header>
      <Link className="site-logo" to="/">
        #VanLife
      </Link>
      <nav>
        <NavLink to="host" style={({ isActive }) => (isActive ? activeStyles : null)}>
          Host
        </NavLink>
        <NavLink to="about" style={({ isActive }) => (isActive ? activeStyles : null)}>
          About
        </NavLink>
        <NavLink to="vans" style={({ isActive }) => (isActive ? activeStyles : null)}>
          Vans
        </NavLink>
        {/* Render X button only when logged in */}
        {isLoggedIn && <button onClick={fakeLogOut}>X</button>}
        <Link to="login" className="login-link">
          <img src={avatarImg} className="login-icon" alt="avatar-img" />
        </Link>
      </nav>
    </header>
  );
}
