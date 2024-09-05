import React from "react"
import ReactDOM from "react-dom/client"

import { Graz } from "./Graz"

const outlet = document.getElementById("root")

if (outlet) {
  ReactDOM.createRoot(outlet).render(
    <React.StrictMode>
      <Graz />
    </React.StrictMode>,
  )
}
