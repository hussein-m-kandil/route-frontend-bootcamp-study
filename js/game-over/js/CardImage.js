import Loader from "./Loader.js";

export class CardImage {
  constructor(src, alt) {
    this.element = document.createElement("div");
    this.handleImageSourceLoaded = this.handleImageSourceLoaded.bind(this);
    this.element.className = "position-relative";
    this.loader = new Loader().element;
    this.image = document.createElement("img");
    this.image.src = src;
    this.image.alt = alt;
    this.image.className = "w-100";
    this.image.addEventListener("load", this.handleImageSourceLoaded);
    this.image.addEventListener("error", this.handleImageSourceLoaded);
    this.element.setAttribute("style", "aspect-ratio: 16 / 9;");
    this.element.append(this.loader, this.image);
  }

  handleImageSourceLoaded() {
    this.element.removeChild(this.loader);
    this.element.removeAttribute("style");
    this.image.removeEventListener("load", this.handleImageSourceLoaded);
    this.image.removeEventListener("error", this.handleImageSourceLoaded);
  }
}

export default CardImage;
