/** @format */

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { LoadScript } from "@react-google-maps/api";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LoadScript googleMapsApiKey={'AIzaSyCJdaGfHZZEt1heuVb5Hpoe6pZLh61UlEA'}>
      {" "}
      <App />
    </LoadScript>
  </React.StrictMode>
);
