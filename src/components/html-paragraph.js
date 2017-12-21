import React from 'react';
import { injectHTML } from '../helpers';

export default ({ html, className }) => (
  <p
    className={className}
    dangerouslySetInnerHTML={ injectHTML(html) } />
);