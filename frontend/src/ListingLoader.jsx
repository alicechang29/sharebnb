import { Navigate, useParams } from "react-router-dom";
import ListingCard from "./ListingCard";
import React from "react";
/** Find a listing and render it.
 *
 * Props:
 * - listings: [{id, title, description, price, zipcode, images}, ...]
 * - cantFindPath: path to redirect to if not found
 *
 * Params:
 * - id
 *
 * RoutesList -> { ListingLoader } -> ListingCard
 */

function ListingLoader({ listings, cantFindPath }) {
  const { id } = useParams();

  //find returns first elem in array that matches search criteria
  const listing = listings.listings.find(listing => listing.id === Number(id));

  // console.log("THE ID", id);
  // console.log("ALL LISTINGS", listings);
  // for (let item in listings.listings) {
  //   console.log(item);
  // }


  console.log("* listingLoader %o", { listings, cantFindPath, id, listing });

  if (!listing) return <Navigate to={cantFindPath} />;

  return <ListingCard listing={listing} />;
}

export default ListingLoader;
