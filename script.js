const elements = {
  cipherType: document.getElementById("cipherType"),
  shiftGroup: document.getElementById("shiftGroup"),
  shiftRange: document.getElementById("shiftRange"),
  shiftNumber: document.getElementById("shiftNumber"),
  shiftValueLabel: document.getElementById("shiftValueLabel"),
  strengthBar: document.getElementById("strengthBar"),
  strengthLabel: document.getElementById("strengthLabel"),
  plainInput: document.getElementById("plainInput"),
  encryptedOutput: document.getElementById("encryptedOutput"),
  encryptedInput: document.getElementById("encryptedInput"),
  decryptedOutput: document.getElementById("decryptedOutput"),
  copyEncryptedBtn: document.getElementById("copyEncryptedBtn"),
  copyDecryptedBtn: document.getElementById("copyDecryptedBtn"),
  resetBtn: document.getElementById("resetBtn"),
  useOutputBtn: document.getElementById("useOutputBtn"),
  transformPreview: document.getElementById("transformPreview"),
  encryptVisualizer: document.getElementById("encryptVisualizer"),
  cipherInfoBtn: document.getElementById("cipherInfoBtn"),
  cipherTooltip: document.getElementById("cipherTooltip")
};

const typingState = new WeakMap();
let visualizerTimer = null;

/**
 * Encrypt or decrypt text with Caesar logic.
 * Keeps punctuation/spaces untouched and preserves uppercase/lowercase.
 */
function shiftText(text, shift, mode = "encrypt") {
  const normalizedShift = ((shift % 26) + 26) % 26;
  const actualShift = mode === "decrypt" ? (26 - normalizedShift) % 26 : normalizedShift;

  return text.replace(/[a-z]/gi, (char) => {
    const code = char.charCodeAt(0);
    const base = code >= 65 && code <= 90 ? 65 : 97;
    const shifted = ((code - base + actualShift) % 26) + base;
    return String.fromCharCode(shifted);
  });
}

function getActiveShift() {
  return elements.cipherType.value === "rot13" ? 13 : Number(elements.shiftRange.value);
}

function syncShiftInputs(value) {
  const safeValue = Math.min(25, Math.max(1, Number(value) || 1));
  elements.shiftRange.value = safeValue;
  elements.shiftNumber.value = safeValue;
  elements.shiftValueLabel.textContent = safeValue;
}

function getStrengthData(shift, cipherType) {
  if (cipherType === "rot13") {
    return { label: "ROT13 Fixed", width: 52, color: "#09e9ff" };
  }

  if (shift <= 5) {
    return { label: "Weak", width: 22, color: "#ff5e80" };
  }
  if (shift <= 12) {
    return { label: "Moderate", width: 48, color: "#f8c75f" };
  }
  if (shift <= 19) {
    return { label: "Strong", width: 74, color: "#37f2a8" };
  }
  return { label: "Very Strong", width: 100, color: "#09e9ff" };
}

function updateStrengthMeter() {
  const shift = getActiveShift();
  const data = getStrengthData(shift, elements.cipherType.value);
  elements.strengthLabel.textContent = data.label;
  elements.strengthBar.style.width = `${data.width}%`;
  elements.strengthBar.style.backgroundColor = data.color;
}

function typeIntoTextarea(textarea, value) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    textarea.value = value;
    return;
  }

  const token = Symbol("typing-token");
  typingState.set(textarea, token);
  textarea.value = "";

  let index = 0;
  const chunkSize = Math.max(1, Math.ceil(value.length / 120));

  function step() {
    if (typingState.get(textarea) !== token) {
      return;
    }

    if (index <= value.length) {
      textarea.value = value.slice(0, index);
      index += chunkSize;
      requestAnimationFrame(step);
    } else {
      textarea.value = value;
    }
  }

  requestAnimationFrame(step);
}

function updateTransformPreview() {
  const shift = getActiveShift();
  const samples = "ABCDEFGHabcdefgh";
  const items = samples
    .split("")
    .map((char) => {
      const transformed = shiftText(char, shift, "encrypt");
      return `<div class="transform-item">${char} <span class="arrow">&rarr;</span> ${transformed}</div>`;
    })
    .join("");

  elements.transformPreview.innerHTML = items;
}

