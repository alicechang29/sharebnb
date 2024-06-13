import { BrowserRouter } from "react-router-dom";
import React from "react";
import { sendFormDataToServer } from "./api/src/api/api";

/** Sharebnb Application
 * FIXME:
 * App
 */

function App() {
  console.debug("App");

  // TODO: ask do we handle upon submit? or in API.js?
  /**Handling submission of image */
  async function handleFormSubmit(evt) {
    evt.preventDefault();
    console.log("!!!!!", evt.target.multifiles.files);
    //FIXME: this is all data, including other form data
    const formData = new FormData();
    formData.append("image", evt.target.image.files[0]);
    //TODO: to handle multiple images, need to append each individually to formData. THIS IS NOT AN ARRAY, FILELIST IS ITS OWN OBJECT
    // formData.append('multi-images', evt.target.multifiles.files);
    formData.append("title", evt.target.title.value);
    formData.append("description", evt.target.description.value);
    formData.append("price", evt.target.price.value);
    formData.append("zipcode", evt.target.zipcode.value);

    console.log("file data", formData);

    // TODO: call API with this data
    try {
      await sendFormDataToServer(formData);
    } catch (err) {
      console.log(err);
    }
  }

  // Set state for all listings

  return (
    <div className="App">
      App Placeholder Input Form
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="title">Listing Title</label>
        <input type="text" name="title"></input>
        <label htmlFor="description">Description</label>
        <input type="text" name="description"></input>
        <label htmlFor="price">Price</label>
        <input type="text" name="price"></input>
        <label htmlFor="zipcode">Zipcode</label>
        <input type="text" name="zipcode"></input>
        <label htmlFor="image">Listing Image</label>
        <input type="file" name="image"></input>
        <input type="file" id="files" name="multifiles" multiple></input>
        <button type="submit">Click Me</button>
      </form>
    </div>
  );
}

export default App;
