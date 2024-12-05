const LOCATION_KEY = "location";
const WEATHER_CONTENT_CLASS = "weather-content";
const WEATHER_UNITS = ["Celsius", "Fahrenheit"];
let currentWeatherUnit = WEATHER_UNITS[0];
let currentWeatherData = null;

const header = createElement("header");
header.appendChild(createElement("h1", "app-title", "Weather App"));
document.body.append(header);

const locationForm = createLocationForm((location) => {
  try {
    localStorage.setItem(LOCATION_KEY, location);
  } finally {
    showLoadingIndicator(WEATHER_CONTENT_CLASS);
    getWeatherData(location)
      .then((weatherData) => {
        currentWeatherData = weatherData;
        showWeatherData(
          WEATHER_CONTENT_CLASS,
          currentWeatherData,
          currentWeatherUnit
        );
      })
      .catch((e) => {
        console.log(e);
        const contentDiv = document.querySelector(`.${WEATHER_CONTENT_CLASS}`);
        if (contentDiv) {
          [...contentDiv.children].forEach((child) => child.remove());
          contentDiv.append(
            createElement(
              "div",
              "weather-info-error",
              "No weather data! check the location's name and try again."
            )
          );
        }
      });
  }
}, LOCATION_KEY);

const main = createElement("main");
main.appendChild(locationForm);
main.appendChild(
  createToggler(WEATHER_UNITS, ({ value }) => {
    currentWeatherUnit = value;
    if (currentWeatherData) {
      showWeatherData(
        WEATHER_CONTENT_CLASS,
        currentWeatherData,
        currentWeatherUnit
      );
    }
  })
);
const weatherContent = createElement("div", WEATHER_CONTENT_CLASS);
weatherContent.append(
  createElement("div", "initial-message", "Weather data will be shown here...")
);
main.appendChild(weatherContent);
document.body.appendChild(main);

const footer = createElement("footer", "link-back");
const weatherAPICredits = createElement("div", "weather-api-credits");
weatherAPICredits.append(
  document.createTextNode("Powered by "),
  createElement(
    "a",
    "weather-api",
    " WeatherAPI.com",
    ["href", "https://www.weatherapi.com/"],
    ["title", "Weather API"]
  )
);
footer.appendChild(weatherAPICredits);
document.body.appendChild(footer);

try {
  const oldLocation = localStorage.getItem(LOCATION_KEY);
  const locationInput = locationForm.elements[LOCATION_KEY];
  if (oldLocation && locationInput) {
    locationInput.value = oldLocation;
    locationForm.querySelector('[type="submit"]')?.click();
  }
} catch (e) {
  console.log(e);
}

/**
 * A button that toggles between values
 *
 * @param {string[]} values - An array of values to toggle between them
 * @param {function} toggleCallback - A function  to be called on toggle
 *
 * NOTE: 'toggleCallback' must accepts an object i.e. { index: number, value: string }
 * - index: the index of the current value in the values array.
 * - value: the current value of the button
 *
 * @returns {HTMLButtonElement} - The toggler
 */
function createToggler(values, toggleCallback) {
  if (!toggleCallback)
    throw Error("Missing argument: 'toggleCallback' type 'function'");
  if (!values) throw Error("Missing argument: 'values' type 'string[]'");
  if (!Array.isArray(values) || values.length < 1) {
    throw TypeError(
      "Invalid argument: 'values' must be non-empty array of strings"
    );
  }

  const toggler = createElement("div", "toggler", null, [
    "aria-label",
    "Unit Toggler",
  ]);
  for (let i = 0; i < values.length; i++) {
    const choice = createElement(
      "button",
      `toggler-choice${i === 0 ? " toggler-choice-selected" : ""}`,
      values[i],
      ["type", "button"]
    );
    choice.addEventListener("click", () => {
      toggleCallback({
        index: i,
        value: values[i],
      });
      [...toggler.children].forEach((child) =>
        child.classList.remove("toggler-choice-selected")
      );
      choice.classList.add("toggler-choice-selected");
    });
    toggler.append(choice);
  }

  return toggler;
}

/**
 * A Form to get the location for the user
 * @param {function} submitCallback - A function that accepts 'location': 'string'
 * @returns {HTMLFormElement}
 */
