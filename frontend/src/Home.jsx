import { Card, CardBody, CardTitle } from "reactstrap";
import React from "react";
import "./Home.css";
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
      <div className="Home-title-container">
        <div className="text-center">
          <h1 className="text-3xl font-bold ">ShareBnb</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Online marketplace that connects people looking for short-term or
            long-term accommodations with people who want to rent out their
            homes or other properties.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
