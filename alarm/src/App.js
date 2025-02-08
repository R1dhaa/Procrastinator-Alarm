import React, {useState,useEffect} from  "react";
const AlarmClock = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString())
  const [snoozeCount, setSnoozeCount] = useState(0)
  const [alarmTime, setAlarmTime] = useState("");
  const [isAlarmOn, setAlarmOn] = useState(false);
}
useEffect(() => {
  const interval = setInterval(() => {
    const now new Date();
    const formattedTime=now.getHours()+":"+now.getMinutes();
    if (isAlarmOn && alarmTime === formattedTime) {
      alert("Wake up! Time to stop procrastinating!");
    }
  }, 1000);
  return () => clearInterval(interval);
}, [alarmTime, isAlarmOn]);


