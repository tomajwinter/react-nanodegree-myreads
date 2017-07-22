import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import PropTypes from 'prop-types';
import * as BooksAPI from './utils/BooksAPI';

class Search extends Component {
  static propTypes = {
    shelvedBooks: PropTypes.array.isRequired,
    onChangingShelf: PropTypes.func.isRequired
  };

  state = {
    query: '',
    results: []
  };

  updateQuery = query => {
    if (query.length > 0) {
      BooksAPI.search(query, 50).then(results => {
        const updatedBooks = this.updateShelves(results);
        this.setState({
          results: updatedBooks
        });
      });
    } else {
      this.setState({ results: [] });
    }
    this.setState({ query: query.trim() });
  };

  updateShelves = results => {
    const { shelvedBooks } = this.props;
    const updatedBooks = results.map(result => {
      const duplicate = shelvedBooks.find(
        shelvedBook => shelvedBook.id === result.id
      );
      if (duplicate) {
        result.shelf = duplicate.shelf;
      }
      return result;
    });
    return updatedBooks;
  };

  searchBar = () => {
    const { query } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
      </div>
    );
  };

  searchResults = () => {
    const { results } = this.state;
    if (results.length === 0) {
      return (
        <div className="search-books-results">
          <span>Nothing found</span>
        </div>
      );
    }

    return (
      <div className="search-books-results">
        <ol className="book-list">
          {results.length > 0 &&
            results.map(book =>
              <li key={book.id} className="book-list-item">
                <div className="book-details">
                  <Book
                    data={book}
                    onChangingShelf={this.props.onChangingShelf}
                  />
                </div>
              </li>
            )}
        </ol>
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.searchBar()}
        {this.searchResults()}
      </div>
    );
  }
}

export default Search;
