const COUNTING_INTERVAL_MS = 30;

const countersContainer = document.querySelector(".counters");

const counts = [...document.querySelectorAll(".counters .count")];

if (counts.length > 0) {
  const countValues = counts
    .map((c) => Number(c.textContent))
    .filter((c) => !isNaN(c));

  let offScreen = true;

  const count = () => {
    counts.forEach((c) => (c.textContent = "0"));
    (function increment() {
      const endFlags = counts.map(() => false);
      counts.forEach((c, i) => {
        const num = Number(c.textContent);
        if (num < countValues[i]) {
          c.textContent = `${num + 1}`;
        } else {
          endFlags[i] = true;
        }
      });
      if (endFlags.some((ended) => !ended)) {
        setTimeout(increment, COUNTING_INTERVAL_MS);
      }
    })();
  };

  const countOnShow = () => {
    const { top, bottom } = countersContainer.getBoundingClientRect();
    if (offScreen && top < window.innerHeight && bottom > 0) {
      count();
      offScreen = false;
    } else if (top > window.innerHeight || bottom <= 0) {
      offScreen = true;
    }
  };

  document.addEventListener("scroll", countOnShow);
  count();
}
