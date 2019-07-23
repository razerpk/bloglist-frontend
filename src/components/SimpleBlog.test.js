import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test.skip('renders title, author and likes', () => {
  const blog = {
    title: 'test',
    author: 'Matti Meikäläinen',
    likes: 12
  }
  const component = render(
    <SimpleBlog blog={blog}/>
  )

  expect(component.container).toHaveTextContent(
    'test Matti Meikäläinen'
  )
  expect(component.container).toHaveTextContent('12')
})

test.skip('clicking the button calls event handler twice', () => {
  const blog = {
    title: 'test',
    author: 'Matti Meikäläinen',
    likes: 12
  }
  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler}/>
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})