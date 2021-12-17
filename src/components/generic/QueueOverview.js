import React, { useContext, useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";

import { QueueContext } from "../context/QueueContext";
import Panel from "./Panel";
import QueueTimerPanel from "./QueueTimerPanel";
import Button from "./Button";

const transitionCurve = "cubic-bezier(0.81, -0.21, 0.24, 1.09)";

const Fade = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const Slide = (left) => keyframes`
  100% {
    left: ${left - 25}%;
  }
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 19em;
`;

const PanelContainer = styled.div`
  position: absolute;
  left: ${(props) => props.left}%;
  transform: translate(-50%, -50%);
  top: 50%;

  animation-name: ${(props) => {
    if (props.animate()) {
      if (props.keyFrame === "Fade") {
        return css`
          ${Fade}
        `;
      } else {
        return css`
          ${Slide(props.left)}
        `;
      }
    }
  }}
  }};
  animation-timing-function: ease-in-out;
  animation-duration: .6s;

  animation-fill-mode: forwards;
`;

const TimersContainer = styled.div`
  position: absolute;
  width: 84%;
  left: 6%;
`;

const InnerTimersContainer = styled.div`
  position: relative;
  height: 19em;
  width: 100%;
  overflow: hidden;
`;

const QueueOverview = () => {
  const [currPos, setCurrPos] = useState(0);
  const { getTimers, removeTimer, totalLength } = useContext(QueueContext);
  const [timers, setTimers] = useState(getTimers(0, 4));
  const [slideFrom, setSlideFrom] = useState(4);
  const [animateIndex, setAnimateIndex] = useState(false);
  const [keyFrame, setKeyFrame] = useState("Fade");
  const leftPositions = [15, 40, 65, 90, 115];
  const hideLeft = currPos === 0;
  const hideRight = currPos + 4 >= totalLength();

  //Event handler to scroll through queue
  const changePos = (direction) => {
    if (direction === "left") {
      setCurrPos(currPos - 4);
    } else if (direction === "right") {
      setCurrPos(currPos + 4);
    }
  };

  //Repopulate timer list after scroll button is clicked
  useEffect(() => {
    setTimers(getTimers(currPos, 4));
  }, [currPos]);

  //Handler for removing timer panel and animating fade
  const removePanel = (index) => {
    setAnimateIndex(index);
    setKeyFrame("Fade");
  };

  useEffect(() => {
    if (timers.length === 0 && currPos !== 0) {
      setCurrPos(currPos - 4);
    }
  }, [timers]);

  return (
    <Container>
      {!hideLeft && (
        <Button
          icon={"left"}
          top={40}
          size={70}
          left={5}
          border={false}
          onClick={() => changePos("left")}
        />
      )}
      <TimersContainer>
        <InnerTimersContainer>
          {timers.map((timer, index) => {
            return (
              <PanelContainer
                left={
                  index >= slideFrom
                    ? leftPositions[index + 1]
                    : leftPositions[index]
                }
                key={index + currPos}
                animate={() => {
                  if (animateIndex === index || index >= slideFrom) {
                    return true;
                  } else {
                    return false;
                  }
                }}
                i={index}
                keyFrame={keyFrame}
                onAnimationEnd={() => {
                  console.log(index, keyFrame);

                  if (keyFrame === "Fade") {
                    removeTimer(animateIndex + currPos);
                    setAnimateIndex(false);
                    setSlideFrom(index);
                    setKeyFrame("Slide");
                    setTimers(getTimers(currPos, 4));
                  } else {
                    if (index === timers.length - 1) {
                      setKeyFrame("Fade");
                      setSlideFrom(4);
                    }
                  }
                }}
              >
                <QueueTimerPanel
                  timerType={timer.timerType}
                  secondSetting={timer.secondSetting}
                  minuteSetting={timer.minuteSetting}
                  roundSetting={timer.roundSetting}
                  workLength={timer.workLength}
                  restLength={timer.restLength}
                  removeHandler={() => {
                    removePanel(index);
                  }}
                />
              </PanelContainer>
            );
          })}
        </InnerTimersContainer>
      </TimersContainer>
      {!hideRight && (
        <Button
          icon={"right"}
          top={40}
          size={70}
          left={95}
          border={false}
          onClick={() => changePos("right")}
        />
      )}
    </Container>
  );
};

export default QueueOverview;
