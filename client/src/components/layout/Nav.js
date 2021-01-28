import React from "react";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevCommunity
        </Link>
      </h1>
      <ul>
        <li>
          <a href="profiles.html">DEVELOPERS</a>
        </li>
        <li>
          <Link to="/register">REGISTER</Link>
        </li>
        <li>
          <Link to="/login">LOGIN</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
