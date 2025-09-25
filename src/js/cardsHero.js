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
      background: "#222233",
      maxWidth: "386px",
      colorText: "#FFFFFF",
      letterSpace: "-0.35px",
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
        (card) => `<div class="hero__card"  style="
                 ${card.background ? `background:${card.background};` : ""}
                 ${card.maxWidth ? `max-width:${card.maxWidth};` : ""}
               ">
        <div class="hero__card-icon" style="${card.color ? `background:${card.color};` : ""}">
          <img src="${card.img}" alt="icon" />
        </div>
        <h3 class="hero__card-title">${card.title}</h3>
        <p class="hero__card-title-text" style="
        ${card.colorText ? `color : ${card.colorText}; ` : ""} 
        ${card.letterSpace ? `letter-spacing:${card.letterSpace};`:""} " >
         ${card.text}
        </p>
      </div>`,
      )
      .join("");
  }
});
