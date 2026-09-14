import { motion } from 'framer-motion'

const NavigationButtons = ({
  onBack,
  onContinue,
  continueLabel = 'Continue',
  backLabel = 'Back',
  showBack = true,
  disabled = false,
  continueType = 'button',
}) => {
  return (
    <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
      {/* Back Button */}
      <div>
        {showBack && (
          <motion.button
            type="button"
            onClick={onBack}
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <span aria-hidden="true">←</span>
            <span>{backLabel}</span>
          </motion.button>
        )}
      </div>

      {/* Continue Button */}
      <motion.button
        type={continueType}
        onClick={onContinue}
        disabled={disabled}
        whileHover={!disabled ? { y: -1 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition-all ${
          disabled
            ? 'cursor-not-allowed bg-slate-200 text-slate-400'
            : 'bg-slate-900 text-white shadow-sm hover:bg-slate-800 hover:shadow-md'
        }`}
      >
        <span>{continueLabel}</span>
        <span aria-hidden="true">→</span>
      </motion.button>
    </div>
  )
}

export default NavigationButtons