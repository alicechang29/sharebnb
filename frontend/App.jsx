import { BrowserRouter } from "react-router-dom";
import React from "react";
import { sendFormDataToServer } from "./api/src/api/api";

/** Sharebnb Application
 * FIXME:
 * App
 */

function App() {
  console.debug("App");

  /**Handling submission of image */
  async function handleFormSubmit(evt) {
    evt.preventDefault();
    console.log("!!!!!", evt.target.multifiles.files);
    //FIXME: this is all data, including other form data
    const formData = new FormData();
    formData.append('image', evt.target.image.files[0]);
    //TODO: to handle multiple images, need to append each individually to formData. THIS IS NOT AN ARRAY, FILELIST IS ITS OWN OBJECT
    // formData.append('multi-images', evt.target.multifiles.files);
    formData.append('text-test', "hello");

    console.log("file data", formData);

    // TODO: call API with this data
    try {
      await sendFormDataToServer(formData);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      App Placeholder Input Form
      <form onSubmit={handleFormSubmit}>
        <input type="file" name="image"></input>
        <input type="file" id="files" name="multifiles" multiple></input>
        <input type="text" name="text-test"></input>
        <button type="submit">Click Me</button>
      </form>
    </div>
  );
}

export default App;
