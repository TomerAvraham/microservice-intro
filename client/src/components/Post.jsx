import React from 'react'
import CommentCreate from './CommentCreate'
import CommentList from './CommentList'

const Post = ({ post }) => {


  return (
    <div className="card" style={{width: '18rem'}}>
    <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <CommentList comments={post.comments} />
        <CommentCreate postId={post.id} />
    </div>
    </div>
  )
}

export default Post