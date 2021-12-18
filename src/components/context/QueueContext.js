import React, { useContext, useState } from "react";

import { calcTotalTime } from "../../utils/helpers";

export const QueueContext = React.createContext({});

const testQueue = [
  {
    secondSetting: 33,
    minuteSetting: 1,
    roundSetting: 3,
    workLength: 5,
    restLength: 2,
    timerType: "Countdown",
  },
  {
    secondSetting: 3,
    minuteSetting: 2,
    roundSetting: 3,
    workLength: 5,
    restLength: 2,
    timerType: "XY",
  },
  {
    secondSetting: 5,
    minuteSetting: 4,
    roundSetting: 1,
    workLength: 5,
    restLength: 2,
    timerType: "Tabata",
  },
  {
    secondSetting: 22,
    minuteSetting: 0,
    roundSetting: 4,
    workLength: 2,
    restLength: 2,
    timerType: "Stopwatch",
  },
  {
    secondSetting: 22,
    minuteSetting: 0,
    roundSetting: 4,
    workLength: 2,
    restLength: 2,
    timerType: "Tabata",
  },
  {
    secondSetting: 22,
    minuteSetting: 0,
    roundSetting: 4,
    workLength: 2,
    restLength: 2,
    timerType: "Countdown",
  },
];

const QueueProvider = ({ children }) => {
  const [timerQueue, setTimerQueue] = useState(testQueue);
  const [totalTime, setTotalTime] = useState(0);

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
    timerQueue.splice(index, 1);
    setTimerQueue(timerQueue);
  };

  //Returns total size of queue
  const totalLength = () => {
    return timerQueue.length;
  };

  return (
    <QueueContext.Provider
      value={{ addTimer, timerQueue, getTimers, removeTimer, totalLength }}
    >
      {children}
    </QueueContext.Provider>
  );
};

export default QueueProvider;
