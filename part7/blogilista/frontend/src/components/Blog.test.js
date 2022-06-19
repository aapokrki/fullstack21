import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import Blog from "./Blog"
import userEvent from "@testing-library/user-event"

describe("<Blog />", () => {
  test("renders only title and author by default", () => {
    const blog = {
      title: "Kiljunvalmistuksen alkeet",
      author: "Marjatta Marjajuoma",
      url: "https://www.marjatanmehu.fi/",
      likes: 1000,
      user: "6295ec065d3f59eb5aec6737",
    }

    const { container } = render(<Blog blog={blog} />)

    const div = container.querySelector(".blog")
    expect(div).toHaveTextContent(
      "Kiljunvalmistuksen alkeet by Marjatta Marjajuoma"
    )

    // Only render title and author by default
    expect(div).not.toHaveTextContent("URL: https://www.marjatanmehu.fi/")
    expect(div).not.toHaveTextContent("Likes: 1000")
  })

  test("renders url and likes when view-button is pressed", async () => {
    const blog = {
      title: "Kiljunvalmistuksen alkeet",
      author: "Marjatta Marjajuoma",
      url: "https://www.marjatanmehu.fi/",
      likes: 1000,
      user: "6295ec065d3f59eb5aec6737",
    }
    // Render scene
    const { container } = render(<Blog blog={blog} />)
    const div = container.querySelector(".blog")

    // Create user and click view button
    const user = userEvent.setup()
    const viewButton = screen.getByText("view")
    await user.click(viewButton)

    // Expect blog to show more info than by default
    expect(div).toHaveTextContent("URL: https://www.marjatanmehu.fi/")
    expect(div).toHaveTextContent("Likes: 1000")
  })

  test("like button registers and add likes", async () => {
    const blog = {
      title: "Kiljunvalmistuksen alkeet",
      author: "Marjatta Marjajuoma",
      url: "https://www.marjatanmehu.fi/",
      likes: 1000,
      user: "6295ec065d3f59eb5aec6737",
    }
    // Render scene
    const mockHandler = jest.fn()

    render(<Blog blog={blog} addLike={mockHandler} />)

    // Create user and click view button
    const user = userEvent.setup()
    const viewButton = screen.getByText("view")
    await user.click(viewButton)

    // Like button clicked twice
    const likeButton = screen.getByText("like")
    await user.click(likeButton)
    await user.click(likeButton)

    //addLike called twice
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
