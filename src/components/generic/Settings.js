import { useContext, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import Button from "./Button";
import Input from "./Input";
import Label from "./Label";

const Div = styled.div`
  text-align: center;
  height: 100%;
`;

const SubLabel = styled(Label)`
  font-size: 1em;
  text-align: left;
  margin-left: 1em;
  flex: 0.5;
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

const Settings = (props) => {
  const [minuteSetting, setMinuteSetting] = useState(defaultSetting.minutes);
  const [secondSetting, setSecondSetting] = useState(defaultSetting.seconds);
  const [roundSetting, setRoundSetting] = useState(defaultSetting.rounds);
  const [workLength, setWorkLength] = useState(defaultSetting.workLength);
  const [restLength, setRestLength] = useState(defaultSetting.restLength);
  const { timerType, addHandler } = props;
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
            onChange={(e) => setMinuteSetting(e.target.value)}
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
            onChange={(e) => setSecondSetting(e.target.value)}
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
            onChange={(e) => setRoundSetting(e.target.value)}
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
            onChange={(e) => setWorkLength(e.target.value)}
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
            onChange={(e) => setRestLength(e.target.value)}
            value={restLength}
          />
        </FlexDiv>
      )}
      <Button
        icon="save"
        top={80}
        left={50}
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

export default Settings;
