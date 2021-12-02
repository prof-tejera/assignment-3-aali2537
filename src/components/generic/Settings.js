import { useContext } from "react";
import styled from "styled-components";

import Button from "./Button";
import Input from "./Input";
import Label from "./Label";
import { TimerContext } from "../context/TimerContext";

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

const Settings = () => {
  const {
    flipped,
    setFlipped,
    minuteSetting,
    setMinuteSetting,
    secondSetting,
    setSecondSetting,
    maxRound,
    setMaxRound,
    workLength,
    setWorkLength,
    restLength,
    setRestLength,
    timerType,
  } = useContext(TimerContext);
  const showRounds = timerType === "XY" || timerType === "Tabata";
  const showRoundType = timerType === "Tabata";

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
            onChange={(e) => setMaxRound(e.target.value)}
            value={maxRound}
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
        onClick={() => setFlipped(!flipped)}
      />
    </Div>
  );
};

export default Settings;
