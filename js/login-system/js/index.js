var SIGNUP_HASH = "#signup";
var LOGIN_HASH = "#login";
var HOME_HASH = "#home";
var LOGGED_IN_USER_KEY = "logged_in_user";
var USERS_KEY = "users";
var INPUTS_META = {
  name: {
    id: "name",
    regex: /^[a-zA-Z][\w\s'-\.\/]{1,50}$/,
    message:
      "A name must start with letter & contains at most 50 alphanumerical characters.",
  },
  email: {
    id: "email",
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#basic_validation
    regex: RegExp(
      [
        "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@",
        "[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?",
        "(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
      ].join("")
    ),
    message: "Invalid email!",
  },
  pass: {
    id: "pass",
    regex: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
    message:
      "A password must contain a minimum of 8 characters that have at least a letter and a number.",
  },
  pass_conf: {
    id: "pass_conf",
    regex: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
    message:
      "A password must contain a minimum of 8 characters that have at least a letter and a number.",
  },
};

var mainContainer = document.getElementById("main-container");
var footerContainer = document.getElementById("footer-container");

var users = [];
var loggedInUser = null;

try {
  var savedUsers = localStorage.getItem(USERS_KEY);
  if (savedUsers) users = JSON.parse(savedUsers);
  var loggedInUser = localStorage.getItem(LOGGED_IN_USER_KEY);
  if (loggedInUser) loggedInUser = JSON.parse(loggedInUser);
} catch {
  var header = document.getElementsByTagName("header")[0];
  if (header) {
    showAlert(
      header,
      "Cannot use the browser's storage to persist your data between reloads!"
    );
  }
}

if (loggedInUser) {
  showHomePage();
} else {
  if (window.location.hash === SIGNUP_HASH) showSignupPage();
  else showLoginPage();
}

function showHomePage() {
  var userName = createElement("span", loggedInUser.name, ["fw-normal"]);
  var greeting = createElement("h2", "Welcome home, ", [
    "text-primary",
    "mb-4",
    "mb-md-5",
    "fw-light",
  ]);
  greeting.appendChild(userName);
  greeting.appendChild(document.createTextNode("!"));
  updateMainContainer(greeting);
  var logoutBtn = createElement(
    "button",
    "log me out",
    ["btn", "btn-outline-secondary"],
    [["type", "button"]]
  );
  logoutBtn.addEventListener("click", logoutOnClick);
  var delAccountBtn = createElement(
    "button",
    "Delete me",
    ["btn", "btn-outline-danger"],
    [["type", "button"]]
  );
  delAccountBtn.addEventListener("click", deleteAccountOnClick);
  var footerContent = createElement("div", null, [
    "d-flex",
    "flex-wrap",
    "justify-content-evenly",
  ]);
  footerContent.appendChild(logoutBtn);
  footerContent.appendChild(delAccountBtn);
  updateFooterContainer(footerContent);
  window.location.hash = HOME_HASH;
}

function showSignupPage() {
  if (loggedInUser) {
    showHomePage();
  } else {
    showForm("Do you have an account?", "#", "Log In", true);
    window.location.hash = SIGNUP_HASH;
  }
}

function showLoginPage() {
  if (loggedInUser) {
    showHomePage();
  } else {
    showForm("Don't have an account?", "#", "Sign Up", false);
    window.location.hash = LOGIN_HASH;
  }
}

function showForm(footerText, footerLinkHref, footerLinkText, signup) {
  var form = createForm(signup);
  updateMainContainer(form);
  updateFooterContainer(
    createFooterContent(
      footerText,
      footerLinkHref,
      footerLinkText,
      function (e) {
        e.preventDefault();
        if (signup) showLoginPage();
        else showSignupPage();
      }
    )
  );
  form.elements[0].focus();
}

/**
 * Updates the input's validity state to 'valid', 'invalid', or 'default'
 * based on the second argument's value: true, false, or undefined, respectively.
 * @param {HTMLInputElement} input
 * @param {boolean} valid
 */
function updateInputValidityState(input, valid) {
  input.className = input.className.replace(" is-invalid border-danger", "");
  input.className = input.className.replace(" is-valid border-success", "");
  if (valid === true) {
    input.className += " is-valid border-success";
  } else if (valid === false) {
    input.className += " is-invalid border-danger";
  }
}

function addInvalidFeedback(input, msg) {
  input.insertAdjacentElement(
    "afterend",
    createElement("div", msg, ["invalid-feedback", "my-1"])
  );
}

function removeAllInvalidFeedbacks(container) {
  container.querySelectorAll(".invalid-feedback").forEach(function (node) {
    container.removeChild(node);
  });
}

function getLastFormElement(form) {
  return form.elements.length > 2
    ? form.elements[form.elements.length - 2]
    : formElements[0];
}

function isValidForm(form, loggingIn) {
  var isValidInput = function (input, regex) {
    return regex.test(input.value.trim());
  };
  removeAllInvalidFeedbacks(form);
  var validationResult = true;
  var emptyInputs = [];
  var allInputs = [];
  for (var key in INPUTS_META) {
    var inputMeta = INPUTS_META[key];
    var input = form.elements[inputMeta.id];
    if (input) {
      allInputs.push(input);
      if (!input.value) {
        emptyInputs.push(input);
      } else {
        var validInput = isValidInput(input, inputMeta.regex);
        updateInputValidityState(input, validInput);
        if (!validInput) {
          validationResult = false;
          addInvalidFeedback(input, inputMeta.message);
        }
      }
    }
  }
  if (emptyInputs.length > 0) {
    validationResult = false;
    emptyInputs.forEach(function (input) {
      updateInputValidityState(input, false);
      addInvalidFeedback(input, "This field is required!");
    });
  }
  if (loggingIn) {
    // Keep all inputs on invalid state for extra checks in login process
    allInputs.forEach(function (input) {
      updateInputValidityState(input, false);
    });
  }
  return validationResult;
}

function createEmailMatcher(emailToFind) {
  return function (user) {
    return user.email === emailToFind;
  };
}

function signupOnSubmit(e) {
  e.preventDefault();
  var form = e.target;
  if (isValidForm(form)) {
    var passConfInput = form.elements[INPUTS_META.pass_conf.id];
    var emailInput = form.elements[INPUTS_META.email.id];
    var passInput = form.elements[INPUTS_META.pass.id];
    var nameInput = form.elements[INPUTS_META.name.id];
    var findUserByEmail = createEmailMatcher(emailInput.value);
    var foundUserEmail = users.find(findUserByEmail);
    var passConfNotMatch = passInput.value !== passConfInput.value;
    if (foundUserEmail) {
      updateInputValidityState(emailInput, false);
      addInvalidFeedback(emailInput, "This email is already exists!");
    }
    if (passConfNotMatch) {
      updateInputValidityState(passInput, false);
      updateInputValidityState(passConfInput, false);
      addInvalidFeedback(
        passConfInput,
        "Confirmation password must match the original password."
      );
    }
    if (!foundUserEmail && !passConfNotMatch) {
      users.push({
        email: emailInput.value,
        name: nameInput.value,
        pass: passInput.value,
      });
      try {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
      } finally {
        showLoginPage();
      }
    }
  }
}

function loginOnSubmit(e) {
  e.preventDefault();
  var form = e.target;
  if (isValidForm(form, true)) {
    var errorMessage = "";
    var emailInput = form.elements[INPUTS_META.email.id];
    var passInput = form.elements[INPUTS_META.pass.id];
    var findUserByEmail = createEmailMatcher(emailInput.value);
    var savedUser = users.find(findUserByEmail);
    if (savedUser) {
      if (savedUser.pass === passInput.value) {
        loggedInUser = savedUser;
        try {
          localStorage.setItem(
            LOGGED_IN_USER_KEY,
            JSON.stringify(loggedInUser)
          );
        } finally {
          updateInputValidityState(emailInput, true);
          updateInputValidityState(passInput, true);
          showHomePage();
          return; // Fine ;)
        }
      }
      errorMessage = "Invalid email or password!";
    } else {
      errorMessage = "No signed-up account with the given email!";
    }
    updateInputValidityState(passInput, false);
    updateInputValidityState(emailInput, false);
    addInvalidFeedback(getLastFormElement(form), errorMessage);
  }
}

function logoutOnClick(e) {
  e.preventDefault();
  loggedInUser = null;
  try {
    localStorage.removeItem(LOGGED_IN_USER_KEY);
  } finally {
    showLoginPage();
  }
}

function deleteAccountOnClick(e) {
  e.preventDefault();
  if (confirm("Do you want to delete your account?")) {
    var findUser = createEmailMatcher(loggedInUser.email);
    var userIndex = users.findIndex(findUser);
    if (userIndex > -1) users.splice(userIndex, 1);
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      localStorage.removeItem(LOGGED_IN_USER_KEY);
    } finally {
      loggedInUser = null;
      showLoginPage();
    }
  }
}

