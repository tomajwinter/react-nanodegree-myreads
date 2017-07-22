import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class Bookshelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired
  }

  bookCollection = () => {
    return(
      this.props.books.map((book) => {
        return (
          <li key={ book.id } >
            <Book
              data={ book }
              onChangingShelf={ this.props.onChangingShelf }
            />
          </li>
        )
      })
    )
  }

  render() {
    const { title } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ title }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { this.bookCollection() }
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf;
