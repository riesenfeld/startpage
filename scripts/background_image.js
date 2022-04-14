const imgContainer = document.getElementById("background-image-container")
const img = document.getElementById("background-image")
const info = document.getElementById("info-footer")

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

const setBackgroundImage = function (obj) {
  const resource = obj.url
  const imageURL = `https://cdn.spacetelescope.org/archives/images/screen/${obj.id}.jpg`
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
  info.innerHTML = `<a href="${infoURL}">${obj.title}</a>`
  console.log(obj.id)
}

const initBackgroundImage = function () {
  let obj = getImageFromQueryParams()
  if (obj == null) {
    obj = chooseRandomBackgroundImage()
  }
  setBackgroundImage(obj)
}

initBackgroundImage()
