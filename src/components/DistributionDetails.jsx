import { motion } from "framer-motion";
import { useState } from "react";

const salesOrganizations = [
  {
    value: "SALES-ORG-01",
    label: "Sales Organization 01",
  },
  {
    value: "SALES-ORG-02",
    label: "Sales Organization 02",
  },
  {
    value: "SALES-ORG-03",
    label: "Sales Organization 03",
  },
];

const distributionChains = [
  {
    value: "001",
    label: "001",
    description: "Standard distribution chain",
  },
];

const itemCategoryGroups = ["ZLES", "BANS", "LEIS", "VERP"];

const mvgr2Options = ["001"];

const mvgr3Options = ["PSN"];

const loadingGroupOptions = ["0003"];

const purchasingGroupOptions = ["AU1"];

/*
  Material-type-dependent values from the PPT
*/
const materialTypeTechnicalValues = {
  ZLDI: {
    ktgrm: "02",
    mtpos: "LEIS",
    mtvfp: "KP",
  },

  ZLHW: {
    ktgrm: "01",
    mtpos: "BANS",
    mtvfp: "ZP",
  },

  ZLVP: {
    ktgrm: "01",
    mtpos: "VERP",
    mtvfp: "ZP",
  },

  ZLUE: {
    ktgrm: "01",
    mtpos: "ZTRN",
    mtvfp: "ZP",
  },
};

