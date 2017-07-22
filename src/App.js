import React from 'react';
import { Route, Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';
import Search from './Search';
import * as BooksAPI from './BooksAPI';
import './App.css';

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

  currentlyReading = () => {
    return this.state.books.filter(book => book.shelf === 'currentlyReading');
  };

  read = () => {
    return this.state.books.filter(book => book.shelf === 'read');
  };

  wantToRead = () => {
    return this.state.books.filter(book => book.shelf === 'wantToRead');
  };

  bookshelves = () => {
    return (
      <div>
        <Bookshelf
          title="Currently Reading"
          books={this.currentlyReading()}
          onChangingShelf={this.onChangingShelf}
        />
        <Bookshelf
          title="Want to Read"
          books={this.wantToRead()}
          onChangingShelf={this.onChangingShelf}
        />
        <Bookshelf
          title="Read"
          books={this.read()}
          onChangingShelf={this.onChangingShelf}
        />
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
