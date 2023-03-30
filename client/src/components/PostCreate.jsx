import React, { useRef} from 'react'
import axios from "axios"

const PostCreate = () => {
    const inputRef = useRef()

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(inputRef.current.value)
        axios.post("http://localhost:4000/posts", {
            title: inputRef.current.value
        })
        inputRef.current.value = ""
    }


  return (
    <form onSubmit={handleSubmit} className="my-5" >
        <h1>Create Post</h1>
  <div className="mb-3">
    <label htmlFor="post-title" className="form-label">Title</label>
    <input name="title" ref={inputRef} className="form-control" id="post-title" />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
  )
}

export default PostCreate