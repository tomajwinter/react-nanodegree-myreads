import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Changer from './Changer';

class Book extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired,
    cover: PropTypes.string.isRequired
  }

  render() {
    const { title, authors, cover } = this.props;

    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${cover})` }}></div>
          < Changer />
        </div>
        <div className="book-title">{ title }</div>
        <div className="book-authors">{ authors }</div>
      </div>
    )
  }
}

export default Book;
