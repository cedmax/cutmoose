import React from 'react'
import { markdown } from '../helpers'

export default ({ footnotes }) => (
  <footer dangerouslySetInnerHTML={markdown(footnotes)} />
)
