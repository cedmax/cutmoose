import React, { Fragment } from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import MetaData from '../components/MetaData'
import Post from '../components/Post'

const Index = ({
  data: {
    home: {
      edges: [{ node: home }],
    },
    news: { edges: news },
  },
  location,
}) => {
  return (
    <Fragment>
      <MetaData location={location} />
      <Layout selected="home" news={news.map(({ node }) => node)}>
        <Post post={home} />
      </Layout>
    </Fragment>
  )
}

export default Index

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
  query($limit: Int!, $skip: Int!) {
    home: allGhostPage(filter: { slug: { eq: "home" } }) {
      edges {
        node {
          ...GhostPageFields
        }
      }
    }
    news: allGhostPost(
      sort: { order: DESC, fields: [published_at] }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
  }
`
