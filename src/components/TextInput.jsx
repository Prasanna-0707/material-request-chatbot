import { motion } from 'framer-motion'

const TextInput = ({
  label,
  value,
  onChange,
  placeholder = '',
  maxLength,
  helperText,
}) => {
  const characterCount = value.length

  return (
    <div className="w-full">
      {/* Label */}
      <div className="mb-2 flex items-end justify-between gap-4">
        <label className="text-sm font-semibold text-slate-900 sm:text-base">
          {label}
        </label>

        {maxLength && (
          <span
            className={`shrink-0 text-xs font-medium ${
              characterCount >= maxLength
                ? 'text-slate-900'
                : 'text-slate-400'
            }`}
          >
            {characterCount} / {maxLength}
          </span>
        )}
      </div>

      {/* Input */}
      <motion.input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        whileFocus={{ scale: 1.005 }}
        transition={{ duration: 0.15 }}
        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 sm:h-14 sm:px-5 sm:text-base"
      />

      {/* Helper */}
      {helperText && (
        <p className="mt-2 text-xs leading-5 text-slate-400">
          {helperText}
        </p>
      )}
    </div>
  )
}

export default TextInput