import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class Search extends Component {
  state = {
    query: '',
    books: []
  };

  updateQuery = query => {
    if (query.length > 0) {
      BooksAPI.search(query, 100).then(books => {
        this.setState({
          books: books
        });
      });
    }
    this.setState({ query: query.trim() });
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
    const { books } = this.state;

    if (books.error === 'empty query') {
      return (
        <div className="search-books-results">
          <span>Nothing found</span>
        </div>
      );
    }

    return (
      <div className="search-books-results">
        <ol className="book-list">
          {books.length > 0 &&
            books.map(book =>
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
