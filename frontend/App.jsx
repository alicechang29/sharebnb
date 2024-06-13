import { BrowserRouter } from "react-router-dom";
import React from "react";
// TODO: import NavBar from "./routes-nav/NavBar.jsx";
import RoutesList from "./components/RoutesList.jsx";
import ShareBnBAPI from "./api/src/api/api";

/** Sharebnb Application
 *
 * App -> { NavBar, RoutesList}
 */

function App() {
  console.debug("App");

  /**Handling submission of listing */
  async function addListing(formData) {
    try {
      await ShareBnBAPI.sendFormDataToServer(formData);
    } catch (err) {
      console.log(err);
    }
  }

  // Set state for all listings

  return (
    <BrowserRouter>
      <div className="App">
        <RoutesList addListing={addListing} />
      </div>
    </BrowserRouter>
  );
}

export default App;
