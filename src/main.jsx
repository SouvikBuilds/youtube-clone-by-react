import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home/Home.jsx";
import Video from "./pages/Video/Video.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchResult from "./components/SearchResults/SearchResult.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/videos/:categoryId/:videoId",
        element: <Video />,
      },
      {
        path: "/search/:query",
        element: <SearchResult />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
