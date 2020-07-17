import React, { Component } from "react";
import { getMovies, getMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "./common/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "../../node_modules/lodash";

class Movies extends Component {
  state = {
    movies: [],
    likes: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  handleLike = (movieId) => {
    console.log(`You like ${getMovie(movieId).title} !`);

    let likes = this.state.likes;
    if (!likes.includes(movieId)) {
      likes.push(movieId);
      this.setState({ likes });
    } else {
      likes = likes.filter((l) => l !== movieId);
      this.setState({ likes });
    }
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({
      sortColumn: sortColumn,
    });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
      sortColumn,
    } = this.state;

    let filteredMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const moviesToRender = paginate(sorted, currentPage, pageSize);

    return { totalCount: filteredMovies.length, data: moviesToRender };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, selectedGenre, sortColumn } = this.state;
    if (count === 0) return <p>There are no movies in the database.</p>;

    const { totalCount, data: moviesToRender } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={selectedGenre}
          />
        </div>
        <div className="col">
          <p>Showing {totalCount} movies in the database.</p>
          <MoviesTable
            movies={moviesToRender}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
