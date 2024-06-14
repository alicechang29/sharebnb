import { useState } from "react";
import React from "react";

const INITIAL_INPUT_DATA = {
  title: "",
  description: "",
  price: "",
  zipcode: "",
};

/**
 * AddListingForm
 *
 * Props:
 * - addListing: function to call in parent
 *
 * State: formData
 * {listing: { title: '', description: '', price: '', zipcode: ''}}
 *
 * App -> { AddListingForm }
 */

function AddListingForm({ addListing }) {
  console.log("AddListingForm");

  const [formData, setFormData] = useState(INITIAL_INPUT_DATA);
  //   const [alertMsg, setAlertMsg] = useState(false);

  /** Call parent function, converts form data id, resets form */
  function handleSubmit(evt) {
    evt.preventDefault();
    console.log("AddListing: handleSubmit");

    const formData = new FormData();

    formData.append("title", evt.target.title.value);
    formData.append("description", evt.target.description.value);
    formData.append("price", evt.target.price.value);
    formData.append("zipcode", evt.target.zipcode.value);
    formData.append("image", evt.target.image.files[0]);

    //TODO: to handle multiple images, need to append each individually to formData. THIS IS NOT AN ARRAY, FILELIST IS ITS OWN OBJECT
    // formData.append('multi-images', evt.target.multifiles.files);

    console.log("formData:", formData);

    addListing(formData);

    setFormData(INITIAL_INPUT_DATA);

    // updateAlertMsg(true);
  }

  /** FIXME: Update non-numeric form inputs. */
  function handleChange(evt) {
    const { name, value } = evt.target;

    if (name === "type") {
      setFormData((currData) => ({
        ...currData,
        [name]: value,
      }));
    } else {
      setFormData((currData) => ({
        ...currData,
        menuItem: { ...currData.menuItem, [name]: value },
      }));
    }

    updateAlertMsg(false);
  }

  /** FIXME:Sets state of AlertMsg */
  function updateAlertMsg(status) {
    setAlertMsg(status);
  }

  return (
    <div className="AddListingForm">
      <h1>Add Listing</h1>
      <form onSubmit={handleSubmit}>
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

export default AddListingForm;
