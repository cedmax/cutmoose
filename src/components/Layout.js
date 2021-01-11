import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Footer from './Footer'
import Aside from './Aside'

import '../styles/style.scss'

const DefaultLayout = ({ data, children, news, selected }) => {
  const site = data.allGhostSettings.edges[0].node

  return (
    <Fragment>
      <Helmet>
        <html lang={site.lang} />
        <body />
      </Helmet>

      <div className="container row row_inverse">
        <div className="col col_2third">{children}</div>
        <Aside news={news} selected={selected} />
      </div>
      <Footer />
    </Fragment>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
  bodyClass: PropTypes.string,
  isHome: PropTypes.bool,
  data: PropTypes.shape({
    file: PropTypes.object,
    allGhostSettings: PropTypes.object.isRequired,
  }).isRequired,
}

const DefaultLayoutSettingsQuery = props => (
  <StaticQuery
    query={graphql`
      query GhostSettings {
        allGhostSettings {
          edges {
            node {
              ...GhostSettingsFields
            }
          }
        }
      }
    `}
    render={data => <DefaultLayout data={data} {...props} />}
  />
)

export default DefaultLayoutSettingsQuery
