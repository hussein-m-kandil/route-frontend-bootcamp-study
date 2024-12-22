import GameDetails from "./GameDetails.js";
import Games from "./Games.js";

class Main {
  CATEGORIES = [
    "mmorpg",
    "shooter",
    "sailing",
    "permadeath",
    "superhero",
    "pixel",
  ];
  HASH_DELIMITER = "-";
  DETAILS_HASH_SEGMENT = "details";

  constructor() {
    this.setGameDetailsHash = this.setGameDetailsHash.bind(this);
    this.routeBasedOnHash = this.routeBasedOnHash.bind(this);
    this.body = document.querySelector("body");
    this.games = new Games(this.CATEGORIES, this.body, this.setGameDetailsHash);
    window.addEventListener("hashchange", this.routeBasedOnHash);
  }

  resetBody() {
    [...this.body.children].forEach((child) => this.body.removeChild(child));
    this.body.className = "";
    window.scroll(0, 0);
  }

  setGameDetailsHash(id, category) {
    const delimiter = this.HASH_DELIMITER;
    const detailsHash = this.DETAILS_HASH_SEGMENT;
    window.location.hash = `#${category}${delimiter}${detailsHash}${delimiter}${id}`;
  }

  getCategoryFromHash(hashValue) {
    return hashValue.split(this.HASH_DELIMITER)[0] ?? null;
  }

  getGameIdFromHash(hashValue) {
    const hashSegments = hashValue.split(this.HASH_DELIMITER);
    return hashSegments.length > 1 ? hashSegments.at(-1) : null;
  }

  routeBasedOnHash(e) {
    this.resetBody();
    const hashValue = window.location.hash.slice(1);
    // Try the Game Details route
    const gameId = this.getGameIdFromHash(hashValue);
    if (gameId) {
      const prevCategoryHash = `#${this.getCategoryFromHash(hashValue)}`;
      new GameDetails(gameId, this.body, prevCategoryHash).display();
      return;
    }
    // Try the Games route
    const categoryIndex = this.CATEGORIES.findIndex((c) => c === hashValue);
    if (categoryIndex > -1) {
      if (!this.games.chosenGameId) {
        const [oldHash] =
          e && e.oldURL ? e.oldURL.match(/(?<=#).*$/) || [] : [];
        if (oldHash) {
          const oldGameId =
            this.getGameIdFromHash(oldHash) || this.games.chosenGameId;
          this.games.chosenGameId = parseInt(oldGameId) || oldGameId;
        }
      }
      this.games.displayCategory(categoryIndex);
      return;
    }
    // Route to first game category
    window.location.hash = `#${this.CATEGORIES[0]}`;
  }
}

new Main().routeBasedOnHash();
