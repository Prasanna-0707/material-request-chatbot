import { motion } from 'framer-motion'
import { useState } from 'react'

import {
  materialTypeOptions,
  materialTypeDerivedData,
} from '../data/questions'

const MaterialTypeSelector = ({
  selectedValue,
  onSelect,
}) => {
  const [showAllFields, setShowAllFields] = useState(false)

  const selectedMaterialData =
    selectedValue && materialTypeDerivedData[selectedValue]
      ? materialTypeDerivedData[selectedValue]
      : null

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
          What type of material do you want to create?
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
          Select a material type to see the values that are automatically
          derived for your request.
        </p>
      </div>

      {/* Material Type Dropdown */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7">
        <label
          htmlFor="material-type"
          className="mb-2 block text-sm font-semibold text-slate-800"
        >
          Material Type
        </label>

        <select
          id="material-type"
          value={selectedValue}
          onChange={(event) => {
            onSelect(event.target.value)
            setShowAllFields(false)
          }}
          className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100 sm:text-base"
        >
          <option value="">Select material type</option>

          {materialTypeOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        {!selectedMaterialData && (
          <p className="mt-3 text-xs leading-5 text-slate-400">
            Your selected material type will determine the system-defined
            values shown below.
          </p>
        )}
      </div>

      {/* Auto-Derived Values */}
      {selectedMaterialData && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          {/* Section Header */}
          <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Auto-Derived
                </p>

                <h3 className="mt-1 text-base font-semibold text-slate-900 sm:text-lg">
                  System-defined values for {selectedValue}
                </h3>
              </div>

              <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                Derived from Material Type
              </span>
            </div>
          </div>

          {/* Key Fields */}
          {!showAllFields && (
            <div className="p-5 sm:p-6">
              <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {selectedMaterialData.keyFields.map(
                  (item) => (
                    <div
                      key={item.field}
                      className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3 last:border-b-0"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-700">
                          {item.label}
                        </p>
                      </div>

                      <span className="shrink-0 text-sm font-semibold text-slate-900">
                        {item.value}
                      </span>
                    </div>
                  ),
                )}
              </div>

              {/* View All Fields */}
              <button
                type="button"
                onClick={() => setShowAllFields(true)}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-950"
              >
                <span>View all SAP fields</span>

                <span
                  aria-hidden="true"
                  className="text-base"
                >
                  +
                </span>
              </button>
            </div>
          )}

          {/* All SAP Fields */}
          {showAllFields && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="p-5 sm:p-6"
            >
              <div className="mb-4">
                <p className="text-sm font-semibold text-slate-900">
                  SAP Technical Fields
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  These values are automatically derived for the selected
                  material type.
                </p>
              </div>

              <div className="overflow-hidden rounded-xl border border-slate-200">
                <div className="grid grid-cols-[1fr_auto] border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  <span>SAP Field</span>
                  <span>Value</span>
                </div>

                <div>
                  {selectedMaterialData.sapFields.map(
                    (item, index) => (
                      <div
                        key={`${item.field}-${index}`}
                        className="grid grid-cols-[1fr_auto] gap-4 border-b border-slate-100 px-4 py-3 last:border-b-0"
                      >
                        <span className="text-sm font-medium text-slate-600">
                          {item.field}
                        </span>

                        <span className="text-right text-sm font-semibold text-slate-900">
                          {item.value}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Hide Fields */}
              <button
                type="button"
                onClick={() => setShowAllFields(false)}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-950"
              >
                <span>Hide SAP fields</span>

                <span
                  aria-hidden="true"
                  className="text-base"
                >
                  −
                </span>
              </button>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}

export default MaterialTypeSelector