function createLocationForm(submitCallback, inpName) {
  const form = createElement("form", "weather-location");
  const input = createElement(
    "input",
    inpName,
    null,
    ["type", "text"],
    ["name", inpName],
    ["placeholder", 'Location (e.g. "Cairo")'],
    ["autocomplete", "off"],
    ["autofocus", ""]
  );
  const button = createElement(
    "button",
    inpName,
    "",
    ["type", "submit"],
    ["aria-label", "Get weather information"]
  );
  const span = createElement("span", "ui-only", "🔍", ["aria-hidden", "true"]);
  const errorDiv = createElement("div", "error");

  button.appendChild(span);
  form.append(errorDiv, input, button);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.classList.add("invalid");
    const locationInput = form["location"];
    const location = locationInput.value;
    if (location) {
      if (/^[\w-\s'"]+$/.test(location)) {
        errorDiv.textContent = "";
        form.classList.remove("invalid");
        submitCallback(location);
        // Close virtual keyboard on mobile phones.
        locationInput.blur();
      } else {
        errorDiv.textContent = "* Invalid location name!";
      }
    } else {
      errorDiv.textContent = "* Location is required!";
    }
  });

  return form;
}

function createCard(title, content, className) {
  const card = createElement("div", `card ${className}`);
  card.appendChild(createElement("div", "title", title));
  card.appendChild(createElement("div", "content", content));
  return card;
}

function createWeatherInfo(weatherData, weatherUnit) {
  const CELSIUS = "C";
  const currentWeather = weatherData.current;
  const todayWeather = weatherData.forecast.forecastday[0].day;
  const tomorrowWeather = weatherData.forecast.forecastday[1]?.day;
  const afterTomorrowWeather = weatherData.forecast.forecastday[2]?.day;
  const todayHoursWeather = weatherData.forecast.forecastday[0].hour;
  const unit = weatherUnit.charAt(0).toUpperCase();
  let cTemp, feel, hTemp, lTemp;

  if (unit === CELSIUS) {
    feel = currentWeather.feelslike_c;
    cTemp = currentWeather.temp_c;
    hTemp = todayWeather.maxtemp_c;
    lTemp = todayWeather.mintemp_c;
  } else {
    cTemp = currentWeather.temp_f;
    feel = currentWeather.feelslike_f;
    hTemp = todayWeather.maxtemp_f;
    lTemp = todayWeather.mintemp_f;
  }

  const weatherInfo = createElement("div", "current-weather");

  // Current weather
  const hero = createElement("div", "weather-hero");
  weatherInfo.appendChild(hero);
  const nextDays = createElement("div", "weather-extras");
  const todayExtras = createElement("div", "weather-extras");
  const heroTemp = createElement("div", "current-temp", `${cTemp}°${unit}`);
  heroTemp.appendChild(
    createElement("img", "cond-img", null, [
      ["src", currentWeather.condition.icon],
      ["alt", currentWeather.condition.text],
      ["width", "50px"],
      ["height", "50px"],
    ])
  );
  hero.appendChild(heroTemp);
  hero.appendChild(
    createElement("div", "condition", `${currentWeather.condition.text}`)
  );
  hero.appendChild(
    createElement("span", "feels-like", ` Feels like ${feel}°${unit}`)
  );
  [
    createCard("High", `${hTemp}°${unit}`, "high-temp"),
    createCard("Low", `${lTemp}°${unit}`, "low-temp"),
    createCard("Humidity", `${currentWeather.humidity}%`, "humidity"),
  ].forEach((card) => todayExtras.appendChild(card));
  weatherInfo.appendChild(todayExtras);

  // Next 2 days weather
  [
    ["Tomorrow", tomorrowWeather],
    ["Day After Tomorrow", afterTomorrowWeather],
  ].forEach(([title, day]) => {
    if (day) {
      const minTemp = unit === CELSIUS ? day.mintemp_c : day.mintemp_f;
      const maxTemp = unit === CELSIUS ? day.maxtemp_c : day.maxtemp_f;
      const cond = createElement("div", "condition", day.condition.text);
      cond.appendChild(
        createElement("img", "cond-img", null, [
          ["src", day.condition.icon],
          ["alt", day.condition.text],
          ["width", "25px"],
          ["height", "25px"],
        ])
      );
      const tempCard = nextDays.appendChild(
        createCard(
          title,
          `${minTemp}°${unit} - ${maxTemp}°${unit}`,
          `${title}-temp`
        )
      );
      tempCard.insertBefore(cond, tempCard.lastElementChild);
    }
  });
  if (nextDays.children.length > 0) {
    weatherInfo.appendChild(nextDays);
  }

  // Today hours weather
  const hoursWeather = createElement("div", "hours-weather");
  for (let i = 0; i < todayHoursWeather.length; i++) {
    const hourInfo = todayHoursWeather[i];
    if (new Date(hourInfo.time) - new Date() > 0) {
      hoursWeather.append(
        createCard(
          new Date(hourInfo.time)
            .toLocaleTimeString()
            .replace(/(?<=\d\d?:\d\d?)(:\d\d?)/, ""),
          unit === CELSIUS
            ? `${hourInfo.temp_c}°${unit}`
            : `${hourInfo.temp_f}°${unit}`,
          "hour-temp"
        )
      );
    }
  }
  weatherInfo.appendChild(hoursWeather);

  return weatherInfo;
}

