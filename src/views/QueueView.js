import React, { useState } from "react";
import styled from "styled-components";

import NonActiveQueue from "../components/generic/NonActiveQueue";
import ActiveQueue from "../components/generic/ActiveQueue";

const QueueViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  const [queueActive, setQueueActive] = useState(false);

  return (
    <QueueViewContainer>
      {queueActive ? (
        <ActiveQueue editHandler={() => setQueueActive(false)} />
      ) : (
        <NonActiveQueue startHandler={() => setQueueActive(true)} />
      )}
    </QueueViewContainer>
  );
}

export default App;
