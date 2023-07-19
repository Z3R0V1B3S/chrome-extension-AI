const tabLinks = document.querySelectorAll(".tab-link");

tabLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const tabId = link.getAttribute("data-tab");
    const tabContent = document.querySelector(`#${tabId}`);
    const tabContents = document.querySelectorAll(".tab-content");
    const tabLinkActive = document.querySelector(".tab-link.active");

    tabLinkActive.classList.remove("active");
    link.classList.add("active");
    tabContents.forEach((content) => {
      content.style.display = "none";
    });
    tabContent.style.display = "block";
  });
});
