import React, { useState, useEffect } from "react";
import { tabMap } from "../../utils/helpers";
import { calcRoundTime } from "../../utils/helpers";

export const TimerContext = React.createContext({});

const defaultSettings = {
  minutes: 0,
  seconds: 20,
  rounds: 5,
  work: 30,
  rest: 10,
};

const TimerProvider = ({ children }) => {
  const [timerType, setTimerType] = useState("Stopwatch");
  const [percent, setPercent] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [maxRound, setMaxRound] = useState(defaultSettings["rounds"]);
  const [roundType, setRoundType] = useState("Work");
  const [workLength, setWorkLength] = useState(defaultSettings["work"]);
  const [restLength, setRestLength] = useState(defaultSettings["rest"]);
  const [minuteSetting, setMinuteSetting] = useState(
    defaultSettings["minutes"]
  );
  const [secondSetting, setSecondSetting] = useState(
    defaultSettings["seconds"]
  );
  const [tabPos, setTabPos] = useState("0em");
  const [btn1, setBtn1] = useState("play");
  const [flipped, setFlipped] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [btnActive, setBtnActive] = useState(false);
  const [roundTime, setRoundTime] = useState(20);
  const [resetFlag, setResetFlag] = useState(false);
  const [fastForwardFlag, setFastForwardFlag] = useState(false);
  const [congratsFlag, setCongratsFlag] = useState(false);
  const [showSettings, setShowSettings] = useState(true);

  // Function to make getting the round time easier with less typing
  const easyRoundTime = () => {
    return calcRoundTime(
      timerType,
      minuteSetting,
      secondSetting,
      workLength,
      restLength,
      roundType
    );
  };

  //Sets percent and current time to settings
  const setPTime = () => {
    if (timerType === "Countdown" || timerType === "XY") {
      setCurrentTime(easyRoundTime());
      setPercent(100);
    } else {
      setPercent(0);
      setCurrentTime(0);
    }
  };

  //Sets the current timer and animates the moving tab
  const selectTimer = (timer) => {
    setTimerType(timer);
    setTabPos(tabMap[timer]);
  };

  //Reset state to default settings
  const resetState = () => {
    setMinuteSetting(defaultSettings["minutes"]);
    setSecondSetting(defaultSettings["seconds"]);
    setMaxRound(defaultSettings["rounds"]);
    setWorkLength(defaultSettings["work"]);
    setRestLength(defaultSettings["rest"]);
    setRoundType("Work");
    setCurrentRound(1);
    setCongratsFlag(false);
    setTimerActive(false);
    setBtnActive(false);
    setPTime();
  };

  //Soft reset for completion, users still retain their settings chosen
  const softReset = () => {
    setFlipped(false);
    setTimerActive(false);
    setBtnActive(false);
    setCurrentRound(1);
    setRoundType("Work");
    setCongratsFlag(false);
    setPTime();
  };

  //Trigger timer start/pause and calculate total time needed for percentage
  const toggleTimer = () => {
    setTimerActive(!timerActive);
    setBtnActive(true);
    setCongratsFlag(false);
  };

  //Sets up users for the next round
  const nextRound = (time, percent, type) => {
    if (!!type) {
      setRoundType(type);
      //Only advance round if rest round is complete
      if (roundType === "Rest") {
        setCurrentRound(currentRound + 1);
      }
    } else {
      setCurrentRound(currentRound + 1);
    }
    setRoundTime(easyRoundTime);
    setPercent(percent);
    setCurrentTime(time);
  };

  const timerFinished = () => {
    softReset();
    setCongratsFlag(true);
    setShowSettings(true);
  };

  //Anytime settings change set current time and percentage to make sure they have a fresh value
  useEffect(() => {
    setRoundTime(easyRoundTime);
    setPTime();
  }, [minuteSetting, secondSetting, maxRound, restLength, workLength]);

  useEffect(() => {
    if (fastForwardFlag) {
      softReset();
      setFastForwardFlag(false);
      timerFinished();
    }
  }, [fastForwardFlag]);

  useEffect(() => {
    if (resetFlag) {
      resetState();
      setResetFlag(false);
      setShowSettings(true);
    }
  }, [resetFlag, resetState]);

  //Start/pause everytime play/pause button is pushed
  useEffect(() => {
    if (timerActive) {
      setShowSettings(false);
      const id = setInterval(() => {
        if (timerType === "Countdown" || timerType === "XY") {
          setCurrentTime((count) => count - 50);
        } else {
          setCurrentTime((count) => count + 50);
        }
      }, 50);
      return () => {
        clearInterval(id);
      };
    }
  }, [timerActive]);

  //Resets state upon choosing new timer
  useEffect(() => {
    resetState();
    setShowSettings(true);
  }, [timerType]);

  //Calculate each round type and progress bar percentage
  useEffect(() => {
    if (timerActive) {
      setPercent((currentTime / roundTime) * 100);
      setRoundTime(easyRoundTime());
    }
  }, [currentTime, roundTime, timerActive]);

  //Handle round resets/completion
  useEffect(() => {
    if (percent >= 100 && timerActive) {
      //Reset state as stopwatch timer only have one round
      if (timerType === "Stopwatch") {
        timerFinished();
      }
      //Tabata timer round completion logic
      if (timerType === "Tabata") {
        if (roundType === "Work") {
          nextRound(0, 0, "Rest");
        } else {
          if (currentRound < maxRound) {
            nextRound(0, 0, "Work");
          } else {
            timerFinished();
          }
        }
      }
    } else if (percent <= 0 && timerActive) {
      //Countdown ends after one round
      if (timerType === "Countdown") {
        timerFinished();
      }
      //XY timer round logic
      if (timerType === "XY") {
        if (currentRound < maxRound) {
          nextRound(roundTime, 100, null);
        } else {
          timerFinished();
        }
      }
    }
  }, [percent]);
  return (
    <TimerContext.Provider
      value={{
        timerType,
        selectTimer,
        percent,
        setPercent,
        currentTime,
        setCurrentTime,
        currentRound,
        setCurrentRound,
        maxRound,
        setMaxRound,
        roundType,
        setRoundType,
        tabPos,
        btn1,
        setBtn1,
        flipped,
        setFlipped,
        workLength,
        setWorkLength,
        restLength,
        setRestLength,
        minuteSetting,
        setMinuteSetting,
        secondSetting,
        setSecondSetting,
        timerActive,
        setTimerActive,
        btnActive,
        setBtnActive,
        toggleTimer,
        roundTime,
        setResetFlag,
        setFastForwardFlag,
        congratsFlag,
        showSettings,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
