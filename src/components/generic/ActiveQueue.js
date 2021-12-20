import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import SlidingBar from "./SlidingBar";
import Timer from "../timers/Timer";
import { QueueContext } from "../context/QueueContext";
import SquareButton from "./SquareButton";
import { TimerContext } from "../context/TimerContext";

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ActiveQueue = ({ editHandler }) => {
  const { getTimers, totalLength } = useContext(QueueContext);
  const { queuePos, setResetFlag } = useContext(TimerContext);
  const [page, setPage] = useState(0);
  const [tabPos, setTabPos] = useState(1);

  useEffect(() => {
    if (queuePos < totalLength) {
      setPage(Math.floor(queuePos / 4));
      setTabPos(tabPos + 1);
    }
    if (queuePos === 0) {
      setPage(0);
      setTabPos(1);
    }
  }, [queuePos]);

  useEffect(() => {
    setTabPos(1);
  }, [page]);

  //Creates an array of timers for the current page in queue
  const getSlidingBarOptions = (queue) => {
    return queue.map((timer) => {
      return timer.timerType;
    });
  };

  return (
    <FlexBox>
      <SlidingBar
        options={getSlidingBarOptions(getTimers(page * 4, 4))}
        tabPos={tabPos}
      />
      <Timer />
      <SquareButton
        type={"Edit"}
        enterFrom={"Left"}
        clickHandler={() => {
          editHandler();
          setResetFlag(true);
        }}
      />
    </FlexBox>
  );
};

ActiveQueue.propTypes = {
  editHandler: PropTypes.func,
};

export default ActiveQueue;