function showWeatherData(containerClassName, weatherData, weatherUnit) {
  const locationInput = document.querySelector("input.location");
  if (locationInput) {
    locationInput.value = weatherData.location.name;
  }

  const contentDiv = document.querySelector(`.${containerClassName}`);
  if (contentDiv) {
    [...contentDiv.children].forEach((child) => child.remove());
    contentDiv.append(createWeatherInfo(weatherData, weatherUnit));
  }
}

async function fetchWeatherData(location) {
  const SECO_SECO = "646f26dea5ab4974bc3120515240604";
  const API_URL = "https://api.weatherapi.com/v1/forecast.json?days=3";
  const fetchUrl = `${API_URL}&key=${SECO_SECO}&q=${location}`;
  const fetchOptions = { mode: "cors" };
  try {
    const response = await fetch(fetchUrl, fetchOptions);
    if (response.ok) {
      return await response.json();
    }
    throw Error("Fetched response in not ok!");
  } catch (error) {
    console.log(`${error.name} in 'getWeatherData': \n\t${error.message}`);
  }
  return null;
}

function getWeatherData(location) {
  return new Promise((resolve, reject) => {
    fetchWeatherData(location).then((weatherData) => {
      if (weatherData) {
        resolve(weatherData);
      } else {
        reject(Error("There is no weather data!"));
      }
    });
  });
}

function showLoadingIndicator(containerClassName) {
  const contentDiv = document.querySelector(`.${containerClassName}`);
  if (contentDiv) {
    [...contentDiv.children].forEach((child) => child.remove());
    contentDiv.append(
      createElement(
        "img",
        "loading-gif",
        null,
        ["src", "./assets/loading_256.gif"],
        ["alt", "Loading..."],
        ["width", "50"]
      )
    );
  }
}

/**
 * Creates HTMLElement of the given 'tagName' with any of the given
 * className, id or attributes
 * @param {string} tagName
 * @param {string?} className
 * @param {string?} textContent
 * @param {Array<string, string>?} attrs
 * - Any number of attributes (each of which as a key-value pair)
 * @returns {HTMLElement}
 */
function createElement(tagName, className, textContent, ...attrs) {
  if (typeof tagName !== "string") {
    throw TypeError("Missing 'tagName' of type 'string'!");
  }
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (textContent) element.textContent = textContent;
  // Flatten attrs 1 level depth (in case attrs is in the form of an Array of paris)
  if (
    attrs.length === 1 &&
    Array.isArray(attrs[0]) &&
    Array.isArray(attrs[0][0])
  ) {
    attrs = attrs.flat(1);
  }
  if (attrs.length > 0) {
    for (let i = 0; i < attrs.length; i++) {
      if (
        Array.isArray(attrs[i]) &&
        attrs[i].length === 2 &&
        attrs[i][0] &&
        typeof attrs[i][0] === "string"
      ) {
        if (attrs[i][1] || attrs[i][1] === 0 || attrs[i][1] === "") {
          element.setAttribute(attrs[i][0], attrs[i][1]);
        }
      } else {
        throw TypeError(
          "A given attribute in '...attrs' must be in the form of [string, string]"
        );
      }
    }
  }
  return element;
}
