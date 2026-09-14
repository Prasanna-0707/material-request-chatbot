import { motion } from 'framer-motion'

const salesOrganizations = [
  {
    value: 'SALES-ORG-01',
    label: 'Sales Organization 01',
    description: 'Primary sales organization',
  },
  {
    value: 'SALES-ORG-02',
    label: 'Sales Organization 02',
    description: 'Additional sales organization',
  },
  {
    value: 'SALES-ORG-03',
    label: 'Sales Organization 03',
    description: 'Additional sales organization',
  },
]

const distributionChains = [
  {
    value: '001',
    label: '001',
    description: 'Standard distribution chain',
  },
]

const DistributionDetails = ({
  selectedSalesOrganizations = [],
  onSalesOrganizationsChange,
  distributionChain,
  onDistributionChainChange,
  additionalInformation,
  onAdditionalInformationChange,
  materialType,
  loadingGroup,
  onLoadingGroupChange,
  purchasingGroup,
  onPurchasingGroupChange,
}) => {
  const handleSalesOrganizationSelect = (value) => {
    if (selectedSalesOrganizations.includes(value)) {
      onSalesOrganizationsChange(
        selectedSalesOrganizations.filter((item) => item !== value)
      )
    } else {
      onSalesOrganizationsChange([
        ...selectedSalesOrganizations,
        value,
      ])
    }
  }

  const derivedPlants =
    selectedSalesOrganizations.length > 0
      ? selectedSalesOrganizations.map((salesOrg) => ({
          salesOrg,
          plant: `PLANT-${salesOrg.slice(-2)}`,
        }))
      : []

  const showLoadingGroup =
    materialType === 'ZLHW' || materialType === 'ZLVP'

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
          What distribution chain and plants should be assigned?
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
          Select the relevant sales organization and distribution chain.
          Plant information will be derived automatically.
        </p>
      </div>

      {/* Main Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
        <div className="space-y-8">

          {/* Sales Organizations */}
          <div>
            <div className="mb-3">
              <label className="text-sm font-semibold text-slate-900 sm:text-base">
                Sales organization
              </label>

              <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">
                Select one or multiple sales organizations.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {salesOrganizations.map((organization) => {
                const isSelected =
                  selectedSalesOrganizations.includes(
                    organization.value
                  )

                return (
                  <motion.button
                    key={organization.value}
                    type="button"
                    onClick={() =>
                      handleSalesOrganizationSelect(
                        organization.value
                      )
                    }
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative rounded-xl border p-4 text-left transition-all sm:p-5 ${
                      isSelected
                        ? 'border-slate-900 bg-slate-900 text-white shadow-md'
                        : 'border-slate-200 bg-white text-slate-900 shadow-sm hover:border-slate-400 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p
                          className={`text-sm font-semibold sm:text-base ${
                            isSelected
                              ? 'text-white'
                              : 'text-slate-900'
                          }`}
                        >
                          {organization.label}
                        </p>

                        <p
                          className={`mt-1 text-xs leading-5 ${
                            isSelected
                              ? 'text-slate-300'
                              : 'text-slate-500'
                          }`}
                        >
                          {organization.description}
                        </p>
                      </div>

                      <div
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                          isSelected
                            ? 'border-white bg-white text-slate-900'
                            : 'border-slate-300 text-transparent'
                        }`}
                      >
                        ✓
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Distribution Chain */}
          <div className="border-t border-slate-100 pt-7">
            <label
              htmlFor="distribution-chain"
              className="mb-2 block text-sm font-semibold text-slate-900 sm:text-base"
            >
              Distribution chain
            </label>

            <select
              id="distribution-chain"
              value={distributionChain}
              onChange={(event) =>
                onDistributionChainChange(event.target.value)
              }
              className="h-12 w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 sm:h-14 sm:px-5 sm:text-base"
            >
              <option value="">
                Select distribution chain
              </option>

              {distributionChains.map((chain) => (
                <option key={chain.value} value={chain.value}>
                  {chain.value} — {chain.description}
                </option>
              ))}
            </select>
          </div>

          {/* Additional Information */}
          <div className="border-t border-slate-100 pt-7">
            <label
              htmlFor="additional-information"
              className="mb-2 block text-sm font-semibold text-slate-900 sm:text-base"
            >
              Additional information
              <span className="ml-2 text-xs font-normal text-slate-400">
                Optional
              </span>
            </label>

            <textarea
              id="additional-information"
              value={additionalInformation}
              onChange={(event) =>
                onAdditionalInformationChange(event.target.value)
              }
              placeholder="Add any additional information about the distribution requirement..."
              rows={3}
              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 sm:px-5 sm:py-4 sm:text-base"
            />
          </div>

          {/* Auto Derived Plant */}
          <div className="border-t border-slate-100 pt-7">
            <div className="mb-3 flex items-center justify-between gap-4">
              <div>
                <label className="text-sm font-semibold text-slate-900 sm:text-base">
                  Plant data
                </label>

                <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">
                  Automatically derived from sales organization and
                  distribution chain.
                </p>
              </div>

              <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                Auto-derived
              </span>
            </div>

            {derivedPlants.length > 0 ? (
              <div className="space-y-3">
                {derivedPlants.map((item) => (
                  <div
                    key={item.salesOrg}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5"
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-medium text-slate-400">
                          Sales organization
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          {item.salesOrg}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-slate-400">
                          Derived plant
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          {item.plant}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-6 text-center">
                <p className="text-sm text-slate-400">
                  Select a sales organization to derive plant data.
                </p>
              </div>
            )}
          </div>

          {/* Mandatory Plant Fields */}
          <div className="border-t border-slate-100 pt-7">
            <div className="mb-4">
              <label className="text-sm font-semibold text-slate-900 sm:text-base">
                Mandatory plant information
              </label>

              <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">
                Only mandatory fields need to be completed at this stage.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* Loading Group */}
              {showLoadingGroup && (
                <div>
                  <label
                    htmlFor="loading-group"
                    className="mb-2 block text-sm font-semibold text-slate-900"
                  >
                    Loading group
                  </label>

                  <select
                    id="loading-group"
                    value={loadingGroup}
                    onChange={(event) =>
                      onLoadingGroupChange(event.target.value)
                    }
                    className="h-12 w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                  >
                    <option value="">
                      Select loading group
                    </option>

                    <option value="0003">
                      0003
                    </option>
                  </select>
                </div>
              )}

              {/* Purchasing Group */}
              <div>
                <label
                  htmlFor="purchasing-group"
                  className="mb-2 block text-sm font-semibold text-slate-900"
                >
                  Purchasing group
                </label>

                <select
                  id="purchasing-group"
                  value={purchasingGroup}
                  onChange={(event) =>
                    onPurchasingGroupChange(event.target.value)
                  }
                  className="h-12 w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                >
                  <option value="">
                    Select purchasing group
                  </option>

                  <option value="AU1">
                    AU1
                  </option>
                </select>
              </div>

            </div>
          </div>

        </div>
      </div>
    </motion.div>
  )
}

export default DistributionDetails