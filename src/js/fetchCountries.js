const BASE_URL = 'https://restcountries.eu/rest/v2';

export function fetchCountries (name) {
    const FILTRES = 'fields=name;capital;population;flag;languages';
    return fetch(`${BASE_URL}/name/${name}?${FILTRES}`)
    .then(response => {
        if (!response.ok) {
            throw new onFetchError(response.status);
          }
          return response.json();
    });
}