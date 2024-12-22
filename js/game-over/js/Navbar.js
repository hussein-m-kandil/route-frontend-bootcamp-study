export class Navbar {
  constructor(navBrandText, navLinksTexts, onClickNavLink) {
    this.element = document.createElement("nav");
    this.element.className =
      "navbar navbar-expand-lg bg-primary sticky-top col-12 col-sm-9 mx-auto";
    this.element.setAttribute("data-bs-theme", "dark");
    this.navContainer = document.createElement("div");
    this.navContainer.className = "container";
    this.navBrand = document.createElement("h1");
    this.navBrand.className = "navbar-brand mb-0";
    const navBrandLink = document.createElement("a");
    navBrandLink.href = "#";
    navBrandLink.textContent = navBrandText;
    this.navBrand.append(document.createElement("img"), navBrandLink);
    this.navBrand.firstElementChild.setAttribute("src", "./images/logo.png");
    this.navBrand.firstElementChild.setAttribute("alt", "Game over logo");
    this.navBrand.firstElementChild.setAttribute("height", "50px");
    this.navBrand.firstElementChild.setAttribute("width", "50px");
    const navContentId = "navbarSupportedContent";
    this.navToggler = document.createElement("button");
    this.navToggler.setAttribute("type", "button");
    this.navToggler.setAttribute("class", "navbar-toggler");
    this.navToggler.setAttribute("data-bs-toggle", "collapse");
    this.navToggler.setAttribute("data-bs-target", `#${navContentId}`);
    this.navToggler.setAttribute("aria-label", "Toggle navigation");
    this.navToggler.setAttribute("aria-controls", navContentId);
    this.navToggler.setAttribute("aria-expanded", false);
    this.navToggler.appendChild(document.createElement("span"));
    this.navToggler.firstElementChild.className = "navbar-toggler-icon";
    this.navContent = document.createElement("div");
    this.navContent.id = navContentId;
    this.navContent.className = "collapse navbar-collapse";
    this.navItems = document.createElement("ul");
    this.navItems.className = "navbar-nav ms-auto mb-2 mb-lg-0";
    for (const navLinkText of navLinksTexts) {
      const navLink = document.createElement("a");
      navLink.href = "#";
      navLink.className = "nav-link";
      navLink.textContent = navLinkText;
      navLink.setAttribute("aria-current", "page");
      navLink.addEventListener("click", (e) => {
        e.preventDefault();
        onClickNavLink(e);
        this.deactivateAllNavLinks();
        e.target.classList.add("active");
      });
      const navItem = document.createElement("li");
      navItem.className = "nav-item";
      navItem.appendChild(navLink);
      this.navItems.appendChild(navItem);
    }
    this.activateNavLinkByIndex(0);
    this.navContent.appendChild(this.navItems);
    this.navContainer.appendChild(this.navBrand);
    this.navContainer.appendChild(this.navToggler);
    this.navContainer.appendChild(this.navContent);
    this.element.appendChild(this.navContainer);
  }

  activateNavLinkByIndex(index) {
    this.deactivateAllNavLinks();
    this.navItems.children
      .item(index)
      .firstElementChild.classList.add("active");
  }

  deactivateAllNavLinks() {
    [...this.navItems.children].forEach((navItem) => {
      navItem.firstElementChild.classList.remove("active");
      navItem.firstElementChild.blur();
    });
  }
}

export default Navbar;
