import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStopwatch,
  faClock,
  faHourglassStart,
  faStopwatch20,
} from "@fortawesome/free-solid-svg-icons";

import Panel from "./Panel";

const transitionCurve = "0.8s cubic-bezier(0.81, -0.21, 0.24, 1.09)";
const iconsList = {
  Stopwatch: faStopwatch,
  Countdown: faHourglassStart,
  XY: faClock,
  Tabata: faStopwatch20,
};
const tabEM = {
  1: "0em",
  2: "10em",
  3: "20em",
  4: "30em",
};

const ListPanel = styled(Panel)`
  padding: 0;
  width: 40em;
  height: 4.05em;
  position: relative;
  background-color: #0f242e;
  font-size: 16px;
  @media (max-width: 1000px) {
    font-size: 15px;
  }
  @media (min-width: 1200px) {
    margin-bottom: 3em;
  }
  @media (min-width: 1600px) {
    margin-bottom: 4em;
  }
`;

const TimerList = styled.ul`
  list-style: none;
  display: flex;
  position: absolute;
  width: 100%;
  justify-content: center;
  padding: 0;
  margin: 0;
  z-index: 2;

  & .fa-clock,
  & .fa-hourglass-start {
    font-size: 0.87em;
    margin-right: 0.5em;
  }

  & .fa-stopwatch-20 {
    margin-right: 0.4em;
  }

  svg {
    margin-right: 0.2em;
  }
`;

const Li = styled.li`
  color: white;
  font-size: 1.2em;
  padding-top: 1em;
  padding-bottom: 1em;
  border-radius: 0.6em;
  flex: 1 0 25%;
  transition: ${transitionCurve};

  :hover {
    cursor: ${(props) => (props.hover ? "pointer" : "default")};
  }

  &&.selected {
    color: #a80874 !important;
    transition: ${transitionCurve};
  }
`;

const Tab = styled.div`
  position: absolute;
  width: 10em;
  height: 100%;
  top: 0;
  background-color: white;
  border-radius: 0.5em;
  z-index: 1;
  left: ${(props) => props.left};
  transition: ${transitionCurve};
`;

const SlidingBar = ({ options, tabPos, clickHandler }) => {
  //disable hover pointer if no click handler
  const hover = clickHandler;
  return (
    <ListPanel>
      <TimerList>
        <Li
          onClick={() => {
            if (!!clickHandler) {
              clickHandler(1);
            }
          }}
          className={tabPos === 1 ? "selected" : ""}
          hover={hover}
        >
          {iconsList[options[0]] && (
            <FontAwesomeIcon icon={iconsList[options[0]]} />
          )}
          {options[0]}
        </Li>
        <Li
          onClick={() => {
            if (!!clickHandler) {
              clickHandler(2);
            }
          }}
          className={tabPos === 2 ? "selected" : ""}
          hover={hover}
        >
          {iconsList[options[1]] && (
            <FontAwesomeIcon icon={iconsList[options[1]]} />
          )}
          {options[1]}
        </Li>
        <Li
          onClick={() => {
            if (!!clickHandler) {
              clickHandler(3);
            }
          }}
          className={tabPos === 3 ? "selected" : ""}
          hover={hover}
        >
          {iconsList[options[2]] && (
            <FontAwesomeIcon icon={iconsList[options[2]]} />
          )}
          {options[2]}
        </Li>
        <Li
          onClick={() => {
            if (!!clickHandler) {
              clickHandler(4);
            }
          }}
          className={tabPos === 4 ? "selected" : ""}
          hover={hover}
        >
          {iconsList[options[3]] && (
            <FontAwesomeIcon icon={iconsList[options[3]]} />
          )}
          {options[3]}
        </Li>
      </TimerList>
      <Tab left={tabEM[tabPos]} />
    </ListPanel>
  );
};

SlidingBar.propTypes = {
  options: PropTypes.array,
  tabPos: PropTypes.number,
  clickHandler: PropTypes.func,
};

export default SlidingBar;
