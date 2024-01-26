const elements = {
  container: document.querySelector('.js-movie-list'),
  loadBtn: document.querySelector('.js-load-more'),
};


const defaults = {
  poster: 'https://eticketsolutions.com/demo/themes/e-ticket/img/movie.jpg',
  date: 'XXXX-XX-XX',
  title: 'Title not found',
  vote: 'XX.XX',
};

let page = 1;

elements.loadBtn.addEventListener('click', handlerLoadMore);

function handlerLoadMore() {
    page += 1;
    serviceFilms(page)
      .then(data => {
        elements.container.insertAdjacentHTML(
          'beforeend',
          createMarkup(data.results)
        );
        if (data.page >= data.total_pages) {
          elements.loadBtn.classList.replace('load-more', 'load-more-hidden');
        }
      })
      .catch(err => {
        elements.container.insertAdjacentHTML(
          'beforeend',
          createMarkup(data.results)
        );
      });
}

function createMarkup(arr) {
  return arr
    .map(
      ({ poster_path, original_title, release_date, vote_average }) =>
        `<li class="movie-card">
        <img src="${
          poster_path
            ? 'https://image.tmdb.org/t/p/w300' + poster_path
            : defaults.poster
        }" alt="${original_title || defaults.title}">
        <div class="movie-info">
          <h2 class="movie-title">${original_title || defaults.title}</h2>
          <p>${release_date || defaults.date}Release Date:</p>
          <p>${vote_average || defaults.vote}Vote Average:</p>
        </div>
      </li>`
    )
    .join('');
}

function serviceFilms(currentPage = '1') {
  const params = new URLSearchParams({
    page: currentPage,
    api_key: '54c7b027f5cdebd977d4a2cb3ecddc3d',
  });
  
  return fetch(
    `https://api.themoviedb.org/3/trending/movie/week?${params}`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error('Error');
    }
    return resp.json();
  });

  // fetch(
  //   `https://api.themoviedb.org/3/trending/movie/week?api_key=54c7b027f5cdebd977d4a2cb3ecddc3d&page=${page}`
  // );
}

serviceFilms()
    .then(data => { 
        console.log(data);
        elements.container.insertAdjacentHTML('beforeend', createMarkup(data.results));

        if (data.page < data.total_pages) {
            elements.loadBtn.classList.replace('load-more-hidden', 'load-more')
        }
    })    
    .catch((err) => {
        elements.container.insertAdjacentHTML('beforeend', createMarkup(data.results));
  });
