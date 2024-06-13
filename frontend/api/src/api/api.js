
/** Sends image data to Flask server*/
async function sendFormDataToServer(formData) {
  console.log("add data server", formData);

  //FIXME:  do a try - return an ok message
  //catch - return the err and have the front end handle the error

  //FIXME: need to update the BASE_URL HERE
  const resp = await fetch('http://localhost:5001/add-listing', {
    method: "POST",
    header: {
      'Content-Type': 'multipart/form-data'
    },
    body: formData
  }
  );
  const apiData = await resp.json();

  console.log({ apiData });

}

// TODO: add function for fetching listing data

export { sendFormDataToServer };



// TODO: function for calling get route, no need from props