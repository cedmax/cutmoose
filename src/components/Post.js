import React from 'react'

const Post = ({ post, isPostPage }) => {
  return (
    <>
      <header>
        <h1>Cut Moose</h1>
        {isPostPage && <h2>{post.title}</h2>}
        <p>{post.excerpt}</p>
      </header>
      <main dangerouslySetInnerHTML={{ __html: post.html }} />
    </>
  )
}

export default Post
