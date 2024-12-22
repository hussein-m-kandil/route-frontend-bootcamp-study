import Loader from "./Loader.js";

export class GenericGame {
  constructor(parent) {
    this.parent = parent;
    this.container = document.createElement("main");
    this.container.setAttribute("data-bs-theme", "dark");
    this.container.className = "main container mt-5";
    this.loader = new Loader().element;
  }

  showLoader() {
    this.container.appendChild(this.loader);
  }

  hideLoader() {
    this.container.removeChild(this.loader);
  }

  cleanParent() {
    [...this.parent.children].forEach((child) =>
      this.parent.removeChild(child)
    );
  }

  cleanContainer() {
    [...this.container.children].forEach((child) =>
      this.container.removeChild(child)
    );
  }

  showDisplayError(msg) {
    const message = document.createElement("p");
    message.className = "text-center";
    message.textContent = msg;
    this.container.appendChild(message);
  }

  async fetch(endpointStr, queryObj) {
    try {
      const preparedQuery = queryObj
        ? `?${Object.entries(queryObj)
            .map(([k, v]) => `${k}=${v}`)
            .join("&")}`
        : "";
      const url = `https://free-to-play-games-database.p.rapidapi.com/api${endpointStr}${preparedQuery}`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "6a1286df2emshf343024b567a007p1c150bjsn4c59494c5ae0",
          "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
        },
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw response;
      }
      return await response.json();
    } catch (e) {
      console.error(e);
    }
  }

  getCachedData(key) {
    try {
      const savedData = sessionStorage.getItem(key);
      return savedData && JSON.parse(savedData);
    } catch (e) {
      console.error(e);
    }
  }

  cacheData(key, data) {
    try {
      sessionStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  }
}

export default GenericGame;
