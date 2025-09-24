document.addEventListener("DOMContentLoaded", () => {
  const arrayCards = [
    {
      img: "../img/porftolioPage/cards/iconSmile.webp",
      title: "Passionate",
      text: "As Pasteur himself commented, “Chance favors",
    },
    {
      img: "../img/porftolioPage/cards/iconLup.webp",
      title: "Curious",
      text: "As Pasteur himself commented, “Chance favors only the prepared mind.",
    },
    {
      img: "../img/porftolioPage/cards/iconPlanet.webp",
      title: "Team Work",
      text: "As Pasteur himself commented, “Chance favors only the prepared mind.",
    },
    {
      img: "../img/porftolioPage/cards/iconFigure.webp",
      title: "Discipline",
      text: "As Pasteur himself commented, “Chance favors only the prepared mind.",
      color: "#57efb4",
    },
    {
      img: "../img/porftolioPage/cards/iconStick.webp",
      title: "Creative",
      text: "As Pasteur himself commented, “Chance favors only the prepared mind.",
    },
    {
      img: "../img/porftolioPage/cards/iconMan.webp",
      title: "Compassionate",
      text: "As Pasteur himself commented, “Chance favors only the prepared mind.",
    },
  ];
  const cardsRender = document.querySelector(".makes__cards");
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
