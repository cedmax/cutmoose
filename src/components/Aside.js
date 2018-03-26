/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react'
import { Link } from 'react-static'
import logo from '../content/images/logo.png'

export default ({ asideTitle: title, projects }) => (
  <Fragment>
    <Link to="/">
      <img className="logo" alt="Cut Moose" src={logo} />
    </Link>
    <aside>
      <h4>{title}</h4>
      {projects.map(({ slug, title }) => (
        <Link key={slug} to={`/${slug}/`}>
          {title}
        </Link>
      ))}
    </aside>
  </Fragment>
)
