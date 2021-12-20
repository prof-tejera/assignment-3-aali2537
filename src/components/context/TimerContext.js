import React, { useState, useEffect, useContext } from "react";
import { calcRoundTime } from "../../utils/helpers";
import { QueueContext } from "./QueueContext";

export const TimerContext = React.createContext({});

const defaultSettings = {
  minutes: 0,
  seconds: 20,
  rounds: 5,
  work: 30,
  rest: 10,
};

const TimerProvider = ({ children }) => {
  const { getTimers, totalLength } = useContext(QueueContext);
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
  const [timerActive, setTimerActive] = useState(false);
  const [btnActive, setBtnActive] = useState(false);
  const [roundTime, setRoundTime] = useState(20);
  const [resetFlag, setResetFlag] = useState(false);
  const [fastForwardFlag, setFastForwardFlag] = useState(false);
  const [congratsFlag, setCongratsFlag] = useState(false);
  const [queuePos, setQueuePos] = useState(0);
  const [queueActive, setQueueActive] = useState(false);
  const [pauseFlag, setPauseFlag] = useState(false);

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

  useEffect(() => {}, [secondSetting]);

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

  //Grabs timer from queue and apply all settings
  const getTimerFromQueue = (index) => {
    const timer = getTimers(index, 1)[0];

    if (timer !== undefined) {
      setTimerType(timer.timerType);
      setSecondSetting(timer.secondSetting);
      setMinuteSetting(timer.minuteSetting);
      setMaxRound(timer.roundSetting);
      setWorkLength(timer.workLength);
      setRestLength(timer.restLength);
    }
  };

  //Trigger timer start/pause and calculate total time needed for percentage
  const toggleTimer = () => {
    if (!queueActive) {
      setQueuePos(0);
    } else {
      setPauseFlag(!pauseFlag);
    }
    setTimerActive(!timerActive);
    setQueueActive(true);
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

  //Timer is finished so advance queue position
  const timerFinished = () => {
    setQueuePos(queuePos + 1);
    setTimerActive(false);
    setPTime();
  };

  const QueueFinished = (reset) => {
    setTimerActive(false);
    setBtnActive(false);
    getTimerFromQueue(0, 1);
    setPTime();
    setQueueActive(false);
    if (!reset) {
      setCongratsFlag(true);
    }
  };

  useEffect(() => {
    //Queue is finished
    if (queuePos === totalLength) {
      QueueFinished();
    } else {
      getTimerFromQueue(queuePos, 1);
    }
  }, [queuePos]);

  //Load first timer from queue
  useEffect(() => {
    if (totalLength === 1) {
      getTimerFromQueue(queuePos);
    }
  }, [totalLength]);

  //Anytime settings change set current time and percentage to make sure they have a fresh value
  useEffect(() => {
    setRoundTime(easyRoundTime);
    setPTime();
    setCurrentRound(1);
    setRoundType("Work");
  }, [
    minuteSetting,
    secondSetting,
    maxRound,
    restLength,
    workLength,
    timerType,
  ]);

  //Fast Foward pressed
  useEffect(() => {
    if (fastForwardFlag) {
      setFastForwardFlag(false);
      timerFinished();
    }
  }, [fastForwardFlag]);

  //Reset Pressed
  useEffect(() => {
    if (resetFlag) {
      QueueFinished(true);
      setResetFlag(false);
      setQueuePos(0);
    }
  }, [resetFlag]);

  useEffect(() => {}, [currentTime]);

  //Start/pause everytime play/pause button is pushed
  useEffect(() => {
    //Force new set interval to be made so values are not stale by toggling timerActive off and on
    if (queueActive) {
      //However do not force timer to be active if pause button was clicked
      if (!pauseFlag) {
        setTimerActive(true);
      }
    } else {
      setTimerActive(false);
    }
    if (timerActive && queueActive) {
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
        queuePos,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
