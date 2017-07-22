// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Internal Dependencies
import Book from './Book';

const bookCollection = props => {
  return props.books.map(book => {
    return (
      <li key={book.id}>
        <Book data={book} onChangingShelf={props.onChangingShelf} />
      </li>
    );
  });
};

const Bookshelf = props =>
  <div className="bookshelf">
    <h2 className="bookshelf-title">
      {props.title}
    </h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {bookCollection(props)}
      </ol>
    </div>
  </div>;

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired
};

export default Bookshelf;
