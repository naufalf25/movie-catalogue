import { createMovieItemTemplate } from '../../templates/template-creator';

class FavoriteMovieSearchView {
  // eslint-disable-next-line class-methods-use-this
  getTemplate() {
    return `
      <div class="content">
        <input id="query" type="text">
        <h2 class="content__heading">Your Liked Movie</h2>
        <div id="movies" class="movies"></div>
      </div>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  runWhenUserIsSearching(callback) {
    document.querySelector('#query').addEventListener('change', (event) => {
      callback(event.target.value);
      console.log(callback(event.target.value));
    });
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  showFavoriteMovies(movies) {
    let html;
    if (movies.length) {
      html = movies.reduce((carry, movie) => carry.concat(createMovieItemTemplate(movie)), '');
    } else {
      html = this._getEmptyMovieTemplate();
    }
    document.getElementById('movies').innerHTML = html;

    document.querySelector('#movies').dispatchEvent(new Event('movies:updated'));
  }

  // eslint-disable-next-line class-methods-use-this
  _getEmptyMovieTemplate() {
    return '<div class="movie-item__not__found">Tidak ada film untuk ditampilkan</div>';
  }
}

export default FavoriteMovieSearchView;
