const API_TOKEN = 'e78a0825d6dd44e039a912bfcaee6660';

export function getFilmsWithSearchedText(text) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text

    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log(error));
}

export function getImage(name) {
    return 'https://image.tmdb.org/t/p/w300' + name;
}