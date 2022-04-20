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
  // let d = new Date()
  // let localeString = d.toLocaleString()
  // let parsed = localeString.split(",")
  // date.innerText = translateToDayString(d.getDay()) + ", " + parsed[0]
  // time.innerText = parsed[1]
  date.innerText = dateAndTime[0]
  time.innerText = dateAndTime[1]
  const seconds = parseInt(dateAndTime[1].split(":")[2])
  clock.dataset.seconds = seconds
}

let testSeconds = 50
const testClock = function () {
  time.innerText = testSeconds
  clock.dataset.seconds = testSeconds
  // console.log(`seconds: ${testSeconds}, degrees: ${(testSeconds / 60) * 360}`)
  testSeconds = (testSeconds + 1) % 60
  console.log(`INSIDE TESTCLOCK clock.style.transition: ${window.getComputedStyle(clock).transition}`)
}

// let testSeconds2 = 0
// const testClock2 = function () {
//   clock.dataset.seconds = testSeconds2
//   console.log(`seconds: ${testSeconds2}, degrees: ${(testSeconds2 / 4) * 360}`)
//   testSeconds2 = (testSeconds2 + 1) % 4
// }

// let testSeconds3 = 59
// const testClock3 = function () {
//   time.innerText = testSeconds3
//   const degree = Math.round((testSeconds3 / 60) * 360)
//   testSeconds3 = (testSeconds + 1) % 60
//   // const rotation Animation =
// }

const setStartingPosition = function () {
  // time.innerText = testSeconds
  let dateAndTime = getDateAndTime()
  date.innerText = dateAndTime[0]
  time.innerText = dateAndTime[1]
  const seconds = parseInt(dateAndTime[1].split(":")[2])
  const startingDegree = Math.round((seconds / 60) * 360)
  // const animationTransform = [{ transform: `rotate(0deg)` }, { transform: `rotate(${startingDegree}deg)` }]
  // const animationTiming = { duration: 100 } /* Might not need this */
  // clock.animate(animationTransform, animationTiming)
  console.log(`starting degree: ${startingDegree}`)
  // clock.style.transform = `rotate(${startingDegree}deg)`
  setInitialTransform(startingDegree)
  // testSeconds = (testSeconds + 1) % 60
}

const setInitialTransform = function (startingDegree) {
  clock.style.transition = "transform 0s"
  // clock.style.transition = "transform 0.5s cubic-bezier(0, 0.58, 1, 0.42)"
  clock.style.transform = `rotate(${startingDegree}deg)`
}

const removeInitialTransform = function () {
  clock.style.removeProperty("transition")
  clock.style.removeProperty("transform")
}

const initClock = function () {
  // updateClock()
  /* Remove the fade-in on page load so that it doesn't recur when the clock
   * returns to the starting position */
  setTimeout(() => clock.classList.remove("just-loaded"), 1200)
  // window.setInterval(updateClock, 1000)

  // testClock()
  setStartingPosition()
  // clock.style.removeProperty("transform")
  console.log(`BEFORE REMOVAL clock.style.transition: ${window.getComputedStyle(clock).transition}`)
  setTimeout(() => removeInitialTransform(), 1000)
  console.log(`AFTER REMOVAL clock.style.transition: ${window.getComputedStyle(clock).transition}`)

  // window.setInterval(testClock, 1000)
  window.setInterval(updateClock, 1000)

  // testClock2()
  // window.setInterval(testClock2, 2000)
}

// let arr = []
// for (let i = 0; i < 60; i++) {
//   let degree = i / 60 / 360
//   arr.push([i, degree])
// }
// console.log(arr)

initClock()
