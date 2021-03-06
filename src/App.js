// External Dependencies
import React from 'react';
import { Route, Link } from 'react-router-dom';
import { startCase } from 'lodash';

// Internal Dependencies
import * as BooksAPI from './utils/BooksAPI';
import './App.css';
import Bookshelf from './Bookshelf';
import Search from './Search';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.onChangingShelf = this.onChangingShelf.bind(this);
  }

  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    });
  }

  onChangingShelf = (updatedBook, shelf) => {
    let books = this.state.books;
    books = books.filter(book => book.id !== updatedBook.id);
    updatedBook.shelf = shelf;
    books.push(updatedBook);
    this.setState({ books: books });
  };

  shelves = () => {
    return ['currentlyReading', 'wantToRead', 'read'];
  };

  bookshelves = () => {
    const { books } = this.state;

    return (
      <div>
        {this.shelves().map(shelf => {
          return (
            <Bookshelf
              key={shelf}
              title={startCase(shelf)}
              books={books.filter(book => book.shelf === shelf)}
              onChangingShelf={this.onChangingShelf}
            />
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={() =>
            <Search
              shelvedBooks={this.state.books}
              onChangingShelf={this.onChangingShelf}
            />}
        />
        <Route
          exact
          path="/"
          render={() =>
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                {this.bookshelves()}
              </div>
              <div className="open-search">
                <Link to="/search">Add a Book</Link>
              </div>
            </div>}
        />
      </div>
    );
  }
}

export default BooksApp;