function showAlert(container, msg) {
  var closeBtn = createElement(
    "button",
    null,
    ["btn-close"],
    [
      ["type", "button"],
      ["data-bs-dismiss", "alert"],
      ["aria-label", "Close"],
    ]
  );
  var alertBox = createElement(
    "div",
    msg,
    ["alert", "text-start", "alert-warning", "alert-dismissible"],
    [["role", "alert"]]
  );
  closeBtn.addEventListener("click", function (e) {
    container.removeChild(alertBox);
    mainContainer.focus();
  });
  alertBox.appendChild(closeBtn);
  container.appendChild(alertBox);
}

function updateMainContainer(mainContent) {
  emptyNode(mainContainer);
  mainContainer.appendChild(mainContent);
}

function updateFooterContainer(footerContent) {
  emptyNode(footerContainer);
  footerContainer.appendChild(footerContent);
}

function createLink(href, text, onClick) {
  var link = createElement(
    "a",
    text,
    ["link-offset-2", "link-underline", "link-underline-opacity-25"],
    [["href", href]]
  );
  link.addEventListener("click", onClick);
  return link;
}

function createFooterContent(text, linkHref, linkText, linkOnClick) {
  var footerText = text ? text + " " : text;
  var footerContent = createElement("div", footerText, ["text-primary"]);
  footerContent.appendChild(createLink(linkHref, linkText, linkOnClick));
  return footerContent;
}

