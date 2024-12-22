import CardImage from "./CardImage.js";
import GenericGame from "./GenericGame.js";

export class GameDetails extends GenericGame {
  CLASS_NAME = "game-details";

  constructor(id, parent, prevHash) {
    super(parent);
    this.id = id;
    this.prevHash = prevHash;
    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.ariaLabel = "Close";
    closeBtn.className = "btn-close";
    closeBtn.addEventListener("click", this.handleCloseBtnClick.bind(this));
    this.container.append(closeBtn);
  }

  display() {
    this.parent.classList.add(this.CLASS_NAME);
    this.parent.appendChild(this.container);
    this.showLoader();
    this.fetchGameDetails();
  }

  unmount() {
    this.cleanParent();
    this.parent.classList.remove(this.CLASS_NAME);
  }

  handleCloseBtnClick() {
    window.location.hash = this.prevHash;
  }

  async displayGameDetails() {
    if (this.game) {
      const createBadge = (text) => {
        const badge = document.createElement("span");
        badge.className = "badge bg-accent";
        badge.textContent = text;
        return badge;
      };
      const createEntry = (entryText, badgeText) => {
        const entry = document.createElement("p");
        entry.textContent = `${entryText}: `;
        entry.appendChild(createBadge(badgeText));
        return entry;
      };
      const row = document.createElement("div");
      row.className = "row";
      const title = document.createElement("h1");
      title.className = "text-center mt-2 mb-4";
      title.textContent = this.game.title;
      const imageColumn = document.createElement("div");
      imageColumn.className = "col-md-4";
      imageColumn.appendChild(
        new CardImage(this.game.thumbnail, `${this.game.title} cover image.`)
          .element
      );
      const dataColumn = document.createElement("div");
      dataColumn.className = "col-md-8 mt-4 mt-md-0";
      const category = createEntry("Category", this.game.genre);
      const platform = createEntry("Platform", this.game.platform);
      const status = createEntry("Status", this.game.status);
      const desc = document.createElement("p");
      desc.textContent = this.game.description;
      const link = document.createElement("a");
      link.href = this.game.game_url;
      link.rel = "noopener noreferrer";
      link.target = "_blank";
      link.role = "button";
      link.textContent = "Show Game";
      link.className = "btn btn-outline-warning text-fg-color fw-bold";
      dataColumn.append(category, platform, status, desc, link);
      row.append(imageColumn, dataColumn);
      this.container.append(title, row);
    } else {
      this.showDisplayError("Sorry we couldn't get the game details.");
    }
    this.hideLoader();
  }

  async fetchGameDetails() {
    const savedGameDetails = this.getCachedData(this.id);
    if (savedGameDetails) {
      this.game = savedGameDetails;
    } else {
      this.game = await this.fetch("/game", { id: this.id });
      if (this.game) this.cacheData(this.id, this.game);
    }
    this.displayGameDetails();
  }
}

export default GameDetails;
