import React, { useState, useContext } from "react";
import styled from "styled-components";

import SlidingBar from "../components/generic/SlidingBar";
import Settings from "../components/generic/Settings";
import Panel from "../components/generic/Panel";
import { QueueContext } from "../components/context/QueueContext";
import FadeIn from "../components/generic/FadeIn";
import SquareButton from "../components/generic/SquareButton";
import { useHistory } from "react-router-dom";

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${FadeIn} 0.5s ease;
  animation-fill-mode: forwards;
`;

const SettingContainer = styled(Panel)`
  background-color: #0f242e;
  position: relative;
  height: 38em;
  width: 28.1em;
  padding-top: 1em;

  @media (max-width: 1900px) {
    font-size: 14px;
  }

  @media (max-width: 1600px) {
    font-size: 13px;
  }

  @media (max-width: 1200px) {
    font-size: 12px;
  }
`;

const addOptions = ["Stopwatch", "Countdown", "XY", "Tabata"];

const AddView = () => {
  const [tabPos, setTabPos] = useState(1);
  const { addTimer } = useContext(QueueContext);
  const history = useHistory();

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
      <SquareButton
        type={"Back"}
        enterFrom={"Left"}
        clickHandler={() => history.push("/")}
      />
    </FlexBox>
  );
};

export default AddView;
