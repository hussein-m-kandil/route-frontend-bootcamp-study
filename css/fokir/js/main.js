const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".nav-link");
if (sections.length > 0 && navLinks.length > 0) {
  const updateActiveNavLink = () => {
    sections.forEach((sec) => {
      const { top, bottom } = sec.getBoundingClientRect();
      // If section taking, at least, 70% of the viewport, then activate its link
      if (top <= window.innerHeight * 0.3 && bottom > 0) {
        navLinks.forEach((nl) => {
          if (nl.firstChild.hash === `#${sec.id}`) {
            nl.classList.add("active");
          } else {
            nl.classList.remove("active");
          }
        });
      }
    });
  };
  document.addEventListener("scroll", updateActiveNavLink);
}

const navBar = document.querySelector(".nav-bar");
if (navBar) {
  let oldTopDistance = document.documentElement.getBoundingClientRect().top;
  let scrolledDown = false;
  const hideNavBarOnScrollDown = () => {
    const newTopDistance = document.documentElement.getBoundingClientRect().top;
    scrolledDown = newTopDistance < oldTopDistance;
    navBar.classList[scrolledDown ? "add" : "remove"]("hidden");
    navBar.classList[newTopDistance === 0 ? "remove" : "add"]("bg-dark");
    oldTopDistance = newTopDistance;
  };
  document.addEventListener("scroll", hideNavBarOnScrollDown);
}

const counts = document.querySelectorAll(".quantities .count");
if (counts.length > 0) {
  const countValues = [];
  counts.forEach((count) => {
    const num = Number(count.textContent);
    if (num) {
      countValues.push(num);
    }
  });
  if (countValues.length === counts.length) {
    let offScreen = true;
    let notFinished = true;
    const incrementCount = () => {
      counts.forEach((c, i) => {
        const num = Number(c.textContent);
        if (num < countValues[i]) {
          notFinished = true;
          c.textContent = `${num + 1}`;
        } else {
          notFinished = false;
        }
      });
      if (notFinished) {
        setTimeout(incrementCount, 0);
      }
    };
    const incrementCountsOnShow = () => {
      const { top, bottom } = counts[0].parentElement.getBoundingClientRect();
      if (offScreen && top < window.innerHeight && bottom > 0) {
        counts.forEach((c) => (c.textContent = "0"));
        incrementCount();
        offScreen = false;
      } else if (top > window.innerHeight || bottom <= 0) {
        offScreen = true;
      }
    };
    document.addEventListener("scroll", incrementCountsOnShow);
  }
}
