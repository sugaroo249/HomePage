/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"YZtmpXaKCjrtkbML","label":"Reddit","bookmarks":[{"id":"qFK4Yz3t4uhvSKMH","label":"r/Ithaca","url":"https://www.reddit.com/r/ithaca/"},{"id":"jXyYhtYplv0AZnIh","label":"r/Cornell","url":"https://www.reddit.com/r/Cornell/"},{"id":"UZeWw0A4PkH0LfRq","label":"r/Sysadmin","url":"https://www.reddit.com/r/sysadmin/"},{"id":"0oQFNmCz7w0UwLUY","label":"r/Piracy","url":"https://www.reddit.com/r/Piracy/"}]},{"id":"izoK9GR8WBlJxy1p","label":"Hobbies","bookmarks":[{"id":"2ELYFjBxydbu4235","label":"Forum","url":"https://fora.snahp.eu/"},{"id":"Z1GEpqjEm36OHO3Z","label":"Blood Donation","url":"https://www.redcross.org/"}]},{"id":"rCIsWGgSeMdMwDu6","label":"worth reading","bookmarks":[{"id":"YL253iosqvfMwyc9","label":"happy hues","url":"https://www.happyhues.co/"},{"id":"qcR9RNXpN7EaD7n2","label":"styled-components","url":"https://www.joshwcomeau.com/react/demystifying-styled-components/"},{"id":"ts95PcWtJ5QobtYV","label":"react docs","url":"https://react.dev/learn"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
