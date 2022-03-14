import React, { useState, useEffect } from "react";
import axios from "axios";
import Comments from "./Comments";
import { Button } from "semantic-ui-react";
import { Form } from "semantic-ui-react";
import image1 from "../image/unnamed.png";
require("dotenv").config();

const CommentAnalyst = ({ videoId, currentVideo, show, setShow }) => {
  const [comments, setComments] = useState([]);
  const [word, setWord] = useState([]);
  const [id, setId] = useState();
  const [firstComment, setFirstComment] = useState("");
  //const [token, setToken] = useState();
  const [mostFrequentWords, setMostFrequentWords] = useState([]);

  let words = "";
  let br = 16;

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
    // pageToken: token,
    textFormat: "plainText",
    order: "relevance",
  };

  useEffect(() => {
    axios
      .get(url, { params }, { headers }, { withCredentials: true })
      .then((response) => {
        // ID and firstComment used for displaying comments on line: 82
        setId({
          ID: response.data.items[0].snippet.videoId,
        });
        setFirstComment(
          response.data.items[0].snippet.topLevelComment.snippet.textDispaly
        );
        //setToken(response.data.nextPageToken);
        setComments(
          response.data.items.map((item) => {
            return {
              text: item.snippet.topLevelComment.snippet.textDisplay,
              likes: item.snippet.topLevelComment.snippet.likeCount,
              auth: item.snippet.topLevelComment.snippet.authorDisplayName,
              image:
                item.snippet.topLevelComment.snippet.authorProfileImageUrl ||
                image1,
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
        return response.data.items;
      })
      .catch((reason) => {
        console.log(reason);
        return setComments([]);
      });
  }, [currentVideo]);

  useEffect(() => {
    words = word.toString().toLowerCase();
    setMostFrequentWords(mostFrequentWord(words, br));
  }, [word]);
  useEffect(() => {
    setWord(
      comments.map((item) => {
        return item.text;
      })
    );
  }, [comments]);

  const mostFrequentWord = (words = " ", br = 1) => {
    let arr = words.split(" ");
    arr = arr.filter(function (str) {
      return str.length > 3;
    });
    const map = {};
    for (let i = 0; i < words.length; i++) {
      if (arr[i] in map) {
        map[arr[i]]++;
      } else {
        map[arr[i]] = 1;
      }
    }
    const arrFreq = Object.keys(map).map((key) => [key, map[key]]);
    arrFreq.sort((a, b) => b[1] - a[1]);
    return arrFreq.slice(1, br).map((el) => " " + el[0] + ": " + el[1]);
  };

  return (
    <div className="Comment-analyst">
      &nbsp;
      <div>
        <Button primary onClick={() => setShow(!show)}>
          Analyze Comments
        </Button>
      </div>
      &nbsp;
      {typeof id !== "undefined" ? (
        <div>
          {id.ID === videoId && firstComment !== "" ? (
            <>
              <p>{show && ` Most frequent words are: `}</p>
              <div className="frequent">
                {show &&
                  mostFrequentWords.map((item, i) => {
                    return (
                      <p id="frequent-item" key={i}>
                        {item}
                      </p>
                    );
                  })}
              </div>
              <Comments comments={comments} />
            </>
          ) : firstComment ? (
            `There is no comments`
          ) : (
            <Form loading />
          )}
        </div>
      ) : (
        <Form loading />
      )}
    </div>
  );
};

export default CommentAnalyst;
