/**
 * Takes an id for the dialog's body markup to be selected with it,
 * an array of classes, and an array of attributes as key-value pairs.
 * The classes and attributes will be added to the dialog
 * and could be something like `aria-labelledby` for accessibility.
 * returns a pair of functions to show and hide the dialog (respectively),
 * and handles all the logic that happen between showing & hiding the dialog.
 *
 * NOTE: You must add style sheet 'dialog.css' to the markup in order to get the intended look.
 *
 * @param {string | node} dialogBodyNodeOrId - A `Node` object has dialog body or a string `id` to get it form DOM
 * @param {string[]?} classNames - An array of classes
 * @param {[string, string][]?} attrsKVPairs - An array of attributes as key-value pairs
 * @returns {[show: function, hide: function]}
 */
function createDialog(dialogBodyNodeOrId, classNames, attrsKVPairs) {
  var dialogBody = dialogBodyNodeOrId;
  if (typeof dialogBody === "string") {
    dialogBody = document.getElementById(dialogBody);
    dialogBody.remove();
  }

  // Create dialog elements
  var dialog = document.createElement("div");
  dialog.className = "dialog";
  if (classNames) {
    if (!Array.isArray(classNames)) {
      throw TypeError(
        "'classNames' arguments must be an array! Given '" + classNames + "'"
      );
    }
    dialog.className += " " + classNames.join(" ");
  }
  if (attrsKVPairs) {
    if (!Array.isArray(attrsKVPairs)) {
      throw TypeError(
        "'attrsKVPairs' arguments must be an array! Given '" +
          attrsKVPairs +
          "'"
      );
    }
    for (var i = 0; i < attrsKVPairs.length; i++) {
      var attrKey = attrsKVPairs[i][0];
      var attrVal = attrsKVPairs[i][1];
      dialog.setAttribute(attrKey, attrVal);
    }
  }
  var dialogContent = document.createElement("div");
  dialogContent.className = "dialog-content";
  var dialogTitleBar = document.createElement("div");
  dialogTitleBar.className = "dialog-title-bar";
  var circles = document.createElement("div");
  circles.className = "circles";
  var circlesClasses = [
    "sm-circle bg-danger",
    "sm-circle bg-warning",
    "sm-circle bg-success",
  ];
  for (var i = 0; i < circlesClasses.length; i++) {
    var circle = document.createElement("div");
    circle.className = circlesClasses[i];
    circles.appendChild(circle);
  }
  var closeBtnContainer = document.createElement("div");
  var closeBtn = document.createElement("button");
  closeBtn.className = "dialog-close-btn";
  closeBtn.title = "Close";
  closeBtnContainer.appendChild(closeBtn);
  dialogTitleBar.append(circles, closeBtnContainer);
  dialogContent.append(dialogTitleBar, dialogBody);
  dialog.appendChild(dialogContent);

  // Add dialog logic
  var lastFocusedBeforeShow = document.activeElement;

  var firstFocusable = closeBtn;
  var lastFocusable = closeBtn;
  // In case the dialog body does not have any focusable elements,
  // the focus will be trapped in the close button only.
  function updateLastFocusableElement() {
    const allElements = dialogBody.querySelectorAll("*");
    for (var i = 0; i < allElements.length; i++) {
      var element = allElements[i];
      if (element.tabIndex >= 0 && !element.hasAttribute("disabled")) {
        lastFocusable = element;
      }
    }
  }

  function trapFocusOnTabPressed(event) {
    if (event.key === "Tab" || event.keyCode === 9) {
      var currentFocused = document.activeElement;
      if (event.shiftKey) {
        if (currentFocused === firstFocusable) {
          event.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (currentFocused === lastFocusable) {
          event.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  }

  function closeOnEscapePressed(event) {
    if (event.key === "Escape" || event.keyCode === 27) {
      hideDialog();
    }
  }

  function handleKeyDownEvent(event) {
    closeOnEscapePressed(event);
    trapFocusOnTabPressed(event);
  }

  function showDialog() {
    lastFocusedBeforeShow = document.activeElement;
    updateLastFocusableElement();
    document.addEventListener("keydown", handleKeyDownEvent);
    document.body.appendChild(dialog);
    firstFocusable.focus();
  }

  function hideDialog() {
    document.removeEventListener("keydown", handleKeyDownEvent);
    dialog.remove();
    if (lastFocusedBeforeShow) lastFocusedBeforeShow.focus();
  }

  dialog.onclick = function (event) {
    if (event.target === dialog) {
      hideDialog();
    }
  };
  closeBtn.onclick = hideDialog;

  return [showDialog, hideDialog];
}
