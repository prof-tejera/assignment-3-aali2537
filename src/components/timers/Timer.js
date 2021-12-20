import React, { useContext } from "react";
import styled from "styled-components";

import Panel from "../generic/Panel";
import Circle from "../generic/Circle";
import TextDisplay from "../generic/TextDisplay";
import Button from "../generic/Button";
import { TimerContext } from "../context/TimerContext";
import { getButtonSize } from "../../utils/helpers";

//Circle size settings
const circleStroke = 20;

const widthEm = 28.1;

const RelDiv = styled.div`
  position: relative;
`;

const TopRow = styled.div`
  margin-top: 0;
  margin-right: 1em;
  position: relative;
  height: 4.5em;
`;

const BottomButtonRow = styled.div`
  height: 5em;
  position: relative;
  margin-top: 4em;
  width: 100%;
`;

const Container = styled(Panel)`
  position: relative;

  width: ${widthEm}em;
  padding-top: 0;

  background-color: #0f242e;
  @media (max-width: 1900px) {
    font-size: 13px;
  }

  @media (max-width: 1600px) {
    font-size: 12px;
  }

  @media (max-width: 1200px) {
    font-size: 11px;
  }
  font-size: 15px;
`;

const FrontSide = styled.div`
  position: relative;
  top: 0;
  left: 0;
  border-radius: 1em;
`;

const Timer = () => {
  const {
    flipped,
    setFlipped,
    btnActive,
    toggleTimer,
    timerActive,
    setFastForwardFlag,
    setResetFlag,
    showSettings,
    percent,
  } = useContext(TimerContext);
  const buttonSize = getButtonSize();

  const getCircleSize = () => {
    const width = window.innerWidth;

    if (width <= 1000) {
      return 11 * widthEm;
    }
    if (width <= 1600) {
      return 12 * widthEm;
    }
    return 14 * widthEm;
  };

  return (
    <Container>
      <TopRow></TopRow>
      <RelDiv>
        <Circle
          size={getCircleSize()}
          strokeWidth={circleStroke}
          percent={percent}
        />
        <TextDisplay />
      </RelDiv>
      <BottomButtonRow>
        <Button
          icon={"reset"}
          left={btnActive ? 20 : 50}
          top={0}
          border={2}
          onClick={() => setResetFlag(true)}
          size={buttonSize}
        />
        <Button
          icon={"fast-forward"}
          left={btnActive ? 80 : 50}
          top={0}
          border={2}
          onClick={() => setFastForwardFlag(true)}
          size={buttonSize}
        />
        <Button
          icon={timerActive ? "pause" : "play"}
          left={50}
          top={0}
          border={true}
          onClick={() => toggleTimer()}
          size={buttonSize}
        />
      </BottomButtonRow>
    </Container>
  );
};

export default Timer;
