import React from "react";
import styled from "styled-components";

import Timer from "../components/timers/Timer";
import TimerProvider from "../components/context/TimerContext";
import TimerSelect from "../components/generic/TimerSelect";

const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  return (
    <TimerProvider>
      <TimerContainer>
        <TimerSelect />
        <Timer />
      </TimerContainer>
    </TimerProvider>
  );
}

export default App;
