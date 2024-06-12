import { BrowserRouter } from "react-router-dom";
import React from "react";
import { sendImageToServer } from "./api/src/api/api";

/** Sharebnb Application
 * FIXME:
 * App
 */

function App() {
  console.debug("App");

  /**Handling submission of image */
  async function handleImgSubmit(evt) {
    evt.preventDefault();
    //FIXME: this is all data, including other form data
    const imageData = new FormData();
    imageData.append('image', evt.target.image.files[0]);
    imageData.append('dummy', "hello");

    console.log("file data", imageData);

    // TODO: call API with this data
    try {
      await sendImageToServer(imageData);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      App Placeholder Input Form
      <form onSubmit={handleImgSubmit}>
        <input type="file" name="image"></input>
        <input type="text" name="dummy"></input>
        <button type="submit">Click Me</button>
      </form>
    </div>
  );
}

export default App;
