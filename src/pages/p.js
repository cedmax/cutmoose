import React from 'react'
import PropTypes from 'prop-types'
import { Router } from '@reach/router'
import Post from '../templates/post'
import Rehype from 'rehype'

const rehype = new Rehype().data(`settings`, {
  fragment: true,
  space: 'html',
  emitParseErrors: true,
  verbose: false,
})

class PreviewPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      post: null,
    }
  }
  async componentDidMount() {
    if (this.props.uuid) {
      const post = await fetch(`/preview?id=${this.props.uuid}`).then(response =>
        response.json(),
      )

      const htmlAst = await rehype().parse(post.html)
      post.childHtmlRehype = { htmlAst: htmlAst }
      post.localImage = { publicURL: post.feature_image }

      if (post) {
        this.setState({ post })
      }
    }
  }
  render() {
    // when ghost answers back
    if (this.state.post !== null) {
      const data = {
        // match the expected structure
        ghostPost: {
          ...this.state.post,
          published_at: new Date().toISOString(),
        },
      }

      const location = this.props.location
      return <Post data={data} location={location} />
    }
    return null
  }
}

PreviewPage.propTypes = {
  uuid: PropTypes.string,
}

const Preview = () => (
  <Router>
    <PreviewPage path="/p/:uuid" />
  </Router>
)

export default Preview
