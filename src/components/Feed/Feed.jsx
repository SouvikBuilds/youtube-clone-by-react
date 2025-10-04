import React, { useEffect, useState } from "react";
import thumbnail1 from "../../assets/thumbnail1.png";
import thumbnail2 from "../../assets/thumbnail2.png";
import thumbnail3 from "../../assets/thumbnail3.png";
import thumbnail4 from "../../assets/thumbnail4.png";
import thumbnail5 from "../../assets/thumbnail5.png";
import thumbnail6 from "../../assets/thumbnail6.png";
import thumbnail7 from "../../assets/thumbnail7.png";
import thumbnail8 from "../../assets/thumbnail8.png";
import react from "../../assets/react.jpg";
import { NavLink } from "react-router-dom";
import API_KEY from "../../data.js";
import { valueConverter } from "../../data.js";
import moment from "moment";
const Feed = ({ isSidebarCollapsed = false, category }) => {
  const cardFields = [
    {
      id: 1,
      category: "Coding",
      thumbnail: thumbnail1,
      description:
        "Best Channel To Learn Coding,that help you to be a web developer.",
      channelName: "Greatstack",
      others: "15k views ; 2 days ago",
    },
    {
      id: 2,
      category: "Music",
      thumbnail: thumbnail2,
      description:
        "Best Channel To Learn Coding,that help you to be a web developer.",
      channelName: "Greatstack",
      others: "15k views ; 2 days ago",
    },
    {
      id: 3,
      category: "Dance",
      thumbnail: thumbnail3,
      description:
        "Best Channel To Learn Coding,that help you to be a web developer.",
      channelName: "Greatstack",
      others: "15k views ; 2 days ago",
    },
    {
      id: 4,
      category: "Coding",
      thumbnail: thumbnail4,
      description:
        "Best Channel To Learn Coding,that help you to be a web developer.",
      channelName: "Greatstack",
      others: "15k views ; 2 days ago",
    },
    {
      id: 5,
      category: "Web Dev",
      thumbnail: thumbnail5,
      description:
        "Best Channel To Learn Coding,that help you to be a web developer.",
      channelName: "Greatstack",
      others: "15k views ; 2 days ago",
    },
    {
      id: 6,
      category: "Sports",
      thumbnail: thumbnail6,
      description:
        "Best Channel To Learn Coding,that help you to be a web developer.",
      channelName: "Greatstack",
      others: "15k views ; 2 days ago",
    },
    {
      id: 7,
      category: "Travel",
      thumbnail: thumbnail7,
      description:
        "Best Channel To Learn Coding,that help you to be a web developer.",
      channelName: "Greatstack",
      others: "15k views ; 2 days ago",
    },
    {
      id: 8,
      category: "Gaming",
      thumbnail: thumbnail8,
      description:
        "Best Channel To Learn Coding,that help you to be a web developer.",
      channelName: "Greatstack",
      others: "15k views ; 2 days ago",
    },
    {
      id: 9,
      category: "Automobiles",
      thumbnail: react,
      description:
        "Best Channel To Learn React,that help you to be a web developer.",
      channelName: "Chai Aur Code",
      others: "15k views ; 2 days ago",
    },
    // Adding more cards to demonstrate scrolling
    {
      id: 10,
      category: "Fighting",
      thumbnail: thumbnail1,
      description: "Advanced React Tutorial - Building Modern Applications",
      channelName: "Greatstack",
      others: "25k views ; 1 day ago",
    },
    {
      id: 11,
      category: "Muay Thai",
      thumbnail: thumbnail2,
      description: "JavaScript ES6+ Features You Must Know",
      channelName: "Coding Academy",
      others: "18k views ; 3 days ago",
    },
    {
      id: 12,
      category: "MMA",
      thumbnail: thumbnail3,
      description: "Full Stack Development Roadmap 2024",
      channelName: "Tech Career",
      others: "32k views ; 1 week ago",
    },
  ];

  const [data, setData] = useState([]);
  const fetchData = async () => {
    const videoListUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=150&regionCode=US&videoCategoryId=${category}&key=${API_KEY} `;
    try {
      const response = await fetch(videoListUrl);
      const data = await response.json();
      setData(data.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);
  return (
    <div
      className={`fixed top-0 right-0 bottom-0 overflow-y-auto bg-gray-50 transition-all duration-300 ${
        isSidebarCollapsed ? "ml-[-1%]" : ""
      }`}
      style={{
        left: isSidebarCollapsed ? "5%" : "15%",
        width: isSidebarCollapsed ? "95%" : "85%",
      }}
    >
      {/* Content starts below navbar */}
      <div className="pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
          {data.map((item, index) => {
            return (
              <NavLink
                to={`/videos/${item.snippet.categoryId}/${item.id}`}
                className="card-container flex flex-col gap-2 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                key={index}
              >
                <div className="relative">
                  <img
                    src={item.snippet.thumbnails.medium.url}
                    alt="Thumbnail Not Found"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-sm font-medium text-black line-clamp-2 mb-2">
                    {item.snippet.title}
                  </h2>
                  <h3 className="text-sm text-[#808484] font-medium mb-1">
                    {item.snippet.channelTitle}
                  </h3>
                  <p className="text-sm text-[#808484]">
                    {valueConverter(item.statistics.viewCount)} views .{" "}
                    {moment(item.snippet.publishedAt).fromNow()}
                  </p>
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Feed;
