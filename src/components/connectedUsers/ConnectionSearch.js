import React, { useContext } from "react";
import { ConnectionContext } from "./ConnectionProvider";
import { Segment, Input, Header } from "semantic-ui-react";

export const ConnectionSearch = () => {
  const { setSearchTerms } = useContext(ConnectionContext);

  return (
    <>
      <Segment basic style={{width: "60%"} }>
        <Header as='h4'>Connect with Users To Share Locations, Items and More!</Header>
        <Input
          type="text"
          fluid
          className="input--wide"
          onKeyUp={(keyEvent) => setSearchTerms(keyEvent.target.value)}
          placeholder="Search for a user to connect with... "
          style={{margin: "0em -0.75em"}}
        />
      </Segment>
    </>
  );
};
