import { Link, NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import React from "react";
import "./NavBar.css";

function NavBar() {
  console.log("* NavBar");

  return (
    <div>
      <nav className="NavBar navbar navbar-expand-md">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            ShareBnB
          </Link>
          <Nav className="ms-auto" navbar>
            <NavItem>
              <NavLink to="/listings">Listings</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/add-listing">Add New</NavLink>
            </NavItem>
          </Nav>
        </div>
      </nav>

    </div>
  );
}

export default NavBar;