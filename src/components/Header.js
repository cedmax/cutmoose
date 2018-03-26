import React from 'react'
import { markdown } from '../helpers'

export default ({
  title,
  description,
  project: { title: projectTitle, description: projectDescription } = {}
}) => (
  <header>
    <h1>{title}</h1>
    {projectTitle && <h2>{projectTitle}</h2>}
    <div dangerouslySetInnerHTML={markdown(projectDescription || description)} />
  </header>
)
