import React from 'react'

const CommentList = ({ comments = [] }) => {
  return (
    <ul className="list-group mx-5">
        {comments.map(comment => (
              <li key={comment.id}>{comment.content}</li>
        ))}
    </ul>
  )
}

export default CommentList