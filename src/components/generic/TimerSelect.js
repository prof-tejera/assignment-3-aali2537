import React, { useContext } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStopwatch,
  faClock,
  faHourglassStart,
  faStopwatch20,
} from "@fortawesome/free-solid-svg-icons";

import Panel from "./Panel";
import { TimerContext } from "../context/TimerContext";

const transitionCurve = "0.8s cubic-bezier(0.81, -0.21, 0.24, 1.09)";

const ListPanel = styled(Panel)`
  padding: 0;
  width: 40em;
  height: 4.05em;
  position: relative;
  background-color: #0f242e;
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

  .clock-icon,
  .hour-glass-icon {
    font-size: 0.87em;
    margin-right: 0.5em;
  }

  .stopwatch-icon {
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
    cursor: pointer;
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

const TimerSelect = () => {
  const { timerType, selectTimer, tabPos } = useContext(TimerContext);

  return (
    <ListPanel>
      <TimerList>
        <Li
          onClick={() => selectTimer("Stopwatch")}
          className={timerType === "Stopwatch" ? "selected" : ""}
        >
          <FontAwesomeIcon icon={faStopwatch} /> Stopwatch
        </Li>
        <Li
          onClick={() => selectTimer("Countdown")}
          className={timerType === "Countdown" ? "selected" : ""}
        >
          <FontAwesomeIcon
            icon={faHourglassStart}
            className="hour-glass-icon"
          />
          Countdown
        </Li>
        <Li
          onClick={() => selectTimer("XY")}
          className={timerType === "XY" ? "selected" : ""}
        >
          <FontAwesomeIcon icon={faClock} className="clock-icon" />X Y
        </Li>
        <Li
          onClick={() => selectTimer("Tabata")}
          className={timerType === "Tabata" ? "selected" : ""}
        >
          <FontAwesomeIcon icon={faStopwatch20} className="stopwatch-icon" />
          Tabata
        </Li>
      </TimerList>
      <Tab left={tabPos} />
    </ListPanel>
  );
};

export default TimerSelect;
