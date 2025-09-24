const btnBurgerOpen = document.querySelector("#burger");
const navList = document.querySelector(".nav__list");
const burgerWrapper = document.querySelector(".burger__wrapper");
const body = document.body;

btnBurgerOpen.addEventListener("click", () => {
  navList.classList.toggle("active");
  burgerWrapper.classList.toggle("active");
  btnBurgerOpen.classList.toggle("active");
  if (burgerWrapper.classList.contains("active")) {
    body.style.overflow = "hidden";
  } else {
    body.style.overflow = "";
  }
  if (btnBurgerOpen.classList.contains("active")) {
    btnBurgerOpen.style.transform = "translateX(-50px)";
  } else {
    btnBurgerOpen.style.transform = "";
  }
});
