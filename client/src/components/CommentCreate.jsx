import axios from 'axios'
import React, { useRef } from 'react'

const CommentCreate = ({ postId }) => {
  const inputRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content: inputRef.current.value
    })
    inputRef.current.value = ""
  }

  return (
    <form className="mt-1" onSubmit={handleSubmit} >
    <div className="mb-3">
    <label htmlFor="comment-content" className="form-label">Comment</label>
    <input ref={inputRef}  className="form-control" id="comment-content" />
    </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>  )
}

export default CommentCreate