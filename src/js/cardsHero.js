document.addEventListener("DOMContentLoaded", () => {
  const arrayCards = [
    {
      img: "img/hero/iconUI.svg",
      title: "UI-X Design",
      text: "   The time that leads to mastery is dependent on the intensity of our focus.",
    },
    {
      img: "img/hero/iconProduct.svg",
      title: "Product Design",
      text: "The time that leads to mastery is dependent on the intensity of our focus.",
      color: "#57efb4",
    },
    {
      img: "img/hero/iconWriting.svg",
      title: "Writing",
      text: "   The time that leads to mastery is dependent on the intensity of our focus.",
    },
  ];
  const cardsRender = document.querySelector(".hero__cards");
  if (cardsRender) {
    cardsRender.innerHTML = arrayCards
      .map(
        (card) => `<div class="hero__card">
        <div class="hero__card-icon" style="background:${card.color}">
          <img src="${card.img}" alt="icon" />
        </div>
        <h3 class="hero__card-title">${card.title}</h3>
        <p class="hero__card-title-text">
         ${card.text}
        </p>
      </div>`,
      )
      .join("");
  }
});
