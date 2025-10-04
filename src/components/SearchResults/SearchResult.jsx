import React from "react";
import { useOutletContext, useParams, NavLink } from "react-router-dom";

const SearchResult = () => {
  const { searchData } = useOutletContext();
  const { query } = useParams();

  if (!searchData || searchData.length === 0) {
    return (
      <div className="mt-24 p-8 text-center">
        <p className="text-gray-500 text-lg">
          No results found for "{decodeURIComponent(query)}"
        </p>
      </div>
    );
  }

  const renderSearchItem = (item) => {
    const { id, snippet } = item;

    // Determine the type and create appropriate link
    let linkTo = "";
    let badge = "";

    if (id.videoId) {
      linkTo = `/videos/0/${id.videoId}`;
      badge = "Video";
    } else if (id.channelId) {
      linkTo = `/channel/${id.channelId}`;
      badge = "Channel";
    } else if (id.playlistId) {
      linkTo = `/playlist/${id.playlistId}`;
      badge = "Playlist";
    }

    return (
      <NavLink
        to={linkTo}
        key={id.videoId || id.channelId || id.playlistId}
        className="flex gap-4 p-4 hover:bg-gray-100 rounded-lg transition relative"
      >
        {/* Badge to show type */}
        <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
          {badge}
        </span>

        <img
          src={snippet.thumbnails.medium.url}
          alt={snippet.title}
          className={`${
            id.channelId
              ? "w-36 h-36 rounded-full object-cover flex-shrink-0"
              : "w-60 h-36 object-cover rounded-lg flex-shrink-0"
          }`}
        />
        <div className="flex-1">
          <h3 className="font-semibold text-lg line-clamp-2 mb-2">
            {snippet.title}
          </h3>
          <p className="text-gray-600 text-sm mb-2">{snippet.channelTitle}</p>
          <p className="text-gray-500 text-sm line-clamp-2">
            {snippet.description}
          </p>
          {id.channelId && (
            <p className="text-gray-400 text-xs mt-2">Click to view channel</p>
          )}
          {id.playlistId && (
            <p className="text-gray-400 text-xs mt-2">Click to view playlist</p>
          )}
        </div>
      </NavLink>
    );
  };

  return (
    <div className="mt-24 p-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">
        Search results for "{decodeURIComponent(query)}"
      </h2>
      <div className="flex flex-col gap-4">
        {searchData.map((item) => renderSearchItem(item))}
      </div>
    </div>
  );
};

export default SearchResult;
