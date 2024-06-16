/** API calls for ShareBnB.
 *
 * Static class tying together methods used to get/send to the API.
 */


class ShareBnBAPI {

  static base_api_url = "http://localhost:5001"; //TODO: update to .env base url

  /** Sends image data to Flask server*/
  static async sendFormDataToServer(formData) {
    console.log("sendFormDataToServer", formData);

    //FIXME:  do a try & catch - return the err and have the front end handle the error

    //FIXME: need to update the BASE_URL HERE
    const resp = await fetch(`${this.base_api_url}/add-listing`, {
      method: "POST",
      header: {
        'Content-Type': 'multipart/form-data'
      },
      body: formData
    });
    const apiData = await resp.json();
    console.log({ apiData });
  }

  /** getAllListings
   * Fetch list of listings
   * [{id, host_username, title, description, price, zipcode}, ...]
   **/

  static async getAllListings() {
    console.log("getListings");
    const response = await fetch(`${this.base_api_url}/listings`);
    return await response.json();
  }

  /** getListing
   * Fetch a single listing
   * {id, host_username, title, description, price, zipcode}
   **/
  static async getListing(id) {
    console.log("getListing");
    const response = await fetch(`${this.base_api_url}/listings/${id}`);
    return await response.json();
  }
}


export default ShareBnBAPI;



