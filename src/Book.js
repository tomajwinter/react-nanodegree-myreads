// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Internal Dependencies
import Changer from './Changer';

const coverImage = props => {
  const backgroundThumbnail = (props.data.imageLinks || {}).thumbnail;

  return (
    <div
      className="book-cover"
      style={{
        width: 128,
        height: 193,
        backgroundImage: `url(${backgroundThumbnail})`
      }}
    />
  );
};

const changer = props => {
  return (
    <Changer
      book={props.data}
      onChangingShelf={props.onChangingShelf}
    />
  );
};

const Book = props =>
  <div className="book">
    <div className="book-top">
      {coverImage(props)}
      {changer(props)}
    </div>
    <div className="book-title">
      {props.data.title}
    </div>
    <div className="book-authors">
      {props.data.authors}
    </div>
  </div>;

Book.propTypes = {
  data: PropTypes.object
};

export default Book;
