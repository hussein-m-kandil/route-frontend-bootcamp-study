export class Loader {
  constructor() {
    this.loaderElement = document.createElement("span");
    this.loaderElement.className = "loader";
    this.loaderWrapper = document.createElement("div");
    this.loaderWrapper.className = "loader-wrapper";
    this.loaderWrapper.appendChild(this.loaderElement);
    this.element = document.createElement("div");
    this.element.appendChild(this.loaderWrapper);
    this.element.className = "loader-container";
  }
}

export default Loader;
