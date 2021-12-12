import React, { useContext } from "react";
import styled from "styled-components";

import Timer from "../components/timers/Timer";
import TimerProvider from "../components/context/TimerContext";
import SlidingBar from "../components/generic/SlidingBar";

import { QueueContext } from "../components/context/QueueContext";

const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  const { timerQueue, addTimer } = useContext(QueueContext);
  return (
    <TimerProvider>
      <TimerContainer>
        <SlidingBar
          timerType="Stopwatch"
          options={["Stopwatch", "Stopwatch", "XY", "Tabata"]}
          tabPos={2}
        />
        <Timer />
      </TimerContainer>
    </TimerProvider>
  );
}

export default App;
