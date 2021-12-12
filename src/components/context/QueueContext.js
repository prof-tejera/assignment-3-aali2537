import React, { useContext, useState } from "react";

export const QueueContext = React.createContext({});

const QueueProvider = ({ children }) => {
  const [timerQueue, setTimerQueue] = useState([]);

  //Function exposed to context subscribers to add a timer to the queue
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

    queue.push(newTimer);
    setTimerQueue(queue);
  };

  return (
    <QueueContext.Provider value={{ addTimer }}>
      {children}
    </QueueContext.Provider>
  );
};

export default QueueProvider;
