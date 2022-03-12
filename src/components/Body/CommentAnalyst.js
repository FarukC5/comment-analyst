import React, { useState } from "react";
import axios from "axios";
import Comments from "./Comments";
import { Button } from "semantic-ui-react";
import image1 from "../image/unnamed.png";
require("dotenv").config();

const CommentAnalyst = ({ videoId }) => {
  const [comments, setComments] = useState();
  const [id, setId] = useState();
  const [firstComment, setFirstComment] = useState("");
  const [token, setToken] = useState();

  const url = `https://youtube.googleapis.com/youtube/v3/commentThreads`;
  
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const params = {
    part: "snippet",
    maxResults: 100,
    key: process.env.REACT_APP_API_KEY,
    videoId: videoId,
    pageToken: token,
  };

  const getComments = () => {
    axios
      .get(url, { params }, { headers }, { withCredentials: true })
      .then((response) => {
        setToken(response.data.nextPageToken);
       // ID and firstComment used for displaying comments on line: 82
        setId({
          ID: response.data.items[0].snippet.videoId,
        });
        setFirstComment(
          response.data.items[0].snippet.topLevelComment.snippet.textDispaly
        );

        setComments(
          response.data.items.map((item) => {
            return {
              text: item.snippet.topLevelComment.snippet.textDisplay
                .split(/\s+/)
                .slice(0, 15)
                .join(" "),
              likes: item.snippet.topLevelComment.snippet.likeCount,
              auth: item.snippet.topLevelComment.snippet.authorDisplayName,
              image:
                item.snippet.topLevelComment.snippet.authorProfileImageUrl || image1,
              date: item.snippet.topLevelComment.snippet.publishedAt.substring(
                0,
                10
              ),
              time: item.snippet.topLevelComment.snippet.publishedAt.substring(
                11,
                16
              ),
            };
          })
        );
        // return response.data.items;
      })
      .catch((reason) => {
        console.log(reason);
        return false;
      });
  };

  return (
    <div className="Comment-analyst">
      <div>
        <Button primary onClick={getComments}>
          Analyze Comments
        </Button>
      </div>
      &nbsp;
      {typeof id !== "undefined" ? (
        <div>
          {id.ID === videoId && firstComment !== "" ? (
            <Comments comments={comments} />
          ) : (
            "There is no comments" 
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CommentAnalyst;
