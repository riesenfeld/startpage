const imgContainer = document.getElementById("background-image-container")
const img = document.getElementById("background-image")
const info = document.getElementById("info-footer")

const worker = new Worker("scripts/fetch_image.js")

const pickRandomPhoto = function (photoArray) {
  const randomIndex = Math.floor(Math.random() * photoArray.length)
  return photoArray[randomIndex].path
}

const getImageFromQueryParams = function () {
  let queryParams = new URLSearchParams(window.location.search)
  let id = queryParams.get("id")
  let arr = backgroundSources.filter((el) => el.id == id)
  if (arr.length < 1) {
    return null
  } else return arr[0]
}

const detectWindowOrientation = function () {
  const orientation = window.innerWidth / window.innerHeight
  if (orientation > 1) {
    return "landscape"
  } else if (orientation < 1) {
    return "portrait"
  } else return "square"
}

const detectImageOrientation = function (obj) {
  if (obj.width > obj.height) {
    return "landscape"
  } else if (obj.width < obj.height) {
    return "portait"
  } else return "square"
}

const chooseRandomBackgroundImage = function () {
  const randomIndex = Math.floor(Math.random() * backgroundSources.length)
  return backgroundSources[randomIndex]
}

const insertLineBreak = function (titleText) {
  const halfwayPoint = Math.ceil(titleText.length / 2)
  const spaces = [...titleText.matchAll(" ")]
  const indices = spaces.map((space) => space.index)
  /* We want to make the two lines as even as possible */
  const breakingPointAfter = indices.find((index) => index >= halfwayPoint)
  const breakingPointBefore = indices.reverse().find((index) => index <= halfwayPoint)
  if (breakingPointAfter - halfwayPoint < halfwayPoint - breakingPointBefore) {
    return "<span>" + titleText.slice(0, breakingPointAfter + 1) + "</span><span>" + titleText.slice(breakingPointAfter + 1) + "</span>"
  } else {
    return "<span>" + titleText.slice(0, breakingPointBefore + 1) + "</span><span>" + titleText.slice(breakingPointBefore + 1) + "</span>"
  }
}

const setBackgroundImage = function (obj, imageURL) {
  const resource = obj.url
  const infoURL = `https://esahubble.org${resource}`
  const windowOrientation = detectWindowOrientation()
  const imageOrientation = detectImageOrientation(obj)

  if (windowOrientation == "portrait" && imageOrientation == "landscape") {
    imgContainer.style.width = "100vh"
    imgContainer.style.height = "100vw"
    imgContainer.style.transform = `translate(calc((100vw - 100vh) / 2), calc((100vh - 100vw) / 2)) rotate(90deg)`
  } else if (windowOrientation == "landscape" && imageOrientation == "portait") {
    imgContainer.style.width = "100vh"
    imgContainer.style.height = "100vw"
    imgContainer.style.transform = `translate(calc((100vw - 100vh) / 2), calc((100vh - 100vw) / 2)) rotate(90deg)`
  } else {
    imgContainer.style.width = "100vw"
    imgContainer.style.height = "100vh"
  }
  img.src = imageURL

  if (obj.title.length > 59) {
    obj.title = insertLineBreak(obj.title)
  }
  info.innerHTML = `<a href="${infoURL}">${obj.title}</a>`
  console.log("Permanent URL for this background image: ?id=" + obj.id)
}

const setLowResBackgroundImage = function (obj) {
  const url = `https://cdn.spacetelescope.org/archives/images/thumb300y/${obj.id}.jpg`
  setBackgroundImage(obj, url)
}

const initBackgroundImage = function () {
  let obj = getImageFromQueryParams()
  if (obj == null) {
    obj = chooseRandomBackgroundImage()
  }
  /* We can set the background faster by first grabbing a low-resolution version
   * of the image we want, and then replacing it later. */
  setLowResBackgroundImage(obj)
  worker.addEventListener("message", (message) => {
    setBackgroundImage(obj, message.data)
  })
  worker.postMessage({
    command: "fetch",
    id: obj.id,
  })
}

initBackgroundImage()
