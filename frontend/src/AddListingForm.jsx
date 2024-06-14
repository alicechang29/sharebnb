import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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

    navigate("/listings");
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
    <div className="pt-5 pb-20">
      <form className="AddListingForm w-3/4 m-auto" onSubmit={handleSubmit}>
        <div className="space-y-12">
          <h1 className="text-base font-semibold leading-7 text-gray-900 ml-auto mr-auto text-center">
            Add Listing
          </h1>
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Listing Title
                </label>{" "}
                <div className="mt-2">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    autoComplete="title"
                    className="block flex-1 rounded-md border-1 border-slate-300 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Joshua Tree Sky House"
                  />
                </div>
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
                className="block w-full rounded-md border-1 border-slate-300 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    className="block w-full rounded-md border-1 border-slate-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
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
                    className="block w-full rounded-md border-1 border-slate-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                <PhotoIcon
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <input id="image" name="image" type="file" className="" />
                  </label>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddListingForm;
