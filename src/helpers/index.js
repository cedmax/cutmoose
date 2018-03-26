import marked from 'marked/index'

export function markdown (text) {
  return {
    __html:
      text instanceof Array
        ? marked(text.join('\n\n') || '')
        : marked(text || '')
  }
}
