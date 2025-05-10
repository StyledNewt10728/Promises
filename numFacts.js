//The project page says to not use async/await so I didn't for this file but will use it for the other 2 parts of the project

let randomNum = 12;
let numbersAPI = "http://numbersapi.com";

async function num1() {
  try {
    let num = await axios.get(`${numbersAPI}/${randomNum}?json`);
    console.log(num.data);
  } catch (error) {
    console.error("Failed to get number", error);
  }
}
// num1();

async function numFacts() {
  const button = document.querySelector("button");
  button.addEventListener("click", Display);

  async function Display() {
    try {
      let wait = await Promise.all(
        Array.from({ length: 4 }, () =>
          axios.get(`${numbersAPI}/${randomNum}?json`)
        )
      );
      wait.forEach((num) => {
        document.body.insertAdjacentHTML(
          "beforeend",
          `<p>${num.data.text}</p>`
        );
      });
    } catch (err) {
      console.error("Failed to get facts", err);
    }
  }
}
numFacts();
