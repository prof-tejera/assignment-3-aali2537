import React, { useContext } from "react";
import styled from "styled-components";

import { convertFromMs, formatNumber } from "../../utils/helpers";
import { TimerContext } from "../context/TimerContext";

const TimerText = styled.p`
  position: absolute;
  margin: 0;
  color: white;
  top: 45%;
  left: 50%;
  font-size: 3em;
  transform: translate(-50%, -50%);
`;

const RoundText = styled(TimerText)`
  top: 57%;
  font-size: 1.5em;
  font-weight: bold;
`;

const RoundTypeText = styled(RoundText)`
  top: 67%;
  font-size: 1.2em;
`;

const TextDisplay = () => {
  const { timerType, currentTime, currentRound, roundType, congratsFlag } =
    useContext(TimerContext);
  const displayRound = timerType === "XY" || timerType === "Tabata";
  const displayRoundType = timerType === "Tabata";
  const time = convertFromMs(currentTime);

  return (
    <>
      {congratsFlag && <TimerText>Nice job!</TimerText>}
      {!congratsFlag && (
        <TimerText>
          {formatNumber(time.minutes)}:{formatNumber(time.seconds)}:
          {formatNumber(time.milliseconds)}
        </TimerText>
      )}
      {congratsFlag && <RoundText className="fadeIn2">Try Again?</RoundText>}
      {displayRound && !congratsFlag && (
        <RoundText>Round {currentRound}</RoundText>
      )}
      {displayRoundType && !congratsFlag && (
        <RoundTypeText>{roundType}</RoundTypeText>
      )}
    </>
  );
};

export default TextDisplay;
