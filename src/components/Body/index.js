import React from "react";
import VideoPlayer from "./VideoPlayer";

const VideoDetail = ({
  currentVideo,
  isLoading,
}) => {
  return (
    <div className="Video-detail">
      <VideoPlayer currentVideo={currentVideo} isLoading={isLoading} />
    </div>
  );
};

export default VideoDetail;