function animateVisualizer() {
  if (visualizerTimer) {
    clearTimeout(visualizerTimer);
  }

  const visual = elements.encryptVisualizer;
  visual.classList.remove("active", "step-2", "step-3");

  if (!elements.plainInput.value.trim()) {
    return;
  }

  visual.classList.add("active");
  visualizerTimer = setTimeout(() => {
    visual.classList.add("step-2");
    visualizerTimer = setTimeout(() => {
      visual.classList.add("step-3");
    }, 260);
  }, 220);
}

function updateOutputs() {
  const shift = getActiveShift();
  const originalText = elements.plainInput.value;
  const encryptedText = shiftText(originalText, shift, "encrypt");

  typeIntoTextarea(elements.encryptedOutput, encryptedText);

  if (!elements.encryptedInput.dataset.userEdited) {
    elements.encryptedInput.value = encryptedText;
  }

  const decryptSource = elements.encryptedInput.value;
  const decryptedText = shiftText(decryptSource, shift, "decrypt");
  typeIntoTextarea(elements.decryptedOutput, decryptedText);

  updateTransformPreview();
  updateStrengthMeter();
  animateVisualizer();
}

async function copyToClipboard(text, button) {
  if (!text) {
    button.textContent = "Nothing to Copy";
    setTimeout(() => {
      button.textContent = button.id === "copyEncryptedBtn" ? "Copy Encrypted" : "Copy Decrypted";
    }, 1200);
    return;
  }

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const temp = document.createElement("textarea");
      temp.value = text;
      temp.setAttribute("readonly", "");
      temp.style.position = "absolute";
      temp.style.left = "-9999px";
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("copy");
      document.body.removeChild(temp);
    }

    button.textContent = "Copied";
  } catch (error) {
    button.textContent = "Copy Failed";
  }

  setTimeout(() => {
    button.textContent = button.id === "copyEncryptedBtn" ? "Copy Encrypted" : "Copy Decrypted";
  }, 1200);
}

function setCipherMode() {
  const isRot13 = elements.cipherType.value === "rot13";
  elements.shiftGroup.classList.toggle("hidden", isRot13);
  if (isRot13) {
    syncShiftInputs(13);
  }
  updateOutputs();
}

function clearAll() {
  elements.plainInput.value = "";
  elements.encryptedOutput.value = "";
  elements.encryptedInput.value = "";
  elements.decryptedOutput.value = "";

  delete elements.encryptedInput.dataset.userEdited;

  syncShiftInputs(3);
  elements.cipherType.value = "caesar";
  elements.shiftGroup.classList.remove("hidden");

  updateStrengthMeter();
  updateTransformPreview();
  elements.encryptVisualizer.classList.remove("active", "step-2", "step-3");
}

function toggleTooltip() {
  const isShown = elements.cipherTooltip.classList.toggle("show");
  elements.cipherInfoBtn.setAttribute("aria-expanded", String(isShown));
}

function bindEvents() {
  elements.shiftRange.addEventListener("input", (event) => {
    syncShiftInputs(event.target.value);
    updateOutputs();
  });

  elements.shiftNumber.addEventListener("input", (event) => {
    syncShiftInputs(event.target.value);
    updateOutputs();
  });

  elements.cipherType.addEventListener("change", setCipherMode);

  elements.plainInput.addEventListener("input", () => {
    delete elements.encryptedInput.dataset.userEdited;
    updateOutputs();
  });

  elements.encryptedInput.addEventListener("input", () => {
    elements.encryptedInput.dataset.userEdited = "true";
    updateOutputs();
  });

  elements.useOutputBtn.addEventListener("click", () => {
    elements.encryptedInput.value = elements.encryptedOutput.value;
    delete elements.encryptedInput.dataset.userEdited;
    updateOutputs();
  });

  elements.copyEncryptedBtn.addEventListener("click", () => {
    copyToClipboard(elements.encryptedOutput.value, elements.copyEncryptedBtn);
  });

  elements.copyDecryptedBtn.addEventListener("click", () => {
    copyToClipboard(elements.decryptedOutput.value, elements.copyDecryptedBtn);
  });

  elements.resetBtn.addEventListener("click", clearAll);
  elements.cipherInfoBtn.addEventListener("click", toggleTooltip);

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".tooltip-wrap")) {
      elements.cipherTooltip.classList.remove("show");
      elements.cipherInfoBtn.setAttribute("aria-expanded", "false");
    }
  });
}

function init() {
  syncShiftInputs(3);
  bindEvents();
  updateOutputs();
}

init();
