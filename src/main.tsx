/** @format */

import * as ReactDOM from "react-dom/client";
import { LoadScript } from "@react-google-maps/api";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <LoadScript googleMapsApiKey={"AIzaSyCJdaGfHZZEt1heuVb5Hpoe6pZLh61UlEA"}>
    {" "}
    <App />
  </LoadScript>
);
