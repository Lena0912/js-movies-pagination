var elements={container:document.querySelector(".js-movie-list")},defaults={poster:"https://eticketsolutions.com/demo/themes/e-ticket/img/movie.jpg",date:"XXXX-XX-XX",title:"Title not found",vote:"XX.XX"};function createMarkup(e){return e.map((function(e){var t=e.poster_path,n=e.original_title,o=e.release_date,a=e.vote_average;return'<li class="movie-card">\n        <img src="'.concat(t?"https://image.tmdb.org/t/p/w300"+t:defaults.poster,'" alt="').concat(n||defaults.title,'">\n        <div class="movie-info">\n          <h2 class="movie-title">').concat(n||defaults.title,"</h2>\n          <p>").concat(o||defaults.date,"Release Date:</p>\n          <p>").concat(a||defaults.vote,"Vote Average:</p>\n        </div>\n      </li>")})).join("")}function serviceFilms(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"1",t=new URLSearchParams({page:e,api_key:"54c7b027f5cdebd977d4a2cb3ecddc3d"});return fetch("https://api.themoviedb.org/3/trending/movie/week?".concat(t)).then((function(e){if(!e.ok)throw new Error("Error");return e.json()}))}serviceFilms().then((function(e){console.log(e),elements.container.insertAdjacentHTML("beforeend",createMarkup(e.results))})).catch((function(e){return console.log(e)}));
//# sourceMappingURL=index.68eef068.js.map
