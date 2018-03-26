import React, { Fragment } from 'react'
import { withRouteData, Head } from 'react-static'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Aside from '../components/Aside'
import Project from '../components/Project'

export default withRouteData(({ metadata, project, projects }) => (
  <Fragment>
    <Head><title>{`${project.title} @ ${metadata.title}`}</title></Head>
    <div className="container row row_inverse">
      <div className="col col_2third">
        <Header {...metadata} project={project} />
        <main className="row">
          <Project {...project} />
        </main>
      </div>
      <section className="col col_1third">
        <Aside {...metadata} projects={projects} />
      </section>
    </div>
    <Footer {...metadata} />
  </Fragment>
))
