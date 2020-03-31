import React from "react";
import Routing from "./app.routing";
import { BrowserRouter } from "react-router-dom";
import Listener from "./components/auth/listener";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routing />
        <Listener/>
      </div>
    </BrowserRouter>
  );
}


export default App;