import React, { Component } from 'react';
import * as BooksAPI from './utils/BooksAPI';

class Changer extends Component {
  changeShelf = value => {
    const { book } = this.props;

    BooksAPI.update({ id: book.id }, value).then(books => {
      this.props.onChangingShelf(book, value);
    });
  };

  render() {
    const { shelf } = this.props.book;

    return (
      <div className="book-shelf-changer">
        <select
          defaultValue={shelf}
          onChange={event => this.changeShelf(event.target.value)}
        >
          <option value="none" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default Changer;
