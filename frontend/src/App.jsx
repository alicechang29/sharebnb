import React from "react";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import NavBar from "./NavBar.jsx";
import RoutesList from "./RoutesList.jsx";
import ShareBnBAPI from "./api.js";

/** ShareBnB Application
 *
 * Props: (none)
 *
 * State:
 * - listingsFetch:
 * {listings: [listing,listings, ...], isLoading: true|false}
 *  where each listing is: {id, title, description, price, zipcode, images}
 *
 * App -> { NavBar, RoutesList}
 */

function App() {
  console.debug("App");

  const [listingsFetch, setListingsFetch] = useState(
    {
      listings: null,
      isLoading: true
    }
  );

  const { listings, isLoading } = listingsFetch;
  console.log("* App %o", { listings, isLoading });

  /**Fetches data on component mount*/
  useEffect(function fetchListingsOnMount() {
    console.log("useEffect fetchListingsOnMount");

    fetchListings();
  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  /**fetches listings data from API*/
  async function fetchListings() {
    const listings = await ShareBnBAPI.getAllListings();
    setListingsFetch({ listings, isLoading: false });
  }

  /**Handling submission of listing */
  async function addListing(formData) {
    console.log("addListing", formData);

    try {
      await ShareBnBAPI.sendFormDataToServer(formData);
      //FIXME: not sure how to add new listing to state as a form data object.
      //THIS is how to get the form data values BUT how to handle the image?
      console.log("entries", Object.fromEntries(formData.entries()));
      fetchListings();

    } catch (err) {
      console.log(err);
    }
  }

  // Set state for all listings

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <RoutesList listings={listings} addListing={addListing} />
      </div>
    </BrowserRouter>
  );
}

export default App;
