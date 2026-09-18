import { motion } from "framer-motion";

const valuationClassOptions = [
  {
    value: "2121",
    label: "2121",
  },
];

const ValuationDetails = ({
  valuationClass,
  onValuationClassChange,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {/* =====================================================
          QUESTION HEADER
      ===================================================== */}
      <div className="mb-7 sm:mb-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
          Question
        </p>

        <h2 className="max-w-3xl text-xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
          What Valuation Class do you want to assign?
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
          Select the valuation class from the available List of Values.
        </p>
      </div>

      {/* =====================================================
          VALUATION AREA CLASS
      ===================================================== */}
      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            USER INPUT
          </p>

          <h3 className="mt-1 text-xl font-semibold text-slate-900">
            Valuation Area Class
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            SELECT – MBEW_BKLAS from LoV
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Valuation Class
          </label>

          <select
            value={valuationClass}
            onChange={(event) =>
              onValuationClassChange(event.target.value)
            }
            className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 sm:max-w-md"
          >
            <option value="">
              Select Valuation Class
            </option>

            {valuationClassOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* =====================================================
          AUTO-DERIVED VALUATION DATA
      ===================================================== */}
      {valuationClass && (
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
                Valuation Data
              </h3>
            </div>

            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500">
              Auto-derived
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* MBEW_VERPR */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500">
                MBEW_VERPR
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                0,01
              </p>
            </div>

            {/* MBEW_BWKEY */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500">
                MBEW_BWKEY
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                Derived from Plant
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Dependent on the derived Plant
              </p>
            </div>

            {/* MBEW_VPRSV */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500">
                MBEW_VPRSV
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                V
              </p>
            </div>

            {/* MBEW_PEINH */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500">
                MBEW_PEINH
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                1
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ValuationDetails;