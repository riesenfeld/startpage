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

const getDateAndTime = function () {
  let d = new Date()
  let localeString = d.toLocaleString()
  let parsed = localeString.split(",")
  let currentDate = translateToDayString(d.getDay()) + ", " + parsed[0]
  let currentTime = parsed[1]
  return [currentDate, currentTime]
}

const updateClock = function () {
  let dateAndTime = getDateAndTime()
  date.innerText = dateAndTime[0]
  time.innerText = dateAndTime[1]
  const seconds = parseInt(dateAndTime[1].split(":")[2])
  clock.dataset.seconds = seconds
}

let testSeconds = 50
const testClock = function () {
  time.innerText = testSeconds
  clock.dataset.seconds = testSeconds
  testSeconds = (testSeconds + 1) % 60
}

const setStartingPosition = function () {
  let dateAndTime = getDateAndTime()
  date.innerText = dateAndTime[0]
  time.innerText = dateAndTime[1]
  const seconds = parseInt(dateAndTime[1].split(":")[2])
  const startingDegree = Math.round((seconds / 60) * 360)
  setInitialTransform(startingDegree)
}

const setInitialTransform = function (startingDegree) {
  clock.style.transition = "transform 0s"
  clock.style.transform = `rotate(${startingDegree}deg)`
}

const removeInitialTransform = function () {
  clock.style.removeProperty("transition")
  clock.style.removeProperty("transform")
}

const initClock = function () {
  setTimeout(() => clock.classList.remove("just-loaded"), 1200)
  setStartingPosition()
  setTimeout(() => removeInitialTransform(), 1000)
  window.setInterval(updateClock, 1000)
}

initClock()
