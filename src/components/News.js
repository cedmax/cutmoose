import React, { Fragment } from "react";
import { Link } from "react-static";

export default ({ news }) => (
  <Fragment>
    <h4>News</h4>
    {news.map(({ slug, title }) => (
      <Link key={slug} to={`/news/${slug}/`}>
        {title}
      </Link>
    ))}
    <br />
  </Fragment>
);
