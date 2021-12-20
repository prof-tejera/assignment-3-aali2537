import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import Panel from "./Panel";
import Label from "./Label";
import { QueueContext } from "../context/QueueContext";
import QueueOverview from "./QueueOverview";
import SquareButton from "./SquareButton";
import { convertFromMs } from "../../utils/helpers";
import { useEffect } from "react/cjs/react.development";

const TitlePanel = styled(Panel)`
  background-color: #0f242e;
  padding-left: 4em;
  padding-right: 4em;
  padding-top: 1em;
  padding-bottom: 1em;
  @media (max-width: 1200px) {
    font-size: 14px;
  }
`;

const SubTitle = styled(Label)`
  font-size: 1.8em;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media (min-width: 1600px) {
    width: 80%;
  }
  @media (min-width: 1900px) {
    width: 70%;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  white-space: nowrap;
  width: 100%;
  justify-content: center;
  margin-top: 2em;
  transition: -webkit-flex 250ms linear;
`;

const NonActiveQueue = ({ startHandler }) => {
  const { totalLength, totalTime } = useContext(QueueContext);
  const [showStart, setShowStart] = useState(false);
  const formattedTime = convertFromMs(totalTime);
  const history = useHistory();
  const showTime = formattedTime.minutes !== 0 || formattedTime.seconds !== 0;

  useEffect(() => {
    if (totalLength > 0) {
      setShowStart(true);
    } else {
      setShowStart(false);
    }
  }, [totalLength]);

  return (
    <Flex>
      <TitlePanel>
        <Label>Workout Queue</Label>
        <div>
          {showTime && (
            <SubTitle>
              Total Time:
              {formattedTime.minutes === 0
                ? ""
                : `${formattedTime.minutes}M`}{" "}
              {formattedTime.seconds === 0 ? "" : `${formattedTime.seconds}S`}
            </SubTitle>
          )}
        </div>
      </TitlePanel>
      <QueueOverview />
      <ButtonsContainer>
        {showStart && (
          <SquareButton
            type={"Start"}
            enterFrom={"Left"}
            clickHandler={startHandler}
          ></SquareButton>
        )}
        <SquareButton
          type={"Add"}
          enterFrom={"Right"}
          clickHandler={() => history.push("/add")}
        ></SquareButton>
      </ButtonsContainer>
    </Flex>
  );
};

NonActiveQueue.propTypes = {
  startHandler: PropTypes.func,
};

export default NonActiveQueue;
