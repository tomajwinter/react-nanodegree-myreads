/**
 This course is not designed to teach Test Driven Development.
 Feel free to use this file to test your application, but it
 is not required.
**/

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { shallow } from 'enzyme';

describe('app', () => {
  let wrapper, welcome;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
  })

  describe('when search page is showing', () => {
    beforeEach(() => {
      wrapper.setState({ showSearchPage: true })
    });

    it('has the search bar', () => {
      const search = wrapper.find('.search-books')
      expect(search.exists()).toBeTruthy();
    });

    it('has a link to close the search', () => {
      const close = wrapper.find('.close-search')
      expect(close.exists()).toBeTruthy();
    })

    it('does not have the book list', () => {
      const bookList = wrapper.find('.list-books')
      expect(bookList.exists()).toBeFalsy();
    });
  });

  describe('when search page is not showing', () => {
    beforeEach(() => {
      wrapper.setState({ showSearchPage: false })
    });

    it('has the book list', () => {
      const search = wrapper.find('.list-books')
      expect(search.exists()).toBeTruthy();
    });

    it('does not have the search bar', () => {
      const search = wrapper.find('.search-books')
      expect(search.exists()).toBeFalsy();
    });

    it('renders with the correct header', () => {
      const header = wrapper.find('.list-books-title')
      expect(header.text()).toEqual('MyReads');
    });

    it('renders bookshelves with the expected titles', () => {
      const bookshelfTitles = wrapper.find('.bookshelf-title')
      expect(bookshelfTitles.length).toEqual(3)
      expect(bookshelfTitles.at(0).text()).toEqual('Currently Reading');
      expect(bookshelfTitles.at(1).text()).toEqual('Want to Read');
      expect(bookshelfTitles.at(2).text()).toEqual('Read');
    });

    it('has a link to open search', () => {
      const search = wrapper.find('.open-search')
      expect(search.text()).toEqual('Add a book');
    });
  });
})
