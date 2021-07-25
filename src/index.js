import './css/styles.css';

import getRefs from './js/get-refs';

import { fetchCountries } from './js/fetchCountries';
import Notiflix from "notiflix";

import countryTpl from './templates/country.hbs';
import countriesListTpl from './templates/countries-list.hbs';

const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    e.preventDefault();

    let query = e.target.value.trim();

    if (!query) {
        clearCountryCard();
       return;
    }

    fetchCountries(query)
        .then(renderCountryCard)
        .catch(onFetchError);
        // .finally(() => input.reset());
};

function renderCountryCard (country) {
    clearCountryCard();
    if (country.length > 10) {
       Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (country.length === 1) {
        markupCountryCard(country);
    } else {
        markupCountriesList(country);
    }
}

function clearCountryCard() {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
}

function markupCountryCard(country) {
    const markupCountry = countryTpl(country);
    refs.countryInfo.innerHTML = markupCountry;
}

function markupCountriesList(country) {
    const markupList = countriesListTpl(country);
    refs.countriesInfo.innerHTML = markupList;
}

function onFetchError () {
    console.log('ERROR');
    Notiflix.Notify.failure('Oops, there is no country with that name.');   
}

