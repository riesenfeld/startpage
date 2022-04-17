const clock = document.getElementById("clock")
const date = document.getElementById("date")
const time = document.getElementById("time")

function translateToDayString(i) {
  let result = ""
  switch (i) {
    case 0:
      result += "Sunday"
      break
    case 1:
      result += "Monday"
      break
    case 2:
      result += "Tuesday"
      break
    case 3:
      result += "Wednesday"
      break
    case 4:
      result += "Thursday"
      break
    case 5:
      result += "Friday"
      break
    case 6:
      result += "Saturday"
      break
  }
  return result
}

const updateClock = function () {
  let d = new Date()
  let localeString = d.toLocaleString()
  let parsed = localeString.split(",")
  date.innerText = translateToDayString(d.getDay()) + ", " + parsed[0]
  time.innerText = parsed[1]
  const seconds = parseInt(parsed[1].split(":")[2])
  clock.dataset.seconds = seconds
}

const initClock = function () {
  updateClock()
  /* Remove the fade-in on page load so that it doesn't recur when the clock
   * returns to the starting position */
  setTimeout(() => clock.classList.remove("fade-in"), 1200)
  window.setInterval(updateClock, 1000)
}

initClock()
