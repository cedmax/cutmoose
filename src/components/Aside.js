import React from 'react'
import { Link } from 'gatsby'

export default ({ news, selected }) => (
  <section className="col col_1third">
    <a className="active" aria-current={selected === 'home'} href="/">
      <img className="logo" alt="Cut Moose" src="/logo.png" />
    </a>
    <aside>
      <h4>Projects</h4>
      {news.map(i => (
        <Link key={i.slug} to={`/${i.slug}`} aria-current={selected === i.slug}>
          {i.title}
        </Link>
      ))}
    </aside>
  </section>
)
