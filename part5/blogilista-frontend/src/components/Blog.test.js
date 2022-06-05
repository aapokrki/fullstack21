import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  test('renders only title and author by default', () => {
    const blog = {
      title: 'Kiljunvalmistuksen alkeet',
      author: 'Marjatta Marjajuoma',
      url: 'https://www.marjatanmehu.fi/',
      likes: 1000,
      user: '6295ec065d3f59eb5aec6737'

    }

    const { container } = render(<Blog blog={blog} />)

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(
      'Kiljunvalmistuksen alkeet by Marjatta Marjajuoma'
    )
    
    // Only render title and author by default
    expect(div).not.toHaveTextContent(
      'URL: https://www.marjatanmehu.fi/'
    )
    expect(div).not.toHaveTextContent(
      'Likes: 1000'
    )
  })
})
