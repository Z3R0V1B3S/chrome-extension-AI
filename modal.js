// Open modal wanneer er op .open-modal-link wordt geklikt
const openModalLinks = document.querySelectorAll(".open-modal-link");
openModalLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const modalId = link.getAttribute("href");
    const modal = document.querySelector(modalId);
    modal.style.display = "block";
  });
});

// Sluit modal wanneer er op .close-modal-link wordt geklikt
const closeModalLinks = document.querySelectorAll(".close-modal-link");
closeModalLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const modal = link.closest(".modal");
    modal.style.display = "none";
  });
});

// Sluit modal wanneer er op de escape-toets wordt gedrukt
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => {
      modal.style.display = "none";
    });
  }
});
// Sluit modal wanneer er buiten de modal wordt geklikt
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }
});
