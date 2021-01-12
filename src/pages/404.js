import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'

const NotFoundPage = () => (
  <Layout news={[]}>
    <article className="post">
      <div className="inner" style={{ textAlign: 'center' }}>
        <h1 className="content-title">Error 404</h1>
        <section className="post-content">
          <p>
            Page not found
            <br /> <Link to="/">Go to the front page →</Link>
          </p>
        </section>
      </div>
    </article>
  </Layout>
)

export default NotFoundPage
