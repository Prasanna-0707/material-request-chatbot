import { useEffect, useState } from 'react'

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

const ProgressSidebar = ({
  currentStep = 1,
  onStepClick,
}) => {
  // =========================================
  // RECENT SUBMITTED REQUESTS
  // =========================================

  const [recentChats, setRecentChats] = useState([])

  const loadRecentChats = () => {
    try {
      const savedRequests = JSON.parse(
        localStorage.getItem('materialRequests') || '[]',
      )

      setRecentChats(savedRequests)
    } catch (error) {
      console.error('Failed to load recent requests:', error)
      setRecentChats([])
    }
  }

  useEffect(() => {
    // Load submitted requests when sidebar mounts
    loadRecentChats()

    // Refresh when a new request is submitted
    const handleRequestSubmitted = () => {
      loadRecentChats()
    }

    window.addEventListener(
      'materialRequestSubmitted',
      handleRequestSubmitted,
    )

    return () => {
      window.removeEventListener(
        'materialRequestSubmitted',
        handleRequestSubmitted,
      )
    }
  }, [])

  // =========================================
  // REQUEST TITLE
  // =========================================

  const getRequestTitle = (request) => {
    if (request.description?.trim()) {
      return request.description.trim()
    }

    if (request.materialType) {
      return `${request.materialType} Material Request`
    }

    return 'Material Request'
  }

  return (
    <aside className="sticky top-0 h-screen max-h-screen w-full overflow-y-auto border-r border-slate-200 bg-white md:w-60 md:max-w-60 md:shrink-0 lg:w-60 lg:max-w-60">
      <div className="px-5 py-8">

        {/* ========================================= */}
        {/* YOUR JOURNEY */}
        {/* ========================================= */}

        <div>
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Your Journey
            </p>

            <h2 className="mt-1 text-base font-semibold text-slate-900 sm:text-lg">
              Material Request
            </h2>
          </div>

          {/* ========================================= */}
          {/* MOBILE / SMALL TABLET JOURNEY */}
          {/* ========================================= */}

          <div className="overflow-x-auto pb-2 md:hidden">
            <div className="flex min-w-max items-start gap-5">
              {steps.map((step, index) => {
                const isCompleted = step.id < currentStep
                const isCurrent = step.id === currentStep
                const isClickable = isCompleted

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
                    <button
                      type="button"
                      disabled={!isClickable}
                      onClick={() => {
                        if (isClickable) {
                          onStepClick(step.id)
                        }
                      }}
                      aria-label={`Go to ${step.title}`}
                      className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition ${
                        isCompleted
                          ? 'cursor-pointer border-slate-900 bg-slate-900 text-white hover:bg-slate-800'
                          : isCurrent
                            ? 'cursor-default border-slate-900 bg-white text-slate-900'
                            : 'cursor-not-allowed border-slate-200 bg-white text-slate-400'
                      }`}
                    >
                      {isCompleted ? '✓' : step.id}
                    </button>

                    {/* Title */}
                    <button
                      type="button"
                      disabled={!isClickable}
                      onClick={() => {
                        if (isClickable) {
                          onStepClick(step.id)
                        }
                      }}
                      className={`mt-2 text-center text-xs font-semibold ${
                        isClickable
                          ? 'cursor-pointer text-slate-900 hover:text-slate-600'
                          : isCurrent
                            ? 'cursor-default text-slate-900'
                            : 'cursor-not-allowed text-slate-400'
                      }`}
                    >
                      {step.title}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ========================================= */}
          {/* DESKTOP / LAPTOP JOURNEY */}
          {/* ========================================= */}

          <div className="relative hidden md:block">

            {/* Vertical line */}
            <div className="absolute bottom-2 left-4 top-2 w-px bg-slate-200" />

            <div className="space-y-4">
              {steps.map((step) => {
                const isCompleted = step.id < currentStep
                const isCurrent = step.id === currentStep
                const isClickable = isCompleted

                return (
                  <div
                    key={step.id}
                    className="relative flex items-start gap-3"
                  >
                    {/* Indicator */}
                    <button
                      type="button"
                      disabled={!isClickable}
                      onClick={() => {
                        if (isClickable) {
                          onStepClick(step.id)
                        }
                      }}
                      aria-label={`Go to ${step.title}`}
                      className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold transition ${
                        isCompleted
                          ? 'cursor-pointer border-slate-900 bg-slate-900 text-white hover:bg-slate-800'
                          : isCurrent
                            ? 'cursor-default border-slate-900 bg-white text-slate-900'
                            : 'cursor-not-allowed border-slate-200 bg-white text-slate-400'
                      }`}
                    >
                      {isCompleted ? '✓' : step.id}
                    </button>

                    {/* Content */}
                    <div className="min-w-0 pt-0.5">
                      <button
                        type="button"
                        disabled={!isClickable}
                        onClick={() => {
                          if (isClickable) {
                            onStepClick(step.id)
                          }
                        }}
                        className={`text-left ${
                          isClickable
                            ? 'cursor-pointer'
                            : 'cursor-default'
                        }`}
                      >
                        <p
                          className={`text-sm font-semibold ${
                            isCurrent || isCompleted
                              ? 'text-slate-900'
                              : 'text-slate-400'
                          } ${
                            isClickable
                              ? 'transition-colors hover:text-slate-600'
                              : ''
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
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ========================================= */}
          {/* PROGRESS */}
          {/* ========================================= */}

          <div className="mt-6 border-t border-slate-200 pt-4">
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

        {/* ========================================= */}
        {/* RECENT CHATS */}
        {/* ========================================= */}

        <div className="mt-8 border-t border-slate-200 pt-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Recent Chats
          </p>

          {recentChats.length > 0 ? (
            <div className="space-y-1">
              {recentChats.map((request) => (
                <button
                  key={request.id}
                  type="button"
                  className="flex w-full items-center rounded-lg px-2 py-2 text-left text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                >
                  <span className="mr-2 shrink-0 text-slate-400">
                    💬
                  </span>

                  <span className="truncate">
                    {getRequestTitle(request)}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-2 py-2">
              <p className="text-xs leading-5 text-slate-400">
                No submitted requests yet.
              </p>
            </div>
          )}
        </div>

      </div>
    </aside>
  )
}

export default ProgressSidebar