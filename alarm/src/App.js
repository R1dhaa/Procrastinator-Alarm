import React, {useState,useEffect} from  "react";
const AlarmClock = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString())
  const [snoozeCount, setSnoozeCount] = useState(0)
  const [alarmTime, setAlarmTime] = useState("");
  const [isAlarmOn, setAlarmOn] = useState(false);
}
useEffect(() => {
  const interval = setInterval(() => {
    setTime(new Date().toLocaleTimeString());
    if (isAlarmOn && alarmTime === new Date().toLocaleTimeString()) {
      alert("Wake up! Time to stop procrastinating!");
    }
  }, 1000);
  return () => clearInterval(interval);
}, [alarmTime, isAlarmOn]);


