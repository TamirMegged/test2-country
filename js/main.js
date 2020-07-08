import getCountries from './ajaxService.js';

window.addEventListener('load', () => {
    document.querySelector('#clear').addEventListener('click', clearScreen);
    document.querySelector('#allCountries').addEventListener('click', getAll);
    document.querySelector('#searchCountry').addEventListener('click', searchCountry);
});


function clearScreen() {
    const container = document.querySelector('#countriesContainer');
    container.innerHTML = "";
    document.querySelector('body').classList.add('worldMap');    
}


function getAll() {
    const url = 'https://restcountries.eu/rest/v2/all?fields=name;topLevelDomain;capital;currencies;flag;borders';
    getCountries(url, showCountries);
}


function searchCountry() {
    const name = document.querySelector('#countryName').value;
    if (name === '') {
        document.querySelector('#countryName').focus();
        document.querySelector('#noName').style.visibility = 'visible';
        setTimeout(function() {document.querySelector('#noName').style.visibility = 'hidden'}, 1000);
        return;
    }
    const url = `https://restcountries.eu/rest/v2/name/${name}`;
    getCountries(url, showCountries);
}


function showCountries() {
    if (this.status === 404) {
        document.querySelector('#countriesContainer').innerHTML = "<div id='notFound'><b>No countries found</b></div>";
        document.querySelector('body').classList.add('worldMap');
        return;
    }
    const countries = JSON.parse(this.responseText);
    let html = countries.map(country => `<div class="country">
                    <img width="150px" src="${country.flag}">
                    <div title="Name"><b>${country.name}</b></div>
                    <div title="Capital">${country.capital}</div>
                    <div title="Top Level Domain">${country.topLevelDomain}</div>
                    <div title="Borders by Alpha-3 Codes">${sortBorders(country.borders)}</div>
                    <div title="Currencies">${country.currencies[0].code} ${country.currencies[0].name} ${country.currencies[0].symbol}</div>
                </div>`).join('');
    const container = document.querySelector('#countriesContainer');
    container.innerHTML = html;
    document.querySelector('body').classList.remove('worldMap');
}

function sortBorders(countryBorders) {
    if (countryBorders.length === 0) {
        return "No Borders";
    }
    return countryBorders.join(', ');
}