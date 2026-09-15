import { motion } from 'framer-motion'

const StartRequest = ({ onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <div className="mb-7 sm:mb-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
          Start
        </p>

        <h2 className="max-w-3xl text-xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
          Welcome to the Material Request Assistant
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
          I&apos;ll guide you through the material creation process
          and help determine the information required for your request.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
        <div className="flex items-start gap-4">
          {/* Assistant Icon */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
            M
          </div>

          {/* Message */}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900">
              Material Request Assistant
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
              Need to create a material?
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              I&apos;ll make it simple for you. Let&apos;s get started! 👋
            </p>

            <motion.button
              type="button"
              onClick={onStart}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md"
            >
              <span>Start Request</span>
              <span aria-hidden="true">→</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default StartRequest