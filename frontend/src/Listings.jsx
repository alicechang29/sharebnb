import React from "react";
import { Link } from "react-router-dom";


/** Render all the listings
 *
 * Params:
 * - listings: [{id, title, description, price, zipcode, images}, ...]
 */

function Listings({ listings }) {
  console.log("* Listings %o", listings);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">All listings</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {listings.listings.map((listing) => (
            <div key={listing.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={listing.images[0]}
                  alt={listing.images[0]}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link className="listing" to={`/${listing.id}`} key={listing.id}>
                      {listing.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{listing.description}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{listing.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
}

export default Listings;


/*
 <section className="col-md-4">
          <Card>
            <CardBody>
              <CardTitle className="fw-bold text-center">
                All Listings
              </CardTitle>
              <CardText>
                Browse our listings!
              </CardText>
              <ListGroup>
                {listings.listings.map(({ id, title, zipcode }) => (
                  <Link className="Menu-item" to={`/${id}`} key={id}>
                    <ListGroupItem>{title}</ListGroupItem>
                  </Link>
                ))}
              </ListGroup>
            </CardBody>
          </Card>
        </section>
*/