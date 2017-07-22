import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Changer from './Changer';

class Book extends Component {
  static propTypes = {
    data: PropTypes.object
  };

  render() {
    const { title, authors, shelf } = this.props.data;
    const backgroundThumbnail = (this.props.data.imageLinks || {}).thumbnail;

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${backgroundThumbnail})`
            }}
          />
          <Changer
            book={this.props.data}
            shelf={shelf}
            onChangingShelf={this.props.onChangingShelf}
          />
        </div>
        <div className="book-title">
          {title}
        </div>
        <div className="book-authors">
          {authors}
        </div>
      </div>
    );
  }
}

export default Book;
