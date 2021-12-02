import React, { useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { calcRadius, calcCircum, calcOffset } from "../../utils/helpers";
import { TimerContext } from "../context/TimerContext";

const progressColor = "#a80874";

const ProgressCircle = styled.circle`
  stroke: ${(props) => props.color};
  fill: transparent;
  cx: ${(props) => props.c}px;
  cy: ${(props) => props.c}px;
  stroke-dasharray: ${(props) => calcCircum(props.r)};
  stroke-dashoffset: ${(props) => calcOffset(props.r, props.percent)};
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: all 0.3s ease-out;
`;

const Circle = ({ size, strokeWidth }) => {
  const { percent } = useContext(TimerContext);

  return (
    <svg width={size} height={size}>
      <ProgressCircle
        r={calcRadius(size, strokeWidth)}
        c={size / 2}
        strokeWidth={strokeWidth}
        percent={100}
        color={"white"}
      />
      <ProgressCircle
        r={calcRadius(size, strokeWidth)}
        c={size / 2}
        strokeWidth={strokeWidth + 1}
        percent={percent}
        color={progressColor}
      />
    </svg>
  );
};

Circle.propType = {
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
};

Circle.defaultProps = {
  size: 450,
  strokeWidth: 20,
};

export default Circle;
