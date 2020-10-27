import React, { useContext } from "react";
import { ConnectionContext } from "./ConnectionProvider";
import { Segment, Input } from "semantic-ui-react";

export const ConnectionSearch = () => {
  const { setSearchTerms } = useContext(ConnectionContext);

  return (
    <>
      <Segment>
        <h1 className="text-center">Connected Users</h1>
        <Input
          type="text"
          className="input--wide"
          onKeyUp={(keyEvent) => setSearchTerms(keyEvent.target.value)}
          placeholder="Search for a user... "
        />
      </Segment>
    </>
  );
};
