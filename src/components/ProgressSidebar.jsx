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


// Temporary demo data
// Later this will come from MongoDB
const recentChats = [
  {
    id: 1,
    title: 'Imaging Material',
    date: 'Sep 15, 2026',
  },
  {
    id: 2,
    title: 'Hardware Request',
    date: 'Sep 14, 2026',
  },
  {
    id: 3,
    title: 'Packaging Material',
    date: 'Sep 12, 2026',
  },
  {
    id: 4,
    title: 'In-Vitro Material',
    date: 'Sep 10, 2026',
  },
  {
    id: 5,
    title: 'Service Material',
    date: 'Sep 08, 2026',
  },
  {
    id: 6,
    title: 'Local Material Request',
    date: 'Sep 05, 2026',
  },
  {
    id: 7,
    title: 'Hardware Creation',
    date: 'Sep 03, 2026',
  },
  {
    id: 8,
    title: 'Packaging Request',
    date: 'Sep 01, 2026',
  },
  {
    id: 9,
    title: 'Material Creation Request',
    date: 'Aug 29, 2026',
  },
  {
    id: 10,
    title: 'New Sales Material',
    date: 'Aug 27, 2026',
  },
]


const ProgressSidebar = ({ currentStep = 1 }) => {
  return (
    <aside
      className="
        relative
        flex
        h-screen
        w-full
        shrink-0
        flex-col
        border-r
        border-slate-200
        bg-white

        md:sticky
        md:top-0
        md:w-72
        md:max-w-72
      "
    >

      {/* ========================================= */}
      {/* LOGO / BRAND */}
      {/* ========================================= */}

      <div
        className="
          shrink-0
          border-b
          border-slate-100
          px-6
          py-5
        "
      >
        <div className="flex items-center gap-3">

          {/* Logo */}
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-slate-900
              text-sm
              font-bold
              text-white
            "
          >
            M
          </div>


          {/* Brand Text */}
          <div className="min-w-0">

            <h1
              className="
                truncate
                text-base
                font-semibold
                text-slate-900
              "
            >
              Material Request
            </h1>

            <p
              className="
                truncate
                text-xs
                text-slate-500
              "
            >
              Guided Request Assistant
            </p>

          </div>

        </div>
      </div>


      {/* ========================================= */}
      {/* SIDEBAR CONTENT */}
      {/* ========================================= */}

      <div
        className="
          min-h-0
          flex-1
          overflow-y-auto
          px-4
          py-8
        "
      >

        {/* ========================================= */}
        {/* YOUR JOURNEY */}
        {/* ========================================= */}

        <section>

          {/* Journey Heading */}

          <div className="mb-6 px-2">

            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-slate-400
              "
            >
              Your Journey
            </p>

            <h2
              className="
                mt-1
                text-base
                font-semibold
                text-slate-900
              "
            >
              Material Request
            </h2>

          </div>


          {/* ========================================= */}
          {/* MOBILE JOURNEY */}
          {/* ========================================= */}

          <div className="overflow-x-auto pb-3 md:hidden">

            <div className="flex min-w-max items-start gap-5">

              {steps.map((step, index) => {

                const isCompleted = step.id < currentStep
                const isCurrent = step.id === currentStep

                return (
                  <div
                    key={step.id}
                    className="
                      relative
                      flex
                      min-w-20
                      flex-col
                      items-center
                    "
                  >

                    {/* Connector */}

                    {index < steps.length - 1 && (
                      <div
                        className="
                          absolute
                          left-1/2
                          top-4
                          h-px
                          w-full
                          bg-slate-200
                        "
                      />
                    )}


                    {/* Indicator */}

                    <div
                      className={`
                        relative
                        z-10
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        border-2
                        bg-white
                        text-xs
                        font-semibold
                        transition

                        ${
                          isCompleted
                            ? 'border-slate-900 bg-slate-900 text-white'
                            : isCurrent
                              ? 'border-slate-900 text-slate-900'
                              : 'border-slate-200 text-slate-400'
                        }
                      `}
                    >
                      {isCompleted ? '✓' : step.id}
                    </div>


                    {/* Title */}

                    <p
                      className={`
                        mt-2
                        text-center
                        text-xs
                        font-semibold

                        ${
                          isCurrent || isCompleted
                            ? 'text-slate-900'
                            : 'text-slate-400'
                        }
                      `}
                    >
                      {step.title}
                    </p>

                  </div>
                )
              })}

            </div>

          </div>


          {/* ========================================= */}
          {/* DESKTOP JOURNEY */}
          {/* ========================================= */}

          <div className="relative hidden md:block">

            {/* Vertical connector */}

            <div
              className="
                absolute
                bottom-5
                left-[21px]
                top-5
                w-px
                bg-slate-200
              "
            />


            <div className="space-y-1">

              {steps.map((step) => {

                const isCompleted = step.id < currentStep
                const isCurrent = step.id === currentStep

                return (
                  <div
                    key={step.id}
                    className="
                      relative
                      flex
                      items-start
                      gap-3
                      rounded-xl
                      px-2
                      py-2.5
                    "
                  >

                    {/* Indicator */}

                    <div
                      className={`
                        relative
                        z-10
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border-2
                        bg-white
                        text-xs
                        font-semibold
                        transition

                        ${
                          isCompleted
                            ? 'border-slate-900 bg-slate-900 text-white'
                            : isCurrent
                              ? 'border-slate-900 text-slate-900'
                              : 'border-slate-200 text-slate-400'
                        }
                      `}
                    >
                      {isCompleted ? '✓' : step.id}
                    </div>


                    {/* Step Information */}

                    <div className="min-w-0 pt-0.5">

                      <p
                        className={`
                          text-sm
                          font-semibold

                          ${
                            isCurrent || isCompleted
                              ? 'text-slate-900'
                              : 'text-slate-400'
                          }
                        `}
                      >
                        {step.title}
                      </p>


                      <p
                        className={`
                          mt-0.5
                          text-xs
                          leading-5

                          ${
                            isCurrent
                              ? 'text-slate-500'
                              : 'text-slate-400'
                          }
                        `}
                      >
                        {step.description}
                      </p>

                    </div>

                  </div>
                )
              })}

            </div>

          </div>


          {/* ========================================= */}
          {/* PROGRESS */}
          {/* ========================================= */}

          <div
            className="
              mt-6
              border-t
              border-slate-100
              px-2
              pt-5
            "
          >

            <div
              className="
                mb-2
                flex
                items-center
                justify-between
              "
            >

              <span
                className="
                  text-xs
                  font-medium
                  text-slate-500
                "
              >
                Progress
              </span>


              <span
                className="
                  text-xs
                  font-semibold
                  text-slate-700
                "
              >
                {currentStep} / {steps.length}
              </span>

            </div>


            {/* Progress Bar */}

            <div
              className="
                h-1.5
                overflow-hidden
                rounded-full
                bg-slate-100
              "
            >

              <div
                className="
                  h-full
                  rounded-full
                  bg-slate-900
                  transition-all
                  duration-500
                "
                style={{
                  width: `${(currentStep / steps.length) * 100}%`,
                }}
              />

            </div>

          </div>

        </section>


        {/* ========================================= */}
        {/* RECENT CHATS */}
        {/* ========================================= */}

        <section
          className="
            mt-7
            border-t
            border-slate-100
            pt-5
          "
        >

          {/* Recent Chats Heading */}

          <div className="mb-3 px-2">

            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-slate-400
              "
            >
              Recent Chats
            </p>

          </div>


          {/* ========================================= */}
          {/* RECENT CHAT SCROLL AREA */}
          {/* ========================================= */}

          <div
            className="
              max-h-72
              overflow-y-auto
              pr-1
            "
          >

            <div className="space-y-1">

              {recentChats.map((chat) => (

                <button
                  key={chat.id}
                  type="button"
                  className="
                    w-full
                    rounded-xl
                    px-3
                    py-2.5
                    text-left
                    transition
                    hover:bg-slate-50
                  "
                >

                  {/* Chat Title */}

                  <p
                    className="
                      truncate
                      text-sm
                      font-medium
                      text-slate-800
                    "
                  >
                    {chat.title}
                  </p>


                  {/* Chat Date */}

                  <p
                    className="
                      mt-0.5
                      text-xs
                      text-slate-400
                    "
                  >
                    {chat.date}
                  </p>

                </button>

              ))}

            </div>

          </div>

        </section>

      </div>

    </aside>
  )
}


export default ProgressSidebar