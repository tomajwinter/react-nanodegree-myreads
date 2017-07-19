import React from 'react'
import { Route, Link } from 'react-router-dom'
import Bookshelf from './Bookshelf';
import Search from './Search';
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }

  currentlyReading = () => {
    return this.state.books.filter((book) => book.shelf === 'currentlyReading');
  }


  read = () => {
    return this.state.books.filter((book) => book.shelf === 'read');
  }

  wantToRead = () => {
    return this.state.books.filter((book) => book.shelf === 'wantToRead');
  }

  shelves = () => {
    return ['read', 'currentlyReading', 'wantToRead'];
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={ () => (
          < Search />
        )}/>
        <Route exact path='/' render={ () => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf
                  title='Currently Reading'
                  books={ this.currentlyReading() }
                />
                <Bookshelf
                  title='Want to Read'
                  books={ this.wantToRead() }
                />
                <Bookshelf
                  title='Read'
                  books={ this.read() }
                />
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a Book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
