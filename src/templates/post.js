import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import MetaData from '../components/MetaData'
import PostBody from '../components/Post'

const Post = ({
  data: {
    post: { edges: [{ node: post }] } = {},
    news: { edges: news },
  },
  location,
}) => {
  return (
    <Fragment>
      <MetaData location={location} />
      <Layout selected={post.slug} news={news.map(({ node }) => node)}>
        <PostBody isPostPage post={post} />
      </Layout>
    </Fragment>
  )
}

export default Post

export const postQuery = graphql`
  query($slug: String!) {
    post: allGhostPost(filter: { slug: { eq: $slug } }) {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
    news: allGhostPost(sort: { order: DESC, fields: [published_at] }) {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
  }
`
