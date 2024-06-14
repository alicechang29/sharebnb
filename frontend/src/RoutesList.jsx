import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AddListingForm from "./AddListingForm.jsx";
import Listings from "./Listings.jsx";
import Home from "./Home.jsx";

/** Site-wide routes.
 *
 * Visiting a non-existent route navigates to the homepage.
 */

function RoutesList({ listings, addListing }) {
  console.debug("Routes");

  return (
    <div className="pt-5">
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/listings"
          element={<Listings listings={listings} />} />
        <Route
          path="/add-listing"
          element={<AddListingForm addListing={addListing} />}
        />
      </Routes>
    </div>
  );
}

export default RoutesList;
