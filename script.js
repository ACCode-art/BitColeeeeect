const searchResults = document.querySelector(".searchResults");
const cryptoContainer = document.querySelector(".cryptoContainer");
let array = [];
searchResults.addEventListener("click", (e) => {
  const p = e.target.textContent;

  array.push(p);
  console.log(array);

  array.map((arr) => {
    const html = `<p>${arr}</p>`;

    cryptoContainer.insertAdjacentHTML("beforeend", html);
  });
});

async function crypto() {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
  );
  const data = await response.json();
  console.log(data);

  data.map((coin) => {
    const {
      name,
      symbol,
      current_price: price,
      market_cap_rank: rank,
      high_24h: high,
      low_24h: low,
    } = coin;
    const range = high - low;
    const HTML = `<div class="coinResults hover">
    <div class="coinResults__left">
      <p>${name}</p>
      <p class="symbol">${symbol.toUpperCase()}</p>
    </div>
    <div class="coinResults__right">
      <p class="price">$ ${price}</p>
    </div>
  </div>`;

    searchResults.insertAdjacentHTML("beforeend", HTML);
  });
}

crypto();
