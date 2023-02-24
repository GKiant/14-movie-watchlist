import { watchlist } from './index.js';

const addBtnData = {
  id: 'add-btn-',
  class: 'add-btn',
  text: 'Watchlist',
  icon: 'add-icon',
};

const removeBtnData = {
  id: 'remove-btn-',
  class: 'remove-btn',
  text: 'Remove',
  icon: 'remove-icon',
};

const setStorage = (source) => {
  const sendJSON = JSON.stringify(source);
  localStorage.setItem('movies', sendJSON);
};

const getFilmHtml = (
  title,
  id,
  poster,
  rating,
  runtime,
  genre,
  plot,
  actionBtn
) => {
  return `
    <li class="list-item" id="film-${id}">
      <img src="${poster}" alt="${title} movie poster" width="99px" height="100%" />
      <div class="item-description-container">
        <div class="movie-title">
          <h3>${title}</h3>
          <span class="rating-text"> ⭐ ${rating}</span>
        </div>
        <div class="movie-data-container">
          <span>${runtime}</span>
          <span>${genre}</span>
          <button class="${actionBtn.class}" id="${actionBtn.id}${id}">
            <span class="${actionBtn.icon}"></span>
            ${actionBtn.text}
          </button>
        </div>
        <p class="movie-description">
           ${plot}
        </p>
      </div>
    </li>
  `;
};

// ${plot.length > 110 ? addShowMore(plot, id) :

export { addBtnData, removeBtnData, getFilmHtml, setStorage };
