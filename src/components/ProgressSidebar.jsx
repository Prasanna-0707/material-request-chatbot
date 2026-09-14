const steps = [
  {
    id: 1,
    title: 'Start',
    description: 'Request details',
  },
  {
    id: 2,
    title: 'Material',
    description: 'Material type',
  },
  {
    id: 3,
    title: 'Business',
    description: 'Business type',
  },
  {
    id: 4,
    title: 'Details',
    description: 'Material information',
  },
  {
    id: 5,
    title: 'Distribution',
    description: 'Sales & plant',
  },
  {
    id: 6,
    title: 'Review',
    description: 'Check your request',
  },
]

const ProgressSidebar = ({ currentStep = 1 }) => {
  return (
    <aside className="w-full md:w-64 md:max-w-64 md:shrink-0 lg:sticky lg:top-6 lg:w-64 lg:max-w-64 lg:self-start">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        {/* Heading */}
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Your Journey
          </p>

          <h2 className="mt-1 text-base font-semibold text-slate-900 sm:text-lg">
            Material Request
          </h2>
        </div>

        {/* Mobile / Small Tablet Journey */}
        <div className="overflow-x-auto pb-2 md:hidden">
          <div className="flex min-w-max items-start gap-5">
            {steps.map((step, index) => {
              const isCompleted = step.id < currentStep
              const isCurrent = step.id === currentStep

              return (
                <div
                  key={step.id}
                  className="relative flex min-w-20 flex-col items-center"
                >
                  {/* Connector */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-1/2 top-4 h-px w-full bg-slate-200" />
                  )}

                  {/* Indicator */}
                  <div
                    className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition ${
                      isCompleted
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : isCurrent
                          ? 'border-slate-900 bg-white text-slate-900'
                          : 'border-slate-200 bg-white text-slate-400'
                    }`}
                  >
                    {isCompleted ? '✓' : step.id}
                  </div>

                  {/* Title */}
                  <p
                    className={`mt-2 text-center text-xs font-semibold ${
                      isCurrent || isCompleted
                        ? 'text-slate-900'
                        : 'text-slate-400'
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Desktop / Laptop Journey */}
        <div className="relative hidden md:block">
          {/* Vertical line */}
          <div className="absolute bottom-2 left-4 top-2 w-px bg-slate-200" />

          <div className="space-y-4">
            {steps.map((step) => {
              const isCompleted = step.id < currentStep
              const isCurrent = step.id === currentStep

              return (
                <div
                  key={step.id}
                  className="relative flex items-start gap-3"
                >
                  {/* Indicator */}
                  <div
                    className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold transition ${
                      isCompleted
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : isCurrent
                          ? 'border-slate-900 bg-white text-slate-900'
                          : 'border-slate-200 bg-white text-slate-400'
                    }`}
                  >
                    {isCompleted ? '✓' : step.id}
                  </div>

                  {/* Content */}
                  <div className="min-w-0 pt-0.5">
                    <p
                      className={`text-sm font-semibold ${
                        isCurrent || isCompleted
                          ? 'text-slate-900'
                          : 'text-slate-400'
                      }`}
                    >
                      {step.title}
                    </p>

                    <p
                      className={`mt-0.5 text-xs leading-5 ${
                        isCurrent
                          ? 'text-slate-500'
                          : 'text-slate-400'
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Progress */}
        <div className="mt-6 border-t border-slate-100 pt-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              Progress
            </span>

            <span className="text-xs font-semibold text-slate-700">
              {currentStep} / {steps.length}
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-slate-900 transition-all duration-500"
              style={{
                width: `${(currentStep / steps.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </aside>
  )
}

export default ProgressSidebar