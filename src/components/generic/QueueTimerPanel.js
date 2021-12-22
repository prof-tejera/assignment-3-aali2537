import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Panel from "./Panel";
import Label from "./Label";
import Button from "./Button";
import Circle from "./Circle";

const panel_height = 18;
const panel_width = 14;

const Flipper = styled(Panel)`
  transition: 0.5s;
  transform-style: preserve-3d;
  position: relative;
  height: ${panel_height}em;
  width: ${panel_width}em;
  margin: 0;
  padding: 0;
`;

const FlipContainer = styled.div`
  @media (max-width: 1200px) {
    font-size: 12px;
  }

  font-size: 14px;
  perspective: 1000px;

  &:hover ${Flipper} {
    transform: rotateY(${(props) => (props.disableHover ? 0 : 180)}deg);
  }
`;

const FrontSide = styled.div`
  -webkit-backface-visibility: hidden;
  background-color: #0f242e;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 1em;
  height: ${panel_height}em;
  width: ${panel_width}em;
  padding-top: 1em;
  z-index: 2;
  transform: rotateY(0deg);
`;

const BackSide = styled(FrontSide)`
  background-color: #0f242e;
  transform: rotateY(180deg);
  height: ${panel_height + 1}em;
  width: ${panel_width}em;
  overflow: hidden;
  border-radius: 1em;
  padding-top: 0;
  z-index: -1;
`;

const TopButtonRow = styled.div`
  margin-top: 1em;
  margin-right: 1em;
  position: relative;
  height: 4.5em;
  margin-bottom: 1em;
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const PanelLabel = styled(Label)`
  font-size: 1.4em;
  margin-bottom: 1em;
  margin-left: 1em;
  margin-right: 1em;
`;

const RelDiv = styled.div`
  position: relative;
  margin-top: 1em;
`;

const QueueTimerPanel = ({
  timerType,
  secondSetting,
  minuteSetting,
  roundSetting,
  workLength,
  restLength,
  removeHandler,
  disableHover,
}) => {
  const showRounds = timerType === "XY" || timerType === "Tabata";
  const showRoundType = timerType === "Tabata";

  return (
    <FlipContainer disableHover={disableHover}>
      <Flipper>
        <FrontSide>
          <Label>{timerType}</Label>
          <RelDiv>
            <Circle size={160} strokeWidth={10} percent={100} />
          </RelDiv>
        </FrontSide>
        <BackSide>
          <TopButtonRow>
            <Button
              icon={"x"}
              top={0}
              left={88}
              size={50}
              border={true}
              onClick={removeHandler}
            />
          </TopButtonRow>
          {showRounds && (
            <FlexDiv>
              <PanelLabel>Rounds: </PanelLabel>
              <PanelLabel>{roundSetting}</PanelLabel>
            </FlexDiv>
          )}
          {!showRoundType && (
            <FlexDiv>
              <PanelLabel>Minutes: </PanelLabel>
              <PanelLabel>{minuteSetting} </PanelLabel>
            </FlexDiv>
          )}
          {!showRoundType && (
            <FlexDiv>
              <PanelLabel>Seconds: </PanelLabel>
              <PanelLabel>{secondSetting}</PanelLabel>
            </FlexDiv>
          )}
          {showRoundType && (
            <FlexDiv>
              <PanelLabel>Work (s): </PanelLabel>
              <PanelLabel>{workLength}</PanelLabel>
            </FlexDiv>
          )}
          {showRoundType && (
            <FlexDiv>
              <PanelLabel>Rest (s): </PanelLabel>
              <PanelLabel>{restLength}</PanelLabel>
            </FlexDiv>
          )}
        </BackSide>
      </Flipper>
    </FlipContainer>
  );
};

QueueTimerPanel.propTypes = {
  timerType: PropTypes.oneOf(["Stopwatch", "Countdown", "XY", "Tabata"]),
  secondSetting: PropTypes.number,
  minuteSetting: PropTypes.number,
  roundSetting: PropTypes.number,
  workLength: PropTypes.number,
  restLength: PropTypes.number,
  removeHandler: PropTypes.func,
  disableHover: PropTypes.bool,
};

export default QueueTimerPanel;
