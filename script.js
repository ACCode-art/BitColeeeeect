const searchResults = document.querySelector(".searchResults");
const cryptoContainer = document.querySelector(".cryptoContainer");
const input = document.querySelector("input");

let data = [];

input.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filtered = data.filter((coin) => {
    return (
      coin.name.toLowerCase().includes(searchString) ||
      coin.symbol.toLowerCase().includes(searchString)
    );
  });
  displayCoins(filtered);
});

async function crypto() {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
  );
  data = await response.json();
  console.log(data);
}

crypto();

const displayCoins = (coins) => {
  const HTML = coins
    .map((coin) => {
      return `<div class="coinResults hover">
      <div class="coinResults__left">
        <img src=${coin.image}/><p>${coin.name}</p>
        <p class="symbol">${coin.symbol.toUpperCase()}</p>
      </div>
      <div class="coinResults__right">
        <p class="price">$ ${coin.current_price}</p>
      </div>
    </div>`;
    })
    .join("");

  searchResults.innerHTML = HTML;
};

searchResults.addEventListener("click", (e) => {
  const block = e.target.closest(".hover");
  const left = block.querySelector(".coinResults__left");

  const img = left.querySelector("img").src;
  const name = left.querySelector("p").textContent;

  const right = block.querySelector(".coinResults__right");
  const price = right.querySelector(".price").textContent;
  console.log(price);

  const html = `
      <div class="coinMore">
          <div class="coinMore__header">
            <img
              src=${img}
                alt=""
             />
            <h1>${name}</h1>
          </div>

        
          <p>${price}</p>
         
        </div>

  `;

  cryptoContainer.innerHTML = html;
});
