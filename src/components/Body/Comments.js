import React from "react";
import image1 from "../image/unnamed.png";

const Comments = ({ comments }) => {
  return (
    <div className="Comments-main-container">
      {comments !== undefined && (
        <div className="Comments-container">
          {comments.map((item, index) => (
            <div className="Comments-subContainer" key={index}>
              <div>
                <img alt="" src={item.image || image1} />
              </div>
              <div className="text-container">
                <h4 id="auth">{item.auth}</h4>
                <p id="text">{item.text}</p>
                <div className="likes" style={{ marginTop: "5px" }}>
                  <div style={{ fontSize: "" }}>
                    <p>
                      {" "}
                      {item.date} &nbsp;{item.time}{" "}
                    </p>
                  </div>
                  {item.likes > 0 && (
                    <div className="thumbUp" style={{ background: "" }}>
                      <p className="thumb-up"> 👍</p>{" "}
                      <p id="like">{item.likes} </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;
