const TEXT_BOX_ID = "typing-animation";
const TEXT_VALUES = ["Designer", "Designer", "Developer"];
const ANIMATIONS = {
  collapsing: {
    name: "collapsing",
    value: `0.5s ease-out 0.25s 1 normal forwards running collapsing`,
  },
  expanding: {
    name: "expanding",
    value: `0.5s ease-in-out 0s 1 normal forwards running expanding`,
  },
  blinking: {
    name: "blinking",
    value: "0.875s step-start 0s 2 normal none running blinking",
  },
};

let charWidth;
let currentTextIndex = 1;
let currentText = TEXT_VALUES[currentTextIndex];

const textBox = document.getElementById(TEXT_BOX_ID);

const setInitialText = () => {
  textBox.innerHTML = `${TEXT_VALUES[currentTextIndex]}&nbsp;`;
};

const setInitialStyles = () => {
  textBox.style.display = "inline-block";
  textBox.style.verticalAlign = "top";
  textBox.style.whiteSpace = "nowrap";
  textBox.style.overflow = "hidden";
  textBox.style.textAlign = "left";
};

const setCharWidth = (boxWidth) => {
  charWidth = Math.ceil(boxWidth / (TEXT_VALUES[currentTextIndex].length + 1));
};

const setParentLineHeight = (boxComputedStyle) => {
  const boxLineHeight = parseFloat(boxComputedStyle.lineHeight);
  const boxFontSize = parseFloat(boxComputedStyle.fontSize);
  if (Number.isNaN(boxLineHeight) || boxLineHeight <= boxFontSize) {
    textBox.parentElement.style.lineHeight = "1.2";
  }
};

const addTypingCaret = (textColor) => {
  textBox.style.boxSizing = "content-box";
  textBox.style.borderRight = `2px solid ${textColor}`;
};

const updateText = () => {
  currentTextIndex = ++currentTextIndex % TEXT_VALUES.length;
  currentText = TEXT_VALUES[currentTextIndex];
  textBox.textContent = TEXT_VALUES[currentTextIndex];
};

const updateBoxInlineWidth = () => {
  textBox.style.width = `${
    charWidth * TEXT_VALUES[currentTextIndex].length + charWidth * 0.7
  }px`;
};

const setAnimationKeyframes = () => {
  document.head.appendChild(document.createElement("style")).innerHTML = `
@keyframes ${ANIMATIONS.collapsing.name} {
  100% { width: 0; }
}
@keyframes ${ANIMATIONS.expanding.name} {
  0% { width: 0; }
}
@keyframes ${ANIMATIONS.blinking.name} {
  0% { border-color: transparent; }
  50% { border-color: initial; }
  100% { border-color: transparent; }
}
  `;
};

const handleAnimationEnd = (e) => {
  if (e.animationName === ANIMATIONS.blinking.name) {
    textBox.style.animation = ANIMATIONS.collapsing.value;
  } else if (e.animationName === ANIMATIONS.collapsing.name) {
    updateText();
    updateBoxInlineWidth();
    textBox.style.animation = ANIMATIONS.expanding.value;
  } else if (e.animationName === ANIMATIONS.expanding.name) {
    textBox.style.animation = ANIMATIONS.blinking.value;
  }
};

if (textBox) {
  setInitialText();
  setInitialStyles();

  try {
    const boxComputedStyle = getComputedStyle(textBox);

    setCharWidth(parseFloat(boxComputedStyle.width));
    setParentLineHeight(boxComputedStyle);
    addTypingCaret(boxComputedStyle.color);
    updateBoxInlineWidth();
    setAnimationKeyframes();

    textBox.addEventListener("animationend", handleAnimationEnd);

    textBox.style.animation = ANIMATIONS.blinking.value;
  } catch (error) {
    console.log(error);
  }
}
