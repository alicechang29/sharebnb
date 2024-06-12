import { BrowserRouter } from "react-router-dom";

/** Jobly application.
 *
 * App -> { Navigation, Routes }
 */

function App() {
  console.debug("App");

  function handleImgSubmit(evt) {
    evt.preventDefault();
    console.log("click event", evt.target.image);

    // const body = {

    // }

    // const url = ""

    // const response = fetch(url, {method, body, headers})
  }

  return (
    <div className="App">
      App Placeholder Input Form
      <form onSubmit={handleImgSubmit}>
        <input type="file" name="image"></input>
        <button type="submit">Click Me</button>
      </form>
    </div>
  );
}

export default App;
