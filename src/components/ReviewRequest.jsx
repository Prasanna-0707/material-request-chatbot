import { motion } from 'framer-motion'

const ReviewRequest = ({
  materialType,
  businessTypes,
  description,
  additionalLanguage,
  translatedDescription,
  selectedSalesOrganizations,
  distributionChain,
  additionalInformation,
  loadingGroup,
  purchasingGroup,
}) => {
  const getLanguageName = (language) => {
    const languages = {
      DE: 'German',
      FR: 'French',
      ES: 'Spanish',
      IT: 'Italian',
    }

    return languages[language] || language
  }

  const derivedPlant =
    selectedSalesOrganizations.length > 0
      ? selectedSalesOrganizations.map((salesOrg) => ({
          salesOrg,
          plant: `PLANT-${salesOrg.slice(-2)}`,
        }))
      : []

  const Section = ({ title, children }) => {
    return (
      <div className="border-t border-slate-200 pt-7 first:border-t-0 first:pt-0">
        <h3 className="mb-5 text-base font-semibold text-slate-900 sm:text-lg">
          {title}
        </h3>

        <div className="overflow-hidden rounded-xl border border-slate-200">
          {children}
        </div>
      </div>
    )
  }

  const ReviewRow = ({
    label,
    value,
    status,
    editable = false,
  }) => {
    return (
      <div className="grid grid-cols-1 gap-2 border-b border-slate-100 p-4 last:border-b-0 sm:grid-cols-[1fr_1.5fr_auto] sm:items-center sm:gap-5 sm:p-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            {label}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-800 sm:text-base">
            {value || '—'}
          </p>
        </div>

        <div>
          {status && (
            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                editable
                  ? 'bg-slate-100 text-slate-600'
                  : 'bg-slate-50 text-slate-400'
              }`}
            >
              {status}
            </span>
          )}
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {/* Header */}
      <div className="mb-7 sm:mb-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
          CR Preview
        </p>

        <h2 className="max-w-4xl text-2xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
          Please review your material request
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500 sm:text-base">
          Check the pre-defined content before submitting the request.
          System-derived values are shown for reference.
        </p>
      </div>

      {/* Preview Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
        <div className="space-y-8">

          {/* General Data */}
          <Section title="General Data">
            <ReviewRow
              label="CR Type"
              value="CREATE"
              status="Blocked"
            />

            <ReviewRow
              label="Material Type"
              value={materialType}
              status="Blocked"
            />

            <ReviewRow
              label="Business Type"
              value={
                businessTypes.length > 0
                  ? businessTypes.join(' / ')
                  : '—'
              }
              status="Changeable"
              editable
            />
          </Section>

          {/* Basic Data */}
          <Section title="Basic Data">
            <ReviewRow
              label="Base Unit of Measure"
              value="PC"
              status="Auto-derived"
            />

            <ReviewRow
              label="Industry Sector"
              value="M"
              status="Auto-derived"
            />

            <ReviewRow
              label="Material Group"
              value="MXA"
              status="Auto-derived"
            />

            <ReviewRow
              label="Division"
              value="02 — MR"
              status="Changeable"
              editable
            />

            <ReviewRow
              label="Description (EN)"
              value={description}
              status="Changeable"
              editable
            />

            {additionalLanguage && (
              <ReviewRow
                label={`Description (${getLanguageName(
                  additionalLanguage
                )})`}
                value={translatedDescription}
                status="Changeable"
                editable
              />
            )}
          </Section>

          {/* Distribution Chains */}
          <Section title="Distribution Chains">
            <ReviewRow
              label="Sales Organization(s)"
              value={
                selectedSalesOrganizations.length > 0
                  ? selectedSalesOrganizations.join(', ')
                  : '—'
              }
              status="Blocked"
            />

            <ReviewRow
              label="Distribution Chain"
              value={distributionChain}
              status="Blocked"
            />

            <ReviewRow
              label="Delivering Plant"
              value={
                derivedPlant.length > 0
                  ? derivedPlant
                      .map((item) => item.plant)
                      .join(', ')
                  : '—'
              }
              status="Auto-derived"
            />

            <ReviewRow
              label="Item Category Group"
              value={
                materialType === 'ZLVP'
                  ? 'VERP'
                  : materialType === 'ZLUE'
                    ? 'ZTRN'
                    : 'LEIS'
              }
              status="Changeable"
              editable
            />
          </Section>

          {/* Plants */}
          <Section title="Plants">
            {derivedPlant.length > 0 ? (
              derivedPlant.map((item) => (
                <div key={item.salesOrg}>
                  <ReviewRow
                    label={`Plant — ${item.salesOrg}`}
                    value={item.plant}
                    status="Auto-derived"
                  />

                  <ReviewRow
                    label="Purchasing Group"
                    value={purchasingGroup || 'AU1'}
                    status="Changeable"
                    editable
                  />

                  {(materialType === 'ZLHW' ||
                    materialType === 'ZLVP') && (
                    <ReviewRow
                      label="Loading Group"
                      value={loadingGroup || '0003'}
                      status="Changeable"
                      editable
                    />
                  )}

                  <ReviewRow
                    label="Availability Check"
                    value="Auto-derived"
                    status="Auto-derived"
                  />
                </div>
              ))
            ) : (
              <ReviewRow
                label="Plant"
                value="No plant derived"
                status="Auto-derived"
              />
            )}
          </Section>

          {/* Additional Information */}
          {additionalInformation && (
            <Section title="Additional Information">
              <ReviewRow
                label="Request Information"
                value={additionalInformation}
                status="Changeable"
                editable
              />
            </Section>
          )}

          {/* Validation */}
          <div className="border-t border-slate-200 pt-7">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                  ✓
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Validation ready
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                    The collected information is ready for validation
                    and submission.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  )
}

export default ReviewRequest