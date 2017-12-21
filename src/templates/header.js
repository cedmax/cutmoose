import React from 'react';
import HtmlParagraph from '../components/html-paragraph';

export default ({ content: { title, description } }) => (
  <header>
    <h1>{title}</h1>
    <HtmlParagraph
      html={ description } />
  </header>
);