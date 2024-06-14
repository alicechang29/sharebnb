import { Card, CardBody, CardTitle, CardText } from "reactstrap";
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
    <section className="Item">
      <Card>
        <CardBody>
          <CardTitle className="fw-bold text-center">{title}</CardTitle>
          <CardText className="font-italic">{description}</CardText>
          <p>{price}/night</p>
          <p>Located in: {zipcode}</p>
        </CardBody>
      </Card>
    </section>
  );
}

export default ListingCard;
