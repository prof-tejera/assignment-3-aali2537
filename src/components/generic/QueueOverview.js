import React, { useContext, useEffect, useState, useRef } from "react";
import styled, { keyframes, css } from "styled-components";

import { QueueContext } from "../context/QueueContext";
import QueueTimerPanel from "./QueueTimerPanel";
import Button from "./Button";

const Fade = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const Slide = (left, slideDirection) => keyframes`
  100% {
    left: ${slideDirection === "left" ? left - 25 : left + 25}%;
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
    if (props.animate) {
      if (props.keyFrame === "Fade") {
        return css`
          ${Fade}
        `;
      } else {
        return css`
          ${Slide(props.left, props.slideDirection)}
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
  const { getTimers, removeTimer, totalLength } = useContext(QueueContext);
  const [currPos, setCurrPos] = useState(0);
  const [timers, setTimers] = useState(getTimers(0, 4));
  const [slideFrom, setSlideFrom] = useState(4);
  const [animateIndex, setAnimateIndex] = useState(false);
  const [keyFrame, setKeyFrame] = useState("Fade");
  const [disableHover, setDisableHover] = useState(false);
  const [slideDirection, setSlideDirection] = useState("left");
  const leftPositions = [-10, 15, 40, 65, 90, 115];
  const hideLeft = currPos === 0;
  const hideRight = currPos + 4 >= totalLength;
  const prevTotalLength = useRef(0);

  //Event handler to scroll through queue
  const changePos = (direction) => {
    if (direction === "left") {
      setSlideDirection("right");
      setCurrPos(currPos - 4);
    } else if (direction === "right") {
      setSlideDirection("left");
      setCurrPos(currPos + 4);
    }
    //Sliding animation
    setKeyFrame("Slide");
    setSlideFrom(0);
  };

  //Set current position to last page whenever a new timer is added
  useEffect(() => {
    //Only execute if a timer was added
    if (prevTotalLength.current < totalLength) {
      if (totalLength % 4 !== 0) {
        setCurrPos(4 * Math.floor(totalLength / 4));
      } else {
        setCurrPos(totalLength - 4);
      }
    }
    prevTotalLength.current = totalLength;
  }, [totalLength]);

  //Repopulate timer list after scroll button is clicked
  useEffect(() => {
    setTimers(getTimers(currPos, 4));
  }, [currPos, getTimers]);

  //Handler for removing timer panel and animating fade
  const removePanel = (index) => {
    setAnimateIndex(index);
    setKeyFrame("Fade");
    setSlideDirection("left");
    setDisableHover(true);
  };

  //Calculates position of each timer panel
  const calcPosition = (index) => {
    if (index >= slideFrom) {
      //Sliding left to right
      if (slideDirection === "left") {
        return leftPositions[index + 2];
      } else {
        //Sliding right to left
        return leftPositions[index];
      }
    } else {
      //No slide
      return leftPositions[index + 1];
    }
  };

  //Calculates if current panel index should be animated
  const shouldAnimate = (index) => {
    //Panels affected by slide and animation
    if (animateIndex === index || index >= slideFrom) {
      return true;
    }
    return false;
  };

  //If all timers in current page get deleted move to previous full page
  useEffect(() => {
    if (timers.length === 0 && currPos !== 0) {
      setCurrPos(currPos - 4);
    }
  }, [timers, currPos]);

  useEffect(() => {}, [disableHover]);

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
                slideDirection={slideDirection}
                left={calcPosition(index)}
                key={index + currPos}
                animate={shouldAnimate(index)}
                i={index}
                keyFrame={keyFrame}
                onAnimationEnd={() => {
                  //Panel Fading and sliding animation logic
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
                      setDisableHover(false);
                    }
                  }
                  //When last animation is complete let user be able to flip cards again
                  if (index === timers.length - 1) {
                    setDisableHover(false);
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
                  disableHover={disableHover}
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
