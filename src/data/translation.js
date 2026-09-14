const translations = {
  'Test Material MR': {
    DE: 'Testmaterial MR',
    FR: 'Matériel de test MR',
    ES: 'Material de prueba MR',
    IT: 'Materiale di prova MR',
  },

  'Test Material': {
    DE: 'Testmaterial',
    FR: 'Matériel de test',
    ES: 'Material de prueba',
    IT: 'Materiale di prova',
  },

  'Raw material for Cement Factory': {
    DE: 'Rohmaterial für Zementfabrik',
    FR: 'Matière première pour cimenterie',
    ES: 'Materia prima para fábrica de cemento',
    IT: 'Materia prima per cementificio',
  },
}

export const translateDescription = (text, language) => {
  if (!text || !language) return ''

  const translation = translations[text.trim()]

  if (translation?.[language]) {
    return translation[language]
  }

  return `${text} (${language})`
}