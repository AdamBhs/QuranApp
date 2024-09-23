// import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./layouts/navbar"
import Home from "./pages/home"


function App() {
  // const [homeLoadingComplete, setHomeLoadingComplete] = useState(false);

  // const handleLoadingComplete = () => {
  //   setHomeLoadingComplete(true);
  // }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
