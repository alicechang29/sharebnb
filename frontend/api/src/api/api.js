
/** Sends image data to Flask server*/
async function sendFormDataToServer(image) {
  console.log("addImageToS3", image);
  const resp = await fetch('http://localhost:5001/api/images', {
    method: "POST",
    header: {
      'Content-Type': 'multipart/form-data'
    },
    body: image
  }
  );
  const apiData = await resp.json();

  console.log({ apiData });

}

// TODO: add function for fetching listing data

export { sendFormDataToServer };

