// External Dependencies
import React from 'react';

// Internal Dependencies
import * as BooksAPI from './utils/BooksAPI';

const changeShelf = (props, value) => {
  const { book } = props;

  BooksAPI.update({ id: book.id }, value).then(books => {
    props.onChangingShelf(book, value);
  });
};

const Changer = props =>
  <div className="book-shelf-changer">
    <select
      defaultValue={props.book.shelf}
      onChange={event => changeShelf(props, event.target.value)}
    >
      <option value="none" disabled>
        Move to...
      </option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="wantToRead">Want to Read</option>
      <option value="read">Read</option>
      <option value="none">None</option>
    </select>
  </div>;

export default Changer;
