import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import BlogForm from "./BlogForm"
import userEvent from "@testing-library/user-event"

test("<CreateBlog /> updates parent state and calls onSubmit", async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const titleInput = container.querySelector("#title-input")
  const authorInput = container.querySelector("#author-input")
  const urlInput = container.querySelector("#url-input")

  const sendButton = screen.getByText("add blog")

  await user.type(titleInput, "testing a titleInput")
  await user.type(authorInput, "testing a authorInput")
  await user.type(urlInput, "testing a urlInput")

  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe("testing a titleInput")
  expect(createBlog.mock.calls[0][0].author).toBe("testing a authorInput")
  expect(createBlog.mock.calls[0][0].url).toBe("testing a urlInput")
})
