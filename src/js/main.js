// arrowUp
document.addEventListener("DOMContentLoaded", () => {
  const arrowUp = document.querySelector(".arrow__body");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 600) {
      arrowUp.classList.add("active");
    } else {
      arrowUp.classList.remove("active");
    }
  });

  arrowUp.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
