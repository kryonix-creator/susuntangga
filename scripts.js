const laws = [
  "UUD 1945",
  "Tap MPR",
  "Undang-Undang / Perppu",
  "Peraturan Pemerintah",
  "Peraturan Presiden",
  "Peraturan Daerah Provinsi",
  "Peraturan Daerah Kabupaten/Kota"
];

const blocksContainer = document.getElementById("blocks");
const slotsContainer = document.getElementById("slots");
const checkBtn = document.getElementById("check");
const resetBtn = document.getElementById("reset");
const result = document.getElementById("result");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let shuffledLaws = [...laws];
shuffle(shuffledLaws);

function renderBlocks() {
  blocksContainer.innerHTML = "";
  slotsContainer.innerHTML = "";

  shuffledLaws.forEach(text => {
    const block = document.createElement("div");
    block.className = "block";
    block.textContent = text;

    // --- Drag pakai sentuhan ---
    block.draggable = true;

    // Untuk mouse
    block.addEventListener("dragstart", e => {
      e.target.classList.add("dragging");
    });
    block.addEventListener("dragend", e => {
      e.target.classList.remove("dragging");
    });

    // Untuk sentuhan (HP)
    block.addEventListener("touchstart", e => {
      e.target.classList.add("dragging");
    });
    block.addEventListener("touchend", e => {
      const touch = e.changedTouches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      if (target && target.classList.contains("slot") && target.children.length === 0) {
        target.appendChild(e.target);
      }
      e.target.classList.remove("dragging");
    });

    blocksContainer.appendChild(block);
  });

  laws.forEach(correct => {
    const slot = document.createElement("div");
    slot.className = "slot";
    slot.dataset.correct = correct;
    slotsContainer.appendChild(slot);

    // untuk drag mouse
    slot.addEventListener("dragover", e => e.preventDefault());
    slot.addEventListener("drop", e => {
      const dragged = document.querySelector(".dragging");
      if (dragged && slot.children.length === 0) slot.appendChild(dragged);
    });
  });
}

checkBtn.addEventListener("click", () => {
  let correct = 0;
  const slots = document.querySelectorAll(".slot");
  slots.forEach(slot => {
    if (slot.children.length > 0 && slot.children[0].textContent === slot.dataset.correct) {
      correct++;
      slot.style.backgroundColor = "#2ecc71";
    } else {
      slot.style.backgroundColor = "#e74c3c";
    }
  });

  if (correct === laws.length) {
    result.textContent = "🎉 Hebat! Semua benar!";
    result.style.color = "green";
  } else {
    result.textContent = `Kamu benar ${correct} dari ${laws.length}.`;
    result.style.color = "red";
  }
});

resetBtn.addEventListener("click", () => {
  result.textContent = "";
  shuffledLaws = [...laws];
  shuffle(shuffledLaws);
  renderBlocks();
});

renderBlocks();
