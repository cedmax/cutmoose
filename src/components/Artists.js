import React from 'react'
import { markdown } from '../helpers'

export default ({ name, role, presentation }) => (
  <section className="col col_half">
    <h4>{name}</h4>
    <em>({role})</em>
    <div dangerouslySetInnerHTML={markdown(presentation)} />
  </section>
)
