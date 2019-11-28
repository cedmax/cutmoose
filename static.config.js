import React, { Component } from "react";

export default {
  getSiteData: () => ({
    title: "React Static"
  }),
  getRoutes: async () => {
    const {
      projects,
      metadata: metadataArr,
      artists,
      news
    } = require("./src/content/en-GB.json");
    const metadata = metadataArr[0];

    return [
      {
        path: "/",
        component: "src/containers/Home",
        getData: () => ({
          metadata,
          news,
          artists,
          projects
        }),
        children: [
          ...projects.map(project => ({
            path: `/${project.slug}/`,
            component: "src/containers/Show",
            getData: () => ({
              metadata,
              news,
              projects,
              project
            })
          })),
          ...news.map(project => ({
            path: `/news/${project.slug}/`,
            component: "src/containers/Show",
            getData: () => ({
              metadata,
              news,
              projects,
              project
            })
          }))
        ]
      },
      {
        is404: true,
        component: "src/containers/404"
      }
    ];
  },
  Document: class CustomHtml extends Component {
    render() {
      const { Html, Head, Body, children } = this.props;

      return (
        <Html>
          <Head>
            <link
              href="https://fonts.googleapis.com/css?family=Oswald:200,300,500"
              rel="stylesheet"
            />
            <meta charSet="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          <Body>{children}</Body>
        </Html>
      );
    }
  }
};
