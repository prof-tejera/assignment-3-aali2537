import React, { useContext } from "react";
import styled from "styled-components";

import Panel from "../generic/Panel";
import Circle from "../generic/Circle";
import TextDisplay from "../generic/TextDisplay";
import Button from "../generic/Button";
import { TimerContext } from "../context/TimerContext";
import Settings from "../generic/Settings";

//Circle size settings
const circleSize = 450;
const circleStroke = 20;

const RelDiv = styled.div`
  position: relative;
`;

const TopButtonRow = styled.div`
  margin-top: 1em;
  margin-right: 1em;
  position: relative;
  height: 4.5em;
`;

const BottomButtonRow = styled.div`
  height: 5em;
  position: relative;
  margin-top: 1em;
  width: 100%;
`;

const FlipContainer = styled.div`
  perspective: 1000px;
`;

const Flipper = styled(Panel)`
  &.flip {
    transform: rotateY(180deg);
  }
  transition: 0.6s;
  transform-style: preserve-3d;
  position: relative;
  height: 38em;
  width: 28.1em;
`;

const FrontSide = styled.div`
  -webkit-backface-visibility: hidden;
  transform-style: preserve-3d;
  background-color: #0f242e;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 1em;
  height: 44em;
`;

const BackSide = styled(FrontSide)`
  background-color: #0f242e;
  transform: rotateY(180deg);
  height: 44em;
  width: 28.1em;
  overflow: hidden;
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
  } = useContext(TimerContext);

  return (
    <FlipContainer>
      <Flipper className={flipped ? "flip" : ""}>
        <FrontSide>
          <TopButtonRow>
            {showSettings && (
              <Button
                icon={"setting"}
                top={10}
                left={90}
                onClick={() => setFlipped(!flipped)}
              />
            )}
          </TopButtonRow>
          <RelDiv>
            <Circle size={circleSize} strokeWidth={circleStroke} />
            <TextDisplay />
          </RelDiv>
          <BottomButtonRow>
            <Button
              icon={"reset"}
              left={btnActive ? 20 : 50}
              top={40}
              onClick={() => setResetFlag(true)}
            />
            <Button
              icon={"fast-forward"}
              left={btnActive ? 80 : 50}
              top={40}
              onClick={() => setFastForwardFlag(true)}
            />
            <Button
              icon={timerActive ? "pause" : "play"}
              left={50}
              top={40}
              onClick={() => toggleTimer()}
            />
          </BottomButtonRow>
        </FrontSide>
        <BackSide>
          <Settings />
        </BackSide>
      </Flipper>
    </FlipContainer>
  );
};

export default Timer;
