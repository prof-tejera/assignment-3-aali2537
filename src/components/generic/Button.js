import React from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faFastForward,
  faUndo,
  faCog,
  faCheck,
  faTimes,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

const iconSize = 70;
const panelBackground = "#0f242e";
const transitionCurve = "0.8s cubic-bezier(0.81, -0.21, 0.24, 1.09)";

const icons = {
  play: faPlay,
  pause: faPause,
  "fast-forward": faFastForward,
  reset: faUndo,
  setting: faCog,
  save: faCheck,
  x: faTimes,
  right: faArrowRight,
  left: faArrowLeft,
};

const colors = {
  play: "#15cb61",
  reset: "#EF2D56",
  pause: "#ED7D3A",
  "fast-forward": "#5398BE",
  setting: "#CB9173",
  save: "#15cb61",
  x: "#EF2D56",
  right: "#a80874",
  left: "#a80874",
};

const CircleButton = styled.div`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  position: relative;
  display: table-cell;
  vertical-align: middle;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.5s;
  opacity: 1;
  box-shadow: 0 0 0 0 rgba(255, 255, 255, 1);
  text-align: center;
  z-index: 1;

  button {
    position: absolute;
  }
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transition: all 0.25s ease;
    border-radius: 50%;
  }

  &::after {
    box-shadow: inset 0 0 0 ${(props) => (props.border ? 2 : 0)}px
      ${(props) => colors[props.icon]};
  }

  &::before {
    background: ${(props) => colors[props.icon]};
    box-shadow: inset 0 0 0 ${iconSize}px ${panelBackground};
  }

  &:hover::before {
    box-shadow: inset 0 0 0 0px ${panelBackground};
  }

  svg {
    position: relative;
    font-size: ${iconSize / 2}px;
    color: white;
  }
`;

const Pulse = keyframes`
  70% {
    box-shadow: 0 0 0 25px rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
`;

const Wrapper = styled.div`
  position: absolute;
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  left: ${(props) => props.left}%;
  top: ${(props) => props.top}%;
  transition: ${transitionCurve};
  margin-left: -35px;

  .pulse {
      animation: ${Pulse};
      animation-iteration-count: 1;
      animation-duration: 0.5s;
    }
  & > div {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, .7);
    border-radius: 50%;
  }
  }
`;

const Button = ({ icon, onClick, left, top, size, border }) => {
  const addPulse = (e) => {
    e.currentTarget.classList.add("pulse");
  };

  const removePulse = (e) => {
    e.currentTarget.classList.remove("pulse");
  };

  return (
    <Wrapper top={top} left={left} size={size}>
      <div onClick={(e) => addPulse(e)} onAnimationEnd={(e) => removePulse(e)}>
        <div onClick={onClick}>
          <CircleButton icon={icon} size={size} border={border}>
            <FontAwesomeIcon icon={icons[icon]} />
          </CircleButton>
        </div>
      </div>
    </Wrapper>
  );
};

Button.propTypes = {
  icon: PropTypes.oneOf([
    "play",
    "pause",
    "reset",
    "save",
    "setting",
    "fast-forward",
    "x",
    "right",
    "left",
  ]),
  left: PropTypes.number,
  top: PropTypes.number,
  border: PropTypes.bool,
};

export default Button;
