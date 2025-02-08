import React, {useState,useEffect} from  "react";
const AlarmClock = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString())
  const [snoozeCount, setSnoozeCount] = useState(0)
  const [alarmTime, setAlarmTime] = useState("");
  const [isAlarmOn, setAlarmOn] = useState(false);
  const [alarmTriggered, setAlarmTriggered] = useState(false); // Prevents multiple alerts

useEffect(() => {
  const interval = setInterval(() => {
    setTime(new Date().toLocaleTimeString());
    const now =new Date();
    const formattedTime=now.toTimeString().slice(0,5);
    if (isAlarmOn && !alarmTriggered && alarmTime === formattedTime) {
      alert("Wake up! Time to stop procrastinating!");
      setAlarmTriggered(true); // Prevents repeated alerts
    }
  }, 1000);
  return () => clearInterval(interval);
}, [alarmTime, isAlarmOn, alarmTriggered]);

const handleSnooze = () => {
  setSnoozeCount(prev=>prev+1);
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
    setAlarmOn(true);
    alert(`Alarm set for ${alarmTime}`);
  }
};

return (
  <div style={{ textAlign: "center", padding: "20px" }}>
    <h1>Procrastinator's Alarm Clock ⏰</h1>
    <h2>Current Time: {time}</h2>
    <input
      type="time"
      onChange={(e) => setAlarmTime(e.target.value)}
      style={{ margin: "10px", padding: "5px" }}
    />
    <button onClick={handleSetAlarm} style={{ padding: "10px" }}>Set Alarm</button>
    <br /><br />
    {isAlarmOn && (
      <button onClick={handleSnooze} style={{ padding: "10px", background: "red", color: "white" }}>
        Snooze
      </button>
    )}
  </div>
  );
};

export default AlarmClock;
