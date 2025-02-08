import React, {useState,useEffect} from  "react";
const AlarmClock = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString())
  const [snoozeCount, setSnoozeCount] = useState(0)
  const [alarmTime, setAlarmTime] = useState("");
  const [isAlarmOn, setAlarmOn] = useState(false);
}
useEffect(() => {
  const interval = setInterval(() => {
    const now =new Date();
    const formattedTime=now.getHours()+":"+now.getMinutes();
    if (isAlarmOn && alarmTime === formattedTime) {
      alert("Wake up! Time to stop procrastinating!");
    }
  }, 1000);
  return () => clearInterval(interval);
}, [alarmTime, isAlarmOn]);

const handleSnooze = () => {
  setSnoozeCount(snoozeCount + 1);
  if (snoozeCount < 2) {
    alert("Snoozed! Next time it won't be this easy...");
  } else {
    let challenge = Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10);
    let userAnswer = prompt(`Solve this to snooze: ${challenge} + ${challenge} = ?`);
    if (parseInt(userAnswer) === challenge * 2) {
      alert("Fine, you can snooze.");
    } else {
      alert("Wrong answer! Alarm stays on!");
    }
  }
};

const handleSetAlarm = () => {
  if (alarmTime) {
    setIsAlarmOn(true);
    alert(`Alarm set for ${alarmTime}`);
  }
};
