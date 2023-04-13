import React from 'react'

const CommentList = ({ comments = [] }) => {

  const renderComments = comments.map(comment => {
    let content;

    if (comment.status === "approved") {
      content = comment.content
    }

    if (comment.status === "rejected") {
      content = "This comment is rejected"
    }

    if (comment.status === "pending") {
      content = "This comment is awaiting moderation"
    }


    return <li key={comment.id}>{content}</li>
  } 
  )



  return (
    <ul className="list-group mx-5">
        {renderComments}
    </ul>
  )
}

export default CommentList