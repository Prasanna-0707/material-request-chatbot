const Header = () => {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex min-h-16 w-full max-w-screen-2xl items-center justify-between gap-4 px-4 py-3 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Brand */}
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-900 sm:h-10 sm:w-10">
            <span className="text-sm font-bold text-white">M</span>
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold tracking-tight text-slate-900 sm:text-base">
              Material Request
            </h1>

            <p className="truncate text-xs text-slate-500 sm:text-sm">
              Guided Request Assistant
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <button
            type="button"
            className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
          >
            Help
          </button>

          <div className="hidden h-8 w-px bg-slate-200 sm:block" />

          <div className="hidden text-right sm:block">
            <p className="text-xs text-slate-400">
              Request
            </p>

            <p className="text-sm font-medium text-slate-700">
              New Request
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header