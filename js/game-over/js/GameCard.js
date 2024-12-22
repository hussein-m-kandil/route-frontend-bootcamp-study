import CardImage from "./CardImage.js";

export class GameCard {
  constructor(gameDetails, onClick) {
    this.element = document.createElement("div");
    this.element.className = "card h-100 justify-content-between";
    this.element.addEventListener("click", onClick);
    const cardMainContent = document.createElement("div");
    cardMainContent.className =
      "p-3 d-flex flex-column justify-content-between gap-3";
    const cardBody = document.createElement("div");
    cardBody.className = "card-body p-0";
    const cardTitle = document.createElement("h2");
    cardTitle.className = "card-title h6 d-flex flex-wrap gap-1";
    cardTitle.textContent = gameDetails.title;
    const priceBadge = document.createElement("span");
    priceBadge.className = "badge bg-accent ms-auto";
    priceBadge.textContent = "Free";
    cardTitle.appendChild(priceBadge);
    const cardText = document.createElement("p");
    cardText.className =
      "card-text text-center text-white text-opacity-50 small";
    cardText.textContent = this.truncateText(gameDetails.short_description);
    cardBody.append(cardTitle, cardText);
    const cardFooter = document.createElement("div");
    cardFooter.className =
      "card-footer w-100 small d-flex justify-content-between";
    cardFooter.append(
      document.createElement("span"),
      document.createElement("span")
    );
    const [genre, platform] = [...cardFooter.children];
    genre.className = "badge text-bg-dark";
    genre.textContent = gameDetails.genre;
    platform.className = "badge text-bg-dark";
    platform.textContent = gameDetails.platform;
    cardMainContent.append(
      new CardImage(gameDetails.thumbnail, `${gameDetails.title} cover image.`)
        .element,
      cardBody
    );
    this.element.append(cardMainContent, cardFooter);
  }

  truncateText(text) {
    const MAX_LENGTH = 61;
    const TRUNC_SUFFIX = "...";
    if (text.length > MAX_LENGTH) {
      return `${text.slice(
        0,
        MAX_LENGTH - TRUNC_SUFFIX.length
      )}${TRUNC_SUFFIX}`;
    }
    return text;
  }
}

export default GameCard;
