import { Card, CardBody, CardTitle } from "reactstrap";
import React from "react";
import "./Home.css";

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
    <div className="Home">
      <h1 className="text-3xl font-bold underline Home">ShareBnb</h1>
    </div>
  );
}

export default Home;
