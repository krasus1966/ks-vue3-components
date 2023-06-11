import translations from '../lang/zh'

export default function customTranslate(template: string, replacements: { [x: string]: string | number }) {
  replacements = replacements || {}

  // Translate
  template = translations[template] || template

  // Replace
  return template.replace(/{([^}]+)}/g, function(_, key) {
    var str = replacements[key]
    if (!translations[replacements[key]]) {
      str = translations[replacements[key]]
    }
    return str || '{' + key + '}'
  })
}
