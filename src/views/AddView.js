import React, { useState, useContext } from "react";
import styled from "styled-components";

import SlidingBar from "../components/generic/SlidingBar";
import Settings from "../components/generic/Settings";
import Panel from "../components/generic/Panel";
import { QueueContext } from "../components/context/QueueContext";

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SettingContainer = styled(Panel)`
  background-color: #0f242e;
  position: relative;
  height: 38em;
  width: 28.1em;
  padding-top: 1em;
`;

const addOptions = ["Stopwatch", "Countdown", "XY", "Tabata"];

const AddView = () => {
  const [tabPos, setTabPos] = useState(1);
  const { addTimer } = useContext(QueueContext);

  return (
    <FlexBox>
      <SlidingBar
        options={addOptions}
        tabPos={tabPos}
        clickHandler={setTabPos}
      />
      <SettingContainer>
        <Settings timerType={addOptions[tabPos - 1]} addHandler={addTimer} />
      </SettingContainer>
    </FlexBox>
  );
};

export default AddView;
