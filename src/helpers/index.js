import marked from "marked/index";

export function injectHTML(text) {
  return {
    __html: marked(text || '')
  };
}