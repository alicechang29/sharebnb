import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AddListingForm from "./AddListingForm.jsx";

/** Site-wide routes.
 *
 * Visiting a non-existent route navigates to the homepage.
 */

function RoutesList({ addListing }) {
  console.debug("Routes");

  return (
    <div className="pt-5">
      <Routes>
        <Route
          path="/add-listing"
          element={<AddListingForm addListing={addListing} />}
        />
      </Routes>
    </div>
  );
}

export default RoutesList;
