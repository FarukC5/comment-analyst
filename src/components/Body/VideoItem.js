import React from "react";
import { Item } from "semantic-ui-react";

const VideoItem = ({ video, changeCurrentVideo }) => {
  return (
    <Item.Group
      id="video-item"
      key={video.id.videoId}
      className="Video-item"
      onClick={() => changeCurrentVideo(video)}
    >
      <Item id="item-image">
        <Item.Image
          id="video-item-image"
          size="small"
          className="Video-item-image"
          src={video.snippet.thumbnails.default.url}
          alt={video.snippet.title}
        />
        <Item.Content id="item-content">
          <Item.Description id="item-description">
            <p id="p1">{video.snippet.title}</p>
            <p id="p2">{video.snippet.channelTitle}</p>
          </Item.Description>
        </Item.Content>
      </Item>
    </Item.Group>
  );
};

export default VideoItem;
