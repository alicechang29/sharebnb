import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AddListingForm from "./AddListingForm.jsx";
import Listings from "./Listings.jsx";
import Home from "./Home.jsx";
import ListingLoader from "./ListingLoader.jsx";

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
          path="/listings/:id"
          element={<ListingLoader listings={listings} cantFindPath="/listings" />} />
        <Route
          path="/add-listing"
          element={<AddListingForm addListing={addListing} />}
        />
        <Route
          path="*"
          element={<p>Hmmm. I can't seem to find what you want.</p>} />
      </Routes>
    </div>
  );
}

export default RoutesList;
