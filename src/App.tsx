import React, { Fragment } from "react";
import "./App.scss";
import { TextEditor } from "./components/TextEditor/TextEditor";

function App() {
  return (
    <Fragment>
      <div className="App">
        <TextEditor />
      </div>
      <div className="mobileMessage">
        <h1>Ops!</h1>
        <p>
          Looks like you're trying to access from a mobile device! Sorry but we
          recommend access from a desktop for a better experience!
        </p>
      </div>
    </Fragment>
  );
}

export default App;
