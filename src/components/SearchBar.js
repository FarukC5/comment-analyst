import React, { useState } from "react";
import { Button, Input, Segment, Header } from "semantic-ui-react";

function SearchBar(props) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.search(text);
  };

  return (
    <Segment className="Search-bar" id="search-bar">
      <Header id="search-bar-text" as="h2">
        Video Browser
      </Header>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
          placeholder="Search video"
          type="text"
          name="search"
          id="search"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            props.searching(e.target.value);
          }}
        />
        &nbsp; &nbsp;
        <Button
          type="submit"
          inverted
          color="red"
          id="primary-btn"
          icon={{
            name: "search",
          }}
        />
      </form>
    </Segment>
  );
}

export default SearchBar;
