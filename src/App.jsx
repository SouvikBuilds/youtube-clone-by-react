import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";

function App() {
  const [isAlternateSidebar, setIsAlternateSidebar] = useState(false);
  const [searchData, setSearchData] = useState([]);

  const toggleSideBar = () => {
    setIsAlternateSidebar((prev) => !prev);
    console.log("Menu Butoon CLicked");
  };

  return (
    <>
      <Navbar toggleSideBar={toggleSideBar} setSearchData={setSearchData} />

      <Outlet context={(isAlternateSidebar, searchData)} />
    </>
  );
}

export default App;
