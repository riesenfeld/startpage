importScripts("https://sdk.amazonaws.com/js/aws-sdk-2.1090.0.min.js")
/**
 *  Listen for messages posted to this web worker
 */
addEventListener("message", (message) => {
  if (message.data.command === "fetch") {
    getObject(message.data.id)
  }
})
/**
 *  AWS initialization
 */
var bucketName = "riesenfeld.dev"
// Initialize the Amazon Cognito credentials provider
AWS.config.region = "us-west-2" // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-west-2:5c17ff64-4a5a-4189-887f-64d4f6771abb",
})
// Create a new service object
var s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: bucketName },
})

const encode = function (data) {
  var str = data.reduce(function (a, b) {
    return a + String.fromCharCode(b)
  }, "")
  return btoa(str).replace(/.{76}(?=.)/g, "$&\n")
}

const makeDataURL = function (data) {
  return "data:" + data.ContentType + ";base64," + encode(data.Body)
}

const makeFallbackURL = function (imageID) {
  return `https://cdn.spacetelescope.org/archives/images/screen/${imageID}.jpg`
}

const getObject = function (imageID) {
  var getObjectParams = {
    Bucket: "riesenfeld.dev",
    Key: `files/hubble/screen/${imageID}.jpg`,
  }
  s3.getObject(getObjectParams, function (err, data) {
    if (err) {
      /* If the S3 API fails, just get the image directly from the ESA Hubble CDN */
      postMessage(makeFallbackURL(imageID))
    } else {
      postMessage(makeDataURL(data))
    }
  })
}
