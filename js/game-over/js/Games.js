import Navbar from "./Navbar.js";
import GameCard from "./GameCard.js";
import GenericGame from "./GenericGame.js";

export class Games extends GenericGame {
  CLASS_NAME = "games";

  constructor(categories, parent, onGameChosen) {
    super(parent);
    this.handleClickOnCategory = this.handleClickOnCategory.bind(this);
    this.onGameChosen = onGameChosen;
    this.categories = categories;
    this.games = [];
    this.navbar = new Navbar(
      "Game Over",
      this.categories,
      this.handleClickOnCategory
    );
    this.header = document.createElement("header");
    this.header.className = "header";
  }

  displayCategory(index) {
    this.setCategoryIndex(index);
    this.navbar.activateNavLinkByIndex(this.categoryIndex);
    this.parent.classList.add(this.CLASS_NAME);
    this.parent.append(this.navbar.element, this.header, this.container);
    this.displayCurrentCategory();
  }

  unmount() {
    this.cleanParent();
    this.parent.classList.remove(this.CLASS_NAME);
  }

  setUrlHash() {
    window.location.hash = `#${this.categories[this.categoryIndex]}`;
  }

  setCategoryIndex(categoryIndex) {
    const isValidIndex = () => {
      return categoryIndex >= 0 && categoryIndex < this.categories.length;
    };
    this.categoryIndex = isValidIndex() ? categoryIndex : 0;
  }

  handleClickOnCategory(e) {
    const categoryIndex = this.categories.findIndex((c) => {
      return c === e.target.textContent;
    });
    if (categoryIndex > -1) {
      this.setCategoryIndex(categoryIndex);
      this.setUrlHash();
    }
  }

  showGames() {
    // Create a new row for the columns of game cards
    const row = document.createElement("div");
    row.className =
      "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4";
    this.container.appendChild(row);
    // Throttle the speed of showing the game cards
    const INTERVAL = 10;
    let i = 0;
    const showGame = () => {
      const game = this.games[i++];
      if (game) {
        const handleClickOnGame = () => {
          this.chosenGameId = game.id;
          this.onGameChosen(game.id, this.categories[this.categoryIndex]);
        };
        const col = document.createElement("div");
        col.className = "col";
        col.appendChild(new GameCard(game, handleClickOnGame).element);
        row.appendChild(col);
        if (this.chosenGameId === game.id) {
          col.scrollIntoView();
          this.chosenGameId = null;
        }
        setTimeout(showGame, INTERVAL);
      }
    };
    setTimeout(showGame, INTERVAL);
  }

  displayCurrentCategory() {
    this.cleanContainer();
    this.showLoader();
    this.fetchGamesByCategory(this.categories[this.categoryIndex]).then(() => {
      if (Array.isArray(this.games) && this.games.length > 0) {
        this.showGames();
      } else {
        this.showDisplayError(
          "Sorry, we couldn't find any games now, please revisit us later."
        );
      }
      setTimeout(() => this.hideLoader(), 1000);
    });
  }

  async fetchGamesByCategory(category) {
    const savedGames = this.getCachedData(category);
    if (savedGames) {
      this.games = savedGames;
      return;
    }
    this.games = await this.fetch("/games", { category });
    this.cacheData(category, this.games);
  }
}

export default Games;
