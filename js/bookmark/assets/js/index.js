(function () {
  // Assuming that `dialog.js` script added before this script in the markup
  var dialogAttrs = [
    ["role", "alertdialog"],
    ["aria-label", "Form validation error!"],
    ["aria-describedby", "form-error-dialog-body"],
  ];
  var formErrorDialogTriggers = createDialog(
    "form-error-dialog-body",
    null,
    dialogAttrs
  );
  var showFormErrorDialog = formErrorDialogTriggers[0];
  var storageErrorNode = document.createElement("p");
  storageErrorNode.textContent = "Unable to use browser storage for bookmarks!";
  var storageDialogTriggers = createDialog(storageErrorNode, null, dialogAttrs);
  var showStorageDialog = storageDialogTriggers[0];

  var urlInput = document.getElementById("url");
  var nameInput = document.getElementById("name");
  var submitBtn = document.getElementById("submit");
  var bookmarksContainer = document.getElementById("bookmarks-container");

  var nextIndex = 0;
  var indexToEdit = null;

  var bookmarks = [];

  var DEFAULT_URL_SCHEME = "https://";
  var BOOKMARK_ID_PREFIX = "bookmark-row-";
  var BOOKMARK_INDEX_CLASS = "index";
  var BOOKMARK_NAME_CLASS = "name";
  var DELETE_BTN_CLASS = "delete";
  var VISIT_BTN_CLASS = "visit";
  var EDIT_BTN_CLASS = "edit";
  var STORAGE_KEY = "hmk_bookmarks";

  function saveBookmarks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch {
      showStorageDialog();
    }
  }

  function focusElementTemporarily(element, periodInMS) {
    element.focus();
    setTimeout(() => element.blur(), periodInMS);
  }

  function displayNewBookmark(bookmark, initDisplay) {
    // Create bookmark row
    var bookmarkRow = document.createElement("tr");
    bookmarkRow.id = BOOKMARK_ID_PREFIX + bookmark.index;
    // Create index data
    var indexData = document.createElement("td");
    indexData.className = BOOKMARK_INDEX_CLASS;
    indexData.textContent = bookmark.index + 1;
    // Create name data
    var nameData = document.createElement("td");
    nameData.className = BOOKMARK_NAME_CLASS;
    nameData.textContent = bookmark.name;
    // Create url data
    var urlAnchor = document.createElement("a");
    urlAnchor.href = bookmark.url;
    urlAnchor.target = "_blank";
    urlAnchor.rel = "noopener noreferrer";
    urlAnchor.className = "btn fai " + VISIT_BTN_CLASS;
    urlAnchor.textContent = "Visit in new tab";
    var urlData = document.createElement("td");
    urlData.appendChild(urlAnchor);
    // Create edit button data
    var editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "btn fai " + EDIT_BTN_CLASS;
    editBtn.textContent = "Edit";
    editBtn.onclick = function () {
      editBookmark(bookmark.index);
    };
    var editData = document.createElement("td");
    editData.appendChild(editBtn);
    // Create delete button data
    var delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "btn fai " + DELETE_BTN_CLASS;
    delBtn.textContent = "Delete";
    delBtn.onclick = function () {
      deleteBookmark(bookmark.index);
    };
    var delData = document.createElement("td");
    delData.appendChild(delBtn);
    // Append all data to the bookmark row, then append it to the container
    bookmarkRow.append(indexData, nameData, urlData, editData, delData);
    bookmarksContainer.appendChild(bookmarkRow);
    // Focus/Scroll after new bookmark added, not on initial display
    if (!initDisplay) {
      focusElementTemporarily(urlAnchor, 1000);
    }
  }

  function displayEditedBookmark(bookmark) {
    var nameClass = "." + BOOKMARK_NAME_CLASS;
    var bookmarkId = BOOKMARK_ID_PREFIX + bookmark.index;
    var bookmarkRow = document.getElementById(bookmarkId);
    var nameData = bookmarkRow.querySelector(nameClass);
    var urlAnchor = bookmarkRow.querySelector("a");
    nameData.textContent = bookmark.name;
    urlAnchor.href = bookmark.url;
    focusElementTemporarily(urlAnchor, 1000);
  }

  function emptyBookmarksContainer() {
    bookmarksContainer.innerHTML = "";
  }

  function updateIndexes() {
    nextIndex = 0;
    emptyBookmarksContainer();
    for (var i = 0; i < bookmarks.length; i++) {
      var bookmark = bookmarks[i];
      bookmark.index = nextIndex++;
      displayNewBookmark(bookmark, true);
    }
    saveBookmarks();
  }

  function deleteBookmark(index) {
    bookmarks.splice(index, 1);
    updateIndexes();
  }

  function editBookmark(index) {
    var bookmark = bookmarks[index];
    nameInput.value = bookmark.name;
    urlInput.value = bookmark.url;
    indexToEdit = index;
    nameInput.focus();
  }

  function isValidUrl(url) {
    var URL_REGEX =
      /^https?:\/\/(www\.)?([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,63}(\/[^\/\s][^\s]*)?$/;
    return URL_REGEX.test(url);
  }

  function isValidName(name) {
    var NAME_REGEX = /^[a-zA-Z0-9](\s?[\w\.-]){2,}$/;
    return NAME_REGEX.test(name);
  }

  function resetInputs() {
    nameInput.value = "";
    urlInput.value = "";
    nameInput.classList.remove("valid", "invalid");
    urlInput.classList.remove("valid", "invalid");
  }

  function submitBookmark() {
    var newBookmark = {
      name: nameInput.value.trim(),
      url: urlInput.value.trim(),
    };
    if (isValidName(newBookmark.name) && isValidUrl(newBookmark.url)) {
      if (indexToEdit === null) {
        // Create
        newBookmark.index = nextIndex++;
        bookmarks.push(newBookmark);
        displayNewBookmark(newBookmark);
      } else {
        // Update
        var oldBookmark = bookmarks[indexToEdit];
        oldBookmark.name = newBookmark.name;
        oldBookmark.url = newBookmark.url;
        indexToEdit = null;
        displayEditedBookmark(oldBookmark);
      }
      saveBookmarks();
      resetInputs();
    } else {
      showFormErrorDialog();
    }
  }

  function replaceElementClass(element, oldClass, newClass) {
    element.classList.remove(oldClass);
    element.classList.add(newClass);
  }

  function validateInput(input, validator) {
    if (validator(input.value.trim())) {
      replaceElementClass(input, "invalid", "valid");
    } else {
      replaceElementClass(input, "valid", "invalid");
    }
  }

  function validateNameOnInput(event) {
    validateInput(event.target, isValidName);
  }

  function validateUrlOnInput(event) {
    validateInput(event.target, isValidUrl);
  }

  function submitOnEnterKeydown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      submitBookmark();
    }
  }

  function addDefaultUrlSchemeOnFocus(event) {
    if (event.target.value === "") {
      event.target.value = DEFAULT_URL_SCHEME;
    }
  }

  function removeDefaultUrlSchemeOnBlur(event) {
    if (event.target.value === DEFAULT_URL_SCHEME) {
      event.target.value = "";
    }
  }

  urlInput.onblur = removeDefaultUrlSchemeOnBlur;
  urlInput.onfocus = addDefaultUrlSchemeOnFocus;
  nameInput.onkeydown = submitOnEnterKeydown;
  urlInput.onkeydown = submitOnEnterKeydown;
  nameInput.oninput = validateNameOnInput;
  urlInput.oninput = validateUrlOnInput;
  submitBtn.onclick = submitBookmark;

  try {
    var oldBookmarks = localStorage.getItem(STORAGE_KEY);
    if (oldBookmarks) {
      bookmarks = JSON.parse(oldBookmarks);
      for (var i = 0; i < bookmarks.length; i++) {
        displayNewBookmark(bookmarks[i], true);
      }
      nextIndex = bookmarks.length;
    }
  } catch {
    showStorageDialog();
  }
})();
