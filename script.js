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
      <div class="coinResults__displayNone">
      <p class="priceLow">${coin.low_24h}</p>
      <p class="priceHigh">${coin.high_24h}</p>
      <p class="priceDiff">${coin.price_change_24h}</p>
      <p class="ath">${coin.ath}</p>
      <p class="atl">${coin.atl}</p>
    </div>
    </div>`;
    })
    .join("");

  searchResults.innerHTML = HTML;
};

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

searchResults.addEventListener("click", (e) => {
  const block = e.target.closest(".hover");
  const left = block.querySelector(".coinResults__left");

  const img = left.querySelector("img").src;
  const name = left.querySelector("p").textContent;

  const right = block.querySelector(".coinResults__right");
  const price = right.querySelector(".price").textContent;

  const displayNone = block.querySelector(".coinResults__displayNone");
  const priceLow = displayNone.querySelector(".priceLow").textContent;
  const priceHigh = displayNone.querySelector(".priceHigh").textContent;
  const priceDiff = displayNone.querySelector(".priceDiff").textContent;
  const ath = displayNone.querySelector(".ath").textContent;
  const atl = displayNone.querySelector(".atl").textContent;

  console.log(priceHigh);

  const html = `
      <div class="coinMore">
          <div class="coinMore__header">
            <img
              src=${img}
                alt=""
             />
            <h1>${name}</h1>
          </div>

        
          <h1 style="margin-top: 20px">Current price: ${price}</h1>
          <p style="margin-top: 20px">Price low: $ ${priceLow}</p>
          <p style="margin-top: 20px">Price high: $ ${priceHigh}</p>
          <p style="margin-top: 20px">Price difference: $ ${(
            priceHigh - priceLow
          ).toFixed(2)}</p>
          <p class="green" style="margin-top: 20px">All time high: $ ${ath}</p>
          <p class="red" style="margin-top: 20px">All time low: $ ${atl}</p>
          
         
        </div>

  `;

  cryptoContainer.innerHTML = html;
});
