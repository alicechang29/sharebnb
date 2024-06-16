import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PhotoIcon } from "@heroicons/react/24/solid";

const INITIAL_INPUT_DATA = {
  title: "",
  description: "",
  price: "",
  zipcode: "",
  image: null
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

  const navigate = useNavigate();

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log("AddListing: handleSubmit");

    const submissionData = new FormData();

    submissionData.append("title", formData.title);
    submissionData.append("description", formData.description);
    submissionData.append("price", formData.price);
    submissionData.append("zipcode", formData.zipcode);
    submissionData.append("image", formData.image);


    //TODO: to handle multiple images, need to append each individually to formData.
    //THIS IS NOT AN ARRAY, FILELIST IS ITS OWN OBJECT
    // formData.append('multi-images', evt.target.multifiles.files);

    console.log("formData:", submissionData);

    addListing(submissionData);

    setFormData(INITIAL_INPUT_DATA);

    navigate("/listings");

  }

  /** Update formData state */
  function handleChange(evt) {
    const { name, value, files } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: files ? files[0] : value
    }));
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
                    required
                    onChange={handleChange}
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
                required
                onChange={handleChange}
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
                    type="number"
                    name="price"
                    id="price"
                    onChange={handleChange}
                    required
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
                    maxLength={10}
                    onChange={handleChange}
                    required
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
                    <input
                      id="image"
                      name="image"
                      type="file"
                      onChange={handleChange}
                      required />
                  </label>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, JPEG
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
