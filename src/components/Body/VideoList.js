import React from "react";
import VideoItem from "./VideoItem";

const VideoList = ({ videos, changeCurrentVideo }) => {
  return (
    <div className="Video-item-container">
      <h4>More Videos</h4>
      <div className="Video-item-list">
        {videos.map((video) => (
          <VideoItem
          key={video.snippet.publishedAt}
            video={video}
            changeCurrentVideo={changeCurrentVideo}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoList;
