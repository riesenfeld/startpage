const overlay = document.getElementById("background-overlay")

const getRandomColor = function (alpha) {
  return [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), alpha]
}

let gradients = {
  gradient1: {
    angle: 0,
    color1: getRandomColor(0.8),
    color2: getRandomColor(0),
    stop: 70.71,
    countingUpOrDown1: ["up", "up", "up"],
    countingUpOrDown2: ["up", "up", "up"],
  },
  gradient2: {
    angle: 120,
    color1: getRandomColor(0.8),
    color2: getRandomColor(0),
    stop: 70.71,
    countingUpOrDown1: ["up", "up", "up"],
    countingUpOrDown2: ["up", "up", "up"],
  },
  gradient3: {
    angle: 240,
    color1: getRandomColor(0.8),
    color2: getRandomColor(0),
    stop: 70.71,
    countingUpOrDown1: ["up", "up", "up"],
    countingUpOrDown2: ["up", "up", "up"],
  },
}

const shiftColor = function (colorArray, countingUpOrDown) {
  for (i = 0; i < 3; i++) {
    let rand = Math.floor(Math.random() * 10)
    if (countingUpOrDown[i] == "up" && colorArray[i] + rand >= 255) {
      countingUpOrDown[i] = "down"
    } else if (countingUpOrDown[i] == "down" && colorArray[i] - rand <= -1) {
      countingUpOrDown[i] = "up"
    }

    if (countingUpOrDown[i] == "up") {
      colorArray[i] = colorArray[i] + 1
    } else if (countingUpOrDown[i] == "down") {
      colorArray[i] = colorArray[i] - 1
    }
  }
  return [colorArray[0], colorArray[1], colorArray[2], colorArray[3]]
}

const shiftColors = function () {
  for (let gradient in gradients) {
    shiftColor(gradients[gradient].color1, gradients[gradient].countingUpOrDown1)
    shiftColor(gradients[gradient].color2, gradients[gradient].countingUpOrDown2)
  }
}

const incrementAngles = function () {
  for (gradient in gradients) {
    gradients[gradient].angle = (gradients[gradient].angle + 1) % 360
  }
}

const updateGradients = function () {
  incrementAngles()
  shiftColors()
}

const produceGradientString = function (gradient) {
  const rgba1 = `rgba(${gradient.color1[0]}, ${gradient.color1[1]}, ${gradient.color1[2]}, ${gradient.color1[3]})`
  const rgba2 = `rgba(${gradient.color2[0]}, ${gradient.color2[1]}, ${gradient.color2[2]}, ${gradient.color2[3]})`
  return `linear-gradient(${gradient.angle}deg, ${rgba1}, ${rgba2} ${gradient.stop}%)`
}

const updateOverlay = function () {
  updateGradients()
  let stackedGradientString = `${produceGradientString(gradients.gradient1)}, ${produceGradientString(gradients.gradient2)}, ${produceGradientString(gradients.gradient3)}`
  overlay.style.background = stackedGradientString
}

updateOverlay()
window.setInterval(updateOverlay, 50)
