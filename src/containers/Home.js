import React, { Fragment } from 'react'
import { withRouteData, Head } from 'react-static'
import Artists from '../components/Artists'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Aside from '../components/Aside'

export default withRouteData(({ artists, metadata, projects }) => (
  <Fragment>
    <Head><title>{metadata.title}</title></Head>
    <div className="container row row_inverse">
      <div className="col col_2third">
        <Header {...metadata} />
        <main className="row">
          {artists.map(artist => <Artists key={artist.name} {...artist} />)}
        </main>
      </div>
      <section className="col col_1third">
        <Aside {...metadata} projects={projects} />
      </section>
    </div>
    <Footer {...metadata} />
  </Fragment>
))