function createInput(type, id, placeholder) {
  var inputClassList = [
    "form-control",
    "border-primary",
    "border-opacity-50",
    "mt-2",
  ];
  return createElement("input", null, inputClassList, [
    ["type", type],
    ["id", id],
    ["placeholder", placeholder],
    ["autocomplete", "on"],
  ]);
}

function createSubmitBtn(textContent) {
  var submitClasses = [
    "btn",
    "btn-outline-primary",
    "fw-bold",
    "fs-5",
    "my-5",
    "border-primary",
    "border-opacity-50",
  ];
  var submitAttrs = [["type", "submit"]];
  return createElement("button", textContent, submitClasses, submitAttrs);
}

function createForm(signup) {
  var form = createElement("form", null, null, [["novalidate", "true"]]);
  form.addEventListener("submit", signup ? signupOnSubmit : loginOnSubmit);
  if (signup) {
    form.appendChild(
      createInput("text", INPUTS_META.name.id, "Enter your name")
    );
  }
  form.appendChild(
    createInput("email", INPUTS_META.email.id, "Enter your email")
  );
  form.appendChild(
    createInput("password", INPUTS_META.pass.id, "Enter your password")
  );
  if (signup) {
    form.appendChild(
      createInput("password", INPUTS_META.pass_conf.id, "Confirm your password")
    );
  }
  form.appendChild(createSubmitBtn(signup ? "Sign UP" : "Log In"));
  return form;
}

/**
 *
 * @param {string} tagName - Element's tag name
 * @param {string?} textContent - Element's text content
 * @param {string | string[] | null} classList - An array or a space separated list of class tokens
 * @param  {[string, string][] | null} attrKeyValuePairs - An array of key-value pairs (attributes)
 * @returns {Element}
 */
function createElement(tagName, textContent, classList, attrKeyValuePairs) {
  var element = document.createElement(tagName);
  if (textContent) element.textContent = textContent;
  if (classList) {
    if (typeof classList === "string") {
      element.className = classList;
    } else if (Array.isArray(classList)) {
      element.className = classList.join(" ");
    }
  }
  if (Array.isArray(attrKeyValuePairs)) {
    attrKeyValuePairs.forEach(([k, v]) => element.setAttribute(k, v));
  }
  return element;
}

/**
 * Removes all child nodes from the given node
 * @param {Node} node
 */
function emptyNode(node) {
  Array.from(node.childNodes).forEach(function (childNode) {
    node.removeChild(childNode);
  });
}
