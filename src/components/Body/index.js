import React from "react";
import VideoPlayer from "./VideoPlayer";

const VideoDetail = ({
  currentVideo,
  isLoading,
  show,
  setShow,
}) => {
  return (
    <div className="Video-detail">
      <VideoPlayer currentVideo={currentVideo} isLoading={isLoading} show={show} setShow={setShow} />
    </div>
  );
};

export default VideoDetail;
