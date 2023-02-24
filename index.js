const searchInput = document.getElementById('search-input');
const mainContainer = document.getElementById('main-container');
const filmList = document.getElementById('film-list');

const showMore = (id) => {
  //removes the link
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

  return `${showText}<span id="dots-${id}">...</span><span id="more-${id}" class="more">${hiddenText}</span>
    <a href="javascript:showMore('${id}')" id="show-more-${id}" class="show-more show">Read More</a>
    <a href="javascript:showLess('${id}')" id="show-less-${id}" class="show-less show">Show Less</a>
  `;
};

document.getElementById('search-btn').addEventListener('click', async () => {
  filmList.innerHTML = '';
  const res = await fetch(
    `http://www.omdbapi.com/?apikey=dd5e241f&s=${searchInput.value}`
  );
  const data = await res.json();
  console.log(data.Search);

  if (data.Search.length) {
    data.Search.forEach(async (e) => {
      if (e.Type === 'movie' || e.Type === 'series') {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=dd5e241f&i=${e.imdbID}`
        );
        const movieInfo = await res.json();
        console.log(movieInfo);
        filmList.innerHTML += getFilmHtml(
          movieInfo.Title,
          movieInfo.imdbID,
          movieInfo.Poster,
          movieInfo.imdbRating,
          movieInfo.Runtime,
          movieInfo.Genre,
          movieInfo.Plot
        );
      }
    });
  }
});

const getFilmHtml = (title, id, poster, rating, runtime, genre, plot) => {
  return `
    <li class="list-item">
      <img src="${poster}" alt="${title} movie poster" width="99px" />
      <div class="item-description-container">
        <div class="movie-title">
          <h3>${title}</h3>
          <span>⭐</span>
          <span>${rating}</span>
        </div>
        <div class="movie-data-container">
          <span>${runtime}</span>
          <span>${genre}</span>
          <button class="add-btn">
            <span class="add-icon"></span>
            Watchlist
          </button>
        </div>
        <p class="movie-description">
          ${plot.length > 110 ? addShowMore(plot, id) : plot}

        </p>
      </div>
    </li>
  `;
};
