import React, { useState } from "react";

import { calcTotalTime } from "../../utils/helpers";

export const QueueContext = React.createContext({});

const QueueProvider = ({ children }) => {
  const [timerQueue, setTimerQueue] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [totalLength, setTotalLength] = useState(0);

  //Exposed to context subscribers to add a timer to the queue
  const addTimer = (
    secondSetting,
    minuteSetting,
    roundSetting,
    workLength,
    restLength,
    timerType
  ) => {
    let queue = timerQueue;
    const newTimer = {
      secondSetting: secondSetting,
      minuteSetting: minuteSetting,
      roundSetting: roundSetting,
      workLength: workLength,
      restLength: restLength,
      timerType: timerType,
    };

    setTotalTime(
      totalTime +
        calcTotalTime(
          timerType,
          minuteSetting,
          secondSetting,
          workLength,
          restLength,
          roundSetting
        )
    );
    queue.push(newTimer);
    setTimerQueue(queue);
    setTotalLength(totalLength + 1);
  };

  //Returns a set of timers from a specific point in queue
  const getTimers = (index, amount) => {
    const timers = [];

    for (let i = index; i < index + amount; i++) {
      if (timerQueue[i] !== undefined) {
        timers.push(timerQueue[i]);
      }
    }

    return timers;
  };

  //Removes timer at given index
  const removeTimer = (index) => {
    const timer = timerQueue[index];

    setTotalTime(
      totalTime -
        calcTotalTime(
          timer.timerType,
          timer.minuteSetting,
          timer.secondSetting,
          timer.workLength,
          timer.restLength,
          timer.roundSetting
        )
    );
    timerQueue.splice(index, 1);
    setTimerQueue(timerQueue);
    setTotalLength(totalLength - 1);
  };

  return (
    <QueueContext.Provider
      value={{
        addTimer,
        timerQueue,
        getTimers,
        removeTimer,
        totalLength,
        totalTime,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};

export default QueueProvider;
