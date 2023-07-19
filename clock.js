function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // Add leading zeros to hours, minutes, and seconds
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  const clockElement = document.getElementById("clock");
  clockElement.innerText = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);
