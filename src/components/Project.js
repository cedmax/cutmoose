/* eslint-disable import/no-dynamic-require */
import React from 'react'
import { markdown } from '../helpers'

export default ({ image, notes }) => (
  <section className="col">
    <figure>
      <img
        width="100%"
        src={require(`../content/images/${image.file.fileName}`)}
        alt={image.description}
      />
      <figcaption>{image.title}</figcaption>
    </figure>
    <div dangerouslySetInnerHTML={markdown(notes)} />
  </section>
)

