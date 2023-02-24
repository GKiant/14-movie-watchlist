import { addBtnData, removeBtnData, getFilmHtml, setStorage } from './utils.js';

const getStorage = () => {
  const getJSON = localStorage.getItem('movies');
  if (getJSON) {
    return JSON.parse(getJSON);
  } else {
    return [];
  }
};

const watchlist = getStorage();

const searchInput = document.getElementById('search-input');
const filmList = document.getElementById('film-list');
const mainContainer = document.getElementById('main-container');

// const showMore = (id) => {
//   document.getElementById(`show-more-${id}`).style.display = 'none';
//   document.getElementById(`dots-${id}`).style.display = 'none';

//   document.getElementById(`show-less-${id}`).style.display = 'inline';
//   document.getElementById(`more-${id}`).style.display = 'inline';
// };

// const showLess = (id) => {
//   document.getElementById(`show-less-${id}`).style.display = 'none';
//   document.getElementById(`more-${id}`).style.display = 'none';

//   document.getElementById(`show-more-${id}`).style.display = 'inline';
//   document.getElementById(`dots-${id}`).style.display = 'inline';
// };

// const addShowMore = (text, id) => {
//   const showText = text.slice(0, 111);
//   const hiddenText = text.slice(111);

//   return `${showText}<span id="dots-${id}">...</span><span id="more-${id}" class="more">${hiddenText}</span>
//     <a onclick="showMore('${id}')" id="show-more-${id}" class="show-more show">Read More</a>
//     <a onclick="showLess('${id}')" id="show-less-${id}" class="show-less show">Show Less</a>
//   `;
// };

// Submitting search form and passing input value to the getHtml function

if (window.location.pathname === '/index.html') {
  document
    .getElementById('search-form')
    .addEventListener('submit', async (e) => {
      e.preventDefault();
      document.getElementById('empty-page').style.display = 'none';
      filmList.innerHTML = '';
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=dd5e241f&s=${searchInput.value}`
      );
      const data = await res.json();

      if (data.Response === 'True') {
        data.Search.forEach(async (e) => {
          if (e.Type === 'movie' || e.Type === 'series') {
            const res = await fetch(
              `http://www.omdbapi.com/?apikey=dd5e241f&i=${e.imdbID}`
            );
            const movieInfo = await res.json();

            filmList.innerHTML += getFilmHtml(
              movieInfo.Title,
              movieInfo.imdbID,
              movieInfo.Poster,
              movieInfo.imdbRating,
              movieInfo.Runtime,
              movieInfo.Genre,
              movieInfo.Plot,
              addBtnData
            );
          }
        });
      } else {
        mainContainer.innerHTML = `<div class="not-found-container">
          <p class='not-found'>Unable to find what you're looking for. Please try another search.</p>
        <div>`;
      }
    });

  mainContainer.addEventListener('click', async (e) => {
    if (e.target.className === 'add-btn') {
      const imdbId = e.target.id.slice(8);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=dd5e241f&i=${imdbId}`
      );
      const movieInfo = await res.json();

      if (watchlist.find((i) => i.id === imdbId)) {
        return;
      }
      watchlist.push({
        title: movieInfo.Title,
        id: movieInfo.imdbID,
        poster: movieInfo.Poster,
        rating: movieInfo.imdbRating,
        runtime: movieInfo.Runtime,
        genre: movieInfo.Genre,
        plot: movieInfo.Plot,
      });
    }
    setStorage(watchlist);
  });
}

export { watchlist };
