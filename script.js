const headerEl = document.getElementById("header");
const descriptionEl = document.getElementById("description");
const currency_oneEl = document.getElementById("currency-one");
let amountEl_one = document.getElementById("amount-one");
const currency_twoEl = document.getElementById("currency-two");
let amountEl_two = document.getElementById("amount-two");
const swapBtn = document.getElementById("swap");
const swapContainer = document.getElementById("swap-container");
const rateEl = document.getElementById("rate");
const languageEl = document.getElementById("language-select");

// Language Choice Dictionary
const translations = {
  en: {
    title: "Currency Converter",
    descriptionText: "Choose the currency and the amount to get the current exchange rate",
  },
  es: {
    title: "Convertidor de Moneda",
    descriptionText: "Seleccione la moneda y la cantidad para obtener el tipo de cambio actual",
  },
  fr: {
    title: "Convertisseur de devises",
    descriptionText: "Choisissez la devise et le montant pour obtenir le taux de change actuel",
  },
  ru: {
    title: "Конвертер валют",
    descriptionText: "Выберите валюту и сумму, чтобы получить текущий обменный курс",
  },
};

// Functions
function updateLanguage(lang) {
  headerEl.innerText = translations[lang].title;
  descriptionEl.innerText = translations[lang].descriptionText;
}

function calculate() {
  const currency_one = currency_oneEl.value;
  const currency_two = currency_twoEl.value;
  console.log(currency_one);
  console.log(currency_two);

  fetch(`https://v6.exchangerate-api.com/v6/4dd21f9144424d63a69cdc33/latest/${currency_one}`)
    .then((response) => response.json())
    .then((data) => {
      const rates = data.conversion_rates;
      const rate = rates[currency_two];
      rateEl.classList.remove("hidden");
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
      swapContainer.classList.add("result");
    });
}

// Event Listeners
languageEl.addEventListener("change", () => {
  updateLanguage(languageEl.value);
});

currency_oneEl.addEventListener("change", () => {
  calculate();
});

currency_twoEl.addEventListener("change", () => {
  calculate();
});

amountEl_one.addEventListener("input", () => {
  console.log(amountEl_one.value);
  calculate();
});

swapBtn.addEventListener("click", () => {
  const temp = currency_oneEl.value;
  currency_oneEl.value = currency_twoEl.value;
  currency_twoEl.value = temp;
  calculate();
});

document.addEventListener("DOMContentLoaded", () => {
  updateLanguage("en"); // Default language is English
});
