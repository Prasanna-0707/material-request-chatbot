const RequestSummary = ({
  currentStep,
  materialType,
  businessTypes,
  description,
  additionalLanguage,
  selectedSalesOrganizations,
  distributionChain,
}) => {
  const hasValue = (value) => {
    if (Array.isArray(value)) {
      return value.length > 0
    }

    return Boolean(value)
  }

  const getValue = (value, fallback = 'Not selected') => {
    if (Array.isArray(value)) {
      return value.length > 0 ? value.join(', ') : fallback
    }

    return value || fallback
  }

  return (
    <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Current Request
          </p>
          <h3 className="mt-1 text-base font-semibold text-slate-900 sm:text-lg">
            Request Summary
          </h3>
        </div>

        <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
          Step {currentStep} of 6
        </span>
      </div>

      <div className="space-y-3">
        {hasValue(materialType) && (
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3">
            <span className="text-sm text-slate-500">
              Material Type
            </span>
            <span className="text-right text-sm font-medium text-slate-900">
              {getValue(materialType)}
            </span>
          </div>
        )}

        {hasValue(businessTypes) && (
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3">
            <span className="text-sm text-slate-500">
              Business Type
            </span>
            <span className="max-w-[60%] text-right text-sm font-medium text-slate-900">
              {getValue(businessTypes)}
            </span>
          </div>
        )}

        {hasValue(description) && (
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3">
            <span className="text-sm text-slate-500">
              Description
            </span>
            <span className="max-w-[60%] text-right text-sm font-medium text-slate-900">
              {getValue(description)}
            </span>
          </div>
        )}

        {hasValue(additionalLanguage) && (
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3">
            <span className="text-sm text-slate-500">
              Additional Language
            </span>
            <span className="text-right text-sm font-medium text-slate-900">
              {getValue(additionalLanguage)}
            </span>
          </div>
        )}

        {hasValue(selectedSalesOrganizations) && (
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3">
            <span className="text-sm text-slate-500">
              Sales Organization
            </span>
            <span className="max-w-[60%] text-right text-sm font-medium text-slate-900">
              {getValue(selectedSalesOrganizations)}
            </span>
          </div>
        )}

        {hasValue(distributionChain) && (
          <div className="flex items-start justify-between gap-4">
            <span className="text-sm text-slate-500">
              Distribution Chain
            </span>
            <span className="text-right text-sm font-medium text-slate-900">
              {getValue(distributionChain)}
            </span>
          </div>
        )}

        {!materialType &&
          businessTypes.length === 0 &&
          !description &&
          !additionalLanguage &&
          selectedSalesOrganizations.length === 0 &&
          !distributionChain && (
            <div className="py-3 text-center">
              <p className="text-sm text-slate-400">
                Your selections will appear here as you complete the request.
              </p>
            </div>
          )}
      </div>
    </div>
  )
}

export default RequestSummary