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

const showMore = (id) => {
  document.getElementById(`show-more-${id}`).style.display = 'none';
  document.getElementById(`dots-${id}`).style.display = 'none';

  document.getElementById(`show-less-${id}`).style.display = 'inline';
  document.getElementById(`more-${id}`).style.display = 'inline';
};

const showLess = (id) => {
  document.getElementById(`show-less-${id}`).style.display = 'none';
  document.getElementById(`more-${id}`).style.display = 'none';

  document.getElementById(`show-more-${id}`).style.display = 'inline';
  document.getElementById(`dots-${id}`).style.display = 'inline';
};

const addShowMore = (text, id) => {
  const showText = text.slice(0, 111);
  const hiddenText = text.slice(111);

  const descriptionHtml = `${showText}<span id="dots-${id}">...</span><span id="more-${id}" class="more">${hiddenText}</span>
    <a id="show-more-${id}" class="show-more show">Read More</a>
    <a id="show-less-${id}" class="show-less show">Show Less</a>
  `;

  return descriptionHtml;
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
          ${plot.length > 110 ? addShowMore(plot, id) : plot}
        </p>
      </div>
    </li>
  `;
};

export {
  addBtnData,
  removeBtnData,
  getFilmHtml,
  setStorage,
  showMore,
  showLess,
};
