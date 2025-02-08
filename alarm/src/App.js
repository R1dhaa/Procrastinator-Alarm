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
  <div style={styles.container}>
    <div style={styles.clockCard}>
      <h1 style={styles.title}>Procrastinator's Alarm Clock ⏰</h1>
      <h2 style={styles.time}>{time}</h2>
      <input
        type="time"
        onChange={(e) => setAlarmTime(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleSetAlarm} style={styles.setButton}>
        Set Alarm
      </button>
      <br />
      {isAlarmOn && (
        <button onClick={handleSnooze} style={styles.snoozeButton}>
          Snooze
        </button>
      )}
    </div>
  </div>
);
};

const styles = {
container: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "linear-gradient(to right, #4facfe, #00f2fe)",
},
clockCard: {
  background: "white",
  padding: "30px",
  borderRadius: "15px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  textAlign: "center",
  width: "350px",
},
title: {
  fontSize: "22px",
  color: "#333",
  marginBottom: "10px",
},
time: {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#ff4757",
  marginBottom: "15px",
},
input: {
  padding: "8px",
  fontSize: "16px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  width: "100%",
  textAlign: "center",
  marginBottom: "15px",
},
setButton: {
  padding: "10px 20px",
  fontSize: "16px",
  color: "white",
  background: "#2ed573",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  width: "100%",
},
snoozeButton: {
  padding: "10px 20px",
  fontSize: "16px",
  color: "white",
  background: "#ff4757",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  width: "100%",
  marginTop: "10px",
},
};

export default AlarmClock;
