import React from "react";
import { Form } from "semantic-ui-react";
import CommentAnalyst from "./CommentAnalyst";

const VideoPlayer = ({ currentVideo, isLoading, show, setShow }) => {
  return (
    <div className="Video-player">
      <h5>-</h5>
      {isLoading ? (
        <div style={{ padding: "20px", height: "400px" }}>
          <p>Video Loading</p>
          &nbsp;
          <Form loading />
          &nbsp;
        </div>
      ) : (
        <>
          <iframe
            width="100%"
            height="39%"
            src={`https://www.youtube.com/embed/${currentVideo.id.videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={currentVideo.id.videoId}
          />
          <h4>{currentVideo.snippet.title}</h4>
          <p>{currentVideo.snippet.description}</p>
          <div className="add">
            <CommentAnalyst
              videoId={currentVideo.id.videoId}
              currentVideo={currentVideo}
              show={show}
              setShow={setShow}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
