import React, { useContext } from "react";
import styled from "styled-components";

import Timer from "../components/timers/Timer";
import TimerProvider from "../components/context/TimerContext";
import SlidingBar from "../components/generic/SlidingBar";
import NonActiveQueue from "../components/generic/NonActiveQueue";

import { QueueContext } from "../components/context/QueueContext";

const QueueViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  const { timerQueue, addTimer } = useContext(QueueContext);
  return (
    <QueueViewContainer>
      <NonActiveQueue></NonActiveQueue>
    </QueueViewContainer>
  );
}

export default App;
