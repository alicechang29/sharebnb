import { BrowserRouter } from "react-router-dom";
import React from "react";

/** Jobly application.
 *
 * App -> { Navigation, Routes }
 */

function App() {
  console.debug("App");

  function handleImgSubmit(evt) {
    evt.preventDefault();
    const imageData = new FormData();
    imageData["image"] = evt.target.image.files[0];

    console.log("file data", imageData);

    // TODO: call API with this data
    return imageData;
    // const body = {

    // }

    // const url = ""

    // const response = fetch(url, {method, body, headers})
  }

  return (
    <div className="App">
      App Placeholder Input Form
      <form onSubmit={handleImgSubmit}>
        <input type="file" name="image"></input>
        <button type="submit">Click Me</button>
      </form>
    </div>
  );
}

export default App;
