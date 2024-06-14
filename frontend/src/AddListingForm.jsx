import { useState } from "react";
import React from "react";

import { PhotoIcon } from "@heroicons/react/24/solid";

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
    <form className="AddListingForm w-4/5 mx-auto"
      style={{ width: '80%', margin: '0 auto' }}
      onSubmit={handleSubmit}>
      <div className="space-y-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Add Listing
        </h2>
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Listing Title
              </label>{" "}
              <input
                type="text"
                name="title"
                id="title"
                autoComplete="title"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Title"
              />
            </div>
          </div>
        </div>

        <div className="col-span-full">
          <label
            htmlFor="description"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Description
          </label>
          <div className="mt-2">
            <textarea
              id="description"
              name="description"
              rows={3}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue={""}
            />
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Additional Listing Information
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="price"
                  id="price"
                  autoComplete="$1,000"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="zipcode"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="zipcode"
                  id="zipcode"
                  autoComplete="zipcode"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-full">
          <label
            htmlFor="image"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Listing Image
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">

              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    className="sr-only"
                  />
                </label>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>

        <button type="submit" style={
          {
            backgroundColor: '#4A90E2',
            color: 'white', padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer'
          }
        }>
          Add Listing
        </button>
      </div>
    </form>

  );
}

export default AddListingForm;
