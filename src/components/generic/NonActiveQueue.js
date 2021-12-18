import React from "react";
import styled from "styled-components";

import Panel from "./Panel";
import Label from "./Label";
import QueueOverview from "./QueueOverview";

const TitlePanel = styled(Panel)`
  background-color: #0f242e;
  padding-left: 4em;
  padding-right: 4em;
  padding-top: 1em;
  padding-bottom: 1em;
  @media (max-width: 1200px) {
    font-size: 14px;
  }
`;

const SubTitle = styled(Label)`
  font-size: 1.8em;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media (min-width: 1600px) {
    width: 80%;
  }
  @media (min-width: 1900px) {
    width: 70%;
  }
`;

const NonActiveQueue = () => {
  return (
    <Flex>
      <TitlePanel>
        <Label>Workout Queue</Label>
        <div>
          <SubTitle>Total Time:</SubTitle>
        </div>
      </TitlePanel>
      <QueueOverview></QueueOverview>
    </Flex>
  );
};

export default NonActiveQueue;
