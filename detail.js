const params = new URLSearchParams(location.search);
const countryName = params.get("name");
const loadingWrapper = document.getElementsByClassName("loadingWrapper")[0];
const countryDetails = document.getElementById("country-details");

fetch(`https://restcountries.com/v3.1/alpha?codes=${countryName}`)
  .then((response) => response.json())
  .then((country) => displayCountry(country[0]));

function displayCountry(country) {
  document.title = country.name.common;
  countryDetails.insertAdjacentHTML(
    "beforeend",
    `
    <div class="selection">

    <button onclick="backFunc()"><i class="fa-solid fa-arrow-left"></i> BACK</button>
    <div id="selection-box">
      <img src="${country.flags.svg}" alt="${country.name.common}" />
      <div class="info">
        <div class="first-info">
          <div class="first-col">
            <h1>${country.name.common}</h1>
            <h3>Native name: <span>${generateNativeName(
              country.name.nativeName
            )}</span></h3>
            <h3>Population: <span>${country.population}</span></h3>
            <h3>Region: <span>${country.region}</span></h3>
            <h3>Sub Region: <span>${country.subregion}</span></h3>
            <h3>Capital: <span>${country.capital}</span></h3>
          </div>
          <div class="second-col">
            <h3>Top Level Domain: <span>${country.tld}</span></h3>
            <h3>Currencies: <span>${generateCurrencies(
              country.currencies
            )}</span></h3>
            <h3>Language: <span>${generateLanguaes(
              country.languages
            )}</span></h3>
          </div>
        </div>
        <div class="second-info">
          <h3>Border Countries:</h3>
          ${generateBorderCountries(country.borders)}
        </div>
      </div>
    </div>
  </div>
    `
  );
  loadingWrapper.remove();

}

function backFunc() {
  if(getSessionStorage("History") < 0) {
    window.history.go(getSessionStorage(
      "History"
    )); return false;
  } else {
    window.location.assign("./index.html")
  }
}

function getSessionStorage(key) {
  return sessionStorage.getItem(key);
}

function setSessionStorage(key) {
  if (key == "History") {
    let prev = sessionStorage.getItem("History");
    window.sessionStorage.setItem("History", --prev);
  }
}

function generateNativeName(nativeName) {
  let native_name = "";
  for (let name in nativeName) {
    native_name = nativeName[name].official;
  }
  return native_name;
}

function generateCurrencies(currencies) {
  let currencies_arr = [];
  for (let currency in currencies) {
    currencies_arr.push(currencies[currency].name);
  }
  return currencies_arr;
}

function generateLanguaes(languages) {
  let languages_arr = [];
  for (let language in languages) {
    languages_arr.push(languages[language]);
  }
  return languages_arr;
}

function generateBorderCountries(borders) {
  let borderButtons = "";
  for (let border of borders) {
    borderButtons += `

        <a href="./detail.html?name=${border}" onclick="setSessionStorage('History')">${border}</a>

        `;
  }
  return borderButtons;
}
