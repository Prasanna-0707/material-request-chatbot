// Mock translations for the frontend POC.
//
// IMPORTANT:
// This is NOT a real translation engine.
// It demonstrates the intended UI behavior:
// English description → selected language description.
//
// Later, this function can be replaced with a real
// translation API without changing the Details page.

const translations = {
  'test material mr': {
    DE: 'Testmaterial MR',
    FR: 'Matériel de test MR',
    ES: 'Material de prueba MR',
    IT: 'Materiale di prova MR',
  },

  'test material': {
    DE: 'Testmaterial',
    FR: 'Matériel de test',
    ES: 'Material de prueba',
    IT: 'Materiale di prova',
  },

  'raw material for cement factory': {
    DE: 'Rohmaterial für Zementfabrik',
    FR: 'Matière première pour cimenterie',
    ES: 'Materia prima para fábrica de cemento',
    IT: 'Materia prima per cementificio',
  },

  'cement factory': {
    DE: 'Zementfabrik',
    FR: 'Usine de ciment',
    ES: 'Fábrica de cemento',
    IT: 'Fabbrica di cemento',
  },
}

export const translateDescription = (text, language) => {
  if (!text?.trim() || !language) {
    return ''
  }

  // Normalize the English description so that
  // capitalization does not matter.
  const normalizedText = text.trim().toLowerCase()

  const translation = translations[normalizedText]

  // Return the predefined translation when available.
  if (translation?.[language]) {
    return translation[language]
  }

  // POC fallback:
  // Keep the original text instead of pretending
  // that it was translated.
  return text.trim()
}