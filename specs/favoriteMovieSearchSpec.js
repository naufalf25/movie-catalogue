import FavoriteMovieIdb from '../src/scripts/data/favorite-movie-idb';
import FavoriteSearchMoviePresenter from '../src/scripts/views/pages/liked-movies/favorite-search-movie-presenter';
import FavoriteMovieSearchView from '../src/scripts/views/pages/liked-movies/favorite-movie-search-view';

describe('Searching movies', () => {
  let presenter;
  let favoriteMovies;
  let view;

  const searchMovies = (query) => {
    const queryElement = document.querySelector('#query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setMovieSearchContainer = () => {
    view = new FavoriteMovieSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructorPresenter = () => {
    favoriteMovies = spyOnAllFunctions(FavoriteMovieIdb);
    presenter = new FavoriteSearchMoviePresenter({
      favoriteMovies,
      view,
    });
  };

  beforeEach(() => {
    setMovieSearchContainer();
    constructorPresenter();
  });

  it('Should be able to capture the query typed by the user', () => {
    searchMovies('film a');

    expect(presenter.latestQuery).toEqual('film a');
  });

  it('Should be able to capture the query typed by the user', () => {
    searchMovies('film a');

    expect(favoriteMovies.searchMovies)
      .toHaveBeenCalledWith('film a');
  });

  it('Should show - when the movie returned does not contain a title', () => {
    document.querySelector('#movies').addEventListener('movies:updated', (done) => {
      const movieTitles = document.querySelectorAll('.movie__title');
      expect(movieTitles.item(0).textContent).toEqual('-');

      done();
    });

    favoriteMovies.searchMovies.withArgs('film a').and.returnValues([
      { id: 444 },
    ]);

    searchMovies('film a');
  });

  it('Should show the movies found by Favorite Movies', () => {
    document.querySelector('#movies')
      .addEventListener('movies:updated', (done) => {
        expect(document.querySelectorAll('.movie-item').length).toEqual(3);
        done();
      });

    favoriteMovies.searchMovies.withArgs('film a').and.returnValues([
      { id: 111, title: 'film abc' },
      { id: 222, title: 'ada juga film abcde' },
      { id: 333, title: 'ini juga boleh film a' },
    ]);

    searchMovies('film a');
  });

  it('Should show the name of the movies found by Favorite Movies', () => {
    document.querySelector('#movies').addEventListener('movies:updated', () => {
      const movieTitles = document.querySelectorAll('.movie__title');
      expect(movieTitles.item(0).textContent).toEqual('film abc');
      expect(movieTitles.item(1).textContent).toEqual('ada juga film abcde');
      expect(movieTitles.item(2).textContent).toEqual('ini juga boleh film a');
    });

    favoriteMovies.searchMovies.withArgs('film a').and.returnValues([
      { id: 111, title: 'film abc' },
      { id: 222, title: 'ada juga film abcde' },
      { id: 333, title: 'ini juga boleh film a' },
    ]);

    searchMovies('film a');
  });

  describe('When query is not empty', () => {
    it('Should be able to capture the query typed by the user', () => {
      searchMovies('film a');

      expect(presenter.latestQuery).toEqual('film a');
    });

    it('Should be able to capture the query typed by the user', () => {
      searchMovies('film a');

      expect(favoriteMovies.searchMovies)
        .toHaveBeenCalledWith('film a');
    });

    it('Should show - when the movie returned does not contain a title', () => {
      document.querySelector('#movies').addEventListener('movies:updated', (done) => {
        const movieTitles = document.querySelectorAll('.movie__title');
        expect(movieTitles.item(0).textContent).toEqual('-');

        done();
      });

      favoriteMovies.searchMovies.withArgs('film a').and.returnValues([
        { id: 444 },
      ]);

      searchMovies('film a');
    });

    it('Should show the movies found by Favorite Movies', () => {
      document.querySelector('#movies')
        .addEventListener('movies:updated', (done) => {
          expect(document.querySelectorAll('.movie-item').length).toEqual(3);
          done();
        });

      favoriteMovies.searchMovies.withArgs('film a').and.returnValues([
        { id: 111, title: 'film abc' },
        { id: 222, title: 'ada juga film abcde' },
        { id: 333, title: 'ini juga boleh film a' },
      ]);

      searchMovies('film a');
    });

    it('Should show the name of the movies found by Favorite Movies', () => {
      document.querySelector('#movies').addEventListener('movies:updated', () => {
        const movieTitles = document.querySelectorAll('.movie__title');
        expect(movieTitles.item(0).textContent).toEqual('film abc');
        expect(movieTitles.item(1).textContent).toEqual('ada juga film abcde');
        expect(movieTitles.item(2).textContent).toEqual('ini juga boleh film a');
      });

      favoriteMovies.searchMovies.withArgs('film a').and.returnValues([
        { id: 111, title: 'film abc' },
        { id: 222, title: 'ada juga film abcde' },
        { id: 333, title: 'ini juga boleh film a' },
      ]);

      searchMovies('film a');
    });
  });

  describe('When query is empty', () => {
    it('Should capture the query as empty', () => {
      searchMovies(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchMovies('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchMovies('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchMovies('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('Should show all favorite movies', () => {
      searchMovies('   ');
      expect(favoriteMovies.getAllMovies).toHaveBeenCalled();
    });
  });

  describe('When no favorite movies could not found', () => {
    it('Should show the empty message', () => {
      document.querySelector('#movies').addEventListener('movies:updated', (done) => {
        expect(document.querySelectorAll('.movie-item__not__found').length).toEqual(0);
        done();
      });
      favoriteMovies.searchMovies.withArgs('film a').and.returnValues([]);
      searchMovies('film a');
    });

    it('Should not show any movie', () => {
      document.querySelector('#movies').addEventListener('movies:updated', (done) => {
        expect(document.querySelectorAll('.movie-item').length).toEqual(0);
        done();
      });
      favoriteMovies.searchMovies.withArgs('film a').and.returnValues([]);
      searchMovies('film a');
    });
  });
});
