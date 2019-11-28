/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from "react";
import { Link } from "react-static";
import News from "./News";
import logo from "../content/images/logo.png";

export default ({ asideTitle: title, news, projects }) => (
  <Fragment>
    <Link to="/">
      <img className="logo" alt="Cut Moose" src={logo} />
    </Link>
    <aside>
      {!!news.length && <News news={news} />}

      <h4>{title}</h4>
      {projects.map(({ slug, title }) => (
        <Link key={slug} to={`/${slug}/`}>
          {title}
        </Link>
      ))}
    </aside>
  </Fragment>
);
