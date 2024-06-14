import { Link, NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import React from "react";
/** Top navigation bar for site. */

function NavBar() {
  console.log("* NavBar");

  return (
    <nav className="NavBar navbar navbar-expand-md">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          ShareBnB
        </Link>
        <Nav className="ms-auto" navbar>
          <NavItem><NavLink to="/listings">Listings</NavLink> </NavItem>
          <NavItem><NavLink to="/add-listing">Add New Listing</NavLink></NavItem>
        </Nav>
      </div>
    </nav>
  );
}

export default NavBar;