const DistributionDetails = ({
  selectedSalesOrganizations,
  onSalesOrganizationsChange,
  distributionChain,
  onDistributionChainChange,
  materialType,
  loadingGroup,
  onLoadingGroupChange,
  purchasingGroup,
  onPurchasingGroupChange,
}) => {
  const [salesOrgOpen, setSalesOrgOpen] = useState(false);

  const [itemCategoryGroup, setItemCategoryGroup] = useState("");
  const [mvgr2, setMvgr2] = useState("");
  const [mvgr3, setMvgr3] = useState("");

  const derivedMaterialValues =
    materialTypeTechnicalValues[materialType] || {};

  /*
    POC plant derivation.

    The PPT says:
    MARC_WERKS = dependent from SalesOrg / Distribution Chain

    The actual Plant mapping is not provided in the PPT,
    so this remains a frontend placeholder for the POC.
  */
  const derivedPlants = selectedSalesOrganizations.map((salesOrg) => {
    const salesOrgSuffix = salesOrg.value.split("-").pop();

    return {
      plant: `PLANT-${salesOrgSuffix}-${distributionChain || "001"}`,
    };
  });

  const showDerivedDistributionValues =
    selectedSalesOrganizations.length > 0 && distributionChain;

  const toggleSalesOrganization = (value) => {
    const exists = selectedSalesOrganizations.some(
      (org) => org.value === value
    );

    if (exists) {
      onSalesOrganizationsChange(
        selectedSalesOrganizations.filter(
          (org) => org.value !== value
        )
      );
    } else {
      const organization = salesOrganizations.find(
        (org) => org.value === value
      );

      if (organization) {
        onSalesOrganizationsChange([
          ...selectedSalesOrganizations,
          organization,
        ]);
      }
    }
  };

  const selectedSalesOrgText =
    selectedSalesOrganizations.length > 0
      ? selectedSalesOrganizations
          .map((org) => org.label)
          .join(", ")
      : "Select Sales Organization";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {/* =========================================================
          DISTRIBUTION SELECTION
      ========================================================= */}
      <div className="mb-8">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            USER INPUT
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
            Distribution Chain
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            What distribution chain/-s and plant/-s should be assigned?
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* =====================================================
              SALES ORGANIZATION
          ===================================================== */}
          <div className="relative">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Sales Organization
            </label>

            <button
              type="button"
              onClick={() => setSalesOrgOpen((prev) => !prev)}
              className="flex min-h-12 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 text-left text-sm text-slate-700 shadow-sm transition hover:border-slate-300"
            >
              <span
                className={
                  selectedSalesOrganizations.length
                    ? "text-slate-900"
                    : "text-slate-400"
                }
              >
                {selectedSalesOrgText}
              </span>

              <span className="ml-3 text-xs text-slate-400">
                {salesOrgOpen ? "▲" : "▼"}
              </span>
            </button>

            {salesOrgOpen && (
              <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                {/* OPTIONS */}
                <div className="p-2">
                  {salesOrganizations.map((organization) => {
                    const isSelected =
                      selectedSalesOrganizations.some(
                        (org) =>
                          org.value === organization.value
                      );

                    return (
                      <button
                        key={organization.value}
                        type="button"
                        onClick={() =>
                          toggleSalesOrganization(
                            organization.value
                          )
                        }
                        className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm transition hover:bg-slate-50"
                      >
                        <div>
                          <p className="font-medium text-slate-900">
                            {organization.label}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {organization.value}
                          </p>
                        </div>

                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded border text-xs ${
                            isSelected
                              ? "border-slate-900 bg-slate-900 text-white"
                              : "border-slate-300 bg-white text-transparent"
                          }`}
                        >
                          ✓
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* DONE BUTTON */}
                <div className="border-t border-slate-100 bg-slate-50 px-3 py-2">
                  <button
                    type="button"
                    onClick={() => setSalesOrgOpen(false)}
                    className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* =====================================================
              DISTRIBUTION CHAIN
          ===================================================== */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Distribution Chain
            </label>

            <select
              value={distributionChain}
              onChange={(e) =>
                onDistributionChainChange(e.target.value)
              }
              className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400"
            >
              <option value="">
                Select Distribution Chain
              </option>

              {distributionChains.map((chain) => (
                <option key={chain.value} value={chain.value}>
                  {chain.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* =========================================================
          AUTO-DERIVED DISTRIBUTION DATA
      ========================================================= */}
      {showDerivedDistributionValues && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-8"
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                AUTO-DERIVED
              </p>

              <h3 className="mt-1 text-xl font-semibold text-slate-900">
                Distribution Data
              </h3>
            </div>

            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500">
              Auto-derived
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* MVKE_DWERK */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500">
                MVKE_DWERK
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                Auto-derived
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Dependent from Sales Organization
              </p>
            </div>

            {/* MVKE_SKTOF */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500">
                MVKE_SKTOF
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                Active
              </p>
            </div>

            {/* MVKE_KTGRM */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500">
                MVKE_KTGRM
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                {derivedMaterialValues.ktgrm ||
                  "Auto-derived"}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Dependent from Material Type
              </p>
            </div>

            {/* MVKE_MTPOS */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500">
                MVKE_MTPOS
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                {derivedMaterialValues.mtpos ||
                  "Auto-derived"}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Dependent from Material Type
              </p>
            </div>

            {/* MVKE_MVGR1 */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500">
                MVKE_MVGR1
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                XXX
              </p>

              <p className="mt-1 text-xs text-slate-400">
                In-vitro default
              </p>
            </div>

            {/* MVKE_MVGR3 */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500">
                MVKE_MVGR3
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                XXX
              </p>

              <p className="mt-1 text-xs text-slate-400">
                In-vitro default; In-vivo optional
              </p>
            </div>

            {/* MVKE_MVGR4 */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500">
                MVKE_MVGR4
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                XXX
              </p>

              <p className="mt-1 text-xs text-slate-400">
                In-vitro default
              </p>
            </div>

            {/* MVKE_MVGR5 */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500">
                MVKE_MVGR5
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                XXX
              </p>

              <p className="mt-1 text-xs text-slate-400">
                In-vitro default
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* =========================================================
          ADDITIONAL INFORMATION
      ========================================================= */}
      {showDerivedDistributionValues && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-8"
        >
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              USER INPUT
            </p>

            <h3 className="mt-1 text-xl font-semibold text-slate-900">
              Additional Information
            </h3>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {/* ITEM CATEGORY GROUP */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Item Category Group
              </label>

              <select
                value={itemCategoryGroup}
                onChange={(e) =>
                  setItemCategoryGroup(e.target.value)
                }
                className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400"
              >
                <option value="">Select</option>

                {itemCategoryGroups.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <p className="mt-2 text-xs text-slate-400">
                Default: ZLES · Other shown options:
                BANS, LEIS, VERP
              </p>
            </div>

            {/* MVGR2 */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                MVGR2 (RAR/POB)
              </label>

              <select
                value={mvgr2}
                onChange={(e) => setMvgr2(e.target.value)}
                className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400"
              >
                <option value="">Select</option>

                {mvgr2Options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* MVGR3 */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                MVGR3 (Print) – In-Vivo
              </label>

              <select
                value={mvgr3}
                onChange={(e) => setMvgr3(e.target.value)}
                className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400"
              >
                <option value="">Select</option>

                {mvgr3Options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>
      )}

      {/* =========================================================
          PLANT DATA
      ========================================================= */}
      {showDerivedDistributionValues && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-8"
        >
          {/* PLANT HEADER */}
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                AUTO-DERIVED
              </p>

              <h3 className="mt-1 text-xl font-semibold text-slate-900">
                Plant Data
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Plant is derived from Sales Organization +
                Distribution Chain.
              </p>
            </div>

            <span className="mt-1 shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500">
              Pre-filled by System
            </span>
          </div>

          {/* =====================================================
              AUTO-DERIVED PLANT
          ===================================================== */}
          <div className="space-y-4">
            {derivedPlants.map((plant, index) => (
              <div
                key={`${plant.plant}-${index}`}
                className="rounded-xl border border-slate-200 bg-slate-50 p-5"
              >
                <p className="text-xs font-medium text-slate-500">
                  MARC_WERKS
                </p>

                <p className="mt-1 text-base font-semibold text-slate-900">
                  {plant.plant}
                </p>
              </div>
            ))}
          </div>

          {/* =====================================================
              PLANT AUTO-DERIVED TECHNICAL FIELDS
          ===================================================== */}
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {/* MARC_MTVFP */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500">
                MARC_MTVFP
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                {derivedMaterialValues.mtvfp ||
                  "Auto-derived"}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Dependent from Material Type
              </p>
            </div>

            {/* MARC_KAUTB */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500">
                MARC_KAUTB
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                Active
              </p>
            </div>

            {/* MARC_LOSGR */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500">
                MARC_LOSGR
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                1,000
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Default
              </p>
            </div>

            {/* MBEW_HKMAT */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500">
                MBEW_HKMAT
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                Active
              </p>
            </div>
          </div>

          {/* =====================================================
              SELECT / EDIT FIELDS
          ===================================================== */}
          <div className="mt-7">
            <p className="mb-4 text-sm text-slate-500">
              Select from dropdown or edit fields:
            </p>

            <div className="grid gap-5 md:grid-cols-2">
              {/* LOADING GROUP */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Loading Group
                </label>

                {["ZLHW", "ZLVP"].includes(materialType) ? (
                  <select
                    value={loadingGroup}
                    onChange={(e) =>
                      onLoadingGroupChange(e.target.value)
                    }
                    className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400"
                  >
                    <option value="">
                      Select Loading Group
                    </option>

                    {loadingGroupOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="flex min-h-12 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-400">
                    Not applicable for{" "}
                    {materialType || "selected material"}
                  </div>
                )}

                {["ZLHW", "ZLVP"].includes(materialType) && (
                  <p className="mt-2 text-xs text-slate-400">
                    0003 — only ZLHW, ZLVP
                  </p>
                )}
              </div>

              {/* PURCHASING GROUP */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Purchasing Group
                </label>

                <select
                  value={purchasingGroup}
                  onChange={(e) =>
                    onPurchasingGroupChange(e.target.value)
                  }
                  className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400"
                >
                  <option value="">
                    Select Purchasing Group
                  </option>

                  {purchasingGroupOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <p className="mt-2 text-xs text-slate-400">
                  Example from the request concept: AU1
                </p>
              </div>
            </div>
          </div>

          {/* =====================================================
              PREVIEW MODE NOTE
          ===================================================== */}
          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
            <p className="text-sm leading-6 text-slate-500">
              <span className="font-medium text-slate-700">
                Note:
              </span>{" "}
              Additional optional fields, e.g. Batch Management,
              Serial Number Profile, Control Code, etc. can be
              maintained in Preview Mode.
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DistributionDetails;