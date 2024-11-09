var quoteContainer = document.getElementById("quote-container");

var currentQuoteIndex = 0;

/**
 * Generates a random number from 0 up to (but not including) the specified maximum.
 *
 * @param {number} max - The upper limit for the random number (exclusive).
 * @returns {number}
 */
function genRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function genNewRandomQuoteIndex(quotesCount, currentIndex) {
  var newIndex = genRandomNumber(quotesCount);
  for (var i = 0; i < quotesCount; i++) {
    if (newIndex === currentIndex) {
      newIndex = genRandomNumber(quotesCount);
    } else {
      break;
    }
  }
  return newIndex;
}

function createQuoteElements(quote) {
  return `
    <p class="quote-text">${quote.text}</p>
    <p class="quote-author">— ${quote.author}</p>
  `;
}

function genNewQuote(index) {
  if (Number.isInteger(index) && index >= 0 && index < QUOTES.length) {
    currentQuoteIndex = index;
  } else {
    currentQuoteIndex = genNewRandomQuoteIndex(
      QUOTES.length,
      currentQuoteIndex
    );
  }
  quoteContainer.innerHTML = createQuoteElements(QUOTES[currentQuoteIndex]);
}

var QUOTES = [
  {
    text: "The most damaging phrase in the language is, 'We have always done it this way'.",
    author: "Grace Hopper",
  },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  {
    text: "Programs must be written for people to read, and only incidentally for machines to execute.",
    author: "Harold Abelson",
  },
  {
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },
  {
    text: "Experience is the name everyone gives to their mistakes.",
    author: "Oscar Wilde",
  },
  {
    text: "In order to be irreplaceable, one must always be different.",
    author: "Coco Chanel",
  },
  {
    text: "Java is to JavaScript what car is to Carpet.",
    author: "Chris Heilmann",
  },
  { text: "Knowledge is power.", author: "Francis Bacon" },
  {
    text: "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.",
    author: "Dan Salomon",
  },
  {
    text: "Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away.",
    author: "Antoine de Saint-Exupéry",
  },
  {
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House",
  },
  { text: "Fix the cause, not the symptom.", author: "Steve Maguire" },
  {
    text: "Optimism is an occupational hazard of programming: feedback is the treatment.",
    author: "Kent Beck",
  },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  {
    text: "Before software can be reusable it first has to be usable.",
    author: "Ralph Johnson",
  },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  {
    text: "Walking on water and developing software from a specification are easy if both are frozen.",
    author: "Edward V. Berard",
  },
  {
    text: "If debugging is the process of removing software bugs, then programming must be the process of putting them in.",
    author: "Edsger Dijkstra",
  },
  {
    text: "There are only two kinds of programming languages: those people always bitch about and those nobody uses.",
    author: "Bjarne Stroustrup",
  },
  {
    text: "One man's crappy software is another man's full-time job.",
    author: "Jessica Gaston",
  },
  {
    text: "A good programmer is someone who always looks both ways before crossing a one-way street.",
    author: "Doug Linder",
  },
  {
    text: "Programming is not easy like Sunday morning, it's silent poetry.",
    author: "Waseem Latif",
  },
  {
    text: "Programming today is a race between software engineers striving to build bigger and better idiot-proof programs, and the Universe trying to produce bigger and better idiots. So far, the Universe is winning.",
    author: "Rick Cook",
  },
  {
    text: "I am not a great programmer; I am just a good programmer with great habits.",
    author: "Kent Beck",
  },
  {
    text: "The trouble with programmers is that you can never tell what a programmer is doing until it's too late.",
    author: "Seymour Cray",
  },
  {
    text: "Don't worry if it doesn't work right. If everything did, you'd be out of a job.",
    author: "Mosher's Law of Software Engineering",
  },
  { text: "Don't comment bad code—rewrite it.", author: "Brian Kernighan" },
  {
    text: "Controlling complexity is the essence of computer programming.",
    author: "Brian Kernighan",
  },
  {
    text: "The function of good software is to make the complex appear simple.",
    author: "Grady Booch",
  },
  {
    text: "If you think it's simple, then you have misunderstood the problem.",
    author: "Bjarne Stroustrup",
  },
  {
    text: "How you look at it is pretty much how you'll see it.",
    author: "Steve Jobs",
  },
  {
    text: "The only way to go fast is to go well.",
    author: "Robert C. Martin",
  },
  {
    text: "The most important property of a program is whether it accomplishes the intention of its user.",
    author: "C.A.R. Hoare",
  },
  {
    text: "A language that doesn't affect the way you think about programming is not worth knowing.",
    author: "Alan Perlis",
  },
  { text: "Code never lies, comments sometimes do.", author: "Ron Jeffries" },
  {
    text: "A program that has not been tested does not work.",
    author: "Bjarne Stroustrup",
  },
  {
    text: "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    author: "Brian Kernighan",
  },
  {
    text: "When to use iterative development? You should use iterative development only on projects that you want to succeed.",
    author: "Martin Fowler",
  },
  {
    text: "Premature optimization is the root of all evil.",
    author: "Donald Knuth",
  },
  {
    text: "A program is never less than 90% complete, and never more than 95% complete.",
    author: "Terry Baker",
  },
  {
    text: "Computers are good at following instructions, but not at reading your mind.",
    author: "Donald Knuth",
  },
  {
    text: "Programming isn't about what you know; it's about what you can figure out.",
    author: "Chris Pine",
  },
  {
    text: "You can't have great software without a great team, and most software teams behave like dysfunctional families.",
    author: "Jim McCarthy",
  },
  {
    text: "The best performance improvement is the transition from the nonworking state to the working state.",
    author: "J. Osterhout",
  },
  {
    text: "Sometimes it's better to leave something alone, to pause, and that's very true of programming.",
    author: "Joyce Wheeler",
  },
  { text: "No code is faster than no code.", author: "Kevlin Henney" },
  {
    text: "Any sufficiently advanced technology is indistinguishable from magic.",
    author: "Arthur C. Clarke",
  },
  {
    text: "When you're working on something and you know there is no way back, it gives you focus.",
    author: "Thomas Bangalter",
  },
  {
    text: "Learning to code is useful no matter what your career ambitions are.",
    author: "Arianna Huffington",
  },
  {
    text: "Programming isn't about writing code, it's about solving problems.",
    author: "Unknown",
  },
  {
    text: "The more code you write, the more bugs you create.",
    author: "Unknown",
  },
  {
    text: "Bad programmers worry about the code. Good programmers worry about data structures and their relationships.",
    author: "Linus Torvalds",
  },
  { text: "Good software, like wine, takes time.", author: "Joel Spolsky" },
  { text: "It's all talk until the code runs.", author: "Ward Cunningham" },
];

genNewQuote(currentQuoteIndex);
