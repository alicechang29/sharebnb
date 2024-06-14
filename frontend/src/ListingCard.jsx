import { Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";
import React from "react";
/** Renders a listing.
 *
 * Props:
 * - listing: {id, title, description, price, zipcode, images}
 * - cantFindPath: path to redirect to if not found
 *
 * ListingLoader -> {ListingCard}
 */

function ListingCard({ listing }) {
  console.log("* listing");

  const { id, title, description, price, zipcode, images } = listing;
  return (
    <div className="w-1/2 rounded overflow-hidden shadow-lg ml-auto mr-auto my-10">
      <img className="w-full" src={images[0]} alt="Card image cap" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
        <p>
          <b>{price}/night</b>
        </p>
        <p>
          <b>Located in: </b>
          {zipcode}
        </p>
      </div>

      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #photography
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #winter
        </span>
      </div>
    </div>
  );
}

export default ListingCard;
