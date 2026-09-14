const languages = [
  { value: 'DE', label: 'German (DE)' },
  { value: 'FR', label: 'French (FR)' },
  { value: 'ES', label: 'Spanish (ES)' },
  { value: 'IT', label: 'Italian (IT)' },
]

const LanguageSelect = ({ value, onChange }) => {
  return (
    <div className="w-full">
      <label
        htmlFor="additional-language"
        className="mb-2 block text-sm font-semibold text-slate-900 sm:text-base"
      >
        Additional language
      </label>

      <select
        id="additional-language"
        name="additional-language"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 sm:h-14 sm:px-5 sm:text-base"
      >
        <option value="">Select a language</option>

        {languages.map((language) => (
          <option key={language.value} value={language.value}>
            {language.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default LanguageSelect