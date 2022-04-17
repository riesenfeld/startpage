const searchTypeImage = document.getElementById("search-type-image")

const forwardSearch = function () {
  let searchTerm = document.getElementById("searchterm").value
  let searchType = document.getElementById("search-types").value
  let url = "https://duckduckgo.com/?q="
  switch (searchType) {
    case "google":
      url = "https://www.google.com/search?q="
      break
    case "wikipedia":
      url = "https://en.wikipedia.org/w/index.php?search="
      break
    case "amazon":
      url = "https://www.amazon.com/s?k="
      break
    default:
      break
  }
  window.location.href = url + searchTerm
}
const updateImage = function (value) {
  switch (value) {
    case "google":
      searchTypeImage.src = "/static/images/google_logo.svg"
      break
    case "wikipedia":
      searchTypeImage.src = "/static/images/wiki_logo.svg"
      break
    case "amazon":
      searchTypeImage.src = "/static/images/amazon_logo.svg"
      break
    default:
      searchTypeImage.src = "/static/images/ddg_logo.svg"
      break
  }
}
/* In case the page loads with a searchType other than DDG (which
 * can happen in certain circumstances such as performing a
 * non-cache-clearing refresh (F5) or hitting the back button to
 * return to this page after a search), we want to make sure the
 * correct searchTypeImage is loaded.
 */
updateImage(document.getElementById("search-types").value)
