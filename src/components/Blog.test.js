import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const blog = {
    title: 'test',
    author: 'testi testi',
    likes: 0,
    url: 'www.test.com',
    user: {
      username: 'Testi'
    }
  }

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        username='Testi'
      />
    )
  })

  test('at start only blog title and author are displayed', () => {
    const div = component.container.querySelector('.togglableContent')
    expect(div).toBe(null)

    // header contains title + author
    const div2 = component.container.querySelector('.header')
    expect(div2).not.toBe(null)
  })

  test('clicking title and author displays rest of the blog info', () => {

    const divButton = component.container.querySelector('.header')
    fireEvent.click(divButton)

    const divAtEnd = component.container.querySelector('.togglableContent')
    expect(divAtEnd).not.toBe(null)
  })
})