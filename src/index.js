import xmlToJson from './xml-to-json'

export default function dtToText(xml) {
  const json = xmlToJson(xml)
  const items = json.pagedata[0]
  let output = ''
  const walk = (element, ident = '') => {
    const innerIdent = `${ident}  `
    const action = element.pyActionName
    const hasChild = element.pyProperties
      && element.pyProperties[0]
      && element.pyProperties[0].rowdata

    if (action) {
      output += `${ident}${action} `
      switch (action) {
      case 'UPDATE_PAGE':
        output += `${element.pyPropertiesValue} ${element.pyRelationNameUpdatepage}`
        break
      case 'SET':
        output += `${element.pyPropertiesName} TO ${element.pyPropertiesValue}`
        break
      case 'APPLY_MODEL':
      case 'COMMENT':
      case 'WHEN':
        output += element.pyPropertiesName
        break
      }
    }
    output += '\n'
    if (hasChild) {
      element.pyProperties[0].rowdata.forEach(child => {
        return walk(child, innerIdent)
      })
    }
  }
  walk(items)
  return output
}