import React, { useState, useContext } from "react";
import styled from "styled-components";

import SlidingBar from "./SlidingBar";
import Timer from "../timers/Timer";
import { QueueContext } from "../context/QueueContext";
import TimerProvider from "../context/TimerContext";
import SquareButton from "./SquareButton";

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ActiveQueue = ({ editHandler }) => {
  const { getTimers } = useContext(QueueContext);
  const [currPos, setCurrPos] = useState(0);

  //Creates an array of timers for the current page in queue
  const getSlidingBarOptions = () => {
    const timers = getTimers(currPos, 4);

    return timers.map((timer) => {
      return timer.timerType;
    });
  };

  return (
    <FlexBox>
      <TimerProvider>
        <SlidingBar options={getSlidingBarOptions()} tabPos={currPos + 1} />
        <Timer />
      </TimerProvider>
      <SquareButton
        type={"Edit"}
        enterFrom={"Left"}
        clickHandler={editHandler}
      />
    </FlexBox>
  );
};

export default ActiveQueue;
