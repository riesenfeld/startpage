const overlay = document.getElementById("background-overlay")

let params = {
  color1: [255, 0, 0, 0.2],
  color2: [0, 0, 255, 0.2],
  degree: 0,
}

let countingUpOrDown = ["up", "up", "up"]

const arrayToRGBA = function (arr) {
  return `rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, ${arr[3]})`
}

const shiftColor = function (arr) {
  for (i = 0; i < 3; i++) {
    let rand = Math.floor(Math.random() * 10)
    if (countingUpOrDown[i] == "up" && arr[i] + rand >= 360) {
      countingUpOrDown[i] = "down"
    } else if (countingUpOrDown[i] == "down" && arr[i] - rand <= -1) {
      countingUpOrDown[i] = "up"
    }

    if (countingUpOrDown[i] == "up") {
      arr[i] = arr[i] + 1
    } else if (countingUpOrDown[i] == "down") {
      arr[i] = arr[i] - 1
    }
  }
  return [arr[0], arr[1], arr[2], arr[3]]
}

const updateOverlay = function () {
  params.degree = (params.degree + 1) % 360
  params.color1 = shiftColor(params.color1)
  params.color2 = shiftColor(params.color2)

  let color1 = arrayToRGBA(params.color1)
  let color2 = arrayToRGBA(params.color2)

  gradientString = `linear-gradient(${params.degree}deg, ${color1}, ${color2})`
  gradientString = `linear-gradient(45deg, red 0 50%, blue 50% 100%)`
  overlay.style.background = gradientString
}

window.setInterval(updateOverlay, 50)
