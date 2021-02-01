import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../action/auth";
import { useSelector, useDispatch } from "react-redux";

const Nav = () => {
  const isLoading = useSelector((state) => state.authReducer.isLoading);
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const dispatch = useDispatch();
  const authLinks = (
    <ul>
      <li>
        <Link to="/dashboard">
          <i className="fa fa-user"></i>{" "}
          <span className="hide-sm">DASHBOARD</span>
        </Link>
      </li>
      <li>
        <a href="#!" onClick={() => dispatch(logout())}>
          <i className="fa fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">LOGOUT</span>
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <a href="#!">DEVELOPERS</a>
      </li>
      <li>
        <Link to="/register">REGISTER</Link>
      </li>
      <li>
        <Link to="/login">LOGIN</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevCommunity
        </Link>
      </h1>
      {!isLoading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};
export default Nav;
