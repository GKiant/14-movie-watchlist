import { getFilmHtml, removeBtnData, setStorage } from './utils.js';
import { watchlist } from './index.js';

const watchlistContainer = document.getElementById('watchlist-main');
const emptyWatchlist = document.getElementById('empty-watchlist');

let updatedWatchlist = watchlist;

const renderWatchlistPage = () => {
  document.getElementById('watchlist-list').innerHTML = '';
  if (updatedWatchlist.length) {
    emptyWatchlist.style.display = 'none';
    for (let movie of updatedWatchlist) {
      document.getElementById('watchlist-list').innerHTML += getFilmHtml(
        movie.title,
        movie.id,
        movie.poster,
        movie.rating,
        movie.runtime,
        movie.genre,
        movie.plot,
        removeBtnData
      );
    }
  } else {
    emptyWatchlist.style.display = 'flex';
  }
};

if (watchlist) {
  renderWatchlistPage();
}

watchlistContainer.addEventListener('click', (e) => {
  if (e.target.className === 'remove-btn') {
    const imdbId = e.target.id.slice(11);
    updatedWatchlist = updatedWatchlist.filter((film) => film.id !== imdbId);
    setStorage(updatedWatchlist);
    renderWatchlistPage();
  }
});
