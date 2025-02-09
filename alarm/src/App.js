import React, {useState,useEffect,useRef} from  "react";
const AlarmClock = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString())// Get current time 
  const [snoozeCount, setSnoozeCount] = useState(0)
  const [alarmTime, setAlarmTime] = useState("");
  const [isAlarmOn, setAlarmOn] = useState(false);
  const [alarmTriggered, setAlarmTriggered] = useState(false); // Prevents multiple alerts
  const [showSnooze, setShowSnooze] = useState(false);
  const alarmSound = useRef(null); // Use useRef but initialize it in useEffect

  useEffect(() => { // Load the alarm sound
    alarmSound.current = new Audio("/sound/alarm_sound.wav"); // Initialize the audio instance
  }, []);
useEffect(() => { // Check if the alarm time matches the current time
  const interval = setInterval(() => {
    const currentTime = new Date().toLocaleTimeString("en-US", { hour12: false });
    setTime(currentTime)
    if (
      isAlarmOn &&
      alarmTime === currentTime.slice(0, 5) &&
      !alarmTriggered &&
      alarmSound.current
    ) {
      alarmSound.current.loop = true;
      alarmSound.current.play();
      setAlarmTriggered(true);
      setShowSnooze(true);
   
    }
  }, 1000);
  return () => clearInterval(interval);
}, [alarmTime, isAlarmOn, alarmTriggered]); // Run the effect only when these values change

const handleSnooze = () => {
  if (snoozeCount < 2) {  // Counts the number of snoozes 
  if (alarmSound.current) {
    alarmSound.current.pause();
    alarmSound.current.currentTime = 0;
  }
  setSnoozeCount(prev=>prev+1);
  setShowSnooze(false); // Hide snooze button

    setTimeout(() => {
    setShowSnooze(true); // Reappear after 10 seconds
    if (alarmSound.current) {
      alarmSound.current.play(); // Play alarm sound again when snooze ends
    }
  }, 10000);
    
    alert("Snoozed! Next time it won't be this easy...");
  } else { // User has snoozed 3 times
    let challenge = Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10);
    let userAnswer = prompt(`Solve this to snooze: ${challenge} + ${challenge} = ?`);
    if (parseInt(userAnswer) === challenge * 2) { // Correct answer 
      alert("Fine, you can snooze.");
      if (alarmSound.current) { // Stop alarm sound
        alarmSound.current.pause();
        alarmSound.current.currentTime = 0;
      }
      setShowSnooze(false);

      setTimeout(() => { // Snooze for 10 seconds
        setShowSnooze(true);
        if (alarmSound.current) {
          alarmSound.current.play();
        }
      }, 10000);
    } else { // Wrong answer
      alert("Wrong answer! Alarm stays on!");
      setShowSnooze(true);
      if (alarmSound.current) {
        alarmSound.current.play();
      }
    }
  }
};

const handleSetAlarm = () => {
  if (alarmTime) {
    setAlarmOn(true);
    setAlarmTriggered(false); //  Reset trigger when setting a new alarm
      setShowSnooze(false); //  Hide snooze initially
    alert(`Alarm set for ${alarmTime}`);
  }
};
const handleStopAlarm = () => {
  if (alarmSound.current) { // Stop alarm sound
    alarmSound.current.pause();
    alarmSound.current.currentTime = 0;
    alarmSound.current.loop = false;
  }
  setAlarmOn(false); // Turn off alarm
  setAlarmTriggered(false);// Reset alarm trigger
  setShowSnooze(false); // Hide snooze button
};
// Render the UI
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
      {/*  Snooze button appears only AFTER the alarm rings */}
      {showSnooze && (
          <button onClick={handleSnooze} style={styles.snoozeButton}>
            Snooze
          </button>
      )}
      {alarmTriggered && <button onClick={handleStopAlarm} style={styles.stopButton}>Stop</button>}
    </div>
  </div>
);
};

// Styles
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
stopButton: {
  padding: "10px 20px",
  fontSize: "16px",
  color: "white",
  background: "#ff6b81",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  width: "100%",
  marginTop: "10px",
},
};

export default AlarmClock;
