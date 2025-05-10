document.addEventListener("DOMContentLoaded", () => {
  const cardAPI = "https://deckofcardsapi.com/api/deck";

  async function setup() {
    try {
      const button = document.querySelector("button");
      const cardArea = document.querySelector("#card_place");
      const finished = document.querySelector("#final_place");

      const deck = await axios.get(`${cardAPI}/new/shuffle`);
      const deckID = deck.data.deck_id;

      button.style.display = "block";
      button.addEventListener("click", async () => {
        try {
          const response = await axios.get(`${cardAPI}/${deckID}/draw?json`);
          const cardResponse = response.data.cards[0];
          const cardImg = document.createElement("img");
          const angle = Math.random() * 90 - 45;
          const randomX = Math.random() * 40 - 20;
          const randomY = Math.random() * 40 - 20;

          cardImg.src = cardResponse.image;
          cardImg.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`;
          cardArea.appendChild(cardImg);

          if (response.data.remaining === 0) {
            button.remove();
            // Wanted to add something so that players know why the button went away
            const finished = document.createTextNode(
              "Deck has been finished, refresh to play again!"
            );
            final_place.appendChild(finished);
          }
        } catch (err) {
          console.error("Failed to get card", err);
        }
      });
    } catch (err) {
      console.error("Falied to finish deck", err);
    }
  }
  setup();
});
