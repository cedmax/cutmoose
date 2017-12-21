import React from 'react';
import data from '../content/en-GB.json';
import Head from './templates/head';

export default () => (
  <html>
    <Head title={data.metadata.title} />
    <body>
      <div className="wrapper"></div>
    </body>
  </html>
)