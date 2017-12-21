import React from 'react';
import HtmlParagraph from '../components/html-paragraph';

export default ({ content: { footer } }) => (
  <footer>
    <HtmlParagraph
      className="no-margin show-fine-prints"
      html={ footer } />
  </footer>
);