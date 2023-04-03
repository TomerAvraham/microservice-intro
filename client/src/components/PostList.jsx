import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Post from './Post'

const PostList = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get("http://localhost:4002/posts")
        .then(({data}) => setPosts(Object.values(data) || []))
    }, [])

  return (
    <div className='container' >
      <div className="row my-3" >
        {posts.map(post => (
                    <div className="col-sm my-3" key={post.id}>
                    <Post post={post} key={post.id} />
                    </div>
        ))}
        </div>

    </div>
  )
}

export default PostList


