import getRefs from './get-refs';

// import { refs } from './js/refs';
import { fetchCountries } from './fetchCountries';
import Notiflix from "notiflix";

import countryTpl from '../templates/country.hbs';
import countriesList from '../templates/countries-list.hbs';

const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    // e.preventDefault();

    const query = e.target.value.trim();

    fetchCountries(query)
        .then(renderCountryCard)
        .catch(onFetchError);
        // .finally(() => refs.input.reset());
};

function renderCountryCard (country) {
    if (country.length > 3) {
        Notiflix.Notify.Info("Too many matches found. Please enter a more specific name.");
        console.log('many');
    }

    const markup = countryTpl(country);
    refs.countryInfo.innerHTML = markup;
}

function onFetchError (error) {
    console.log('CATCH');
}

