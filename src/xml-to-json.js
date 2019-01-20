export default function xmlToJson(str) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(str, 'application/xml')
  const o = {}
  const walk = (element, o) => {
    const tag = element.tagName
    const length = element.children.length
    if (length) {
      const inO = {}
      if (!o[tag]) {
        o[tag] = []
      }
      o[tag].push(inO)
      for (let i = 0; i < length; i++) {
        walk(element.children[i], inO)
      }
      return
    }
    o[tag] = element.innerHTML
  }
  walk(doc.children[0], o)
  return o
}