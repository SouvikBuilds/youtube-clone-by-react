import React, { useState } from "react";
import logo from "../../assets/logo.png";
import menu from "../../assets/menu.png";
import search from "../../assets/search.png";
import upload_icon from "../../assets/upload.png";
import more_icon from "../../assets/more.png";
import notification_icon from "../../assets/notification.png";
import profile_icon from "../../assets/jack.png";
import { NavLink, useNavigate } from "react-router-dom";
import API_KEY from "../../data.js";

const images = [
  {
    id: 1,
    image: upload_icon,
  },
  {
    id: 2,
    image: more_icon,
  },
  {
    id: 3,
    image: notification_icon,
  },
  {
    id: 4,
    image: profile_icon,
  },
];

const Navbar = ({ toggleSideBar, setSearchData }) => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const getSearchData = async () => {
    if (!searchInput.trim()) return;

    const searchApiUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchInput.toLowerCase()}&type=video,channel,playlist&key=${API_KEY}`;
    try {
      const response = await fetch(searchApiUrl);
      const data = await response.json();
      setSearchData(data.items);
      console.log(data.items);
      navigate(`/search/${encodeURIComponent(searchInput)}`);
      setSearchInput("");
    } catch (error) {
      console.error("Error At Getting Searched Data: ", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      getSearchData();
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white">
      <nav className="navbar flex flex-row items-center justify-between p-4 shadow">
        <div className="logoSection flex flex-row items-center gap-4">
          <img
            src={menu}
            alt="Menu Not Found"
            className="w-8 cursor-pointer menu-icon"
            onClick={() => {
              toggleSideBar();
            }}
          />
          <NavLink to={"/"}>
            <img
              src={logo}
              alt="Logo Not Found"
              className="w-[130px] cursor-pointer"
            />
          </NavLink>
        </div>

        <div className="middleSection flex flex-row items-center gap-2">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search..."
            onKeyDown={handleKeyPress}
            className="w-[400px] px-5 py-2 rounded-xl border border-[#808484] focus:outline-none relative"
          />
          <img
            src={search}
            onClick={getSearchData}
            alt="Search Not Found"
            className="w-7 cursor-pointer absolute ml-[22.5rem]"
          />
        </div>

        <div className="rightSection flex flex-row items-center gap-4">
          {images.map((image) => {
            return (
              <img
                src={image.image}
                alt="Image Not Found"
                key={image.id}
                className={`${
                  image.id === 4
                    ? "w-8 cursor-pointer rounded-full"
                    : "w-8 cursor-pointer"
                }`}
              />
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
