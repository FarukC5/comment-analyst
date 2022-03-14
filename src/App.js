import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import "./components/Components.css";
import SearchBar from "./components/SearchBar";
import VideoDetail from "./components/Body";
import VideoList from "./components/Body/VideoList";
require("dotenv").config();

function App() {
  const [search, setSearch] = useState();
  const [data, setData] = useState([]);
  const [currentVideo, setCurrentVideo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);

  const searchData = (text) => {
    setSearch(text);
    axios
      .get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          q: search,
          maxResults: 5,
          key: process.env.REACT_APP_API_KEY,
          part: "snippet",
        },
      })
      .then((videos) => {
        setData(videos.data.items);
        setCurrentVideo(videos.data.items[0]);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    searchData("");
    // eslint-disable-next-line
  }, []);

  const changeCurrentVideo = (video) => {
    setCurrentVideo(video);
    setShow(false);
  };

  return (
    <div className="App">
      <SearchBar
        search={searchData}
        searching={setSearch}
        setShow={setShow}
        show={show}
      />
      <div className="App-header">
        <VideoDetail
          currentVideo={currentVideo}
          isLoading={isLoading}
          videos={data}
          changeCurrentVideo={changeCurrentVideo}
          show={show}
          setShow={setShow}
        />
        <VideoList videos={data} changeCurrentVideo={changeCurrentVideo} />
      </div>
    </div>
  );
}

export default App;
