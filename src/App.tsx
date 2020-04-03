import React from "react";
import Routing from "./app.routing";
import { BrowserRouter } from "react-router-dom";
import Listener from "./components/auth/listener";
import Menu from './components/menu/menu';
import Header from "./components/shared/header/header";

function App() {
  return (
    <BrowserRouter>
      <div>
      <Listener/>
        <Header title=""/>
      <Menu />
        <Routing />
      </div>
    </BrowserRouter>
  );
}


export default App;