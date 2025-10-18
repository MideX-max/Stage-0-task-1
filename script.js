const timeElement = document.getElementById("user-time");
function updateTime() {
  timeElement.textContent = Date.now();
}
updateTime();

setInterval(updateTime, 1000);
