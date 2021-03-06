import { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import Button from "./Button";
import Input from "./Input";
import Label from "./Label";
import SubLabel from "./SubLabel";
import { getButtonSize } from "../../utils/helpers";

const Div = styled.div`
  text-align: center;
  height: 100%;
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const defaultSetting = {
  seconds: 20,
  minutes: 0,
  rounds: 2,
  workLength: 5,
  restLength: 3,
};

const Settings = ({ timerType, addHandler }) => {
  const [minuteSetting, setMinuteSetting] = useState(defaultSetting.minutes);
  const [secondSetting, setSecondSetting] = useState(defaultSetting.seconds);
  const [roundSetting, setRoundSetting] = useState(defaultSetting.rounds);
  const [workLength, setWorkLength] = useState(defaultSetting.workLength);
  const [restLength, setRestLength] = useState(defaultSetting.restLength);
  const showRounds = timerType === "XY" || timerType === "Tabata";
  const showRoundType = timerType === "Tabata";
  const history = useHistory();

  //Event handler to prevent user from entering anything but a number
  const onlyNumber = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <Div>
      <div>
        <Label>Settings</Label>
      </div>
      {!showRoundType && (
        <FlexDiv>
          <SubLabel>Minutes: </SubLabel>
          <Input
            type="text"
            name="Minutes"
            placeholder="Minutes"
            onKeyPress={(e) => onlyNumber(e)}
            onChange={(e) => setMinuteSetting(parseInt(e.target.value))}
            value={minuteSetting}
          />
        </FlexDiv>
      )}
      {!showRoundType && (
        <FlexDiv>
          <SubLabel>Seconds: </SubLabel>
          <Input
            type="text"
            name="Seconds"
            placeholder="Seconds"
            onKeyPress={(e) => onlyNumber(e)}
            onChange={(e) => setSecondSetting(parseInt(e.target.value))}
            value={secondSetting}
          />
        </FlexDiv>
      )}
      {showRounds && (
        <FlexDiv>
          <SubLabel>Rounds: </SubLabel>
          <Input
            type="text"
            name="Rounds"
            placeholder="Total Rounds"
            onKeyPress={(e) => onlyNumber(e)}
            onChange={(e) => setRoundSetting(parseInt(e.target.value))}
            value={roundSetting}
          />
        </FlexDiv>
      )}
      {showRoundType && (
        <FlexDiv>
          <SubLabel>Work(seconds): </SubLabel>
          <Input
            type="text"
            name="Work"
            placeholder="Work Period"
            onKeyPress={(e) => onlyNumber(e)}
            onChange={(e) => setWorkLength(parseInt(e.target.value))}
            value={workLength}
          />
        </FlexDiv>
      )}
      {showRoundType && (
        <FlexDiv>
          <SubLabel>Rest(seconds): </SubLabel>
          <Input
            type="text"
            name="Rest"
            placeholder="Rest Period"
            onKeyPress={(e) => onlyNumber(e)}
            onChange={(e) => setRestLength(parseInt(e.target.value))}
            value={restLength}
          />
        </FlexDiv>
      )}
      <Button
        icon="save"
        top={80}
        left={50}
        size={getButtonSize()}
        border={true}
        onClick={() => {
          addHandler(
            secondSetting,
            minuteSetting,
            roundSetting,
            workLength,
            restLength,
            timerType
          );
          history.push("/");
        }}
      />
    </Div>
  );
};

Settings.propTypes = {
  timerType: PropTypes.string,
  addHandler: PropTypes.func,
};

export default Settings;
