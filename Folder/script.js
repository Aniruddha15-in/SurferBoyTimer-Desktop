let countdownInterval;
let totalMilliseconds = 0;
let remainingTime = 0;
let isPaused = false;

function startCountdown() {
  clearInterval(countdownInterval); // Ensure no duplicate timers

  // Get input values
  const hrs = parseInt(document.getElementById("hours").value) || 0;
  const mins = parseInt(document.getElementById("minutes").value) || 0;
  const secs = parseInt(document.getElementById("seconds").value) || 0;

  // Convert total time to milliseconds
  totalMilliseconds = (hrs * 3600 + mins * 60 + secs) * 1000;
  remainingTime = totalMilliseconds;

  if (remainingTime <= 0) {
    alert("Please enter a duration greater than 0.");
    return;
  }

  isPaused = false;
  updateCountdown(); // Start the countdown loop
}

function updateCountdown() {
  const endTime = new Date().getTime() + remainingTime;

  countdownInterval = setInterval(() => {
    if (!isPaused) {
      const now = new Date().getTime();
      remainingTime = endTime - now;

      const display = document.getElementById("timer");

      if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        document.getElementById("alarmSound").play();
        display.innerHTML = "EXPIRED";
      } else {
        const hours = Math.floor(remainingTime / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        display.innerHTML = `${hours}h ${minutes}m ${seconds}s`;
      }
    }
  }, 1000);
}

function pauseCountdown() {
  if (countdownInterval) {
    isPaused = !isPaused;
    document.getElementById("pauseBtn").textContent = isPaused ? "Resume" : "Pause";
    if (!isPaused) updateCountdown(); // Resume timer
    else clearInterval(countdownInterval); // Pause timer
  }
}

function resetCountdown() {
  clearInterval(countdownInterval);
  remainingTime = 0;
  isPaused = false;
  document.getElementById("pauseBtn").textContent = "Pause";
  document.getElementById("timer").innerHTML = "0h 0m 0s";
}
