import { Card, CardBody, CardTitle } from "reactstrap";
import React from "react";

/** Homepage
 *
 * Props:
 * listings: [{listing}, {listing}]
 *
 * State: none
 *
 * App -> { Home }
 */

function Home() {
  console.log("* Home");

  return (
    <h1 className="text-3xl font-bold underline Home">
      ShareBnb
    </h1>
  );
}

export default Home;
