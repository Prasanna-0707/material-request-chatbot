import { motion } from 'framer-motion'
import { useState } from 'react'

const RequestSetupForm = ({
  requestorGid,
  requestorEmail,
  crType,
  countryOwner,
  mcmn,
  onCrTypeChange,
  onCountryChange,
  onMcmnChange,
}) => {
  const [countryOpen, setCountryOpen] = useState(false)

  const countries = [
    { name: 'India', code: 'IN' },
    { name: 'Germany', code: 'DE' },
    { name: 'United States', code: 'US' },
  ]

  const selectedCountry = countries.find(
    (country) => country.code === countryOwner,
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full"
    >
      {/* Page Header */}
      <div className="mb-7 sm:mb-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
          Request Setup
        </p>

        <h2 className="max-w-3xl text-xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
          Let&apos;s set up your material request
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
          Provide the basic information required to begin your material
          creation request.
        </p>
      </div>

      {/* Main Request Setup Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7">
        <div className="space-y-7">

          {/* ========================================= */}
          {/* REQUESTOR */}
          {/* ========================================= */}

          <div>
            <div className="mb-5">
              <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
                Requestor
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                These details are taken automatically from your login
                information.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {/* GID */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  GID
                </label>

                <div className="flex min-h-12 items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <span className="text-sm font-medium text-slate-700 sm:text-base">
                    {requestorGid}
                  </span>

                  <span className="ml-3 shrink-0 text-xs font-semibold text-slate-400">
                    Locked
                  </span>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Email address
                </label>

                <div className="flex min-h-12 items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <span className="truncate text-sm font-medium text-slate-700 sm:text-base">
                    {requestorEmail}
                  </span>

                  <span className="ml-3 shrink-0 text-xs font-semibold text-slate-400">
                    Locked
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-100" />

          {/* ========================================= */}
          {/* CR TYPE */}
          {/* ========================================= */}

          <div>
            <label
              htmlFor="cr-type"
              className="mb-2 block text-sm font-semibold text-slate-800"
            >
              CR – Type
            </label>

            <select
              id="cr-type"
              value={crType}
              onChange={(event) => onCrTypeChange(event.target.value)}
              className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100 sm:text-base"
            >
              <option value="">Select CR Type</option>

              <option value="CREATE – ZLDI – DE – TF">
                CREATE – ZLDI – DE – TF
              </option>
            </select>

            <p className="mt-2 text-xs leading-5 text-slate-400">
              Material creation request type.
            </p>
          </div>

          {/* ========================================= */}
          {/* COUNTRY OWNER */}
          {/* ========================================= */}

          <div className="relative">
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Country Owner
            </label>

            {/* Selected country */}
            <button
              type="button"
              onClick={() => setCountryOpen((previous) => !previous)}
              className="flex min-h-12 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-left outline-none transition hover:border-slate-300 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            >
              <span
                className={`text-sm sm:text-base ${
                  selectedCountry
                    ? 'font-medium text-slate-700'
                    : 'text-slate-400'
                }`}
              >
                {selectedCountry
                  ? selectedCountry.code
                  : 'Select country'}
              </span>

              <svg
                className={`h-4 w-4 text-slate-400 transition-transform ${
                  countryOpen ? 'rotate-180' : ''
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 111.08 1.04l-4.25-4.5a.75.75 0 01-.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Country dropdown */}
            {countryOpen && (
              <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => {
                      onCountryChange(country.code)
                      setCountryOpen(false)
                    }}
                    className={`flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-slate-50 ${
                      country.code === countryOwner
                        ? 'bg-slate-50'
                        : 'bg-white'
                    }`}
                  >
                    <span className="text-sm font-medium text-slate-700 sm:text-base">
                      {country.name}
                    </span>

                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {country.code}
                    </span>
                  </button>
                ))}
              </div>
            )}

            <p className="mt-2 text-xs leading-5 text-slate-400">
              Select the country responsible for this material.
            </p>
          </div>

          {/* ========================================= */}
          {/* MCMn */}
          {/* ========================================= */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              MCMn
            </label>

            <p className="mb-3 text-xs leading-5 text-slate-400">
              Select Yes or No for this request.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">

              {/* NO */}
              <button
                type="button"
                onClick={() => onMcmnChange('NO')}
                className={`flex min-h-14 items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                  mcmn === 'NO'
                    ? 'border-slate-900 bg-slate-50 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <span className="text-sm font-semibold text-slate-900 sm:text-base">
                  No
                </span>

                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                    mcmn === 'NO'
                      ? 'border-slate-900'
                      : 'border-slate-300'
                  }`}
                >
                  {mcmn === 'NO' && (
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-900" />
                  )}
                </span>
              </button>

              {/* YES */}
              <button
                type="button"
                onClick={() => onMcmnChange('YES')}
                className={`flex min-h-14 items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                  mcmn === 'YES'
                    ? 'border-slate-900 bg-slate-50 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <span className="text-sm font-semibold text-slate-900 sm:text-base">
                  Yes
                </span>

                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                    mcmn === 'YES'
                      ? 'border-slate-900'
                      : 'border-slate-300'
                  }`}
                >
                  {mcmn === 'YES' && (
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-900" />
                  )}
                </span>
              </button>

            </div>
          </div>

        </div>
      </div>
    </motion.div>
  )
}

export default RequestSetupForm