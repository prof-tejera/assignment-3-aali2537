import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faBiking,
  faHammer,
  faBackspace,
} from "@fortawesome/free-solid-svg-icons";

import Panel from "./Panel";
import Label from "./Label";

const icons = {
  Start: faBiking,
  Add: faPlusSquare,
  Edit: faHammer,
  Back: faBackspace,
};

const colors = {
  Start: "#15cb61",
  Add: "#ED7D3A",
  Edit: "#a80874",
  Back: "#a80874",
};

const ButtonLabel = styled(Label)`
  font-size: 1.5em;
`;

const Container = styled(Panel)`
  background-color: #0f242e;
  padding-top: 2em;
  padding-bottom: 2em;
  padding-left: 4em;
  padding-right: 4em;
  border-radius: 1em;
  position: relative;
  overflow: hidden;
  z-index: 5;
  width: 6em;
  margin-right: 1em;
  margin-left: 1em;

  &:hover,
  ${ButtonLabel}:hover {
    cursor: pointer;
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transition: all 0.3s ease;
    border-radius: 1em;
  }

  svg {
    margin-right: 0.2em;
  }

  font-size: 13px;

  &::before {
    border-radius: 0;
    box-shadow: inset 0 0 0 70px ${(props) => props.colors};
    margin-left: ${(props) => (props.enterFrom === "Left" ? -100 : 100)}%;
    z-index: -1;
  }

  &:hover::before {
    margin-left: 0;
  }
`;

const SquareButton = ({ type, clickHandler, enterFrom }) => {
  return (
    <Container
      colors={colors[type]}
      type={type}
      enterFrom={enterFrom}
      onClick={clickHandler}
    >
      <ButtonLabel>
        <FontAwesomeIcon icon={icons[type]} />
        {type}
      </ButtonLabel>
    </Container>
  );
};

SquareButton.propTypes = {
  type: PropTypes.oneOf(["Start", "Add", "Edit", "Back"]),
  clickHandler: PropTypes.func,
  enterFrom: PropTypes.oneOf(["Left", "Right"]),
};

export default SquareButton;
