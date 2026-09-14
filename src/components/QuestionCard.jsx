import { motion } from 'framer-motion'

const QuestionCard = ({
  question,
  description,
  options = [],
  selectedValue,
  onSelect,
  multiple = false,
}) => {
  const isOptionSelected = (value) => {
    if (multiple) {
      return selectedValue?.includes(value)
    }

    return selectedValue === value
  }

  const handleSelect = (value) => {
    if (multiple) {
      const currentValues = selectedValue || []

      if (currentValues.includes(value)) {
        onSelect(currentValues.filter((item) => item !== value))
      } else {
        onSelect([...currentValues, value])
      }

      return
    }

    onSelect(value)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {/* Question Header */}
      <div className="mb-7 sm:mb-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
          Question
        </p>

        <h2 className="max-w-3xl text-2xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
          {question}
        </h2>

        {description && (
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            {description}
          </p>
        )}
      </div>

      {/* Options */}
      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const isSelected = isOptionSelected(option.value)

          return (
            <motion.button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className={`group relative min-h-24 rounded-xl border p-5 text-left transition-all duration-200 sm:min-h-28 sm:p-6 ${
                isSelected
                  ? 'border-slate-900 bg-slate-900 text-white shadow-md'
                  : 'border-slate-200 bg-white text-slate-900 shadow-sm hover:border-slate-400 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p
                    className={`text-base font-semibold sm:text-lg ${
                      isSelected
                        ? 'text-white'
                        : 'text-slate-900'
                    }`}
                  >
                    {option.label}
                  </p>

                  {option.description && (
                    <p
                      className={`mt-1 text-xs leading-5 sm:text-sm ${
                        isSelected
                          ? 'text-slate-300'
                          : 'text-slate-500'
                      }`}
                    >
                      {option.description}
                    </p>
                  )}
                </div>

                {/* Selection Indicator */}
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition ${
                    isSelected
                      ? 'border-white bg-white text-slate-900'
                      : 'border-slate-300 text-transparent group-hover:border-slate-500'
                  }`}
                >
                  ✓
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Multiple Selection Hint */}
      {multiple && (
        <p className="mt-4 text-xs text-slate-400">
          You can select more than one option.
        </p>
      )}
    </motion.div>
  )
}

export default QuestionCard